import React from 'react'
import { HStack,Avatar,Text} from '@chakra-ui/react'

function Message({text,uri , user="other"}) {
  return (
    <HStack  
    alignSelf={ user === "me" ? "flex-end" : "flex-start"} 
    bg={"gray.200"} 
    paddingY={"2"} 
    padding={user==="me"?"2":"2"} 
    borderRadius={"10"}>
        
        {
            user==="other" && <Avatar  src={uri}/>
        }
        <Text>
            {text}
        </Text>
        {
            user==="me" && <Avatar src={uri}/>
        }
        
    </HStack>
    
  )
}

export default Message