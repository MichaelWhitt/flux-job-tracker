import { Spinner } from 'evergreen-ui'

const Loader = () => {
    return (
        <div
            className='flex justify-center items-center all-items-center place-items-center h-[20px]'
        >
            <Spinner color='gray' />
        </div>
    )
}

export default Loader
