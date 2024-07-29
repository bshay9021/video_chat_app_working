import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Call, CallContent, StreamCall, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import Spinner from 'react-native-loading-spinner-overlay';
import { router, useLocalSearchParams } from 'expo-router';
import ChatView from '@/components/ChatView';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Page = () => {
  const [call, setCall] = useState<Call | null>(null);
  const client = useStreamVideoClient();
  const { id } = useLocalSearchParams<{ id: string}>();

  useEffect(() => {
    if(!client || call) return;

    const joinCall = async () => {
      const call = client.call('default', id!);
      await call.join({create: true});
      setCall(call);
    }
    joinCall();

  }, [client]);

  const goToHomeScreen = async () => {
    router.back();
  }

  if(!call) return null;


  return (
    <View style={{ flex: 1 }}>
      <Spinner visible={!call} />
      <StreamCall call={call}>
        <View style={styles.container}>
          <CallContent onHangupCallHandler={goToHomeScreen} />
          <View style={styles.chatContainer}>
            <ChatView channelId={id!} />
          </View>
        </View>
      </StreamCall>
        
      
      <Text>Page</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
    textAlign: 'center',
    justifyContent: 'center'
  }
});

export default Page