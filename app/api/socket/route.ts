import { NextResponse } from 'next/server';
import {Server} from 'socket.io'
export const GET = async (req: Request) => {
  return NextResponse.json({ message: "Socket route" });
};

 async function handler(req:any,res:any){

    if(!res.socket.server.io){
        console.log("Initializing SocketIO server");

        const io = new Server(res.socket.server,{
            path:'/api/socket',
            cors:{
                origin:"*"
            }
        });

        io.on("connection",(socket)=>{
         console.log("Client connected",socket.id);
         
         socket.on("joinRoom",(userId:string)=>{
            socket.join(userId);
            console.log(`User join the room with userid ${userId}`)
         })

         socket.on("disconnet",()=>{
            console.log("Client disconnected")
         })

         return(()=>{
            socket.off("joinRoom",(userId)=>{
                socket.disconnect(userId)
            })

         })
        })
        
        res.socket.server.io = io
    }
    res.end()
}

export default handler