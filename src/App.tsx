type EventItem = {
  id: string;
  time: string;
  label: string;
  detail: string;
  kind: 'search' | 'open' | 'peek' | 'promote' | 'note';
};

type NodeCard = {
  id: string;
  title: string;
  url: string;
  state: 'active' | 'preview' | 'saved';
  lane: string;
  from: string;
};

const sessions = [
  { id: 's1', name: '一人暮らし冷蔵庫', count: 12, active: true },
  { id: 's2', name: '大学比較', count: 8, active: false },
  { id: 's3', name: 'ゲームUI研究', count: 21, active: false },
];

const nodes: NodeCard[] = [
  {
    id: 'n1',
    title: 'Sharp 152L 冷蔵庫',
    url: 'store.example/refrigerator/sharp-152l',
    state: 'active',
    lane: '比較レーン',
    from: '価格比較サイト',
  },
  {
    id: 'n2',
    title: '一人暮らし向け冷蔵庫の選び方',
    url: 'media.example/fridge-guide',
    state: 'saved',
    lane: 'メイン調査',
    from: 'Google検索',
  },
  {
    id: 'n3',
    title: 'Haier 130L レビュー',
    url: 'video.example/review-haier',
    state: 'preview',
    lane: '寄り道',
    from: 'Redditスレ',
  },
];

const events: EventItem[] = [
  { id: 'e1', time: '19:02', label: '検索', detail: '一人暮らし 冷蔵庫 おすすめ', kind: 'search' },
  { id: 'e2', time: '19:03', label: 'ノード追加', detail: '選び方ガイドをメイン調査に保存', kind: 'open' },
  { id: 'e3', time: '19:06', label: 'ミニウインドウ', detail: 'Haierレビューをpeek表示', kind: 'peek' },
  { id: 'e4', time: '19:08', label: '昇格', detail: 'Sharp 152L を比較レーンに追加', kind: 'promote' },
  { id: 'e5', time: '19:11', label: 'メモ', detail: '静音性はSharpが強そう', kind: 'note' },
];

const kindColor: Record<EventItem['kind'], string> = {
  search: 'kind-search',
  open: 'kind-open',
  peek: 'kind-peek',
  promote: 'kind-promote',
  note: 'kind-note',
};

export default function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar left-panel">
        <div className="panel-title">Sessions</div>
        <div className="session-list">
          {sessions.map((session) => (
            <button key={session.id} className={`session-card ${session.active ? 'active' : ''}`}>
              <div>
                <strong>{session.name}</strong>
                <p>{session.count} nodes</p>
              </div>
              {session.active && <span className="badge">LIVE</span>}
            </button>
          ))}
        </div>

        <div className="subsection">
          <div className="panel-title">Lanes</div>
          <div className="lane-chip-row">
            <span className="lane-chip lane-main">メイン調査</span>
            <span className="lane-chip lane-compare">比較レーン</span>
            <span className="lane-chip lane-drift">寄り道</span>
          </div>
        </div>
      </aside>

      <main className="center-panel">
        <header className="topbar">
          <div>
            <div className="eyebrow">Tabless Browser Prototype</div>
            <h1>Peek Browser</h1>
          </div>
          <div className="top-actions">
            <button>＋ Peek</button>
            <button>Timeline</button>
            <button>Compare</button>
          </div>
        </header>

        <section className="browser-frame">
          <div className="browser-toolbar">
            <div className="address-pill">https://store.example/refrigerator/sharp-152l</div>
            <div className="toolbar-actions">
              <button>Promote</button>
              <button>Save</button>
              <button>Mini</button>
            </div>
          </div>

          <div className="browser-content">
            <div className="hero-card">
              <div className="hero-meta">比較レーン / from 価格比較サイト</div>
              <h2>Sharp 152L 冷蔵庫</h2>
              <p>
                タブの代わりに、ページをノードとして扱うUI。リンクはまずミニウインドウで覗き、
                価値があるものだけセッションへ昇格させる。
              </p>
            </div>

            <div className="peek-window">
              <div className="peek-header">
                <strong>Mini Window</strong>
                <span>動画レビューの冒頭を確認中</span>
              </div>
              <p>
                ここは hover peek / side peek / floating peek の雛形。一定時間読んだり、
                スクロールしたら正式ノードに昇格する想定。
              </p>
            </div>

            <div className="node-grid">
              {nodes.map((node) => (
                <article key={node.id} className={`node-card state-${node.state}`}>
                  <div className="node-state">{node.state}</div>
                  <h3>{node.title}</h3>
                  <p>{node.url}</p>
                  <small>{node.lane} / from {node.from}</small>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <aside className="sidebar right-panel">
        <div className="panel-title">Timeline</div>
        <div className="timeline-list">
          {events.map((event) => (
            <div key={event.id} className="timeline-item">
              <div className="timeline-time">{event.time}</div>
              <div className="timeline-body">
                <span className={`event-kind ${kindColor[event.kind]}`}>{event.label}</span>
                <p>{event.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="subsection">
          <div className="panel-title">Why this feels different</div>
          <ul className="bullet-list">
            <li>タブではなくセッションとノードで整理</li>
            <li>GitLens風に行動履歴を読める</li>
            <li>ミニウインドウを主導線にする</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
