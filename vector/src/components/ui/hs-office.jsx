// AsciiArt — "HS Office", made with the 21st ASCII editor and baked
// to its exact rendered output (looping video + poster). Zero dependencies:
// one <video> that fills its parent. Drop it behind or inside your content:
// <div className="relative h-96"><AsciiArt className="absolute inset-0" /></div>
// Remix the source recipe (styles, animation, palette) in the editor:
// https://21st.dev/community/ascii/editor?from=505de466-0e33-40c3-b619-61c08a46b2e4
export default function AsciiArt({ className }) {
  return (
    <video
      className={className}
      src="https://assets.21st.dev/ascii-recipes/videos/user_3GPTiAnC9sbzHhxwSKYXvQdPCa1/e60d8d3d-e665-4ef9-b7de-68b26b4d94f2.mp4"
      poster="https://assets.21st.dev/ascii-recipes/thumbnails/user_3GPTiAnC9sbzHhxwSKYXvQdPCa1/08bbdd00-25f5-4f38-84f9-c05482d745e1.webp"
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