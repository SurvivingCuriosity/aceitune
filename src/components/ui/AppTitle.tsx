import aceituna from '../../assets/img/aceituna.svg'

export const AppTitle = () => {
    return (
        <div className='flex w-full items-center justify-center gap-2'>
            <img src={aceituna} alt='Aceituna' className='size-10 object-contain object-left md:size-20' />
            <h1 style={{fontWeight:'bolder'}} className='text-4xl font-extrabold tracking-tighter text-olive md:text-7xl'>AceiTune</h1>
        </div>
    )
}