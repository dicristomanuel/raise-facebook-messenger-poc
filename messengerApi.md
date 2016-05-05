#### Set welcome message

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread",
  "call_to_actions":[
    {
      "message":{
        "text":"Welcome! What can we do for you today?"
      }
    }
  ]
}' "https://graph.facebook.com/v2.6/1700117506908863/thread_settings?access_token=EAAXKHXTgcZA4BALborZAHxDOjPtcaZACuHC9fs03ubmMueAiRXZBzUnoaYA9HLabXbzW90WZCiYk9hlhQ19k8AD9HtnAITye97ck5ofYZCdgUSOnF2PeCDVyvaZBlf6RPaz4tAioN15p0tEPbfXsmgm1CSDbjZAETAmZArLRAWNVUEwZDZD"
