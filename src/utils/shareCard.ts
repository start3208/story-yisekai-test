import { EndingStory, PersonalityArchetype, StatRadar } from '../types';

/**
 * Generates an ultra-crisp mobile-optimized share poster image using HTML Canvas.
 * Dynamically budgets vertical space so that story narrative, epilogue quote,
 * bystander roast, radar chart, and psychological diagnosis are 100% complete
 * without any text being cut off or overflowing.
 */
export async function generateSharePoster(
  ending: EndingStory,
  archetype: PersonalityArchetype
): Promise<string> {
  const width = 800;
  
  // Use a temporary offscreen canvas for preliminary text measurement and layout budgeting
  const measureCanvas = document.createElement('canvas');
  measureCanvas.width = width;
  measureCanvas.height = 100;
  const mCtx = measureCanvas.getContext('2d');
  if (!mCtx) throw new Error('Canvas not supported');

  // Font setup for measurement
  const fontTitle = 'bold 22px "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif, sans-serif';
  const fontStory = '14px system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
  const fontQuote = 'italic bold 15px "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif, sans-serif';
  const fontRoast = 'italic 13px system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
  const fontPersona = '13px system-ui, -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';

  // 1. Measure Title
  mCtx.font = fontTitle;
  const titleLines = wrapText(mCtx, ending.title, width - 130);

  // 2. Measure Story text
  mCtx.font = fontStory;
  const storyLines = wrapText(mCtx, ending.storyText, width - 150);

  // 3. Measure Epilogue quote
  mCtx.font = fontQuote;
  const quoteLines = wrapText(mCtx, `“${ending.epilogueQuote.replace(/^[“”"「」]/, '').replace(/[“”"「」]$/, '')}”`, width - 160);

  // 4. Measure Bystander Roast (if present)
  let roastLines: string[] = [];
  if (ending.bystanderRoast && ending.bystanderRoast.comment) {
    mCtx.font = fontRoast;
    roastLines = wrapText(mCtx, `“${ending.bystanderRoast.comment.replace(/^[“”"「」]/, '').replace(/[“”"「」]$/, '')}”`, width - 160);
  }

  // 5. Measure Workplace Persona & Skill description
  mCtx.font = fontPersona;
  const rightColWidth = 380;
  const personaLines = wrapText(mCtx, archetype.workplacePersona, rightColWidth);
  const skillLines = wrapText(mCtx, archetype.passiveSkill.desc, rightColWidth);
  const partnerLine = `🤝 灵魂搭档：${archetype.bestPartner.role}`;
  const nemesisLine = `⚔️ 天生克星：${archetype.nemesis.role}`;
  const partnerLines = wrapText(mCtx, partnerLine, rightColWidth);
  const nemesisLines = wrapText(mCtx, nemesisLine, rightColWidth);

  // Calculate dynamic heights
  // Header + Archetype banner: ~280px
  const headerHeight = 280;

  // Title section:
  const titleSectionHeight = 24 + titleLines.length * 28 + 24; // Title + tags badge

  // Story Box:
  // Title bar (30px) + story lines (lineHeight 22px) + quote box (top/bottom pad 16px + lines * 22px) + box padding (24px)
  const storyTextHeight = storyLines.length * 22;
  const quoteBoxHeight = 16 + quoteLines.length * 22 + 10;
  const storyBoxHeight = 36 + storyTextHeight + 14 + quoteBoxHeight + 16;

  // Roast Box (if present):
  let roastBoxHeight = 0;
  if (ending.bystanderRoast && roastLines.length > 0) {
    roastBoxHeight = 28 + roastLines.length * 20 + 20;
  }

  // Radar + Diagnostic Block:
  // Right side lines count:
  const rightSideHeight =
    22 + // header
    personaLines.length * 19 +
    12 +
    20 + // skill header
    skillLines.length * 18 +
    12 +
    partnerLines.length * 18 +
    nemesisLines.length * 18 +
    16;
  const bottomSectionHeight = Math.max(220, rightSideHeight);

  // Footer section:
  const footerHeight = 85;

  // Spacing gaps
  const gapAfterHeader = 15;
  const gapAfterStory = 14;
  const gapAfterRoast = roastBoxHeight > 0 ? 16 : 0;
  const gapAfterBottom = 20;

  // Total required height
  const calculatedHeight =
    headerHeight +
    gapAfterHeader +
    titleSectionHeight +
    storyBoxHeight +
    gapAfterStory +
    (roastBoxHeight > 0 ? roastBoxHeight + gapAfterRoast : 0) +
    bottomSectionHeight +
    gapAfterBottom +
    footerHeight +
    40; // bottom margin

  const height = Math.max(1280, Math.ceil(calculatedHeight));

  // Now create the final high-res canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // Enable crisp text rendering
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  // 1. Background gradient (deep luxury anime fantasy dark theme)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0c0a09'); // stone-950
  bgGrad.addColorStop(0.35, '#1c1917'); // stone-900
  bgGrad.addColorStop(0.7, '#141211');
  bgGrad.addColorStop(1, '#09090b'); // zinc-950
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Ambient glow near top
  const glowGrad = ctx.createRadialGradient(width / 2, 220, 20, width / 2, 220, 420);
  glowGrad.addColorStop(0, `${archetype.color}2c`);
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // Ambient glow near bottom radar
  const bottomGlowGrad = ctx.createRadialGradient(200, height - 230, 20, 200, height - 230, 320);
  bottomGlowGrad.addColorStop(0, `${archetype.color}15`);
  bottomGlowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = bottomGlowGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Ornate Border & Corners
  ctx.strokeStyle = '#78716c33';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);
  ctx.strokeStyle = '#d9770655'; // gold inner trim
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Corner flourishes
  const drawCorner = (x: number, y: number) => {
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 1;
    ctx.stroke();
  };
  drawCorner(36, 36);
  drawCorner(width - 36, 36);
  drawCorner(36, height - 36);
  drawCorner(width - 36, height - 36);

  // 3. Top Banner Header
  ctx.fillStyle = '#d97706';
  ctx.font = 'bold 15px "Cinzel", "Noto Serif SC", serif, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ ISEKAI DESTINY & PSYCHOLOGY CERTIFICATE ✦', width / 2, 72);

  ctx.fillStyle = '#a8a29e';
  ctx.font = '13px system-ui, -apple-system, sans-serif';
  ctx.fillText(
    `异世界转生心理测评报告 · 命运编号 NO.${String(ending.number).padStart(3, '0')} · 【${ending.category}】`,
    width / 2,
    95
  );

  // 4. Archetype Tag & Title
  // Badge Pill
  ctx.fillStyle = archetype.color;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 85, 118, 170, 28, 14);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillText(archetype.badge, width / 2, 137);

  // Archetype Name
  ctx.fillStyle = '#fef08a';
  ctx.font = '900 36px "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif, sans-serif';
  ctx.fillText(archetype.name, width / 2, 185);

  // Archetype Subtitle
  ctx.fillStyle = '#e7e5e4';
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
  ctx.fillText(`【 ${archetype.title} 】`, width / 2, 216);

  // Soul Subtitle Quote
  ctx.fillStyle = '#fcd34d';
  ctx.font = 'italic 15px "Noto Serif SC", "Source Han Serif SC", serif, sans-serif';
  ctx.fillText(archetype.subtitle, width / 2, 248);

  // Divider after Archetype
  ctx.strokeStyle = '#44403c88';
  ctx.beginPath();
  ctx.moveTo(56, 274);
  ctx.lineTo(width - 56, 274);
  ctx.stroke();

  // 5. Ending Novel Title & Route Badges
  let currentY = 306;
  ctx.fillStyle = '#fafaf9';
  ctx.font = fontTitle;
  ctx.textAlign = 'left';

  titleLines.forEach((line) => {
    ctx.fillText(line, 58, currentY);
    currentY += 28;
  });

  // Route & Tag Badges
  currentY += 2;
  ctx.fillStyle = '#d9770628';
  ctx.strokeStyle = '#d9770666';
  ctx.beginPath();
  const routeTagText = `🛤️ 抉择路线: ${ending.routeKey}`;
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  const routeTagWidth = ctx.measureText(routeTagText).width + 18;
  ctx.roundRect(58, currentY, routeTagWidth, 22, 11);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fef08a';
  ctx.fillText(routeTagText, 67, currentY + 15);

  let tagX = 58 + routeTagWidth + 8;
  const tagList = ending.tags.slice(0, 4);
  tagList.forEach((tag) => {
    const tagStr = `#${tag}`;
    const tWidth = ctx.measureText(tagStr).width + 14;
    if (tagX + tWidth < width - 58) {
      ctx.fillStyle = '#29252488';
      ctx.strokeStyle = '#44403c';
      ctx.beginPath();
      ctx.roundRect(tagX, currentY, tWidth, 22, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#d6d3d1';
      ctx.fillText(tagStr, tagX + 7, currentY + 15);
      tagX += tWidth + 6;
    }
  });

  currentY += 32;

  // 6. Story Synopsis Box (Complete Narrative + Epilogue Quote)
  const storyBoxY = currentY;
  ctx.fillStyle = '#1c1917dd';
  ctx.strokeStyle = '#292524';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(56, storyBoxY, width - 112, storyBoxHeight, 12);
  ctx.fill();
  ctx.stroke();

  // Story Box Header
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('📖 【终章物语 · 你的异界物语】', 74, storyBoxY + 24);

  // Story Narrative text (Full, wrapped)
  ctx.fillStyle = '#e7e5e4';
  ctx.font = fontStory;
  let textY = storyBoxY + 50;
  storyLines.forEach((line) => {
    ctx.fillText(line, 74, textY);
    textY += 22;
  });

  // Epilogue Quote Sub-box
  const quoteBoxY = textY + 6;
  ctx.fillStyle = '#0c0a09aa';
  ctx.strokeStyle = '#d9770644';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(74, quoteBoxY, width - 148, quoteBoxHeight, 8);
  ctx.fill();
  ctx.stroke();

  // Quote text (wrapped, gold italic)
  ctx.fillStyle = '#fbbf24';
  ctx.font = fontQuote;
  let quoteY = quoteBoxY + 22;
  quoteLines.forEach((line) => {
    ctx.fillText(line, 88, quoteY);
    quoteY += 22;
  });

  currentY = storyBoxY + storyBoxHeight + gapAfterStory;

  // 7. Bystander Roast Box (if present)
  if (ending.bystanderRoast && roastLines.length > 0) {
    const roastBoxY = currentY;
    ctx.fillStyle = '#171412ee';
    ctx.strokeStyle = '#f59e0b33';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(56, roastBoxY, width - 112, roastBoxHeight, 10);
    ctx.fill();
    ctx.stroke();

    // Witness Header & Tag
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
    ctx.fillText(`💬 【目击者现场锐评】 (${ending.bystanderRoast.witness})`, 72, roastBoxY + 20);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#f59e0b';
    ctx.font = '11px system-ui, -apple-system, sans-serif';
    ctx.fillText(ending.bystanderRoast.tag, width - 72, roastBoxY + 20);
    ctx.textAlign = 'left';

    // Roast Comment text
    ctx.fillStyle = '#d6d3d1';
    ctx.font = fontRoast;
    let rY = roastBoxY + 42;
    roastLines.forEach((line) => {
      ctx.fillText(line, 72, rY);
      rY += 20;
    });

    currentY = roastBoxY + roastBoxHeight + gapAfterRoast;
  }

  // 8. Stats Radar & Personality Diagnosis (Bottom section)
  const bottomY = currentY;
  const radarCenterX = 185;
  const radarCenterY = bottomY + bottomSectionHeight / 2 - 5;
  const radarRadius = 72;

  // Radar title
  ctx.fillStyle = '#a8a29e';
  ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('【六维属性特质】', radarCenterX, bottomY + 16);
  ctx.textAlign = 'left';

  // Draw Radar Chart
  drawMiniRadar(ctx, radarCenterX, radarCenterY + 10, radarRadius, ending.stats, archetype.color);

  // Right Side: Diagnostic insights & skills
  const infoX = 345;
  let infoY = bottomY + 18;

  // Reality persona
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillText('⚡ 现实生活 / 职场生态位：', infoX, infoY);
  infoY += 20;

  ctx.fillStyle = '#d6d3d1';
  ctx.font = fontPersona;
  personaLines.forEach((line) => {
    ctx.fillText(line, infoX, infoY);
    infoY += 19;
  });

  infoY += 10;

  // Passive skill
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 13px system-ui, -apple-system, sans-serif';
  ctx.fillText(`✨ 专属特技：${archetype.passiveSkill.name}`, infoX, infoY);
  infoY += 20;

  ctx.fillStyle = '#a8a29e';
  ctx.font = fontPersona;
  skillLines.forEach((line) => {
    ctx.fillText(line, infoX, infoY);
    infoY += 18;
  });

  infoY += 10;

  // Affinity (Soul Partner & Nemesis)
  ctx.fillStyle = '#a7f3d0';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  partnerLines.forEach((line) => {
    ctx.fillText(line, infoX, infoY);
    infoY += 18;
  });

  ctx.fillStyle = '#fecdd3';
  nemesisLines.forEach((line) => {
    ctx.fillText(line, infoX, infoY);
    infoY += 18;
  });

  // 9. Footer Seal & Watermark
  const footerLineY = height - 76;
  ctx.strokeStyle = '#44403c88';
  ctx.beginPath();
  ctx.moveTo(56, footerLineY);
  ctx.lineTo(width - 56, footerLineY);
  ctx.stroke();

  // Bottom tags & Cert seal
  ctx.fillStyle = '#78716c';
  ctx.font = '12px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`时空因果标号: [${ending.routeKey}]`, 58, footerLineY + 25);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#d97706';
  ctx.font = 'bold 12px "Cinzel", "Noto Serif SC", serif, sans-serif';
  ctx.fillText('异世界命运之书 · 心理特测官方认证', width - 58, footerLineY + 25);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#57534e';
  ctx.font = '11px system-ui, -apple-system, sans-serif';
  ctx.fillText('长按或右键保存你的异世界命运证书 · 测测你的转生异界物语', width / 2, footerLineY + 50);

  return canvas.toDataURL('image/png');
}

