import { IconAntennaBars2, IconAntennaBars3, IconAntennaBars5 } from '@tabler/icons-react'


interface InterestLevelProps {
    level: string
}

const InterestLevel = ({level} : InterestLevelProps) => {
    console.log(level)

    if (level?.toLowerCase() === 'low') {
        return <IconAntennaBars2 color={'red'} size={25} />
    } else if (level?.toLowerCase() === 'medium') {
        return <IconAntennaBars3 color={'orange'} size={25} />
    } else if (level?.toLowerCase() === 'high') {
        return <IconAntennaBars5 color={'limegreen'} size={25} />
    }
    return (
        <div>

        </div>
    )
}

export default InterestLevel