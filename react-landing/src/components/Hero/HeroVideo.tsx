const HERO_VIDEO_URL =
  'https://res.cloudinary.com/lydovxdl/video/upload/v1786177113/Wasel-hero-video_tvwrwg.mp4';

type HeroVideoProps = {
  poster?: string;
};

export function HeroVideo({ poster }: HeroVideoProps) {
  return (
    <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        disablePictureInPicture
      >
        <source src={HERO_VIDEO_URL} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/35" />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