/**
 * Text wrapper that accurately respects newline characters (\n)
 * and breaks paragraphs naturally without character overflow.
 */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  if (!text) return [];
  const paragraphs = text.split('\n');
  const lines: string[] = [];

  for (const paragraph of paragraphs) {
    const trimmed = paragraph.trim();
    if (!trimmed) continue;
    let currentLine = '';

    for (let i = 0; i < trimmed.length; i++) {
      const char = trimmed[i];
      const testLine = currentLine + char;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        lines.push(currentLine);
        currentLine = char;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
  }
  return lines;
}

function drawMiniRadar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  stats: StatRadar,
  accentColor: string
) {
  const axes = [
    { label: '战力', val: stats.power },
    { label: '摸鱼', val: stats.chill },
    { label: 'SAN值', val: stats.sanity },
    { label: '反骨', val: stats.rebellion },
    { label: '恋爱脑', val: stats.romance },
    { label: '智力', val: stats.wisdom }
  ];
  const numAxes = axes.length;
  const angleSlice = (Math.PI * 2) / numAxes;

  // Concentric polygons
  ctx.strokeStyle = '#383431';
  ctx.lineWidth = 1;
  for (let level = 1; level <= 4; level++) {
    const r = (radius / 4) * level;
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleSlice - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  // Axis lines
  for (let i = 0; i < numAxes; i++) {
    const angle = i * angleSlice - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
    ctx.stroke();

    // Labels
    const lx = cx + Math.cos(angle) * (radius + 20);
    const ly = cy + Math.sin(angle) * (radius + 20);
    ctx.fillStyle = '#a8a29e';
    ctx.font = '11px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(axes[i].label, lx, ly);
  }

  // Value polygon
  ctx.beginPath();
  for (let i = 0; i < numAxes; i++) {
    const angle = i * angleSlice - Math.PI / 2;
    const r = (radius * axes[i].val) / 100;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = `${accentColor}44`;
  ctx.fill();
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Points
  for (let i = 0; i < numAxes; i++) {
    const angle = i * angleSlice - Math.PI / 2;
    const r = (radius * axes[i].val) / 100;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
  }
}

