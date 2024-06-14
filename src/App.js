import "./App.css";
import {Box,Button,Container,VStack,HStack,Input,} from "@chakra-ui/react";
import Message from "./Message";
import {onAuthStateChanged,GoogleAuthProvider,signInWithPopup,getAuth,signOut,} from "firebase/auth";
import { app } from "./firebase";
import { useEffect, useRef, useState } from "react";
import {getFirestore,addDoc,collection,serverTimestamp,onSnapshot,query,orderBy,} from "firebase/firestore";

const db = getFirestore(app);

const auth = getAuth(app);

const loginHandler = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const logoutHandler = () => {
  signOut(auth);
};

function App() {
  // mail :=luffyxmugiwara739@gmail.com

  const [user, setuser] = useState(false);
  const [message, setMessage] = useState("");
  const [Messages, setMessages] = useState([]);
  const divForScroll = useRef(null);
  // console.log(user.photoURL);

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      await addDoc(collection(db, "Messages"), {
        text: message,
        uid: user.uid,
        uri: user.photoURL,
        createdAt: serverTimestamp(),
      });

      divForScroll.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
    const unsuscribe = onAuthStateChanged(auth, (data) => {
      setuser(data);
    });

    const unsuscribeMessages = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((item) => {
          const id = item.id;
          return { id, ...item.data() };
        })
      );
    });

    return () => {
      unsuscribe();
      unsuscribeMessages();
    };
  }, []);

  return (
    <Box className="box" h={"100vh"}>
      {user ? (
        <Container h={"90vh"} bg="white" borderRadius={"30px"}>
          <VStack h="full" padding={"4"}>
            <Button
              onClick={logoutHandler}
              h={"10%"}
              w="full"
              colorScheme="red"
            >
              Log Out
            </Button>

            <VStack
              h="full"
              w="full"
              overflowY={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {Messages.map((item) => (
                <Message
                  key={item.id}
                  user={item.uid === user.uid ? "me" : "other"}
                  text={item.text}
                  uri={item.uri}
                />
              ))}

              <div ref={divForScroll}></div>
            </VStack>

            <form
              onSubmit={submithandler}
              style={{ width: "100%", backgroundColor: "white" }}
            >
              <HStack>
                <Input
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  placeholder="Enter a Messege..."
                />

                <Button colorScheme={"purple"} type="Submit">
                  Send
                </Button>
              </HStack>
            </form>
          </VStack>
        </Container>
      ) : (
        <VStack bg={"white"} h={"100vh"} justifyContent={"center"}>
          <Button colorScheme="purple" onClick={loginHandler}>
            Sign In With Google
          </Button>
        </VStack>
      )}
    </Box>
  );
}

export default App;
