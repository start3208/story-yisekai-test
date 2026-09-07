import { EndingStory, PersonalityArchetype, StatRadar } from '../types';

/**
 * Generates an ultra-crisp mobile-optimized share poster image using HTML Canvas
 */
export async function generateSharePoster(
  ending: EndingStory,
  archetype: PersonalityArchetype
): Promise<string> {
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 1200;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');

  // 1. Background gradient (deep luxury anime fantasy dark theme)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#0c0a09'); // stone-950
  bgGrad.addColorStop(0.5, '#1c1917'); // stone-900
  bgGrad.addColorStop(1, '#09090b'); // zinc-950
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Subtle ambient glow
  const glowGrad = ctx.createRadialGradient(width / 2, 260, 20, width / 2, 260, 400);
  glowGrad.addColorStop(0, `${archetype.color}25`);
  glowGrad.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Ornate Border & Header frame
  ctx.strokeStyle = '#78716c33';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, width - 56, height - 56);
  ctx.strokeStyle = '#d9770666'; // gold inner trim
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Corner flourishes
  const drawCorner = (x: number, y: number) => {
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  };
  drawCorner(36, 36);
  drawCorner(width - 36, 36);
  drawCorner(36, height - 36);
  drawCorner(width - 36, height - 36);

  // 3. Top Banner
  ctx.fillStyle = '#d97706';
  ctx.font = 'bold 16px "Cinzel", serif, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ ISEKAI DESTINY & PSYCHOLOGY CERTIFICATE ✦', width / 2, 75);

  ctx.fillStyle = '#a8a29e';
  ctx.font = '14px sans-serif';
  ctx.fillText(`异世界转生心理测评报告 · 命运编号 NO.${String(ending.number).padStart(3, '0')}`, width / 2, 98);

  // 4. Personality Tag & Title
  // Badge Pill
  ctx.fillStyle = archetype.color;
  ctx.beginPath();
  ctx.roundRect(width / 2 - 80, 125, 160, 30, 15);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillText(archetype.badge, width / 2, 145);

  // Archetype Name
  ctx.fillStyle = '#fef08a';
  ctx.font = '900 36px "Noto Serif SC", serif, sans-serif';
  ctx.fillText(archetype.name, width / 2, 195);

  // Archetype Subtitle
  ctx.fillStyle = '#d6d3d1';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText(`【 ${archetype.title} 】`, width / 2, 226);

  // Soul Subtitle Quote
  ctx.fillStyle = '#fcd34d';
  ctx.font = 'italic 16px "Noto Serif SC", serif, sans-serif';
  ctx.fillText(archetype.subtitle, width / 2, 260);

  // Divider
  ctx.strokeStyle = '#44403c';
  ctx.beginPath();
  ctx.moveTo(60, 285);
  ctx.lineTo(width - 60, 285);
  ctx.stroke();

  // 5. Novel Title (Wrapped)
  ctx.fillStyle = '#fafaf9';
  ctx.font = 'bold 22px "Noto Serif SC", serif, sans-serif';
  ctx.textAlign = 'left';

  const titleLines = wrapText(ctx, ending.title, width - 120);
  let titleY = 320;
  titleLines.forEach((line) => {
    ctx.fillText(line, 60, titleY);
    titleY += 28;
  });

  // Story Synopsis Box
  ctx.fillStyle = '#1c1917cc';
  ctx.strokeStyle = '#292524';
  ctx.beginPath();
  ctx.roundRect(60, titleY + 10, width - 120, 180, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#e7e5e4';
  ctx.font = '15px sans-serif';
  const storyLines = wrapText(ctx, ending.storyText, width - 160);
  let storyY = titleY + 38;
  storyLines.slice(0, 6).forEach((line) => {
    ctx.fillText(line, 80, storyY);
    storyY += 24;
  });

  // Epilogue Quote
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'italic bold 15px "Noto Serif SC", serif, sans-serif';
  ctx.fillText(ending.epilogueQuote, 80, titleY + 170);

  // 6. Stats Radar & Attributes (Bottom Left & Bottom Right)
  const radarCenterX = 200;
  const radarCenterY = 780;
  drawMiniRadar(ctx, radarCenterX, radarCenterY, 80, ending.stats, archetype.color);

  // Right Side: Diagnostic insights & skills
  const infoX = 350;
  let infoY = 690;

  // Reality analysis
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText('⚡ 现实打工人/学生画像：', infoX, infoY);
  infoY += 24;

  ctx.fillStyle = '#d6d3d1';
  ctx.font = '14px sans-serif';
  const realLines = wrapText(ctx, archetype.workplacePersona, width - infoX - 60);
  realLines.slice(0, 3).forEach((line) => {
    ctx.fillText(line, infoX, infoY);
    infoY += 22;
  });

  infoY += 12;
  // Passive skill
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 15px sans-serif';
  ctx.fillText(`✨ 专属技能：${archetype.passiveSkill.name}`, infoX, infoY);
  infoY += 24;

  ctx.fillStyle = '#a8a29e';
  ctx.font = '13px sans-serif';
  const skillLines = wrapText(ctx, archetype.passiveSkill.desc, width - infoX - 60);
  skillLines.slice(0, 2).forEach((line) => {
    ctx.fillText(line, infoX, infoY);
    infoY += 20;
  });

  infoY += 12;
  // Affinity
  ctx.fillStyle = '#a7f3d0';
  ctx.font = '13px sans-serif';
  ctx.fillText(`🤝 灵魂搭档：${archetype.bestPartner.role}`, infoX, infoY);
  infoY += 20;
  ctx.fillStyle = '#fecdd3';
  ctx.fillText(`⚔️ 天生克星：${archetype.nemesis.role}`, infoX, infoY);

  // 7. Footer Seal & Watermark
  ctx.strokeStyle = '#44403c';
  ctx.beginPath();
  ctx.moveTo(60, 930);
  ctx.lineTo(width - 60, 930);
  ctx.stroke();

  // Bottom tags
  ctx.fillStyle = '#78716c';
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(`路线标记: [${ending.routeKey}]`, 60, 965);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#d97706';
  ctx.font = 'bold 14px "Cinzel", serif, sans-serif';
  ctx.fillText('异世界命运之书 · 心理特测', width - 60, 965);

  ctx.textAlign = 'center';
  ctx.fillStyle = '#57534e';
  ctx.font = '12px sans-serif';
  ctx.fillText('长按或右键保存你的异世界命运证书 · 测测你的转生异界物语', width / 2, 1010);

  return canvas.toDataURL('image/png');
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  let currentLine = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
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
    const lx = cx + Math.cos(angle) * (radius + 22);
    const ly = cy + Math.sin(angle) * (radius + 22);
    ctx.fillStyle = '#a8a29e';
    ctx.font = '12px sans-serif';
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
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }
}
