"use client";

import { useEffect, useRef, useState } from "react";

const SPONSORS = {
  premium: [
    { id: 1, name: "宮崎総合ホールディングス株式会社", nameEn: "Miyazaki General Holdings", tagline: "地域と共に、未来を拓く", industry: "総合商社" },
  ],
  gold: [
    { id: 2, name: "有限会社 日向コーポレーション", nameEn: "Hyuga Corporation", industry: "建設・不動産" },
    { id: 3, name: "宮崎信用金庫", nameEn: "Miyazaki Shinkin Bank", industry: "金融" },
    { id: 4, name: "株式会社フェニックス観光", nameEn: "Phoenix Tourism", industry: "観光・ホテル" },
  ],
  silver: [
    { id: 5, name: "有限会社 青島商事", industry: "小売" },
    { id: 6, name: "宮崎医療グループ", industry: "医療・福祉" },
    { id: 7, name: "株式会社 日南食品", industry: "食品製造" },
    { id: 8, name: "有限会社 都城テック", industry: "IT・テクノロジー" },
    { id: 9, name: "椎葉建設株式会社", industry: "建設" },
  ],
  bronze: [
    { id: 10, name: "株式会社 高千穂ファーム", industry: "農業" },
    { id: 11, name: "宮崎デザイン工房", industry: "デザイン" },
    { id: 12, name: "有限会社 延岡製作所", industry: "製造" },
    { id: 13, name: "株式会社 日向灘水産", industry: "水産" },
    { id: 14, name: "宮崎印刷株式会社", industry: "印刷" },
    { id: 15, name: "有限会社 西都商店", industry: "小売・流通" },
    { id: 16, name: "株式会社 霧島エナジー", industry: "エネルギー" },
  ],
  action: [
    { id: 17, name: "株式会社 宮崎広告社", industry: "広告" },
    { id: 18, name: "有限会社 日之影木工", industry: "木工・工芸" },
    { id: 19, name: "宮崎ランドスケープ", industry: "造園" },
    { id: 20, name: "有限会社 えびの電機", industry: "電機" },
    { id: 21, name: "株式会社 小林ロジ", industry: "物流" },
    { id: 22, name: "宮崎セキュリティ", industry: "警備・セキュリティ" },
    { id: 23, name: "有限会社 清武商会", industry: "商社" },
    { id: 24, name: "株式会社 国富製菓", industry: "製菓" },
    { id: 25, name: "みやざき保険事務所", industry: "保険" },
    { id: 26, name: "株式会社 日向マンゴーファーム", industry: "農業" },
    { id: 27, name: "有限会社 延岡黒潮水産", industry: "水産" },
    { id: 28, name: "合同会社 都城アグリテック", industry: "IT・農業" },
    { id: 29, name: "株式会社 高千穂ツーリズム", industry: "観光" },
    { id: 30, name: "有限会社 えびの高原牧場", industry: "畜産" },
    { id: 31, name: "株式会社 串間フィッシング", industry: "漁業" },
  ],
  light: [
    { id: 32, name: "合同会社 西都メディカル", industry: "医療" },
    { id: 33, name: "有限会社 小林建設工業", industry: "建設" },
    { id: 34, name: "株式会社 フェニックスIT", industry: "IT" },
    { id: 35, name: "合同会社 霧島クラフト", industry: "工芸" },
    { id: 36, name: "有限会社 鵜戸観光開発", industry: "観光・不動産" },
    { id: 37, name: "株式会社 青島リゾート", industry: "ホテル・観光" },
    { id: 38, name: "合同会社 日南フーズ", industry: "食品製造" },
    { id: 39, name: "有限会社 高鍋教育サービス", industry: "教育" },
    { id: 40, name: "株式会社 門川シーフード", industry: "水産加工" },
    { id: 41, name: "合同会社 三股ファームズ", industry: "農業" },
    { id: 42, name: "有限会社 綾オーガニック", industry: "有機農業" },
    { id: 43, name: "株式会社 日向灘ソーラー", industry: "再生可能エネルギー" },
    { id: 44, name: "有限会社 都城信用サービス", industry: "金融" },
    { id: 45, name: "合同会社 延岡ケミカル", industry: "化学" },
    { id: 46, name: "株式会社 宮崎黒潮運輸", industry: "運輸" },
    { id: 47, name: "有限会社 高千穂神楽工房", industry: "伝統工芸" },
    { id: 48, name: "合同会社 串間ソルトファクトリー", industry: "製塩" },
    { id: 49, name: "株式会社 西都古墳ガイド", industry: "観光・教育" },
    { id: 50, name: "有限会社 小林酪農", industry: "酪農" },
    { id: 51, name: "合同会社 えびのテックラボ", industry: "IT" },
    { id: 52, name: "株式会社 日南マリンサービス", industry: "マリンレジャー" },
    { id: 53, name: "有限会社 霧島焼酎醸造", industry: "酒造" },
    { id: 54, name: "合同会社 青島サーフワークス", industry: "スポーツ" },
    { id: 55, name: "株式会社 都城畜産センター", industry: "畜産" },
    { id: 56, name: "有限会社 延岡精密製作所", industry: "精密機械" },
    { id: 57, name: "合同会社 フェニックス学園", industry: "教育" },
    { id: 58, name: "株式会社 高鍋ヘルスケア", industry: "医療・介護" },
    { id: 59, name: "有限会社 日之影林業", industry: "林業" },
    { id: 60, name: "合同会社 宮崎マンゴースイーツ", industry: "製菓" },
    { id: 61, name: "株式会社 鵜戸クリエイティブ", industry: "デザイン" },
    { id: 62, name: "有限会社 椎葉茶園", industry: "茶業" },
    { id: 63, name: "合同会社 黒潮ネットワーク", industry: "通信" },
    { id: 64, name: "株式会社 門川造船", industry: "造船" },
    { id: 65, name: "有限会社 高千穂グリーンファーム", industry: "農業" },
    { id: 66, name: "合同会社 串間ウィンドパワー", industry: "風力発電" },
    { id: 67, name: "株式会社 西都ベーカリー", industry: "製パン" },
    { id: 68, name: "有限会社 三股モータース", industry: "自動車" },
    { id: 69, name: "合同会社 綾クラフトビール", industry: "醸造" },
    { id: 70, name: "株式会社 日向建材", industry: "建材" },
    { id: 71, name: "有限会社 えびの温泉リゾート", industry: "温泉・宿泊" },
    { id: 72, name: "合同会社 都城データセンター", industry: "IT・データ" },
    { id: 73, name: "株式会社 延岡薬品", industry: "製薬" },
    { id: 74, name: "有限会社 霧島アウトドア", industry: "アウトドア・観光" },
    { id: 75, name: "合同会社 小林フルーツパーラー", industry: "小売・飲食" },
  ],
};

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px" }}>
      <span style={{ height: "1px", width: "40px", background: "linear-gradient(to right, transparent, #C9963A)" }} />
      <span style={{ fontSize: "11px", letterSpacing: "0.3em", color: "#C9963A", fontFamily: "'Noto Sans JP', sans-serif" }}>{children}</span>
      <span style={{ height: "1px", width: "40px", background: "linear-gradient(to left, transparent, #C9963A)" }} />
    </div>
  );
}

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededRand(seed: number, index: number): number {
  const x = Math.sin(seed * 9301 + index * 49297 + 233280) * 10000;
  return x - Math.floor(x);
}

