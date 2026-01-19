// =============================================
//  1. グローバル設定 & Firebase 初期化
// =============================================

// ★重要: Renderなどにデプロイした server.js のURLを指定してください
const SIGNALING_SERVER_URL = "https://d3d09ea0-3b2c-4695-92df-c578bf0d0ee4-00-16jcgj5b32n67.pike.replit.dev"; 

const firebaseConfig = {
    apiKey: "AIzaSyDQypYYlRIPBRRTNf_shVcOzl0h5n0OBus",
    authDomain: "english-park-f65d5.firebaseapp.com",
    projectId: "english-park-f65d5",
    storageBucket: "english-park-f65d5.appspot.com",
    messagingSenderId: "522423703619",
    appId: "1:522423703619:web:90ff48520d2008fbc89cf6"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// =============================================
//  2. 学習データ (一文字も省略せず統合)
// =============================================

const pronunciationSentences = [
    { en: "How are you doing?", ja: "調子はどうですか？" },
    { en: "It's nice to meet you.", ja: "はじめまして。" },
    { en: "How have you been?", ja: "いかがお過ごでしたか？" },
    { en: "My name is Kenji Tanaka.", ja: "私の名前は田中健司です。" },
    { en: "What do you do for a living?", ja: "お仕事は何をされていますか？" },
    { en: "I'm really looking forward to it.", ja: "本当に楽しみにしています。" },
    { en: "That sounds like a great idea.", ja: "それは素晴らしいアイデアですね。" },
    { en: "I completely agree with you.", ja: "あなたに完全に同意します。" },
    { en: "I'm sorry, I didn't catch that.", ja: "すみません、聞き取れませんでした。" },
    { en: "Could you repeat that, please?", ja: "もう一度言っていただけますか？" },
    { en: "Where is the nearest station?", ja: "一番近い駅はどこですか？" },
    { en: "Could you take a picture for me?", ja: "写真を撮いただけませんか？" },
    { en: "What time does the store open?", ja: "その店は何時に開きますか？" },
    { en: "I'd like to make a reservation.", ja: "予約をしたいのですが。" },
    { en: "Check, please.", ja: "お会計をお願いします。" },
    { en: "It's been a long time.", ja: "お久しぶりです。" },
    { en: "Take care of yourself.", ja: "お大事に / 気をつけて。" },
    { en: "Have a nice day!", ja: "良い一日を！" },
    { en: "I'll get back to you soon.", ja: "すぐにご連絡します。" },
    { en: "Let me check my schedule.", ja: "予定を確認させてください。" }
];

const quizData = {
    beginner: [
        { q: "Apple", a: ["りんご", "みかん", "ぶどう", "いちご"], c: 0 },
        { q: "Book", a: ["ペン", "ノート", "本", "辞書"], c: 2 },
        { q: "School", a: ["病院", "学校", "公園", "駅"], c: 1 },
        { q: "Happy", a: ["悲しい", "怒った", "幸せな", "疲れた"], c: 2 },
        { q: "Blue", a: ["赤", "青", "黄", "緑"], c: 1 },
        { q: "Friend", a: ["家族", "先生", "友達", "隣人"], c: 2 },
        { q: "Water", a: ["お茶", "水", "牛乳", "酒"], c: 1 },
        { q: "Morning", a: ["朝", "昼", "夜", "夕方"], c: 0 },
        { q: "Small", a: ["大きい", "小さい", "長い", "重い"], c: 1 },
        { q: "Eat", a: ["飲む", "走る", "食べる", "寝る"], c: 2 }
    ],
    intermediate: [
        { q: "Efficient", a: ["効果的な", "効率的な", "十分な", "複雑な"], c: 1 },
        { q: "Negotiate", a: ["妥協する", "交渉する", "同意する", "主張する"], c: 1 },
        { q: "Requirement", a: ["必要条件", "提案", "返答", "許可"], c: 0 },
        { q: "Significant", a: ["些細な", "重要な", "明確な", "一時的な"], c: 1 },
        { q: "Examine", a: ["作成する", "調査する", "破壊する", "無視する"], c: 1 },
        { q: "Alternative", a: ["伝統的な", "代わりの", "極端な", "正確な"], c: 1 },
        { q: "Consistent", a: ["一貫した", "矛盾した", "頻繁な", "珍しい"], c: 0 },
        { q: "Describe", a: ["描写する", "定義する", "決定する", "分配する"], c: 0 },
        { q: "Opportunity", a: ["課題", "機会", "結果", "義務"], c: 1 },
        { q: "Participate", a: ["期待する", "参加する", "準備する", "防止する"], c: 1 }
    ],
    advanced: [
        { q: "Pragmatic", a: ["論理的な", "実用的な", "独創的な", "懐疑的な"], c: 1 },
        { q: "Exacerbate", a: ["改善する", "悪化させる", "維持する", "強調する"], c: 1 },
        { q: "Ambiguous", a: ["明確な", "曖昧な", "野心的な", "古風な"], c: 1 },
        { q: "Conundrum", a: ["結論", "難問", "調和", "刺激"], c: 1 },
        { q: "Ephemeral", a: ["永続的な", "短命な", "本質的な", "外部の"], c: 1 },
        { q: "Inevitable", a: ["避けられない", "不確実な", "望ましい", "不可能な"], c: 0 },
        { q: "Meticulous", a: ["大胆な", "細心の注意を払った", "無謀な", "寛大な"], c: 1 },
        { q: "Resilient", a: ["壊れやすい", "回復力のある", "頑固な", "従順な"], c: 1 },
        { q: "Scrutinize", a: ["賞賛する", "詳しく調べる", "見落とす", "推測する"], c: 1 },
        { q: "Ubiquitous", a: ["どこにでもある", "珍しい", "隠れた", "一時的な"], c: 0 }
    ]
};

const idiomsData = [
    { idiom: "Piece of cake", meaning: "とても簡単", description: "Something that is very easy to do." },
    { idiom: "Break a leg", meaning: "幸運を祈る", description: "A way to wish someone good luck, especially before a performance." },
    { idiom: "Under the weather", meaning: "体調が悪い", description: "Feeling sick or not well." },
    { idiom: "Bite the bullet", meaning: "困難に立ち向かう", description: "To accept something difficult or unpleasant." },
    { idiom: "Call it a day", meaning: "今日は終わりにする", description: "To decide to stop working on something." },
    { idiom: "Cost an arm and a leg", meaning: "とても高価", description: "Something that is very expensive." },
    { idiom: "Hit the nail on the head", meaning: "核心を突く", description: "To describe exactly what is causing a situation or problem." },
    { idiom: "Let the cat out of the bag", meaning: "秘密を漏らす", description: "To reveal a secret by mistake." },
    { idiom: "Once in a blue moon", meaning: "めったにない", description: "Something that happens very rarely." },
    { idiom: "The best of both worlds", meaning: "良いとこ取り", description: "A situation where you can enjoy the advantages of two very different things." }
];

const industryData = {
    it: {
        flashcards: [
            { front: "Scalability", backMeaning: "拡張性", backSentence: "The system's scalability is impressive." },
            { front: "Deployment", backMeaning: "配備・展開", backSentence: "The deployment failed due to a bug." },
            { front: "Authentication", backMeaning: "認証", backSentence: "User authentication is required for access." },
            { front: "Framework", backMeaning: "枠組み・基盤", backSentence: "We are using a new JavaScript framework." },
            { front: "Integration", backMeaning: "統合", backSentence: "The software integration was seamless." }
        ],
        phrases: [
            { scenario: "System Update", text: "We need to scale our database to handle more traffic.", trans: "トラフィック増加に対応するためデータベースを拡張する必要があります。" },
            { scenario: "Code Review", text: "There is a potential security vulnerability in this code.", trans: "このコードにはセキュリティ上の脆弱性がある可能性があります。" }
        ],
        articles: [
            { title: "The Rise of AI", content: "Artificial intelligence is changing the world quickly.", trans: "AIは急速に世界を変えています。" }
        ]
    },
    medical: {
        flashcards: [
            { front: "Diagnosis", backMeaning: "診断", backSentence: "The doctor provided a quick diagnosis." }
        ],
        phrases: [
            { scenario: "Consultation", text: "How long have you been feeling these symptoms?", trans: "いつからこれらの症状を感じていますか？" }
        ],
        articles: [
            { title: "Modern Medicine", content: "Medical technology has advanced significantly.", trans: "医療技術は著しく進歩しました。" }
        ]
    }
};

// =============================================
//  3. Socket.IO シグナリング実装 (server.js 対応)
// =============================================

let socket; // Socket.IO クライアント
let peerConnection;
let localStream;
const iceConfig = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

/**
 * サーバー接続初期化
 */
function initSocket() {
    // index.htmlに <script src="/socket.io/socket.io.js"></script> が必要
    // または CDN: https://cdn.socket.io/4.7.2/socket.io.min.js
    if (typeof io === 'undefined') {
        console.error("Socket.IO library not loaded!");
        return;
    }

    socket = io(SIGNALING_SERVER_URL);

    socket.on('connect', () => {
        console.log("Connected to Signaling Server:", socket.id);
    });

    // 他のユーザーが参加した（server.js から emit('peer_joined')）
    socket.on('peer_joined', async (data) => {
        console.log("New peer joined:", data.peerId);
        document.getElementById('video-status').textContent = "Peer joined! Starting call...";
        
        // オファーを作成して送信
        await startCall(data.peerId);
    });

    // オファーを受け取った
    socket.on('offer', async (data) => {
        console.log("Received Offer from:", data.from);
        await handleOffer(data.sdp, data.from);
    });

    // アンサーを受け取った
    socket.on('answer', async (data) => {
        console.log("Received Answer from:", data.from);
        await handleAnswer(data.sdp);
    });

    // ICE Candidate を受け取った
    socket.on('ice_candidate', async (data) => {
        if (peerConnection) {
            await peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
        }
    });

    // 相手が退出した
    socket.on('peer_left', (data) => {
        console.log("Peer left:", data.peerId);
        document.getElementById('video-status').textContent = "Peer left the room.";
        if (document.getElementById('remote-video')) {
            document.getElementById('remote-video').srcObject = null;
        }
        closePeerConnection();
    });

    // 3Dパーク等の位置情報同期（server.js から emit('position_update')）
    socket.on('position_update', (data) => {
        // パーク内の他ユーザーのモデル位置を更新する処理をここに記述
        console.log("Remote Position Update:", data);
    });
}

// =============================================
//  4. WebRTC ビデオチャットロジック
// =============================================

async function startVideoChat() {
    const statusEl = document.getElementById('video-status');
    statusEl.textContent = "Requesting camera access...";

    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        document.getElementById('local-video').srcObject = localStream;
        
        // サーバーのルームに参加
        const roomName = "english-park-global";
        const userData = { username: auth.currentUser ? auth.currentUser.email.split('@')[0] : "Guest" };
        
        socket.emit('join', { roomName, userData });
        statusEl.textContent = "Waiting for others to join...";

    } catch (err) {
        statusEl.textContent = "Camera error: " + err.message;
    }
}

