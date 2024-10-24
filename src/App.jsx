import { CompactUserProfile } from "./CompactUserProfile";
import { LongUserProfile } from "./LongUserProfile";

function App() {
  return (
    <>
      {/* <LongUserProfile userId={1} /> */}
      <CompactUserProfile userId={2} />
    </>
  );
}

export default App;
