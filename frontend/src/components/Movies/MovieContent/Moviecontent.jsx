import Card from './Card';

const Moviecontent = () => {


  return (
    <section className='bg-black'>
      <div className='w-full  justify-start'>
        <video
          src='/video/video.mp4'
          autoPlay
          loop
          muted
          playsInline
          className=' w-full'
        />
      </div>

      <Card title='Now Playing' genre='now_playing' />
      <Card title='Popular' genre='popular' />
      <Card title='Top Rated' genre='top_rated' />
      <Card title='Upcoming' genre='upcoming' />

    </section>
  );
};

export default Moviecontent;
