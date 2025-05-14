// barrage.js
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('barrage-container');
    const quotes = [
        "血荐轩辕 —— 鲁迅",
        "爱国的主要方法，就是要爱自己所从事的事业 —— 谢觉哉",
        "人生自古谁无死，留取丹心照汗青 —— 文天祥",
        "天下兴亡，匹夫不能忘忧国 —— 陆游",
        "为中华之崛起而读书 —— 周恩来",
        "常思奋不顾身，而殉国家之急 —— 司马迁",
        "捐躯赴国难，视死忽如归 —— 曹植",
        "天下兴亡，匹夫有责 —— 顾炎武",
        "为祖国而死，那是最美的命运啊！ —— 大仲马",
        "爱祖国高于一切 —— 肖邦",
        "人类最高的道德是什么？那就是爱国之心 —— 拿破仑",
        "祖国更重于生命，是我们的母亲，我们的土地 —— 聂鲁达" ,
        "天下兴亡，匹夫有责 —— 顾炎武",
        "捐躯赴国难，视死忽如归 —— 曹植",
        "苟利国家生死以，岂因祸福避趋之 —— 林则徐",
        "人生自古谁无死？留取丹心照汗青 —— 文天祥" ,
        "位卑未敢忘忧国 —— 陆游" ,
        "王师北定中原日，家祭无忘告乃翁 —— 陆游" ,
        "只解沙场为国死，何须马革裹尸还 —— 徐锡麟" ,
        "愿得此身长报国，何须生入玉门关 —— 戴叔伦" ,
        "我劝天公重抖擞，不拘一格降人才 —— 龚自珍" ,
        "商女不知亡国恨，隔江犹唱后庭花 —— 杜牧" ,
        "国既不国，家何能存！—— 杨靖宇" ,
        "恨不抗日死，留作今日羞。国破尚如此，我何惜此头 —— 吉鸿昌",
        "寄意寒星荃不察，我以我血荐轩辕 —— 鲁迅" ,
        "一身报国有万死，双鬓向人无再青 —— 陆游" ,
        "夜视太白收光芒，报国欲死无战场！—— 陆游" ,
        "但使龙城飞将在，不教胡马度阴山 —— 王昌龄" ,
        "欲将轻骑逐，大雪满弓刀 —— 卢纶",
        "未收天子河湟地，不拟回头望故乡 —— 令狐楚" ,
        "了却君王天下事，赢得生前身后名 —— 辛弃疾" ,
        "鞠躬尽瘁，死而后已 —— 诸葛亮" 
    ];

    // 设置容器样式
    container.style.position = 'relative';
    container.style.width = '100%';
    container.style.height = '400px';
    container.style.overflow = 'hidden';
    container.style.margin = '2rem 0';

    // 轨道系统（解决重叠问题）
    const tracks = 5; // 分为5条轨道
    const trackHeight = container.offsetHeight / tracks;
    const occupiedTracks = new Array(tracks).fill(0);

    // 生成随机颜色
    function getRandomColor() {
        const colors = ['#9D1D21', '#CEA543', '#FFD700', '#FF4D4D', '#FFFFFF'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // 创建单条弹幕
    function createBarrage(text) {
        // 寻找可用轨道（选择当前最空的轨道）
        let trackIndex = 0;
        let minOccupied = Infinity;
        for (let i = 0; i < tracks; i++) {
            if (occupiedTracks[i] < minOccupied) {
                minOccupied = occupiedTracks[i];
                trackIndex = i;
            }
        }
        occupiedTracks[trackIndex]++;

        const barrage = document.createElement('div');
        barrage.textContent = text;
        barrage.style.position = 'absolute';
        barrage.style.color = getRandomColor();
        barrage.style.fontSize = '22px'; // 固定字号
        barrage.style.fontWeight = 'bold';
        barrage.style.whiteSpace = 'nowrap';
        barrage.style.textShadow = '1px 1px 3px rgba(0,0,0,0.5)';
        barrage.style.top = `${trackIndex * trackHeight + 10}px`; // 固定在轨道上
        barrage.style.left = '100%';
        container.appendChild(barrage);

        // 计算动画时间（根据内容长度）
        const duration = 15000 + (text.length * 50); // 基础15秒+按长度增加

        const animation = barrage.animate([
            { transform: 'translateX(0)' },
            { transform: `translateX(-${container.offsetWidth + barrage.offsetWidth}px)` }
        ], {
            duration: duration,
            easing: 'linear'
        });

        animation.onfinish = () => {
            barrage.remove();
            occupiedTracks[trackIndex]--;
        };
    }

    // 定时生成弹幕（每2秒一条）
    setInterval(() => {
        const text = quotes[Math.floor(Math.random() * quotes.length)];
        createBarrage(text);
    }, 2000); // 降低生成频率

    // 初始生成弹幕（数量减少）
    for (let i = 0; i < tracks; i++) {
        setTimeout(() => {
            createBarrage(quotes[i % quotes.length]);
        }, i * 1000);
    }
});
