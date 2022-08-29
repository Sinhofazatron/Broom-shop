import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={450}
    viewBox="0 0 250 500"
    backgroundColor="#ffffff"
    foregroundColor="#ecebeb"
  >
    <rect x="39" y="29" rx="11" ry="11" width="178" height="156" />
    <rect x="33" y="218" rx="5" ry="5" width="190" height="45" />
    <rect x="26" y="278" rx="5" ry="5" width="203" height="37" />
    <rect x="20" y="342" rx="0" ry="0" width="80" height="3" />
    <rect x="20" y="367" rx="5" ry="5" width="70" height="28" />
    <rect x="153" y="365" rx="5" ry="5" width="86" height="30" />
    <rect x="17" y="411" rx="24" ry="24" width="103" height="39" />
    <rect x="138" y="411" rx="24" ry="24" width="106" height="38" />
  </ContentLoader>
);

export default Skeleton;
