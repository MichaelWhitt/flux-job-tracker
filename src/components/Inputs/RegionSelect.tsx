import React, { useState, useEffect } from 'react'
import { GetCountries, GetState, GetCity } from 'react-country-state-city'
import { Autocomplete } from '@mantine/core'
import { IconSquareX } from '@tabler/icons-react'
import { regions } from '../../utils/regions'
import Loader from '../Dashboard/Loader'

interface JobEntry {
  jobRegion?: string;
  jobCountry?: string;
  jobState?: string;
  jobCity?: string;
}

interface RegionSelectProps {
  handleChange: (value: string, type: string) => void
  formData: JobEntry
  label?: string
  bypassValidation?: boolean
}

interface Country {
  id: number;
  name: string;
  region: string;
  subregion: string;
}

interface State {
  id: number;
  name: string;
}

interface City {
  id: number;
  name: string;
}

const RegionSelect: React.FC<RegionSelectProps> = ({ handleChange, formData, label = 'Location', bypassValidation}) => {
  const [regionName, setRegionName] = useState(formData?.jobRegion || '')
  const [countryName, setCountryName] = useState(formData?.jobCountry || '')
  const [stateName, setStateName] = useState(formData?.jobState || '')
  const [cityName, setCityName] = useState(formData?.jobCity || '')

  const [countryList, setCountryList] = useState<Country[]>([])
  const [stateList, setStateList] = useState<State[]>([])
  const [cityList, setCityList] = useState<City[]>([])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (Object.keys(formData).length) {
      sequentialFetch()
    } else {
      setMounted(true)
    }
  }, [formData, countryList, stateList, cityList])

  const sequentialFetch = async () => {
    if (formData.jobRegion && !countryList.length) {
      await getCountryList(formData.jobRegion)
    }

    if (formData.jobCountry && !stateList.length) {
      const country = countryList.find(c => c.name === formData.jobCountry)
      if (country) await getStateList(country.id)
    }

    if (formData.jobState && !cityList.length) {
      const country = countryList.find(c => c.name === formData.jobCountry)
      const state = stateList.find(s => s.name === formData.jobState)
      if (country && state) await getCityList(country.id, state.id)
    }

    setMounted(true)
  }

  const filterCountriesByRegion = (countries: Country[], regionName: string): Country[] => {
    switch (regionName) {
      case 'Asia':
        return countries.filter(cs => cs.region?.toLowerCase().includes('asia'))
      case 'North America':
        return countries.filter(cs => cs.subregion?.toLowerCase().includes('northern america'))
      case 'South America':
        return countries.filter(cs => cs.subregion?.toLowerCase().includes('south america') || cs.subregion?.toLowerCase().includes('central america'))
      case 'Europe':
        return countries.filter(cs => cs.region?.toLowerCase().includes('europe'))
      case 'Africa':
        return countries.filter(cs => cs.region?.toLowerCase().includes('africa'))
      case 'Oceania':
        return countries.filter(cs => cs.region?.toLowerCase().includes('oceania'))
      case 'All':
        return countries
      default:
        return []
    }
  }

  const getCountryList = async (regionName: string) => {
    const result = await GetCountries()
    if (result.length) {
      const filteredCountries = filterCountriesByRegion(result, regionName)
      setCountryList(filteredCountries)
    }
  }

  const getStateList = async (countryId: number) => {
    const result = await GetState(countryId)
    if (result.length) {
      setStateList(result)
    }
  }

  const getCityList = async (countryId: number, stateId: number) => {
    const result = await GetCity(countryId, stateId)
    if (result.length) {
      setCityList(result)
    }
  }

  const handleLocationChange = async (value: string, type: 'jobRegion' | 'jobCountry' | 'jobState' | 'jobCity') => {
    handleChange(value, type)
    switch (type) {
      case 'jobRegion':
        setRegionName(value)
        await getCountryList(value)
        setCountryName('')
        setStateName('')
        setCityName('')
        break
      case 'jobCountry':
        setCountryName(value)
        const country = countryList.find(c => c.name === value)
        if (country) await getStateList(country.id)
        setStateName('')
        setCityName('')
        break
      case 'jobState':
        setStateName(value)
        const selectedCountry = countryList.find(c => c.name === countryName)
        const selectedState = stateList.find(s => s.name === value)
        if (selectedCountry && selectedState) await getCityList(selectedCountry.id, selectedState.id)
        setCityName('')
        break
      case 'jobCity':
        setCityName(value)
        break
    }
  }

  const clearSelection = (type: string) => {
    switch (type) {
      case 'region':
        setRegionName('')
        setCountryName('')
        setStateName('')
        setCityName('')
        handleChange('', 'jobRegion')
        break
      case 'country':
        setCountryName('')
        setStateName('')
        setCityName('')
        handleChange('', 'jobCountry')
        break
      case 'state':
        setStateName('')
        setCityName('')
        handleChange('', 'jobState')
        break
      case 'city':
        setCityName('')
        handleChange('', 'jobCity')
        break
    }
  }

  const autoCompleteStyle = {
    input: {
      background: '#1F2937',
      height: 32,
      color: '#fff'
    },
    wrapper: {
      height: 32
    },
    dropdown: {
      background: '#1F2937',
      color: 'blue'
    },
    option: {}
  }

  const renderAutocomplete = (
    data: string[],
    value: string,
    onChange: (value: string) => void,
    placeholder: string,
    type: string
  ) => (
    <Autocomplete
      data={data}
      value={value}
      onChange={onChange}
      styles={autoCompleteStyle}
      rightSection={value && <IconSquareX onClick={() => clearSelection(type)} size={25} className="text-red-300 font-thin cursor-pointer" />}
      placeholder={placeholder}
      required={bypassValidation ? false : type === 'region'}
      error={bypassValidation ? false : type === 'region' && !value}
      classNames={{
        option: 'mantine-autocomplete-option'
      }}
    />
  )

  if (!mounted) return <Loader />

  return (
    <div className='flex flex-col gap-2'>
      <label htmlFor='' className='text-white'>{label}</label>
      {renderAutocomplete(regions, regionName, (value) => handleLocationChange(value, 'jobRegion'), 'Select Region', 'region')}
      {regionName && renderAutocomplete(countryList.map(x => x.name), countryName, (value) => handleLocationChange(value, 'jobCountry'), 'Select Country', 'country')}
      {countryName && renderAutocomplete(stateList.map(x => x.name), stateName, (value) => handleLocationChange(value, 'jobState'), 'Select State', 'state')}
      {countryName && stateName && renderAutocomplete(cityList.map(x => x.name), cityName, (value) => handleLocationChange(value, 'jobCity'), 'Select City', 'city')}
    </div>
  )
}

export default RegionSelect