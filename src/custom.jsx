import React, { useState } from "react";
// import CustomSearchItem from "@sendbird/uikit-react";
// import SendbirdChat from "@sendbird/chat";
import {
  ChannelList,
  Channel,
  ChannelSettings,
  SendBirdProvider,
} from "@sendbird/uikit-react";
// import Channel from '@sendbird/uikit-react/Channel';
import VoiceMessageInput from "@sendbird/uikit-react/ui/VoiceMessageInput";
// import CustomizedChatInput from './CustomizedMessageInput';

// const sb = SendbirdChat.init({
//   appId: 'FFA3FB52-75AC-44EA-B991-8E57D7'B5C8BE',
//   modules: [
//       new SendBirdProvider(),
//   ],
// });

function Custom({ sb }) {
  const [currentChannel, setCurrentChannel] = useState(null);
  const currentChannelUrl = currentChannel ? currentChannel.url : "";
  const [showSettings, setShowSettings] = useState(false);
  var channelChatDiv = document.getElementsByClassName("channel-chat")[0];
  var addGroupButton = document.getElementsByClassName(
    "sendbird-iconbutton"
  )[0];
  // // // var channelChatDiv = document.getElementsById("channel-chat");
  // try {
  //   addGroupButton.style.display = "none";
  // } catch (e) {}
  const renderSettingsBar = () => {
    channelChatDiv.style.width = "52%";
    channelChatDiv.style.cssFloat = "left";
  };
  const hideSettingsBar = () => {
    channelChatDiv.style.width = "76%";
    channelChatDiv.style.cssFloat = "left";
  };

  return (
    <div className="channel-wrap">
      <div className="channel-list">
        <ChannelList
          onChannelSelect={(Channel) => {
            setCurrentChannel(Channel);
          }}
        />
      </div>
      <div className="channel-chat">
        <Channel
          channelUrl={currentChannelUrl}
          onChatHeaderActionClick={() => {
            setShowSettings(!showSettings);
            renderSettingsBar();
          }}
          // renderMessageInput={() => {

          // }}
        />
      </div>
      {showSettings && (
        <div className="channel-settings">
          <ChannelSettings
            channelUrl={currentChannelUrl}
            onCloseClick={() => {
              setShowSettings(false);
              hideSettingsBar();
              // testclick();
            }}
          />
        </div>
      )}
      <div></div>
    </div>
  );
}

export default Custom;
