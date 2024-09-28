import { Spinner } from 'evergreen-ui'

const Loader = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Spinner size={32} />
        </div>
    )
}

export default Loader
