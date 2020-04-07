import Peer from "peerjs";

export default class PeerClient {
    peer: Peer
    peers: Peer.DataConnection[]
    docInitiatorId: string
    myId?: string

    constructor() {
        this.peers = [];
        this.peer = new Peer(undefined, {
            host: "/",
            port: 9000,
            path: '/signal',
            debug: 2,
            config: {
                iceServers:[
                    {
                        urls: 'stun:stun1.l.google.com:19302'
                    },
                    {
                        urls: 'turn:numb.viagenie.ca',
                        credential: 'conclave-rulez',
                        username: 'sunnysurvies@gmail.com'
                    }
                ]
            }
        });
        this.docInitiatorId = window.location.pathname.slice(1);
        console.log("Doc id", this.docInitiatorId);

        this.peer.on('open', this.onOpen.bind(this));
        this.peer.on('connection', this.onConnection.bind(this));
    }

    onOpen(id: string) {
        this.myId = id;
        console.log("My id", this.myId);
  
        if (this.docInitiatorId !== "") {
            // if in an existing doc, connect to the initiator
            // to bootstrap ourselves
            const conn = this.peer.connect(this.docInitiatorId, {
                reliable: true,
                metadata: {
                    id: this.myId,
                    sync: true
                }
            });

            // this our first new peer, so add it
            this.addPeer(conn);
    
            // TODO clean up on 'close', etc?
        }
    }

    // receiving data from someone
    onData(data: any) {
        console.log(data);
        if (data.type === "syncResponse") {
            // receiving sync response from initiator
            // TODO save peers
            // const conn = this.peer.connect(id, {});
            // this.addPeer(conn);
        }
    }

    addPeer(conn: Peer.DataConnection) {
        this.peers.push(conn); // need to dedupe
        console.log("adding Peer");
        conn.on('data', this.onData.bind(this));
    }

    // someone just connected to me
    onConnection(conn: Peer.DataConnection) {
        console.log("Someone is connecting", conn.metadata);
        // when someone connects, add them to our network of peers
        this.addPeer(conn);

        if (conn.metadata.sync) {
            conn.on('open', () => {
                conn.send({
                    type: 'syncResponse',
                    peers: this.peers.map(p => p.peer)
                    // TODO send back bootstrap data to this connection
                });
            })
        }
    }
}
