
type SkeletonLoaderProps = {
  height?: string
  width?: string
  borderRadius?: string
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({height, width}) => {
  return (
    <div className='all-center h-full'>
        <div className={`${height || 'h-[40px]'} ${width || 'w-[40px]'} border-2 border-t-2 border-bg6 border-t-blue-500 rounded-full animate-spin`} />
    </div>
  )
}

export default SkeletonLoader
