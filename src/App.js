// import SendbirdApp from '@sendbird/uikit-react/App';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import MessageSearch from "@sendbird/uikit-react/MessageSearch";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdChat from "@sendbird/chat";
import "./App.css";
import Custom from "./custom";
import CustomEvents from "./custom";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";

function App() {
  const APP_ID = "FFA3FB52-75AC-44EA-B991-8E57D7B5C8BE";
  const USER_ID = "a";
  const NICKNAME = "Joko";

  const sb = SendbirdChat.init({
    appId: APP_ID,
    modules : [new GroupChannelModule()],
  })
  sb.connect(USER_ID);
  return (
    <div className="App">
      <SendbirdProvider
        appId={APP_ID}
        userId={USER_ID}
        isMentionEnabled
        isVoiceMessageEnabledS
      >
        <Custom sb={sb}/>
        
      </SendbirdProvider>
    </div>
  );
}

export default App;