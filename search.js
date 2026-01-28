// 検索データ
const searchData = [
    {
        title: "稽古日誌",
        description: "最近の出来事について劇団員が更新します",
        url: "diary.html",
        keywords: ["恨み", "日誌", "出来事", "劇団", "更新"]
    },
    {
        title: "メンバー紹介",
        description: "劇団員プロフィール",
        url: "members.html",
        keywords: ["メンバー", "紹介", "プロフィール", "劇団員", "スタッフ"]
    },
    {
        title: "アクセス・ログイン",
        description: "関係者ログインパスワード入力画面",
        url: "history.html",
        keywords: ["アクセス", "ログイン", "パスワード", "関係者", "入力"]
    },
    {
        title: "次回公演「永遠の幕間」中止のお知らせ",
        description: "公演が中止になりました",
        url: "diary.html",
        keywords: ["公演", "永遠の幕間", "中止", "お知らせ", "次回"]
    },
    {
        title: "劇団員募集",
        description: "劇団員を募集中です。詳細をご覧ください。",
        url: "diary.html",
        keywords: ["募集", "劇団員", "メンバー", "応募"]
    }
];

// ページロード時に検索を実行
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    
    if (query) {
        performSearch(query);
        document.getElementById('searchInput').value = query;
    }
});

function performSearch(query) {
    const lowerQuery = query.toLowerCase();
    const resultsDiv = document.getElementById('results');
    const searchTitle = document.getElementById('searchTitle');
    
    // マッチした結果をフィルタリング
    const matches = searchData.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(lowerQuery);
        const descMatch = item.description.toLowerCase().includes(lowerQuery);
        const keywordMatch = item.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery));
        
        return titleMatch || descMatch || keywordMatch;
    });
    
    // タイトルを更新
    searchTitle.textContent = `「${query}」の検索結果 (${matches.length}件)`;
    
    if (matches.length === 0) {
        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 25px;">
                <p style="font-size: 1.2em; color: #ffffffff;">「<strong>${query}</strong>」に該当する結果は見つかりませんでした</p>
                <p style="margin-top: 13px; color: #ffffffff;">別のキーワードで検索してみてください</p>
            </div>
        `;
        return;
    }
    
    // 結果をHTML化
    const resultsHTML = matches.map(item => `
        <div class="search-result">
            <h3><a href="${item.url}" style="color: #ffffffff; text-decoration: none;">${item.title}</a></h3>
            <p style="color: #ccc; margin: 10px 0;">${item.description}</p>
            <a href="${item.url}" style="color: #08061dff; font-size: 0.9em;">詳細を見る →</a>
        </div>
    `).join('');
    
    resultsDiv.innerHTML = resultsHTML;
}