function LogoMark({ name, tier, size }: { name: string; tier: string; size?: number }) {
  const stripped = name.replace(/株式会社|有限会社|合同会社/g, "").trim();
  const initial = stripped.slice(0, 1);
  const h = hashStr(name);
  const r = (i: number) => seededRand(h, i);

  const tierBorders: Record<string, string> = {
    premium: "rgba(245,208,128,0.5)",
    gold:    "rgba(201,150,58,0.4)",
    silver:  "rgba(184,176,160,0.3)",
    bronze:  "rgba(205,127,50,0.3)",
    action:  "rgba(107,158,120,0.3)",
    light:   "rgba(138,155,176,0.25)",
  };
  const borderColor = tierBorders[tier] || tierBorders.bronze;

  const bgs = [
    { color: "rgba(255,255,255,0.03)", light: false },
    { color: "rgba(255,255,255,0.9)",  light: true },
    { color: "#FFF8E7",                light: true },
    { color: "#E8F5E9",                light: true },
    { color: "#E0F2F1",                light: true },
    { color: "#FFF3E0",                light: true },
    { color: "#FCE4EC",                light: true },
    { color: "#E3F2FD",                light: true },
    { color: "#EDE7F6",                light: true },
    { color: "#FFFDE7",                light: true },
  ];
  const bg = bgs[h % 10];
  const isLight = bg.light;

  // Colors that adapt to background brightness
  const textMain = isLight ? "#1A1A2E" : "#E8E0D0";
  const textSub  = isLight ? "#4A4A5A" : "#B8B0A0";

  const accentsLight = [
    "#8A6420", // dark gold
    "#1A7F7D", // dark cyan
    "#B84233", // dark coral
    "#3D7A5A", // dark mint
    "#5E35B1", // dark lavender
    "#C76A10", // dark orange
    "#1565C0", // dark sky blue
    "#C2185B", // dark rose
  ];
  const accentsDark = [
    "#F5D080", "#5BC0BE", "#E07A5F", "#81B29A",
    "#B39DDB", "#F4A261", "#64B5F6", "#F48FB1",
  ];
  const ac = isLight ? accentsLight[h % 8] : accentsDark[h % 8];

  // viewBox = 300 x 100 (3:1)
  const W = 300, H = 100;
  const style = h % 6;

  // Truncate display name for SVG (keep stripped, shorten if too long)
  const displayName = stripped.length > 12 ? stripped.slice(0, 12) + "…" : stripped;

  function renderStyle() {
    switch (style) {
      // ── Style 0: Color block left + company name right ──
      case 0: {
        const blockW = 8 + Math.floor(r(1) * 6);
        return (<>
          <rect x={0} y={0} width={blockW} height={H} fill={ac} opacity={0.7} />
          <rect x={blockW} y={0} width={3} height={H} fill={ac} opacity={0.2} />
          <text x={blockW + 20} y={H * 0.5} dominantBaseline="central" fill={textMain} fontSize={16} fontWeight="500" fontFamily="'Noto Sans JP', sans-serif" letterSpacing="0.06em">
            {displayName}
          </text>
          <text x={blockW + 20} y={H * 0.82} dominantBaseline="central" fill={ac} fontSize={8} fontFamily="'Noto Sans JP', sans-serif" opacity={0.6} letterSpacing="0.15em">
            {name.includes("株式会社") ? "KABUSHIKI KAISHA" : name.includes("有限会社") ? "YUGEN KAISHA" : name.includes("合同会社") ? "GODO KAISHA" : "CORPORATION"}
          </text>
        </>);
      }

      // ── Style 1: Large initial center + underline + small name ──
      case 1: {
        const lineW = 30 + Math.floor(r(2) * 30);
        return (<>
          <text x={W / 2} y={38} textAnchor="middle" dominantBaseline="central" fill={ac} fontSize={40} fontWeight="700" fontFamily="'Shippori Mincho', serif" opacity={0.85}>
            {initial}
          </text>
          <line x1={(W - lineW) / 2} y1={60} x2={(W + lineW) / 2} y2={60} stroke={ac} strokeWidth={1} opacity={0.4} />
          <text x={W / 2} y={78} textAnchor="middle" dominantBaseline="central" fill={textSub} fontSize={11} fontFamily="'Noto Sans JP', sans-serif" letterSpacing="0.1em">
            {displayName}
          </text>
        </>);
      }

      // ── Style 2: Geometric symbol + company name side by side ──
      case 2: {
        const shape = (h >> 3) % 3;
        const cx = 50, cy = H / 2;
        const sz = 16 + Math.floor(r(3) * 6);
        let symbol;
        if (shape === 0) {
          symbol = <circle cx={cx} cy={cy} r={sz} fill="none" stroke={ac} strokeWidth={1.5} opacity={0.65} />;
        } else if (shape === 1) {
          const pts = `${cx},${cy - sz} ${cx + sz * 0.87},${cy + sz * 0.5} ${cx - sz * 0.87},${cy + sz * 0.5}`;
          symbol = <polygon points={pts} fill="none" stroke={ac} strokeWidth={1.5} opacity={0.65} />;
        } else {
          const pts = Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 2;
            return `${cx + sz * Math.cos(a)},${cy + sz * Math.sin(a)}`;
          }).join(" ");
          symbol = <polygon points={pts} fill="none" stroke={ac} strokeWidth={1.5} opacity={0.65} />;
        }
        return (<>
          {symbol}
          <circle cx={cx} cy={cy} r={3} fill={ac} opacity={0.5} />
          <text x={90} y={H * 0.42} dominantBaseline="central" fill={textMain} fontSize={15} fontWeight="600" fontFamily="'Shippori Mincho', serif" letterSpacing="0.05em">
            {displayName}
          </text>
          <line x1={90} y1={H * 0.58} x2={90 + displayName.length * 13} y2={H * 0.58} stroke={ac} strokeWidth={0.5} opacity={0.3} />
          <text x={90} y={H * 0.75} dominantBaseline="central" fill={textSub} fontSize={8} fontFamily="'Noto Sans JP', sans-serif" opacity={0.5} letterSpacing="0.15em">
            MIYAZAKI
          </text>
        </>);
      }

      // ── Style 3: Gradient bar top + centered name ──
      case 3: {
        const barH = 4 + Math.floor(r(4) * 4);
        const gradId = `grad-${h}`;
        return (<>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={ac} stopOpacity={0.8} />
              <stop offset="50%" stopColor={ac} stopOpacity={0.2} />
              <stop offset="100%" stopColor={ac} stopOpacity={0.6} />
            </linearGradient>
          </defs>
          <rect x={0} y={0} width={W} height={barH} fill={`url(#${gradId})`} />
          <text x={W / 2} y={H * 0.52} textAnchor="middle" dominantBaseline="central" fill={textMain} fontSize={17} fontWeight="500" fontFamily="'Noto Sans JP', sans-serif" letterSpacing="0.08em">
            {displayName}
          </text>
          <text x={W / 2} y={H * 0.78} textAnchor="middle" dominantBaseline="central" fill={ac} fontSize={7} fontFamily="'Noto Sans JP', sans-serif" opacity={0.5} letterSpacing="0.2em">
            SINCE {2000 + (h % 25)}
          </text>
        </>);
      }

      // ── Style 4: Border frame + centered name ──
      case 4: {
        const inset = 6 + Math.floor(r(5) * 4);
        const corner = 2 + Math.floor(r(6) * 4);
        return (<>
          <rect x={inset} y={inset} width={W - inset * 2} height={H - inset * 2} rx={corner} fill="none" stroke={ac} strokeWidth={1} opacity={0.35} />
          <rect x={inset + 4} y={inset + 4} width={W - inset * 2 - 8} height={H - inset * 2 - 8} rx={Math.max(0, corner - 1)} fill="none" stroke={ac} strokeWidth={0.5} opacity={0.15} />
          <text x={W / 2} y={H * 0.44} textAnchor="middle" dominantBaseline="central" fill={textMain} fontSize={16} fontWeight="600" fontFamily="'Shippori Mincho', serif" letterSpacing="0.1em">
            {displayName}
          </text>
          <text x={W / 2} y={H * 0.68} textAnchor="middle" dominantBaseline="central" fill={ac} fontSize={8} fontFamily="'Noto Sans JP', sans-serif" opacity={0.45} letterSpacing="0.25em">
            {name.includes("株式会社") ? "Co., Ltd." : name.includes("有限会社") ? "Ltd." : name.includes("合同会社") ? "LLC" : "Corp."}
          </text>
        </>);
      }

      // ── Style 5: Pattern background (dots/lines) + company name ──
      case 5: {
        const patternType = (h >> 3) % 2;
        const patId = `pat-${h}`;
        let patternDef;
        if (patternType === 0) {
          patternDef = (
            <pattern id={patId} width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1" fill={ac} opacity={isLight ? 0.25 : 0.15} />
            </pattern>
          );
        } else {
          patternDef = (
            <pattern id={patId} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="10" stroke={ac} strokeWidth="0.5" opacity={isLight ? 0.2 : 0.12} />
            </pattern>
          );
        }
        const boxFill = isLight ? "rgba(255,255,255,0.6)" : "rgba(13,27,53,0.7)";
        return (<>
          <defs>{patternDef}</defs>
          <rect x={0} y={0} width={W} height={H} fill={`url(#${patId})`} />
          <rect x={W * 0.15} y={H * 0.25} width={W * 0.7} height={H * 0.5} rx={4} fill={boxFill} />
          <text x={W / 2} y={H * 0.5} textAnchor="middle" dominantBaseline="central" fill={textMain} fontSize={16} fontWeight="500" fontFamily="'Noto Sans JP', sans-serif" letterSpacing="0.08em">
            {displayName}
          </text>
        </>);
      }
    }
  }

  return (
    <div style={{ height: size ? `${size}px` : undefined, width: "100%", aspectRatio: "3/1", background: bg.color, border: `1px solid ${borderColor}`, borderRadius: "6px", overflow: "hidden" }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        {renderStyle()}
      </svg>
    </div>
  );
}

