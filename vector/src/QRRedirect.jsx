import { useEffect } from "react";

export default function QRRedirect() {
  useEffect(() => {
    window.location.replace(
      "/?utm_source=poster&utm_medium=qr&utm_campaign=vector_ctf_2026"
    );
  }, []);

  return <p>Redirecting to VECTOR...</p>;
}