async function startCall(targetPeerId) {
    createPeerConnection(targetPeerId);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    
    socket.emit('offer', { target: targetPeerId, sdp: offer });
}

async function handleOffer(sdp, fromId) {
    createPeerConnection(fromId);
    await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    
    socket.emit('answer', { target: fromId, sdp: answer });
}

async function handleAnswer(sdp) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(sdp));
}

function createPeerConnection(targetId) {
    if (peerConnection) return;

    peerConnection = new RTCPeerConnection(iceConfig);

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        document.getElementById('remote-video').srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit('ice_candidate', { target: targetId, candidate: event.candidate });
        }
    };
}

function closePeerConnection() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
}

// =============================================
//  5. UI制御 & Firebase 連携
// =============================================

const splashScreen = document.getElementById('splash-screen');
const homeScreen = document.getElementById('home-screen');

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    screen.style.display = 'block';
    setTimeout(() => screen.classList.add('active'), 10);
}

// Firebase 監視
auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('login-overlay')?.classList.add('hidden');
        showScreen(splashScreen);
        initSocket(); // ログイン後に Socket 通信を開始
    } else {
        document.getElementById('login-overlay')?.classList.remove('hidden');
    }
});

// 各種ボタンイベント
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('enter-app-button')?.addEventListener('click', () => showScreen(homeScreen));

    // ビデオチャット開始
    document.getElementById('start-video-chat')?.addEventListener('click', () => {
        showScreen(document.getElementById('video-chat-screen'));
        startVideoChat();
    });

    // 電話終了
    document.getElementById('end-call-btn')?.addEventListener('click', () => {
        if (localStream) localStream.getTracks().forEach(t => t.stop());
        closePeerConnection();
        socket.emit('leave'); // ルーム退出を明示的に通知
        showScreen(homeScreen);
    });

    // その他の学習機能の初期化などはここに続く...
    loadDailyIdiom();
});

// クイズ・スピーキングなどの関数は以前のものと同様に保持（略）
function loadDailyIdiom() {
    const data = idiomsData[Math.floor(Math.random() * idiomsData.length)];
    document.getElementById('idiom-phrase').textContent = data.idiom;
    document.getElementById('idiom-meaning').textContent = data.meaning;
}

console.log("English Park Client Ready: Socket.IO & WebRTC integrated.");