// ========== SPONSOR MARQUEE ==========
function SponsorMarquee() {
  const [paused, setPaused] = useState(false);
  const [row1, setRow1] = useState<{ id: number; name: string; tier: string }[]>([]);
  const [row2, setRow2] = useState<{ id: number; name: string; tier: string }[]>([]);
  useEffect(() => {
    const all = [
      ...SPONSORS.premium.map((s) => ({ ...s, tier: "premium" })),
      ...SPONSORS.gold.map((s) => ({ ...s, tier: "gold" })),
      ...SPONSORS.silver.map((s) => ({ ...s, tier: "silver" })),
      ...SPONSORS.bronze.map((s) => ({ ...s, tier: "bronze" })),
      ...SPONSORS.action.map((s) => ({ ...s, tier: "action" })),
      ...SPONSORS.light.map((s) => ({ ...s, tier: "light" })),
    ];
    const a = [...all];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    const b = [...all];
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    setRow1(a);
    setRow2(b);
  }, []);

  if (row1.length === 0) return null;

  const items1 = [...row1, ...row1];
  const items2 = [...row2, ...row2];

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        padding: "32px 0",
        overflow: "hidden",
        opacity: 0.8,
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}>
      {/* 上段：左に流れる */}
      <div style={{
        display: "flex",
        gap: "24px",
        width: "max-content",
        animation: "marqueeScroll 240s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}>
        {items1.map((s, i) => (
          <div key={`r1-${s.id}-${i}`} style={{ flex: "0 0 auto", width: "216px" }}>
            <LogoMark name={s.name} tier={s.tier} />
          </div>
        ))}
      </div>
      {/* 下段：右に流れる */}
      <div style={{
        display: "flex",
        gap: "24px",
        width: "max-content",
        animation: "marqueeScrollReverse 240s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}>
        {items2.map((s, i) => (
          <div key={`r2-${s.id}-${i}`} style={{ flex: "0 0 auto", width: "216px" }}>
            <LogoMark name={s.name} tier={s.tier} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ========== HERO ==========
function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  return (
    <section style={{ minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* 背景グラデーション */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,150,58,0.15) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(201,150,58,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,150,58,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* 装飾文字 */}
      <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", writingMode: "vertical-rl", fontSize: "120px", fontWeight: "900", color: "rgba(201,150,58,0.04)", fontFamily: "'Shippori Mincho', serif", userSelect: "none" }}>文化</div>
      <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", writingMode: "vertical-rl", fontSize: "120px", fontWeight: "900", color: "rgba(201,150,58,0.04)", fontFamily: "'Shippori Mincho', serif", userSelect: "none" }}>貢献</div>

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", width: "100%", maxWidth: "900px", margin: "0 auto", overflow: "visible" }}>
        {/* アイキャッチラベル */}
        <div style={{ marginBottom: "28px", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s" }}>
          <SectionLabel>宮崎デジタルアーカイブプロジェクト</SectionLabel>
        </div>

        {/* メインキャッチコピー */}
        <h1 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(1.8rem, 4.5vw, 4.5rem)", fontWeight: "700", lineHeight: "1.1", margin: "0 0 32px", textAlign: "center", width: "100%", whiteSpace: "nowrap", opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(30px)", transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s" }}>
          <span className="shimmer-text">宮崎の文化を、守る人</span>
          <span style={{ color: "#F5F0E6" }}>たち</span>
        </h1>

        {/* サブコピー 3行構成 */}
        <div style={{ marginBottom: "36px", opacity: mounted ? 1 : 0, transition: "opacity 1s ease 0.5s" }}>
          <p style={{ fontSize: "clamp(12px, 1.5vw, 14px)", color: "#C9963A", letterSpacing: "0.2em", marginBottom: "16px" }}>
            宮崎県内 博物館デジタルアーカイブ化プロジェクト
          </p>
          <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(18px, 2.5vw, 24px)", color: "#F5F0E6", fontWeight: "600", lineHeight: "1.6", marginBottom: "20px" }}>
            宮崎の文化を守り、応援するメセナ企業
          </p>
          <p style={{ fontSize: "clamp(13px, 1.5vw, 15px)", color: "#B8B0A0", lineHeight: "1.9", fontFamily: "'Noto Serif JP', serif" }}>
            宮崎の博物館・文化施設をデジタルで未来へ繋ぐ。<br />そのパートナーを、ここに刻みます。
          </p>
        </div>

        {/* CTAボタン */}
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", opacity: mounted ? 1 : 0, transition: "opacity 1s ease 0.9s" }}>
          <a href="#sponsors" style={{ padding: "18px 48px", background: "linear-gradient(135deg, #8A6420, #C9963A)", color: "#0D1B35", borderRadius: "4px", fontWeight: "700", fontSize: "14px", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>
            協賛企業を見る
          </a>
          <a href="#contact" style={{ padding: "18px 48px", border: "1px solid rgba(201,150,58,0.6)", color: "#E4B96A", borderRadius: "4px", fontSize: "14px", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>
            協賛を申し込む
          </a>
        </div>
      </div>

      {/* スクロール矢印 */}
      <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", textAlign: "center", opacity: mounted ? 0.5 : 0, transition: "opacity 1s ease 1.2s" }}>
        <div style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#C9963A", marginBottom: "8px" }}>SCROLL</div>
        <div style={{ width: "1px", height: "48px", background: "linear-gradient(to bottom, #C9963A, transparent)", margin: "0 auto" }} />
      </div>
    </section>
  );
}

// ========== STATS ==========
function Stats() {
  const { ref, visible } = useReveal();
  const merits = [
    { icon: "\uD83D\uDDC2\uFE0F", title: "情報の保存と体系化", desc: "貴重な資料をデジタルで永続保存。散逸・劣化のリスクから文化を守ります。" },
    { icon: "\uD83C\uDF10", title: "資料の公共化", desc: "誰でもどこからでもアクセス可能に。地域の宝が世界に開かれます。" },
    { icon: "\uD83C\uDF93", title: "デジタル化によって教育コンテンツが豊富に", desc: "今まで観るだけだった所蔵品が、データになって五感で楽しめる体験へ。" },
    { icon: "\u2708\uFE0F", title: "観光・臨時閉館時にも活躍", desc: "閉館中でもオンラインで施設の魅力を発信。インバウンド観光にも貢献します。" },
  ];
  return (
    <section ref={ref} style={{ padding: "100px 24px", borderTop: "1px solid rgba(201,150,58,0.15)", borderBottom: "1px solid rgba(201,150,58,0.15)", background: "rgba(201,150,58,0.04)" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* タイトル */}
        <div style={{ textAlign: "center", marginBottom: "56px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <SectionLabel>DIGITAL ARCHIVE MERITS</SectionLabel>
          <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(20px, 3.5vw, 32px)", fontWeight: "700", color: "#F5F0E6", letterSpacing: "0.06em" }}>
            博物館がデジタルアーカイブ化されることのメリット
          </h2>
        </div>

        {/* メリットカード4枚 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", marginBottom: "64px" }}>
          {merits.map((m, i) => (
            <div key={i} style={{
              borderRadius: "12px",
              padding: "32px 24px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,150,58,0.2)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`,
            }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>{m.icon}</div>
              <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "15px", fontWeight: "600", color: "#F5F0E6", marginBottom: "12px", lineHeight: "1.6" }}>{m.title}</h3>
              <p style={{ fontSize: "13px", color: "#B8B0A0", lineHeight: "1.8" }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* 区切り線 */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, rgba(201,150,58,0.3), transparent)", marginBottom: "48px" }} />

        {/* 数字でインパクト */}
        <div style={{ textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s" }}>
          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "#B8B0A0", marginBottom: "40px", fontFamily: "'Noto Serif JP', serif" }}>
            このデジタル化が進むことで、宮崎県内の
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "80px", marginBottom: "40px" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Shippori Mincho', serif", marginBottom: "8px" }}>
                <span className="shimmer-text" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "800" }}>115,000</span>
                <span style={{ fontSize: "16px", color: "#E4B96A", marginLeft: "4px" }}>人</span>
              </div>
              <div style={{ fontSize: "14px", color: "#F5F0E6", fontWeight: "500", marginBottom: "4px" }}>教育リーチ対象</div>
              <div style={{ fontSize: "12px", color: "#B8B0A0" }}>県内の小中高校生</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Shippori Mincho', serif", marginBottom: "8px" }}>
                <span className="shimmer-text" style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: "800" }}>1,357万</span>
                <span style={{ fontSize: "16px", color: "#E4B96A", marginLeft: "4px" }}>人</span>
              </div>
              <div style={{ fontSize: "14px", color: "#F5F0E6", fontWeight: "500", marginBottom: "4px" }}>年間来県観光客数</div>
              <div style={{ fontSize: "12px", color: "#B8B0A0" }}>インバウンド含む</div>
            </div>
          </div>

          <p style={{ fontSize: "clamp(14px, 1.8vw, 16px)", color: "#B8B0A0", fontFamily: "'Noto Serif JP', serif", lineHeight: "1.9" }}>
            が、今よりも積極的に地元の博物館と関わる機会が増え、<br />教育現場や観光活用が加速します。
          </p>
        </div>
      </div>
    </section>
  );
}

// ========== ABOUT ==========
function About() {
  const { ref, visible } = useReveal();
  const cards = [
    { icon: "⛩", title: "文化への貢献", desc: "宮崎の博物館・文化施設のデジタル化を支援し、地域の記憶を次世代へ伝える活動への参加証です。" },
    { icon: "🎓", title: "教育への投資", desc: "県内約11万5千人の小・中・高校生が文化と歴史を学ぶ環境づくりに貢献していることの証明です。" },
    { icon: "🌏", title: "メセナ企業として", desc: "宮崎日日新聞社・MRT宮崎放送・UMKテレビ宮崎が後援するプロジェクトへの参加実績として、地域社会への貢献を対外的に発信できます。" },
  ];
  return (
    <section style={{ padding: "120px 24px" }}>
      <div ref={ref} style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <SectionLabel>ABOUT THIS PAGE</SectionLabel>
          <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: "700", color: "#F5F0E6", margin: "0 0 24px", lineHeight: "1.4", letterSpacing: "0.08em" }}>
            このページに掲載されることの<br />意味について
          </h2>
          <div style={{ width: "48px", height: "2px", background: "linear-gradient(to right, transparent, #C9963A, transparent)", margin: "0 auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "64px" }}>
          {cards.map((c, i) => (
            <div key={i} style={{ padding: "40px 32px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,150,58,0.18)", textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.8s ease ${0.15 + i * 0.12}s, transform 0.8s ease ${0.15 + i * 0.12}s` }}>
              <div style={{ fontSize: "40px", marginBottom: "20px" }}>{c.icon}</div>
              <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "18px", color: "#E4B96A", marginBottom: "16px", fontWeight: "600" }}>{c.title}</h3>
              <p style={{ fontSize: "14px", color: "#B8B0A0", lineHeight: "1.9" }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ padding: "48px 56px", borderRadius: "12px", background: "rgba(201,150,58,0.05)", border: "1px solid rgba(201,150,58,0.2)", textAlign: "center", opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
          <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(15px, 2vw, 18px)", color: "#F5F0E6", lineHeight: "2.2", margin: "0 0 20px" }}>
            「宮崎には、まだ世に知られていない文化の宝が無数に眠っています。<br />
            それを守り、伝え、学びに変えるために —<br />
            <strong style={{ color: "#E4B96A" }}>あなたの企業が、その物語の一部になります。」</strong>
          </p>
          <p style={{ fontSize: "12px", letterSpacing: "0.15em", color: "#C9963A" }}>— museumpick Inc. 代表取締役 平林 聡一朗</p>
        </div>
      </div>
    </section>
  );
}

// ========== SPONSORS ==========
function TierDivider({ label, price, color }: { label: string; price: string; color: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px", margin: "72px 0 32px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <span style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.2em", color, border: `1px solid ${color}66`, borderRadius: "20px", padding: "4px 16px" }}>{label}</span>
        <span style={{ fontSize: "13px", color: "#B8B0A0" }}>{price}</span>
      </div>
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(to right, ${color}44, transparent)` }} />
    </div>
  );
}

function Sponsors() {
  const { ref, visible } = useReveal();
  return (
    <section id="sponsors" style={{ padding: "80px 24px 120px" }}>
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "80px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <SectionLabel>OUR SPONSORS</SectionLabel>
          <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "700", color: "#F5F0E6", margin: "0 0 16px", letterSpacing: "0.06em" }}>協賛企業・団体</h2>
          <p style={{ fontSize: "15px", color: "#B8B0A0" }}>宮崎の文化と未来を共に守ってくださる企業・団体のみなさまです</p>
        </div>

        {/* PREMIUM */}
        <TierDivider label="PREMIUM" price="要相談" color="#F5D080" />
        {SPONSORS.premium.map(s => (
          <div key={s.id} style={{ borderRadius: "16px", padding: "48px 56px", background: "linear-gradient(135deg, rgba(245,208,128,0.1), rgba(201,150,58,0.04))", border: "1px solid rgba(245,208,128,0.35)", marginBottom: "16px", animation: "pulse-gold 3s ease-in-out infinite" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "48px" }}>
              <div style={{ flexShrink: 0 }}>
                <LogoMark name={s.name} tier="premium" size={120} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#F5D080", marginBottom: "10px" }}>{s.industry}</p>
                <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(22px, 3vw, 32px)", color: "#F5F0E6", fontWeight: "700", marginBottom: "8px" }}>{s.name}</h3>
                <p style={{ fontSize: "14px", color: "#B8B0A0", marginBottom: "16px" }}>{s.nameEn}</p>
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "16px", color: "#E4B96A" }}>「{s.tagline}」</p>
              </div>
              <div style={{ textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: "36px", marginBottom: "8px" }}>👑</div>
                <div style={{ fontSize: "10px", letterSpacing: "0.2em", color: "#F5D080" }}>PREMIUM</div>
                <div style={{ fontSize: "11px", color: "#B8B0A0", marginTop: "4px" }}>最高位スポンサー</div>
              </div>
            </div>
          </div>
        ))}

        {/* GOLD */}
        <TierDivider label="GOLD" price="100万円" color="#C9963A" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {SPONSORS.gold.map(s => (
            <div key={s.id} style={{ borderRadius: "12px", padding: "32px 24px", background: "rgba(201,150,58,0.06)", border: "1px solid rgba(201,150,58,0.25)", textAlign: "center", transition: "transform 0.3s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-4px)")} onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              <div style={{ marginBottom: "20px" }}>
                <LogoMark name={s.name} tier="gold" size={100} />
              </div>
              <p style={{ fontSize: "11px", color: "#C9963A", letterSpacing: "0.15em", marginBottom: "8px" }}>{s.industry}</p>
              <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "15px", color: "#F5F0E6", fontWeight: "600", lineHeight: "1.5" }}>{s.name}</h3>
              <p style={{ fontSize: "12px", color: "#B8B0A0", marginTop: "4px" }}>{s.nameEn}</p>
            </div>
          ))}
        </div>

        {/* SILVER */}
        <TierDivider label="SILVER" price="50万円" color="#B8B0A0" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
          {SPONSORS.silver.map(s => (
            <div key={s.id} style={{ borderRadius: "10px", padding: "24px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(184,176,160,0.2)", textAlign: "center", transition: "transform 0.3s ease" }} onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")} onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
              <div style={{ marginBottom: "14px" }}>
                <LogoMark name={s.name} tier="silver" size={80} />
              </div>
              <p style={{ fontSize: "10px", color: "#B8B0A0", letterSpacing: "0.1em", marginBottom: "6px" }}>{s.industry}</p>
              <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "13px", color: "#E8E0D0", lineHeight: "1.5" }}>{s.name}</h3>
            </div>
          ))}
        </div>

        {/* BRONZE */}
        <TierDivider label="BRONZE" price="30万円" color="#CD7F32" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
          {SPONSORS.bronze.map(s => (
            <div key={s.id} style={{ borderRadius: "8px", padding: "16px 10px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(205,127,50,0.18)", textAlign: "center" }}>
              <div style={{ marginBottom: "10px" }}>
                <LogoMark name={s.name} tier="bronze" size={64} />
              </div>
              <h3 style={{ fontSize: "10px", color: "#E8E0D0", lineHeight: "1.5", fontFamily: "'Noto Serif JP', serif" }}>{s.name}</h3>
            </div>
          ))}
        </div>

        {/* LIGHT */}
        <TierDivider label="LIGHT" price="10万円" color="#8A9BB0" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
          {SPONSORS.light.map(s => (
            <div key={s.id} style={{ borderRadius: "8px", padding: "16px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(138,155,176,0.18)", textAlign: "center" }}>
              <div style={{ marginBottom: "10px" }}>
                <LogoMark name={s.name} tier="light" size={56} />
              </div>
              <h3 style={{ fontSize: "10px", color: "#E8E0D0", lineHeight: "1.5", fontFamily: "'Noto Serif JP', serif" }}>{s.name}</h3>
            </div>
          ))}
        </div>

        {/* ACTION */}
        <TierDivider label="ACTION" price="6万円" color="#6B9E78" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
          {SPONSORS.action.map(s => (
            <div key={s.id} style={{ borderRadius: "8px", padding: "16px 10px", background: "rgba(107,158,120,0.04)", border: "1px solid rgba(107,158,120,0.18)", textAlign: "center" }}>
              <div style={{ marginBottom: "10px" }}>
                <LogoMark name={s.name} tier="action" size={60} />
              </div>
              <h3 style={{ fontSize: "10px", color: "#E8E0D0", lineHeight: "1.5", fontFamily: "'Noto Serif JP', serif" }}>{s.name}</h3>
            </div>
          ))}
        </div>

        {/* 合計 */}
        <div style={{ marginTop: "64px", textAlign: "center", padding: "32px", borderRadius: "12px", background: "rgba(201,150,58,0.04)", border: "1px solid rgba(201,150,58,0.12)" }}>
          <p style={{ fontSize: "15px", color: "#B8B0A0" }}>
            現在 <span className="shimmer-text" style={{ fontSize: "28px", fontWeight: "800", fontFamily: "'Shippori Mincho', serif" }}>{Object.values(SPONSORS).flat().length}</span> 社・団体が宮崎の文化を支援しています
          </p>
          <p style={{ fontSize: "11px", color: "#C9963A", marginTop: "8px", letterSpacing: "0.1em" }}>※ 掲載企業名・ロゴはデモ用のダミーです</p>
        </div>
      </div>
    </section>
  );
}

// ========== INTERVIEW ==========
function Interview() {
  const { ref, visible } = useReveal();
  return (
    <section style={{ padding: "120px 24px", background: "rgba(255,255,255,0.02)" }}>
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "64px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <SectionLabel>REPRESENTATIVE INTERVIEW</SectionLabel>
          <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: "700", color: "#F5F0E6", letterSpacing: "0.06em" }}>プレミアムスポンサー代表者様インタビュー</h2>
        </div>

        <div style={{ display: "flex", gap: "48px", alignItems: "stretch", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s" }}>
          {/* 左側：動画エリア */}
          <div style={{ width: "55%", flexShrink: 0 }}>
            <div style={{ position: "relative", aspectRatio: "2/1", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(201,150,58,0.3)", background: "#0A0F1E" }}>
              <iframe
                src=""
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* プレースホルダー */}
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", border: "2px solid rgba(201,150,58,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 0, height: 0, borderTop: "12px solid transparent", borderBottom: "12px solid transparent", borderLeft: "20px solid rgba(201,150,58,0.7)", marginLeft: "4px" }} />
                </div>
                <span style={{ fontSize: "13px", color: "#B8B0A0", letterSpacing: "0.1em" }}>動画準備中</span>
              </div>
            </div>
          </div>

          {/* 右側：プロフィールエリア */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "12px", color: "#C9963A", letterSpacing: "0.2em", marginBottom: "8px" }}>代表取締役</p>
            <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "700", color: "#F5F0E6", marginBottom: "6px" }}>博物館 一朗</h3>
            <p style={{ fontSize: "13px", color: "#B8B0A0", letterSpacing: "0.1em", marginBottom: "24px" }}>Ichiro Hakubutsukan</p>

            <div style={{ height: "1px", background: "linear-gradient(to right, rgba(201,150,58,0.3), transparent)", marginBottom: "24px" }} />

            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "15px", color: "#F5F0E6", fontWeight: "600", marginBottom: "12px" }}>宮崎総合ホールディングス株式会社</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "#B8B0A0" }}>
                <p>設立：1991年12月</p>
                <p>所在地：宮崎県宮崎市橘通西１丁目１−１</p>
                <p>URL：<a href="https://miyazakigeneral-holdings.com" target="_blank" rel="noopener noreferrer" style={{ color: "#C9963A", textDecoration: "none" }}>miyazakigeneral-holdings.com</a></p>
              </div>
            </div>

          </div>
        </div>

        {/* 引用ブロック（全幅） */}
        <div style={{ marginTop: "40px", padding: "28px 32px", borderRadius: "8px", background: "rgba(201,150,58,0.04)", borderLeft: "3px solid rgba(201,150,58,0.4)", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s" }}>
          <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "14px", color: "#E8E0D0", lineHeight: "2.2" }}>
            私たちが博物館のデジタルアーカイブ化事業に協賛を決めたのは、宮崎という土地に深く根ざした企業としての使命感からでした。創業以来30年以上、この地で事業を営んできた私たちにとって、宮崎の文化や歴史は単なる観光資源ではなく、地域社会を支える精神的な柱です。しかし現実には、多くの博物館が予算不足や人材難に直面し、貴重な所蔵品が十分に活用されないまま眠り続けているのを目の当たりにしてきました。デジタルアーカイブ化は、その現状を根本から変える可能性を秘めています。県内11万5千人の子どもたちが、教室にいながら宮崎の歴史と対話できる。年間1,357万人の来県者が、スマートフォン一つで地域文化の深みに触れられる。そうした未来は、企業が地域に投資することで初めて実現します。私たちは利益を地域に還元することを経営の根幹に置いています。今回の協賛は、その理念の自然な表れです。宮崎の文化を守ることは、次世代への最大の贈り物だと信じています。
          </p>
        </div>
      </div>
    </section>
  );
}

