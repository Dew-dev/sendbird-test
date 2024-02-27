// import SendbirdApp from '@sendbird/uikit-react/App';
import SendbirdProvider from "@sendbird/uikit-react/SendbirdProvider";
import MessageSearch from "@sendbird/uikit-react/MessageSearch";
import {
  GroupChannelFilter,
  GroupChannelListOrder,
  MessageFilter,
  MessageCollectionInitPolicy,
} from "@sendbird/chat/groupChannel";
import { useState, useRef } from "react";
import "@sendbird/uikit-react/dist/index.css";
import SendbirdChat from "@sendbird/chat";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Custom from "./custom";
import CustomEvents from "./custom";
import { GroupChannelModule } from "@sendbird/chat/groupChannel";
let sb;

function App() {
  const APP_ID = "FFA3FB52-75AC-44EA-B991-8E57D7B5C8BE";
  // const USER_ID = "a";
  // const NICKNAME = "Joko";
  const [state, updateState] = useState({
    applicationUsers: [],
    groupChannelMembers: [],
    currentlyJoinedChannel: null,
    messages: [],
    channels: [],
    messageInputValue: "",
    userNameInputValue: "",
    userIdInputValue: "a",
    channelNameUpdateValue: "",
    settingUpUser: true,
    file: null,
    messageToUpdate: null,
    messageCollection: null,
    loading: false,
    error: false,
  });
  const stateRef = useRef();
  stateRef.current = state;

  const channelRef = useRef();
  const channelHandlers = {
    onChannelsAdded: (context, channels) => {
      const updatedChannels = [...channels, ...stateRef.current.channels];
      updateState({
        ...stateRef.current,
        channels: updatedChannels,
        applicationUsers: [],
      });
    },
    onChannelsDeleted: (context, channels) => {
      const updatedChannels = stateRef.current.channels.filter((channel) => {
        return !channels.includes(channel.url);
      });
      updateState({ ...stateRef.current, channels: updatedChannels });
    },
    onChannelsUpdated: (context, channels) => {
      const updatedChannels = stateRef.current.channels.map((channel) => {
        const updatedChannel = channels.find(
          (incomingChannel) => incomingChannel.url === channel.url
        );
        if (updatedChannel) {
          return updatedChannel;
        } else {
          return channel;
        }
      });

      updateState({ ...stateRef.current, channels: updatedChannels });
    },
  };
  // const sb = SendbirdChat.init({
  //   appId: APP_ID,
  //   modules: [new GroupChannelModule()],
  // });
  // sb.connect(USER_ID);
  // const setupUser = async () => {
  //   const { userNameInputValue, userIdInputValue } = state;
  //   const sendbirdChat = await SendbirdChat.init({
  //     appId: APP_ID,
  //     localCacheEnabled: true,
  //     modules: [new GroupChannelModule()],
  //   });

  //   await sendbirdChat.connect(userIdInputValue);
  //   await sendbirdChat.setChannelInvitationPreference(true);

  //   const userUpdateParams = {};
  //   userUpdateParams.nickname = userNameInputValue;
  //   userUpdateParams.userId = userIdInputValue;
  //   await sendbirdChat.updateCurrentUserInfo(userUpdateParams);

  //   sb = sendbirdChat;
  //   updateState({ ...state, loading: true });
  //   const [channels, error] = await loadChannels(channelHandlers);
  //   if (error) {
  //     return onError(error);
  //   }
  //   const onError = (error) => {
  //     updateState({ ...state, error: error.message });
  //     console.log(error);
  //   };
  //   updateState({
  //     ...state,
  //     channels: channels,
  //     loading: false,
  //     settingUpUser: false,
  //   });
  // };
  const params = {
    invitedUserIds: ["a", "6e336b1f-6505-4f46-ae27-ee62d9529580"],
    name: "Konsultasi",
    isDistinct: false,
  };
  const channel = async () => await sb.groupChannel.createChannel(params);
  // console.log(channel);
  return (
    <div className="App">
      <SendbirdProvider
        appId={APP_ID}
        userId={state.userIdInputValue}
        isMentionEnabled
        isVoiceMessageEnabledS
      >
        <Custom sb={sb} />
      </SendbirdProvider>
    </div>
  );
}

const loadChannels = async (channelHandlers) => {
  const groupChannelFilter = new GroupChannelFilter();
  groupChannelFilter.includeEmpty = true;

  const collection = sb.groupChannel.createGroupChannelCollection({
    filter: groupChannelFilter,
    order: GroupChannelListOrder.LATEST_LAST_MESSAGE,
  });

  collection.setGroupChannelCollectionHandler(channelHandlers);

  const channels = await collection.loadMore();
  return [channels, null];
};

export default App;
