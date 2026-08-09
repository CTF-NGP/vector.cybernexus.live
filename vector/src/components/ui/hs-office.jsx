// AsciiArt — "HS Office", made with the 21st ASCII editor and baked
// to its exact rendered output (looping video + poster). Zero dependencies:
// one <video> that fills its parent. Drop it behind or inside your content:
// <div className="relative h-96"><AsciiArt className="absolute inset-0" /></div>
// Assets are self-hosted under /ascii/ (originally exported from the recipe below):
// https://21st.dev/community/ascii/editor?from=505de466-0e33-40c3-b619-61c08a46b2e4
export default function AsciiArt({ className }) {
  return (
    <video
      className={className}
      src="/ascii/hs-office.mp4"
      poster="/ascii/hs-office.webp"
      autoPlay
      loop
      muted
      playsInline
      aria-label="Animated ASCII art"
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
  )
}