// ========== DEMO ==========
function Demo() {
  const { ref, visible } = useReveal();
  const eduCards = [
    { title: "日本の像図鑑", src: "https://statue-japan.vercel.app/", url: "https://statue-japan.vercel.app/" },
    { title: "ぬりえメーカー", src: "https://nurie-maker-eight.vercel.app/", url: "https://nurie-maker-eight.vercel.app/" },
    { title: "ミュージアムクエスト", src: "https://museum-quest.vercel.app/", url: "https://museum-quest.vercel.app/" },
  ];
  return (
    <section style={{ padding: "120px 24px" }}>
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* タイトル */}
        <div style={{ textAlign: "center", marginBottom: "64px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <SectionLabel>DIGITAL ARCHIVE DEMO</SectionLabel>
          <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(24px, 4vw, 40px)", fontWeight: "700", color: "#F5F0E6", letterSpacing: "0.06em", marginBottom: "16px" }}>
            実際のデジタルアーカイブを体験する
          </h2>
          <p style={{ fontSize: "15px", color: "#B8B0A0" }}>宮崎県内の文化施設で、すでに稼働しているサービスをご覧ください</p>
        </div>

        {/* ブロック①：デジタルアーカイブサイト */}
        <div style={{ marginBottom: "64px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s" }}>
          <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "18px", fontWeight: "600", color: "#F5F0E6", marginBottom: "20px" }}>
            椎葉民俗芸能博物館 デジタルアーカイブ
          </h3>
          <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", position: "relative", background: "#0A0F1E" }}>
            <iframe
              src="https://da.museumpick.com/user/shiiba/artifacts?lang=ja"
              style={{ width: "100%", height: "500px", border: "none", display: "block", pointerEvents: "none" }}
              sandbox="allow-scripts allow-same-origin"
              loading="lazy"
            />
            <noscript>
              <div style={{ padding: "40px", textAlign: "center" }}>
                <a href="https://da.museumpick.com/user/shiiba/artifacts?lang=ja" target="_blank" rel="noopener noreferrer" style={{ color: "#C9963A", textDecoration: "none" }}>サイトを直接開く</a>
              </div>
            </noscript>
          </div>
          <div style={{ textAlign: "right", marginTop: "12px" }}>
            <a href="https://da.museumpick.com/user/shiiba/artifacts?lang=ja" target="_blank" rel="noopener noreferrer" style={{ fontSize: "14px", color: "#C9963A", textDecoration: "none", letterSpacing: "0.05em" }}>
              サイトを開く →
            </a>
          </div>
        </div>

        {/* ブロック②：教育コンテンツ */}
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s" }}>
          <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "18px", fontWeight: "600", color: "#F5F0E6", marginBottom: "20px" }}>
            教育活用コンテンツ
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {eduCards.map((card, i) => (
              <div key={i} style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ position: "relative", background: "#0A0F1E" }}>
                  <iframe
                    src={card.src}
                    style={{ width: "100%", height: "300px", border: "none", display: "block", pointerEvents: "none" }}
                    sandbox="allow-scripts allow-same-origin"
                    loading="lazy"
                  />
                </div>
                <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ fontSize: "14px", color: "#F5F0E6", fontWeight: "500" }}>{card.title}</p>
                  <a href={card.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: "13px", color: "#C9963A", textDecoration: "none" }}>
                    開く →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== PLANS ==========
function Plans() {
  const { ref, visible } = useReveal();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const lowerPlans = [
    { tier: "BRONZE", price: "30万円", color: "#CD7F32", items: ["サイトロゴ掲載 1年（中）", "PR記事作成・納品", "施設チケット 100枚", "感謝状・トロフィー"] },
    { tier: "LIGHT", price: "10万円", color: "#8A9BB0", items: ["特設サイトへのロゴ掲載", "PR記事作成・納品", "感謝状・トロフィー", "コミュニティイベントご招待"] },
    { tier: "ACTION", price: "6万円", color: "#6B9E78", items: ["特設サイトへのロゴ掲載", "PR記事作成・納品"] },
  ];
  return (
    <section id="plans" style={{ padding: "120px 24px", background: "rgba(0,0,0,0.15)" }}>
      <div ref={ref} style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "72px", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
          <SectionLabel>SPONSOR PLANS</SectionLabel>
          <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: "700", color: "#F5F0E6", margin: "0 0 16px", letterSpacing: "0.06em" }}>スポンサープラン</h2>
          <p style={{ fontSize: "15px", color: "#B8B0A0" }}>御社のご予算や目的に合わせてお選びいただけます</p>
        </div>

        {/* 上段：PREMIUM・GOLD・SILVERのテキストブロック */}
        <div style={{
          borderRadius: "16px",
          padding: "40px 48px",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(201,150,58,0.25)",
          marginBottom: "32px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
        }}>
          <h3 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(16px, 2.5vw, 22px)", fontWeight: "700", color: "#F5F0E6", marginBottom: "24px", lineHeight: "1.7" }}>
            プレミアム、ゴールド、シルバープランをご希望の方はお問い合わせください。
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px 32px" }}>
            {[
              "代表者様取材・特別コンテンツ制作",
              "サイトロゴ掲載 5年（大）",
              "ワークショップ主催",
              "PR記事作成・配信",
              "ワークショップ開催",
              "施設ツアー開催など多数。",
            ].map((item, j) => (
              <li key={j} style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#B8B0A0", lineHeight: "1.8" }}>
                <span style={{ color: "#C9963A", flexShrink: 0, marginTop: "3px" }}>◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 下段：BRONZE・LIGHT・ACTION 3カード */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", alignItems: "stretch" }}>
          {lowerPlans.map((p, i) => {
            const isHovered = hoveredPlan === p.tier;
            const anyHovered = hoveredPlan !== null;
            return (
              <div
                key={p.tier}
                onMouseEnter={() => setHoveredPlan(p.tier)}
                onMouseLeave={() => setHoveredPlan(null)}
                style={{
                  borderRadius: "16px",
                  padding: "40px 32px",
                  background: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isHovered ? p.color : `${p.color}44`}`,
                  boxShadow: isHovered ? `0 12px 40px rgba(201,150,58,0.25)` : "none",
                  opacity: visible ? (anyHovered && !isHovered ? 0.75 : 1) : 0,
                  transform: visible
                    ? isHovered
                      ? "translateY(-8px) scaleX(1.08) scaleY(1.12)"
                      : "translateY(0) scale(1)"
                    : "translateY(24px)",
                  zIndex: isHovered ? 10 : 1,
                  position: "relative" as const,
                  transition: `opacity 0.3s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1), border 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)`,
                  display: "flex",
                  flexDirection: "column" as const,
                }}
              >
                <p style={{ fontSize: "13px", letterSpacing: "0.2em", color: p.color, marginBottom: "10px" }}>{p.tier}</p>
                <p style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: "700", color: "#F5F0E6", marginBottom: "6px" }}>{p.price}</p>
                <p style={{ fontSize: "13px", color: "#B8B0A0", marginBottom: "28px" }}>税別</p>
                <div style={{ height: "1px", background: `linear-gradient(to right, ${p.color}44, transparent)`, marginBottom: "24px" }} />
                <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
                  {p.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: "12px", marginBottom: "16px", fontSize: "14px", color: "#B8B0A0", lineHeight: "1.7" }}>
                      <span style={{ color: p.color, flexShrink: 0, marginTop: "3px" }}>◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <p style={{ textAlign: "center", marginTop: "32px", fontSize: "13px", color: "#B8B0A0" }}>各プランの詳細・カスタマイズについては、お気軽にお問い合わせください</p>
      </div>
    </section>
  );
}

// ========== CONTACT ==========
function Contact() {
  const { ref, visible } = useReveal();
  return (
    <section id="contact" style={{ padding: "120px 24px" }}>
      <div ref={ref} style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
        <SectionLabel>JOIN US</SectionLabel>
        <h2 style={{ fontFamily: "'Shippori Mincho', serif", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: "700", color: "#F5F0E6", margin: "0 0 24px", lineHeight: "1.4" }}>
          一緒に宮崎の文化を<br />守りませんか
        </h2>
        <p style={{ fontSize: "16px", color: "#B8B0A0", lineHeight: "2", marginBottom: "56px" }}>
          宮崎のメセナ文化を育て、地域の記憶を未来へ。<br />
          御社の名前を、宮崎の文化の歴史に刻んでください。
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", marginBottom: "64px", flexWrap: "wrap" }}>
          <a href="https://museumpick.com/" target="_blank" rel="noopener noreferrer" style={{ padding: "18px 48px", background: "linear-gradient(135deg, #C9963A, #F5D080)", color: "#0D1B35", borderRadius: "4px", fontWeight: "700", fontSize: "15px", letterSpacing: "0.15em", textDecoration: "none" }}>協賛を申し込む</a>
          <a href="https://museumpick.com/" target="_blank" rel="noopener noreferrer" style={{ padding: "18px 48px", border: "1px solid rgba(201,150,58,0.5)", color: "#E4B96A", borderRadius: "4px", fontSize: "15px", letterSpacing: "0.15em", textDecoration: "none" }}>資料を請求する</a>
        </div>
        <div style={{ padding: "32px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,150,58,0.15)" }}>
          <p style={{ fontSize: "12px", color: "#B8B0A0", letterSpacing: "0.1em", marginBottom: "16px" }}>後援</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
            {["宮崎日日新聞社", "MRT宮崎放送", "UMKテレビ宮崎"].map(e => (
              <span key={e} style={{ padding: "8px 20px", borderRadius: "24px", border: "1px solid rgba(201,150,58,0.2)", color: "#E8E0D0", fontSize: "13px" }}>{e}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ========== FOOTER ==========
function Footer() {
  return (
    <footer style={{ padding: "48px 24px", textAlign: "center", borderTop: "1px solid rgba(201,150,58,0.12)" }}>
      <p style={{ fontSize: "13px", color: "#C9963A", fontFamily: "'Shippori Mincho', serif", letterSpacing: "0.1em", marginBottom: "16px" }}>
        ー宮崎県内 博物館デジタルアーカイブ化プロジェクトー
      </p>
      <p style={{ fontSize: "13px", color: "#B8B0A0", marginBottom: "8px" }}>
        事務局：株式会社ミュージアムピック
      </p>
      <p style={{ fontSize: "13px", color: "#B8B0A0", marginBottom: "8px" }}>
        © 2026 museumpick.inc　All rights reserved.
      </p>
      <p style={{ fontSize: "12px", color: "rgba(201,150,58,0.4)", marginBottom: "8px" }}>
        宮崎県宮崎市江平東町 11-6
      </p>
      <p style={{ fontSize: "12px" }}>
        問い合わせ：<a href="mailto:info@museumpick.com" style={{ color: "#C9963A", textDecoration: "none" }}>info@museumpick.com</a>
      </p>
    </footer>
  );
}

export default function Home() {
  return (
    <main style={{ width: "100%", overflowX: "hidden" }}>
      <Hero />
      <SponsorMarquee />
      <Stats />
      <About />
      <Sponsors />
      <Interview />
      <Demo />
      <Plans />
      <Contact />
      <Footer />
    </main>
  );
}
