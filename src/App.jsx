import React, { useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

// Source-preservation metadata. JSX cannot directly represent an HTML doctype token.
export const JAPAN_ATLAS_DOCTYPE = "<!doctype html>";
export const JAPAN_ATLAS_SOURCE_SHA256 = "63539859f94882d480205a552aa3201f981bfd6cfc7dc5cac70b05ef76650ca6";
export const JAPAN_ATLAS_CSS_SHA256 = "e43b2bead060007f4e073775ee3b6d40bc95ddb986ebf278c38e703166a466f1";
export const JAPAN_ATLAS_DATA_SCRIPT_SHA256 = "41feaf18021f9953c56c4f02b4e04fcdfa7ff649d068c7ccb9de62d8f2fade81";
export const JAPAN_ATLAS_RUNTIME_SCRIPT_SHA256 = "ff4d7610c957eae7f9ecb4b557da58556affe66701b66d4d1e6b258ce0b101c8";

// The original CSS is preserved byte-for-byte in this string and rendered as a native JSX <style> child.
const JAPAN_ATLAS_CSS = "\n\n/* ===========================================================================\n   United States Reference Atlas\n\n   Palette from the brand guidelines. Parchment #FCFAF2 is the ground.\n   Slate teal carries text and figures, deep plum carries headings, sumire\n   violet is the interactive accent. Map layers borrow from the extended\n   Nippon palette: 縹 for water, 鳶色 for relief, 常盤 for protected land.\n\n   Two things govern the layout. First, nothing is fixed in pixels: type and\n   spacing are fluid across 360px to 2560px. Second, map lettering is sized in\n   screen pixels rather than map units, so it stays legible at every zoom.\n   =========================================================================== */\n:root{\n  --parchment:#FCFAF2; --slate:#2E5C6E; --plum:#622954; --red:#C00000;\n  --ruri:#005CAF; --sumire:#66327C; --charcoal:#2D3748;\n  --rikyu:#707C74; --ama:#C4A882; --tobi:#724938; --hanada:#2B618F;\n  --seiji:#6A8F8D; --tokiwa:#007B43; --haizakura:#E8D3C7; --budou:#522F60;\n\n  --serif:\"Source Serif 4\",\"Noto Serif TC\",\"Noto Serif JP\",Georgia,\"Times New Roman\",serif;\n  --mono:\"JetBrains Mono\",ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;\n\n  --fs:clamp(13px,0.20vw + 12.3px,15px);\n  --sp:clamp(0.75rem,1.1vw,1.5rem);\n  --r:10px; --r-sm:7px; --r-pill:999px;\n  --shadow:0 1px 2px rgba(46,92,110,.05),0 8px 24px -12px rgba(46,92,110,.16);\n  --shadow-lg:0 2px 6px rgba(46,92,110,.07),0 22px 48px -20px rgba(46,92,110,.28);\n}\n:root[data-ground=\"paper\"]{\n  --bg:#FCFAF2; --surf:#FFFDF7; --surf2:#F4F0E5; --surf3:#EAE4D6;\n  --ink:#2E5C6E; --ink2:#5F7379; --ink3:#8D9894; --head:#622954;\n  --line:rgba(112,124,116,.20); --line2:rgba(112,124,116,.38); --accent:#66327C;\n  --bd:#5E8593; --coast:#2E5C6E;\n  --sea:#C7DBE0; --sea2:#A9C6CE; --land:#FDFCF5; --selfill:#EEDCE8;\n}\n:root[data-ground=\"dusk\"]{\n  --bg:#EFEADC; --surf:#F7F2E5; --surf2:#E6E0D0; --surf3:#DAD3C1;\n  --ink:#28505E; --ink2:#586B71; --ink3:#7C867F; --head:#5A2549;\n  --line:rgba(88,99,92,.24); --line2:rgba(88,99,92,.44); --accent:#5A2549;\n  --bd:#587F8C; --coast:#28525F;\n  --sea:#BCCFD2; --sea2:#9FB8BD; --land:#F9F5EA; --selfill:#E4D0DE;\n}\n:root[data-ground=\"night\"]{\n  --bg:#1D242E; --surf:#252E3A; --surf2:#2E3844; --surf3:#3A4552;\n  --ink:#DBE5E7; --ink2:#9FB0B5; --ink3:#7A868B; --head:#CE9CC0;\n  --line:rgba(219,229,231,.14); --line2:rgba(219,229,231,.26); --accent:#CE9CC0;\n  --bd:#84999F; --coast:#B6CBD3;\n  --sea:#101720; --sea2:#1F3140; --land:#404C5A; --selfill:#553055;\n  --shadow:0 1px 2px rgba(0,0,0,.3),0 8px 24px -12px rgba(0,0,0,.5);\n  --shadow-lg:0 2px 6px rgba(0,0,0,.35),0 22px 48px -20px rgba(0,0,0,.6);\n}\n:root[data-density=\"tight\"]{--fs:clamp(12.2px,0.16vw + 11.7px,14px);--sp:clamp(.6rem,.8vw,1.05rem)}\n\n*,*::before,*::after{box-sizing:border-box}\nhtml{-webkit-text-size-adjust:100%;text-size-adjust:100%}\nbody{margin:0;background:var(--bg);color:var(--ink);font-family:var(--serif);\n  font-size:var(--fs);line-height:1.55;font-weight:400;\n  -webkit-font-smoothing:antialiased;\n  transition:background-color .25s ease,color .25s ease;\n  padding:clamp(.7rem,1.6vw,1.9rem) clamp(.7rem,2.2vw,2.4rem) clamp(2rem,4vw,4rem)}\n.app{max-width:1720px;margin:0 auto}\nh1,h2,h3{margin:0;font-weight:500;line-height:1.2;color:var(--head);letter-spacing:-.008em}\np{margin:0}\nbutton,input,select{font:inherit;color:inherit;font-family:var(--serif)}\nbutton{background:none;border:0;cursor:pointer;padding:0}\n:focus-visible{outline:2px solid var(--sumire);outline-offset:2px;border-radius:4px}\n.mono{font-family:var(--mono);font-variant-numeric:tabular-nums;font-weight:400;letter-spacing:-.02em}\n.tag{font-size:.66em;letter-spacing:.13em;text-transform:uppercase;color:var(--ink3);\n  font-weight:500;font-family:var(--serif)}\nhtml[lang^=\"zh\"] .tag,html[lang^=\"ja\"] .tag{letter-spacing:.05em;text-transform:none;font-size:.72em}\n.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}\n\n/* ---------------- header ---------------- */\n.hd{display:flex;align-items:center;gap:clamp(.5rem,1.4vw,1.2rem);\n  padding-bottom:clamp(.5rem,.9vw,.85rem);flex-wrap:nowrap}\n.hd h1{font-size:clamp(1.02rem,1.5vw + .48rem,1.85rem);font-weight:600;\n  min-width:0;overflow-wrap:break-word;text-wrap:balance}\n@media(max-width:560px){\n  .pill > span:not(.dot){display:none}\n  .pill{padding:.42rem}\n  .hd{align-items:center}\n}\n.hd-r{margin-left:auto;display:flex;align-items:center;gap:.45rem;flex:0 0 auto}\n.pill{display:inline-flex;align-items:center;gap:.4rem;padding:.3rem .7rem;\n  border:1px solid var(--line2);border-radius:var(--r-pill);background:var(--surf);\n  font-size:.78em;color:var(--ink2);white-space:nowrap;box-shadow:var(--shadow)}\n.pill.act{border-color:var(--tokiwa);color:var(--tokiwa)}\n.pill.warn{border-color:var(--red);color:var(--red)}\n.dot{width:.42rem;height:.42rem;border-radius:50%;background:currentColor;flex:0 0 auto}\n.iconbtn{width:2.15rem;height:2.15rem;border:1px solid var(--line2);border-radius:var(--r-pill);\n  background:var(--surf);display:grid;place-items:center;color:var(--ink2);\n  box-shadow:var(--shadow);transition:color .15s,border-color .15s}\n.iconbtn:hover{color:var(--head);border-color:var(--line2)}\n.iconbtn svg{width:1.05rem;height:1.05rem;fill:none;stroke:currentColor;stroke-width:1.5;\n  stroke-linecap:round;stroke-linejoin:round}\n\n/* settings popover */\n.pop{position:absolute;top:calc(100% + .5rem);right:0;z-index:60;width:min(20rem,calc(100vw - 2rem));\n  background:var(--surf);border:1px solid var(--line2);border-radius:var(--r);\n  box-shadow:var(--shadow-lg);padding:.9rem;display:none}\n.pop.open{display:block}\n.pop .grp{padding:.5rem 0}\n.pop .grp + .grp{border-top:1px solid var(--line)}\n.pop .tag{display:block;margin-bottom:.45rem}\n.seg{display:flex;gap:.25rem;background:var(--surf2);padding:.22rem;border-radius:var(--r-pill)}\n.seg button{flex:1;padding:.34rem .3rem;border-radius:var(--r-pill);font-size:.84em;\n  color:var(--ink2);white-space:nowrap;transition:background .15s,color .15s}\n.seg button[aria-pressed=\"true\"]{background:var(--surf);color:var(--head);font-weight:500;\n  box-shadow:0 1px 3px rgba(46,92,110,.14)}\n.rowsw{display:flex;align-items:center;justify-content:space-between;gap:.6rem;padding:.32rem 0;\n  font-size:.9em;color:var(--ink2);width:100%;text-align:left}\n.knob{width:2.1rem;height:1.15rem;border-radius:var(--r-pill);background:var(--surf3);\n  position:relative;flex:0 0 auto;transition:background .18s}\n.knob::after{content:\"\";position:absolute;inset:.16rem auto .16rem .17rem;width:.83rem;\n  border-radius:50%;background:var(--surf);transition:transform .18s;\n  box-shadow:0 1px 2px rgba(0,0,0,.2)}\n[aria-pressed=\"true\"] > .knob{background:var(--sumire)}\n[aria-pressed=\"true\"] > .knob::after{transform:translateX(.95rem)}\n\n/* ---------------- metadata strip ---------------- */\n.strip{display:flex;gap:clamp(.9rem,2.4vw,2.6rem);align-items:baseline;\n  border-top:1px solid var(--line);border-bottom:1px solid var(--line);\n  padding:.5rem 0;margin-bottom:var(--sp);overflow-x:auto;scrollbar-width:none}\n.strip::-webkit-scrollbar{display:none}\n@media(max-width:760px){\n  .strip{mask-image:linear-gradient(90deg,#000 88%,transparent);\n    -webkit-mask-image:linear-gradient(90deg,#000 88%,transparent)}\n  .rh .c{display:none}\n}\n.strip > div{flex:0 0 auto;min-width:0}\n.strip .tag{display:block;margin-bottom:.05rem}\n.strip .v{font-family:var(--mono);font-size:.82em;white-space:nowrap;color:var(--ink)}\n.strip .v b{color:var(--ruri);font-weight:500}\n\n/* ---------------- main grid ---------------- */\n.main{display:block}\n\n/* ---------------- map stage ---------------- */\n.stage{position:relative;background:var(--sea);border:1px solid var(--line);\n  border-radius:var(--r);overflow:hidden;box-shadow:var(--shadow);\n  aspect-ratio:760/1000;max-width:min(100%,calc(88vh * 0.76));margin-inline:auto}\n@media(max-width:1179px){.stage{aspect-ratio:760/1000}}\n@media(max-width:700px){.stage{aspect-ratio:1/1.12;max-width:100%}}\n#map{position:absolute;inset:0;width:100%;height:100%;display:block;\n  touch-action:none;cursor:grab;-webkit-tap-highlight-color:transparent}\n#map.dragging{cursor:grabbing}\n.ov{position:absolute;z-index:5;display:flex;gap:.4rem}\n.ov-tl{top:.6rem;left:.6rem;right:.6rem;flex-wrap:wrap}\n.ov-tr{top:.6rem;right:.6rem;flex-direction:column}\n.ov-bl{bottom:.6rem;left:.6rem;align-items:flex-end;flex-wrap:wrap;max-width:calc(100% - 1.2rem)}\n.glass{background:color-mix(in srgb,var(--surf) 93%,transparent);\n  border:1px solid var(--line2);border-radius:var(--r-pill);box-shadow:var(--shadow);\n  backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}\n.search{display:flex;align-items:center;gap:.4rem;padding:.05rem .3rem .05rem .7rem;\n  max-width:min(17rem,60vw)}\n.search input{border:0;background:none;padding:.42rem 0;width:100%;min-width:0;font-size:.88em}\n.search input:focus{outline:none}\n.search svg{width:.92rem;height:.92rem;fill:none;stroke:var(--ink3);stroke-width:1.6;flex:0 0 auto}\n.search button{width:1.5rem;height:1.5rem;border-radius:50%;color:var(--ink3);flex:0 0 auto;\n  display:grid;place-items:center;font-size:1rem;line-height:1}\n.res{position:absolute;top:calc(100% + .35rem);left:0;width:min(20rem,80vw);max-height:15rem;\n  overflow:auto;background:var(--surf);border:1px solid var(--line2);border-radius:var(--r);\n  box-shadow:var(--shadow-lg);padding:.3rem;display:none;z-index:20}\n.res.open{display:block}\n.res button{display:block;width:100%;text-align:left;padding:.34rem .5rem;border-radius:var(--r-sm);\n  font-size:.86em;line-height:1.3}\n.res button:hover,.res button.on{background:var(--surf2)}\n.res .k{display:block;font-family:var(--mono);font-size:.62rem;color:var(--ink3);\n  letter-spacing:.04em}\n.zoomstack{flex-direction:column;overflow:hidden;border-radius:var(--r);padding:0}\n.zoomstack button{width:2rem;height:2rem;display:grid;place-items:center;color:var(--ink2)}\n.zoomstack button + button{border-top:1px solid var(--line)}\n.zoomstack button:hover{background:var(--surf2);color:var(--head)}\n.zoomstack svg{width:.9rem;height:.9rem;fill:none;stroke:currentColor;stroke-width:1.7;\n  stroke-linecap:round}\n.zlevel{font-family:var(--mono);font-size:.58rem;color:var(--ink3);text-align:center;\n  padding:.2rem 0;border-top:1px solid var(--line)}\n.chipbtn{padding:.36rem .8rem;font-size:.8em;color:var(--ink2);display:inline-flex;\n  align-items:center;gap:.35rem}\n.chipbtn:hover{color:var(--head)}\n.chipbtn svg{width:.85rem;height:.85rem;fill:none;stroke:currentColor;stroke-width:1.6}\n.scalebox{padding:.3rem .6rem .25rem;display:flex;align-items:center;gap:.5rem}\n.scalebox svg{display:block}\n\n/* layer panel */\n.lpanel{position:absolute;bottom:3rem;left:.6rem;z-index:25;width:min(16rem,calc(100% - 1.2rem));\n  background:var(--surf);border:1px solid var(--line2);border-radius:var(--r);\n  box-shadow:var(--shadow-lg);padding:.8rem;display:none;max-height:calc(100% - 4rem);\n  overflow:auto}\n.lpanel.open{display:block}\n.lpanel .tag{display:block;margin:.1rem 0 .4rem}\n.lpanel .grp + .grp{margin-top:.7rem;padding-top:.7rem;border-top:1px solid var(--line)}\n.lsw{display:flex;align-items:center;gap:.5rem;width:100%;text-align:left;padding:.24rem 0;\n  font-size:.86em;color:var(--ink3)}\n.lsw::before{content:\"\";width:.95rem;height:.95rem;flex:0 0 auto;border-radius:4px;\n  border:1.5px solid var(--line2);transition:background .15s,border-color .15s}\n.lsw[aria-pressed=\"true\"]{color:var(--ink)}\n.lsw[aria-pressed=\"true\"]::before{background:var(--sumire);border-color:var(--sumire);\n  box-shadow:inset 0 0 0 2.5px var(--surf)}\n.lsw i{margin-left:auto;width:1rem;height:0;border-top:2px solid currentColor;\n  border-radius:2px;flex:0 0 auto}\nselect.sel{width:100%;padding:.4rem .55rem;border:1px solid var(--line2);border-radius:var(--r-sm);\n  background:var(--surf2);font-size:.86em;appearance:none;\n  background-image:linear-gradient(45deg,transparent 50%,var(--ink3) 50%),\n                   linear-gradient(135deg,var(--ink3) 50%,transparent 50%);\n  background-position:calc(100% - 15px) center,calc(100% - 10px) center;\n  background-size:5px 5px,5px 5px;background-repeat:no-repeat}\n.keybar{display:flex;height:.42rem;border-radius:3px;overflow:hidden;margin-top:.45rem}\n.keycap{display:flex;justify-content:space-between;font-family:var(--mono);font-size:.6rem;\n  color:var(--ink3);margin-top:.25rem;gap:.4rem}\n\n/* tooltip */\n.tip{position:absolute;z-index:40;pointer-events:none;background:var(--charcoal);\n  color:#F2EFE6;padding:.28rem .55rem;border-radius:var(--r-sm);font-size:.78em;\n  white-space:nowrap;opacity:0;transition:opacity .12s;\n  transform:translate(-50%,calc(-100% - .55rem));box-shadow:var(--shadow-lg)}\n.tip b{font-weight:500;color:#EFD9E8}\n.tip span{display:block;font-family:var(--mono);font-size:.62rem;color:#A6BCB6;margin-top:.05rem}\n\n/* ---------------- map ink ---------------- */\n#map{--u:1}\n.coast{fill:none;stroke:var(--coast);stroke-width:calc(var(--u)*1.5px);\n  stroke-linejoin:round;stroke-linecap:round;pointer-events:none}\n.st{fill:var(--land);stroke:var(--bd);stroke-width:calc(var(--u)*0.85px);\n  stroke-linejoin:round;cursor:pointer;transition:fill .12s}\n.st:hover{fill:var(--haizakura)}\n.st.sel{fill:var(--selfill);stroke:var(--sumire);stroke-width:calc(var(--u)*1.9px)}\n.cnty{fill:none;stroke:var(--bd);stroke-width:calc(var(--u)*.6px);opacity:.6;pointer-events:none}\n.lake{fill:var(--sea2);stroke:var(--hanada);stroke-width:calc(var(--u)*.7px);opacity:1}\n.riv{fill:none;stroke:var(--hanada);stroke-linecap:round;stroke-linejoin:round;opacity:.85}\n.rng{fill:none;stroke:var(--tobi);stroke-width:calc(var(--u)*2.6px);stroke-linecap:round;opacity:.30}\n.grat{fill:none;stroke:var(--rikyu);stroke-width:calc(var(--u)*.4px);opacity:.28}\n.ibox{fill:none;stroke:var(--rikyu);stroke-width:calc(var(--u)*.7px);opacity:.4;\n  stroke-dasharray:calc(var(--u)*4px) calc(var(--u)*3px)}\ntext{pointer-events:none;paint-order:stroke}\n/* Markers are counter-scaled so a dot stays a dot at every zoom level. */\n.mk{transform:scale(var(--u));transform-origin:0 0;transform-box:view-box}\n/* Inside .mk the group already carries the counter-scale, so type is plain px. */\n.mk text{stroke-width:2.3px}\n.mk .ctl{font-size:9.8px}\n.mk .pkl{font-size:9.4px}\n.tl{font-family:var(--serif);font-weight:600;font-size:calc(var(--u)*11.5px);fill:var(--ink);\n  text-anchor:middle;stroke:var(--land);stroke-width:calc(var(--u)*2.6px);stroke-linejoin:round}\n.tw{font-family:var(--serif);font-style:italic;font-size:calc(var(--u)*9.4px);fill:var(--hanada);\n  stroke:var(--sea);stroke-width:calc(var(--u)*2.2px)}\n.twl{stroke:var(--land)}\n.tg{font-family:var(--serif);font-size:calc(var(--u)*8.4px);font-weight:500;fill:var(--tobi);\n  letter-spacing:calc(var(--u)*1.5px);stroke:var(--land);stroke-width:calc(var(--u)*2.2px);\n  opacity:.85}\n.tp{font-family:var(--serif);font-size:calc(var(--u)*9px);fill:var(--tobi);opacity:.5;\n  letter-spacing:calc(var(--u)*2.2px);text-anchor:middle;stroke:var(--land);\n  stroke-width:calc(var(--u)*2.4px)}\n.pk{fill:var(--tokiwa);stroke:var(--land);stroke-width:calc(var(--u)*.7px)}\n.pkl{font-family:var(--serif);font-size:calc(var(--u)*9px);fill:var(--tokiwa);\n  stroke:var(--land);stroke-width:calc(var(--u)*2.2px)}\n.ct{fill:var(--ink)}\n.ctc{fill:var(--land);stroke:var(--ink);stroke-width:calc(var(--u)*1.1px)}\n.mk .ctc{stroke-width:1.1px}\n.ctl{font-family:var(--serif);font-size:calc(var(--u)*9.4px);fill:var(--ink);\n  stroke:var(--land);stroke-width:calc(var(--u)*2.2px)}\n.ctl.cap{font-weight:600}\n.il{font-family:var(--serif);font-size:calc(var(--u)*9.6px);font-weight:500;fill:var(--ink3);\n  letter-spacing:calc(var(--u)*1.6px);text-anchor:middle}\n[data-off=\"1\"]{display:none}\ntext[data-hid=\"1\"]{visibility:hidden}\n\n/* ---------------- record ---------------- */\n.rec{background:var(--surf);border:1px solid var(--line);border-radius:var(--r);\n  box-shadow:var(--shadow);overflow:hidden;margin-top:var(--sp);scroll-margin-top:.6rem}\n.rd-h{padding:.85rem 1.1rem .7rem;border-bottom:1px solid var(--line);display:flex;\n  gap:.7rem;align-items:flex-start}\n.rd-h h2{font-size:clamp(1.25rem,1.3vw + .85rem,1.85rem);font-weight:600}\n.rd-h .nick{font-style:italic;color:var(--ink2);font-size:.88em;margin-top:.1rem}\n.rd-x{width:1.8rem;height:1.8rem;border-radius:50%;border:1px solid var(--line2);\n  display:grid;place-items:center;color:var(--ink3);flex:0 0 auto;font-size:1.05rem;\n  line-height:1;margin-left:auto}\n.rd-x:hover{color:var(--head);border-color:var(--head)}\n.rd-b{padding:.2rem 1.1rem 1.1rem;columns:clamp(17rem,21vw,21rem);column-gap:clamp(1.4rem,3vw,3rem)}\n.blk{padding:.7rem 0;border-bottom:1px solid var(--line);break-inside:avoid-column}\n.blk:last-child{border-bottom:0}\n.blk > .tag{display:block;margin-bottom:.4rem}\n.figs{display:grid;grid-template-columns:repeat(auto-fit,minmax(6.1rem,1fr));gap:.6rem .8rem}\n.figs .v{font-family:var(--mono);font-size:1em;letter-spacing:-.035em;line-height:1.2;\n  white-space:nowrap}\n.figs .r{font-family:var(--mono);font-size:.62rem;color:var(--accent)}\n.kv{display:grid;grid-template-columns:minmax(4.6rem,auto) 1fr;gap:.28rem .7rem;margin:0;font-size:.88em}\n.kv dt{color:var(--ink3);font-size:.72em;letter-spacing:.09em;text-transform:uppercase;padding-top:.25em}\nhtml[lang^=\"zh\"] .kv dt,html[lang^=\"ja\"] .kv dt{text-transform:none;letter-spacing:.03em;font-size:.8em}\n.kv dd{margin:0;overflow-wrap:break-word}\n.prose{font-size:.9em;line-height:1.62;color:var(--ink)}\n.chips{display:flex;flex-wrap:wrap;gap:.28rem}\n.chip{font-size:.78em;border:1px solid var(--line2);padding:.1rem .48rem;border-radius:var(--r-pill);\n  background:var(--bg);color:var(--ink2);overflow-wrap:break-word}\n.chip.w{font-style:italic;color:var(--hanada);border-color:color-mix(in srgb,var(--hanada) 30%,transparent)}\n.chip.r{color:var(--tobi);border-color:color-mix(in srgb,var(--tobi) 30%,transparent)}\n.chip.p{color:var(--tokiwa);border-color:color-mix(in srgb,var(--tokiwa) 30%,transparent)}\n.relief{display:grid;grid-template-columns:1fr 1fr;gap:.5rem .8rem;font-size:.88em}\n.relief > div:last-child{text-align:right}\n.relief .tag{display:block}\n.track{height:.34rem;background:var(--surf3);border-radius:3px;position:relative;margin-top:.5rem;\n  overflow:hidden}\n.track > span{position:absolute;inset:0 auto 0 0;background:var(--tobi);opacity:.75;border-radius:3px}\n.mini{display:flex;justify-content:space-between;font-family:var(--mono);font-size:.6rem;\n  color:var(--ink3);margin-top:.25rem;gap:.4rem}\n.hint{padding:1rem 1.1rem 1.2rem}\n.hint p{font-size:.88em;color:var(--ink2);line-height:1.6;margin-top:.4rem}\n.natg{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:.8rem 1rem;margin-top:.9rem}\n.natg .v{font-family:var(--mono);font-size:1.02em;letter-spacing:-.03em}\n\n.natsec .refbody{padding:0}\n.natfacts{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(9.5rem,100%),1fr));\n  gap:.7rem clamp(1rem,2.4vw,2.4rem);margin:0;padding:.9rem 1.1rem;\n  border-bottom:1px solid var(--line)}\n.natfacts > div{min-width:0;display:flex;flex-direction:column;gap:.12rem}\n.natfacts dt{margin:0}\n.natfacts dd{margin:0;font-family:var(--mono);font-size:.84em;overflow-wrap:break-word;\n  margin-top:auto}\n.natgrid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(22rem,100%),1fr));\n  gap:0;border-bottom:1px solid var(--line)}\n.natcol{padding:.9rem 1.1rem 1.1rem;border-right:1px solid var(--line);min-width:0}\n.natcol:last-child{border-right:0}\n@media(max-width:1000px){.natcol{border-right:0;border-bottom:1px solid var(--line)}\n  .natcol:last-child{border-bottom:0}}\n.natcol > .tag{display:block;margin-bottom:.6rem}\n.natcol .prose{max-width:52ch}\n.natcol .kv{max-width:23rem}\n.nathist{padding:.9rem 1.1rem 1.1rem}\n.nathist > .tag{display:block;margin-bottom:.5rem}\n.nathist .prose{max-width:78ch;margin-bottom:.7rem}\n.flagbox{border:1px solid var(--line2);border-radius:var(--r-sm);overflow:hidden;\n  line-height:0;background:var(--bg);max-width:23rem}\n#flag{display:block;width:100%;height:auto}\n.anthemT{font-size:1.05em;font-weight:600;color:var(--head)}\n.anthemSub{font-size:.78em;color:var(--ink3);font-family:var(--mono);margin:.15rem 0 .6rem}\n.verse{font-size:.86em;line-height:1.72;font-style:italic;color:var(--ink);\n  padding-left:.75rem;border-left:2px solid var(--line2);margin:0 0 .6rem}\n.tline{list-style:none;margin:.5rem 0 0;padding:0;font-size:.84em;\n  columns:clamp(16rem,23vw,23rem);column-gap:clamp(1.2rem,2.6vw,2.6rem)}\n.tline li{display:grid;grid-template-columns:3.1rem 1fr;gap:.55rem;padding:.3rem 0;\n  border-top:1px solid var(--line);break-inside:avoid-column}\n.tline li:first-child{border-top:0}\n.tline .y{font-family:var(--mono);color:var(--accent);font-size:.92em;padding-top:.1em}\n.tline .w{overflow-wrap:break-word}\n.tline .a{display:block;font-family:var(--mono);font-size:.78em;color:var(--ink3)}\n.tline li.mapchg .y{color:var(--tokiwa)}\n.tline li.mapchg .y::after{content:\"\\25C6\";display:block;font-size:.55em;line-height:1;\n  margin-top:.1em;opacity:.75}\n.natfoot{padding:.7rem 1.1rem .9rem;border-top:1px solid var(--line);\n  display:flex;gap:.6rem 1.4rem;align-items:baseline;flex-wrap:wrap}\n.links{list-style:none;display:flex;gap:.4rem 1.4rem;margin:0;padding:0;flex-wrap:wrap;\n  font-size:.84em}\n.links a{font-family:var(--mono);color:var(--ruri);text-decoration:none}\n.links a:hover{text-decoration:underline}\n.links span{color:var(--ink3);margin-left:.35rem}\n\n/* ---------------- reference ---------------- */\ndetails.ref{margin-top:var(--sp);border:1px solid var(--line);border-radius:var(--r);\n  background:var(--surf);overflow:hidden;box-shadow:var(--shadow)}\ndetails.ref > summary{list-style:none;cursor:pointer;padding:.7rem 1.1rem;display:flex;\n  align-items:baseline;gap:.5rem .9rem;flex-wrap:wrap;transition:background .15s}\ndetails.ref > summary::-webkit-details-marker{display:none}\ndetails.ref > summary:hover{background:var(--surf2)}\ndetails.ref > summary:focus-visible{outline:2px solid var(--sumire);outline-offset:-2px}\ndetails.ref > summary h2{font-size:clamp(1rem,.7vw + .8rem,1.28rem);font-weight:600}\ndetails.ref > summary .c{font-family:var(--mono);font-size:.7rem;color:var(--ink3)}\ndetails.ref > summary::after{content:\"\";margin-left:auto;width:.46rem;height:.46rem;\n  border-right:1.6px solid var(--ink3);border-bottom:1.6px solid var(--ink3);\n  transform:rotate(45deg) translate(-.12rem,-.12rem);transition:transform .2s;\n  flex:0 0 auto;align-self:center}\ndetails.ref[open] > summary::after{transform:rotate(-135deg)}\ndetails.ref[open] > summary{border-bottom:1px solid var(--line)}\n.refbody{padding:.9rem 1.1rem 1.1rem}\n.refbody > .tw-wrap{border-radius:var(--r-sm)}\n.notes .refbody{padding-top:.2rem}\n.tw-wrap{overflow-x:auto;border:1px solid var(--line);border-radius:var(--r);background:var(--surf)}\ntable{width:100%;border-collapse:collapse;font-size:.82em}\nth{font-size:.7em;letter-spacing:.08em;text-transform:uppercase;color:var(--head);text-align:left;\n  padding:.5rem .6rem;background:var(--surf2);border-bottom:1px solid var(--line2);\n  white-space:nowrap;cursor:pointer;position:sticky;top:0;z-index:1;font-weight:500}\nhtml[lang^=\"zh\"] th,html[lang^=\"ja\"] th{text-transform:none;letter-spacing:.02em;font-size:.78em}\nth:hover{color:var(--accent)}\nth.n,td.n{text-align:right}\nth[aria-sort]::after{content:\"\";display:inline-block;margin-left:.3em;\n  border:.26em solid transparent}\nth[aria-sort=\"ascending\"]::after{border-bottom-color:var(--accent);margin-bottom:.24em}\nth[aria-sort=\"descending\"]::after{border-top-color:var(--accent);margin-top:.24em}\ntd{padding:.38rem .6rem;border-bottom:1px solid var(--line);white-space:nowrap}\ntd.wrap{white-space:normal;min-width:14rem}\ntbody tr:last-child td{border-bottom:0}\ntbody tr:hover{background:var(--surf2)}\ntd.nm button{color:var(--ruri);font-weight:500;text-align:left}\ntd.nm button:hover{text-decoration:underline}\n@media(max-width:960px){[data-opt=\"1\"]{display:none}}\n@media(max-width:620px){[data-opt=\"2\"]{display:none}}\n.facts{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(15rem,100%),1fr));\n  gap:0 clamp(1rem,2.4vw,2.4rem)}\n.fact{padding:.42rem 0;border-bottom:1px solid var(--line)}\n.fact .l{font-size:.7em;letter-spacing:.08em;text-transform:uppercase;color:var(--ink3)}\nhtml[lang^=\"zh\"] .fact .l,html[lang^=\"ja\"] .fact .l{text-transform:none;letter-spacing:.02em;font-size:.78em}\n.fact .v{font-size:.9em;overflow-wrap:break-word}\n.fact .v b{font-weight:600;color:var(--ruri)}\n.fact .v .mono{font-size:.86em;color:var(--ink2)}\n\ndetails.notes h3{font-size:.72em;letter-spacing:.11em;text-transform:uppercase;color:var(--head);\n  margin:1rem 0 .3rem;font-weight:500}\nhtml[lang^=\"zh\"] footer h3,html[lang^=\"ja\"] details.notes h3{text-transform:none;letter-spacing:.03em;font-size:.82em}\ndetails.notes p{font-size:.86em;line-height:1.65;color:var(--ink2);max-width:80ch}\ndetails.notes .warn{border-left:2px solid var(--red);padding-left:.85rem}\ndetails.notes .src{font-family:var(--mono);font-size:.72rem;line-height:1.9;color:var(--ink3);\n  overflow-wrap:break-word}\n@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}\n\n/* ---------------- Japan additions ---------------- */\n\n\n\n\n\n\n.erapre{display:flex;align-items:center;gap:.5rem;font-family:var(--mono);\n  font-size:.6rem;color:var(--ink3);margin-bottom:.15rem}\n.erapre i{flex:1 1 auto;height:.3rem;border-radius:2px;\n  background:repeating-linear-gradient(90deg,var(--ama) 0 6px,transparent 6px 11px)}\n.seals{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:.7rem}\n.seal{border:1px solid var(--line2);border-radius:var(--r-sm);background:var(--bg);\n  padding:.5rem;text-align:center}\n.seal svg{width:100%;height:auto;max-height:5.2rem;display:block;margin:0 auto .3rem}\n.seal .cap{font-size:.7em;color:var(--ink3);line-height:1.35;overflow-wrap:break-word}\n.anthemkv{font-size:.84em}\n.anthemkv dt{padding-top:.3em}\n\n/* map ink specific to this sheet */\n.sm{fill:var(--tobi);stroke:var(--land);stroke-width:calc(var(--u)*.6px)}\n.sm.smv{fill:var(--ama)}\n.sm.sma{fill:var(--red)}\n.sml{font-family:var(--serif);font-size:calc(var(--u)*9px);fill:var(--tobi);\n  stroke:var(--land);stroke-width:calc(var(--u)*2.2px)}\n.mk .sml{font-size:9px;stroke-width:2.2px}\n.hr{fill:var(--ama);stroke:var(--ink);stroke-width:calc(var(--u)*.5px)}\n.hr.hrn{fill:var(--tokiwa)}\n.hrl{font-family:var(--serif);font-size:calc(var(--u)*8.8px);fill:var(--tobi);\n  stroke:var(--land);stroke-width:calc(var(--u)*2.2px)}\n.mk .hrl{font-size:8.8px;stroke-width:2.2px}\n.cs{fill:var(--budou);stroke:var(--land);stroke-width:calc(var(--u)*.6px)}\n.cs.csn{fill:var(--plum)}\n.csl{font-family:var(--serif);font-size:calc(var(--u)*8.8px);fill:var(--budou);\n  stroke:var(--land);stroke-width:calc(var(--u)*2.2px)}\n.mk .csl{font-size:8.8px;stroke-width:2.2px}\n.cp{fill:none;stroke:var(--red);stroke-width:calc(var(--u)*1.1px)}\n.cpi{fill:var(--red)}\n.mk .cp{stroke-width:1.1px}\n.cpl{font-family:var(--serif);font-size:calc(var(--u)*9px);font-weight:600;fill:var(--red);\n  stroke:var(--land);stroke-width:calc(var(--u)*2.3px)}\n.mk .cpl{font-size:9px;stroke-width:2.3px}\n.tline li.sel{background:var(--surf2);border-radius:var(--r-sm)}\n.tline li.sel .y{color:var(--red)}\n\n/* era band, after the Taiwan sheet: the name is written into the segment,\n   short eras are floored to a legible width, and the axis carries the years */\n\n\n\n\n\n\n\n.eranote .h{font-weight:600;color:var(--head)}\n.eranote .y{font-family:var(--mono);color:var(--ink3);margin-left:.4rem;font-size:.86em}\n.eranote .s{display:block;margin-top:.15rem;font-size:.9em;color:var(--ink2)}\n.eranote .s b{color:var(--ruri);font-weight:500;cursor:pointer}\n.eranote .s b:hover{text-decoration:underline}\n\n\n\n/* quiet secondary line inside the settings panel */\n.subline{margin:.35rem 0 0;font-size:.74em;line-height:1.5;color:var(--ink3)}\n.subline b{color:var(--ink2);font-weight:500}\n/* seals */\n.seals{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin-top:.7rem}\n.seal{border:1px solid var(--line2);border-radius:var(--r-sm);background:var(--bg);\n  padding:.6rem .5rem .5rem;text-align:center}\n.seal svg{width:100%;height:auto;max-height:6.4rem;display:block;margin:0 auto .35rem}\n.seal .cap{font-size:.7em;color:var(--ink3);line-height:1.4;overflow-wrap:break-word}\n.seal .cap b{display:block;color:var(--ink2);font-weight:600;font-size:1.08em}\n\n/* ---------- era band ----------\n   The band carries proportion only. Names live in a wrapping chip row below,\n   where they cannot be clipped or collide, and the ticks sit at their true\n   position on the axis so the scale can be read against the bands. */\n.eras{margin-top:.7rem}\n.erapre{display:flex;align-items:center;gap:.5rem;font-family:var(--mono);\n  font-size:.6rem;color:var(--ink3);margin-bottom:.2rem}\n.erapre i{flex:1 1 auto;height:.3rem;border-radius:2px;\n  background:repeating-linear-gradient(90deg,var(--ama) 0 6px,transparent 6px 11px)}\n\n\n\n\n\n\n\n.erachips{display:flex;flex-wrap:wrap;gap:.3rem}\n.erachips button{display:inline-flex;align-items:center;gap:.35rem;\n  padding:.16rem .5rem .16rem .34rem;border:1px solid var(--line2);\n  border-radius:var(--r-pill);background:var(--bg);font-size:.76em;\n  color:var(--ink2);line-height:1.35;transition:border-color .15s,color .15s}\n.erachips button:hover{color:var(--head);border-color:var(--ink3)}\n.erachips button[aria-pressed=\"true\"]{border-color:var(--red);color:var(--head);font-weight:500}\n.erachips i{width:.62rem;height:.62rem;border-radius:2px;flex:0 0 auto}\n.erachips .y{font-family:var(--mono);font-size:.86em;color:var(--ink3)}\n\n\n\n\n\n\n\n/* ---------- the chronicle, filtered by the selected era ---------- */\n.tlhead{display:flex;align-items:baseline;gap:.6rem;flex-wrap:wrap;margin-top:1rem}\n.tlfilter{font-size:.76em;color:var(--ink3)}\n.tlfilter b{color:var(--red);font-weight:500}\n.tlfilter button{margin-left:.45rem;font-size:.94em;color:var(--ruri);\n  text-decoration:underline;text-underline-offset:2px}\n.tline li.dim{opacity:.3}\n\n\n\n/* ---------- the automatic ground, shown as the matrix it is ---------- */\n.gmx{border-collapse:collapse;margin:.4rem 0 .1rem;font-size:.7rem;width:100%}\n.gmx th,.gmx td{border:1px solid var(--line2);padding:.16rem .3rem;text-align:center;\n  color:var(--ink3);font-weight:400;white-space:nowrap}\n.gmx th{background:var(--surf2);font-size:.94em}\n.gmx td.on{background:var(--accent);color:var(--bg);font-weight:600}\n.gmx caption{caption-side:bottom;text-align:left;padding-top:.3rem;\n  font-size:.94em;color:var(--ink3);line-height:1.5}\n.gmx caption b{color:var(--ink2);font-weight:500}\n\n/* ---------- map hygiene ----------\n   A prefecture drawn from a tessellated cell has a bounding box far larger\n   than the land it covers, so a box outline around it is meaningless. Focus\n   is shown on the geometry itself. Nothing inside the map is selectable,\n   which stops a drag from painting the labels with a selection colour. */\n#map,#map *{-webkit-user-select:none;-moz-user-select:none;user-select:none}\n#map ::selection{background:transparent}\n#map ::-moz-selection{background:transparent}\n#map :focus{outline:none}\n#map :focus-visible{outline:none}\n#map .st:focus-visible{stroke:var(--sumire);stroke-width:calc(var(--u)*2.2px);\n  stroke-linejoin:round;paint-order:stroke fill}\n#map:focus-visible{outline:2px solid var(--sumire);outline-offset:2px;border-radius:var(--r-sm)}\n.glass input,.search input{-webkit-user-select:text;user-select:text}\n\n/* ---------- the anthem ----------\n   Each line of the verse carries its transliteration beneath it, set small\n   and in the monospace face so the two never read as one line. */\n.verse .ln{display:block}\n.verse .rom{display:block;font-family:var(--mono);font-style:normal;\n  font-size:.76em;color:var(--ink3);letter-spacing:.01em;margin:.02rem 0 .34rem}\n.verse .rom:last-child{margin-bottom:0}\n.versetr{font-size:.84em;line-height:1.66;color:var(--ink2);\n  padding-left:.75rem;border-left:2px solid var(--line);margin:0 0 .6rem}\n.versetr .lbl{display:block;font-family:var(--serif);font-size:.78em;\n  letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin-bottom:.2rem}\n.versetr .ln{display:block}\n\n/* ---------- the selected era ----------\n   Open type on the page ground rather than a boxed callout: a heading line\n   carrying the name, the span and how long it ran, then the paragraph. */\n\n\n\n\n\n\n\n\n\n\n\n/* ---------- era band, to the pattern of the American sheet ---------- */\n.eraband{display:flex;width:100%;height:1.6rem;border:1px solid var(--line2);\n  border-radius:var(--r-sm);overflow:hidden;margin:.1rem 0 .2rem}\n.eraband button{flex:0 0 auto;min-width:3px;padding:0;\n  border-right:1px solid color-mix(in srgb,var(--surf) 60%,transparent);\n  transition:filter .15s}\n.eraband button:last-child{border-right:0}\n.eraband button:hover{filter:brightness(1.16)}\n.eraband button[aria-pressed=\"true\"]{box-shadow:inset 0 0 0 2px var(--surf),\n  inset 0 0 0 3.5px var(--sumire)}\n.eraband button:focus-visible{outline:2px solid var(--sumire);outline-offset:1px}\n.erascale{position:relative;height:1rem;font-family:var(--mono);font-size:.6rem;\n  color:var(--ink3);margin-bottom:.6rem}\n.erascale span{position:absolute;top:.22rem;white-space:nowrap}\n.erascale span::before{content:\"\";position:absolute;left:0;top:-.24rem;width:1px;\n  height:.2rem;background:var(--line2)}\n.erascale span.last::before{left:auto;right:0}\n.eranote{margin-top:.7rem;font-size:.87em;line-height:1.62;color:var(--ink2);\n  border-left:2px solid var(--line2);padding-left:.8rem;min-height:3.4em;max-width:80ch}\n.eranote b{color:var(--head);font-weight:600}\n.eranote .yr{font-family:var(--mono);color:var(--ink3);font-size:.86em;margin-left:.4rem}\n.eranote .st{display:block;margin-top:.32rem;font-family:var(--mono);font-size:.82em;\n  color:var(--tokiwa)}\n.eranote .st button{margin-left:.5rem;font-family:var(--serif);color:var(--ruri);\n  text-decoration:underline;text-underline-offset:2px}\n.eranote .idle{color:var(--ink3)}\n.eracaveat{margin-top:.7rem;font-size:.78em;line-height:1.6;color:var(--ink3);max-width:80ch}\n.histsplit{margin-top:1.1rem;padding-top:.9rem;border-top:1px solid var(--line)}\n.histsplit > .tag{display:block;margin-bottom:.5rem}\n.tline li.sel{background:var(--surf2)}\n.tline li.sel .y{color:var(--sumire)}\n\n/* ---------- setting text ----------\n   overflow-wrap:break-word was a blunt guard against overflow on a narrow\n   screen. It also let the browser break a Latin word in the middle and, in\n   Chinese and Japanese, split a numeral such as 一八七〇年 across two lines.\n   Breaking is now permitted only where a word genuinely cannot fit, kinsoku\n   is set to strict, and every passage of prose carries a measure so that a\n   wide window does not produce forty-word lines. Kanji numerals and figures\n   with their units are wrapped in .nb at render time and never break. */\n:root{--measure:min(76ch,40em)}\nbody{line-break:strict}\np,li,dd,.prose,.eranote,.eracaveat,.seal .cap,.versetr,.src,.tline .w{\n  text-wrap:pretty}\n.prose,.hint p,.notes p,.notes .warn,.sym p,.natcol p,.docnote,.eracaveat,\n.eranote,.rec .prose,.versetr,.src,.anthemSub{\n  max-width:var(--measure);overflow-wrap:break-word;word-break:normal}\n.blk .prose,.fld .prose{max-width:var(--measure)}\nh1,h2,h3,.dochd h2,summary h2,.plate-hero h1,.eranote b{text-wrap:balance}\n.nb{white-space:nowrap}\n\n";

/* -------------------------------------------------------------------------
   Original japan.html data script.
   Its JavaScript content is preserved verbatim; only the surrounding classic-script element
   is removed because this file is an ES module / JSX component.
   ------------------------------------------------------------------------- */
const PR={
"01":{n:["Hokkaidō","北海道","北海道"],cap:["Sapporo","札幌","札幌市"],reg:["Hokkaidō","北海道","北海道"],regid:"hokkaido",pop:5092000,pr:9,area:83424,ar:1,den:61.0,dr:47,big:["Sapporo","札幌","札幌市"],bigp:1959000,fl:["Rosa rugosa","濱茄子","ハマナス"],hi:["Mount Asahi, Daisetsu",2291],prov:["Oshima","Shiribeshi","Iburi","Ishikari","Teshio","Kitami","Hidaka","Tokachi","Kushiro","Nemuro","Chishima"],nat:[["Daisetsuzan massif","大雪山系","大雪山系"],["Shiretoko Peninsula","知床半島","知床半島"],["Kushiro Marsh","釧路濕原","釧路湿原"],["Lake Tōya","洞爺湖","洞爺湖"],["Lake Saroma","佐呂間湖","サロマ湖"]],food:[["Sea urchin and salmon roe bowls","海膽鮭魚卵丼","うに・いくら丼"],["Miso rāmen","味噌拉麵","味噌ラーメン"],["Jingisukan mutton","成吉思汗烤羊","ジンギスカン"]],note:["One prefecture carrying a fifth of Japan's land and a twenty-fifth of its people. Settled systematically only after 1869 under the Kaitakushi colonization office, it keeps a grid planned frontier character found nowhere else, and it remains the homeland of the Ainu.","一道獨佔全國五分之一的土地，人口卻只有二十五分之一。一八六九年才由開拓使正式進行大規模移墾，因此保留了全國唯一的棋盤式邊疆城市格局，同時也是愛努族的原鄉。","国土の五分の一を占めながら、人口は二十五分の一にとどまる。一八六九年の開拓使設置以降に本格的な移住が進んだため、全国で唯一の碁盤目状の開拓地景観を残す。アイヌ民族の故地でもある。"],anch:[142.6,43.4],her:[["Shiretoko","知床","知床"],["Jōmon Prehistoric Sites in Northern Japan","北海道與北東北的繩文遺跡群","北海道・北東北の縄文遺跡群"]],cas:[],pk:[["Mount Asahi, Daisetsu","旭岳","旭岳",2291],["Mount Tokachi","十勝岳","十勝岳",2077],["Mount Yōtei","羊蹄山","羊蹄山",1898],["Mount Rishiri","利尻山","利尻山",1721]]},
"02":{n:["Aomori","青森縣","青森県"],cap:["Aomori","青森","青森市"],reg:["Tōhoku","東北","東北"],regid:"tohoku",pop:1184000,pr:31,area:9646,ar:8,den:122.7,dr:41,big:["Aomori","青森","青森市"],bigp:269000,fl:["Apple blossom","蘋果花","リンゴの花"],hi:["Mount Iwaki",1625],prov:["Mutsu","Mutsu (1868)"],nat:[["Lake Towada","十和田湖","十和田湖"],["Hakkōda Mountains","八甲田山","八甲田山"],["Shirakami-Sanchi","白神山地","白神山地"],["Shimokita Peninsula","下北半島","下北半島"],["Mount Osore","恐山","恐山"]],food:[["Apples, half the national crop","蘋果，佔全國半數","りんご（全国生産の約半分）"],["Mutsu Bay scallops","陸奧灣扇貝","陸奥湾のホタテ"],["Ichigo-ni sea urchin soup","海膽鮑魚湯","いちご煮"]],note:["The northern tip of Honshū, split by Mutsu Bay into the Tsugaru and Shimokita peninsulas. It grows roughly half the nation's apples, and the illuminated warrior floats of the Nebuta festival are the loudest survival of Tōhoku's summer rites.","本州最北端，被陸奧灣切成津輕與下北兩個半島。全國約半數的蘋果產於此地，睡魔祭的武者燈籠花車則是東北夏季祭儀中聲勢最盛的遺存。","本州最北端に位置し、陸奥湾によって津軽・下北の二半島に分かれる。全国のりんごの約半数を産し、ねぶた祭の武者灯籠は東北の夏祭のなかで最も勢いを保つ。"],anch:[140.85,40.75],her:[["Shirakami-Sanchi","白神山地","白神山地"],["Jōmon Prehistoric Sites in Northern Japan","北海道與北東北的繩文遺跡群","北海道・北東北の縄文遺跡群"]],cas:[["Hirosaki Castle","弘前城","弘前城"]],pk:[["Mount Iwaki","岩木山","岩木山",1625],["Mount Hakkōda","八甲田山","八甲田山",1585]]},
"03":{n:["Iwate","岩手縣","岩手県"],cap:["Morioka","盛岡","盛岡市"],reg:["Tōhoku","東北","東北"],regid:"tohoku",pop:1163000,pr:32,area:15275,ar:2,den:76.1,dr:46,big:["Morioka","盛岡","盛岡市"],bigp:283000,fl:["Paulownia","桐花","キリ"],hi:["Mount Iwate",2038],prov:["Rikuchū","Mutsu"],nat:[["Mount Iwate","岩手山","岩手山"],["Sanriku ria coast","三陸溺灣海岸","三陸リアス海岸"],["Kitakami River","北上川","北上川"],["Mount Hayachine","早池峰山","早池峰山"]],food:[["Wanko soba","碗子蕎麥麵","わんこそば"],["Morioka reimen","盛岡冷麵","盛岡冷麺"],["Nanbu cast iron","南部鐵器","南部鉄器"]],note:["The largest prefecture on Honshū and one of the emptiest. Hiraizumi was the seat of the Northern Fujiwara in the twelfth century, a rival capital to Kyoto whose Golden Hall still stands; the Sanriku coast bore the worst of the 2011 tsunami.","本州面積最大、人口密度最低的縣份之一。平泉在十二世紀是奧州藤原氏的據點，與京都分庭抗禮，金色堂至今尚存；三陸海岸則在二〇一一年海嘯中受創最重。","本州で最も広く、人口密度は最も低い県の一つ。平泉は十二世紀に奥州藤原氏が拠った京都に対抗する都であり、金色堂が今も残る。三陸海岸は二〇一一年の津波で最大の被害を受けた。"],anch:[141.4,39.6],her:[["Hiraizumi","平泉","平泉"],["Jōmon Prehistoric Sites in Northern Japan","北海道與北東北的繩文遺跡群","北海道・北東北の縄文遺跡群"]],cas:[],pk:[["Mount Iwate","岩手山","岩手山",2038],["Mount Hayachine","早池峰山","早池峰山",1917]]},
"04":{n:["Miyagi","宮城縣","宮城県"],cap:["Sendai","仙臺","仙台市"],reg:["Tōhoku","東北","東北"],regid:"tohoku",pop:2248000,pr:14,area:7282,ar:16,den:308.7,dr:18,big:["Sendai","仙臺","仙台市"],bigp:1097000,fl:["Miyagino bush clover","宮城野萩","ミヤギノハギ"],hi:["Mount Byōbu",1825],prov:["Rikuzen","Iwaki"],nat:[["Matsushima Bay","松島灣","松島湾"],["Mount Zaō","蔵王山","蔵王山"],["Naruko Gorge","鳴子峽","鳴子峡"],["Kitakami delta","北上川三角洲","北上川三角州"]],food:[["Gyūtan beef tongue","炭燒牛舌","牛たん"],["Sasa-kamaboko","笹魚板","笹かまぼこ"],["Zunda mochi","青豆泥麻糬","ずんだ餅"]],note:["Tōhoku's administrative and commercial pivot, governed from Sendai, the castle town Date Masamune laid out in 1600. Matsushima's pine islands are one of the Three Views of Japan, and the coast was the epicentre of the 2011 disaster.","東北的行政與商業樞紐，中心是伊達政宗於一六〇〇年規劃的城下町仙臺。松島的松嶼群為日本三景之一，沿岸則是二〇一一年震災的核心區域。","東北の行政と経済の中枢であり、一六〇〇年に伊達政宗が開いた城下町仙台が中心となる。松島の島々は日本三景の一つ、沿岸は二〇一一年の震災の中心域であった。"],anch:[140.9,38.4],her:[],cas:[],pk:[["Mount Zaō","蔵王山","蔵王山",1841],["Mount Byōbu","屏風岳","屏風岳",1825]]},
"05":{n:["Akita","秋田縣","秋田県"],cap:["Akita","秋田","秋田市"],reg:["Tōhoku","東北","東北"],regid:"tohoku",pop:903000,pr:39,area:11638,ar:6,den:77.6,dr:45,big:["Akita","秋田","秋田市"],bigp:301000,fl:["Butterbur scape","蜂斗菜","フキノトウ"],hi:["Mount Chōkai",2236],prov:["Ugo","Rikuchū"],nat:[["Lake Tazawa, deepest in Japan","田澤湖，全國最深","田沢湖（日本最深）"],["Oga Peninsula","男鹿半島","男鹿半島"],["Shirakami-Sanchi","白神山地","白神山地"],["Mount Chōkai","鳥海山","鳥海山"]],food:[["Kiritanpo hotpot","米棒鍋","きりたんぽ鍋"],["Inaniwa udon","稻庭烏龍麵","稲庭うどん"],["Hinai-jidori chicken","比內地雞","比内地鶏"]],note:["The fastest shrinking prefecture in Japan and among its snowiest. Kakunodate preserves an intact block of samurai residences, and the Namahage demons of Oga still make their New Year rounds under state protection as Intangible Cultural Heritage.","全國人口流失最快、降雪量最大的縣份之一。角館保存了完整的武家屋敷街區，男鹿的生剝鬼至今仍在除夕逐戶巡行，並列為國家重要無形民俗文化財。","全国で最も人口減少が速く、降雪量も屈指の県。角館には武家屋敷の町並みがそのまま残り、男鹿のナマハゲは今も大晦日に家々を巡り、重要無形民俗文化財に指定されている。"],anch:[140.4,39.75],her:[["Shirakami-Sanchi","白神山地","白神山地"],["Jōmon Prehistoric Sites in Northern Japan","北海道與北東北的繩文遺跡群","北海道・北東北の縄文遺跡群"]],cas:[],pk:[["Mount Chōkai","鳥海山","鳥海山",2236]]},
"06":{n:["Yamagata","山形縣","山形県"],cap:["Yamagata","山形","山形市"],reg:["Tōhoku","東北","東北"],regid:"tohoku",pop:1022000,pr:36,area:9323,ar:9,den:109.6,dr:42,big:["Yamagata","山形","山形市"],bigp:242000,fl:["Safflower","紅花","ベニバナ"],hi:["Mount Chōkai",2236],prov:["Uzen","Ugo"],nat:[["Three Mountains of Dewa","出羽三山","出羽三山"],["Mogami River","最上川","最上川"],["Zaō snow monsters","蔵王樹冰","蔵王の樹氷"],["Mount Gassan","月山","月山"]],food:[["Cherries, seventy percent of the crop","櫻桃，佔全國七成","さくらんぼ（全国の約七割）"],["Imoni taro stew","芋煮","芋煮"],["Yonezawa beef","米澤牛","米沢牛"]],note:["Dominated by the Mogami River and by the Dewa Sanzan, the three sacred peaks where Shugendō ascetics have practised for over a millennium. Bashō composed part of the Narrow Road to the Deep North here, and Yamadera still clings to the cliff he climbed.","全境為最上川與出羽三山所主導，修驗道行者在此修行已逾千年。芭蕉《奧之細道》部分篇章成於此地，他登過的山寺依舊懸在崖壁上。","最上川と出羽三山が県土を貫き、修験道の行者が千年以上にわたり修行を重ねてきた。芭蕉は『おくのほそ道』の一部をここで詠み、その登った山寺は今も断崖に架かる。"],anch:[140.1,38.45],her:[],cas:[],pk:[["Mount Chōkai","鳥海山","鳥海山",2236],["Mount Gassan","月山","月山",1984],["Mount Zaō","蔵王山","蔵王山",1841]]},
"07":{n:["Fukushima","福島縣","福島県"],cap:["Fukushima","福島","福島市"],reg:["Tōhoku","東北","東北"],regid:"tohoku",pop:1752000,pr:21,area:13784,ar:3,den:127.1,dr:40,big:["Kōriyama","郡山","郡山市"],bigp:320000,fl:["Nemoto rhododendron","根本石楠花","ネモトシャクナゲ"],hi:["Mount Hiuchigatake",2356],prov:["Iwaki","Iwashiro"],nat:[["Lake Inawashiro","猪苗代湖","猪苗代湖"],["Mount Bandai","磐梯山","磐梯山"],["Ōuchi-juku","大內宿","大内宿"],["Abukuma Highland","阿武隈高地","阿武隈高地"]],food:[["Kitakata rāmen","喜多方拉麵","喜多方ラーメン"],["Peaches","水蜜桃","もも"],["Aizu lacquerware","會津漆器","会津漆器"]],note:["Third largest prefecture, divided by mountain walls into the Hamadōri coast, the Nakadōri corridor and the Aizu basin, the last a Tokugawa loyalist domain that fought to the end in 1868. The 2011 nuclear accident emptied several coastal towns and their return remains partial.","全國面積第三，被山脈切為濱通、中通與會津三區，會津為一八六八年死守到最後的德川譜代領地。二〇一一年核災使沿海數座市町清空，居民返鄉至今仍不完全。","全国第三の面積を持ち、山脈により浜通り・中通り・会津の三地域に分かれる。会津は一八六八年に最後まで抗った徳川方の地であった。二〇一一年の原子力事故で沿岸の町は無人となり、帰還はなお途上にある。"],anch:[140.4,37.45],her:[],cas:[["Aizu-Wakamatsu Castle","會津若松城","会津若松城"]],pk:[["Mount Hiuchigatake","燧岳","燧ヶ岳",2356],["Mount Bandai","磐梯山","磐梯山",1816],["Mount Yamizo","八溝山","八溝山",1022]]},
"08":{n:["Ibaraki","茨城縣","茨城県"],cap:["Mito","水戶","水戸市"],reg:["Kantō","關東","関東"],regid:"kanto",pop:2825000,pr:11,area:6098,ar:24,den:463.3,dr:12,big:["Mito","水戶","水戸市"],bigp:269000,fl:["Rose","薔薇","バラ"],hi:["Mount Yamizo",1022],prov:["Hitachi","Shimōsa"],nat:[["Lake Kasumigaura","霞浦","霞ヶ浦"],["Mount Tsukuba","筑波山","筑波山"],["Kairaku-en","偕樂園","偕楽園"],["Hitachi coast","日立海岸","日立海岸"]],food:[["Nattō","納豆","納豆"],["Melons, national leader","哈密瓜，全國第一","メロン（全国一位）"],["Monkfish hotpot","鮟鱇鍋","あんこう鍋"]],note:["Kantō's northeastern flank. Mito was one of the three Tokugawa cadet houses and the seat of the Mitogaku school whose loyalist doctrine helped bring the shogunate down, and Tsukuba Science City, planned from 1963, holds Japan's largest concentration of public research institutes.","關東的東北側。水戶為德川御三家之一，也是水戶學的所在，其尊王論最終促成幕府倒臺；一九六三年起規劃的筑波研究學園都市，則是全國公立研究機構最密集之處。","関東の北東に位置する。水戸は徳川御三家の一つで水戸学の地であり、その尊王論は幕府の終焉を導いた。一九六三年から整備された筑波研究学園都市は、国立研究機関が最も集まる地である。"],anch:[140.35,36.25],her:[],cas:[],pk:[["Mount Yamizo","八溝山","八溝山",1022],["Mount Tsukuba","筑波山","筑波山",877]]},
"09":{n:["Tochigi","栃木縣","栃木県"],cap:["Utsunomiya","宇都宮","宇都宮市"],reg:["Kantō","關東","関東"],regid:"kanto",pop:1880000,pr:18,area:6408,ar:20,den:293.4,dr:22,big:["Utsunomiya","宇都宮","宇都宮市"],bigp:513000,fl:["Yashio azalea","八汐杜鵑","ヤシオツツジ"],hi:["Mount Nikkō-Shirane",2578],prov:["Shimotsuke"],nat:[["Nikkō","日光","日光"],["Mount Nantai","男體山","男体山"],["Lake Chūzenji","中禪寺湖","中禅寺湖"],["Kegon Falls","華嚴瀑布","華厳の滝"]],food:[["Utsunomiya gyōza","宇都宮餃子","宇都宮餃子"],["Strawberries, national leader","草莓，全國第一","いちご（全国一位）"],["Yuba tofu skin","湯葉","湯波"]],note:["Landlocked, and mountainous in the north. Nikkō Tōshō-gū, where Tokugawa Ieyasu is enshrined, is the most lavishly carved complex in Japan, and the cedar avenue planted to approach it in the seventeenth century still runs for kilometres.","內陸縣，北部多山。祀奉德川家康的日光東照宮是全國雕飾最繁複的建築群，十七世紀為參道所植的杉並木至今仍綿延數公里。","内陸県で、北部は山地が占める。徳川家康を祀る日光東照宮は国内で最も装飾の濃密な建築群であり、十七世紀に参道として植えられた杉並木は今も数キロにわたる。"],anch:[139.75,36.7],her:[["Shrines and Temples of Nikkō","日光的社寺","日光の社寺"]],cas:[],pk:[["Mount Nikkō-Shirane","日光白根山","日光白根山",2578],["Mount Nantai","男體山","男体山",2486]]},
"10":{n:["Gunma","群馬縣","群馬県"],cap:["Maebashi","前橋","前橋市"],reg:["Kantō","關東","関東"],regid:"kanto",pop:1880000,pr:19,area:6362,ar:21,den:295.5,dr:21,big:["Takasaki","高崎","高崎市"],bigp:370000,fl:["Japanese azalea","蓮華杜鵑","レンゲツツジ"],hi:["Mount Nikkō-Shirane",2578],prov:["Kōzuke"],nat:[["Mount Asama","淺間山","浅間山"],["Oze marshland","尾瀨濕原","尾瀬湿原"],["Mount Akagi","赤城山","赤城山"],["Kusatsu Onsen","草津溫泉","草津温泉"]],food:[["Konnyaku, ninety percent of output","蒟蒻，佔全國九成","こんにゃく（全国の約九割）"],["Mizusawa udon","水澤烏龍麵","水沢うどん"],["Yakimanju","燒饅頭","焼きまんじゅう"]],note:["A landlocked prefecture of volcanoes and hot springs. The Tomioka Silk Mill, opened in 1872 with French machinery, industrialized the raw silk trade that financed early Meiji modernization, and its buildings survive nearly intact.","內陸的火山與溫泉之縣。一八七二年引進法國機械開設的富岡製絲廠，使生絲出口工業化，成為明治初期近代化的財源，廠房至今幾近完整保存。","火山と温泉の内陸県。一八七二年にフランス製の機械で操業を始めた富岡製糸場は生糸貿易を工業化し、明治初期の近代化を支えた。その建物はほぼ完全に残る。"],anch:[138.95,36.5],her:[["Tomioka Silk Mill","富岡製絲廠","富岡製糸場"]],cas:[],pk:[["Mount Nikkō-Shirane","日光白根山","日光白根山",2578],["Mount Asama","淺間山","浅間山",2568],["Mount Akagi","赤城山","赤城山",1828],["Mount Haruna","榛名山","榛名山",1449]]},
"11":{n:["Saitama","埼玉縣","埼玉県"],cap:["Saitama","埼玉","さいたま市"],reg:["Kantō","關東","関東"],regid:"kanto",pop:7332000,pr:5,area:3798,ar:39,den:1930.5,dr:4,big:["Saitama","埼玉","さいたま市"],bigp:1341000,fl:["Primrose","櫻草","サクラソウ"],hi:["Mount Sanpō",2483],prov:["Musashi"],nat:[["Chichibu Mountains","秩父山地","秩父山地"],["Arakawa River","荒川","荒川"],["Nagatoro gorge","長瀞","長瀞"]],food:[["Sōka rice crackers","草加煎餅","草加せんべい"],["Kusadango","草糰子","草だんご"],["Fukaya leeks","深谷蔥","深谷ねぎ"]],note:["Landlocked, densely settled, and functionally a northern extension of Tokyo. Kawagoe's kurazukuri warehouse street is the best surviving Edo period merchant townscape within reach of the capital, which is why it is called Koedo, Little Edo.","內陸而人口稠密，實質上是東京的北向延伸。川越的藏造町屋街是首都圈內保存最完整的江戶商家街景，因而被稱作小江戶。","内陸で人口密度が高く、実質的に東京の北への延長をなす。川越の蔵造りの町並みは首都圏に残る江戸期商家景観として最も完全であり、小江戸と呼ばれる。"],anch:[139.4,36],her:[],cas:[],pk:[["Mount Sanpō","三寶山","三宝山",2483],["Mount Kumotori","雲取山","雲取山",2017]]},
"12":{n:["Chiba","千葉縣","千葉県"],cap:["Chiba","千葉","千葉市"],reg:["Kantō","關東","関東"],regid:"kanto",pop:6264000,pr:6,area:5157,ar:28,den:1214.7,dr:6,big:["Chiba","千葉","千葉市"],bigp:978000,fl:["Rape blossom","油菜花","ナノハナ"],hi:["Mount Atago",408],prov:["Shimōsa","Kazusa","Awa (Bōshū)"],nat:[["Bōsō Peninsula","房總半島","房総半島"],["Cape Inubō","犬吠埼","犬吠埼"],["Kujūkuri Beach","九十九里濱","九十九里浜"],["Nokogiriyama","鋸山","鋸山"]],food:[["Peanuts, national leader","落花生，全國第一","落花生（全国一位）"],["Nameroh fish tartare","魚醬拌魚","なめろう"],["Soy sauce from Noda and Chōshi","野田與銚子的醬油","野田・銚子の醤油"]],note:["The Bōsō Peninsula, warm and maritime, closing Tokyo Bay from the east. Narita Airport and the port of Chiba make it a national gateway, Naritasan Shinshō-ji has drawn pilgrims since 940, and Chōshi and Noda remain the historic capitals of soy sauce brewing.","溫暖多雨的房總半島自東側合抱東京灣。成田機場與千葉港使其成為國門，成田山新勝寺自九四〇年即為香客所趨，銚子與野田則仍是醬油釀造的老巢。","温暖な海洋性の房総半島が東京湾を東から抱く。成田空港と千葉港が国の玄関口をなし、成田山新勝寺は九四〇年以来参詣を集め、銚子と野田は今も醤油醸造の中心である。"],anch:[140.25,35.5],her:[],cas:[],pk:[["Mount Atago","愛宕山","愛宕山",408]]},
"13":{n:["Tokyo","東京都","東京都"],cap:["Shinjuku","新宿","新宿区"],reg:["Kantō","關東","関東"],regid:"kanto",pop:14180000,pr:1,area:2194,ar:45,den:6463.1,dr:1,big:["Tokyo, 23 Special Wards","東京二十三區","東京23区"],bigp:9733000,fl:["Somei-yoshino cherry","染井吉野櫻","ソメイヨシノ"],hi:["Mount Kumotori",2017],prov:["Musashi","Izu"],nat:[["Mount Takao","高尾山","高尾山"],["Okutama","奧多摩","奥多摩"],["Izu Islands","伊豆諸島","伊豆諸島"],["Ogasawara Islands","小笠原群島","小笠原諸島"]],food:[["Edomae sushi","江戶前壽司","江戸前寿司"],["Soba","蕎麥麵","そば"],["Monjayaki","文字燒","もんじゃ焼き"]],note:["A metropolis governed as a prefecture, running from the Okutama mountains to islands a thousand kilometres out in the Pacific. Edo was founded as a castle town in 1457, became the shogunal seat in 1603, was probably the largest city on earth by 1720, and received the Emperor in 1868.","以都制治理的巨型都會，範圍自奧多摩山區延伸到太平洋上一千公里處的島嶼。江戶一四五七年築城，一六〇三年成為幕府所在，一七二〇年前後可能已是世上最大城市，一八六八年迎入天皇。","都として統治される巨大都市であり、奥多摩の山地から太平洋上千キロの島々にまで及ぶ。江戸は一四五七年に城下町として開かれ、一六〇三年に幕府の座となり、一七二〇年頃には世界最大の都市であったと見られる。一八六八年に天皇を迎えた。"],anch:[139.5,35.7],her:[["Ogasawara Islands","小笠原群島","小笠原諸島"],["National Museum of Western Art","國立西洋美術館","国立西洋美術館"]],cas:[],pk:[["Mount Kumotori","雲取山","雲取山",2017],["Mount Takao","高尾山","高尾山",599]]},
"14":{n:["Kanagawa","神奈川縣","神奈川県"],cap:["Yokohama","橫濱","横浜市"],reg:["Kantō","關東","関東"],regid:"kanto",pop:9215000,pr:2,area:2416,ar:43,den:3814.2,dr:3,big:["Yokohama","橫濱","横浜市"],bigp:3772000,fl:["Golden-rayed lily","山百合","ヤマユリ"],hi:["Mount Hiru",1673],prov:["Sagami","Musashi"],nat:[["Hakone caldera","箱根火山口","箱根カルデラ"],["Lake Ashi","蘆之湖","芦ノ湖"],["Miura Peninsula","三浦半島","三浦半島"],["Tanzawa Mountains","丹澤山地","丹沢山地"]],food:[["Shūmai","燒賣","シウマイ"],["Odawara kamaboko","小田原魚板","小田原かまぼこ"],["Iekei rāmen","家系拉麵","家系ラーメン"]],note:["Japan's second most populous prefecture. Kamakura was the seat of the first shogunate from 1185, and Yokohama, a fishing village until 1859, became the treaty port through which the country reopened to foreign trade; it is still the largest municipality in Japan.","全國人口第二多的縣。鎌倉自一一八五年為首個幕府所在，橫濱直到一八五九年仍是漁村，開港後成為國家重返世界貿易的門戶，至今仍是全國人口最多的市。","全国第二の人口を持つ県。鎌倉は一一八五年以来最初の幕府の座であり、一八五九年まで漁村であった横浜は開港により対外貿易の玄関となった。今も国内最大の市である。"],anch:[139.35,35.4],her:[],cas:[],pk:[["Mount Hiru","蛭岳","蛭ヶ岳",1673]]},
"15":{n:["Niigata","新潟縣","新潟県"],cap:["Niigata","新潟","新潟市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:2126000,pr:15,area:12584,ar:5,den:168.9,dr:34,big:["Niigata","新潟","新潟市"],bigp:772000,fl:["Tulip","鬱金香","チューリップ"],hi:["Mount Korenge",2766],prov:["Echigo","Sado"],nat:[["Sado Island","佐渡島","佐渡島"],["Echigo Plain","越後平原","越後平野"],["Shinano River, longest in Japan","信濃川，全國最長","信濃川（日本最長）"],["Mount Naeba","苗場山","苗場山"]],food:[["Koshihikari rice","越光米","コシヒカリ"],["Sake from over eighty breweries","八十餘家酒造的清酒","八十を超える蔵の日本酒"],["Hegi soba","布海苔蕎麥麵","へぎそば"]],note:["Japan's rice granary and the snowiest lowland in the country, where the Shinano River ends a course of 367 kilometres. Sado Island held the shogunate's richest gold mine and served for centuries as a place of exile for emperors, courtiers and the monk Nichiren.","全國的米倉，也是低地降雪最多之處，信濃川三百六十七公里的行程在此入海。佐渡島曾有幕府產量最豐的金山，數百年間亦是天皇、公卿與日蓮的流放之地。","全国の米倉であり、平地で最も雪の深い地でもある。信濃川は三百六十七キロの流れをここで終える。佐渡島は幕府最大の金山を抱え、数百年にわたり天皇や公卿、日蓮の流刑地でもあった。"],anch:[138.85,37.5],her:[["Sado Island Gold Mines","佐渡島的金山","佐渡島の金山"]],cas:[],pk:[["Mount Korenge","小蓮華山","小蓮華山",2766],["Mount Myōkō","妙高山","妙高山",2454],["Mount Echigo-Komagatake","越後駒岳","越後駒ヶ岳",2003]]},
"16":{n:["Toyama","富山縣","富山県"],cap:["Toyama","富山","富山市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:998000,pr:37,area:4248,ar:33,den:234.9,dr:25,big:["Toyama","富山","富山市"],bigp:408000,fl:["Tulip","鬱金香","チューリップ"],hi:["Mount Tate",3015],prov:["Etchū"],nat:[["Mount Tate","立山","立山"],["Kurobe Gorge","黑部峽谷","黒部峡谷"],["Tateyama Kurobe Alpine Route","立山黑部阿爾卑斯路線","立山黒部アルペンルート"],["Toyama Bay","富山灣","富山湾"]],food:[["Firefly squid","螢烏賊","ホタルイカ"],["Masu-zushi trout sushi","鱒壽司","ますのすし"],["White shrimp","白蝦","白えび"]],note:["A bay facing plain with the Northern Alps rising abruptly behind it, where the Yuki-no-Ōtani snow corridor on the Tateyama route can stand twenty metres high in spring. Mount Tate is one of Japan's Three Holy Mountains, alongside Fuji and Haku.","面海的平原背後即是陡起的北阿爾卑斯，立山路線的雪之大谷在春季可高達二十公尺。立山與富士山、白山併稱日本三靈山。","湾に面した平野の背後に北アルプスが急に立ち上がる。立山ルートの雪の大谷は春に二十メートルに達することがある。立山は富士山・白山と並ぶ日本三霊山の一つである。"],anch:[137.25,36.6],her:[["Historic Villages of Shirakawa-gō and Gokayama","白川鄉與五箇山的合掌造聚落","白川郷・五箇山の合掌造集落"]],cas:[],pk:[["Mount Tate","立山","立山",3015],["Mount Hakuba","白馬岳","白馬岳",2932]]},
"17":{n:["Ishikawa","石川縣","石川県"],cap:["Kanazawa","金澤","金沢市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:1109000,pr:33,area:4186,ar:35,den:264.9,dr:23,big:["Kanazawa","金澤","金沢市"],bigp:463000,fl:["Black lily","黑百合","クロユリ"],hi:["Mount Haku",2702],prov:["Kaga","Noto"],nat:[["Noto Peninsula","能登半島","能登半島"],["Mount Haku","白山","白山"],["Chirihama beach","千里濱","千里浜"],["Kenroku-en","兼六園","兼六園"]],food:[["Kaga vegetables","加賀野菜","加賀野菜"],["Jibuni duck stew","治部煮","じぶ煮"],["Gold leaf, ninety-nine percent of output","金箔，佔全國九成九","金箔（全国生産の九九％）"]],note:["Seat of the Maeda clan, whose Kaga domain was the wealthiest outside the shogunate's own lands. The patronage they poured into craft produced Kenroku-en, Kutani ware and Kaga yūzen dyeing; the Noto Peninsula was struck by a magnitude 7.6 earthquake on 1 January 2024.","前田氏的居城所在，加賀藩為幕府直轄地以外最富的大名領。歷代對工藝的投注造就兼六園、九谷燒與加賀友禪；能登半島於二〇二四年元旦遭規模七點六強震侵襲。","前田家の本拠であり、加賀藩は幕領を除けば最も富裕な大名領であった。工芸への庇護は兼六園、九谷焼、加賀友禅を生んだ。能登半島は二〇二四年元日にマグニチュード七・六の地震に襲われた。"],anch:[136.6,36.5],her:[],cas:[],pk:[["Mount Haku","白山","白山",2702]]},
"18":{n:["Fukui","福井縣","福井県"],cap:["Fukui","福井","福井市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:744000,pr:43,area:4191,ar:34,den:177.5,dr:32,big:["Fukui","福井","福井市"],bigp:259000,fl:["Narcissus","水仙","スイセン"],hi:["Mount Sannomine",2128],prov:["Echizen","Wakasa"],nat:[["Tōjinbō cliffs","東尋坊","東尋坊"],["Wakasa Bay","若狹灣","若狭湾"],["Kuzuryū River","九頭龍川","九頭竜川"]],food:[["Echizen crab","越前蟹","越前がに"],["Sauce katsudon","醬汁豬排丼","ソースかつ丼"],["Heshiko pickled fish","糠漬魚","へしこ"]],note:["Eihei-ji, founded by Dōgen in 1244, is still the head training monastery of Sōtō Zen. Fukui yields more dinosaur fossils than anywhere else in Japan, and Sabae makes roughly ninety-five percent of the country's eyeglass frames.","道元於一二四四年開創的永平寺，至今仍是曹洞宗的本山道場。福井出土的恐龍化石為全國之最，鯖江則生產全國約九成五的眼鏡框。","道元が一二四四年に開いた永平寺は、今も曹洞宗の本山修行道場である。福井は国内で最も多く恐竜化石を産し、鯖江は国産眼鏡枠の約九五％をつくる。"],anch:[136.2,35.85],her:[],cas:[["Maruoka Castle","丸岡城","丸岡城"]],pk:[["Mount Sannomine","三之峰","三ノ峰",2128]]},
"19":{n:["Yamanashi","山梨縣","山梨県"],cap:["Kōfu","甲府","甲府市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:796000,pr:41,area:4465,ar:32,den:178.3,dr:31,big:["Kōfu","甲府","甲府市"],bigp:186000,fl:["Fuji cherry","富士櫻","フジザクラ"],hi:["Mount Fuji",3776],prov:["Kai"],nat:[["Mount Fuji, northern face","富士山北面","富士山北麓"],["Fuji Five Lakes","富士五湖","富士五湖"],["Southern Alps","南阿爾卑斯","南アルプス"],["Kita-dake","北岳","北岳"]],food:[["Hōtō noodle stew","餺飥","ほうとう"],["Grapes and wine, national leader","葡萄與葡萄酒，全國第一","ぶどう・ワイン（全国一位）"],["Abalone simmered in wine","酒煮鮑魚","煮貝"]],note:["Landlocked and ringed by mountains, holding Japan's two highest peaks: Fuji on its southern rim and Kita-dake within it. The Kōshū basin was the base of Takeda Shingen, and its volcanic soil slopes now carry the country's oldest commercial vineyards.","四面環山的內陸縣，境內外囊括全國最高的兩座山：南緣的富士山與縣內的北岳。甲州盆地曾是武田信玄的根據地，如今火山土坡地上是全國最早的商業葡萄園。","山に囲まれた内陸県で、南縁の富士山と県内の北岳という国内最高の二峰を擁する。甲州盆地は武田信玄の本拠であり、火山性土壌の斜面には国内最古の商業葡萄園が広がる。"],anch:[138.6,35.6],her:[["Fujisan","富士山","富士山"]],cas:[],pk:[["Mount Fuji","富士山","富士山",3776],["Kita-dake","北岳","北岳",3193],["Mount Aino","間之岳","間ノ岳",3190],["Mount Yatsugatake","八岳（赤岳）","八ヶ岳（赤岳）",2899]]},
"20":{n:["Nagano","長野縣","長野県"],cap:["Nagano","長野","長野市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:1996000,pr:16,area:13562,ar:4,den:147.2,dr:38,big:["Nagano","長野","長野市"],bigp:367000,fl:["Gentian","龍膽","リンドウ"],hi:["Oku-hotaka-dake",3190],prov:["Shinano"],nat:[["Northern, Central and Southern Alps","北中南阿爾卑斯","北・中央・南アルプス"],["Kamikōchi","上高地","上高地"],["Lake Suwa","諏訪湖","諏訪湖"],["Mount Ontake","御嶽山","御嶽山"]],food:[["Shinshū soba","信州蕎麥麵","信州そば"],["Oyaki dumplings","燒餅糰","おやき"],["Nozawana pickles","野澤菜漬","野沢菜漬"]],note:["The roof of Japan: landlocked, bordering eight prefectures, and holding more three thousand metre peaks than anywhere else. Zenkō-ji has admitted pilgrims of every sect since the seventh century, and Matsumoto Castle's black keep is one of five designated National Treasures.","日本的屋脊。內陸而與八縣相鄰，三千公尺級山峰數量為全國之首。善光寺自七世紀起不分宗派接納香客，松本城的黑色天守則是五座國寶天守之一。","日本の屋根。内陸にあって八県と境を接し、三千メートル峰の数は全国一である。善光寺は七世紀以来宗派を問わず参詣を受け入れ、松本城の黒い天守は国宝五城の一つに数えられる。"],anch:[138.05,36.1],her:[],cas:[["Matsumoto Castle","松本城","松本城"]],pk:[["Oku-hotaka-dake","奧穗高岳","奥穂高岳",3190],["Mount Yari","槍岳","槍ヶ岳",3180],["Mount Ontake","御嶽山","御嶽山",3067],["Mount Norikura","乘鞍岳","乗鞍岳",3026]]},
"21":{n:["Gifu","岐阜縣","岐阜県"],cap:["Gifu","岐阜","岐阜市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:1930000,pr:17,area:10621,ar:7,den:181.7,dr:30,big:["Gifu","岐阜","岐阜市"],bigp:400000,fl:["Chinese milk vetch","紫雲英","レンゲソウ"],hi:["Oku-hotaka-dake",3190],prov:["Mino","Hida"],nat:[["Hida Mountains","飛驒山脈","飛騨山脈"],["Nagara River","長良川","長良川"],["Shirakawa-gō","白川鄉","白川郷"],["Kiso Valley","木曾谷","木曽谷"]],food:[["Hida beef","飛驒牛","飛騨牛"],["Ayu sweetfish","香魚","鮎"],["Mino washi paper","美濃和紙","美濃和紙"]],note:["The pivot of the archipelago, with Sekigahara, where the decisive battle of 1600 was fought, on its western plain. Shirakawa-gō's gasshō-zukuri farmhouses, roofed at sixty degrees to shed heavy snow, are the last intact settlement of their kind.","列島的樞軸，一六〇〇年決定天下的關原之戰即在西部平原。白川鄉的合掌造農舍屋頂傾斜六十度以卸重雪，是同類聚落中最後保存完整者。","列島の要をなす地で、一六〇〇年の天下分け目の関ヶ原は西部の平野にある。白川郷の合掌造は六十度の急勾配で雪を落とし、この形式の集落として最後に完全な姿を残す。"],anch:[137.05,35.8],her:[["Historic Villages of Shirakawa-gō and Gokayama","白川鄉與五箇山的合掌造聚落","白川郷・五箇山の合掌造集落"]],cas:[],pk:[["Oku-hotaka-dake","奧穗高岳","奥穂高岳",3190],["Mount Ontake","御嶽山","御嶽山",3067],["Mount Norikura","乘鞍岳","乗鞍岳",3026],["Mount Haku","白山","白山",2702]]},
"22":{n:["Shizuoka","靜岡縣","静岡県"],cap:["Shizuoka","靜岡","静岡市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:3555000,pr:10,area:7777,ar:13,den:457.1,dr:13,big:["Hamamatsu","濱松","浜松市"],bigp:785000,fl:["Azalea","杜鵑","ツツジ"],hi:["Mount Fuji",3776],prov:["Suruga","Tōtōmi","Izu"],nat:[["Mount Fuji, southern face","富士山南面","富士山南麓"],["Izu Peninsula","伊豆半島","伊豆半島"],["Suruga Bay, deepest in Japan","駿河灣，全國最深","駿河湾（日本最深）"],["Lake Hamana","濱名湖","浜名湖"]],food:[["Green tea, about forty percent of the crop","綠茶，約佔全國四成","緑茶（全国の約四割）"],["Sakura shrimp","櫻花蝦","桜えび"],["Lake Hamana eel","濱名湖鰻","浜名湖のうなぎ"]],note:["A long Pacific frontage under Fuji's south face, warm enough for tea and mandarins. Sunpu, now Shizuoka city, was where Tokugawa Ieyasu retired and ruled from behind the scenes, and Hamamatsu built the motorcycle and musical instrument industries.","在富士山南麓沿太平洋展開的長條海岸，氣候足以種茶與蜜柑。今日靜岡市的駿府是德川家康退隱後垂簾聽政之所，濱松則孕育了機車與樂器工業。","富士山の南面に沿って太平洋に長く面し、茶と蜜柑が育つ温暖な地。今の静岡市にあたる駿府は徳川家康が隠居して実権を握った地であり、浜松は二輪と楽器の産業を築いた。"],anch:[138.35,35],her:[["Fujisan","富士山","富士山"]],cas:[],pk:[["Mount Fuji","富士山","富士山",3776],["Mount Aino","間之岳","間ノ岳",3190]]},
"23":{n:["Aichi","愛知縣","愛知県"],cap:["Nagoya","名古屋","名古屋市"],reg:["Chūbu","中部","中部"],regid:"chubu",pop:7477000,pr:4,area:5173,ar:27,den:1445.4,dr:5,big:["Nagoya","名古屋","名古屋市"],bigp:2332000,fl:["Rabbit-ear iris","杜若","カキツバタ"],hi:["Mount Chausu",1415],prov:["Owari","Mikawa"],nat:[["Chita Peninsula","知多半島","知多半島"],["Atsumi Peninsula","渥美半島","渥美半島"],["Kiso Three Rivers delta","木曾三川三角洲","木曽三川の三角州"]],food:[["Miso katsu and miso nikomi udon","味噌豬排與味噌燉烏龍麵","味噌かつ・味噌煮込みうどん"],["Hitsumabushi eel","鰻魚三吃","ひつまぶし"],["Tebasaki wings","雞翅","手羽先"]],note:["Japan's industrial heartland and the source of its three unifiers: Oda Nobunaga and Toyotomi Hideyoshi from Owari, Tokugawa Ieyasu from Mikawa. Toyota City, renamed for the company in 1959, anchors the largest automotive cluster in the country.","日本的工業心臟，也是三位天下人的出身地：尾張的織田信長與豐臣秀吉、三河的德川家康。一九五九年因企業改名的豐田市，是全國最大的汽車產業聚落核心。","日本の工業の中枢であり、三人の天下人を生んだ地でもある。尾張から織田信長と豊臣秀吉、三河から徳川家康が出た。一九五九年に社名にちなんで改称した豊田市は、国内最大の自動車産業集積の核である。"],anch:[137.1,35.05],her:[],cas:[["Inuyama Castle","犬山城","犬山城"],["Nagoya Castle","名古屋城","名古屋城"]],pk:[["Mount Chausu","茶臼山","茶臼山",1415]]},
"24":{n:["Mie","三重縣","三重県"],cap:["Tsu","津","津市"],reg:["Kansai, Kinki","關西（近畿）","関西（近畿）"],regid:"kansai",pop:1727000,pr:22,area:5774,ar:25,den:299.1,dr:20,big:["Yokkaichi","四日市","四日市市"],bigp:305000,fl:["Japanese iris","花菖蒲","ハナショウブ"],hi:["Mount Ōdaigahara",1695],prov:["Ise","Iga","Shima","Kii"],nat:[["Ise-Shima ria coast","伊勢志摩溺灣海岸","伊勢志摩リアス海岸"],["Kumano-nada coast","熊野灘","熊野灘"],["Suzuka Mountains","鈴鹿山脈","鈴鹿山脈"],["Akame 48 Waterfalls","赤目四十八瀧","赤目四十八滝"]],food:[["Matsusaka beef","松阪牛","松阪牛"],["Ise lobster","伊勢龍蝦","伊勢えび"],["Akafuku mochi","赤福麻糬","赤福餅"]],note:["Home of Ise Jingū, shrine of Amaterasu, rebuilt from fresh timber every twenty years since the seventh century; the 2013 rebuilding was the sixty-second. Iga was one of the two heartlands of ninjutsu, and the ama divers of Toba still work without tanks.","祀奉天照大神的伊勢神宮所在，自七世紀起每二十年以新材重建，二〇一三年為第六十二次。伊賀是忍術兩大源流之一，鳥羽的海女至今仍不帶氧氣瓶下水。","天照大神を祀る伊勢神宮の地であり、七世紀以来二十年ごとに新材で建て替えられてきた。二〇一三年の遷宮が第六十二回にあたる。伊賀は忍術二大流派の一つの地であり、鳥羽の海女は今も素潜りで漁を続ける。"],anch:[136.35,34.5],her:[["Sacred Sites and Pilgrimage Routes in the Kii Mountain Range","紀伊山地的靈場與參詣道","紀伊山地の霊場と参詣道"]],cas:[],pk:[["Mount Ōdaigahara","大臺原山","大台ヶ原山",1695]]},
"25":{n:["Shiga","滋賀縣","滋賀県"],cap:["Ōtsu","大津","大津市"],reg:["Kansai, Kinki","關西（近畿）","関西（近畿）"],regid:"kansai",pop:1404000,pr:26,area:4017,ar:38,den:349.5,dr:15,big:["Ōtsu","大津","大津市"],bigp:344000,fl:["Rhododendron","石楠花","シャクナゲ"],hi:["Mount Ibuki",1377],prov:["Ōmi"],nat:[["Lake Biwa, largest in Japan","琵琶湖，全國最大","琵琶湖（日本最大）"],["Mount Ibuki","伊吹山","伊吹山"],["Mount Hiei","比叡山","比叡山"],["Suzuka Mountains","鈴鹿山脈","鈴鹿山脈"]],food:[["Funazushi fermented crucian carp","鮒壽司","鮒ずし"],["Ōmi beef","近江牛","近江牛"],["Lake Biwa freshwater fish","琵琶湖淡水魚","湖魚"]],note:["One sixth of the prefecture is Lake Biwa, which supplies water to fourteen million people downstream. Enryaku-ji on Mount Hiei, founded in 788, trained the founders of nearly every major Japanese Buddhist school, and Hikone Castle's keep is a National Treasure.","全縣六分之一為琵琶湖，供下游一千四百萬人用水。七八八年開山的比叡山延曆寺培育出幾乎所有日本佛教主要宗派的開祖，彥根城天守則為國寶。","県域の六分の一を琵琶湖が占め、下流一千四百万人に水を供する。七八八年開創の比叡山延暦寺は日本仏教主要宗派のほぼすべての祖師を育て、彦根城天守は国宝である。"],anch:[136.1,35.15],her:[["Historic Monuments of Ancient Kyoto","古都京都的文化財","古都京都の文化財"]],cas:[["Hikone Castle","彥根城","彦根城"]],pk:[["Mount Ibuki","伊吹山","伊吹山",1377],["Mount Hiei","比叡山","比叡山",848]]},
"26":{n:["Kyoto","京都府","京都府"],cap:["Kyoto","京都","京都市"],reg:["Kansai, Kinki","關西（近畿）","関西（近畿）"],regid:"kansai",pop:2529000,pr:13,area:4612,ar:31,den:548.4,dr:10,big:["Kyoto","京都","京都市"],bigp:1443000,fl:["Weeping cherry","垂枝櫻","シダレザクラ"],hi:["Mount Minago",971],prov:["Yamashiro","Tanba","Tango"],nat:[["Amanohashidate","天橋立","天橋立"],["Tango Peninsula","丹後半島","丹後半島"],["Hozu River gorge","保津川峽谷","保津川渓谷"],["Arashiyama","嵐山","嵐山"]],food:[["Kaiseki cuisine","懷石料理","懐石料理"],["Uji matcha","宇治抹茶","宇治抹茶"],["Kyō-yasai heirloom vegetables","京野菜","京野菜"]],note:["Capital of Japan from 794 to 1868 and still the standard against which the country measures refinement. Seventeen properties carry the World Heritage inscription, and Amanohashidate on the Sea of Japan side is another of the Three Views.","七九四至一八六八年的國都，至今仍是全國衡量雅緻的尺度。十七處資產列入世界遺產，日本海側的天橋立則是三景之一。","七九四年から一八六八年までの都であり、今も洗練の基準となる地である。十七件が世界遺産に登録され、日本海側の天橋立は三景の一つに数えられる。"],anch:[135.6,35.25],her:[["Historic Monuments of Ancient Kyoto","古都京都的文化財","古都京都の文化財"]],cas:[["Nijō Castle","二條城","二条城"]],pk:[["Mount Minago","皆子山","皆子山",972],["Mount Hiei","比叡山","比叡山",848]]},
"27":{n:["Osaka","大阪府","大阪府"],cap:["Osaka","大阪","大阪市"],reg:["Kansai, Kinki","關西（近畿）","関西（近畿）"],regid:"kansai",pop:8763000,pr:3,area:1905,ar:46,den:4600.0,dr:2,big:["Osaka","大阪","大阪市"],bigp:2752000,fl:["Plum and primrose","梅與櫻草","ウメ・サクラソウ"],hi:["Mount Kongō",1125],prov:["Settsu","Kawachi","Izumi"],nat:[["Yodo River","淀川","淀川"],["Kongō Range","金剛山地","金剛山地"],["Osaka Bay","大阪灣","大阪湾"]],food:[["Takoyaki","章魚燒","たこ焼き"],["Okonomiyaki","大阪燒","お好み焼き"],["Kushikatsu","串炸","串カツ"]],note:["The nation's kitchen and its mercantile counterweight to Kyoto's court and Edo's warriors. The Daisen Kofun at Sakai, attributed to Emperor Nintoku, has the largest footprint of any tomb on earth. Second smallest prefecture by area, second densest by population.","全國的廚房，也是相對於京都朝廷與江戶武家的商人重心。堺市的大仙陵古墳傳為仁德天皇陵，佔地為世界墳墓之最。面積全國倒數第二，人口密度全國第二。","天下の台所であり、京の公家と江戸の武家に対する商人の重心でもあった。堺の大仙陵古墳は仁徳天皇陵と伝えられ、その面積は世界の墓の中で最大である。面積は全国四十六位、人口密度は二位。"],anch:[135.5,34.6],her:[["Mozu-Furuichi Kofun Group","百舌鳥・古市古墳群","百舌鳥・古市古墳群"]],cas:[["Osaka Castle","大阪城","大阪城"]],pk:[["Mount Kongō","金剛山","金剛山",1125]]},
"28":{n:["Hyōgo","兵庫縣","兵庫県"],cap:["Kobe","神戶","神戸市"],reg:["Kansai, Kinki","關西（近畿）","関西（近畿）"],regid:"kansai",pop:5370000,pr:7,area:8401,ar:12,den:639.2,dr:9,big:["Kobe","神戶","神戸市"],bigp:1495000,fl:["Nojigiku chrysanthemum","野路菊","ノジギク"],hi:["Mount Hyōno",1510],prov:["Harima","Tajima","Awaji","Settsu","Tanba"],nat:[["Awaji Island","淡路島","淡路島"],["Rokkō Mountains","六甲山","六甲山"],["Kinosaki coast","城崎海岸","城崎海岸"],["Akashi Strait","明石海峽","明石海峡"]],food:[["Kobe beef","神戶牛","神戸牛"],["Akashiyaki","明石燒","明石焼"],["Nada sake, the largest brewing district","灘的清酒，全國最大釀造區","灘の酒（全国最大の醸造地）"]],note:["The only prefecture fronting both the Sea of Japan and the Inland Sea. Himeji Castle, never besieged and never burnt, is Japan's finest surviving fortress and among the first two cultural sites UNESCO inscribed here; the 1995 Kobe earthquake killed more than 6,400 people.","全國唯一同時面向日本海與瀨戶內海的縣。從未遭圍城亦未曾焚毀的姬路城是保存最完好的城郭，也是聯合國最早登錄的兩處日本文化遺產之一；一九九五年阪神大地震奪走逾六千四百條性命。","日本海と瀬戸内海の双方に面する唯一の県。攻められも焼けもしなかった姫路城は国内最良の現存城郭であり、日本最初の文化遺産二件の一つでもある。一九九五年の阪神淡路大震災では六千四百人以上が亡くなった。"],anch:[134.85,35],her:[["Himeji-jō","姬路城","姫路城"],["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"]],cas:[["Himeji Castle","姬路城","姫路城"]],pk:[["Mount Hyōno","氷之山","氷ノ山",1510],["Mount Ushiro","後山","後山",1345]]},
"29":{n:["Nara","奈良縣","奈良県"],cap:["Nara","奈良","奈良市"],reg:["Kansai, Kinki","關西（近畿）","関西（近畿）"],regid:"kansai",pop:1296000,pr:28,area:3691,ar:40,den:351.1,dr:14,big:["Nara","奈良","奈良市"],bigp:351000,fl:["Nara yae cherry","奈良八重櫻","ナラノヤエザクラ"],hi:["Hakkyō-ga-take",1915],prov:["Yamato"],nat:[["Yoshino cherry mountains","吉野山","吉野山"],["Ōmine Range","大峰山脈","大峰山脈"],["Kumano Kodō routes","熊野古道","熊野古道"],["Mount Ōdaigahara","大臺原山","大台ヶ原山"]],food:[["Kakinoha-zushi","柿葉壽司","柿の葉ずし"],["Miwa sōmen","三輪素麵","三輪そうめん"],["Nara-zuke pickles","奈良漬","奈良漬"]],note:["Japan's first permanent capital, laid out at Heijō-kyō in 710 on the Chinese grid. Hōryū-ji holds the oldest surviving wooden buildings in the world and Tōdai-ji's Great Buddha Hall is the largest wooden structure of its type. Landlocked, and two thirds forest.","日本首座常設都城，七一〇年依中國方格制營建平城京。法隆寺保有世上現存最古的木造建築，東大寺大佛殿則是同類木構中最大者。內陸縣，三分之二為林地。","日本最初の恒久的な都で、七一〇年に唐の条坊制に倣って平城京が置かれた。法隆寺は現存最古の木造建築を伝え、東大寺大仏殿は同種の木造建築で最大である。内陸県で、三分の二が森林である。"],anch:[135.85,34.35],her:[["Buddhist Monuments in the Hōryū-ji Area","法隆寺地域的佛教建築","法隆寺地域の仏教建造物"],["Historic Monuments of Ancient Nara","古都奈良的文化財","古都奈良の文化財"],["Sacred Sites and Pilgrimage Routes in the Kii Mountain Range","紀伊山地的靈場與參詣道","紀伊山地の霊場と参詣道"]],cas:[],pk:[["Hakkyō-ga-take","八經岳","八経ヶ岳",1915],["Mount Ōdaigahara","大臺原山","大台ヶ原山",1695],["Mount Kongō","金剛山","金剛山",1125]]},
"30":{n:["Wakayama","和歌山縣","和歌山県"],cap:["Wakayama","和歌山","和歌山市"],reg:["Kansai, Kinki","關西（近畿）","関西（近畿）"],regid:"kansai",pop:892000,pr:40,area:4725,ar:30,den:188.8,dr:29,big:["Wakayama","和歌山","和歌山市"],bigp:352000,fl:["Plum blossom","梅花","ウメ"],hi:["Mount Gomadan",1372],prov:["Kii"],nat:[["Kii Peninsula","紀伊半島","紀伊半島"],["Nachi Falls, tallest single drop","那智瀑布，全國落差最大","那智の滝（日本最大の落差）"],["Mount Kōya","高野山","高野山"],["Shirahama coast","白濱海岸","白浜海岸"]],food:[["Nanko plums, sixty percent of the crop","南高梅，佔全國六成","南高梅（全国の約六割）"],["Mandarins","蜜柑","みかん"],["Wakayama tonkotsu-shōyu rāmen","和歌山豚骨醬油拉麵","和歌山ラーメン"]],note:["Steep, wet and heavily forested. Kūkai founded the monastic complex on Mount Kōya in 816 and more than two hundred thousand graves now surround Okunoin. The Kumano Kodō and Spain's Camino de Santiago are the only two pilgrimage roads UNESCO has inscribed.","地勢陡峻、雨量豐沛、森林覆蓋極廣。空海於八一六年在高野山開創伽藍，奧之院四周今有逾二十萬座墓塔。熊野古道與西班牙聖雅各之路是世上僅有的兩條列入世界遺產的朝聖道。","急峻で雨が多く、森林に深く覆われる。空海は八一六年に高野山を開き、奥之院の周囲には今や二十万を超える墓碑が並ぶ。熊野古道はスペインのサンティアゴ巡礼路と並び、世界遺産に登録された二つの巡礼路の一つである。"],anch:[135.5,33.95],her:[["Sacred Sites and Pilgrimage Routes in the Kii Mountain Range","紀伊山地的靈場與參詣道","紀伊山地の霊場と参詣道"]],cas:[],pk:[["Mount Gomadan","護摩壇山","護摩壇山",1372],["Mount Kōya","高野山","高野山",1009]]},
"31":{n:["Tottori","鳥取縣","鳥取県"],cap:["Tottori","鳥取","鳥取市"],reg:["Chūgoku","中國","中国"],regid:"chugoku",pop:537000,pr:47,area:3507,ar:41,den:153.1,dr:37,big:["Tottori","鳥取","鳥取市"],bigp:184000,fl:["Pear blossom","梨花","二十世紀梨の花"],hi:["Mount Daisen",1729],prov:["Inaba","Hōki"],nat:[["Tottori Sand Dunes","鳥取沙丘","鳥取砂丘"],["Mount Daisen","大山","大山"],["San'in Kaigan Geopark","山陰海岸地質公園","山陰海岸ジオパーク"]],food:[["Matsuba crab","松葉蟹","松葉がに"],["Twentieth-century pears","二十世紀梨","二十世紀梨"],["Tottori beef","鳥取和牛","鳥取和牛"]],note:["Japan's least populous prefecture. Its dunes, sixteen kilometres of wind built sand along the Sea of Japan, are the largest in the country, and Mount Daisen, the highest peak in western Honshū, was a Shugendō centre long before it was a ski field.","全國人口最少的縣。沿日本海延伸十六公里的風成沙丘為全國最大，西日本最高峰大山在成為滑雪場之前，早已是修驗道的重鎮。","全国で最も人口の少ない県。日本海沿いに十六キロ続く風成砂丘は国内最大で、西日本最高峰の大山はスキー場となるはるか前から修験道の霊地であった。"],anch:[133.9,35.4],her:[],cas:[],pk:[["Mount Daisen","大山","大山",1729],["Mount Hyōno","氷之山","氷ノ山",1510]]},
"32":{n:["Shimane","島根縣","島根県"],cap:["Matsue","松江","松江市"],reg:["Chūgoku","中國","中国"],regid:"chugoku",pop:650000,pr:46,area:6708,ar:19,den:96.9,dr:43,big:["Matsue","松江","松江市"],bigp:199000,fl:["Peony","牡丹","ボタン"],hi:["Mount Osorakan",1346],prov:["Izumo","Iwami","Oki"],nat:[["Lake Shinji","宍道湖","宍道湖"],["Lake Nakaumi","中海","中海"],["Oki Islands","隱岐諸島","隠岐諸島"],["Izumo coast","出雲海岸","出雲海岸"]],food:[["Izumo soba","出雲蕎麥麵","出雲そば"],["Shijimi clams","蜆","しじみ"],["Nodoguro blackthroat seaperch","赤鯥","のどぐろ"]],note:["The old land of Izumo, where the gods of the whole country are said to gather each October, so that the tenth month is called the month without gods everywhere but here. Iwami Ginzan supplied a large share of the world's silver in the sixteenth century, and Matsue Castle's keep is a National Treasure.","古出雲之地，相傳全國神明每年十月在此聚會，因此農曆十月在別處稱神無月，唯此地稱神在月。石見銀山在十六世紀供應了世界白銀的可觀份額，松江城天守亦為國寶。","古の出雲の地であり、十月には全国の神々が集まると伝えられる。ゆえに他国で神無月と呼ぶ月を、この地では神在月と呼ぶ。石見銀山は十六世紀の世界銀産の一角を担い、松江城天守は国宝である。"],anch:[132.7,35.05],her:[["Iwami Ginzan Silver Mine","石見銀山","石見銀山"]],cas:[["Matsue Castle","松江城","松江城"]],pk:[["Mount Osorakan","恐羅漢山","恐羅漢山",1346],["Mount Sanbe","三瓶山","三瓶山",1126]]},
"33":{n:["Okayama","岡山縣","岡山県"],cap:["Okayama","岡山","岡山市"],reg:["Chūgoku","中國","中国"],regid:"chugoku",pop:1847000,pr:20,area:7114,ar:17,den:259.6,dr:24,big:["Okayama","岡山","岡山市"],bigp:721000,fl:["Peach blossom","桃花","モモの花"],hi:["Mount Ushiro",1345],prov:["Bizen","Bitchū","Mimasaka"],nat:[["Inland Sea islands","瀨戶內海諸島","瀬戸内海の島々"],["Takahashi River","高梁川","高梁川"],["Hiruzen Highlands","蒜山高原","蒜山高原"],["Kōraku-en","後樂園","後楽園"]],food:[["White peaches","白桃","白桃"],["Muscat grapes","蜜思嘉葡萄","マスカット"],["Barazushi","散壽司","ばら寿司"]],note:["Called the Land of Sunshine for having the fewest rain days in Japan. Kōraku-en is one of the Three Great Gardens, Kurashiki's Bikan quarter preserves its white walled canal warehouses, and Bitchū Matsuyama Castle is the highest original keep still standing.","因全國降雨日數最少而稱晴天之國。後樂園為日本三名園之一，倉敷美觀地區保有白牆運河倉庫街，備中松山城則是現存最高的天守。","全国で最も雨の日が少なく、晴れの国と呼ばれる。後楽園は日本三名園の一つ、倉敷美観地区は白壁の運河倉庫を残し、備中松山城は現存最高所の天守である。"],anch:[133.8,34.85],her:[["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"]],cas:[["Bitchū Matsuyama Castle","備中松山城","備中松山城"]],pk:[["Mount Ushiro","後山","後山",1345]]},
"34":{n:["Hiroshima","廣島縣","広島県"],cap:["Hiroshima","廣島","広島市"],reg:["Chūgoku","中國","中国"],regid:"chugoku",pop:2738000,pr:12,area:8479,ar:11,den:322.9,dr:17,big:["Hiroshima","廣島","広島市"],bigp:1189000,fl:["Maple","楓","モミジ"],hi:["Mount Osorakan",1346],prov:["Aki","Bingo"],nat:[["Miyajima, Itsukushima","宮島（嚴島）","宮島（厳島）"],["Setonaikai National Park","瀨戶內海國立公園","瀬戸内海国立公園"],["Sandankyō Gorge","三段峽","三段峡"]],food:[["Hiroshima okonomiyaki","廣島燒","広島風お好み焼き"],["Oysters, sixty percent of output","牡蠣，佔全國六成","かき（全国の約六割）"],["Momiji manjū","紅葉饅頭","もみじ饅頭"]],note:["Destroyed by the first atomic bomb on 6 August 1945 and rebuilt around the preserved skeleton of the Genbaku Dome. The torii of Itsukushima Shrine, standing in the tide off Miyajima, marks another of the Three Views of Japan.","一九四五年八月六日毀於首枚原子彈，戰後圍繞保留下來的原爆圓頂骨架重建。立於宮島潮水中的嚴島神社大鳥居，是日本三景之一。","一九四五年八月六日、最初の原子爆弾により壊滅し、原爆ドームの骨組を残したまま再建された。宮島の潮に立つ厳島神社の大鳥居は、日本三景の一つを標す。"],anch:[132.85,34.6],her:[["Hiroshima Peace Memorial, Genbaku Dome","廣島和平紀念碑（原爆圓頂）","広島平和記念碑（原爆ドーム）"],["Itsukushima Shinto Shrine","嚴島神社","厳島神社"]],cas:[],pk:[["Mount Osorakan","恐羅漢山","恐羅漢山",1346]]},
"35":{n:["Yamaguchi","山口縣","山口県"],cap:["Yamaguchi","山口","山口市"],reg:["Chūgoku","中國","中国"],regid:"chugoku",pop:1299000,pr:27,area:6113,ar:23,den:212.5,dr:28,big:["Shimonoseki","下關","下関市"],bigp:249000,fl:["Natsumikan blossom","夏蜜柑花","ナツミカンの花"],hi:["Mount Jakuchi",1337],prov:["Suō","Nagato"],nat:[["Akiyoshidai karst","秋吉臺喀斯特","秋吉台カルスト"],["Kanmon Strait","關門海峽","関門海峡"],["Tsunoshima","角島","角島"],["Akiyoshidō cave","秋芳洞","秋芳洞"]],food:[["Fugu pufferfish","河豚","ふぐ"],["Kawara soba","瓦蕎麥麵","瓦そば"],["Natsumikan citrus","夏蜜柑","夏みかん"]],note:["The western end of Honshū, separated from Kyūshū by the seven hundred metre Kanmon Strait. As the Chōshū domain it supplied the men who overthrew the shogunate, and Hagi's Shōka Sonjuku academy, where Yoshida Shōin taught them, is inscribed with the Meiji industrial sites.","本州西端，與九州之間僅隔七百公尺的關門海峽。作為長州藩，此地供出了推翻幕府的人物，吉田松陰講學的萩市松下村塾亦列入明治工業革命遺產。","本州の西端で、九州とは七百メートルの関門海峡で隔てられる。長州藩として幕府を倒した人材を輩出し、吉田松陰が教えた萩の松下村塾は明治日本の産業革命遺産に含まれる。"],anch:[131.5,34.2],her:[["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"]],cas:[],pk:[["Mount Jakuchi","寂地山","寂地山",1337]]},
"36":{n:["Tokushima","德島縣","徳島県"],cap:["Tokushima","德島","徳島市"],reg:["Shikoku","四國","四国"],regid:"shikoku",pop:695000,pr:44,area:4147,ar:36,den:167.6,dr:36,big:["Tokushima","德島","徳島市"],bigp:249000,fl:["Sudachi blossom","酢橘花","スダチの花"],hi:["Mount Tsurugi",1955],prov:["Awa (Ashū)"],nat:[["Naruto whirlpools","鳴門漩渦","鳴門の渦潮"],["Iya Valley","祖谷溪","祖谷渓"],["Yoshino River","吉野川","吉野川"],["Mount Tsurugi","劍山","剣山"]],food:[["Sudachi citrus","酢橘","すだち"],["Tokushima rāmen","德島拉麵","徳島ラーメン"],["Naruto-kintoki sweet potato","鳴門金時甘薯","鳴門金時"]],note:["The Awa Odori, danced through Tokushima every August since the late sixteenth century, is the largest dance festival in Japan. The vine bridges of the Iya Valley and the whirlpools in the Naruto Strait, among the fastest tidal currents on earth, are its other landmarks.","自十六世紀末起每年八月踏遍德島街巷的阿波舞，是全國規模最大的舞蹈祭典。祖谷溪的藤蔓吊橋與鳴門海峽的漩渦（世界最快潮流之一）為另兩處代表景觀。","十六世紀末から毎年八月に徳島の町を練り歩く阿波踊は、国内最大の踊りの祭である。祖谷渓のかずら橋と、世界屈指の潮流を持つ鳴門海峡の渦潮も並ぶ景観である。"],anch:[134.35,33.9],her:[],cas:[],pk:[["Mount Tsurugi","劍山","剣山",1955],["Mount Miune","三嶺","三嶺",1894],["Mount Ryūō","龍王山","竜王山",1060]]},
"37":{n:["Kagawa","香川縣","香川県"],cap:["Takamatsu","高松","高松市"],reg:["Shikoku","四國","四国"],regid:"shikoku",pop:926000,pr:38,area:1877,ar:47,den:493.3,dr:11,big:["Takamatsu","高松","高松市"],bigp:417000,fl:["Olive","橄欖","オリーブ"],hi:["Mount Ryūō",1060],prov:["Sanuki"],nat:[["Inland Sea islands","瀨戶內海諸島","瀬戸内海の島々"],["Shōdoshima","小豆島","小豆島"],["Mount Iino, Sanuki Fuji","飯野山（讚岐富士）","飯野山（讃岐富士）"]],food:[["Sanuki udon","讚岐烏龍麵","讃岐うどん"],["Shōdoshima olives","小豆島橄欖","小豆島のオリーブ"],["Honetsuki-dori chicken","帶骨雞腿","骨付鳥"]],note:["Japan's smallest prefecture. Konpira-san at Kotohira has drawn sailors up its 785 steps for centuries, Ritsurin Garden is among the finest daimyō gardens, and the Setouchi Triennale has turned the Inland Sea islands into an art circuit.","全國面積最小的縣。琴平的金刀比羅宮七百八十五級石階數百年來為海員所登，栗林園是最上乘的大名庭園之一，瀨戶內國際藝術祭則把內海島嶼串成藝術巡迴地。","全国で最も小さい県。琴平の金刀比羅宮の七百八十五段は幾世紀も船乗りが登り、栗林公園は大名庭園の白眉に数えられる。瀬戸内国際芸術祭は島々を美術の巡路に変えた。"],anch:[134.05,34.25],her:[],cas:[["Marugame Castle","丸龜城","丸亀城"]],pk:[["Mount Ryūō","龍王山","竜王山",1060]]},
"38":{n:["Ehime","愛媛縣","愛媛県"],cap:["Matsuyama","松山","松山市"],reg:["Shikoku","四國","四国"],regid:"shikoku",pop:1291000,pr:29,area:5676,ar:26,den:227.4,dr:27,big:["Matsuyama","松山","松山市"],bigp:504000,fl:["Mandarin blossom","蜜柑花","ミカンの花"],hi:["Mount Ishizuchi",1982],prov:["Iyo"],nat:[["Mount Ishizuchi, highest in western Japan","石鎚山，西日本最高","石鎚山（西日本最高峰）"],["Shimanami Kaidō islands","島波海道諸島","しまなみ海道の島々"],["Uwa Sea ria coast","宇和海溺灣","宇和海リアス海岸"]],food:[["Mandarins, national leader","蜜柑，全國第一","みかん（全国一位）"],["Taimeshi sea bream rice","鯛飯","鯛めし"],["Jakoten fish cake","雜魚天","じゃこ天"]],note:["Dōgo Onsen claims to be the oldest hot spring in Japan, named in the eighth century Nihon Shoki, and its 1894 bathhouse is a National Important Cultural Property. Imabari produces most of the country's towels, and the Shimanami Kaidō carries cyclists across six islands to Honshū.","道後溫泉自稱全國最古，《日本書紀》八世紀已載其名，一八九四年的本館為國家重要文化財。今治生產全國多數毛巾，島波海道則載著自行車騎士跨過六座島嶼通往本州。","道後温泉は八世紀の『日本書紀』に名が見え、日本最古を称する。一八九四年の本館は国の重要文化財である。今治は国内タオルの大半を産し、しまなみ海道は六島を渡って本州へ自転車を通す。"],anch:[132.9,33.7],her:[],cas:[["Matsuyama Castle","松山城","松山城"],["Uwajima Castle","宇和島城","宇和島城"]],pk:[["Mount Ishizuchi","石鎚山","石鎚山",1982]]},
"39":{n:["Kōchi","高知縣","高知県"],cap:["Kōchi","高知","高知市"],reg:["Shikoku","四國","四国"],regid:"shikoku",pop:664000,pr:45,area:7103,ar:18,den:93.5,dr:44,big:["Kōchi","高知","高知市"],bigp:319000,fl:["Bayberry","楊梅","ヤマモモ"],hi:["Mount Miune",1894],prov:["Tosa"],nat:[["Shimanto River, the last clear stream","四萬十川，最後的清流","四万十川（最後の清流）"],["Cape Muroto","室戶岬","室戸岬"],["Cape Ashizuri","足摺岬","足摺岬"],["Niyodo River","仁淀川","仁淀川"]],food:[["Seared bonito","炙燒鰹魚","かつおのたたき"],["Yuzu, half the national crop","柚子，佔全國半數","ゆず（全国の約半分）"],["Sawachi platters","皿鉢料理","皿鉢料理"]],note:["Eighty-four percent forest, the highest share in Japan, and the wettest prefecture. Kōchi Castle is the only one in the country retaining both its original keep and its palace, and Sakamoto Ryōma, broker of the alliance that ended the shogunate, was a Tosa man.","森林覆蓋率八成四，全國最高，也是雨量最豐的縣。高知城是全國唯一同時保有原天守與本丸御殿者，促成薩長同盟終結幕府的坂本龍馬即出身土佐。","森林率八四％で全国最高、降水量も最多の県である。高知城は天守と本丸御殿の双方を残す唯一の城であり、薩長同盟を成立させ幕府を終わらせた坂本龍馬は土佐の人である。"],anch:[133.5,33.55],her:[],cas:[["Kōchi Castle","高知城","高知城"]],pk:[["Mount Tsurugi","劍山","剣山",1955],["Mount Miune","三嶺","三嶺",1894]]},
"40":{n:["Fukuoka","福岡縣","福岡県"],cap:["Fukuoka","福岡","福岡市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:5104000,pr:8,area:4988,ar:29,den:1023.3,dr:7,big:["Fukuoka","福岡","福岡市"],bigp:1637000,fl:["Plum blossom","梅花","ウメ"],hi:["Mount Shakadake",1231],prov:["Chikuzen","Chikugo","Buzen"],nat:[["Genkai Sea coast","玄界灘","玄界灘"],["Chikugo River","筑後川","筑後川"],["Hiraodai karst","平尾臺喀斯特","平尾台"]],food:[["Hakata tonkotsu rāmen","博多豚骨拉麵","博多とんこつラーメン"],["Mentaiko","明太子","明太子"],["Motsunabe","牛腸鍋","もつ鍋"]],note:["Kyūshū's gateway and, for most of recorded history, Japan's window on the continent; the Mongol invasion fleets landed at Hakata Bay in 1274 and 1281. Yawata's steelworks, opened in 1901, made the island the base of Japanese heavy industry.","九州的門戶，也是有史以來大半時間日本通往大陸的孔道；一二七四與一二八一年蒙古艦隊皆登陸博多灣。一九〇一年開爐的八幡製鐵所，使九州成為日本重工業的基地。","九州の玄関であり、記録に残る時代の大半において日本の対大陸の窓であった。一二七四年と一二八一年、蒙古の艦隊は博多湾に上陸した。一九〇一年操業の八幡製鉄所は、九州を重工業の拠点とした。"],anch:[130.65,33.55],her:[["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"],["Sacred Island of Okinoshima","神宿之島 宗像・沖之島","神宿る島 宗像・沖ノ島"]],cas:[],pk:[["Mount Shakadake","釋迦岳","釈迦岳",1231]]},
"41":{n:["Saga","佐賀縣","佐賀県"],cap:["Saga","佐賀","佐賀市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:795000,pr:42,area:2441,ar:42,den:325.7,dr:16,big:["Saga","佐賀","佐賀市"],bigp:228000,fl:["Camphor blossom","樟花","クスの花"],hi:["Mount Kyōgatake",1076],prov:["Hizen"],nat:[["Ariake Sea tidal flats","有明海潮灘","有明海の干潟"],["Yoshinogari site","吉野里遺址","吉野ヶ里遺跡"],["Mount Tara","多良岳","多良岳"]],food:[["Saga beef","佐賀牛","佐賀牛"],["Ariake nori","有明海苔","有明海の海苔"],["Arita and Imari porcelain","有田燒與伊萬里燒","有田焼・伊万里焼"]],note:["Arita has fired Japan's first and finest porcelain since 1616, when Korean potters found kaolin nearby, and the wares shipped from Imari reshaped European taste. Yoshinogari is the largest excavated Yayoi period settlement in the country.","自一六一六年朝鮮陶工在附近尋得瓷土起，有田便燒製全國最早也最精的瓷器，經伊萬里出口的作品重塑了歐洲品味。吉野里是全國發掘規模最大的彌生時代聚落。","一六一六年に朝鮮の陶工が近くで陶石を見出して以来、有田は国内最初かつ最良の磁器を焼いた。伊万里から積み出された品は欧州の趣味を変えた。吉野ヶ里は国内最大の弥生集落遺跡である。"],anch:[130.15,33.3],her:[["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"]],cas:[],pk:[["Mount Kyōgatake","經岳","経ヶ岳",1076]]},
"42":{n:["Nagasaki","長崎縣","長崎県"],cap:["Nagasaki","長崎","長崎市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:1262000,pr:30,area:4131,ar:37,den:305.5,dr:19,big:["Nagasaki","長崎","長崎市"],bigp:396000,fl:["Unzen azalea","雲仙杜鵑","ウンゼンツツジ"],hi:["Mount Unzen",1483],prov:["Hizen","Tsushima","Iki"],nat:[["Kujūkushima islands","九十九島","九十九島"],["Mount Unzen","雲仙岳","雲仙岳"],["Tsushima and Iki","對馬與壹岐","対馬・壱岐"],["Gotō Archipelago","五島列島","五島列島"]],food:[["Champon and sara-udon","什錦麵與皿烏龍麵","ちゃんぽん・皿うどん"],["Castella sponge cake","蜂蜜蛋糕","カステラ"],["Toruko rice","土耳其飯","トルコライス"]],note:["Japan's most fragmented prefecture, with 971 islands, the most of any, and the country's sole authorized channel to the outside world from 1641 to 1854 through the Dutch trading post on Dejima. The second atomic bomb fell here on 9 August 1945.","全國島嶼最零碎的縣，九百七十一座島為各縣之最；一六四一至一八五四年間，出島的荷蘭商館是國家唯一對外合法通口。第二枚原子彈於一九四五年八月九日落在此地。","島の数は九百七十一で全国最多、最も細かく分かれた県である。一六四一年から一八五四年まで、出島のオランダ商館が国唯一の公認の対外窓であった。第二の原子爆弾は一九四五年八月九日にここへ落ちた。"],anch:[129.9,32.9],her:[["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"],["Hidden Christian Sites in the Nagasaki Region","長崎與天草地方的潛伏基督徒相關遺產","長崎と天草地方の潜伏キリシタン関連遺産"]],cas:[],pk:[["Mount Unzen","雲仙岳","雲仙岳",1483]]},
"43":{n:["Kumamoto","熊本縣","熊本県"],cap:["Kumamoto","熊本","熊本市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:1703000,pr:23,area:7409,ar:15,den:229.9,dr:26,big:["Kumamoto","熊本","熊本市"],bigp:733000,fl:["Gentian","龍膽","リンドウ"],hi:["Mount Kunimi",1739],prov:["Higo"],nat:[["Mount Aso caldera","阿蘇火山口","阿蘇カルデラ"],["Amakusa Islands","天草諸島","天草諸島"],["Kuma River","球磨川","球磨川"],["Kikuchi Gorge","菊池溪谷","菊池渓谷"]],food:[["Basashi horse sashimi","馬肉刺身","馬刺し"],["Karashi renkon","芥末蓮藕","辛子蓮根"],["Kumamoto rāmen","熊本拉麵","熊本ラーメン"]],note:["Built around Aso's caldera, twenty-five kilometres across, with villages and rail lines inside the crater rim. Kumamoto Castle, raised by Katō Kiyomasa in 1607, is one of Japan's three great fortresses, and its stone walls are still under repair after the 2016 earthquakes.","圍繞直徑二十五公里的阿蘇火山口而成，火口原內仍有村落與鐵道。加藤清正一六〇七年所築的熊本城為日本三大名城之一，石垣自二〇一六年震災後仍在修復。","径二十五キロの阿蘇カルデラを軸に県土が広がり、火口原の内側にも集落と鉄道がある。一六〇七年に加藤清正が築いた熊本城は日本三名城の一つで、石垣は二〇一六年の地震以来なお修復中である。"],anch:[130.85,32.65],her:[["Hidden Christian Sites in the Nagasaki Region","長崎與天草地方的潛伏基督徒相關遺產","長崎と天草地方の潜伏キリシタン関連遺産"]],cas:[["Kumamoto Castle","熊本城","熊本城"]],pk:[["Mount Kunimi","國見岳","国見岳",1739],["Mount Aso, Taka-dake","阿蘇山（高岳）","阿蘇山（高岳）",1592]]},
"44":{n:["Ōita","大分縣","大分県"],cap:["Ōita","大分","大分市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:1096000,pr:34,area:6341,ar:22,den:172.8,dr:33,big:["Ōita","大分","大分市"],bigp:475000,fl:["Bungo plum","豐後梅","ブンゴウメ"],hi:["Mount Nakadake, Kujū",1791],prov:["Bungo","Buzen"],nat:[["Kujū Mountains","九重山","九重山"],["Beppu geothermal field","別府地熱區","別府の地熱地帯"],["Yabakei Gorge","耶馬溪","耶馬渓"],["Mount Tsurumi","鶴見岳","鶴見岳"]],food:[["Toriten chicken tempura","雞天","とり天"],["Seki mackerel","關竹筴魚","関さば"],["Kabosu citrus","香母酢","かぼす"]],note:["More hot spring water rises here than anywhere else in Japan, most of it at Beppu, where the eight Jigoku pools are viewed rather than entered. The stone Buddhas of Usuki, carved into cliffs from the twelfth century, are National Treasures.","溫泉湧出量為全國之最，大半集中於別府，其八處地獄僅供觀覽而不入浴。臼杵自十二世紀起雕於崖壁的石佛群為國寶。","湧出量は全国一で、その多くは別府に集まる。八つの地獄は入るのではなく観る湯である。十二世紀から崖に刻まれた臼杵の石仏群は国宝である。"],anch:[131.4,33.2],her:[["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"]],cas:[],pk:[["Mount Nakadake, Kujū","中岳（九重）","中岳（九重）",1791],["Mount Shakadake","釋迦岳","釈迦岳",1231]]},
"45":{n:["Miyazaki","宮崎縣","宮崎県"],cap:["Miyazaki","宮崎","宮崎市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:1041000,pr:35,area:7735,ar:14,den:134.6,dr:39,big:["Miyazaki","宮崎","宮崎市"],bigp:399000,fl:["Crinum","濱木綿","ハマユウ"],hi:["Mount Karakuni",1700],prov:["Hyūga"],nat:[["Takachiho Gorge","高千穗峽","高千穂峡"],["Kirishima Range","霧島山","霧島山"],["Nichinan coast","日南海岸","日南海岸"],["Aoshima","青島","青島"]],food:[["Miyazaki beef","宮崎牛","宮崎牛"],["Chicken nanban","南蠻炸雞","チキン南蛮"],["Mangoes","芒果","マンゴー"]],note:["The setting of Japan's founding myths: Takachiho is where Ninigi is said to have descended and where Amaterasu withdrew into the Ama-no-Iwato cave. Sunny and warm, the prefecture leads the country in cucumbers and broiler chickens.","日本開國神話的舞臺：相傳瓊瓊杵尊自高千穗降臨，天照大神亦隱於天巖戶。日照充足氣候溫暖，小黃瓜與肉雞產量居全國之首。","日本建国神話の舞台であり、高千穂は瓊瓊杵尊が降臨し、天照大神が天岩戸に隠れたと伝わる地である。日照に恵まれ温暖で、きゅうりとブロイラーの生産は全国一位である。"],anch:[131.3,32.15],her:[],cas:[],pk:[["Mount Kunimi","國見岳","国見岳",1739],["Mount Karakuni","韓國岳","韓国岳",1700]]},
"46":{n:["Kagoshima","鹿兒島縣","鹿児島県"],cap:["Kagoshima","鹿兒島","鹿児島市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:1547000,pr:24,area:9186,ar:10,den:168.4,dr:35,big:["Kagoshima","鹿兒島","鹿児島市"],bigp:589000,fl:["Kirishima azalea","霧島杜鵑","ミヤマキリシマ"],hi:["Mount Miyanoura",1936],prov:["Satsuma","Ōsumi","Ryūkyū"],nat:[["Sakurajima, in near constant eruption","櫻島，幾乎持續噴發","桜島（ほぼ常時噴火）"],["Yakushima cedar forest","屋久島杉林","屋久島の杉林"],["Kirishima Range","霧島山","霧島山"],["Amami Islands","奄美群島","奄美群島"]],food:[["Kurobuta pork","黑豬","黒豚"],["Shōchū from over a hundred distilleries","逾百家酒廠的燒酎","百を超える蔵の焼酎"],["Satsuma-age fish cake","薩摩炸魚餅","さつま揚げ"]],note:["Stretching six hundred kilometres from Sakurajima to the Amami group. As Satsuma the domain traded through the Ryūkyūs in defiance of seclusion, industrialized early at the Shūseikan works, and with Chōshū brought down the shogunate; Yakushima's cedars include specimens thousands of years old.","自櫻島延伸至奄美群島，南北六百公里。薩摩藩無視鎖國令而透過琉球通商，在集成館率先工業化，並與長州合力推倒幕府；屋久島的杉木中有樹齡數千年者。","桜島から奄美群島まで六百キロに及ぶ。薩摩藩は鎖国を顧みず琉球を通じて交易し、集成館で早くから工業化し、長州と結んで幕府を倒した。屋久島の杉には樹齢数千年のものがある。"],anch:[130.55,31.5],her:[["Yakushima","屋久島","屋久島"],["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産"],["Amami-Ōshima, Tokunoshima, Northern Okinawa and Iriomote","奄美大島、德之島、沖繩島北部與西表島","奄美大島、徳之島、沖縄島北部及び西表島"]],cas:[],pk:[["Mount Miyanoura","宮之浦岳","宮之浦岳",1936],["Mount Karakuni","韓國岳","韓国岳",1700],["Sakurajima","櫻島","桜島",1117],["Mount Kaimon","開聞岳","開聞岳",924]]},
"47":{n:["Okinawa","沖繩縣","沖縄県"],cap:["Naha","那霸","那覇市"],reg:["Kyūshū and Okinawa","九州・沖繩","九州・沖縄"],regid:"kyushu",pop:1468000,pr:25,area:2282,ar:44,den:643.3,dr:8,big:["Naha","那霸","那覇市"],bigp:317000,fl:["Deigo, Indian coral tree","刺桐","デイゴ"],hi:["Mount Omoto",526],prov:["Ryūkyū"],nat:[["Coral reefs","珊瑚礁","サンゴ礁"],["Yanbaru subtropical forest","山原亞熱帶林","やんばるの亜熱帯林"],["Iriomote mangroves","西表紅樹林","西表のマングローブ"],["Kerama Islands","慶良間群島","慶良間諸島"]],food:[["Gōya champurū","苦瓜什錦","ゴーヤーチャンプルー"],["Okinawa soba","沖繩麵","沖縄そば"],["Rafute braised pork","滷三層肉","ラフテー"]],note:["An independent kingdom trading across East Asia until Satsuma's invasion in 1609 and formal annexation in 1879. The battle of 1945 killed roughly a quarter of the civilian population, and the islands remained under American administration until 1972.","在一六〇九年薩摩入侵與一八七九年正式併入之前，是縱橫東亞的獨立王國。一九四五年的戰役使約四分之一的居民喪生，其後由美國治理直到一九七二年。","一六〇九年の薩摩侵攻と一八七九年の併合まで、東アジアに広く交易した独立王国であった。一九四五年の戦いで住民の約四分の一が亡くなり、一九七二年まで米国の統治下にあった。"],anch:[127.9,26.4],her:[["Gusuku Sites of the Kingdom of Ryukyu","琉球王國的城寨遺跡","琉球王国のグスク及び関連遺産群"],["Amami-Ōshima, Tokunoshima, Northern Okinawa and Iriomote","奄美大島、德之島、沖繩島北部與西表島","奄美大島、徳之島、沖縄島北部及び西表島"]],cas:[["Shuri Castle","首里城","首里城"]],pk:[["Mount Omoto","於茂登岳","於茂登岳",526]]}
};
const CODES=Object.keys(PR);
const PROV=[["Yamashiro","山城","山城","kinai","Kyoto","Heian-kyō, the capital from 794"],["Yamato","大和","大和","kinai","Nara","Heijō-kyō, the capital from 710"],["Kawachi","河內","河内","kinai","Osaka","Furuichi, tomb country of the early sovereigns"],["Izumi","和泉","和泉","kinai","Osaka","Sakai, the free merchant port"],["Settsu","攝津","摂津","kinai","Osaka, Hyōgo","Naniwa and the harbour of Hyōgo"],["Iga","伊賀","伊賀","tokaido","Mie","Ueno, one of the two ninjutsu heartlands"],["Ise","伊勢","伊勢","tokaido","Mie","Ise Jingū, shrine of Amaterasu"],["Shima","志摩","志摩","tokaido","Mie","Toba, pearl and ama diving coast"],["Owari","尾張","尾張","tokaido","Aichi","Kiyosu, then Nagoya; Nobunaga's base"],["Mikawa","三河","三河","tokaido","Aichi","Okazaki, birthplace of Tokugawa Ieyasu"],["Tōtōmi","遠江","遠江","tokaido","Shizuoka","Hamamatsu, on Lake Hamana"],["Suruga","駿河","駿河","tokaido","Shizuoka","Sunpu, where Ieyasu retired to rule"],["Izu","伊豆","伊豆","tokaido","Shizuoka, Tokyo","Mishima; a peninsula and the islands south of it"],["Kai","甲斐","甲斐","tokaido","Yamanashi","Kōfu, seat of Takeda Shingen"],["Sagami","相模","相模","tokaido","Kanagawa","Kamakura, seat of the first shogunate"],["Musashi","武藏","武蔵","tokaido","Tokyo, Saitama, Kanagawa","Fuchū, then Edo; the largest eastern province"],["Awa (Bōshū)","安房","安房","tokaido","Chiba","The warm tip of the Bōsō Peninsula"],["Kazusa","上總","上総","tokaido","Chiba","Ichihara, central Bōsō"],["Shimōsa","下總","下総","tokaido","Chiba, Ibaraki","Ichikawa and the Tone lowlands"],["Hitachi","常陸","常陸","tokaido","Ibaraki","Ishioka; subject of the earliest surviving fudoki"],["Ōmi","近江","近江","tosando","Shiga","Ōtsu, on Lake Biwa, briefly the capital"],["Mino","美濃","美濃","tosando","Gifu","Fuwa and Sekigahara, the hinge of the country"],["Hida","飛驒","飛騨","tosando","Gifu","Takayama, a timber and carpentry province"],["Shinano","信濃","信濃","tosando","Nagano","Zenkō-ji; the highest province"],["Kōzuke","上野","上野","tosando","Gunma","Maebashi; silk and horse pasture"],["Shimotsuke","下野","下野","tosando","Tochigi","Nikkō and the Ashikaga school"],["Mutsu","陸奧","陸奥","tosando","Aomori, Iwate, Miyagi, Fukushima","The far north; the largest province of all"],["Dewa","出羽","出羽","tosando","Yamagata, Akita","The Sea of Japan north; Dewa Sanzan"],["Wakasa","若狹","若狭","hokuriku","Fukui","Obama, the salt and mackerel road to Kyoto"],["Echizen","越前","越前","hokuriku","Fukui","Fukui; Eihei-ji and Echizen paper"],["Kaga","加賀","加賀","hokuriku","Ishikawa","Kanazawa, seat of the wealthy Maeda"],["Noto","能登","能登","hokuriku","Ishikawa","A peninsula of salt pans and lacquer"],["Etchū","越中","越中","hokuriku","Toyama","Takaoka; Tateyama and the Kurobe gorge"],["Echigo","越後","越後","hokuriku","Niigata","Kasugayama, Uesugi Kenshin's castle"],["Sado","佐渡","佐渡","hokuriku","Niigata","An island of gold mines and exiles"],["Tanba","丹波","丹波","sanindo","Kyoto, Hyōgo","Kameoka; the Hozu gorge to the capital"],["Tango","丹後","丹後","sanindo","Kyoto","Miyazu and Amanohashidate"],["Tajima","但馬","但馬","sanindo","Hyōgo","Izushi; Ikuno silver and Kinosaki springs"],["Inaba","因幡","因幡","sanindo","Tottori","Tottori and its dunes"],["Hōki","伯耆","伯耆","sanindo","Tottori","Kurayoshi, under Mount Daisen"],["Izumo","出雲","出雲","sanindo","Shimane","Izumo Taisha, where the gods convene"],["Iwami","石見","石見","sanindo","Shimane","Hamada; the Iwami Ginzan silver mine"],["Oki","隱岐","隠岐","sanindo","Shimane","Islands of exile for Emperor Go-Toba"],["Harima","播磨","播磨","sanyodo","Hyōgo","Himeji, the finest surviving fortress"],["Mimasaka","美作","美作","sanyodo","Okayama","Tsuyama, an inland province of iron sand"],["Bizen","備前","備前","sanyodo","Okayama","Okayama; Bizen ware and Osafune swords"],["Bitchū","備中","備中","sanyodo","Okayama","Takahashi, with the highest original keep"],["Bingo","備後","備後","sanyodo","Hiroshima","Fukuyama; tatami rush and Tomonoura"],["Aki","安藝","安芸","sanyodo","Hiroshima","Hiroshima and Itsukushima Shrine"],["Suō","周防","周防","sanyodo","Yamaguchi","Hōfu and Yamaguchi, the Ōuchi capital"],["Nagato","長門","長門","sanyodo","Yamaguchi","Hagi, from which the Meiji leaders came"],["Kii","紀伊","紀伊","nankaido","Wakayama, Mie","Wakayama; Kōyasan and the Kumano roads"],["Awaji","淡路","淡路","nankaido","Hyōgo","The first island born in the creation myth"],["Awa (Ashū)","阿波","阿波","nankaido","Tokushima","Tokushima; indigo dye and the Awa Odori"],["Sanuki","讚岐","讃岐","nankaido","Kagawa","Takamatsu; Konpira-san and salt flats"],["Iyo","伊予","伊予","nankaido","Ehime","Matsuyama and Dōgo Onsen"],["Tosa","土佐","土佐","nankaido","Kōchi","Kōchi; Sakamoto Ryōma's province"],["Chikuzen","筑前","筑前","saikaido","Fukuoka","Hakata, the continental gateway"],["Chikugo","筑後","筑後","saikaido","Fukuoka","Kurume, on the Chikugo River"],["Buzen","豐前","豊前","saikaido","Fukuoka, Ōita","Kokura and Nakatsu"],["Bungo","豐後","豊後","saikaido","Ōita","Funai; Ōtomo Sōrin's Christian domain"],["Hizen","肥前","肥前","saikaido","Saga, Nagasaki","Saga; Arita porcelain and Nagasaki"],["Higo","肥後","肥後","saikaido","Kumamoto","Kumamoto and the Aso caldera"],["Hyūga","日向","日向","saikaido","Miyazaki","Takachiho, cradle of the founding myths"],["Ōsumi","大隅","大隅","saikaido","Kagoshima","Kanoya; Sakurajima and Tanegashima"],["Satsuma","薩摩","薩摩","saikaido","Kagoshima","Kagoshima, the domain that ended the shogunate"],["Iki","壹岐","壱岐","saikaido","Nagasaki","An island stepping stone to Korea"],["Tsushima","對馬","対馬","saikaido","Nagasaki","The frontier island, closer to Busan than Fukuoka"],["Mutsu (1868)","陸奧","陸奥","later","Aomori","Reduced to the far north in the 1868 division"],["Rikuchū","陸中","陸中","later","Iwate, Akita","The Kitakami valley and the Sanriku coast"],["Rikuzen","陸前","陸前","later","Miyagi, Iwate","Sendai and Matsushima"],["Iwashiro","岩代","岩代","later","Fukushima","The Aizu and Nakadōri basins"],["Iwaki","磐城","磐城","later","Fukushima, Miyagi","The Hamadōri coast"],["Uzen","羽前","羽前","later","Yamagata","The Mogami basin"],["Ugo","羽後","羽後","later","Akita, Yamagata","Akita and the Oga Peninsula"],["Oshima","渡島","渡島","ezo","Hokkaidō","Hakodate; the only part settled before Meiji"],["Shiribeshi","後志","後志","ezo","Hokkaidō","Otaru and the Shakotan Peninsula"],["Iburi","膽振","胆振","ezo","Hokkaidō","Muroran and Lake Tōya"],["Ishikari","石狩","石狩","ezo","Hokkaidō","Sapporo and the Ishikari Plain"],["Teshio","天塩","天塩","ezo","Hokkaidō","Asahikawa and the Teshio River"],["Kitami","北見","北見","ezo","Hokkaidō","The Okhotsk coast"],["Hidaka","日高","日高","ezo","Hokkaidō","The Hidaka Range and horse country"],["Tokachi","十勝","十勝","ezo","Hokkaidō","Obihiro and the Tokachi Plain"],["Kushiro","釧路","釧路","ezo","Hokkaidō","Kushiro and its marsh"],["Nemuro","根室","根室","ezo","Hokkaidō","The eastern cape and Nosappu"],["Chishima","千島","千島","ezo","Hokkaidō","The Kuril chain; disputed since 1945"],["Ryūkyū","琉球","琉球","ryukyu","Okinawa, Kagoshima","Shuri; a kingdom trading across East Asia"]];
const CIRC=[["kinai","Kinai","畿內","畿内","The five home provinces around the capital"],["tokaido","Tōkaidō","東海道","東海道","The eastern sea road, fifteen provinces"],["tosando","Tōsandō","東山道","東山道","The eastern mountain road, eight provinces"],["hokuriku","Hokurikudō","北陸道","北陸道","The northern land road, seven provinces"],["sanindo","San'indō","山陰道","山陰道","The mountain shade road, eight provinces"],["sanyodo","San'yōdō","山陽道","山陽道","The mountain sunlight road, eight provinces"],["nankaido","Nankaidō","南海道","南海道","The southern sea road, six provinces"],["saikaido","Saikaidō","西海道","西海道","The western sea road, eleven provinces"],["later","Divisions of 1868","明治元年分國","明治元年分国","Mutsu and Dewa were cut into seven provinces in 1868"],["ezo","Hokkaidō provinces","北海道十一國","北海道十一国","Surveyed and named by the Kaitakushi in 1869"],["ryukyu","Ryūkyū","琉球","琉球","An independent kingdom, annexed in 1879"]];
const CANON=[["sankei","Matsushima","松島","松島",38.37,141.06,"Miyagi"],["sankei","Amanohashidate","天橋立","天橋立",35.57,135.19,"Kyoto"],["sankei","Miyajima, Itsukushima","宮島（嚴島）","宮島（厳島）",34.296,132.32,"Hiroshima"],["meien","Kenroku-en","兼六園","兼六園",36.562,136.662,"Ishikawa"],["meien","Kōraku-en","後樂園","後楽園",34.667,133.936,"Okayama"],["meien","Kairaku-en","偕樂園","偕楽園",36.373,140.452,"Ibaraki"],["meisen","Arima Onsen","有馬溫泉","有馬温泉",34.798,135.248,"Hyōgo"],["meisen","Kusatsu Onsen","草津溫泉","草津温泉",36.622,138.596,"Gunma"],["meisen","Gero Onsen","下呂溫泉","下呂温泉",35.807,137.244,"Gifu"],["reizan","Mount Fuji","富士山","富士山",35.361,138.727,"Shizuoka, Yamanashi"],["reizan","Mount Tate","立山","立山",36.577,137.618,"Toyama"],["reizan","Mount Haku","白山","白山",36.155,136.771,"Ishikawa, Gifu"],["kyuryu","Mogami River","最上川","最上川",38.9,139.84,"Yamagata"],["kyuryu","Fuji River","富士川","富士川",35.02,138.58,"Shizuoka"],["kyuryu","Kuma River","球磨川","球磨川",32.5,130.59,"Kumamoto"]];
const CANONSET=[["sankei","The Three Views of Japan","日本三景","日本三景","Named by the Confucian scholar Hayashi Gahō in 1643."],["meien","The Three Great Gardens","日本三名園","日本三名園","Daimyō strolling gardens, each attached to a castle town."],["meisen","The Three Famous Hot Springs","日本三名泉","日本三名泉","Ranked in a poem by Hayashi Razan in the early Edo period."],["reizan","The Three Holy Mountains","日本三靈山","日本三霊山","Objects of mountain worship long before they were climbed for sport."],["kyuryu","The Three Swiftest Rivers","日本三大急流","日本三大急流","Measured by gradient rather than length or volume."]];
const ERAS=[["jomon",["Jōmon","繩文","縄文"],-14000,-300,null,["Cord-marked pottery among the oldest anywhere, made by foragers settled enough to build villages and shell mounds.","繩紋陶器為世上最古老者之一，其主人雖以採集漁獵維生，卻已定居成村並堆起貝塚。","縄目文の土器は世界最古級であり、採集狩猟でありながら集落と貝塚を築くほど定住していた。"]],["yayoi",["Yayoi","彌生","弥生"],-300,250,null,["Wet rice agriculture, bronze and iron arrive from the continent; walled settlements and the first recorded polities.","水稻農耕與青銅、鐵器自大陸傳入，出現環濠聚落與最早見於記載的政權。","水稲農耕と青銅・鉄が大陸から伝わり、環濠集落と記録に残る最初の政体が現れる。"]],["kofun",["Kofun","古墳","古墳"],250,538,null,["Keyhole tomb mounds on a monumental scale mark the consolidation of the Yamato court.","巨大的前方後圓墳，標誌著大和朝廷的整合。","巨大な前方後円墳が、大和朝廷の統合を示す。"]],["asuka",["Asuka","飛鳥","飛鳥"],538,710,"Asuka",["Buddhism and Chinese statecraft arrive together; the Ritsuryō codes and the first grid capitals follow.","佛教與中國式治術一同傳入，繼之以律令法典與最早的方格制都城。","仏教と中国式の統治が同時に入り、律令と条坊制の都が続く。"]],["nara",["Nara","奈良","奈良"],710,794,"Heijō-kyō",["Heijō-kyō, the Ritsuryō state at its height, and the compilation of the Kojiki and the Nihon Shoki.","平城京，律令國家的鼎盛，《古事記》與《日本書紀》於此時編成。","平城京。律令国家の盛期であり、『古事記』『日本書紀』が編まれた。"]],["heian",["Heian","平安","平安"],794,1185,"Heian-kyō",["Four centuries of court culture, the kana scripts and the Tale of Genji, while provincial warrior houses gather strength.","四百年的宮廷文化，假名與《源氏物語》於焉而生，地方武家則在其間積蓄實力。","四百年の宮廷文化。仮名と『源氏物語』が生まれ、その陰で地方の武家が力を蓄える。"]],["kamakura",["Kamakura","鎌倉","鎌倉"],1185,1333,"Kamakura",["The first shogunate; Zen and Pure Land spread, and two Mongol invasion fleets are destroyed.","首個幕府成立，禪宗與淨土宗流布，兩度蒙古來襲的艦隊皆覆沒。","最初の幕府。禅と浄土の教えが広まり、二度の蒙古襲来の船団が失われる。"]],["nanbokucho",["Nanboku-chō","南北朝","南北朝"],1336,1392,null,["Two rival courts, the Northern in Kyoto and the Southern at Yoshino, contest the succession for fifty-six years.","北朝據京都、南朝據吉野，兩統相爭五十六年。","京都の北朝と吉野の南朝が五十六年にわたり皇統を争う。"]],["muromachi",["Muromachi","室町","室町"],1336,1573,"Muromachi, Kyoto",["Ashikaga rule brings Noh, tea and ink painting, then the Ōnin War opens a century of general civil war.","足利治世孕育能樂、茶道與水墨畫，應仁之亂繼起，開啟百年戰國。","足利の世に能・茶・水墨が育ち、応仁の乱を境に百年の戦国が始まる。"]],["momoyama",["Azuchi-Momoyama","安土桃山","安土桃山"],1573,1603,null,["Nobunaga and Hideyoshi unify the country by force; castle towns, gold leaf screens and the sword hunt.","織田信長與豐臣秀吉以武力統一天下，城下町、金碧障屏與刀狩令俱出於此時。","信長と秀吉が武力で天下を統一する。城下町、金碧障屏画、刀狩の時代である。"]],["edo",["Edo","江戶","江戸"],1603,1868,"Edo",["Two and a half centuries of Tokugawa peace under maritime restrictions, with a townsman culture and a population near thirty million.","德川治下二百六十餘年承平，海禁之中町人文化興盛，人口近三千萬。","徳川の下で二百六十余年の泰平が続く。海禁のもとで町人文化が栄え、人口は三千万に近づく。"]],["meiji",["Meiji","明治","明治"],1868,1912,"Tokyo",["Imperial restoration; domains give way to prefectures, and a constitutional and industrial state is built in a generation.","王政復古，廢藩置縣，一代人之間建成立憲與工業國家。","王政復古。廃藩置県により県が置かれ、一世代で立憲国家と産業国家が築かれる。"]],["taisho",["Taishō","大正","大正"],1912,1926,"Tokyo",["Party cabinets, mass politics and urban modernity, cut across by the Kantō earthquake of 1923.","政黨內閣、大眾政治與都市摩登，其間為一九二三年關東大地震所斷。","政党内閣と大衆政治、都市の近代。一九二三年の関東大震災がこれを断つ。"]],["showa",["Shōwa","昭和","昭和"],1926,1989,"Tokyo",["The longest reign in Japanese history: militarism, war and defeat, then the postwar constitution and rapid growth.","日本史上最長的一朝：軍國、戰爭與戰敗，繼以戰後憲法與高度成長。","日本史上最長の御代。軍国と戦争と敗戦、そして戦後憲法と高度成長。"]],["heisei",["Heisei","平成","平成"],1989,2019,"Tokyo",["The asset bubble collapses, the Kobe and Tōhoku disasters test the state, and the population begins to fall.","泡沫經濟崩解，阪神與東北兩場災變考驗國家，人口開始減少。","バブルが崩れ、阪神と東北の震災が国を試し、人口が減少に転じる。"]],["reiwa",["Reiwa","令和","令和"],2019,null,"Tokyo",["The first era name taken from a Japanese classic, the Man'yōshū, rather than from a Chinese one.","首個取自日本典籍《萬葉集》而非漢籍的年號。","漢籍ではなく日本の古典『万葉集』から採られた最初の元号。"]]];
const ERANOTE=["Dates follow the conventional periodisation taught in Japan. Boundaries are matters of scholarly convention rather than fact, and the three prehistoric periods are approximate by nature. The Nanboku-chō years fall inside the Muromachi span.","年代採日本通行的時代區分。分期界線屬學術慣例而非史實，三個史前時代的年代本即約略之數。南北朝的年份包含在室町之內。","年代は日本で通行する時代区分による。区切りは学術上の約束であって事実ではなく、先史三時代の年代はもとより概数である。南北朝の年数は室町の期間に含まれる。"];
const NATION=[["name",["Name in Japanese","日本語國號","日本語の国号"],["日本国 Nihon-koku, also read Nippon-koku","日本國（Nihon-koku，亦讀 Nippon-koku）","日本国（にほんこく／にっぽんこく）"]],["name",["Name in English","英文國名","英語国名"],["Japan. No long form is fixed in law","Japan。法律未定正式全稱","Japan。法律上の長形式は定めがない"]],["name",["Sense of the name","國號釋義","国号の意味"],["Origin of the sun, in use from the seventh century","日之所出，七世紀起使用","日の出づるところ。七世紀から用いられる"]],["state",["Form of government","政體","政体"],["Unitary parliamentary constitutional monarchy","單一制議會內閣制君主立憲","単一国家・議院内閣制の立憲君主国"]],["state",["Head of state","國家元首","国家元首"],["The Emperor Naruhito, acceded 1 May 2019","天皇德仁，二〇一九年五月一日即位","天皇徳仁、二〇一九年五月一日践祚"]],["state",["Era name","年號","元号"],["Reiwa 令和, from 1 May 2019","令和，自二〇一九年五月一日","令和、二〇一九年五月一日から"]],["state",["Head of government","政府首長","政府の長"],["Takaichi Sanae, 105th Prime Minister, designated 18 February 2026","高市早苗，第一〇五任內閣總理大臣，二〇二六年二月十八日指名","高市早苗、第百五代内閣総理大臣、二〇二六年二月十八日指名"]],["state",["Legislature","立法機關","立法府"],["National Diet: House of Representatives 465, House of Councillors 248","國會：眾議院四六五席、參議院二四八席","国会。衆議院四六五、参議院二四八"]],["state",["Constitution","憲法","憲法"],["Promulgated 3 November 1946, in force from 3 May 1947","一九四六年十一月三日公布，一九四七年五月三日施行","一九四六年十一月三日公布、一九四七年五月三日施行"]],["state",["National Foundation Day","建國紀念日","建国記念の日"],["11 February, commemorative; it marks the legendary accession of Jimmu in 660 BC recorded in the Nihon Shoki, not an attested event","二月十一日，屬紀念性質。所紀念者為《日本書紀》所載神武天皇於西元前六六〇年即位的傳說，並非可考史實","二月十一日。『日本書紀』が伝える神武天皇の紀元前六六〇年の即位に由来する記念日であり、史実として確認されたものではない"]],["state",["Capital","首都","首都"],["Tokyo Metropolis 東京都, by practice; no statute designates a capital","東京都，屬慣例。無法律明定首都","東京都。慣行によるもので、首都を定める法律はない"]],["state",["Largest municipality","最大市町村","最大の市町村"],["@LARGEST"]],["land",["Land area","國土面積","国土面積"],["@AREA"]],["land",["Population","人口","人口"],["@POP"]],["land",["Mean density","平均人口密度","平均人口密度"],["@DENS"]],["land",["First-tier divisions","一級行政區","一級行政区画"],["47 prefectures: 1 to, 1 dō, 2 fu, 43 ken","四十七都道府縣：一都、一道、二府、四十三縣","四十七都道府県。一都一道二府四十三県"]],["land",["Historic divisions","歷史行政區","歴史的行政区画"],["@PROV"]],["land",["Islands","島嶼","島嶼"],["14,125 counted in the 2023 national recount, up from 6,852 in 1987","二〇二三年重新清點為一四、一二五座，一九八七年舊值為六、八五二座","二〇二三年の再計上で一四、一二五島。一九八七年の旧値は六、八五二島"]],["land",["Coastline","海岸線","海岸線"],["About 29,750 km, one of the longest of any state","約二九、七五〇公里，為各國之最長者之一","約二九、七五〇キロ。世界有数の長さである"]],["land",["Highest point","最高點","最高地点"],["@PEAK"]],["land",["Longest river","最長河川","最長河川"],["@RIVER"]],["land",["Largest lake","最大湖泊","最大湖沼"],["@LAKE"]],["land",["Exclusive economic zone","專屬經濟海域","排他的経済水域"],["About 4.47 million km², sixth largest in the world","約四四七萬平方公里，世界第六","約四四七万平方キロ。世界第六位"]],["code",["Currency","貨幣","通貨"],["Yen 円, JPY, ¥","日圓（円），JPY，¥","円、JPY、¥"]],["code",["Time zone","時區","標準時"],["Japan Standard Time, UTC+9, no daylight saving","日本標準時，UTC+9，無日光節約時間","日本標準時、UTC+9。夏時刻は行わない"]],["code",["ISO 3166 codes","ISO 3166 代碼","ISO 3166 コード"],["JP · JPN · 392","JP · JPN · 392","JP · JPN · 392"]],["code",["Calling code","國際電話碼","国際電話番号"],["+81","+81","+81"]],["code",["Internet domain","網域","ドメイン"],[".jp",".jp",".jp"]],["code",["Traffic","行車方向","通行"],["Keeps left","靠左","左側通行"]]];
const NATASOF=["Office holders verified 5 August 2026.","公職資料查證日期：二〇二六年八月五日。","公職の情報は二〇二六年八月五日に確認。"];
const SYM=[["flag",["National flag","國旗","国旗"],["日章旗 Nisshōki, commonly 日の丸 Hinomaru","日章旗，俗稱日之丸","日章旗、通称日の丸"],["Proportion 2:3. The crimson disc is centred, with a diameter three fifths of the hoist. Fixed by the Act on National Flag and Anthem of 13 August 1999, which confirmed a design in use on merchant ships from 1870.","縱橫比二比三。紅色日章置於正中，直徑為旗高的五分之三。一九九九年八月十三日《國旗及國歌法》定制，該圖樣自一八七〇年即用於商船。","縦横比二対三。紅色の日章を中央に置き、直径は旗の縦の五分の三。一九九九年八月十三日の国旗及び国歌に関する法律により定められ、一八七〇年以来商船に用いられてきた意匠を追認した。"]],["kiku",["Imperial Seal","皇室紋章","皇室の紋章"],["菊花紋章 Kikukamonshō, the sixteen-petal chrysanthemum","菊花紋章，十六瓣八重表菊","菊花紋章、十六八重表菊"],["Sixteen petals in the front rank with a second rank showing between them. Adopted as the imperial crest by Emperor Go-Toba in the early thirteenth century and reserved to the imperial house from 1869. It appears on the Japanese passport.","前排十六瓣，後排自瓣間露出。後鳥羽天皇於十三世紀初採為皇室紋，一八六九年起專屬皇室，日本護照封面亦用之。","表十六弁の間から裏の弁がのぞく。十三世紀初頭に後鳥羽天皇が用い、一八六九年以降は皇室専用となった。旅券の表紙にも用いられる。"]],["kiri",["Government Seal","政府紋章","政府の紋章"],["五七桐 Go-Shichi no Kiri, the paulownia crest","五七桐，桐紋","五七桐"],["Three flower spikes bearing five, seven and five blossoms above three paulownia leaves. Granted by the court to warrior houses, used by Toyotomi Hideyoshi, and now the crest of the Cabinet and the Prime Minister's Office. The rendering here is schematic.","三支花穗依次為五、七、五朵，下承三片桐葉。原為朝廷賜予武家之紋，豐臣秀吉曾用，今為內閣與總理大臣官邸之紋章。此處為示意繪法。","五・七・五の花序を三本立て、下に桐の葉三枚を置く。朝廷から武家に下賜され、豊臣秀吉が用い、現在は内閣および総理大臣官邸の紋章である。ここでは略図として描いている。"]]];
const ANTHEM=[[["Title","曲名","曲名"],["君が代 Kimigayo","君之代（君が代）","君が代"]],[["Text","歌詞來源","歌詞の出典"],["A waka of the Heian period, recorded anonymously as poem 343 in the Kokin Wakashū, compiled about 905","平安時代和歌，見《古今和歌集》第三四三首，作者不詳，該集約成於九〇五年","平安期の和歌。約九〇五年成立の『古今和歌集』第三四三番に詠み人知らずとして載る"]],[["Length","長度","長さ"],["Thirty-two morae in five lines, the shortest national anthem in current use","五句三十二音，為現行各國國歌中最短者","五句三十二音。現行の国歌で最も短い"]],[["Sense","大意","大意"],["A wish that the sovereign's reign endure through the ages, until a pebble grows into a boulder covered in moss","祝願君主之世綿延萬代，直至細石長成生苔巨巖","君の治世が長く続き、細石が巌となって苔むすまでと願う"]],[["Melody","作曲","作曲"],["Hayashi Hiromori, court musician, 1880. An earlier setting by John William Fenton of 1869 was discarded as unsuited to the words","宮內省樂師林廣守，一八八〇年。一八六九年芬頓所作舊曲因不合詞意而廢","宮内省楽師・林広守、一八八〇年。一八六九年のフェントン作曲は詞に合わずに廃された"]],[["Harmonisation","和聲配置","和声"],["Franz Eckert, 1880, who set the melody in a Western four-part arrangement over its Japanese modal scale","埃克特，一八八〇年，於日本音階之上作西式四部和聲","フランツ・エッケルト、一八八〇年。日本旋法の上に西洋式四声を付した"]],[["First performance","首演","初演"],["3 November 1880, at the palace, for the Emperor Meiji's birthday","一八八〇年十一月三日，宮中，明治天皇天長節","一八八〇年十一月三日、宮中の天長節において"]],[["Legal status","法律地位","法的地位"],["Made the national anthem by the Act on National Flag and Anthem, 13 August 1999. It had served as the de facto anthem since the 1880s without statutory basis","一九九九年八月十三日《國旗及國歌法》定為國歌。此前自一八八〇年代起即為事實上的國歌，但無法律依據","一九九九年八月十三日の国旗及び国歌に関する法律により国歌と定められた。それ以前は一八八〇年代から法的根拠のない事実上の国歌であった"]],[["Reception","評價","評価"],["Its association with the pre-1945 state keeps it contested in Japanese public debate, particularly over its use in schools","因與一九四五年前的國家體制相連，其地位在日本國內仍具爭議，尤以校園使用為焦點","一九四五年以前の国家体制と結び付くため、とりわけ学校での取り扱いをめぐり国内で議論が続く"]]];
const ANTHEMNOTE=["A pebble growing into a mossy boulder is the conventional figure for great duration in classical Japanese verse. The poem circulated as a felicitation for several centuries before any melody was attached to it.","「細石長成生苔巨巖」是日本古典詩歌中表達悠久的固定意象。此詞在配曲之前，已作為祝頌之辭流傳數百年。","細石が苔むす巌となるという句は、古典和歌において長久を表す常套の見立てである。曲が付けられる以前から、賀の歌として数百年にわたり詠み継がれてきた。"];
const PEAKS=[["Mount Fuji","富士山","富士山",35.361,138.727,3776,["22","19"],2,["Highest point in Japan. Last erupted in 1707 and inscribed as a cultural property in 2013.","日本最高峰。最後一次噴發為一七〇七年，二〇一三年以文化遺產登錄。","日本最高峰。最後の噴火は一七〇七年、二〇一三年に文化遺産として登録された。"]],["Kita-dake","北岳","北岳",35.674,138.238,3193,["19"],0,["The second highest summit in Japan and the crown of the Southern Alps.","日本第二高峰，南阿爾卑斯的主峰。","日本第二の高峰であり、南アルプスの盟主である。"]],["Oku-hotaka-dake","奧穗高岳","奥穂高岳",36.289,137.648,3190,["20","21"],0,["The high point of the Northern Alps, reached from Kamikōchi.","北阿爾卑斯最高點，自上高地入山。","北アルプスの最高点で、上高地から登られる。"]],["Mount Aino","間之岳","間ノ岳",35.646,138.228,3190,["19","22"],0,null],["Mount Yari","槍岳","槍ヶ岳",36.342,137.647,3180,["20"],0,["The most recognizable silhouette in the Japanese Alps.","日本阿爾卑斯輪廓最鮮明的一峰。","日本アルプスで最も見分けやすい山容を持つ。"]],["Mount Ontake","御嶽山","御嶽山",35.893,137.48,3067,["20","21"],2,["Sacred to Ontake-kyō. The 2014 eruption killed sixty-three climbers.","御嶽教的聖山。二〇一四年噴發造成六十三名登山者死亡。","御嶽教の霊山。二〇一四年の噴火で登山者六十三人が亡くなった。"]],["Mount Norikura","乘鞍岳","乗鞍岳",36.106,137.554,3026,["20","21"],1,null],["Mount Tate","立山","立山",36.577,137.618,3015,["16"],0,["One of the Three Holy Mountains, a Shugendō centre since the eighth century.","日本三靈山之一，自八世紀即為修驗道重鎮。","日本三霊山の一つで、八世紀以来の修験道の霊地である。"]],["Kiso-Komagatake","木曾駒岳","木曽駒ヶ岳",35.789,137.804,2956,["20"],0,null],["Mount Hōō","鳳凰山","鳳凰山",35.706,138.313,2841,["19"],0,null],["Mount Yatsugatake","八岳（赤岳）","八ヶ岳（赤岳）",35.971,138.37,2899,["20","19"],1,null],["Mount Hakuba","白馬岳","白馬岳",36.758,137.759,2932,["20","16"],0,null],["Mount Haku","白山","白山",36.155,136.771,2702,["17","21"],1,["The third Holy Mountain, opened to pilgrims in 717.","三靈山之三，七一七年開山。","三霊山の一つで、七一七年に開山された。"]],["Mount Korenge","小蓮華山","小蓮華山",36.784,137.78,2766,["15","20"],0,null],["Mount Asama","淺間山","浅間山",36.406,138.523,2568,["10","20"],2,["One of the most active volcanoes in Japan. The 1783 eruption caused nationwide famine.","日本最活躍的火山之一，一七八三年噴發引發全國饑荒。","日本で最も活動的な火山の一つ。一七八三年の噴火は全国的な飢饉を招いた。"]],["Mount Nikkō-Shirane","日光白根山","日光白根山",36.798,139.377,2578,["10","09"],2,null],["Mount Nantai","男體山","男体山",36.765,139.491,2486,["09"],1,["The sacred cone standing over Lake Chūzenji at Nikkō.","聳立於日光中禪寺湖畔的聖峰。","日光中禅寺湖に臨む神体山である。"]],["Mount Sanpō","三寶山","三宝山",35.949,138.719,2483,["11","20"],0,null],["Mount Myōkō","妙高山","妙高山",36.892,138.113,2454,["15"],1,null],["Mount Hiuchigatake","燧岳","燧ヶ岳",36.955,139.286,2356,["07"],1,null],["Mount Asahi, Daisetsu","旭岳","旭岳",43.663,142.854,2291,["01"],2,["The high point of Hokkaidō, in the Daisetsuzan volcanic group.","北海道最高點，屬大雪山火山群。","北海道の最高点で、大雪山火山群に属する。"]],["Mount Chōkai","鳥海山","鳥海山",39.099,140.049,2236,["05","06"],2,["The Dewa Fuji, rising straight from the Sea of Japan coast.","出羽富士，自日本海岸直起。","出羽富士と呼ばれ、日本海岸から直に立ち上がる。"]],["Mount Echigo-Komagatake","越後駒岳","越後駒ヶ岳",37.108,139.098,2003,["15"],0,null],["Mount Tokachi","十勝岳","十勝岳",43.418,142.686,2077,["01"],2,null],["Mount Iwate","岩手山","岩手山",39.853,141.001,2038,["03"],2,["The Nanbu Fuji, standing alone over Morioka.","南部富士，獨聳於盛岡之上。","南部富士と呼ばれ、盛岡に独り立つ。"]],["Mount Kumotori","雲取山","雲取山",35.855,138.943,2017,["13","11","19"],0,null],["Mount Ishizuchi","石鎚山","石鎚山",33.767,133.114,1982,["38"],0,["The highest mountain in western Japan, climbed by chain ladders.","西日本最高峰，需攀鎖鍊上行。","西日本最高峰で、鎖場を伝って登る。"]],["Mount Gassan","月山","月山",38.549,140.027,1984,["06"],1,null],["Mount Tsurugi","劍山","剣山",33.855,134.093,1955,["36","39"],0,["The second highest peak in Shikoku and a Shugendō summit.","四國第二高峰，修驗道靈山。","四国第二の高峰で、修験道の霊山である。"]],["Mount Miyanoura","宮之浦岳","宮之浦岳",30.336,130.507,1936,["46"],0,["Highest point on Yakushima and in all of Kyūshū.","屋久島與九州全域的最高點。","屋久島および九州全域の最高点である。"]],["Hakkyō-ga-take","八經岳","八経ヶ岳",34.174,135.909,1915,["29"],0,["The high point of the Kii Peninsula, on the Ōmine pilgrimage ridge.","紀伊半島最高點，位於大峰修行稜線上。","紀伊半島の最高点で、大峰の修行稜線上にある。"]],["Mount Hayachine","早池峰山","早池峰山",39.556,141.489,1917,["03"],0,null],["Mount Yōtei","羊蹄山","羊蹄山",42.828,140.811,1898,["01"],1,["The Ezo Fuji, an almost perfect cone above Niseko.","蝦夷富士，聳於二世古上方的近乎完美錐體。","蝦夷富士と呼ばれ、ニセコに臨むほぼ完全な円錐である。"]],["Mount Zaō","蔵王山","蔵王山",38.144,140.44,1841,["06","04"],2,["The Okama crater lake, and the winter juhyō known as snow monsters.","御釜火口湖，冬季樹冰俗稱雪怪。","御釜の火口湖と、冬の樹氷で知られる。"]],["Mount Byōbu","屏風岳","屏風岳",38.081,140.469,1825,["04"],0,null],["Mount Bandai","磐梯山","磐梯山",37.601,140.075,1816,["07"],2,["The 1888 collapse killed 477 people and dammed the Urabandai lakes.","一八八八年山體崩塌造成四百七十七人死亡，並堰塞成裏磐梯湖沼群。","一八八八年の山体崩壊は四百七十七人の命を奪い、裏磐梯の湖沼群を生んだ。"]],["Mount Akagi","赤城山","赤城山",36.56,139.193,1828,["10"],1,null],["Mount Nakadake, Kujū","中岳（九重）","中岳（九重）",33.086,131.249,1791,["44"],2,["The highest summit on the Kyūshū mainland.","九州本島最高峰。","九州本土の最高峰である。"]],["Mount Kunimi","國見岳","国見岳",32.578,131.008,1739,["43","45"],0,null],["Mount Daisen","大山","大山",35.371,133.546,1729,["31"],1,["The highest peak in the Chūgoku region, called the Hōki Fuji.","中國地方最高峰，稱伯耆富士。","中国地方の最高峰で、伯耆富士と呼ばれる。"]],["Mount Rishiri","利尻山","利尻山",45.178,141.243,1721,["01"],1,["Rises straight from the sea on its own island.","自海面直起，獨佔一島。","海から直に立ち上がり、島全体を成す。"]],["Mount Karakuni","韓國岳","韓国岳",31.931,130.861,1700,["45","46"],2,["The highest of the Kirishima group; nearby Shinmoe-dake erupts often.","霧島山群最高峰，鄰近的新燃岳頻繁噴發。","霧島山群の最高峰で、隣の新燃岳はしばしば噴火する。"]],["Mount Hiru","蛭岳","蛭ヶ岳",35.472,139.135,1673,["14"],0,null],["Mount Yūbari","夕張岳","夕張岳",43.093,142.253,1668,["01"],0,null],["Mount Rausu","羅臼岳","羅臼岳",44.075,145.122,1661,["01"],1,null],["Mount Iwaki","岩木山","岩木山",40.656,140.303,1625,["02"],1,["The Tsugaru Fuji, rising alone above the apple orchards.","津輕富士，孤峰立於蘋果園之上。","津軽富士と呼ばれ、りんご畑の上に独り立つ。"]],["Mount Aso, Taka-dake","阿蘇山（高岳）","阿蘇山（高岳）",32.884,131.104,1592,["43"],2,["Sits inside a caldera twenty-five kilometres across that is still farmed.","位於直徑二十五公里、至今仍有農耕的火山口內。","径二十五キロのカルデラの内にあり、今も耕作が営まれる。"]],["Mount Hakkōda","八甲田山","八甲田山",40.659,140.881,1585,["02"],1,["Site of the 1902 army disaster in which 199 soldiers froze.","一九〇二年陸軍雪中行軍慘案發生地，一百九十九名士兵凍斃。","一九〇二年の雪中行軍遭難で百九十九人の兵が凍死した地である。"]],["Mount Shari","斜里岳","斜里岳",43.766,144.72,1547,["01"],1,null],["Mount Hyōno","氷之山","氷ノ山",35.36,134.51,1510,["28","31"],0,null],["Mount Unzen","雲仙岳","雲仙岳",32.761,130.299,1483,["42"],2,["The 1991 pyroclastic flow killed forty-three people, including three volcanologists.","一九九一年火山碎屑流造成四十三人死亡，其中三位為火山學者。","一九九一年の火砕流で四十三人が亡くなり、うち三人は火山学者であった。"]],["Mount Haruna","榛名山","榛名山",36.47,138.869,1449,["10"],1,null],["Mount Chausu","茶臼山","茶臼山",35.203,137.56,1415,["23","20"],0,null],["Mount Osorakan","恐羅漢山","恐羅漢山",34.641,132.086,1346,["32","34"],0,null],["Mount Ushiro","後山","後山",35.286,134.194,1345,["33","28"],0,null],["Mount Jakuchi","寂地山","寂地山",34.487,132.008,1337,["35"],0,null],["Mount Ibuki","伊吹山","伊吹山",35.418,136.406,1377,["25","21"],0,["Holds the world record snow depth for an inhabited site: 11.82 metres in 1927.","保有有人觀測地點的世界積雪紀錄：一九二七年十一點八二公尺。","有人観測地点の世界最深積雪記録、一九二七年の十一・八二メートルを持つ。"]],["Mount Gomadan","護摩壇山","護摩壇山",34.045,135.586,1372,["30"],0,null],["Mount Sannomine","三之峰","三ノ峰",36.078,136.762,2128,["18","21"],0,null],["Mount Kyōgatake","經岳","経ヶ岳",33.234,130.083,1076,["41"],0,null],["Mount Shakadake","釋迦岳","釈迦岳",33.226,130.87,1231,["40","44"],0,null],["Mount Kongō","金剛山","金剛山",34.419,135.673,1125,["27","29"],0,["Kusunoki Masashige's stronghold and the high point of Osaka Prefecture.","楠木正成的據點，也是大阪府最高點。","楠木正成の拠った山で、大阪府の最高点である。"]],["Mount Sanbe","三瓶山","三瓶山",35.143,132.622,1126,["32"],1,null],["Mount Ryūō","龍王山","竜王山",34.129,133.976,1060,["37","36"],0,null],["Mount Yamizo","八溝山","八溝山",36.887,140.311,1022,["08","07"],0,null],["Mount Minago","皆子山","皆子山",35.191,135.774,972,["26"],0,null],["Sakurajima","櫻島","桜島",31.585,130.657,1117,["46"],2,["Erupts hundreds of times a year and was joined to the mainland by the 1914 lava flow.","每年噴發數百次，一九一四年熔岩流使其與陸地相連。","年に数百回噴火し、一九一四年の溶岩流で陸と繋がった。"]],["Mount Kaimon","開聞岳","開聞岳",31.18,130.528,924,["46"],1,null],["Mount Usu","有珠山","有珠山",42.544,140.839,733,["01"],2,["Erupted four times in the twentieth century; Shōwa-shinzan grew beside it in 1944.","二十世紀噴發四次，昭和新山於一九四四年在其側隆起。","二十世紀に四度噴火し、一九四四年に昭和新山が隣に生じた。"]],["Mount Tsukuba","筑波山","筑波山",36.225,140.107,877,["08"],0,["Twin peaked and isolated on the Kantō plain, paired with Fuji in classical verse.","雙峰孤立於關東平原，古典詩歌中常與富士並提。","関東平野に双耳峰として孤立し、古歌では富士と対に詠まれた。"]],["Mount Hiei","比叡山","比叡山",35.072,135.834,848,["26","25"],0,["Enryaku-ji, founded 788, guards the capital's unlucky northeast quarter.","七八八年創建的延曆寺，鎮守都城東北鬼門。","七八八年開創の延暦寺が、都の鬼門を守る。"]],["Mount Kōya","高野山","高野山",34.213,135.583,1009,["30"],0,["Kūkai's monastic plateau, founded 816, the centre of Shingon Buddhism.","空海於八一六年開創的伽藍高原，真言宗總本山。","空海が八一六年に開いた山上の伽藍で、真言宗の総本山である。"]],["Mount Takao","高尾山","高尾山",35.625,139.244,599,["13"],0,["The most climbed mountain on earth, at roughly three million visitors a year.","全球登山人數最多的山，年約三百萬人次。","年間約三百万人が登る、世界で最も登られる山である。"]],["Mount Miune","三嶺","三嶺",33.836,133.976,1894,["39","36"],0,null],["Mount Ōdaigahara","大臺原山","大台ヶ原山",34.183,136.106,1695,["24","29"],0,null],["Mount Atago","愛宕山","愛宕山",35.239,140.098,408,["12"],0,null],["Mount Omoto","於茂登岳","於茂登岳",24.428,124.196,526,["47"],0,null]];
const LAKES=[["Lake Biwa","琵琶湖","琵琶湖",669.3,104,["25"]],["Lake Kasumigaura","霞浦","霞ヶ浦",168.2,12,["08"]],["Lake Saroma","佐呂間湖","サロマ湖",151.9,20,["01"]],["Lake Inawashiro","猪苗代湖","猪苗代湖",103.3,94,["07"]],["Lake Nakaumi","中海","中海",86.2,17,["32","31"]],["Lake Kussharo","屈斜路湖","屈斜路湖",79.5,117,["01"]],["Lake Shinji","宍道湖","宍道湖",79.2,6,["32"]],["Lake Shikotsu","支笏湖","支笏湖",78.4,363,["01"]],["Lake Tōya","洞爺湖","洞爺湖",70.7,180,["01"]],["Lake Hamana","濱名湖","浜名湖",64.9,16,["22"]],["Lake Ogawara","小川原湖","小川原湖",62,25,["02"]],["Lake Towada","十和田湖","十和田湖",61,327,["02","05"]],["Lake Notoro","能取湖","能取湖",58.4,21,["01"]],["Lake Kitaura","北浦","北浦",35.2,10,["08"]],["Lake Hachirōgata","八郎潟調整池","八郎潟調整池",27.7,12,["05"]],["Lake Tazawa","田澤湖","田沢湖",25.8,423,["05"]],["Lake Mashū","摩周湖","摩周湖",19.2,212,["01"]],["Lake Akan","阿寒湖","阿寒湖",13.3,45,["01"]],["Lake Suwa","諏訪湖","諏訪湖",13.3,7,["20"]],["Lake Chūzenji","中禪寺湖","中禅寺湖",11.6,163,["09"]],["Lake Ikeda","池田湖","池田湖",10.9,233,["46"]],["Lake Kutcharo","久種湖","クッチャロ湖",13,3,["01"]],["Lake Yamanaka","山中湖","山中湖",6.8,14,["19"]],["Lake Ashi","蘆之湖","芦ノ湖",6.9,44,["14"]],["Lake Kawaguchi","河口湖","河口湖",5.5,15,["19"]],["Lake Kuttara","俱多樂湖","倶多楽湖",4.7,148,["01"]],["Lake Yogo","餘吳湖","余呉湖",1.8,13,["25"]],["Lake Biwa's Nishinoko","西之湖","西の湖",2.2,3,["25"]],["Lake Saiko","西湖","西湖",2.1,72,["19"]],["Lake Motosu","本栖湖","本栖湖",4.7,122,["19"]]];
const RIVERS=[["Shinano River","信濃川","信濃川",367,11900,"15"],["Tone River","利根川","利根川",322,16840,"12"],["Ishikari River","石狩川","石狩川",268,14330,"01"],["Teshio River","天塩川","天塩川",256,5590,"01"],["Kitakami River","北上川","北上川",249,10150,"04"],["Kiso River","木曾川","木曽川",229,9100,"23"],["Mogami River","最上川","最上川",229,7040,"06"],["Tenryū River","天龍川","天竜川",213,5090,"22"],["Agano River","阿賀野川","阿賀野川",210,7710,"15"],["Shimanto River","四萬十川","四万十川",196,2270,"39"],["Yoshino River","吉野川","吉野川",194,3750,"36"],["Chikugo River","筑後川","筑後川",143,2860,"41"],["Yodo River","淀川","淀川",75,8240,"27"],["Arakawa River","荒川","荒川",173,2940,"13"],["Ōi River","大井川","大井川",168,1280,"22"],["Kuma River","球磨川","球磨川",115,1880,"43"],["Fuji River","富士川","富士川",128,3990,"22"],["Ōta River","太田川","太田川",103,1710,"34"]];
const HER=[["Buddhist Monuments in the Hōryū-ji Area","法隆寺地域的佛教建築","法隆寺地域の仏教建造物",1993,0,["29"],["The oldest surviving wooden buildings in the world, from about the year 700.","世上現存最古的木造建築，約成於七〇〇年。","世界最古の現存木造建築で、七〇〇年前後のものである。"]],["Himeji-jō","姬路城","姫路城",1993,0,["28"],["The White Heron Castle: never besieged, never burnt, never rebuilt.","白鷺城：未經圍攻、未曾焚毀、未經重建。","白鷺城。攻められず、焼けず、建て替えられなかった城である。"]],["Yakushima","屋久島","屋久島",1993,1,["46"],["Cedar forest holding trees believed to be thousands of years old.","杉林中有樹齡達數千年的巨木。","樹齢数千年と見られる杉を抱く森である。"]],["Shirakami-Sanchi","白神山地","白神山地",1993,1,["02","05"],["The largest untouched Siebold's beech forest left in East Asia.","東亞現存最大的原始山毛櫸林。","東アジアに残る最大の原生ブナ林である。"]],["Historic Monuments of Ancient Kyoto","古都京都的文化財","古都京都の文化財",1994,0,["26","25"],["Seventeen temples, shrines and one castle, across three cities.","十七處寺社與一座城郭，分布於三市。","十七件の寺社と城が三市にわたる。"]],["Historic Villages of Shirakawa-gō and Gokayama","白川鄉與五箇山的合掌造聚落","白川郷・五箇山の合掌造集落",1995,0,["21","16"],["Gasshō-zukuri farmhouses roofed at sixty degrees against heavy snow.","合掌造農舍屋頂傾斜六十度以抗重雪。","合掌造の民家は六十度の急勾配で豪雪に備える。"]],["Hiroshima Peace Memorial, Genbaku Dome","廣島和平紀念碑（原爆圓頂）","広島平和記念碑（原爆ドーム）",1996,0,["34"],["Left standing exactly as it was after 6 August 1945.","維持一九四五年八月六日後的原狀。","一九四五年八月六日のままの姿で残されている。"]],["Itsukushima Shinto Shrine","嚴島神社","厳島神社",1996,0,["34"],["Built out over the tide on Miyajima; its torii is a national emblem.","建於宮島潮水之上，大鳥居為國家象徵。","宮島の潮上に建ち、その大鳥居は国の象徴である。"]],["Historic Monuments of Ancient Nara","古都奈良的文化財","古都奈良の文化財",1998,0,["29"],["Tōdai-ji, Kōfuku-ji, Kasuga Taisha and the Heijō palace site.","東大寺、興福寺、春日大社與平城宮遺址。","東大寺、興福寺、春日大社、平城宮跡などが含まれる。"]],["Shrines and Temples of Nikkō","日光的社寺","日光の社寺",1999,0,["09"],["Tōshō-gū, where Tokugawa Ieyasu is enshrined, and its cedar avenue.","祀奉德川家康的東照宮及其杉並木參道。","徳川家康を祀る東照宮と杉並木の参道である。"]],["Gusuku Sites of the Kingdom of Ryukyu","琉球王國的城寨遺跡","琉球王国のグスク及び関連遺産群",2000,0,["47"],["Shuri Castle and eight related sites of the independent kingdom.","首里城與獨立王國的其他八處相關遺產。","首里城と、独立王国に関わる八件の遺産である。"]],["Sacred Sites and Pilgrimage Routes in the Kii Mountain Range","紀伊山地的靈場與參詣道","紀伊山地の霊場と参詣道",2004,0,["30","29","24"],["Kumano, Kōyasan, Yoshino and the pilgrim roads that link them.","熊野、高野山、吉野及串連三者的朝聖道。","熊野、高野山、吉野と、それらを結ぶ参詣道である。"]],["Shiretoko","知床","知床",2005,1,["01"],["Where drift ice reaches its southern limit; brown bears and Blakiston's fish owl.","流冰南界所在，棲有棕熊與毛腿魚鴞。","流氷の南限であり、ヒグマとシマフクロウが棲む。"]],["Iwami Ginzan Silver Mine","石見銀山","石見銀山",2007,0,["32"],["Supplied a large share of the world's silver in the sixteenth century.","十六世紀供應了世界白銀的可觀份額。","十六世紀の世界の銀産の一角を担った。"]],["Hiraizumi","平泉","平泉",2011,0,["03"],["The Northern Fujiwara's Pure Land capital; Chūson-ji's Golden Hall survives.","奧州藤原氏的淨土都城，中尊寺金色堂至今尚存。","奥州藤原氏の浄土の都であり、中尊寺金色堂が残る。"]],["Ogasawara Islands","小笠原群島","小笠原諸島",2011,1,["13"],["Never joined to any continent, and called the Galápagos of the Orient.","從未與大陸相連，號稱東洋的加拉巴哥。","一度も大陸と繋がらず、東洋のガラパゴスと呼ばれる。"]],["Fujisan","富士山","富士山",2013,0,["22","19"],["Inscribed as a cultural site: an object of worship and a wellspring of art.","以文化遺產登錄：信仰的對象與藝術的泉源。","文化遺産として登録された。信仰の対象であり芸術の源泉である。"]],["Tomioka Silk Mill","富岡製絲廠","富岡製糸場",2014,0,["10"],["Opened in 1872 with French machinery; the engine of Meiji export growth.","一八七二年引進法國機械開設，明治出口成長的引擎。","一八七二年にフランス製機械で操業し、明治の輸出成長を牽引した。"]],["Sites of Japan's Meiji Industrial Revolution","明治日本的產業革命遺產","明治日本の産業革命遺産",2015,0,["42","41","40","35","46","44","28","33"],["Twenty-three components including Hashima Island and the Yawata works.","二十三處構成資產，含端島與八幡製鐵所。","端島や八幡製鉄所を含む二十三の構成資産からなる。"]],["National Museum of Western Art","國立西洋美術館","国立西洋美術館",2016,0,["13"],["Le Corbusier's only building in Japan, part of a transnational inscription.","柯比意在日本唯一的作品，屬跨國登錄的一部分。","ル・コルビュジエの日本唯一の作品で、国境を越えた登録の一部である。"]],["Sacred Island of Okinoshima","神宿之島 宗像・沖之島","神宿る島 宗像・沖ノ島",2017,0,["40"],["A ritual site since the fourth century; women are still barred from landing.","自四世紀起的祭祀之地，至今仍禁女性登島。","四世紀以来の祭祀の地であり、今も女性の上陸は許されない。"]],["Hidden Christian Sites in the Nagasaki Region","長崎與天草地方的潛伏基督徒相關遺產","長崎と天草地方の潜伏キリシタン関連遺産",2018,0,["42","43"],["Villages that kept the faith through two centuries of prohibition.","在兩百年禁教期間守住信仰的村落。","二百年の禁教を通じて信仰を守った集落である。"]],["Mozu-Furuichi Kofun Group","百舌鳥・古市古墳群","百舌鳥・古市古墳群",2019,0,["27"],["Keyhole tombs of the fourth to sixth centuries; Daisen Kofun is the largest.","四至六世紀的前方後圓墳群，大仙陵古墳為最大者。","四世紀から六世紀の前方後円墳群で、大仙陵古墳が最大である。"]],["Amami-Ōshima, Tokunoshima, Northern Okinawa and Iriomote","奄美大島、德之島、沖繩島北部與西表島","奄美大島、徳之島、沖縄島北部及び西表島",2021,1,["46","47"],["Subtropical forests holding the Amami rabbit and the Iriomote cat.","亞熱帶林中棲有奄美短耳兔與西表山貓。","アマミノクロウサギとイリオモテヤマネコが棲む亜熱帯の森である。"]],["Jōmon Prehistoric Sites in Northern Japan","北海道與北東北的繩文遺跡群","北海道・北東北の縄文遺跡群",2021,0,["01","02","03","05"],["Seventeen sites including Sannai-Maruyama, from a sedentary culture of ten millennia.","十七處遺址，含三內丸山，來自延續一萬年的定居文化。","三内丸山を含む十七の遺跡で、一万年続いた定住文化のものである。"]],["Sado Island Gold Mines","佐渡島的金山","佐渡島の金山",2024,0,["15"],["Worked from 1601, the shogunate's richest source of gold and silver.","自一六〇一年開採，幕府金銀產量最豐之地。","一六〇一年から採掘され、幕府最大の金銀の産地であった。"]]];
const CAS=[["Himeji Castle","姬路城","姫路城","28",0,["The largest and best preserved fortress in Japan, completed in 1609.","日本規模最大、保存最佳的城郭，一六〇九年竣工。","日本最大かつ最良の現存城郭で、一六〇九年に完成した。"]],["Matsumoto Castle","松本城","松本城","20",0,["The Crow Castle, a black keep of about 1594 standing on open ground.","烏城，約一五九四年的黑色天守，立於平地。","烏城。一五九四年頃の黒い天守が平地に立つ。"]],["Hikone Castle","彥根城","彦根城","25",0,["Built in 1622 from timbers salvaged from neighbouring castles.","一六二二年以鄰近諸城拆下的木材建成。","一六二二年、近隣の城から移した部材で建てられた。"]],["Inuyama Castle","犬山城","犬山城","23",0,["Perched above the Kiso River, among the oldest keeps standing.","俯瞰木曾川，現存最古的天守之一。","木曽川を見下ろし、現存最古級の天守である。"]],["Matsue Castle","松江城","松江城","32",0,["Completed in 1611, the only surviving keep in the San'in region.","一六一一年竣工，山陰地方唯一現存天守。","一六一一年完成、山陰に残る唯一の天守である。"]],["Hirosaki Castle","弘前城","弘前城","02",1,["A three storey keep of 1611, ringed by 2,600 cherry trees.","一六一一年的三層天守，周圍植櫻二千六百株。","一六一一年の三層の天守で、周囲に桜二千六百本を巡らす。"]],["Maruoka Castle","丸岡城","丸岡城","18",1,["A plain archaic keep, long claimed as the oldest in the country.","樣式古樸的天守，長年被稱為全國最古。","素朴で古式の天守であり、長く国内最古と称されてきた。"]],["Bitchū Matsuyama Castle","備中松山城","備中松山城","33",1,["At 430 metres, the highest original keep, often seen above a sea of cloud.","海拔四百三十公尺，現存最高的天守，常浮於雲海之上。","標高四百三十メートル、現存最高所の天守で、雲海に浮かぶ姿で知られる。"]],["Marugame Castle","丸龜城","丸亀城","37",1,["Its stone walls rise sixty metres, the tallest of any castle in Japan.","石垣高達六十公尺，為全國城郭之最。","石垣は六十メートルに達し、国内の城で最も高い。"]],["Matsuyama Castle","松山城","松山城","38",1,["A hilltop complex of twenty-one protected structures above the city.","山頂建築群，計二十一棟受保護建物俯瞰市區。","山頂に二十一棟の重要文化財が並び、市街を見下ろす。"]],["Uwajima Castle","宇和島城","宇和島城","38",1,["A small keep of 1666 on a hill once surrounded by the sea.","一六六六年的小型天守，山丘原為海所環。","一六六六年の小天守で、丘はかつて海に囲まれていた。"]],["Kōchi Castle","高知城","高知城","39",1,["The only castle in Japan retaining both its original keep and its palace.","全國唯一同時保有原天守與御殿的城。","天守と御殿の双方を残す唯一の城である。"]],["Kumamoto Castle","熊本城","熊本城","43",2,["Katō Kiyomasa's fortress of 1607; the walls are still under repair after 2016.","加藤清正一六〇七年所築，石垣自二〇一六年後仍在修復。","一六〇七年に加藤清正が築いた城で、石垣は二〇一六年以降なお修復中である。"]],["Osaka Castle","大阪城","大阪城","27",2,["Hideyoshi's seat, rebuilt in concrete in 1931 on the original stonework.","秀吉的居城，一九三一年於原石垣上以混凝土重建。","秀吉の城で、一九三一年に旧石垣の上に鉄筋で再建された。"]],["Nagoya Castle","名古屋城","名古屋城","23",2,["Burnt in 1945; the Honmaru Palace has since been rebuilt in timber.","一九四五年焚毀，本丸御殿其後以木造復原。","一九四五年に焼失し、本丸御殿はその後木造で復元された。"]],["Nijō Castle","二條城","二条城","26",1,["The shogunate's Kyoto residence, where power was returned to the Emperor in 1867.","幕府在京都的居館，一八六七年大政奉還於此。","幕府の京の館であり、一八六七年の大政奉還の地である。"]],["Aizu-Wakamatsu Castle","會津若松城","会津若松城","07",2,["Tsuruga-jō, which held out for a month in the Boshin War of 1868.","鶴城，一八六八年戊辰戰爭中固守一月。","鶴ヶ城。一八六八年の戊辰戦争で一箇月籠城した。"]],["Shuri Castle","首里城","首里城","47",2,["Seat of the Ryūkyū kings; the main hall burnt in 2019 and is being rebuilt.","琉球國王的宮城，正殿於二〇一九年焚毀，現正復原。","琉球国王の居城。正殿は二〇一九年に焼失し、復元が進む。"]]];
const PARKS=[["Rishiri-Rebun-Sarobetsu","利尻禮文佐呂間","利尻礼文サロベツ",1974,null],["Shiretoko","知床","知床",1964,null],["Akan-Mashū","阿寒摩周","阿寒摩周",1934,null],["Kushiroshitsugen","釧路濕原","釧路湿原",1987,["Japan's largest marsh and the refuge of the red-crowned crane.","日本最大濕原，丹頂鶴的棲地。","日本最大の湿原で、タンチョウの生息地である。"]],["Daisetsuzan","大雪山","大雪山",1934,["The largest national park in Japan, called the roof of Hokkaidō.","日本最大的國立公園，稱北海道的屋脊。","日本最大の国立公園で、北海道の屋根と呼ばれる。"]],["Shikotsu-Tōya","支笏洞爺","支笏洞爺",1949,null],["Hidaka-sanmyaku Erimo-Tokachi","日高山脈襟裳十勝","日高山脈襟裳十勝",2024,["Japan's newest national park: an unbroken alpine spine ending at Cape Erimo.","日本最新的國立公園，山脊不斷延伸至襟裳岬。","日本最新の国立公園で、襟裳岬まで途切れぬ山稜が続く。"]],["Towada-Hachimantai","十和田八幡平","十和田八幡平",1936,null],["Sanriku Fukkō","三陸復興","三陸復興",2013,["A reconstruction park along the ria coast struck in 2011.","沿二〇一一年受災的溺灣海岸設立的復興公園。","二〇一一年に被災したリアス海岸に沿う復興の公園である。"]],["Bandai-Asahi","磐梯朝日","磐梯朝日",1950,null],["Nikkō","日光","日光",1934,null],["Oze","尾瀨","尾瀬",2007,null],["Chichibu-Tama-Kai","秩父多摩甲斐","秩父多摩甲斐",1950,null],["Ogasawara","小笠原","小笠原",1972,null],["Fuji-Hakone-Izu","富士箱根伊豆","富士箱根伊豆",1936,["Fuji, the Five Lakes, Hakone, the Izu Peninsula and the Izu Islands.","富士山、富士五湖、箱根、伊豆半島與伊豆諸島。","富士山、五湖、箱根、伊豆半島、伊豆諸島を含む。"]],["Jōshin'etsu-kōgen","上信越高原","上信越高原",1949,null],["Myōkō-Togakushi Renzan","妙高戶隱連山","妙高戸隠連山",2015,null],["Chūbu-Sangaku","中部山岳","中部山岳",1934,["The Northern Alps: Kamikōchi, Yari, Hotaka and Tateyama.","北阿爾卑斯：上高地、槍岳、穗高與立山。","北アルプス。上高地、槍ヶ岳、穂高、立山を含む。"]],["Minami Alps","南阿爾卑斯","南アルプス",1964,["The Southern Alps: Kita-dake, Aino and Akaishi, a wall of three thousand metre peaks.","南阿爾卑斯：北岳、間之岳與赤石岳，三千公尺級的山牆。","南アルプス。北岳・間ノ岳・赤石岳が連なる三千メートル級の壁である。"]],["Hakusan","白山","白山",1962,null],["Ise-Shima","伊勢志摩","伊勢志摩",1946,null],["Yoshino-Kumano","吉野熊野","吉野熊野",1936,null],["San'in Kaigan","山陰海岸","山陰海岸",1963,null],["Setonaikai","瀨戶內海","瀬戸内海",1934,["The Inland Sea and its several thousand islands, among the first parks designated.","瀨戶內海及數千座島嶼，最早指定的國立公園之一。","瀬戸内海と数千の島々からなり、最初に指定された公園の一つである。"]],["Daisen-Oki","大山隱岐","大山隠岐",1936,null],["Ashizuri-Uwakai","足摺宇和海","足摺宇和海",1972,null],["Saikai","西海","西海",1955,null],["Unzen-Amakusa","雲仙天草","雲仙天草",1934,["Japan's first national park, with Unzen's lava dome and the Amakusa islands.","日本首座國立公園，含雲仙熔岩穹丘與天草諸島。","日本最初の国立公園で、雲仙の溶岩円頂丘と天草の島々を含む。"]],["Aso-Kujū","阿蘇九重","阿蘇くじゅう",1934,null],["Kirishima-Kinkōwan","霧島錦江灣","霧島錦江湾",1934,null],["Yakushima","屋久島","屋久島",2012,null],["Amami Guntō","奄美群島","奄美群島",2017,null],["Yanbaru","山原","やんばる",2016,["The northern Okinawan forest, home of the flightless Okinawa rail.","沖繩北部林地，不會飛的山原水雞棲地。","沖縄島北部の森で、飛べないヤンバルクイナが棲む。"]],["Keramashotō","慶良間諸島","慶良間諸島",2014,null],["Iriomote-Ishigaki","西表石垣","西表石垣",1972,null]];
const CAPS=[["Asuka","飛鳥京","飛鳥京",592,694,0,"29",["The court moved within the Asuka basin with almost every reign until a fixed grid capital was tried.","在採用方格制固定都城之前，朝廷幾乎每代都在飛鳥盆地內遷移。","条坊制の固定した都が試みられるまで、朝廷はほぼ代替わりごとに飛鳥の地を移った。"]],["Naniwa-kyō","難波京","難波京",645,655,0,"27",["A short lived capital on Osaka Bay, revived briefly in 744.","面向大阪灣的短命都城，七四四年曾短暫復用。","大阪湾に臨む短命の都であり、七四四年に一時復活した。"]],["Ōtsu-kyō","大津京","大津京",667,672,0,"25",["Tenji's capital on Lake Biwa, abandoned after the Jinshin War.","天智天皇在琵琶湖畔的都城，壬申之亂後廢棄。","天智天皇が琵琶湖畔に置いた都で、壬申の乱の後に廃された。"]],["Fujiwara-kyō","藤原京","藤原京",694,710,0,"29",["The first capital laid out on the Chinese grid, and the first to outlast a single reign.","首座依中國方格制營建的都城，也是首座延續超過一代的都城。","唐の条坊制に倣った最初の都であり、一代を越えて用いられた最初の都でもある。"]],["Heijō-kyō","平城京","平城京",710,784,0,"29",["Nara. The court's first long settled capital, and the high point of continental influence.","即奈良。朝廷首座長期定居的都城，也是大陸影響的頂點。","奈良。朝廷が長く落ち着いた最初の都であり、大陸文化の影響が最も濃い時期であった。"]],["Kuni-kyō","恭仁京","恭仁京",740,744,0,"26",["An abrupt removal from Nara during rebellion and epidemic, abandoned within four years.","因叛亂與疫病而倉促自奈良遷出，四年內即廢。","乱と疫病のなかで急に奈良を離れて置かれたが、四年で廃された。"]],["Nagaoka-kyō","長岡京","長岡京",784,794,0,"26",["Ten years between Nara and Kyoto, cut short by flooding and ill omen.","介於奈良與京都之間的十年，因水患與凶兆而中斷。","奈良と京都の間の十年であり、水害と不吉の兆により打ち切られた。"]],["Heian-kyō","平安京","平安京",794,1868,0,"26",["Kyoto held the imperial seat for one thousand and seventy four years.","京都作為皇居所在，歷一千零七十四年。","京都は千七十四年にわたり皇居の地であった。"]],["Kamakura","鎌倉","鎌倉",1185,1333,1,"14",["The first warrior government, deliberately placed far from the court.","首個武家政權，刻意遠離朝廷所在。","最初の武家政権であり、意図して朝廷から遠く離れて置かれた。"]],["Muromachi, Kyoto","室町（京都）","室町（京都）",1336,1573,1,"26",["The Ashikaga ruled from within the capital itself, which blurred court and camp.","足利氏在都城之內執政，朝廷與武家的界線因而模糊。","足利氏は都の内から政を行い、朝廷と武家の境は曖昧になった。"]],["Edo","江戶","江戸",1603,1868,1,"13",["The Tokugawa seat, probably the largest city on earth by 1720.","德川政權所在，一七二〇年前後可能已是世上最大城市。","徳川の座であり、一七二〇年頃には世界最大の都市であったと見られる。"]],["Tokyo","東京","東京",1868,0,0,"13",["The Emperor moved into the shogun's castle, and Edo was renamed the eastern capital.","天皇移入將軍的城郭，江戶因而改名為東京。","天皇が将軍の城に入り、江戸は東京と改められた。"]]];
const RANGES=[["Kitami Mountains","北見山地","北見山地",1560],["Teshio Mountains","天塩山地","天塩山地",1519],["Shokanbetsu Range","暑寒別山地","暑寒別岳",1492],["Daisetsu Volcanic Group","大雪山","大雪山",2291],["Tokachi Range","十勝岳連峰","十勝岳連峰",2077],["Yūbari Mountains","夕張山地","夕張山地",1668],["Hidaka Range","日高山脈","日高山脈",2053],["Shiretoko Range","知床連山","知床連山",1661],["Akan and Kussharo","阿寒・屈斜路","阿寒・屈斜路",1499],["Niseko and Yōtei","二世古・羊蹄","ニセコ・羊蹄",1898],["Oshima Highland","渡島山地","渡島山地",1072],["Ōu Mountains","奧羽山脈","奥羽山脈",2038],["Kitakami Highland","北上高地","北上高地",1917],["Dewa Mountains","出羽山地","出羽山地",1984],["Mount Chōkai","鳥海山","鳥海山",2236],["Iide and Asahi","飯豐・朝日","飯豊・朝日",2128],["Mount Zaō","蔵王山","蔵王山",1841],["Bandai and Azuma","磐梯・吾妻","磐梯・吾妻",2035],["Abukuma Highland","阿武隈高地","阿武隈高地",1193],["Echigo Mountains","越後山脈","越後山脈",2141],["Mikuni Range","三國山脈","三国山脈",1978],["Nasu Volcanoes","那須火山群","那須火山群",1917],["Nikkō Volcanoes","日光火山群","日光火山群",2578],["Mount Akagi","赤城山","赤城山",1828],["Mount Haruna","榛名山","榛名山",1449],["Asama and Kusatsu","淺間・草津","浅間・草津",2568],["Hida Range, Northern Alps","飛驒山脈（北阿爾卑斯）","飛騨山脈（北アルプス）",3190],["Mount Tate","立山","立山",3015],["Kiso Range, Central Alps","木曾山脈（中央阿爾卑斯）","木曽山脈（中央アルプス）",2956],["Akaishi Range, Southern Alps","赤石山脈（南阿爾卑斯）","赤石山脈（南アルプス）",3193],["Hida Highland","飛驒高地","飛騨高地",1810],["Mount Haku","白山","白山",2702],["Yatsugatake","八岳","八ヶ岳",2899],["Kantō Mountains","關東山地","関東山地",2599],["Tanzawa Mountains","丹澤山地","丹沢山地",1673],["Mount Fuji","富士山","富士山",3776],["Hakone Caldera","箱根火山","箱根火山",1438],["Izu Highland","伊豆山地","伊豆山地",1406],["Suzuka Range","鈴鹿山脈","鈴鹿山脈",1247],["Mount Ibuki","伊吹山","伊吹山",1377],["Tanba Highland","丹波高地","丹波高地",971],["Hira and Hiei","比良・比叡","比良・比叡",1214],["Kii Mountains","紀伊山地","紀伊山地",1915],["Kongō and Ikoma","金剛・生駒","金剛・生駒",1125],["Chūgoku Mountains","中國山地","中国山地",1729],["Mount Daisen","大山","大山",1729],["Shikoku Mountains","四國山地","四国山地",1982],["Tsukushi Mountains","筑紫山地","筑紫山地",1231],["Sefuri Range","脊振山地","脊振山地",1055],["Kyūshū Mountains","九州山地","九州山地",1791],["Kujū Volcanic Group","九重山","九重山",1791],["Mount Aso","阿蘇山","阿蘇山",1592],["Mount Unzen","雲仙岳","雲仙岳",1483],["Kirishima Group","霧島山","霧島山",1700],["Sakurajima","櫻島","桜島",1117],["Mount Kaimon","開聞岳","開聞岳",924],["Yakushima","屋久島","屋久島",1936],["Amami Highland","奄美山地","奄美山地",694],["Yanbaru","山原","やんばる",503],["Ishigaki Highland","石垣山地","石垣山地",526]];
const GEO={"pref":{"10":[[[138.89,36.249],[139.189,36.493],[139.233,36.571],[138.886,36.851],[138.768,36.868],[138.733,36.853],[138.583,36.722],[138.582,36.719]],[[139.352,36.173],[139.189,36.493],[138.89,36.249],[138.88,36.172],[139.149,36.084]],[[139.435,36.181],[139.39,36.567],[139.358,36.576],[139.233,36.571],[139.189,36.493],[139.352,36.173]],[[139.465,36.926],[139.099,36.936],[138.886,36.851],[139.233,36.571],[139.358,36.576]]],"11":[[[139.596,36.157],[139.435,36.181],[139.352,36.173],[139.149,36.084],[139.231,35.869],[139.253,35.861],[139.539,35.93]],[[139.231,35.869],[139.149,36.084],[138.88,36.172],[138.542,35.975],[138.907,35.657]],[[140,35.965],[140,36.126],[139.696,36.192],[139.596,36.157],[139.539,35.93],[139.606,35.858]],[[140.011,35.932],[140,35.965],[139.606,35.858],[139.615,35.778],[139.63,35.759],[139.865,35.771]],[[139.615,35.778],[139.606,35.858],[139.539,35.93],[139.253,35.861],[139.355,35.732]]],"12":[[[150.275,33.014],[140.173,35.658],[139.925,35.43],[139.925,35.409],[144.339,33.758]],[[144.339,33.758],[139.925,35.409],[139.644,35.173],[139.592,35.077],[140.477,34.079]],[[154.508,33.277],[154.508,33.546],[144.746,35.676],[141.94,36],[141.242,36],[140.141,35.82],[140.173,35.658],[150.275,33.014],[151.456,32.85]],[[140.141,35.82],[140.011,35.932],[139.865,35.771],[139.865,35.503],[139.925,35.43],[140.173,35.658]]],"13":[[[139.63,35.759],[139.615,35.778],[139.355,35.732],[139.363,35.66],[139.562,35.604],[139.63,35.626]],[[139.342,35.634],[139.363,35.66],[139.355,35.732],[139.253,35.861],[139.231,35.869],[138.907,35.657],[138.938,35.5],[138.944,35.491],[139.076,35.477],[139.147,35.498]],[[139.865,35.771],[139.63,35.759],[139.63,35.626],[139.865,35.503]],[[139.562,35.604],[139.363,35.66],[139.342,35.634],[139.478,35.456]],[[140.477,34.079],[139.592,35.077],[139.534,35.077],[139.415,35.044],[139.162,34.888],[138.626,33.813],[138.623,33.763]],[[151.456,32.85],[150.275,33.014],[144.339,33.758],[140.477,34.079],[138.623,33.763],[138.261,33.513],[137.81,33.148],[137.75,32.935],[137.605,32.358],[136.97,29.042]],[[135.704,18],[154.508,18],[154.508,33.277],[151.456,32.85],[136.97,29.042],[136.286,28.601],[135.826,27.534],[135.3,23.891],[135.328,23.027]]],"14":[[[139.592,35.077],[139.644,35.173],[139.476,35.448],[139.147,35.498],[139.076,35.477],[139.534,35.077]],[[139.076,35.477],[138.944,35.491],[138.87,35.313],[138.891,35.246],[139.415,35.044],[139.534,35.077]],[[139.925,35.409],[139.925,35.43],[139.865,35.503],[139.63,35.626],[139.562,35.604],[139.478,35.456],[139.476,35.448],[139.644,35.173]],[[139.478,35.456],[139.342,35.634],[139.147,35.498],[139.476,35.448]]],"15":[[[139.176,37.427],[139.23,37.582],[138.764,37.849],[138.327,37.616],[138.807,37.249]],[[138.807,37.249],[138.327,37.616],[137.85,37.579],[137.844,37.547],[137.944,37.421],[138.733,36.853],[138.768,36.868]],[[139.769,37.775],[139.726,37.916],[138.899,38.321],[138.764,37.849],[139.23,37.582]],[[139.726,37.916],[139.859,38.221],[139.741,38.528],[138.624,39.113],[138.899,38.321]],[[138.624,39.113],[137.933,40.018],[137.75,40.13],[134.754,41.659],[134.388,41.786],[137.85,37.579],[138.327,37.616],[138.764,37.849],[138.899,38.321]],[[138.583,36.722],[138.733,36.853],[137.944,37.421],[138.178,36.808]],[[139.099,36.936],[139.306,37.247],[139.176,37.427],[138.807,37.249],[138.768,36.868],[138.886,36.851]],[[138.178,36.808],[137.944,37.421],[137.844,37.547],[137.548,37.158],[137.823,36.67]]],"16":[[[137.552,36.482],[137.197,36.87],[137.057,36.79],[137.135,36.41],[137.431,36.337]],[[137.823,36.67],[137.548,37.158],[137.316,37.057],[137.197,36.87],[137.552,36.482],[137.794,36.588]],[[137.135,36.41],[137.057,36.79],[136.714,36.764],[136.828,36.326]]],"17":[[[136.828,36.326],[136.714,36.764],[135.551,37.221],[136.67,36.244],[136.734,36.223]],[[135.551,37.221],[136.714,36.764],[137.057,36.79],[137.197,36.87],[137.316,37.057],[134.6,38.073],[134.747,37.638]],[[137.844,37.547],[137.85,37.579],[134.388,41.786],[132.455,42.711],[134.6,38.073],[137.316,37.057],[137.548,37.158]],[[136.67,36.244],[135.551,37.221],[134.747,37.638],[134.788,36.964],[135.526,36.253],[135.949,36.159]]],"18":[[[136.623,35.806],[135.949,36.159],[135.526,36.253],[135.65,35.961],[136.291,35.625],[136.455,35.625],[136.622,35.792]],[[136.291,35.625],[135.65,35.961],[135.65,35.537],[135.887,35.36]],[[136.734,36.223],[136.67,36.244],[135.949,36.159],[136.623,35.806],[136.777,36.024]]],"19":[[[138.938,35.5],[138.907,35.657],[138.542,35.975],[138.519,35.975],[138.441,35.5]],[[138.944,35.491],[138.938,35.5],[138.441,35.5],[138.204,35.311],[138.386,35.237],[138.87,35.313]],[[138.204,35.311],[138.441,35.5],[138.519,35.975],[138.494,35.981],[138.158,35.855],[138.018,35.305]]],"20":[[[138.252,36.33],[138.107,36.349],[137.654,35.979],[138.158,35.855],[138.494,35.981]],[[138.582,36.719],[138.583,36.722],[138.178,36.808],[137.823,36.67],[137.794,36.588],[138.107,36.349],[138.252,36.33]],[[138.018,35.305],[138.158,35.855],[137.654,35.979],[137.513,35.963],[137.486,35.808],[137.785,35.416],[138.016,35.304]],[[137.794,36.588],[137.552,36.482],[137.431,36.337],[137.512,35.964],[137.513,35.963],[137.654,35.979],[138.107,36.349]],[[138.88,36.172],[138.89,36.249],[138.582,36.719],[138.252,36.33],[138.494,35.981],[138.519,35.975],[138.542,35.975]]],"21":[[[136.777,36.024],[136.623,35.806],[136.622,35.792],[137.036,35.57],[137.182,35.592],[137.486,35.808],[137.513,35.963],[137.512,35.964]],[[137.431,36.337],[137.135,36.41],[136.828,36.326],[136.734,36.223],[136.777,36.024],[137.512,35.964]],[[137.036,35.57],[136.622,35.792],[136.455,35.625],[136.517,35.286],[136.576,35.276],[136.748,35.3],[136.996,35.483]],[[137.35,35.295],[137.182,35.592],[137.036,35.57],[136.996,35.483],[137.106,35.207],[137.281,35.189]],[[137.785,35.416],[137.486,35.808],[137.182,35.592],[137.35,35.295]]],"22":[[[138.386,35.237],[138.204,35.311],[138.018,35.305],[138.016,35.304],[137.958,35.148],[138.506,34.521],[138.617,34.923]],[[138.623,33.763],[138.626,33.813],[138.506,34.521],[137.958,35.148],[137.798,35.026],[138.261,33.513]],[[138.626,33.813],[139.162,34.888],[138.841,35.063],[138.617,34.923],[138.506,34.521]],[[137.81,33.148],[138.261,33.513],[137.798,35.026],[137.554,34.948],[137.363,33.82],[137.737,33.236]],[[138.891,35.246],[138.87,35.313],[138.386,35.237],[138.617,34.923],[138.841,35.063]],[[139.162,34.888],[139.415,35.044],[138.891,35.246],[138.841,35.063]]],"23":[[[137.281,35.189],[137.106,35.207],[137.022,35.177],[136.886,34.954],[136.899,34.767],[137.373,35.016]],[[137.363,33.82],[137.554,34.948],[137.373,35.016],[136.899,34.767],[136.876,34.726],[136.851,34.595],[137.09,34.1]],[[136.886,34.954],[137.022,35.177],[136.748,35.3],[136.576,35.276]],[[137.106,35.207],[136.996,35.483],[136.748,35.3],[137.022,35.177]],[[138.016,35.304],[137.785,35.416],[137.35,35.295],[137.281,35.189],[137.373,35.016],[137.554,34.948],[137.798,35.026],[137.958,35.148]]],"24":[[[137.09,34.1],[136.851,34.595],[136.184,34.759],[136.066,34.5],[136.142,34.333]],[[136.851,34.595],[136.876,34.726],[136.389,35.119],[136.194,34.914],[136.155,34.809],[136.184,34.759]],[[137.737,33.236],[137.363,33.82],[137.09,34.1],[136.142,34.333],[135.899,34.11],[135.882,34.045]],[[137.75,32.935],[137.81,33.148],[137.737,33.236],[135.882,34.045],[135.806,33.998],[135.748,33.871]],[[136.876,34.726],[136.899,34.767],[136.886,34.954],[136.576,35.276],[136.517,35.286],[136.418,35.205],[136.389,35.119]]],"25":[[[135.864,35.247],[136.194,34.914],[136.389,35.119],[136.418,35.205],[135.893,35.342]],[[136.517,35.286],[136.455,35.625],[136.291,35.625],[135.887,35.36],[135.893,35.342],[136.418,35.205]],[[136.155,34.809],[136.194,34.914],[135.864,35.247],[135.743,35.122],[135.962,34.835]]],"26":[[[135.887,35.36],[135.65,35.537],[135.156,35.26],[135.239,35.098],[135.349,35.049],[135.428,35.034],[135.479,35.036],[135.743,35.122],[135.864,35.247],[135.893,35.342]],[[135.65,35.537],[135.65,35.961],[135.526,36.253],[134.788,36.964],[134.543,36.431],[135.027,35.324],[135.156,35.26]],[[135.962,34.835],[135.743,35.122],[135.479,35.036],[135.809,34.802]]],"27":[[[135.663,34.68],[135.597,34.702],[135.471,34.688],[135.319,34.626],[135.166,34.491],[135.176,34.473],[135.238,34.453],[135.696,34.528]],[[135.696,34.528],[135.238,34.453],[135.425,34.3],[135.707,34.403],[135.732,34.5]],[[135.471,34.688],[135.597,34.702],[135.428,35.034],[135.349,35.049],[135.357,34.949]],[[135.809,34.802],[135.479,35.036],[135.428,35.034],[135.597,34.702],[135.663,34.68]]],"28":[[[134.46,34.821],[135.073,34.901],[135.239,35.098],[135.156,35.26],[135.027,35.324],[134.516,35.115],[134.477,35.074],[134.374,34.888]],[[135.073,34.901],[134.46,34.821],[134.606,34.572],[135.104,34.531]],[[134.516,35.115],[135.027,35.324],[134.543,36.431],[134.258,36.128]],[[134.935,34.001],[135.176,34.473],[135.166,34.491],[135.104,34.531],[134.606,34.572],[134.512,34.325]],[[135.166,34.491],[135.319,34.626],[135.357,34.949],[135.349,35.049],[135.239,35.098],[135.073,34.901],[135.104,34.531]],[[135.319,34.626],[135.471,34.688],[135.357,34.949]]],"29":[[[136.142,34.333],[136.066,34.5],[135.732,34.5],[135.707,34.403],[135.74,34.27],[135.899,34.11]],[[136.066,34.5],[136.184,34.759],[136.155,34.809],[135.962,34.835],[135.809,34.802],[135.663,34.68],[135.696,34.528],[135.732,34.5]]],"30":[[[135.748,33.871],[135.806,33.998],[135.46,34.106],[134.978,33.854],[134.944,33.635],[134.961,33.388],[135.696,33.801]],[[135.425,34.3],[135.238,34.453],[135.176,34.473],[134.935,34.001],[134.978,33.854],[135.46,34.106],[135.46,34.237]],[[136.286,28.601],[136.97,29.042],[137.605,32.358],[135.696,33.801],[134.961,33.388],[134.784,32.829],[134.711,31.915],[134.985,30.296],[135.556,29.391]],[[135.882,34.045],[135.899,34.11],[135.74,34.27],[135.46,34.237],[135.46,34.106],[135.806,33.998]],[[135.707,34.403],[135.425,34.3],[135.46,34.237],[135.74,34.27]],[[137.605,32.358],[137.75,32.935],[135.748,33.871],[135.696,33.801]]],"31":[[[133.683,35.841],[133.608,35.305],[133.878,35.153],[134.107,35.413],[134.241,36.115]],[[134.477,35.074],[134.516,35.115],[134.258,36.128],[134.241,36.115],[134.107,35.413]],[[133.106,35.815],[133.3,35.179],[133.608,35.305],[133.683,35.841]]],"32":[[[133.15,35.038],[131.832,36.024],[131.532,36.126],[132.562,34.779],[133.095,34.895],[133.15,34.931]],[[132.562,34.779],[131.532,36.126],[131.284,36.254],[132.058,34.734],[132.508,34.664]],[[133.3,35.179],[133.106,35.815],[131.832,36.024],[133.15,35.038]],[[134.788,36.964],[134.747,37.638],[134.6,38.073],[132.455,42.711],[126.6,47.469],[122.505,50],[120.788,50],[130.112,36.97],[131.284,36.254],[131.532,36.126],[131.832,36.024],[133.106,35.815],[133.683,35.841],[134.241,36.115],[134.258,36.128],[134.543,36.431]],[[132.012,34.62],[132.058,34.734],[131.284,36.254],[130.112,36.97],[130.47,35.263],[130.912,34.863],[131.265,34.678],[131.818,34.557]]],"33":[[[133.913,35.089],[133.439,34.779],[133.542,34.644],[134.19,34.814],[134.269,34.88]],[[134.19,34.814],[133.542,34.644],[133.557,34.514],[133.97,34.424],[134.027,34.44]],[[133.878,35.153],[133.608,35.305],[133.3,35.179],[133.15,35.038],[133.15,34.931],[133.439,34.779],[133.913,35.089]],[[134.374,34.888],[134.477,35.074],[134.107,35.413],[133.878,35.153],[133.913,35.089],[134.269,34.88]]],"34":[[[133.095,34.895],[132.562,34.779],[132.508,34.664],[132.505,34.619],[132.968,34.316]],[[132.992,34.269],[132.968,34.316],[132.505,34.619],[132.289,34.397],[132.287,34.391],[132.517,34.035]],[[133.557,34.514],[133.542,34.644],[133.439,34.779],[133.15,34.931],[133.095,34.895],[132.968,34.316],[132.992,34.269],[133.236,34.189],[133.458,34.359]],[[132.505,34.619],[132.508,34.664],[132.058,34.734],[132.012,34.62],[132.289,34.397]]],"35":[[[131.821,34.133],[131.265,34.678],[130.912,34.863],[131.399,33.8],[131.789,33.8]],[[131.399,33.8],[130.912,34.863],[130.47,35.263],[130.228,34.39],[131.246,33.723]],[[131.818,34.557],[131.265,34.678],[131.821,34.133],[132.007,34.31]],[[132.517,34.035],[132.287,34.391],[132.007,34.31],[131.821,34.133],[131.789,33.8],[132.069,33.644],[132.354,33.747],[132.427,33.825]],[[132.287,34.391],[132.289,34.397],[132.012,34.62],[131.818,34.557],[132.007,34.31]]],"36":[[[134.784,32.829],[134.961,33.388],[134.944,33.635],[134.239,34.097],[134.125,34.033],[134.076,33.872]],[[134.944,33.635],[134.978,33.854],[134.935,34.001],[134.512,34.325],[134.355,34.268],[134.239,34.097]],[[134.076,33.872],[134.125,34.033],[133.889,34.157],[133.872,34.155],[133.504,33.862],[133.589,33.819]]],"37":[[[134.027,34.44],[133.97,34.424],[133.889,34.157],[134.125,34.033],[134.239,34.097],[134.355,34.268]],[[133.97,34.424],[133.557,34.514],[133.458,34.359],[133.872,34.155],[133.889,34.157]],[[134.512,34.325],[134.606,34.572],[134.46,34.821],[134.374,34.888],[134.269,34.88],[134.19,34.814],[134.027,34.44],[134.355,34.268]],[[133.458,34.359],[133.236,34.189],[133.346,33.894],[133.504,33.862],[133.872,34.155]]],"38":[[[133.276,33.825],[132.427,33.825],[132.354,33.747],[132.87,33.458],[133.174,33.557]],[[133.346,33.894],[133.236,34.189],[132.992,34.269],[132.517,34.035],[132.427,33.825],[133.276,33.825]],[[132.691,32.286],[132.87,33.458],[132.354,33.747],[132.069,33.644],[132.032,33.11],[132.033,33.1],[132.189,32.75]]],"39":[[[133.589,33.819],[133.504,33.862],[133.346,33.894],[133.276,33.825],[133.174,33.557],[134.586,32.078]],[[134.985,30.296],[134.711,31.915],[134.586,32.078],[133.174,33.557],[132.87,33.458],[132.691,32.286],[132.867,32.041],[133.267,31.632]],[[134.711,31.915],[134.784,32.829],[134.076,33.872],[133.589,33.819],[134.586,32.078]]],"40":[[[131.013,33.606],[130.242,33.858],[130.23,33.821],[130.272,33.626],[130.614,33.426],[130.776,33.405]],[[131.246,33.723],[130.228,34.39],[130.181,34.3],[130.242,33.858],[131.013,33.606],[131.159,33.634]],[[130.776,33.405],[130.614,33.426],[130.579,33.381],[130.434,32.954],[130.443,32.949],[130.788,33.119]],[[130.434,32.954],[130.579,33.381],[130.334,33.261],[130.357,32.987]]],"41":[[[130.357,32.987],[130.334,33.261],[130.253,33.552],[129.992,33.324],[130.091,33.073],[130.292,32.991]],[[130.272,33.626],[130.23,33.821],[129.531,33.439],[129.615,33.402],[129.992,33.324],[130.253,33.552]],[[130.579,33.381],[130.614,33.426],[130.272,33.626],[130.253,33.552],[130.334,33.261]],[[130.091,33.073],[129.992,33.324],[129.615,33.402],[129.931,33.067]]],"42":[[[130.292,32.991],[130.091,33.073],[129.931,33.067],[129.34,32.835],[129.45,32.44]],[[129.931,33.067],[129.615,33.402],[129.531,33.439],[128.927,33.406],[129.34,32.835]],[[130.443,32.949],[130.434,32.954],[130.357,32.987],[130.292,32.991],[129.45,32.44],[129.45,32.371],[130.478,32.707],[130.49,32.825]],[[130.228,34.39],[130.47,35.263],[130.112,36.97],[120.788,50],[117.426,50],[117.426,36.066],[128.486,33.653],[130.181,34.3]],[[130.23,33.821],[130.242,33.858],[130.181,34.3],[128.486,33.653],[128.927,33.406],[129.531,33.439]],[[129.316,31.757],[129.45,32.371],[129.45,32.44],[129.34,32.835],[128.927,33.406],[128.486,33.653],[117.426,36.066],[117.426,31.841],[121.56,30.342],[122.142,30.173],[124.503,30.016],[127.021,30.278],[128.1,30.8],[129.057,31.51]]],"43":[[[131.191,32.734],[130.49,32.825],[130.478,32.707],[130.505,32.631],[131.058,32.414]],[[130.788,33.119],[130.443,32.949],[130.49,32.825],[131.191,32.734],[131.211,32.75],[131.108,33.088]],[[131.058,32.414],[130.505,32.631],[130.37,32.187],[130.9,32.117],[131.066,32.378]],[[130.505,32.631],[130.478,32.707],[129.45,32.371],[129.316,31.757],[129.463,31.791],[130.37,32.187]]],"44":[[[132.033,33.1],[132.032,33.11],[131.225,33.374],[131.121,33.1]],[[132.032,33.11],[132.069,33.644],[131.789,33.8],[131.399,33.8],[131.246,33.723],[131.159,33.634],[131.225,33.374]],[[132.189,32.75],[132.033,33.1],[131.121,33.1],[131.108,33.088],[131.211,32.75]],[[131.159,33.634],[131.013,33.606],[130.776,33.405],[130.788,33.119],[131.108,33.088],[131.121,33.1],[131.225,33.374]]],"45":[[[133.267,31.632],[132.867,32.041],[131.066,32.378],[130.9,32.117],[130.983,31.964]],[[135.556,29.391],[134.985,30.296],[133.267,31.632],[130.983,31.964],[130.838,31.678],[131.018,31.296],[131.559,30.8]],[[132.867,32.041],[132.691,32.286],[132.189,32.75],[131.211,32.75],[131.191,32.734],[131.058,32.414],[131.066,32.378]]],"46":[[[131.018,31.296],[130.838,31.678],[129.463,31.791],[129.316,31.757],[129.057,31.51]],[[130.838,31.678],[130.983,31.964],[130.9,32.117],[130.37,32.187],[129.463,31.791]],[[131.559,30.8],[131.018,31.296],[129.057,31.51],[128.1,30.8]],[[135.826,27.534],[136.286,28.601],[135.556,29.391],[131.559,30.8],[128.1,30.8],[127.021,30.278]],[[135.3,23.891],[135.826,27.534],[127.021,30.278],[124.503,30.016]]],"47":[[[133.746,18],[135.704,18],[135.328,23.027],[123.611,28.779]],[[135.328,23.027],[135.3,23.891],[124.503,30.016],[122.142,30.173],[123.611,28.779]],[[128.417,18],[133.746,18],[123.611,28.779],[122.142,30.173],[121.56,30.342]],[[117.426,18],[128.417,18],[121.56,30.342],[117.426,31.841]]],"01":[[[142.073,43.993],[141.736,43.942],[142.223,42.667],[143.294,43.194]],[[140.951,44.231],[141.736,43.942],[142.073,43.993],[143.385,44.508],[144.467,46.532]],[[142.223,42.667],[141.736,43.942],[140.951,44.231],[136.858,44.741],[141.694,42.152],[141.99,42.119]],[[141.694,42.152],[136.858,44.741],[126.6,47.469],[132.455,42.711],[134.388,41.786],[134.754,41.659],[140.163,41.293]],[[154.508,36.04],[154.508,46.992],[143.727,43.463],[143.672,43.261],[147.094,39.342],[147.168,39.307]],[[147.094,39.342],[143.672,43.261],[143.294,43.194],[142.223,42.667],[141.99,42.119],[142.706,41.362],[144.043,40.615],[146.125,39.65]],[[154.508,46.992],[154.508,50],[147.01,50],[144.467,46.532],[143.385,44.508],[143.727,43.463]],[[147.01,50],[122.505,50],[126.6,47.469],[136.858,44.741],[140.951,44.231],[144.467,46.532]],[[143.385,44.508],[142.073,43.993],[143.294,43.194],[143.672,43.261],[143.727,43.463]]],"02":[[[141.293,40.93],[140.237,41.245],[140.747,40.41],[140.95,40.301],[140.987,40.329]],[[142.706,41.362],[141.99,42.119],[141.694,42.152],[140.163,41.293],[140.237,41.245],[141.293,40.93]],[[140.747,40.41],[140.237,41.245],[140.163,41.293],[134.754,41.659],[137.75,40.13]],[[144.043,40.615],[142.706,41.362],[141.293,40.93],[140.987,40.329]]],"03":[[[143.742,39.65],[140.964,39.953],[140.849,39.452],[140.872,39.396],[141.181,39.315]],[[146.125,39.65],[144.043,40.615],[140.987,40.329],[140.95,40.301],[140.95,39.975],[140.964,39.953],[143.742,39.65]],[[147.168,39.307],[147.094,39.342],[146.125,39.65],[143.742,39.65],[141.181,39.315],[141.358,38.976]],[[141.358,38.976],[141.181,39.315],[140.872,39.396],[140.544,38.826],[140.899,38.726],[141.31,38.87]]],"04":[[[141.845,37.9],[140.899,38.726],[140.544,38.826],[140.538,38.823],[140.5,38.425],[141.101,37.9]],[[142.645,37.739],[141.31,38.87],[140.899,38.726],[141.845,37.9]],[[154.508,34.464],[154.508,36.04],[147.168,39.307],[141.358,38.976],[141.31,38.87],[142.645,37.739]],[[141.101,37.9],[140.5,38.425],[140.35,38.312],[140.35,37.785],[140.7,37.75]]],"05":[[[140.849,39.452],[140.964,39.953],[140.95,39.975],[138.118,39.975],[138.748,39.758]],[[140.95,39.975],[140.95,40.301],[140.747,40.41],[137.75,40.13],[137.933,40.018],[138.118,39.975]],[[140.544,38.826],[140.872,39.396],[140.849,39.452],[138.748,39.758],[140.532,38.824],[140.538,38.823]]],"06":[[[140.5,38.425],[140.538,38.823],[140.532,38.824],[139.741,38.528],[139.859,38.221],[140.35,38.312]],[[140.532,38.824],[138.748,39.758],[138.118,39.975],[137.933,40.018],[138.624,39.113],[139.741,38.528]],[[140.35,37.785],[140.35,38.312],[139.859,38.221],[139.726,37.916],[139.769,37.775],[139.9,37.694]]],"07":[[[140.7,37.75],[140.35,37.785],[139.9,37.694],[139.998,37.119],[140.197,37.006],[140.591,37.036]],[[139.998,37.119],[139.9,37.694],[139.769,37.775],[139.23,37.582],[139.176,37.427],[139.306,37.247],[139.781,37.064]],[[154.508,33.546],[154.508,34.464],[142.645,37.739],[141.845,37.9],[141.101,37.9],[140.7,37.75],[140.591,37.036],[144.746,35.676]],[[139.781,37.064],[139.306,37.247],[139.099,36.936],[139.465,36.926],[139.763,37.05]]],"08":[[[140.012,36.134],[141.242,36],[141.94,36],[140.178,36.494]],[[141.242,36],[140.012,36.134],[140,36.126],[140,35.965],[140.011,35.932],[140.141,35.82]],[[144.746,35.676],[140.591,37.036],[140.197,37.006],[140.119,36.62],[140.178,36.494],[141.94,36]]],"09":[[[140.119,36.62],[140.197,37.006],[139.998,37.119],[139.781,37.064],[139.763,37.05],[139.566,36.556],[139.643,36.516]],[[140.012,36.134],[140.178,36.494],[140.119,36.62],[139.643,36.516],[139.696,36.192],[140,36.126]],[[139.696,36.192],[139.643,36.516],[139.566,36.556],[139.39,36.567],[139.435,36.181],[139.596,36.157]],[[139.763,37.05],[139.465,36.926],[139.358,36.576],[139.39,36.567],[139.566,36.556]]]},"coast":{"hokkaido":[[141.937,45.523],[142.02,45.49],[142.1,45.45],[142.17,45.41],[142.22,45.36],[142.27,45.31],[142.31,45.26],[142.35,45.2],[142.39,45.14],[142.44,45.08],[142.5,45.02],[142.56,44.96],[142.63,44.9],[142.7,44.84],[142.78,44.78],[142.86,44.72],[142.94,44.66],[143.02,44.6],[143.1,44.54],[143.18,44.48],[143.26,44.42],[143.34,44.36],[143.41,44.3],[143.49,44.24],[143.58,44.19],[143.68,44.15],[143.79,44.11],[143.9,44.07],[144.01,44.05],[144.12,44.03],[144.22,44.02],[144.32,44],[144.42,43.98],[144.52,43.96],[144.62,43.94],[144.72,43.93],[144.82,43.94],[144.9,43.96],[144.98,43.99],[145.05,44.03],[145.11,44.08],[145.16,44.13],[145.21,44.18],[145.25,44.23],[145.29,44.28],[145.32,44.33],[145.331,44.352],[145.3,44.32],[145.26,44.28],[145.22,44.24],[145.19,44.2],[145.16,44.15],[145.13,44.1],[145.11,44.05],[145.1,44],[145.11,43.95],[145.13,43.9],[145.15,43.85],[145.16,43.8],[145.16,43.75],[145.14,43.7],[145.12,43.65],[145.12,43.6],[145.14,43.55],[145.19,43.5],[145.26,43.45],[145.34,43.42],[145.42,43.4],[145.5,43.39],[145.58,43.38],[145.66,43.385],[145.74,43.39],[145.815,43.385],[145.78,43.35],[145.72,43.325],[145.66,43.31],[145.6,43.29],[145.54,43.27],[145.48,43.25],[145.42,43.23],[145.36,43.21],[145.3,43.19],[145.24,43.17],[145.18,43.145],[145.12,43.12],[145.06,43.09],[145,43.06],[144.94,43.03],[144.88,43.01],[144.82,42.995],[144.76,42.985],[144.7,42.98],[144.64,42.98],[144.58,42.98],[144.52,42.985],[144.46,42.99],[144.4,42.985],[144.34,42.97],[144.28,42.96],[144.22,42.95],[144.16,42.94],[144.1,42.93],[144.04,42.92],[143.98,42.91],[143.92,42.9],[143.86,42.89],[143.8,42.87],[143.74,42.85],[143.68,42.83],[143.62,42.8],[143.56,42.77],[143.51,42.73],[143.46,42.69],[143.42,42.65],[143.39,42.61],[143.36,42.57],[143.34,42.53],[143.32,42.49],[143.31,42.45],[143.3,42.41],[143.3,42.37],[143.3,42.33],[143.29,42.29],[143.28,42.25],[143.27,42.21],[143.26,42.17],[143.26,42.13],[143.26,42.09],[143.26,42.05],[143.25,42.01],[143.25,41.97],[143.243,41.926],[143.19,41.96],[143.14,41.99],[143.09,42.02],[143.04,42.05],[142.99,42.08],[142.94,42.11],[142.89,42.14],[142.84,42.17],[142.79,42.2],[142.74,42.23],[142.69,42.26],[142.64,42.29],[142.59,42.32],[142.54,42.35],[142.49,42.38],[142.44,42.41],[142.39,42.44],[142.33,42.47],[142.27,42.5],[142.21,42.53],[142.15,42.55],[142.09,42.57],[142.02,42.59],[141.95,42.61],[141.88,42.62],[141.81,42.632],[141.74,42.636],[141.67,42.634],[141.6,42.628],[141.53,42.61],[141.46,42.59],[141.39,42.56],[141.32,42.53],[141.25,42.5],[141.19,42.47],[141.13,42.44],[141.08,42.41],[141.03,42.38],[140.99,42.35],[140.974,42.317],[140.94,42.315],[140.9,42.34],[140.865,42.37],[140.83,42.4],[140.8,42.44],[140.77,42.472],[140.73,42.5],[140.69,42.53],[140.64,42.56],[140.58,42.58],[140.52,42.592],[140.46,42.592],[140.4,42.58],[140.34,42.56],[140.29,42.53],[140.25,42.5],[140.22,42.46],[140.2,42.42],[140.19,42.38],[140.19,42.34],[140.2,42.3],[140.22,42.26],[140.25,42.225],[140.28,42.19],[140.32,42.16],[140.36,42.13],[140.4,42.1],[140.44,42.07],[140.48,42.04],[140.52,42.01],[140.56,41.98],[140.6,41.95],[140.64,41.92],[140.68,41.89],[140.71,41.86],[140.73,41.83],[140.745,41.8],[140.745,41.775],[140.727,41.758],[140.705,41.762],[140.685,41.778],[140.665,41.792],[140.62,41.78],[140.58,41.76],[140.54,41.73],[140.5,41.7],[140.46,41.67],[140.42,41.64],[140.38,41.61],[140.34,41.58],[140.3,41.55],[140.26,41.52],[140.23,41.49],[140.21,41.46],[140.2,41.43],[140.206,41.412],[140.16,41.43],[140.13,41.46],[140.11,41.49],[140.1,41.52],[140.09,41.55],[140.08,41.58],[140.075,41.61],[140.075,41.64],[140.08,41.67],[140.085,41.7],[140.09,41.73],[140.09,41.76],[140.085,41.79],[140.075,41.82],[140.085,41.85],[140.128,41.872],[140.11,41.9],[140.085,41.93],[140.05,41.96],[140.01,41.99],[139.975,42.02],[139.945,42.05],[139.92,42.08],[139.905,42.11],[139.895,42.14],[139.885,42.17],[139.875,42.2],[139.868,42.23],[139.865,42.26],[139.867,42.29],[139.875,42.32],[139.885,42.35],[139.895,42.38],[139.91,42.41],[139.93,42.44],[139.95,42.47],[139.97,42.5],[139.99,42.53],[140.01,42.56],[140.03,42.59],[140.05,42.62],[140.07,42.65],[140.09,42.68],[140.11,42.71],[140.13,42.74],[140.15,42.77],[140.175,42.8],[140.205,42.83],[140.23,42.86],[140.25,42.89],[140.27,42.92],[140.285,42.95],[140.3,42.98],[140.31,43.01],[140.315,43.04],[140.32,43.07],[140.32,43.1],[140.325,43.13],[140.33,43.16],[140.335,43.19],[140.34,43.22],[140.345,43.25],[140.348,43.28],[140.352,43.31],[140.356,43.335],[140.42,43.325],[140.48,43.315],[140.54,43.3],[140.6,43.29],[140.66,43.275],[140.72,43.26],[140.78,43.24],[140.84,43.22],[140.9,43.205],[140.96,43.195],[141.02,43.198],[141.08,43.22],[141.14,43.25],[141.2,43.28],[141.25,43.31],[141.3,43.34],[141.34,43.37],[141.37,43.4],[141.39,43.43],[141.41,43.46],[141.42,43.49],[141.43,43.52],[141.44,43.55],[141.45,43.58],[141.46,43.61],[141.47,43.64],[141.48,43.67],[141.49,43.7],[141.5,43.73],[141.51,43.76],[141.52,43.79],[141.53,43.82],[141.54,43.85],[141.55,43.88],[141.56,43.91],[141.57,43.94],[141.58,43.97],[141.59,44],[141.6,44.03],[141.61,44.06],[141.62,44.09],[141.63,44.12],[141.64,44.15],[141.645,44.18],[141.65,44.21],[141.655,44.24],[141.658,44.27],[141.66,44.32],[141.66,44.37],[141.66,44.42],[141.66,44.47],[141.66,44.52],[141.66,44.57],[141.66,44.62],[141.66,44.67],[141.66,44.72],[141.66,44.77],[141.66,44.82],[141.66,44.87],[141.66,44.92],[141.66,44.97],[141.66,45.02],[141.66,45.07],[141.66,45.12],[141.66,45.17],[141.665,45.21],[141.672,45.242],[141.69,45.28],[141.72,45.32],[141.75,45.36],[141.79,45.4],[141.83,45.44],[141.88,45.48],[141.92,45.51]],"honshu":[[140.343,41.256],[140.375,41.22],[140.405,41.19],[140.435,41.16],[140.465,41.13],[140.5,41.1],[140.535,41.07],[140.565,41.04],[140.59,41.01],[140.605,40.98],[140.62,40.95],[140.64,40.92],[140.66,40.89],[140.685,40.86],[140.71,40.835],[140.747,40.822],[140.785,40.835],[140.82,40.85],[140.855,40.865],[140.89,40.885],[140.925,40.905],[140.96,40.925],[140.995,40.94],[141.03,40.955],[141.06,40.975],[141.085,41],[141.105,41.03],[141.12,41.06],[141.128,41.09],[141.125,41.12],[141.11,41.15],[141.09,41.18],[141.065,41.21],[141.04,41.24],[141.015,41.27],[140.99,41.3],[140.965,41.33],[140.94,41.36],[140.918,41.39],[140.902,41.42],[140.892,41.45],[140.888,41.48],[140.892,41.51],[140.906,41.529],[140.955,41.532],[141.005,41.525],[141.055,41.515],[141.105,41.503],[141.155,41.49],[141.205,41.478],[141.26,41.466],[141.315,41.455],[141.37,41.447],[141.41,41.44],[141.462,41.432],[141.455,41.4],[141.45,41.37],[141.44,41.34],[141.428,41.31],[141.42,41.28],[141.415,41.25],[141.41,41.22],[141.405,41.19],[141.4,41.16],[141.4,41.13],[141.4,41.1],[141.405,41.07],[141.415,41.04],[141.42,41.01],[141.425,40.98],[141.425,40.95],[141.42,40.92],[141.418,40.89],[141.42,40.86],[141.42,40.83],[141.42,40.8],[141.425,40.77],[141.44,40.74],[141.455,40.71],[141.47,40.68],[141.485,40.65],[141.5,40.62],[141.515,40.59],[141.525,40.56],[141.532,40.53],[141.55,40.5],[141.575,40.47],[141.6,40.44],[141.625,40.41],[141.65,40.38],[141.675,40.35],[141.695,40.32],[141.71,40.29],[141.725,40.26],[141.745,40.23],[141.765,40.2],[141.785,40.17],[141.8,40.14],[141.815,40.11],[141.825,40.08],[141.835,40.05],[141.855,40.02],[141.88,39.99],[141.895,39.96],[141.905,39.93],[141.925,39.9],[141.945,39.87],[141.955,39.84],[141.965,39.81],[141.975,39.78],[141.985,39.75],[142,39.72],[142.02,39.69],[142.035,39.66],[142.05,39.63],[142.062,39.6],[142.07,39.57],[142.073,39.548],[142.045,39.52],[142.02,39.5],[141.995,39.485],[142.01,39.47],[142.03,39.45],[142.005,39.435],[141.98,39.42],[141.965,39.4],[141.985,39.38],[142.005,39.365],[141.98,39.345],[141.955,39.33],[141.945,39.31],[141.965,39.29],[141.98,39.27],[141.96,39.25],[141.94,39.23],[141.945,39.21],[141.96,39.19],[141.945,39.17],[141.925,39.15],[141.93,39.13],[141.945,39.11],[141.93,39.09],[141.91,39.07],[141.905,39.05],[141.92,39.03],[141.935,39.01],[141.92,38.99],[141.9,38.97],[141.885,38.95],[141.895,38.93],[141.905,38.91],[141.885,38.89],[141.865,38.87],[141.855,38.85],[141.865,38.83],[141.875,38.81],[141.855,38.79],[141.83,38.77],[141.805,38.75],[141.78,38.73],[141.755,38.71],[141.73,38.69],[141.705,38.67],[141.68,38.65],[141.655,38.63],[141.635,38.61],[141.615,38.59],[141.6,38.57],[141.585,38.55],[141.575,38.53],[141.565,38.51],[141.56,38.49],[141.565,38.47],[141.575,38.45],[141.59,38.43],[141.605,38.41],[141.615,38.39],[141.6,38.37],[141.585,38.35],[141.565,38.335],[141.545,38.31],[141.52,38.295],[141.49,38.3],[141.465,38.315],[141.445,38.335],[141.425,38.355],[141.41,38.375],[141.395,38.395],[141.375,38.415],[141.35,38.425],[141.32,38.42],[141.29,38.405],[141.265,38.385],[141.245,38.36],[141.23,38.335],[141.215,38.31],[141.205,38.28],[141.2,38.25],[141.19,38.22],[141.18,38.19],[141.165,38.16],[141.15,38.13],[141.14,38.1],[141.13,38.07],[141.12,38.04],[141.11,38.01],[141.1,37.98],[141.095,37.95],[141.09,37.92],[141.085,37.89],[141.08,37.86],[141.075,37.83],[141.07,37.8],[141.065,37.77],[141.06,37.74],[141.055,37.71],[141.05,37.68],[141.045,37.65],[141.04,37.62],[141.035,37.59],[141.03,37.56],[141.025,37.53],[141.02,37.5],[141.015,37.47],[141.015,37.44],[141.02,37.41],[141.02,37.38],[141.015,37.35],[141.005,37.32],[140.995,37.29],[140.99,37.26],[140.985,37.23],[140.98,37.2],[140.97,37.17],[140.955,37.14],[140.94,37.11],[140.925,37.08],[140.91,37.05],[140.895,37.02],[140.885,36.99],[140.875,36.96],[140.855,36.93],[140.83,36.9],[140.805,36.87],[140.785,36.84],[140.77,36.81],[140.755,36.78],[140.745,36.75],[140.735,36.72],[140.72,36.69],[140.705,36.66],[140.69,36.63],[140.675,36.6],[140.665,36.57],[140.655,36.54],[140.645,36.51],[140.635,36.48],[140.63,36.45],[140.625,36.42],[140.615,36.39],[140.605,36.36],[140.595,36.33],[140.585,36.3],[140.575,36.27],[140.565,36.24],[140.555,36.21],[140.55,36.18],[140.55,36.15],[140.555,36.12],[140.57,36.09],[140.59,36.06],[140.61,36.03],[140.63,36],[140.655,35.97],[140.68,35.94],[140.705,35.91],[140.735,35.88],[140.765,35.85],[140.8,35.82],[140.83,35.79],[140.85,35.76],[140.858,35.733],[140.845,35.7],[140.815,35.67],[140.78,35.64],[140.745,35.61],[140.71,35.58],[140.675,35.55],[140.64,35.52],[140.605,35.49],[140.575,35.46],[140.545,35.43],[140.515,35.4],[140.49,35.37],[140.465,35.34],[140.44,35.31],[140.415,35.28],[140.395,35.25],[140.375,35.22],[140.35,35.19],[140.325,35.16],[140.3,35.13],[140.27,35.1],[140.235,35.07],[140.19,35.04],[140.14,35.01],[140.09,34.98],[140.04,34.955],[139.99,34.93],[139.945,34.909],[139.885,34.899],[139.845,34.92],[139.83,34.95],[139.83,34.98],[139.83,35.01],[139.835,35.04],[139.845,35.07],[139.855,35.1],[139.86,35.13],[139.865,35.16],[139.875,35.19],[139.885,35.22],[139.895,35.25],[139.9,35.28],[139.905,35.31],[139.9,35.34],[139.885,35.37],[139.875,35.4],[139.87,35.43],[139.865,35.46],[139.865,35.49],[139.87,35.52],[139.875,35.55],[139.88,35.58],[139.885,35.61],[139.878,35.635],[139.855,35.645],[139.83,35.635],[139.805,35.62],[139.78,35.6],[139.765,35.575],[139.755,35.55],[139.745,35.52],[139.73,35.49],[139.72,35.46],[139.715,35.43],[139.71,35.4],[139.715,35.37],[139.72,35.34],[139.72,35.31],[139.715,35.28],[139.705,35.25],[139.69,35.22],[139.675,35.19],[139.665,35.16],[139.618,35.135],[139.585,35.155],[139.565,35.18],[139.555,35.205],[139.535,35.23],[139.5,35.255],[139.48,35.28],[139.46,35.305],[139.435,35.32],[139.405,35.315],[139.375,35.305],[139.345,35.295],[139.315,35.285],[139.28,35.27],[139.245,35.25],[139.215,35.225],[139.195,35.2],[139.175,35.175],[139.155,35.145],[139.135,35.115],[139.11,35.09],[139.09,35.07],[139.075,35.05],[139.075,35.03],[139.09,35.01],[139.1,34.99],[139.095,34.97],[139.08,34.95],[139.07,34.93],[139.08,34.91],[139.095,34.89],[139.1,34.87],[139.09,34.85],[139.075,34.83],[139.06,34.81],[139.045,34.79],[139.03,34.77],[139.02,34.75],[139.005,34.73],[138.99,34.71],[138.975,34.69],[138.955,34.67],[138.935,34.65],[138.915,34.63],[138.895,34.61],[138.868,34.598],[138.835,34.615],[138.82,34.635],[138.805,34.655],[138.79,34.675],[138.785,34.695],[138.775,34.715],[138.765,34.735],[138.765,34.755],[138.775,34.775],[138.79,34.795],[138.795,34.815],[138.79,34.835],[138.795,34.855],[138.81,34.875],[138.825,34.895],[138.835,34.915],[138.845,34.935],[138.855,34.955],[138.865,34.975],[138.855,34.995],[138.835,35.01],[138.81,35.02],[138.785,35.028],[138.755,35.03],[138.725,35.025],[138.695,35.015],[138.665,35.005],[138.635,34.995],[138.605,34.985],[138.575,34.975],[138.545,34.965],[138.515,34.95],[138.49,34.93],[138.465,34.91],[138.44,34.89],[138.415,34.87],[138.39,34.85],[138.365,34.83],[138.34,34.81],[138.315,34.79],[138.29,34.77],[138.265,34.75],[138.245,34.73],[138.235,34.71],[138.228,34.69],[138.225,34.67],[138.222,34.65],[138.222,34.63],[138.226,34.61],[138.218,34.598],[138.16,34.615],[138.1,34.628],[138.04,34.64],[137.98,34.652],[137.92,34.665],[137.86,34.678],[137.8,34.688],[137.74,34.695],[137.68,34.7],[137.62,34.698],[137.56,34.69],[137.5,34.68],[137.44,34.67],[137.38,34.655],[137.325,34.635],[137.275,34.615],[137.225,34.6],[137.175,34.585],[137.12,34.575],[137.065,34.567],[137.02,34.578],[137,34.6],[136.99,34.625],[136.99,34.65],[137,34.675],[137.02,34.7],[137.04,34.725],[137.05,34.75],[137.04,34.775],[137.02,34.795],[137,34.815],[136.98,34.83],[136.96,34.845],[136.94,34.86],[136.925,34.88],[136.915,34.9],[136.905,34.925],[136.89,34.95],[136.875,34.975],[136.865,35],[136.855,35.025],[136.84,35.045],[136.815,35.035],[136.8,35.015],[136.79,34.99],[136.785,34.965],[136.78,34.94],[136.775,34.915],[136.775,34.89],[136.78,34.865],[136.79,34.84],[136.8,34.815],[136.815,34.79],[136.825,34.765],[136.835,34.74],[136.845,34.715],[136.85,34.69],[136.85,34.665],[136.855,34.64],[136.855,34.615],[136.85,34.59],[136.84,34.565],[136.835,34.54],[136.845,34.515],[136.86,34.495],[136.88,34.48],[136.865,34.465],[136.845,34.45],[136.855,34.43],[136.875,34.415],[136.895,34.4],[136.875,34.385],[136.855,34.37],[136.865,34.35],[136.885,34.335],[136.9,34.32],[136.885,34.305],[136.9,34.288],[136.885,34.27],[136.86,34.255],[136.835,34.24],[136.81,34.225],[136.785,34.21],[136.755,34.195],[136.725,34.18],[136.695,34.165],[136.665,34.15],[136.635,34.135],[136.605,34.12],[136.575,34.1],[136.545,34.08],[136.52,34.055],[136.5,34.03],[136.485,34.005],[136.465,33.98],[136.44,33.955],[136.415,33.93],[136.39,33.905],[136.365,33.88],[136.335,33.855],[136.305,33.83],[136.275,33.805],[136.245,33.78],[136.215,33.755],[136.185,33.73],[136.155,33.705],[136.12,33.685],[136.085,33.665],[136.05,33.645],[136.02,33.625],[135.995,33.6],[135.97,33.575],[135.945,33.55],[135.92,33.525],[135.895,33.5],[135.87,33.475],[135.84,33.455],[135.805,33.44],[135.762,33.433],[135.735,33.46],[135.715,33.485],[135.7,33.51],[135.685,33.535],[135.665,33.56],[135.64,33.585],[135.615,33.61],[135.585,33.63],[135.555,33.65],[135.52,33.665],[135.485,33.68],[135.455,33.7],[135.435,33.725],[135.42,33.75],[135.405,33.775],[135.4,33.8],[135.395,33.825],[135.39,33.85],[135.375,33.875],[135.355,33.9],[135.33,33.925],[135.305,33.95],[135.28,33.975],[135.255,34],[135.23,34.025],[135.21,34.05],[135.19,34.075],[135.175,34.1],[135.165,34.125],[135.16,34.15],[135.16,34.175],[135.165,34.2],[135.17,34.225],[135.18,34.25],[135.19,34.275],[135.2,34.3],[135.215,34.325],[135.235,34.35],[135.26,34.375],[135.285,34.4],[135.31,34.425],[135.335,34.45],[135.36,34.475],[135.38,34.5],[135.395,34.525],[135.41,34.55],[135.42,34.575],[135.43,34.6],[135.435,34.625],[135.44,34.65],[135.44,34.675],[135.425,34.695],[135.4,34.705],[135.375,34.71],[135.35,34.712],[135.325,34.712],[135.3,34.708],[135.275,34.702],[135.25,34.698],[135.225,34.696],[135.2,34.7],[135.175,34.712],[135.15,34.725],[135.12,34.74],[135.09,34.752],[135.055,34.762],[135.02,34.77],[134.985,34.775],[134.95,34.778],[134.915,34.778],[134.88,34.775],[134.845,34.77],[134.81,34.762],[134.775,34.755],[134.74,34.75],[134.705,34.748],[134.67,34.745],[134.635,34.74],[134.6,34.732],[134.565,34.722],[134.53,34.712],[134.495,34.702],[134.46,34.69],[134.425,34.678],[134.39,34.665],[134.355,34.652],[134.32,34.638],[134.285,34.622],[134.25,34.605],[134.215,34.588],[134.18,34.57],[134.145,34.552],[134.11,34.535],[134.075,34.518],[134.04,34.502],[134.005,34.488],[133.97,34.475],[133.935,34.462],[133.9,34.452],[133.865,34.445],[133.83,34.442],[133.795,34.442],[133.76,34.438],[133.725,34.432],[133.69,34.425],[133.655,34.418],[133.62,34.41],[133.585,34.402],[133.55,34.395],[133.515,34.388],[133.48,34.38],[133.445,34.372],[133.41,34.362],[133.375,34.352],[133.34,34.342],[133.305,34.335],[133.27,34.328],[133.235,34.322],[133.2,34.318],[133.165,34.318],[133.13,34.322],[133.095,34.33],[133.06,34.34],[133.025,34.35],[132.99,34.358],[132.955,34.362],[132.92,34.36],[132.885,34.352],[132.85,34.342],[132.815,34.332],[132.78,34.322],[132.745,34.312],[132.71,34.302],[132.675,34.29],[132.64,34.278],[132.605,34.265],[132.57,34.252],[132.535,34.24],[132.5,34.228],[132.465,34.215],[132.43,34.2],[132.4,34.182],[132.375,34.162],[132.355,34.14],[132.335,34.118],[132.315,34.095],[132.29,34.072],[132.26,34.05],[132.225,34.032],[132.19,34.018],[132.155,34.008],[132.12,34.005],[132.085,34.008],[132.05,34.015],[132.015,34.022],[131.98,34.025],[131.945,34.022],[131.91,34.015],[131.875,34.008],[131.84,34],[131.805,33.995],[131.77,33.99],[131.735,33.985],[131.7,33.982],[131.665,33.98],[131.63,33.978],[131.595,33.975],[131.56,33.972],[131.525,33.968],[131.49,33.965],[131.455,33.962],[131.42,33.958],[131.385,33.955],[131.35,33.952],[131.315,33.948],[131.28,33.945],[131.245,33.942],[131.21,33.94],[131.175,33.94],[131.14,33.942],[131.105,33.945],[131.07,33.95],[131.035,33.955],[131,33.958],[130.965,33.956],[130.938,33.951],[130.9,33.99],[130.885,34.03],[130.878,34.07],[130.878,34.11],[130.882,34.15],[130.888,34.19],[130.898,34.23],[130.912,34.27],[130.932,34.31],[130.958,34.35],[130.99,34.385],[131.028,34.415],[131.07,34.435],[131.112,34.448],[131.155,34.458],[131.198,34.472],[131.24,34.49],[131.28,34.512],[131.32,34.535],[131.36,34.558],[131.4,34.582],[131.44,34.605],[131.48,34.628],[131.52,34.65],[131.56,34.668],[131.6,34.685],[131.64,34.7],[131.68,34.715],[131.72,34.728],[131.76,34.74],[131.8,34.752],[131.845,34.758],[131.885,34.775],[131.925,34.8],[131.965,34.825],[132.005,34.85],[132.045,34.875],[132.085,34.9],[132.125,34.925],[132.165,34.95],[132.205,34.975],[132.245,35],[132.285,35.025],[132.325,35.05],[132.365,35.075],[132.405,35.1],[132.445,35.125],[132.485,35.15],[132.525,35.175],[132.565,35.2],[132.605,35.225],[132.645,35.25],[132.685,35.275],[132.725,35.3],[132.765,35.325],[132.805,35.35],[132.845,35.375],[132.885,35.4],[132.925,35.42],[132.965,35.435],[133.005,35.445],[133.04,35.47],[133.065,35.5],[133.078,35.53],[133.088,35.555],[133.12,35.56],[133.155,35.552],[133.19,35.538],[133.22,35.518],[133.245,35.495],[133.28,35.485],[133.315,35.492],[133.35,35.505],[133.385,35.52],[133.42,35.532],[133.455,35.54],[133.49,35.545],[133.525,35.548],[133.56,35.55],[133.595,35.548],[133.63,35.542],[133.665,35.535],[133.7,35.53],[133.735,35.528],[133.77,35.528],[133.805,35.528],[133.84,35.528],[133.875,35.528],[133.91,35.528],[133.945,35.53],[133.98,35.532],[134.015,35.532],[134.05,35.532],[134.085,35.532],[134.12,35.535],[134.155,35.538],[134.19,35.542],[134.225,35.548],[134.26,35.558],[134.295,35.572],[134.33,35.588],[134.365,35.602],[134.4,35.612],[134.435,35.618],[134.47,35.62],[134.505,35.62],[134.54,35.625],[134.575,35.632],[134.61,35.64],[134.645,35.648],[134.68,35.655],[134.715,35.662],[134.75,35.668],[134.785,35.675],[134.82,35.682],[134.855,35.688],[134.89,35.695],[134.925,35.702],[134.96,35.712],[134.995,35.725],[135.03,35.74],[135.065,35.755],[135.1,35.768],[135.14,35.778],[135.185,35.782],[135.22,35.762],[135.25,35.74],[135.275,35.715],[135.295,35.69],[135.31,35.665],[135.325,35.64],[135.335,35.615],[135.34,35.59],[135.345,35.565],[135.36,35.545],[135.385,35.528],[135.41,35.512],[135.44,35.5],[135.475,35.495],[135.51,35.498],[135.545,35.505],[135.58,35.512],[135.615,35.518],[135.65,35.525],[135.685,35.532],[135.72,35.54],[135.755,35.548],[135.79,35.556],[135.825,35.565],[135.86,35.575],[135.895,35.585],[135.93,35.595],[135.965,35.605],[136,35.615],[136.035,35.625],[136.062,35.638],[136.078,35.658],[136.068,35.682],[136.055,35.702],[136.04,35.722],[136.022,35.742],[136.005,35.762],[135.99,35.782],[135.978,35.802],[135.968,35.822],[135.96,35.842],[135.955,35.862],[135.952,35.882],[135.952,35.902],[135.955,35.922],[135.958,35.942],[135.965,35.962],[135.982,35.978],[136.008,36],[136.04,36.025],[136.072,36.05],[136.105,36.075],[136.138,36.1],[136.17,36.125],[136.202,36.15],[136.232,36.175],[136.26,36.2],[136.285,36.225],[136.31,36.25],[136.335,36.275],[136.36,36.3],[136.385,36.325],[136.41,36.35],[136.435,36.375],[136.46,36.4],[136.485,36.425],[136.51,36.45],[136.535,36.475],[136.56,36.5],[136.585,36.525],[136.61,36.55],[136.635,36.575],[136.655,36.6],[136.672,36.625],[136.685,36.65],[136.695,36.675],[136.702,36.7],[136.71,36.725],[136.718,36.75],[136.725,36.775],[136.732,36.8],[136.74,36.825],[136.748,36.85],[136.755,36.875],[136.762,36.9],[136.77,36.925],[136.778,36.95],[136.788,36.975],[136.798,37],[136.808,37.025],[136.818,37.05],[136.828,37.075],[136.838,37.1],[136.848,37.125],[136.858,37.15],[136.868,37.175],[136.878,37.2],[136.888,37.225],[136.895,37.25],[136.9,37.275],[136.905,37.3],[136.908,37.325],[136.912,37.35],[136.915,37.375],[136.918,37.4],[136.918,37.425],[136.918,37.45],[136.918,37.475],[136.918,37.5],[136.922,37.522],[136.965,37.51],[137.005,37.492],[137.042,37.472],[137.078,37.452],[137.11,37.43],[137.14,37.408],[137.168,37.385],[137.195,37.36],[137.22,37.335],[137.245,37.31],[137.268,37.285],[137.288,37.26],[137.302,37.235],[137.298,37.21],[137.282,37.185],[137.262,37.16],[137.242,37.135],[137.222,37.11],[137.202,37.085],[137.182,37.06],[137.165,37.035],[137.148,37.01],[137.132,36.985],[137.118,36.96],[137.105,36.935],[137.095,36.91],[137.085,36.885],[137.075,36.86],[137.07,36.835],[137.072,36.81],[137.09,36.79],[137.122,36.788],[137.152,36.8],[137.18,36.818],[137.208,36.838],[137.235,36.858],[137.262,36.878],[137.29,36.898],[137.32,36.918],[137.35,36.935],[137.382,36.952],[137.415,36.968],[137.448,36.982],[137.482,36.995],[137.518,37.005],[137.555,37.015],[137.592,37.022],[137.628,37.028],[137.665,37.032],[137.702,37.035],[137.738,37.038],[137.775,37.042],[137.812,37.048],[137.848,37.058],[137.885,37.07],[137.92,37.085],[137.955,37.1],[137.99,37.112],[138.025,37.122],[138.06,37.132],[138.095,37.14],[138.13,37.148],[138.165,37.155],[138.2,37.162],[138.235,37.17],[138.27,37.18],[138.305,37.192],[138.34,37.205],[138.375,37.218],[138.41,37.232],[138.445,37.248],[138.478,37.265],[138.51,37.285],[138.54,37.305],[138.568,37.325],[138.595,37.348],[138.622,37.372],[138.648,37.395],[138.672,37.42],[138.695,37.445],[138.718,37.47],[138.74,37.495],[138.762,37.52],[138.782,37.545],[138.802,37.57],[138.822,37.595],[138.842,37.62],[138.86,37.645],[138.878,37.67],[138.895,37.695],[138.912,37.72],[138.928,37.745],[138.945,37.77],[138.962,37.795],[138.978,37.82],[138.995,37.845],[139.012,37.87],[139.03,37.895],[139.048,37.918],[139.062,37.94],[139.088,37.965],[139.115,37.99],[139.142,38.015],[139.168,38.04],[139.195,38.065],[139.222,38.09],[139.248,38.115],[139.275,38.14],[139.3,38.165],[139.325,38.19],[139.35,38.215],[139.375,38.24],[139.4,38.265],[139.422,38.29],[139.442,38.315],[139.462,38.34],[139.482,38.365],[139.502,38.39],[139.518,38.415],[139.535,38.44],[139.548,38.465],[139.562,38.49],[139.575,38.515],[139.585,38.54],[139.595,38.565],[139.605,38.59],[139.618,38.615],[139.632,38.64],[139.648,38.665],[139.665,38.69],[139.685,38.715],[139.705,38.74],[139.725,38.765],[139.745,38.79],[139.765,38.815],[139.785,38.84],[139.808,38.865],[139.832,38.89],[139.858,38.915],[139.882,38.94],[139.905,38.965],[139.925,38.99],[139.945,39.015],[139.962,39.04],[139.978,39.065],[139.995,39.09],[140.012,39.115],[140.025,39.14],[140.035,39.165],[140.042,39.19],[140.045,39.215],[140.045,39.24],[140.045,39.265],[140.045,39.29],[140.045,39.315],[140.045,39.34],[140.048,39.365],[140.05,39.39],[140.052,39.415],[140.052,39.44],[140.052,39.465],[140.055,39.49],[140.058,39.515],[140.058,39.54],[140.058,39.565],[140.058,39.59],[140.058,39.615],[140.058,39.64],[140.058,39.665],[140.06,39.69],[140.062,39.715],[140.02,39.745],[139.985,39.775],[139.945,39.8],[139.905,39.825],[139.865,39.85],[139.828,39.875],[139.792,39.9],[139.762,39.928],[139.735,39.955],[139.712,39.978],[139.698,39.995],[139.73,40.008],[139.768,40.005],[139.805,39.995],[139.842,39.982],[139.878,39.965],[139.915,39.948],[139.952,39.935],[139.99,39.932],[140.028,39.945],[140.058,39.968],[140.075,39.995],[140.082,40.025],[140.082,40.055],[140.078,40.085],[140.072,40.115],[140.062,40.145],[140.05,40.175],[140.035,40.205],[140.02,40.235],[140.008,40.265],[139.998,40.295],[139.99,40.325],[139.982,40.355],[139.972,40.385],[139.962,40.415],[139.955,40.445],[139.952,40.475],[139.955,40.505],[139.965,40.535],[139.985,40.562],[140.008,40.588],[140.032,40.612],[140.058,40.635],[140.082,40.658],[140.105,40.682],[140.128,40.708],[140.148,40.735],[140.168,40.762],[140.188,40.788],[140.208,40.815],[140.228,40.842],[140.248,40.868],[140.265,40.895],[140.28,40.922],[140.292,40.948],[140.302,40.975],[140.312,41.002],[140.318,41.028],[140.322,41.055],[140.325,41.082],[140.328,41.108],[140.33,41.135],[140.332,41.162],[140.335,41.19],[140.338,41.222]],"kyushu":[[130.995,33.958],[131.03,33.935],[131.065,33.912],[131.1,33.888],[131.135,33.865],[131.17,33.842],[131.205,33.818],[131.24,33.795],[131.275,33.772],[131.31,33.748],[131.345,33.725],[131.38,33.702],[131.412,33.678],[131.442,33.652],[131.468,33.625],[131.492,33.598],[131.512,33.572],[131.528,33.545],[131.54,33.518],[131.548,33.492],[131.552,33.465],[131.552,33.438],[131.548,33.412],[131.542,33.385],[131.535,33.358],[131.528,33.332],[131.522,33.305],[131.508,33.282],[131.488,33.262],[131.462,33.248],[131.435,33.242],[131.612,33.238],[131.638,33.222],[131.662,33.205],[131.688,33.188],[131.715,33.172],[131.742,33.155],[131.768,33.138],[131.795,33.122],[131.822,33.108],[131.85,33.095],[131.878,33.082],[131.905,33.068],[131.932,33.052],[131.958,33.035],[131.982,33.018],[132.005,33],[132.028,32.982],[132.052,32.965],[132.078,32.952],[132.082,32.958],[132.058,32.932],[132.032,32.908],[132.008,32.885],[131.982,32.862],[131.958,32.838],[131.932,32.815],[131.908,32.792],[131.885,32.768],[131.862,32.745],[131.838,32.722],[131.815,32.698],[131.792,32.675],[131.768,32.652],[131.745,32.628],[131.722,32.605],[131.702,32.582],[131.685,32.558],[131.672,32.532],[131.662,32.508],[131.652,32.482],[131.645,32.458],[131.638,32.432],[131.632,32.408],[131.625,32.382],[131.618,32.358],[131.608,32.332],[131.598,32.308],[131.585,32.285],[131.572,32.262],[131.558,32.238],[131.545,32.215],[131.532,32.192],[131.518,32.168],[131.505,32.145],[131.492,32.122],[131.482,32.098],[131.472,32.075],[131.465,32.052],[131.458,32.028],[131.452,32.005],[131.448,31.982],[131.445,31.958],[131.442,31.935],[131.44,31.912],[131.44,31.888],[131.44,31.865],[131.44,31.842],[131.44,31.818],[131.44,31.795],[131.442,31.772],[131.442,31.748],[131.442,31.725],[131.442,31.702],[131.44,31.678],[131.438,31.655],[131.432,31.632],[131.425,31.608],[131.418,31.585],[131.41,31.562],[131.402,31.538],[131.392,31.515],[131.382,31.492],[131.372,31.468],[131.36,31.445],[131.348,31.422],[131.34,31.398],[131.338,31.375],[131.34,31.358],[131.3,31.348],[131.26,31.342],[131.22,31.34],[131.182,31.345],[131.145,31.355],[131.11,31.368],[131.078,31.385],[131.048,31.402],[131.02,31.42],[130.995,31.44],[130.972,31.462],[130.952,31.485],[130.935,31.508],[130.922,31.532],[130.912,31.555],[130.902,31.578],[130.892,31.602],[130.878,31.625],[130.862,31.648],[130.845,31.67],[130.822,31.69],[130.798,31.708],[130.772,31.725],[130.745,31.74],[130.718,31.752],[130.69,31.758],[130.672,31.75],[130.668,31.728],[130.672,31.705],[130.678,31.682],[130.678,31.658],[130.672,31.635],[130.665,31.612],[130.658,31.588],[130.652,31.565],[130.645,31.542],[130.638,31.518],[130.632,31.495],[130.628,31.472],[130.628,31.448],[130.632,31.425],[130.638,31.402],[130.648,31.378],[130.658,31.355],[130.668,31.332],[130.678,31.308],[130.688,31.285],[130.695,31.262],[130.7,31.238],[130.702,31.215],[130.702,31.192],[130.7,31.168],[130.695,31.145],[130.688,31.122],[130.678,31.098],[130.668,31.075],[130.665,31.052],[130.665,31.028],[130.665,31.005],[130.658,30.995],[130.635,31.015],[130.612,31.038],[130.592,31.062],[130.572,31.085],[130.552,31.108],[130.535,31.132],[130.518,31.155],[130.502,31.178],[130.492,31.202],[130.488,31.225],[130.492,31.248],[130.498,31.272],[130.505,31.295],[130.512,31.318],[130.518,31.342],[130.522,31.365],[130.518,31.388],[130.51,31.412],[130.498,31.435],[130.485,31.458],[130.468,31.478],[130.445,31.495],[130.42,31.512],[130.395,31.528],[130.37,31.542],[130.342,31.555],[130.315,31.568],[130.288,31.582],[130.262,31.598],[130.238,31.618],[130.218,31.638],[130.202,31.66],[130.19,31.682],[130.182,31.705],[130.178,31.728],[130.178,31.752],[130.178,31.775],[130.178,31.798],[130.178,31.822],[130.178,31.845],[130.18,31.868],[130.182,31.892],[130.185,31.915],[130.188,31.938],[130.192,31.962],[130.195,31.985],[130.198,32.008],[130.2,32.032],[130.202,32.055],[130.205,32.078],[130.208,32.102],[130.212,32.125],[130.218,32.148],[130.225,32.172],[130.235,32.195],[130.248,32.218],[130.262,32.24],[130.28,32.262],[130.298,32.282],[130.318,32.302],[130.338,32.322],[130.358,32.342],[130.378,32.362],[130.398,32.382],[130.418,32.402],[130.438,32.422],[130.458,32.442],[130.478,32.462],[130.498,32.482],[130.518,32.502],[130.538,32.522],[130.558,32.542],[130.578,32.562],[130.598,32.582],[130.618,32.602],[130.635,32.622],[130.652,32.642],[130.665,32.662],[130.678,32.682],[130.688,32.702],[130.698,32.722],[130.705,32.742],[130.71,32.762],[130.712,32.782],[130.712,32.802],[130.71,32.822],[130.715,32.842],[130.72,32.862],[130.702,32.878],[130.678,32.888],[130.652,32.895],[130.625,32.898],[130.598,32.898],[130.572,32.895],[130.545,32.888],[130.518,32.878],[130.492,32.865],[130.468,32.848],[130.445,32.83],[130.425,32.812],[130.408,32.792],[130.392,32.772],[130.378,32.752],[130.365,32.732],[130.352,32.712],[130.335,32.695],[130.312,32.678],[130.288,32.665],[130.262,32.652],[130.238,32.638],[130.215,32.622],[130.195,32.605],[130.178,32.585],[130.165,32.565],[130.155,32.542],[130.148,32.518],[130.145,32.495],[130.148,32.472],[130.158,32.452],[130.175,32.435],[130.198,32.422],[130.222,32.412],[130.248,32.408],[130.275,32.408],[130.302,32.412],[130.328,32.42],[130.352,32.432],[130.372,32.448],[130.388,32.468],[130.398,32.49],[130.408,32.518],[130.412,32.545],[130.408,32.572],[130.398,32.598],[130.382,32.622],[130.362,32.642],[130.338,32.658],[130.312,32.672],[130.288,32.688],[130.268,32.708],[130.255,32.732],[130.248,32.758],[130.245,32.785],[130.242,32.812],[130.232,32.838],[130.212,32.858],[130.185,32.868],[130.158,32.868],[130.132,32.858],[130.108,32.842],[130.088,32.822],[130.072,32.8],[130.058,32.778],[130.042,32.758],[130.018,32.745],[129.992,32.742],[129.968,32.75],[129.948,32.765],[129.932,32.782],[129.912,32.798],[129.888,32.808],[129.862,32.808],[129.838,32.798],[129.818,32.782],[129.802,32.762],[129.788,32.742],[129.868,32.752],[129.855,32.735],[129.838,32.718],[129.815,32.708],[129.79,32.705],[129.765,32.712],[129.748,32.728],[129.738,32.748],[129.735,32.772],[129.738,32.798],[129.745,32.822],[129.752,32.845],[129.755,32.868],[129.752,32.892],[129.742,32.915],[129.728,32.935],[129.712,32.952],[129.695,32.968],[129.685,32.988],[129.682,33.012],[129.685,33.035],[129.692,33.058],[129.705,33.078],[129.722,33.095],[129.745,33.108],[129.768,33.118],[129.788,33.132],[129.802,33.152],[129.808,33.175],[129.808,33.198],[129.802,33.222],[129.788,33.242],[129.768,33.258],[129.745,33.272],[129.725,33.288],[129.712,33.308],[129.708,33.332],[129.712,33.355],[129.722,33.378],[129.738,33.398],[129.758,33.415],[129.782,33.428],[129.805,33.438],[129.828,33.448],[129.852,33.462],[129.875,33.478],[129.898,33.492],[129.925,33.502],[129.952,33.508],[129.978,33.512],[130.005,33.515],[130.032,33.518],[130.058,33.518],[130.085,33.515],[130.112,33.508],[130.138,33.498],[130.162,33.485],[130.185,33.472],[130.208,33.462],[130.235,33.458],[130.262,33.462],[130.288,33.472],[130.31,33.488],[130.328,33.508],[130.342,33.532],[130.352,33.555],[130.362,33.578],[130.375,33.598],[130.395,33.615],[130.418,33.628],[130.442,33.638],[130.465,33.648],[130.488,33.662],[130.508,33.678],[130.528,33.695],[130.548,33.712],[130.568,33.728],[130.592,33.742],[130.615,33.755],[130.638,33.768],[130.662,33.782],[130.685,33.798],[130.705,33.815],[130.725,33.832],[130.748,33.848],[130.772,33.862],[130.795,33.875],[130.818,33.888],[130.845,33.898],[130.872,33.908],[130.898,33.918],[130.925,33.928],[130.952,33.938],[130.975,33.948]],"shikoku":[[134.642,34.242],[134.632,34.218],[134.622,34.195],[134.612,34.172],[134.605,34.148],[134.602,34.125],[134.602,34.102],[134.605,34.078],[134.612,34.055],[134.622,34.032],[134.635,34.008],[134.652,33.985],[134.672,33.962],[134.695,33.942],[134.718,33.925],[134.742,33.912],[134.748,33.842],[134.735,33.818],[134.712,33.795],[134.688,33.772],[134.665,33.748],[134.642,33.725],[134.618,33.702],[134.595,33.678],[134.572,33.655],[134.548,33.632],[134.525,33.608],[134.502,33.585],[134.478,33.562],[134.455,33.538],[134.432,33.515],[134.408,33.492],[134.385,33.468],[134.362,33.445],[134.338,33.422],[134.315,33.398],[134.292,33.375],[134.268,33.352],[134.245,33.328],[134.222,33.305],[134.198,33.282],[134.185,33.262],[134.178,33.245],[134.145,33.268],[134.112,33.288],[134.078,33.308],[134.045,33.328],[134.012,33.348],[133.978,33.368],[133.945,33.388],[133.912,33.408],[133.878,33.428],[133.845,33.448],[133.812,33.468],[133.778,33.488],[133.745,33.505],[133.712,33.518],[133.678,33.525],[133.645,33.522],[133.612,33.512],[133.582,33.498],[133.552,33.482],[133.525,33.462],[133.498,33.442],[133.472,33.422],[133.445,33.402],[133.418,33.382],[133.392,33.362],[133.368,33.342],[133.345,33.322],[133.325,33.298],[133.308,33.275],[133.292,33.252],[133.278,33.228],[133.262,33.205],[133.245,33.182],[133.228,33.158],[133.212,33.135],[133.195,33.112],[133.178,33.088],[133.162,33.065],[133.145,33.042],[133.128,33.018],[133.112,32.995],[133.098,32.972],[133.088,32.948],[133.082,32.925],[133.078,32.902],[133.078,32.878],[133.082,32.855],[133.088,32.832],[133.098,32.808],[133.108,32.785],[133.115,32.762],[133.018,32.725],[132.985,32.752],[132.962,32.775],[132.942,32.798],[132.918,32.815],[132.895,32.828],[132.872,32.842],[132.852,32.858],[132.835,32.878],[132.828,32.902],[132.828,32.925],[132.822,32.948],[132.808,32.968],[132.788,32.985],[132.768,33.002],[132.752,33.022],[132.742,33.045],[132.738,33.068],[132.725,33.088],[132.705,33.105],[132.682,33.118],[132.662,33.135],[132.648,33.155],[132.642,33.178],[132.628,33.198],[132.608,33.215],[132.588,33.232],[132.572,33.252],[132.558,33.272],[132.538,33.288],[132.512,33.298],[132.492,33.312],[132.478,33.332],[132.472,33.355],[132.472,33.378],[132.462,33.398],[132.442,33.415],[132.422,33.432],[132.408,33.452],[132.402,33.475],[132.398,33.498],[132.385,33.518],[132.365,33.535],[132.348,33.552],[132.335,33.572],[132.332,33.595],[132.338,33.618],[132.352,33.638],[132.372,33.655],[132.392,33.672],[132.412,33.692],[132.432,33.712],[132.452,33.732],[132.472,33.752],[132.492,33.772],[132.512,33.792],[132.535,33.808],[132.558,33.822],[132.582,33.838],[132.605,33.855],[132.628,33.872],[132.652,33.888],[132.675,33.902],[132.698,33.918],[132.722,33.935],[132.745,33.952],[132.768,33.968],[132.792,33.982],[132.818,33.995],[132.845,34.008],[132.868,34.022],[132.892,34.038],[132.912,34.055],[132.932,34.072],[132.955,34.088],[132.978,34.102],[133.005,34.112],[133.032,34.122],[133.058,34.132],[133.085,34.142],[133.112,34.152],[133.138,34.162],[133.165,34.172],[133.192,34.182],[133.218,34.192],[133.245,34.202],[133.272,34.212],[133.298,34.222],[133.325,34.232],[133.352,34.245],[133.378,34.258],[133.402,34.272],[133.425,34.288],[133.448,34.302],[133.472,34.315],[133.498,34.325],[133.525,34.332],[133.552,34.338],[133.578,34.342],[133.605,34.345],[133.632,34.345],[133.658,34.342],[133.685,34.338],[133.712,34.335],[133.738,34.335],[133.765,34.338],[133.792,34.342],[133.818,34.345],[133.845,34.348],[133.872,34.348],[133.898,34.345],[133.925,34.342],[133.952,34.34],[133.978,34.34],[134.005,34.345],[134.032,34.352],[134.058,34.358],[134.085,34.362],[134.112,34.362],[134.138,34.358],[134.165,34.352],[134.192,34.345],[134.218,34.338],[134.245,34.328],[134.272,34.318],[134.298,34.308],[134.325,34.298],[134.352,34.288],[134.378,34.278],[134.405,34.268],[134.432,34.258],[134.458,34.252],[134.485,34.245],[134.512,34.242],[134.538,34.24],[134.565,34.24],[134.592,34.242],[134.618,34.242]],"okinawa":[[128.258,26.872],[128.288,26.855],[128.302,26.832],[128.312,26.808],[128.318,26.782],[128.315,26.758],[128.305,26.735],[128.292,26.712],[128.275,26.692],[128.255,26.672],[128.232,26.652],[128.212,26.632],[128.192,26.612],[128.172,26.592],[128.152,26.572],[128.128,26.552],[128.108,26.532],[128.088,26.512],[128.062,26.492],[128.038,26.472],[128.015,26.452],[127.992,26.432],[127.972,26.412],[127.952,26.392],[127.932,26.372],[127.912,26.352],[127.892,26.332],[127.872,26.312],[127.852,26.292],[127.832,26.272],[127.812,26.252],[127.792,26.232],[127.772,26.212],[127.752,26.192],[127.732,26.172],[127.715,26.152],[127.698,26.132],[127.685,26.112],[127.678,26.092],[127.685,26.078],[127.662,26.088],[127.648,26.108],[127.652,26.132],[127.665,26.152],[127.678,26.172],[127.685,26.192],[127.685,26.212],[127.688,26.232],[127.698,26.252],[127.712,26.272],[127.728,26.292],[127.745,26.312],[127.762,26.332],[127.778,26.352],[127.792,26.372],[127.812,26.392],[127.832,26.412],[127.852,26.432],[127.872,26.452],[127.892,26.472],[127.912,26.492],[127.932,26.512],[127.952,26.532],[127.972,26.552],[127.995,26.572],[128.018,26.592],[128.042,26.612],[128.065,26.632],[128.088,26.652],[128.108,26.672],[128.128,26.692],[128.148,26.712],[128.168,26.732],[128.188,26.752],[128.205,26.772],[128.222,26.792],[128.235,26.812],[128.245,26.832],[128.252,26.852]],"sado":[[138.518,38.332],[138.485,38.315],[138.455,38.292],[138.428,38.268],[138.402,38.242],[138.375,38.215],[138.348,38.188],[138.322,38.158],[138.298,38.128],[138.275,38.098],[138.258,38.068],[138.245,38.038],[138.238,38.008],[138.238,37.978],[138.245,37.948],[138.258,37.918],[138.278,37.892],[138.302,37.872],[138.332,37.858],[138.362,37.852],[138.392,37.858],[138.418,37.875],[138.442,37.898],[138.462,37.925],[138.478,37.955],[138.492,37.985],[138.505,38.015],[138.518,38.045],[138.532,38.075],[138.545,38.105],[138.552,38.135],[138.558,38.165],[138.562,38.195],[138.562,38.225],[138.558,38.255],[138.552,38.285],[138.538,38.312]],"awaji":[[134.982,34.578],[135.002,34.558],[135.015,34.532],[135.018,34.505],[135.012,34.478],[135.002,34.452],[134.988,34.425],[134.968,34.398],[134.945,34.372],[134.918,34.348],[134.888,34.328],[134.858,34.312],[134.825,34.298],[134.792,34.29],[134.758,34.288],[134.728,34.298],[134.708,34.318],[134.702,34.345],[134.708,34.372],[134.722,34.398],[134.742,34.422],[134.765,34.445],[134.788,34.468],[134.812,34.492],[134.838,34.512],[134.865,34.532],[134.895,34.552],[134.928,34.568],[134.955,34.578]],"tsushima":[[129.462,34.702],[129.492,34.678],[129.502,34.652],[129.498,34.625],[129.482,34.598],[129.462,34.572],[129.442,34.545],[129.425,34.518],[129.415,34.492],[129.405,34.465],[129.388,34.438],[129.368,34.412],[129.348,34.385],[129.332,34.358],[129.318,34.332],[129.302,34.305],[129.285,34.278],[129.268,34.252],[129.252,34.225],[129.235,34.198],[129.218,34.172],[129.202,34.145],[129.188,34.118],[129.175,34.092],[129.162,34.075],[129.142,34.098],[129.138,34.125],[129.148,34.152],[129.162,34.178],[129.178,34.205],[129.192,34.232],[129.205,34.258],[129.218,34.285],[129.228,34.312],[129.238,34.338],[129.248,34.365],[129.262,34.392],[129.278,34.418],[129.295,34.445],[129.312,34.472],[129.328,34.498],[129.342,34.525],[129.355,34.552],[129.368,34.578],[129.382,34.605],[129.398,34.632],[129.415,34.658],[129.438,34.682]],"iki":[[129.712,33.868],[129.742,33.858],[129.768,33.842],[129.788,33.822],[129.798,33.798],[129.795,33.772],[129.782,33.748],[129.762,33.728],[129.738,33.712],[129.712,33.702],[129.685,33.705],[129.662,33.718],[129.648,33.738],[129.645,33.762],[129.65,33.788],[129.662,33.812],[129.678,33.835],[129.695,33.855]],"hirado":[[129.418,33.402],[129.442,33.382],[129.455,33.358],[129.458,33.332],[129.452,33.305],[129.442,33.278],[129.428,33.252],[129.412,33.228],[129.392,33.208],[129.368,33.192],[129.342,33.185],[129.315,33.192],[129.298,33.212],[129.295,33.238],[129.302,33.265],[129.315,33.29],[129.332,33.315],[129.352,33.34],[129.372,33.362],[129.395,33.382]],"fukue":[[128.902,32.858],[128.932,32.842],[128.952,32.818],[128.958,32.792],[128.955,32.765],[128.945,32.738],[128.928,32.712],[128.908,32.688],[128.885,32.668],[128.858,32.652],[128.828,32.645],[128.798,32.652],[128.772,32.668],[128.755,32.692],[128.748,32.718],[128.752,32.745],[128.762,32.772],[128.778,32.798],[128.798,32.822],[128.822,32.842],[128.85,32.855],[128.878,32.86]],"nakadori":[[129.152,33.108],[129.178,33.092],[129.192,33.068],[129.192,33.042],[129.185,33.015],[129.172,32.988],[129.155,32.965],[129.132,32.945],[129.105,32.932],[129.078,32.925],[129.048,32.928],[129.022,32.942],[129.005,32.962],[129.002,32.988],[129.012,33.015],[129.028,33.038],[129.048,33.058],[129.072,33.078],[129.098,33.095],[129.125,33.105]],"hisaka":[[128.732,32.775],[128.752,32.762],[128.762,32.742],[128.755,32.722],[128.738,32.708],[128.718,32.708],[128.702,32.722],[128.698,32.742],[128.708,32.762]],"okiDogo":[[133.352,36.318],[133.382,36.302],[133.398,36.278],[133.402,36.252],[133.398,36.225],[133.385,36.198],[133.365,36.175],[133.342,36.158],[133.315,36.148],[133.288,36.148],[133.262,36.158],[133.242,36.178],[133.228,36.202],[133.225,36.228],[133.232,36.255],[133.245,36.28],[133.265,36.302],[133.292,36.315],[133.322,36.32]],"okiNishi":[[133.008,36.132],[133.032,36.115],[133.045,36.092],[133.042,36.068],[133.032,36.045],[133.015,36.025],[132.992,36.012],[132.968,36.008],[132.945,36.018],[132.928,36.038],[132.922,36.062],[132.928,36.088],[132.942,36.11],[132.965,36.125],[132.988,36.132]],"okiNaka":[[133.108,36.098],[133.128,36.082],[133.135,36.058],[133.128,36.035],[133.112,36.018],[133.09,36.012],[133.068,36.022],[133.058,36.042],[133.058,36.065],[133.07,36.085],[133.088,36.095]],"shodoshima":[[134.138,34.532],[134.172,34.528],[134.205,34.518],[134.238,34.508],[134.268,34.495],[134.295,34.478],[134.318,34.458],[134.332,34.435],[134.325,34.415],[134.302,34.402],[134.272,34.398],[134.242,34.402],[134.212,34.412],[134.185,34.425],[134.162,34.442],[134.142,34.462],[134.128,34.485],[134.128,34.508]],"naoshima":[[133.992,34.472],[134.012,34.462],[134.025,34.448],[134.022,34.432],[134.008,34.418],[133.99,34.412],[133.972,34.418],[133.962,34.435],[133.968,34.455],[133.978,34.468]],"teshima":[[134.098,34.492],[134.115,34.482],[134.122,34.468],[134.115,34.452],[134.098,34.445],[134.082,34.452],[134.075,34.468],[134.082,34.485]],"itsukushima":[[132.288,34.322],[132.315,34.312],[132.338,34.298],[132.352,34.278],[132.348,34.258],[132.328,34.245],[132.305,34.242],[132.282,34.248],[132.262,34.262],[132.255,34.282],[132.262,34.302],[132.275,34.315]],"omishima":[[132.985,34.298],[133.012,34.288],[133.038,34.272],[133.058,34.252],[133.062,34.228],[133.052,34.208],[133.032,34.195],[133.008,34.195],[132.985,34.205],[132.968,34.222],[132.958,34.245],[132.962,34.268],[132.972,34.288]],"innoshima":[[133.185,34.335],[133.212,34.328],[133.238,34.315],[133.252,34.295],[133.245,34.275],[133.222,34.265],[133.198,34.265],[133.175,34.275],[133.162,34.295],[133.168,34.318]],"ikuchi":[[133.09,34.318],[133.115,34.308],[133.135,34.292],[133.138,34.272],[133.125,34.255],[133.102,34.248],[133.078,34.255],[133.062,34.272],[133.062,34.295],[133.072,34.312]],"kurahashi":[[132.542,34.192],[132.568,34.182],[132.588,34.165],[132.592,34.145],[132.578,34.128],[132.555,34.122],[132.532,34.128],[132.518,34.145],[132.518,34.168],[132.528,34.185]],"etajima":[[132.435,34.235],[132.458,34.225],[132.472,34.208],[132.468,34.188],[132.448,34.178],[132.425,34.182],[132.412,34.198],[132.415,34.218],[132.425,34.232]],"amakusaShimo":[[130.198,32.602],[130.228,32.585],[130.252,32.562],[130.272,32.535],[130.282,32.508],[130.285,32.478],[130.278,32.448],[130.262,32.418],[130.242,32.392],[130.218,32.368],[130.192,32.348],[130.162,32.332],[130.132,32.322],[130.102,32.318],[130.072,32.325],[130.048,32.342],[130.032,32.365],[130.028,32.392],[130.035,32.418],[130.048,32.442],[130.068,32.465],[130.088,32.488],[130.108,32.512],[130.128,32.535],[130.148,32.558],[130.168,32.578],[130.185,32.592]],"amakusaKami":[[130.498,32.622],[130.522,32.608],[130.542,32.588],[130.552,32.565],[130.548,32.542],[130.538,32.518],[130.522,32.498],[130.502,32.482],[130.478,32.475],[130.455,32.482],[130.438,32.498],[130.428,32.522],[130.428,32.548],[130.438,32.572],[130.455,32.595],[130.475,32.612]],"nagashima":[[130.198,32.208],[130.222,32.192],[130.235,32.172],[130.232,32.148],[130.218,32.128],[130.195,32.118],[130.172,32.122],[130.155,32.138],[130.148,32.162],[130.155,32.185],[130.172,32.202]],"kamikoshiki":[[129.945,31.888],[129.968,31.872],[129.982,31.848],[129.978,31.825],[129.962,31.808],[129.938,31.802],[129.915,31.812],[129.902,31.832],[129.905,31.858],[129.922,31.878]],"shimokoshiki":[[129.928,31.775],[129.948,31.758],[129.955,31.735],[129.945,31.712],[129.925,31.698],[129.902,31.698],[129.882,31.712],[129.875,31.735],[129.885,31.758],[129.905,31.772]],"yakushima":[[130.512,30.452],[130.552,30.442],[130.588,30.425],[130.618,30.398],[130.638,30.368],[130.645,30.335],[130.638,30.302],[130.618,30.272],[130.592,30.248],[130.558,30.232],[130.522,30.225],[130.485,30.232],[130.452,30.248],[130.428,30.275],[130.412,30.308],[130.408,30.342],[130.415,30.375],[130.432,30.405],[130.458,30.432],[130.485,30.448]],"kuchinoerabu":[[130.222,30.472],[130.245,30.462],[130.258,30.442],[130.255,30.418],[130.238,30.402],[130.215,30.402],[130.198,30.418],[130.195,30.442],[130.205,30.462]],"tanegashima":[[130.988,30.832],[131.018,30.812],[131.038,30.788],[131.048,30.762],[131.048,30.735],[131.042,30.708],[131.032,30.682],[131.018,30.655],[131.002,30.628],[130.985,30.602],[130.968,30.575],[130.948,30.548],[130.928,30.522],[130.908,30.498],[130.885,30.478],[130.858,30.462],[130.832,30.458],[130.812,30.472],[130.808,30.495],[130.822,30.518],[130.842,30.542],[130.862,30.565],[130.882,30.588],[130.902,30.612],[130.918,30.638],[130.932,30.665],[130.945,30.692],[130.955,30.718],[130.962,30.745],[130.968,30.772],[130.975,30.798],[130.982,30.818]],"amamiOshima":[[129.712,28.532],[129.742,28.512],[129.768,28.488],[129.782,28.462],[129.782,28.435],[129.772,28.408],[129.755,28.382],[129.735,28.358],[129.712,28.335],[129.688,28.312],[129.662,28.288],[129.635,28.265],[129.608,28.242],[129.582,28.218],[129.555,28.195],[129.528,28.172],[129.502,28.148],[129.472,28.128],[129.442,28.112],[129.412,28.105],[129.382,28.112],[129.358,28.132],[129.348,28.158],[129.352,28.185],[129.368,28.208],[129.388,28.232],[129.412,28.255],[129.438,28.278],[129.462,28.302],[129.488,28.325],[129.512,28.348],[129.538,28.372],[129.562,28.395],[129.588,28.418],[129.612,28.442],[129.638,28.465],[129.662,28.488],[129.688,28.512]],"kikai":[[129.988,28.352],[130.012,28.338],[130.025,28.318],[130.022,28.295],[130.005,28.278],[129.982,28.275],[129.958,28.288],[129.948,28.312],[129.958,28.335],[129.972,28.35]],"tokunoshima":[[128.988,27.922],[129.015,27.905],[129.032,27.882],[129.035,27.855],[129.028,27.828],[129.012,27.802],[128.992,27.782],[128.968,27.772],[128.942,27.775],[128.922,27.792],[128.912,27.815],[128.915,27.842],[128.928,27.868],[128.948,27.892],[128.968,27.912]],"okinoerabu":[[128.698,27.422],[128.722,27.408],[128.735,27.388],[128.735,27.365],[128.725,27.342],[128.708,27.322],[128.685,27.312],[128.662,27.318],[128.648,27.338],[128.648,27.362],[128.658,27.385],[128.675,27.405]],"yoron":[[128.442,27.062],[128.462,27.052],[128.472,27.035],[128.468,27.015],[128.452,27.002],[128.432,27.002],[128.418,27.015],[128.415,27.035],[128.425,27.052]],"kume":[[126.828,26.382],[126.852,26.372],[126.868,26.352],[126.868,26.328],[126.855,26.308],[126.832,26.298],[126.808,26.302],[126.788,26.318],[126.782,26.342],[126.792,26.365],[126.808,26.378]],"iheya":[[127.978,27.052],[127.998,27.042],[128.012,27.025],[128.008,27.005],[127.992,26.992],[127.972,26.992],[127.958,27.005],[127.955,27.025],[127.962,27.042]],"izena":[[127.938,26.928],[127.955,26.918],[127.962,26.902],[127.955,26.885],[127.938,26.878],[127.922,26.885],[127.915,26.902],[127.922,26.918]],"ie":[[127.812,26.728],[127.832,26.718],[127.842,26.702],[127.835,26.685],[127.818,26.678],[127.798,26.685],[127.788,26.702],[127.795,26.718]],"tokashiki":[[127.358,26.222],[127.378,26.212],[127.385,26.195],[127.375,26.178],[127.358,26.168],[127.338,26.172],[127.322,26.188],[127.325,26.208],[127.34,26.218]],"zamami":[[127.302,26.238],[127.318,26.228],[127.322,26.212],[127.312,26.198],[127.295,26.198],[127.285,26.212],[127.288,26.228]],"kudaka":[[127.782,26.168],[127.795,26.158],[127.792,26.145],[127.778,26.142],[127.768,26.152],[127.772,26.165]],"miyako":[[125.312,24.948],[125.348,24.935],[125.382,24.918],[125.412,24.895],[125.442,24.868],[125.458,24.838],[125.462,24.808],[125.452,24.778],[125.432,24.752],[125.405,24.732],[125.375,24.718],[125.342,24.712],[125.308,24.715],[125.278,24.728],[125.252,24.752],[125.235,24.782],[125.228,24.812],[125.232,24.842],[125.242,24.872],[125.258,24.898],[125.278,24.922],[125.295,24.938]],"ikema":[[125.245,24.925],[125.258,24.918],[125.262,24.905],[125.252,24.895],[125.238,24.898],[125.232,24.912]],"irabu":[[125.162,24.852],[125.182,24.842],[125.192,24.825],[125.185,24.808],[125.168,24.798],[125.148,24.802],[125.135,24.818],[125.142,24.838]],"tarama":[[124.702,24.678],[124.718,24.672],[124.725,24.658],[124.718,24.645],[124.702,24.642],[124.688,24.652],[124.688,24.668]],"ishigaki":[[124.312,24.628],[124.342,24.612],[124.362,24.588],[124.372,24.562],[124.372,24.535],[124.362,24.508],[124.348,24.482],[124.328,24.458],[124.305,24.435],[124.278,24.412],[124.252,24.392],[124.222,24.375],[124.192,24.362],[124.162,24.358],[124.135,24.368],[124.112,24.388],[124.098,24.412],[124.098,24.438],[124.108,24.462],[124.125,24.485],[124.148,24.508],[124.172,24.532],[124.198,24.555],[124.225,24.578],[124.252,24.598],[124.282,24.615]],"taketomi":[[124.098,24.342],[124.115,24.335],[124.122,24.322],[124.115,24.308],[124.098,24.305],[124.085,24.315],[124.085,24.332]],"kohama":[[123.988,24.348],[124.005,24.338],[124.008,24.322],[123.995,24.312],[123.978,24.315],[123.972,24.332],[123.978,24.345]],"iriomote":[[123.918,24.458],[123.945,24.445],[123.968,24.425],[123.982,24.402],[123.985,24.375],[123.978,24.348],[123.962,24.322],[123.942,24.302],[123.915,24.288],[123.888,24.282],[123.858,24.285],[123.832,24.298],[123.812,24.318],[123.802,24.342],[123.805,24.368],[123.818,24.392],[123.838,24.412],[123.862,24.428],[123.888,24.442]],"hateruma":[[123.788,24.062],[123.802,24.055],[123.808,24.042],[123.802,24.028],[123.788,24.025],[123.775,24.035],[123.775,24.052]],"yonaguni":[[123.018,24.472],[123.038,24.462],[123.048,24.445],[123.042,24.428],[123.025,24.418],[123.005,24.422],[122.992,24.438],[122.998,24.458]],"rishiri":[[141.248,45.252],[141.278,45.242],[141.302,45.222],[141.318,45.198],[141.322,45.172],[141.315,45.145],[141.298,45.122],[141.275,45.105],[141.248,45.098],[141.222,45.105],[141.198,45.122],[141.185,45.145],[141.182,45.172],[141.188,45.198],[141.202,45.222],[141.222,45.242]],"rebun":[[141.038,45.462],[141.068,45.452],[141.092,45.432],[141.105,45.408],[141.108,45.382],[141.102,45.355],[141.088,45.332],[141.068,45.312],[141.042,45.302],[141.015,45.302],[140.988,45.312],[140.968,45.332],[140.958,45.358],[140.962,45.385],[140.975,45.412],[140.995,45.435],[141.018,45.452]],"okushiri":[[139.512,42.262],[139.542,42.248],[139.562,42.225],[139.572,42.198],[139.568,42.172],[139.555,42.145],[139.538,42.122],[139.515,42.105],[139.488,42.098],[139.462,42.105],[139.442,42.122],[139.432,42.148],[139.435,42.175],[139.448,42.202],[139.468,42.228],[139.492,42.248]],"teuri":[[141.318,44.425],[141.335,44.415],[141.342,44.398],[141.335,44.382],[141.318,44.375],[141.302,44.382],[141.295,44.398],[141.302,44.415]],"yagishiri":[[141.375,44.442],[141.392,44.432],[141.398,44.415],[141.388,44.402],[141.372,44.402],[141.362,44.415],[141.365,44.432]],"izuOshima":[[139.408,34.842],[139.435,34.828],[139.455,34.808],[139.462,34.782],[139.455,34.758],[139.438,34.738],[139.415,34.725],[139.388,34.722],[139.362,34.732],[139.342,34.752],[139.332,34.778],[139.335,34.805],[139.348,34.828],[139.372,34.842]],"niijima":[[139.278,34.425],[139.298,34.412],[139.305,34.392],[139.298,34.372],[139.282,34.358],[139.262,34.352],[139.242,34.358],[139.232,34.375],[139.235,34.398],[139.248,34.415]],"kozushima":[[139.148,34.222],[139.168,34.212],[139.178,34.195],[139.172,34.178],[139.155,34.168],[139.135,34.172],[139.122,34.188],[139.125,34.208],[139.135,34.22]],"miyakejima":[[139.548,34.122],[139.572,34.112],[139.585,34.092],[139.582,34.068],[139.565,34.052],[139.542,34.045],[139.518,34.052],[139.505,34.072],[139.508,34.095],[139.525,34.115]],"mikura":[[139.602,33.878],[139.618,33.868],[139.622,33.852],[139.612,33.838],[139.595,33.838],[139.588,33.852],[139.592,33.868]],"hachijo":[[139.822,33.152],[139.845,33.138],[139.858,33.118],[139.855,33.095],[139.842,33.075],[139.822,33.062],[139.798,33.058],[139.775,33.068],[139.762,33.088],[139.762,33.112],[139.775,33.135],[139.798,33.148]],"aogashima":[[139.772,32.472],[139.788,32.462],[139.792,32.448],[139.782,32.435],[139.765,32.435],[139.755,32.448],[139.758,32.465]],"chichijima":[[142.208,27.112],[142.232,27.102],[142.245,27.082],[142.242,27.058],[142.225,27.042],[142.202,27.042],[142.182,27.055],[142.175,27.078],[142.185,27.098]],"hahajima":[[142.158,26.682],[142.178,26.672],[142.185,26.655],[142.175,26.638],[142.155,26.632],[142.135,26.642],[142.132,26.662],[142.142,26.678]],"iwoto":[[141.322,24.788],[141.338,24.778],[141.342,24.762],[141.332,24.748],[141.315,24.748],[141.305,24.762],[141.308,24.778]],"awashima":[[139.245,38.478],[139.268,38.468],[139.282,38.448],[139.275,38.428],[139.255,38.415],[139.232,38.418],[139.218,38.435],[139.222,38.458],[139.232,38.472]],"tobishima":[[139.545,39.192],[139.558,39.185],[139.562,39.172],[139.552,39.162],[139.538,39.165],[139.532,39.178]],"hegura":[[136.918,37.852],[136.928,37.845],[136.925,37.835],[136.912,37.835],[136.908,37.845]],"mishimaYama":[[131.128,34.792],[131.145,34.782],[131.148,34.765],[131.138,34.752],[131.122,34.752],[131.112,34.765],[131.115,34.782]],"okunoshima":[[132.988,34.308],[132.998,34.302],[132.995,34.292],[132.985,34.292],[132.982,34.302]],"sakushima":[[137.048,34.712],[137.062,34.705],[137.062,34.692],[137.048,34.688],[137.038,34.698]],"himakajima":[[136.992,34.718],[137.005,34.712],[137.005,34.702],[136.992,34.698],[136.985,34.708]],"kesennumaOshima":[[141.605,38.885],[141.628,38.875],[141.635,38.858],[141.625,38.842],[141.605,38.838],[141.588,38.848],[141.585,38.868]],"matsushima":[[141.062,38.372],[141.078,38.365],[141.078,38.352],[141.062,38.348],[141.052,38.358]]},"lakes":{"Lake Biwa":[[136.3093,35.25],[136.2934,35.2953],[136.248,35.3337],[136.1801,35.3593],[136.1,35.3683],[136.0199,35.3593],[135.952,35.3337],[135.9066,35.2953],[135.8907,35.25],[135.9066,35.2047],[135.952,35.1663],[136.0199,35.1407],[136.1,35.1317],[136.1801,35.1407],[136.248,35.1663],[136.2934,35.2047]],"Lake Kasumigaura":[[140.506,36.02],[140.4979,36.0427],[140.4749,36.062],[140.4405,36.0748],[140.4,36.0793],[140.3595,36.0748],[140.3251,36.062],[140.3021,36.0427],[140.294,36.02],[140.3021,35.9973],[140.3251,35.978],[140.3595,35.9652],[140.4,35.9607],[140.4405,35.9652],[140.4749,35.978],[140.4979,35.9973]],"Lake Saroma":[[143.8835,44.13],[143.8748,44.1516],[143.8502,44.1699],[143.8134,44.1821],[143.77,44.1864],[143.7266,44.1821],[143.6898,44.1699],[143.6652,44.1516],[143.6565,44.13],[143.6652,44.1084],[143.6898,44.0901],[143.7266,44.0779],[143.77,44.0736],[143.8134,44.0779],[143.8502,44.0901],[143.8748,44.1084]],"Lake Inawashiro":[[140.1847,37.5],[140.1782,37.5178],[140.1599,37.5329],[140.1324,37.543],[140.1,37.5465],[140.0676,37.543],[140.0401,37.5329],[140.0218,37.5178],[140.0153,37.5],[140.0218,37.4822],[140.0401,37.4671],[140.0676,37.457],[140.1,37.4535],[140.1324,37.457],[140.1599,37.4671],[140.1782,37.4822]],"Lake Nakaumi":[[133.2753,35.45],[133.2696,35.4663],[133.2533,35.48],[133.2288,35.4892],[133.2,35.4925],[133.1712,35.4892],[133.1467,35.48],[133.1304,35.4663],[133.1247,35.45],[133.1304,35.4337],[133.1467,35.42],[133.1712,35.4108],[133.2,35.4075],[133.2288,35.4108],[133.2533,35.42],[133.2696,35.4337]],"Lake Kussharo":[[144.4144,43.6],[144.4082,43.6156],[144.3905,43.6288],[144.3641,43.6377],[144.333,43.6408],[144.3019,43.6377],[144.2755,43.6288],[144.2578,43.6156],[144.2516,43.6],[144.2578,43.5844],[144.2755,43.5712],[144.3019,43.5623],[144.333,43.5592],[144.3641,43.5623],[144.3905,43.5712],[144.4082,43.5844]],"Lake Shinji":[[133.0222,35.44],[133.0167,35.4556],[133.001,35.4688],[132.9776,35.4776],[132.95,35.4807],[132.9224,35.4776],[132.899,35.4688],[132.8833,35.4556],[132.8778,35.44],[132.8833,35.4244],[132.899,35.4112],[132.9224,35.4024],[132.95,35.3993],[132.9776,35.4024],[133.001,35.4112],[133.0167,35.4244]],"Lake Shikotsu":[[141.4297,42.75],[141.4236,42.7655],[141.4063,42.7786],[141.3805,42.7874],[141.35,42.7905],[141.3195,42.7874],[141.2937,42.7786],[141.2764,42.7655],[141.2703,42.75],[141.2764,42.7345],[141.2937,42.7214],[141.3195,42.7126],[141.35,42.7095],[141.3805,42.7126],[141.4063,42.7214],[141.4236,42.7345]],"Lake Tōya":[[140.9255,42.6],[140.9197,42.6147],[140.9034,42.6272],[140.8789,42.6355],[140.85,42.6385],[140.8211,42.6355],[140.7966,42.6272],[140.7803,42.6147],[140.7745,42.6],[140.7803,42.5853],[140.7966,42.5728],[140.8211,42.5645],[140.85,42.5615],[140.8789,42.5645],[140.9034,42.5728],[140.9197,42.5853]],"Lake Hamana":[[137.6448,34.72],[137.6398,34.7341],[137.6258,34.7461],[137.6048,34.754],[137.58,34.7569],[137.5552,34.754],[137.5342,34.7461],[137.5202,34.7341],[137.5152,34.72],[137.5202,34.7059],[137.5342,34.6939],[137.5552,34.686],[137.58,34.6831],[137.6048,34.686],[137.6258,34.6939],[137.6398,34.7059]],"Lake Ogawara":[[141.3687,40.8],[141.3635,40.8138],[141.3486,40.8255],[141.3263,40.8333],[141.3,40.836],[141.2737,40.8333],[141.2514,40.8255],[141.2365,40.8138],[141.2313,40.8],[141.2365,40.7862],[141.2514,40.7745],[141.2737,40.7667],[141.3,40.764],[141.3263,40.7667],[141.3486,40.7745],[141.3635,40.7862]],"Lake Towada":[[140.9478,40.47],[140.9427,40.4837],[140.928,40.4953],[140.906,40.503],[140.88,40.5057],[140.854,40.503],[140.832,40.4953],[140.8173,40.4837],[140.8122,40.47],[140.8173,40.4563],[140.832,40.4447],[140.854,40.437],[140.88,40.4343],[140.906,40.437],[140.928,40.4447],[140.9427,40.4563]],"Lake Notoro":[[144.2403,44.1],[144.235,44.1134],[144.2197,44.1247],[144.1969,44.1323],[144.17,44.135],[144.1431,44.1323],[144.1203,44.1247],[144.105,44.1134],[144.0997,44.1],[144.105,44.0866],[144.1203,44.0753],[144.1431,44.0677],[144.17,44.065],[144.1969,44.0677],[144.2197,44.0753],[144.235,44.0866]],"Lake Kitaura":[[140.5985,36],[140.5948,36.0104],[140.5843,36.0192],[140.5685,36.0251],[140.55,36.0271],[140.5315,36.0251],[140.5157,36.0192],[140.5052,36.0104],[140.5015,36],[140.5052,35.9896],[140.5157,35.9808],[140.5315,35.9749],[140.55,35.9729],[140.5685,35.9749],[140.5843,35.9808],[140.5948,35.9896]],"Lake Hachirōgata":[[140.0454,39.95],[140.0419,39.9592],[140.0321,39.967],[140.0174,39.9722],[140,39.9741],[139.9826,39.9722],[139.9679,39.967],[139.9581,39.9592],[139.9546,39.95],[139.9581,39.9408],[139.9679,39.933],[139.9826,39.9278],[140,39.9259],[140.0174,39.9278],[140.0321,39.933],[140.0419,39.9408]],"Lake Tazawa":[[140.7066,39.717],[140.7033,39.7259],[140.6939,39.7334],[140.6797,39.7385],[140.663,39.7402],[140.6463,39.7385],[140.6321,39.7334],[140.6227,39.7259],[140.6194,39.717],[140.6227,39.7081],[140.6321,39.7006],[140.6463,39.6955],[140.663,39.6938],[140.6797,39.6955],[140.6939,39.7006],[140.7033,39.7081]],"Lake Mashū":[[144.573,43.583],[144.5699,43.5907],[144.5613,43.5972],[144.5483,43.6015],[144.533,43.603],[144.5177,43.6015],[144.5047,43.5972],[144.4961,43.5907],[144.493,43.583],[144.4961,43.5753],[144.5047,43.5688],[144.5177,43.5645],[144.533,43.563],[144.5483,43.5645],[144.5613,43.5688],[144.5699,43.5753]],"Lake Akan":[[144.1332,43.45],[144.1307,43.4564],[144.1235,43.4618],[144.1127,43.4654],[144.1,43.4667],[144.0873,43.4654],[144.0765,43.4618],[144.0693,43.4564],[144.0668,43.45],[144.0693,43.4436],[144.0765,43.4382],[144.0873,43.4346],[144.1,43.4333],[144.1127,43.4346],[144.1235,43.4382],[144.1307,43.4436]],"Lake Suwa":[[138.1128,36.05],[138.1105,36.0564],[138.1041,36.0618],[138.0944,36.0654],[138.083,36.0667],[138.0716,36.0654],[138.0619,36.0618],[138.0555,36.0564],[138.0532,36.05],[138.0555,36.0436],[138.0619,36.0382],[138.0716,36.0346],[138.083,36.0333],[138.0944,36.0346],[138.1041,36.0382],[138.1105,36.0436]],"Lake Chūzenji":[[139.4981,36.733],[139.4959,36.739],[139.4899,36.744],[139.4807,36.7474],[139.47,36.7486],[139.4593,36.7474],[139.4501,36.744],[139.4441,36.739],[139.4419,36.733],[139.4441,36.727],[139.4501,36.722],[139.4593,36.7186],[139.47,36.7174],[139.4807,36.7186],[139.4899,36.722],[139.4959,36.727]],"Lake Ikeda":[[130.5925,31.24],[130.5906,31.2458],[130.585,31.2507],[130.5768,31.254],[130.567,31.2551],[130.5572,31.254],[130.549,31.2507],[130.5434,31.2458],[130.5415,31.24],[130.5434,31.2342],[130.549,31.2293],[130.5572,31.226],[130.567,31.2249],[130.5768,31.226],[130.585,31.2293],[130.5906,31.2342]],"Lake Kutcharo":[[142.4038,45.17],[142.4012,45.1763],[142.3939,45.1817],[142.3829,45.1852],[142.37,45.1865],[142.3571,45.1852],[142.3461,45.1817],[142.3388,45.1763],[142.3362,45.17],[142.3388,45.1637],[142.3461,45.1583],[142.3571,45.1548],[142.37,45.1535],[142.3829,45.1548],[142.3939,45.1583],[142.4012,45.1637]],"Lake Yamanaka":[[138.8881,35.417],[138.8865,35.4216],[138.882,35.4254],[138.8751,35.428],[138.867,35.4289],[138.8589,35.428],[138.852,35.4254],[138.8475,35.4216],[138.8459,35.417],[138.8475,35.4124],[138.852,35.4086],[138.8589,35.406],[138.867,35.4051],[138.8751,35.406],[138.882,35.4086],[138.8865,35.4124]],"Lake Ashi":[[139.0412,35.2],[139.0396,35.2046],[139.035,35.2085],[139.0281,35.2111],[139.02,35.212],[139.0119,35.2111],[139.005,35.2085],[139.0004,35.2046],[138.9988,35.2],[139.0004,35.1954],[139.005,35.1915],[139.0119,35.1889],[139.02,35.188],[139.0281,35.1889],[139.035,35.1915],[139.0396,35.1954]],"Lake Kawaguchi":[[138.769,35.517],[138.7676,35.5211],[138.7635,35.5246],[138.7573,35.5269],[138.75,35.5277],[138.7427,35.5269],[138.7365,35.5246],[138.7324,35.5211],[138.731,35.517],[138.7324,35.5129],[138.7365,35.5094],[138.7427,35.5071],[138.75,35.5063],[138.7573,35.5071],[138.7635,35.5094],[138.7676,35.5129]],"Lake Kuttara":[[141.2024,42.5],[141.201,42.5038],[141.1967,42.507],[141.1904,42.5092],[141.183,42.5099],[141.1756,42.5092],[141.1693,42.507],[141.165,42.5038],[141.1636,42.5],[141.165,42.4962],[141.1693,42.493],[141.1756,42.4908],[141.183,42.4901],[141.1904,42.4908],[141.1967,42.493],[141.201,42.4962]],"Lake Yogo":[[136.1939,35.552],[136.1931,35.5543],[136.1907,35.5563],[136.1872,35.5577],[136.183,35.5581],[136.1788,35.5577],[136.1753,35.5563],[136.1729,35.5543],[136.1721,35.552],[136.1729,35.5497],[136.1753,35.5477],[136.1788,35.5463],[136.183,35.5459],[136.1872,35.5463],[136.1907,35.5477],[136.1931,35.5497]],"Lake Biwa's Nishinoko":[[136.112,35.15],[136.1111,35.1526],[136.1085,35.1548],[136.1046,35.1563],[136.1,35.1568],[136.0954,35.1563],[136.0915,35.1548],[136.0889,35.1526],[136.088,35.15],[136.0889,35.1474],[136.0915,35.1452],[136.0954,35.1437],[136.1,35.1432],[136.1046,35.1437],[136.1085,35.1452],[136.1111,35.1474]],"Lake Saiko":[[138.6968,35.5],[138.6959,35.5025],[138.6933,35.5047],[138.6895,35.5061],[138.685,35.5066],[138.6805,35.5061],[138.6767,35.5047],[138.6741,35.5025],[138.6732,35.5],[138.6741,35.4975],[138.6767,35.4953],[138.6805,35.4939],[138.685,35.4934],[138.6895,35.4939],[138.6933,35.4953],[138.6959,35.4975]],"Lake Motosu":[[138.6106,35.465],[138.6092,35.4688],[138.6054,35.472],[138.5997,35.4742],[138.593,35.4749],[138.5863,35.4742],[138.5806,35.472],[138.5768,35.4688],[138.5754,35.465],[138.5768,35.4612],[138.5806,35.458],[138.5863,35.4558],[138.593,35.4551],[138.5997,35.4558],[138.6054,35.458],[138.6092,35.4612]]},"rivers":{"Shinano River":[[138.72,35.92],[138.32,36.23],[138.25,36.4],[138.19,36.65],[138.37,36.86],[138.56,37.15],[138.85,37.45],[138.95,37.7],[139.06,37.95]],"Tone River":[[139.1,36.88],[139.06,36.66],[139.06,36.39],[139.48,36.18],[139.8,36.1],[140.15,35.93],[140.5,35.83],[140.855,35.735]],"Ishikari River":[[142.98,43.55],[142.38,43.76],[141.93,43.56],[141.56,43.33],[141.36,43.24]],"Teshio River":[[142.7,43.9],[142.47,44.35],[142.1,44.75],[141.78,44.9],[141.74,44.885]],"Kitakami River":[[141.13,39.98],[141.15,39.7],[141.13,39.29],[141.14,38.93],[141.29,38.56],[141.3,38.43]],"Kiso River":[[137.7,35.96],[137.56,35.7],[137.02,35.43],[136.88,35.23],[136.76,35.05],[136.72,35.01]],"Mogami River":[[140.15,38],[140.29,38.22],[140.2,38.5],[140.01,38.76],[139.84,38.9]],"Tenryū River":[[138.08,36.04],[137.87,35.63],[137.81,35.22],[137.81,34.9],[137.79,34.68]],"Agano River":[[139.93,37.29],[139.48,37.48],[139.18,37.64],[139.15,37.83],[139.24,37.97]],"Shimanto River":[[132.98,33.47],[132.85,33.32],[132.96,33.18],[132.87,33],[132.985,32.93]],"Yoshino River":[[133.4,33.76],[133.68,33.87],[134.05,33.94],[134.33,34.05],[134.58,34.075]],"Chikugo River":[[131.07,33.1],[130.88,33.23],[130.64,33.32],[130.42,33.23],[130.32,33.16]],"Yodo River":[[135.94,35.02],[135.72,34.9],[135.64,34.8],[135.52,34.72],[135.42,34.66]],"Arakawa River":[[138.78,35.93],[139.15,36.03],[139.52,35.93],[139.7,35.8],[139.85,35.64]],"Ōi River":[[138.23,35.5],[138.18,35.18],[138.18,34.93],[138.25,34.76],[138.28,34.6]],"Kuma River":[[131.03,32.4],[130.76,32.23],[130.56,32.32],[130.4,32.42],[130.59,32.5]],"Fuji River":[[138.4,35.85],[138.47,35.66],[138.45,35.45],[138.52,35.18],[138.58,35.02]],"Ōta River":[[132.3,34.68],[132.42,34.55],[132.46,34.44],[132.46,34.39],[132.45,34.35]]},"ranges":{"Kitami Mountains":[[142.58,44.62],[143.05,44.32],[143.42,44.02],[143.62,43.86]],"Teshio Mountains":[[142.05,44.68],[142.16,44.32],[142.28,43.98]],"Shokanbetsu Range":[[141.72,44.08],[141.6,43.86],[141.62,43.68]],"Daisetsu Volcanic Group":[[142.72,43.78],[142.86,43.66],[142.88,43.52],[142.72,43.42]],"Tokachi Range":[[142.6,43.52],[142.7,43.36],[142.78,43.22]],"Yūbari Mountains":[[142.18,43.32],[142.28,43.1],[142.32,42.92]],"Hidaka Range":[[142.86,43.06],[142.88,42.7],[143.06,42.34],[143.18,42.02]],"Shiretoko Range":[[145.24,44.3],[145.08,44.1],[144.94,43.94]],"Akan and Kussharo":[[144.42,43.66],[144.18,43.48],[143.98,43.32]],"Niseko and Yōtei":[[140.68,42.92],[140.8,42.84],[140.88,42.78]],"Oshima Highland":[[140.02,42.34],[140.1,41.98],[140.24,41.62]],"Ōu Mountains":[[140.9,41.14],[140.86,40.62],[140.86,40.06],[140.76,39.46],[140.62,38.86],[140.5,38.24],[140.3,37.62],[140.1,37.02]],"Kitakami Highland":[[141.5,40.16],[141.52,39.62],[141.5,39.06],[141.32,38.54]],"Dewa Mountains":[[140.28,40.2],[140.18,39.62],[140,39.02],[139.88,38.42],[139.72,37.92]],"Mount Chōkai":[[140.05,39.1]],"Iide and Asahi":[[139.92,38.32],[139.86,38.06],[139.72,37.86]],"Mount Zaō":[[140.45,38.26],[140.45,38.1]],"Bandai and Azuma":[[140.26,37.76],[140.12,37.66],[140.06,37.58]],"Abukuma Highland":[[140.76,37.82],[140.7,37.24],[140.56,36.72]],"Echigo Mountains":[[139.48,37.62],[139.2,37.24],[138.96,36.94]],"Mikuni Range":[[139.14,37.02],[138.9,36.82],[138.74,36.66]],"Nasu Volcanoes":[[139.96,37.16],[139.94,37]],"Nikkō Volcanoes":[[139.4,36.92],[139.44,36.78],[139.5,36.66]],"Mount Akagi":[[139.19,36.56]],"Mount Haruna":[[138.87,36.47]],"Asama and Kusatsu":[[138.54,36.66],[138.52,36.52],[138.52,36.4]],"Hida Range, Northern Alps":[[137.76,36.92],[137.66,36.62],[137.64,36.32],[137.6,36.06]],"Mount Tate":[[137.6,36.58]],"Kiso Range, Central Alps":[[137.86,36.02],[137.8,35.76],[137.8,35.5]],"Akaishi Range, Southern Alps":[[138.2,35.92],[138.24,35.66],[138.2,35.4],[138.14,35.18]],"Hida Highland":[[137.06,36.42],[137,36.12],[136.94,35.86]],"Mount Haku":[[136.8,36.3],[136.77,36.16],[136.76,36]],"Yatsugatake":[[138.37,36.06],[138.37,35.92]],"Kantō Mountains":[[138.6,36.06],[138.84,35.9],[139.04,35.76]],"Tanzawa Mountains":[[139.04,35.5],[139.24,35.46]],"Mount Fuji":[[138.727,35.361]],"Hakone Caldera":[[139.02,35.23]],"Izu Highland":[[138.94,34.96],[138.9,34.78],[138.88,34.66]],"Suzuka Range":[[136.4,35.4],[136.4,35.16],[136.34,34.94]],"Mount Ibuki":[[136.406,35.418]],"Tanba Highland":[[135.4,35.52],[135.6,35.3],[135.76,35.14]],"Hira and Hiei":[[135.9,35.26],[135.85,35.06]],"Kii Mountains":[[135.6,34.42],[135.86,34.2],[136.06,34.06],[135.86,33.86],[135.6,33.74]],"Kongō and Ikoma":[[135.68,34.7],[135.68,34.56],[135.67,34.42]],"Chūgoku Mountains":[[134.4,35.4],[133.9,35.2],[133.4,35],[132.9,34.86],[132.3,34.66],[131.7,34.42],[131.2,34.26]],"Mount Daisen":[[133.546,35.371]],"Shikoku Mountains":[[134.2,34.06],[133.8,33.9],[133.4,33.8],[133,33.76],[132.7,33.62]],"Tsukushi Mountains":[[130.6,33.62],[130.86,33.46],[131.02,33.3]],"Sefuri Range":[[130.18,33.46],[130.48,33.36]],"Kyūshū Mountains":[[131,33.28],[131.1,32.92],[131.18,32.6],[131.06,32.3],[130.88,32.02]],"Kujū Volcanic Group":[[131.25,33.09]],"Mount Aso":[[131.104,32.884]],"Mount Unzen":[[130.299,32.761]],"Kirishima Group":[[130.86,31.93]],"Sakurajima":[[130.657,31.585]],"Mount Kaimon":[[130.528,31.18]],"Yakushima":[[130.507,30.336]],"Amami Highland":[[129.42,28.32]],"Yanbaru":[[128.2,26.75]],"Ishigaki Highland":[[124.2,24.43]]},"plains":[[141.62,43.3,"Ishikari Plain","石狩平原","石狩平野"],[143.18,42.92,"Tokachi Plain","十勝平原","十勝平野"],[144.9,43.36,"Konsen Plateau","根釧臺地","根釧台地"],[140.42,40.68,"Tsugaru Plain","津輕平原","津軽平野"],[140.96,38.14,"Sendai Plain","仙臺平原","仙台平野"],[139.62,36.06,"Kantō Plain","關東平原","関東平野"],[138.98,37.66,"Echigo Plain","越後平原","越後平野"],[137.2,36.62,"Toyama Plain","富山平原","富山平野"],[136.76,35.26,"Nōbi Plain","濃尾平原","濃尾平野"],[135.54,34.72,"Osaka Plain","大阪平原","大阪平野"],[135.79,34.54,"Nara Basin","奈良盆地","奈良盆地"],[133.9,34.62,"Okayama Plain","岡山平原","岡山平野"],[130.5,33.28,"Tsukushi Plain","筑紫平原","筑紫平野"],[130.68,32.86,"Kumamoto Plain","熊本平原","熊本平野"],[131.42,31.98,"Miyazaki Plain","宮崎平原","宮崎平野"]],"parks":[["Rishiri-Rebun-Sarobetsu",141.3,45.18,1974],["Shiretoko",145.1,44.1,1964],["Akan-Mashū",144.2,43.45,1934],["Kushiroshitsugen",144.4,43.1,1987],["Daisetsuzan",142.85,43.55,1934],["Shikotsu-Tōya",141.1,42.65,1949],["Hidaka-sanmyaku Erimo-Tokachi",142.9,42.6,2024],["Towada-Hachimantai",140.9,40.3,1936],["Sanriku Fukkō",141.95,39.3,2013],["Bandai-Asahi",139.9,37.8,1950],["Nikkō",139.5,36.8,1934],["Oze",139.25,36.9,2007],["Chichibu-Tama-Kai",138.8,35.9,1950],["Ogasawara",142.195,27.095,1972],["Fuji-Hakone-Izu",138.9,35.2,1936],["Jōshin'etsu-kōgen",138.5,36.7,1949],["Myōkō-Togakushi Renzan",138.1,36.85,2015],["Chūbu-Sangaku",137.65,36.3,1934],["Minami Alps",138.25,35.6,1964],["Hakusan",136.771,36.155,1962],["Ise-Shima",136.8,34.4,1946],["Yoshino-Kumano",135.9,34,1936],["San'in Kaigan",134.6,35.6,1963],["Setonaikai",133.5,34.3,1934],["Daisen-Oki",133.546,35.371,1936],["Ashizuri-Uwakai",132.8,32.9,1972],["Saikai",129.5,33,1955],["Unzen-Amakusa",130.29,32.76,1934],["Aso-Kujū",131.15,32.95,1934],["Kirishima-Kinkōwan",130.75,31.7,1934],["Yakushima",130.52,30.343,2012],["Amami Guntō",129.4,28.3,2017],["Yanbaru",128.22,26.75,2016],["Keramashotō",127.35,26.2,2014],["Iriomote-Ishigaki",123.9,24.4,1972]],"cities":[["Sapporo","01",141.354,43.062,1959000,0,"札幌","札幌市"],["Asahikawa","01",142.365,43.771,320000,0,"旭川","旭川市"],["Hakodate","01",140.729,41.769,243000,0,"函館","函館市"],["Tomakomai","01",141.606,42.634,167000,0,"苫小牧","苫小牧市"],["Obihiro","01",143.196,42.924,164000,0,"帶廣","帯広市"],["Kushiro","01",144.382,42.985,157000,0,"釧路","釧路市"],["Ebetsu","01",141.536,43.104,120000,0,"江別","江別市"],["Kitami","01",143.895,43.803,111000,0,"北見","北見市"],["Otaru","01",140.995,43.191,107000,0,"小樽","小樽市"],["Chitose","01",141.652,42.821,98000,0,"千歲","千歳市"],["Muroran","01",140.974,42.317,78000,0,"室蘭","室蘭市"],["Wakkanai","01",141.673,45.416,31000,0,"稚內","稚内市"],["Nemuro","01",145.583,43.33,23000,0,"根室","根室市"],["Aomori","02",140.747,40.822,269000,1,"青森","青森市"],["Hachinohe","02",141.488,40.512,219000,0,"八戶","八戸市"],["Hirosaki","02",140.464,40.603,164000,0,"弘前","弘前市"],["Towada","02",141.206,40.613,59000,0,"十和田","十和田市"],["Mutsu","02",141.184,41.293,52000,0,"陸奧","むつ市"],["Morioka","03",141.155,39.702,283000,1,"盛岡","盛岡市"],["Ichinoseki","03",141.127,38.934,108000,0,"一關","一関市"],["Ōshū","03",141.139,39.144,108000,0,"奧州","奥州市"],["Hanamaki","03",141.117,39.389,92000,0,"花卷","花巻市"],["Kitakami","03",141.113,39.287,92000,0,"北上","北上市"],["Miyako","03",141.957,39.641,48000,0,"宮古","宮古市"],["Sendai","04",140.872,38.268,1097000,0,"仙臺","仙台市"],["Ishinomaki","04",141.303,38.434,135000,0,"石卷","石巻市"],["Ōsaki","04",140.956,38.577,126000,0,"大崎","大崎市"],["Natori","04",140.891,38.172,80000,0,"名取","名取市"],["Tome","04",141.188,38.692,73000,0,"登米","登米市"],["Kesennuma","04",141.57,38.908,58000,0,"氣仙沼","気仙沼市"],["Shiogama","04",141.021,38.315,51000,0,"鹽竈","塩竈市"],["Akita","05",140.103,39.72,301000,1,"秋田","秋田市"],["Yokote","05",140.554,39.311,81000,0,"橫手","横手市"],["Daisen","05",140.475,39.453,76000,0,"大仙","大仙市"],["Yurihonjō","05",140.049,39.386,72000,0,"由利本莊","由利本荘市"],["Ōdate","05",140.564,40.272,68000,0,"大館","大館市"],["Noshiro","05",140.027,40.207,49000,0,"能代","能代市"],["Yamagata","06",140.34,38.255,242000,1,"山形","山形市"],["Tsuruoka","06",139.827,38.727,121000,0,"鶴岡","鶴岡市"],["Sakata","06",139.836,38.914,98000,0,"酒田","酒田市"],["Yonezawa","06",140.117,37.922,78000,0,"米澤","米沢市"],["Tendō","06",140.378,38.362,61000,0,"天童","天童市"],["Kōriyama","07",140.36,37.401,320000,0,"郡山","郡山市"],["Iwaki","07",140.888,37.051,319000,0,"磐城","いわき市"],["Fukushima","07",140.474,37.76,273000,1,"福島","福島市"],["Aizu-Wakamatsu","07",139.93,37.495,115000,0,"會津若松","会津若松市"],["Sukagawa","07",140.373,37.286,74000,0,"須賀川","須賀川市"],["Shirakawa","07",140.211,37.126,59000,0,"白河","白河市"],["Mito","08",140.471,36.366,269000,1,"水戶","水戸市"],["Tsukuba","08",140.077,36.084,254000,0,"筑波","つくば市"],["Hitachi","08",140.651,36.599,170000,0,"日立","日立市"],["Hitachinaka","08",140.535,36.397,155000,0,"常陸那珂","ひたちなか市"],["Tsuchiura","08",140.204,36.079,142000,0,"土浦","土浦市"],["Toride","08",140.05,35.911,105000,0,"取手","取手市"],["Kashima","08",140.645,35.966,66000,0,"鹿嶋","鹿嶋市"],["Utsunomiya","09",139.883,36.556,513000,0,"宇都宮","宇都宮市"],["Oyama","09",139.8,36.315,167000,0,"小山","小山市"],["Tochigi","09",139.734,36.382,156000,0,"栃木","栃木市"],["Ashikaga","09",139.45,36.34,142000,0,"足利","足利市"],["Nasushiobara","09",140.046,36.962,115000,0,"那須鹽原","那須塩原市"],["Nikkō","09",139.699,36.72,76000,0,"日光","日光市"],["Takasaki","10",139.003,36.322,370000,0,"高崎","高崎市"],["Maebashi","10",139.063,36.389,332000,1,"前橋","前橋市"],["Ōta","10",139.376,36.291,223000,0,"太田","太田市"],["Isesaki","10",139.197,36.311,213000,0,"伊勢崎","伊勢崎市"],["Kiryū","10",139.331,36.405,105000,0,"桐生","桐生市"],["Saitama","11",139.646,35.861,1341000,0,"埼玉","さいたま市"],["Kawaguchi","11",139.724,35.808,595000,0,"川口","川口市"],["Kawagoe","11",139.485,35.925,353000,0,"川越","川越市"],["Tokorozawa","11",139.469,35.799,342000,0,"所澤","所沢市"],["Koshigaya","11",139.791,35.891,342000,0,"越谷","越谷市"],["Sōka","11",139.806,35.825,250000,0,"草加","草加市"],["Kasukabe","11",139.752,35.975,230000,0,"春日部","春日部市"],["Ageo","11",139.593,35.977,229000,0,"上尾","上尾市"],["Kumagaya","11",139.389,36.147,192000,0,"熊谷","熊谷市"],["Chiba","12",140.106,35.607,978000,0,"千葉","千葉市"],["Funabashi","12",139.983,35.694,646000,0,"船橋","船橋市"],["Matsudo","12",139.903,35.788,498000,0,"松戶","松戸市"],["Ichikawa","12",139.931,35.722,496000,0,"市川","市川市"],["Kashiwa","12",139.976,35.868,434000,0,"柏","柏市"],["Ichihara","12",140.115,35.498,265000,0,"市原","市原市"],["Yachiyo","12",140.1,35.723,205000,0,"八千代","八千代市"],["Narashino","12",140.027,35.681,176000,0,"習志野","習志野市"],["Narita","12",140.318,35.777,132000,0,"成田","成田市"],["Chōshi","12",140.827,35.734,55000,0,"銚子","銚子市"],["Tokyo, 23 Special Wards","13",139.692,35.69,9733000,0,"東京二十三區","東京23区"],["Hachiōji","13",139.316,35.666,579000,0,"八王子","八王子市"],["Machida","13",139.439,35.546,431000,0,"町田","町田市"],["Fuchū","13",139.478,35.669,262000,0,"府中","府中市"],["Chōfu","13",139.541,35.651,240000,0,"調布","調布市"],["Nishitōkyō","13",139.538,35.725,207000,0,"西東京","西東京市"],["Tachikawa","13",139.407,35.714,185000,0,"立川","立川市"],["Musashino","13",139.566,35.718,150000,0,"武藏野","武蔵野市"],["Ōshima","13",139.357,34.749,7000,0,"大島","大島町"],["Yokohama","14",139.638,35.444,3772000,0,"橫濱","横浜市"],["Kawasaki","14",139.703,35.531,1541000,0,"川崎","川崎市"],["Sagamihara","14",139.373,35.571,725000,0,"相模原","相模原市"],["Fujisawa","14",139.49,35.339,443000,0,"藤澤","藤沢市"],["Yokosuka","14",139.672,35.281,373000,0,"橫須賀","横須賀市"],["Hiratsuka","14",139.349,35.328,256000,0,"平塚","平塚市"],["Chigasaki","14",139.404,35.334,244000,0,"茅崎","茅ヶ崎市"],["Atsugi","14",139.362,35.443,224000,0,"厚木","厚木市"],["Odawara","14",139.152,35.264,186000,0,"小田原","小田原市"],["Kamakura","14",139.55,35.319,172000,0,"鎌倉","鎌倉市"],["Hakone","14",139.026,35.233,11000,0,"箱根","箱根町"],["Niigata","15",139.036,37.916,772000,0,"新潟","新潟市"],["Nagaoka","15",138.851,37.446,262000,0,"長岡","長岡市"],["Jōetsu","15",138.236,37.148,184000,0,"上越","上越市"],["Sanjō","15",138.961,37.637,93000,0,"三條","三条市"],["Kashiwazaki","15",138.559,37.372,80000,0,"柏崎","柏崎市"],["Sado","15",138.368,38.018,49000,0,"佐渡","佐渡市"],["Toyama","16",137.214,36.696,408000,1,"富山","富山市"],["Takaoka","16",137.026,36.754,164000,0,"高岡","高岡市"],["Imizu","16",137.098,36.717,90000,0,"射水","射水市"],["Nanto","16",136.921,36.558,47000,0,"南礪","南砺市"],["Kurobe","16",137.45,36.873,40000,0,"黑部","黒部市"],["Kanazawa","17",136.657,36.561,463000,1,"金澤","金沢市"],["Hakusan","17",136.566,36.514,111000,0,"白山","白山市"],["Komatsu","17",136.446,36.402,106000,0,"小松","小松市"],["Kaga","17",136.315,36.302,63000,0,"加賀","加賀市"],["Nanao","17",136.968,37.043,47000,0,"七尾","七尾市"],["Wajima","17",136.899,37.391,22000,0,"輪島","輪島市"],["Fukui","18",136.22,36.064,259000,1,"福井","福井市"],["Sakai","18",136.232,36.166,88000,0,"坂井","坂井市"],["Echizen","18",136.169,35.903,81000,0,"越前","越前市"],["Sabae","18",136.184,35.957,69000,0,"鯖江","鯖江市"],["Tsuruga","18",136.056,35.645,63000,0,"敦賀","敦賀市"],["Obama","18",135.746,35.496,28000,0,"小濱","小浜市"],["Kōfu","19",138.568,35.662,186000,1,"甲府","甲府市"],["Kai","19",138.512,35.681,76000,0,"甲斐","甲斐市"],["Minami-Alps","19",138.464,35.609,70000,0,"南阿爾卑斯","南アルプス市"],["Fujiyoshida","19",138.808,35.487,47000,0,"富士吉田","富士吉田市"],["Kōshū","19",138.735,35.703,29000,0,"甲州","甲州市"],["Nagano","20",138.181,36.649,367000,1,"長野","長野市"],["Matsumoto","20",137.972,36.238,239000,0,"松本","松本市"],["Ueda","20",138.249,36.402,153000,0,"上田","上田市"],["Saku","20",138.477,36.249,98000,0,"佐久","佐久市"],["Iida","20",137.822,35.515,96000,0,"飯田","飯田市"],["Suwa","20",138.114,36.039,48000,0,"諏訪","諏訪市"],["Karuizawa","20",138.596,36.348,20000,0,"輕井澤","軽井沢町"],["Gifu","21",136.76,35.423,400000,0,"岐阜","岐阜市"],["Ōgaki","21",136.613,35.359,158000,0,"大垣","大垣市"],["Kakamigahara","21",136.848,35.399,143000,0,"各務原","各務原市"],["Tajimi","21",137.132,35.333,106000,0,"多治見","多治見市"],["Takayama","21",137.252,36.146,84000,0,"高山","高山市"],["Ena","21",137.413,35.449,47000,0,"惠那","恵那市"],["Hamamatsu","22",137.726,34.711,785000,0,"濱松","浜松市"],["Shizuoka","22",138.383,34.976,683000,0,"靜岡","静岡市"],["Fuji","22",138.676,35.161,243000,0,"富士","富士市"],["Numazu","22",138.863,35.096,187000,0,"沼津","沼津市"],["Iwata","22",137.851,34.718,166000,0,"磐田","磐田市"],["Fujieda","22",138.258,34.867,143000,0,"藤枝","藤枝市"],["Atami","22",139.072,35.096,33000,0,"熱海","熱海市"],["Shimoda","22",138.945,34.679,20000,0,"下田","下田市"],["Nagoya","23",136.906,35.181,2332000,0,"名古屋","名古屋市"],["Toyota","23",137.156,35.083,417000,0,"豐田","豊田市"],["Okazaki","23",137.174,34.955,384000,0,"岡崎","岡崎市"],["Ichinomiya","23",136.803,35.304,379000,0,"一宮","一宮市"],["Toyohashi","23",137.391,34.769,370000,0,"豐橋","豊橋市"],["Kasugai","23",136.972,35.248,306000,0,"春日井","春日井市"],["Anjō","23",137.08,34.958,189000,0,"安城","安城市"],["Toyokawa","23",137.376,34.827,184000,0,"豐川","豊川市"],["Inuyama","23",136.944,35.379,72000,0,"犬山","犬山市"],["Yokkaichi","24",136.624,34.965,305000,0,"四日市","四日市市"],["Tsu","24",136.506,34.718,273000,1,"津","津市"],["Suzuka","24",136.584,34.882,196000,0,"鈴鹿","鈴鹿市"],["Matsusaka","24",136.528,34.578,158000,0,"松阪","松阪市"],["Kuwana","24",136.684,35.063,140000,0,"桑名","桑名市"],["Ise","24",136.709,34.487,122000,0,"伊勢","伊勢市"],["Toba","24",136.843,34.481,17000,0,"鳥羽","鳥羽市"],["Ōtsu","25",135.855,35.017,344000,1,"大津","大津市"],["Kusatsu","25",135.96,35.017,144000,0,"草津","草津市"],["Nagahama","25",136.283,35.381,113000,0,"長濱","長浜市"],["Higashiōmi","25",136.198,35.113,112000,0,"東近江","東近江市"],["Hikone","25",136.26,35.276,112000,0,"彥根","彦根市"],["Moriyama","25",135.994,35.059,86000,0,"守山","守山市"],["Kyoto","26",135.768,35.011,1443000,0,"京都","京都市"],["Uji","26",135.8,34.884,179000,0,"宇治","宇治市"],["Kameoka","26",135.574,35.014,86000,0,"龜岡","亀岡市"],["Nagaokakyō","26",135.696,34.926,81000,0,"長岡京","長岡京市"],["Maizuru","26",135.331,35.45,78000,0,"舞鶴","舞鶴市"],["Miyazu","26",135.196,35.535,16000,0,"宮津","宮津市"],["Osaka","27",135.502,34.694,2752000,0,"大阪","大阪市"],["Sakai","27",135.483,34.573,810000,0,"堺","堺市"],["Higashiōsaka","27",135.601,34.679,483000,0,"東大阪","東大阪市"],["Toyonaka","27",135.47,34.782,401000,0,"豐中","豊中市"],["Hirakata","27",135.65,34.814,396000,0,"枚方","枚方市"],["Suita","27",135.516,34.759,385000,0,"吹田","吹田市"],["Takatsuki","27",135.617,34.846,348000,0,"高槻","高槻市"],["Ibaraki","27",135.569,34.816,288000,0,"茨木","茨木市"],["Yao","27",135.601,34.627,262000,0,"八尾","八尾市"],["Neyagawa","27",135.628,34.766,226000,0,"寢屋川","寝屋川市"],["Kobe","28",135.196,34.69,1495000,0,"神戶","神戸市"],["Himeji","28",134.685,34.815,525000,0,"姬路","姫路市"],["Nishinomiya","28",135.342,34.737,483000,0,"西宮","西宮市"],["Amagasaki","28",135.406,34.733,456000,0,"尼崎","尼崎市"],["Akashi","28",134.997,34.643,303000,0,"明石","明石市"],["Kakogawa","28",134.841,34.757,258000,0,"加古川","加古川市"],["Takarazuka","28",135.36,34.8,224000,0,"寶塚","宝塚市"],["Itami","28",135.401,34.784,197000,0,"伊丹","伊丹市"],["Toyooka","28",134.822,35.545,76000,0,"豐岡","豊岡市"],["Sumoto","28",134.896,34.343,41000,0,"洲本","洲本市"],["Nara","29",135.805,34.685,351000,1,"奈良","奈良市"],["Kashihara","29",135.793,34.509,119000,0,"橿原","橿原市"],["Ikoma","29",135.7,34.691,117000,0,"生駒","生駒市"],["Yamatokōriyama","29",135.783,34.65,82000,0,"大和郡山","大和郡山市"],["Kashiba","29",135.699,34.545,78000,0,"香芝","香芝市"],["Sakurai","29",135.843,34.512,55000,0,"櫻井","桜井市"],["Wakayama","30",135.171,34.23,352000,1,"和歌山","和歌山市"],["Tanabe","30",135.378,33.73,68000,0,"田邊","田辺市"],["Hashimoto","30",135.606,34.317,59000,0,"橋本","橋本市"],["Kinokawa","30",135.362,34.267,59000,0,"紀之川","紀の川市"],["Shingū","30",135.992,33.724,26000,0,"新宮","新宮市"],["Kōya","30",135.583,34.213,3000,0,"高野","高野町"],["Tottori","31",134.235,35.501,184000,1,"鳥取","鳥取市"],["Yonago","31",133.331,35.428,146000,0,"米子","米子市"],["Kurayoshi","31",133.826,35.43,44000,0,"倉吉","倉吉市"],["Sakaiminato","31",133.231,35.54,32000,0,"境港","境港市"],["Matsue","32",133.049,35.468,199000,1,"松江","松江市"],["Izumo","32",132.755,35.367,172000,0,"出雲","出雲市"],["Hamada","32",132.081,34.899,51000,0,"濱田","浜田市"],["Masuda","32",131.843,34.676,44000,0,"益田","益田市"],["Ōda","32",132.5,35.192,33000,0,"大田","大田市"],["Okinoshima","32",133.323,36.208,13000,0,"隱岐之島","隠岐の島町"],["Okayama","33",133.935,34.662,721000,0,"岡山","岡山市"],["Kurashiki","33",133.772,34.585,475000,0,"倉敷","倉敷市"],["Tsuyama","33",134.004,35.07,97000,0,"津山","津山市"],["Sōja","33",133.747,34.673,69000,0,"總社","総社市"],["Tamano","33",133.945,34.492,55000,0,"玉野","玉野市"],["Takahashi","33",133.616,34.791,28000,0,"高梁","高梁市"],["Hiroshima","34",132.455,34.385,1189000,0,"廣島","広島市"],["Fukuyama","34",133.362,34.486,459000,0,"福山","福山市"],["Kure","34",132.566,34.249,208000,0,"吳","呉市"],["Higashihiroshima","34",132.743,34.427,197000,0,"東廣島","東広島市"],["Onomichi","34",133.205,34.409,129000,0,"尾道","尾道市"],["Hatsukaichi","34",132.332,34.348,116000,0,"廿日市","廿日市市"],["Miyoshi","34",132.851,34.806,49000,0,"三次","三次市"],["Shimonoseki","35",130.941,33.958,249000,0,"下關","下関市"],["Yamaguchi","35",131.471,34.186,190000,1,"山口","山口市"],["Ube","35",131.247,33.952,158000,0,"宇部","宇部市"],["Shūnan","35",131.806,34.055,137000,0,"周南","周南市"],["Iwakuni","35",132.22,34.167,125000,0,"岩國","岩国市"],["Hōfu","35",131.564,34.051,112000,0,"防府","防府市"],["Hagi","35",131.399,34.408,43000,0,"萩","萩市"],["Tokushima","36",134.555,34.07,249000,1,"德島","徳島市"],["Anan","36",134.66,33.917,67000,0,"阿南","阿南市"],["Naruto","36",134.609,34.172,53000,0,"鳴門","鳴門市"],["Yoshinogawa","36",134.363,34.066,37000,0,"吉野川","吉野川市"],["Miyoshi","36",133.804,34.023,23000,0,"三好","三好市"],["Takamatsu","37",134.047,34.343,417000,1,"高松","高松市"],["Marugame","37",133.798,34.29,109000,0,"丸龜","丸亀市"],["Mitoyo","37",133.715,34.183,61000,0,"三豐","三豊市"],["Kanonji","37",133.663,34.128,55000,0,"觀音寺","観音寺市"],["Sakaide","37",133.86,34.316,50000,0,"坂出","坂出市"],["Kotohira","37",133.816,34.187,8000,0,"琴平","琴平町"],["Matsuyama","38",132.766,33.839,504000,0,"松山","松山市"],["Imabari","38",132.998,34.066,149000,0,"今治","今治市"],["Niihama","38",133.283,33.96,112000,0,"新居濱","新居浜市"],["Saijō","38",133.183,33.919,105000,0,"西條","西条市"],["Uwajima","38",132.56,33.223,68000,0,"宇和島","宇和島市"],["Yawatahama","38",132.423,33.462,30000,0,"八幡濱","八幡浜市"],["Kōchi","39",133.531,33.56,319000,0,"高知","高知市"],["Nankoku","39",133.641,33.576,46000,0,"南國","南国市"],["Shimanto","39",132.934,32.991,32000,0,"四萬十","四万十市"],["Kōnan","39",133.708,33.562,32000,0,"香南","香南市"],["Muroto","39",134.152,33.29,12000,0,"室戶","室戸市"],["Fukuoka","40",130.402,33.59,1637000,0,"福岡","福岡市"],["Kitakyūshū","40",130.875,33.884,921000,0,"北九州","北九州市"],["Kurume","40",130.508,33.319,302000,0,"久留米","久留米市"],["Iizuka","40",130.692,33.646,125000,0,"飯塚","飯塚市"],["Kasuga","40",130.47,33.532,112000,0,"春日","春日市"],["Ōmuta","40",130.446,33.03,108000,0,"大牟田","大牟田市"],["Munakata","40",130.54,33.805,97000,0,"宗像","宗像市"],["Dazaifu","40",130.523,33.513,72000,0,"太宰府","太宰府市"],["Saga","41",130.301,33.263,228000,1,"佐賀","佐賀市"],["Karatsu","41",129.968,33.45,114000,0,"唐津","唐津市"],["Tosu","41",130.506,33.378,75000,0,"鳥栖","鳥栖市"],["Imari","41",129.879,33.265,52000,0,"伊萬里","伊万里市"],["Takeo","41",130.019,33.194,47000,0,"武雄","武雄市"],["Arita","41",129.887,33.203,18000,0,"有田","有田町"],["Nagasaki","42",129.878,32.75,396000,1,"長崎","長崎市"],["Sasebo","42",129.715,33.18,240000,0,"佐世保","佐世保市"],["Isahaya","42",130.054,32.844,132000,0,"諫早","諫早市"],["Ōmura","42",129.958,32.9,97000,0,"大村","大村市"],["Shimabara","42",130.37,32.788,42000,0,"島原","島原市"],["Gotō","42",128.842,32.696,34000,0,"五島","五島市"],["Tsushima","42",129.288,34.203,27000,0,"對馬","対馬市"],["Kumamoto","43",130.708,32.803,733000,0,"熊本","熊本市"],["Yatsushiro","43",130.602,32.502,122000,0,"八代","八代市"],["Amakusa","43",130.192,32.454,73000,0,"天草","天草市"],["Tamana","43",130.561,32.928,65000,0,"玉名","玉名市"],["Hitoyoshi","43",130.755,32.211,31000,0,"人吉","人吉市"],["Aso","43",131.121,32.951,24000,0,"阿蘇","阿蘇市"],["Ōita","44",131.613,33.238,475000,1,"大分","大分市"],["Beppu","44",131.491,33.285,113000,0,"別府","別府市"],["Nakatsu","44",131.188,33.598,83000,0,"中津","中津市"],["Saiki","44",131.9,32.96,67000,0,"佐伯","佐伯市"],["Hita","44",130.941,33.321,60000,0,"日田","日田市"],["Usuki","44",131.805,33.123,35000,0,"臼杵","臼杵市"],["Yufu","44",131.427,33.18,32000,0,"由布","由布市"],["Miyazaki","45",131.424,31.911,399000,0,"宮崎","宮崎市"],["Miyakonojō","45",131.062,31.719,160000,0,"都城","都城市"],["Nobeoka","45",131.665,32.582,117000,0,"延岡","延岡市"],["Hyūga","45",131.624,32.423,58000,0,"日向","日向市"],["Nichinan","45",131.379,31.601,50000,0,"日南","日南市"],["Takachiho","45",131.308,32.712,11000,0,"高千穗","高千穂町"],["Kagoshima","46",130.557,31.596,589000,0,"鹿兒島","鹿児島市"],["Kirishima","46",130.763,31.741,122000,0,"霧島","霧島市"],["Kanoya","46",130.852,31.384,100000,0,"鹿屋","鹿屋市"],["Satsumasendai","46",130.304,31.813,90000,0,"薩摩川內","薩摩川内市"],["Amami","46",129.494,28.377,41000,0,"奄美","奄美市"],["Ibusuki","46",130.633,31.232,37000,0,"指宿","指宿市"],["Yakushima","46",130.657,30.386,11000,0,"屋久島","屋久島町"],["Naha","47",127.681,26.212,317000,1,"那霸","那覇市"],["Okinawa","47",127.805,26.334,142000,0,"沖繩","沖縄市"],["Uruma","47",127.858,26.379,125000,0,"宇流麻","うるま市"],["Urasoe","47",127.716,26.246,115000,0,"浦添","浦添市"],["Ginowan","47",127.779,26.281,99000,0,"宜野灣","宜野湾市"],["Nago","47",127.977,26.592,63000,0,"名護","名護市"],["Miyakojima","47",125.281,24.805,55000,0,"宮古島","宮古島市"],["Ishigaki","47",124.157,24.341,50000,0,"石垣","石垣市"]],"peaks":[["Mount Fuji","22",138.727,35.361,3776,2],["Kita-dake","19",138.238,35.674,3193,0],["Oku-hotaka-dake","20",137.648,36.289,3190,0],["Mount Aino","19",138.228,35.646,3190,0],["Mount Yari","20",137.647,36.342,3180,0],["Mount Ontake","20",137.48,35.893,3067,2],["Mount Norikura","20",137.554,36.106,3026,1],["Mount Tate","16",137.618,36.577,3015,0],["Kiso-Komagatake","20",137.804,35.789,2956,0],["Mount Hōō","19",138.313,35.706,2841,0],["Mount Yatsugatake","20",138.37,35.971,2899,1],["Mount Hakuba","20",137.759,36.758,2932,0],["Mount Haku","17",136.771,36.155,2702,1],["Mount Korenge","15",137.78,36.784,2766,0],["Mount Asama","10",138.523,36.406,2568,2],["Mount Nikkō-Shirane","10",139.377,36.798,2578,2],["Mount Nantai","09",139.491,36.765,2486,1],["Mount Sanpō","11",138.719,35.949,2483,0],["Mount Myōkō","15",138.113,36.892,2454,1],["Mount Hiuchigatake","07",139.286,36.955,2356,1],["Mount Asahi, Daisetsu","01",142.854,43.663,2291,2],["Mount Chōkai","05",140.049,39.099,2236,2],["Mount Echigo-Komagatake","15",139.098,37.108,2003,0],["Mount Tokachi","01",142.686,43.418,2077,2],["Mount Iwate","03",141.001,39.853,2038,2],["Mount Kumotori","13",138.943,35.855,2017,0],["Mount Ishizuchi","38",133.114,33.767,1982,0],["Mount Gassan","06",140.027,38.549,1984,1],["Mount Tsurugi","36",134.093,33.855,1955,0],["Mount Miyanoura","46",130.507,30.336,1936,0],["Hakkyō-ga-take","29",135.909,34.174,1915,0],["Mount Hayachine","03",141.489,39.556,1917,0],["Mount Yōtei","01",140.811,42.828,1898,1],["Mount Zaō","06",140.44,38.144,1841,2],["Mount Byōbu","04",140.469,38.081,1825,0],["Mount Bandai","07",140.075,37.601,1816,2],["Mount Akagi","10",139.193,36.56,1828,1],["Mount Nakadake, Kujū","44",131.249,33.086,1791,2],["Mount Kunimi","43",131.008,32.578,1739,0],["Mount Daisen","31",133.546,35.371,1729,1],["Mount Rishiri","01",141.243,45.178,1721,1],["Mount Karakuni","45",130.861,31.931,1700,2],["Mount Hiru","14",139.135,35.472,1673,0],["Mount Yūbari","01",142.253,43.093,1668,0],["Mount Rausu","01",145.122,44.075,1661,1],["Mount Iwaki","02",140.303,40.656,1625,1],["Mount Aso, Taka-dake","43",131.104,32.884,1592,2],["Mount Hakkōda","02",140.881,40.659,1585,1],["Mount Shari","01",144.72,43.766,1547,1],["Mount Hyōno","28",134.51,35.36,1510,0],["Mount Unzen","42",130.299,32.761,1483,2],["Mount Haruna","10",138.869,36.47,1449,1],["Mount Chausu","23",137.56,35.203,1415,0],["Mount Osorakan","32",132.086,34.641,1346,0],["Mount Ushiro","33",134.194,35.286,1345,0],["Mount Jakuchi","35",132.008,34.487,1337,0],["Mount Ibuki","25",136.406,35.418,1377,0],["Mount Gomadan","30",135.586,34.045,1372,0],["Mount Sannomine","18",136.762,36.078,2128,0],["Mount Kyōgatake","41",130.083,33.234,1076,0],["Mount Shakadake","40",130.87,33.226,1231,0],["Mount Kongō","27",135.673,34.419,1125,0],["Mount Sanbe","32",132.622,35.143,1126,1],["Mount Ryūō","37",133.976,34.129,1060,0],["Mount Yamizo","08",140.311,36.887,1022,0],["Mount Minago","26",135.774,35.191,972,0],["Sakurajima","46",130.657,31.585,1117,2],["Mount Kaimon","46",130.528,31.18,924,1],["Mount Usu","01",140.839,42.544,733,2],["Mount Tsukuba","08",140.107,36.225,877,0],["Mount Hiei","26",135.834,35.072,848,0],["Mount Kōya","30",135.583,34.213,1009,0],["Mount Takao","13",139.244,35.625,599,0],["Mount Miune","39",133.976,33.836,1894,0],["Mount Ōdaigahara","24",136.106,34.183,1695,0],["Mount Atago","12",140.098,35.239,408,0],["Mount Omoto","47",124.196,24.428,526,0]],"her":[["Buddhist Monuments in the Hōryū-ji Area","29",135.734,34.615,1993,0],["Himeji-jō","28",134.694,34.839,1993,0],["Yakushima","46",130.52,30.343,1993,1],["Shirakami-Sanchi","02",140.1,40.5,1993,1],["Historic Monuments of Ancient Kyoto","26",135.729,35.039,1994,0],["Historic Villages of Shirakawa-gō and Gokayama","21",136.906,36.257,1995,0],["Hiroshima Peace Memorial, Genbaku Dome","34",132.454,34.396,1996,0],["Itsukushima Shinto Shrine","34",132.32,34.296,1996,0],["Historic Monuments of Ancient Nara","29",135.84,34.689,1998,0],["Shrines and Temples of Nikkō","09",139.599,36.758,1999,0],["Gusuku Sites of the Kingdom of Ryukyu","47",127.719,26.217,2000,0],["Sacred Sites and Pilgrimage Routes in the Kii Mountain Range","30",135.79,33.84,2004,0],["Shiretoko","01",145.1,44.15,2005,1],["Iwami Ginzan Silver Mine","32",132.436,35.113,2007,0],["Hiraizumi","03",141.1,38.987,2011,0],["Ogasawara Islands","13",142.195,27.095,2011,1],["Fujisan","22",138.727,35.361,2013,0],["Tomioka Silk Mill","10",138.888,36.255,2014,0],["Sites of Japan's Meiji Industrial Revolution","42",129.738,32.628,2015,0],["National Museum of Western Art","13",139.776,35.715,2016,0],["Sacred Island of Okinoshima","40",130.106,34.244,2017,0],["Hidden Christian Sites in the Nagasaki Region","42",129.7,32.7,2018,0],["Mozu-Furuichi Kofun Group","27",135.488,34.564,2019,0],["Amami-Ōshima, Tokunoshima, Northern Okinawa and Iriomote","46",129.4,28.3,2021,1],["Jōmon Prehistoric Sites in Northern Japan","01",140.694,40.812,2021,0],["Sado Island Gold Mines","15",138.26,38.05,2024,0]],"cas":[["Himeji Castle","28",134.694,34.839,0],["Matsumoto Castle","20",137.969,36.239,0],["Hikone Castle","25",136.252,35.276,0],["Inuyama Castle","23",136.939,35.388,0],["Matsue Castle","32",133.05,35.475,0],["Hirosaki Castle","02",140.464,40.608,1],["Maruoka Castle","18",136.272,36.153,1],["Bitchū Matsuyama Castle","33",133.622,34.809,1],["Marugame Castle","37",133.8,34.286,1],["Matsuyama Castle","38",132.766,33.845,1],["Uwajima Castle","38",132.564,33.22,1],["Kōchi Castle","39",133.531,33.561,1],["Kumamoto Castle","43",130.706,32.806,2],["Osaka Castle","27",135.526,34.687,2],["Nagoya Castle","23",136.899,35.185,2],["Nijō Castle","26",135.748,35.014,1],["Aizu-Wakamatsu Castle","07",139.93,37.488,2],["Shuri Castle","47",127.719,26.217,2]],"cap":[["Asuka","29",135.82,34.468,592,694,0],["Naniwa-kyō","27",135.52,34.683,645,655,0],["Ōtsu-kyō","25",135.87,35.017,667,672,0],["Fujiwara-kyō","29",135.807,34.503,694,710,0],["Heijō-kyō","29",135.796,34.691,710,784,0],["Kuni-kyō","26",135.842,34.762,740,744,0],["Nagaoka-kyō","26",135.696,34.926,784,794,0],["Heian-kyō","26",135.744,35.012,794,1868,0],["Kamakura","14",139.55,35.319,1185,1333,1],["Muromachi, Kyoto","26",135.752,35.03,1336,1573,1],["Edo","13",139.753,35.685,1603,1868,1],["Tokyo","13",139.753,35.685,1868,0,0]],"seas":[["Sea of Japan",135.9,39.3,2,"日本海","日本海"],["Pacific Ocean",142.9,33.6,2,"太平洋","太平洋"],["Sea of Okhotsk",144.8,45.3,2,"鄂霍次克海","オホーツク海"],["East China Sea",126.4,29.4,2,"東海","東シナ海"],["Philippine Sea",136.6,26.8,2,"菲律賓海","フィリピン海"],["Seto Inland Sea",133.15,34.1,1,"瀨戶內海","瀬戸内海"],["Tokyo Bay",139.83,35.36,0,"東京灣","東京湾"],["Ise Bay",136.76,34.76,0,"伊勢灣","伊勢湾"],["Osaka Bay",135.1,34.45,0,"大阪灣","大阪湾"],["Toyama Bay",137.45,37.05,0,"富山灣","富山湾"],["Mutsu Bay",140.86,41.05,0,"陸奧灣","陸奥湾"],["Ariake Sea",130.28,32.95,0,"有明海","有明海"],["Kagoshima Bay",130.68,31.35,0,"鹿兒島灣","鹿児島湾"],["Suruga Bay",138.55,34.82,0,"駿河灣","駿河湾"],["Wakasa Bay",135.7,35.66,0,"若狹灣","若狭湾"],["Sendai Bay",141.3,38.15,0,"仙臺灣","仙台湾"],["Genkai Sea",130.3,34,0,"玄界灘","玄界灘"],["Tsugaru Strait",140.55,41.62,0,"津輕海峽","津軽海峡"],["Kanmon Strait",130.98,33.99,0,"關門海峽","関門海峡"],["Sōya Strait",141.9,45.75,0,"宗谷海峽","宗谷海峡"],["Tsushima Strait",129.75,34.05,0,"對馬海峽","対馬海峡"],["Naruto Strait",134.66,34.23,0,"鳴門海峽","鳴門海峡"],["Kii Channel",134.9,34,0,"紀伊水道","紀伊水道"],["Akashi Strait",134.99,34.61,0,"明石海峽","明石海峡"],["Bungo Channel",132.3,33,0,"豐後水道","豊後水道"]]};



/* -------------------------------------------------------------------------
   React-compatible initializer for the original runtime script.
   The original JavaScript body below is preserved verbatim and executes only
   after the JSX DOM has mounted, replacing the original inline-script timing.
   ------------------------------------------------------------------------- */
function initializeJapanAtlas() {
'use strict';
/* ==========================================================================
   Japan Reference Atlas
   Built to the same specification as the United States sheet: fluid type,
   a conic projection with fitted inset frames, viewBox zoom with markers
   counter-scaled so a dot stays a dot, screen-space decluttering, and a
   record that opens beneath the map rather than floating over it.
   ========================================================================== */
var $=function(s,r){return (r||document).querySelector(s);};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var NS='http://www.w3.org/2000/svg';
function el(t,a){var n=document.createElementNS(NS,t);if(a)for(var k in a)n.setAttribute(k,a[k]);return n;}
function fmt(n){return Number(n).toLocaleString(cur==='zh'?'zh-Hant-TW':cur==='ja'?'ja-JP':'en-US');}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){
  return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
var RAD=Math.PI/180;

/* ---------------------------------------------------------------- i18n --- */
var cur='en';
var LI=function(){return cur==='zh'?1:cur==='ja'?2:0;};
function T(k){var v=STR[k];return v?(v[LI()]||v[0]):k;}
/* trilingual arrays travel with the data, so a name is just an index */
function L3(a){return a?(a[LI()]||a[0]):'';}
function pn(c){return PR[c]?L3(PR[c].n):c;}

/* ----------------------------------------------------------- projection -- */
function conicRaw(p0,p1){
  var s0=Math.sin(p0*RAD), n=(s0+Math.sin(p1*RAD))/2;
  var c=1+s0*(2*n-s0), r0=Math.sqrt(c)/n;
  return function(lam,phi){
    var r=Math.sqrt(Math.max(c-2*n*Math.sin(phi),0))/n, x=lam*n;
    return [r*Math.sin(x), r0-r*Math.cos(x)];
  };
}
function mkSub(par,rot,ctr,k,tx,ty){
  var raw=conicRaw(par[0],par[1]), c=raw(ctr[0]*RAD,ctr[1]*RAD);
  var dx=tx-k*c[0], dy=ty+k*c[1];
  var f=function(lon,lat){
    var lam=(lon+rot)*RAD;
    while(lam>Math.PI) lam-=2*Math.PI;
    while(lam<-Math.PI) lam+=2*Math.PI;
    var p=raw(lam,lat*RAD);
    return [dx+k*p[0], dy-k*p[1]];
  };
  f.k=k; return f;
}
/* Each frame is fitted to its box: project once at unit scale, measure, then
   choose the scale and offset that centre the subject. Nothing is hand tuned. */
function fitSub(par,rot,ctr,pts,box,pad){
  function span(f){
    var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
    for(var i=0;i<pts.length;i++){
      var q=f(pts[i][0],pts[i][1]);
      if(q[0]<x0)x0=q[0]; if(q[0]>x1)x1=q[0];
      if(q[1]<y0)y0=q[1]; if(q[1]>y1)y1=q[1];
    }
    return [x0,y0,x1-x0,y1-y0];
  }
  var probe=mkSub(par,rot,ctr,1000,0,0), s1=span(probe);
  var k=1000*Math.min((box[2]-2*pad)/Math.max(s1[2],1e-6),
                      (box[3]-2*pad)/Math.max(s1[3],1e-6));
  var f2=mkSub(par,rot,ctr,k,0,0), s2=span(f2);
  return mkSub(par,rot,ctr,k,
    box[0]+box[2]/2-(s2[0]+s2[2]/2),
    box[1]+box[3]/2-(s2[1]+s2[3]/2));
}
/* The sheet is proportioned to its subject. Japan's main arc is close to
   square, so the frame is taller than the American one. */
var SHEET=[0,0,760,1000];
var BOX={main:[8,6,744,850], NS:[8,864,364,130], OG:[388,864,364,130]};
function zoneOf(lon,lat){
  if(lon>140&&lat<30.2) return 2;             /* Ogasawara */
  if(lat<30.2&&lon<133.5) return 1;           /* Nansei, Amami through Yonaguni */
  return 0;
}
var ZKEY=['main','NS','OG'];
(function(){
  var pool=[[],[],[]];
  function add(r){
    var z=zoneOf(r[0][0],r[0][1]);
    var step=Math.max(1,Math.floor(r.length/40));
    for(var i=0;i<r.length;i+=step) pool[z].push(r[i]);
    pool[z].push(r[r.length-1]);
  }
  Object.keys(GEO.coast).forEach(function(k){add(GEO.coast[k]);});
  window.__pool=pool;
})();
var SUBS=[
  fitSub([32,44],-137,[0,38.2],window.__pool[0],BOX.main,8),
  fitSub([24.6,28.2],-127.5,[0,26.4],window.__pool[1],BOX.NS,10),
  fitSub([26.6,27.2],-142.2,[0,26.9],window.__pool[2],BOX.OG,12)
];
function proj(lon,lat){var z=zoneOf(lon,lat);return {p:SUBS[z](lon,lat),z:z};}
function ringZone(r){
  var t=[0,0,0], step=Math.max(1,Math.floor(r.length/14));
  for(var i=0;i<r.length;i+=step) t[zoneOf(r[i][0],r[i][1])]++;
  var b=0; for(var k=1;k<3;k++) if(t[k]>t[b]) b=k;
  return b;
}
function projRing(r){
  var fn=SUBS[ringZone(r)], out=[];
  for(var i=0;i<r.length;i++) out.push(fn(r[i][0],r[i][1]));
  return out;
}
function dOf(pts,close){
  if(pts.length<2) return '';
  var d='M'+pts[0][0].toFixed(1)+' '+pts[0][1].toFixed(1);
  for(var i=1;i<pts.length;i++) d+='L'+pts[i][0].toFixed(1)+' '+pts[i][1].toFixed(1);
  return d+(close?'Z':'');
}
function pathOf(rings,close){
  var d=''; for(var i=0;i<rings.length;i++) d+=dOf(projRing(rings[i]),close);
  return d;
}

/* ---------------------------------------------------------- build the map -- */
var svg=$('#map'), defs=el('defs'), root=el('g');
svg.setAttribute('viewBox',SHEET.join(' '));
svg.appendChild(defs); svg.appendChild(root);
root.appendChild(el('rect',{x:-600,y:-600,width:2400,height:2400,fill:'var(--sea)'}));
var L={}, ORDER=['grat','coast','prefs','muni','physio','water','rivers','ranges',
                 'parks','heritage','castles','peaks','cities','caps','hit','names'];
ORDER.forEach(function(k){L[k]=el('g',{'data-layer':k});root.appendChild(L[k]);});

/* land clip: the tessellated prefectures are trimmed to the coastline */
var clip=el('clipPath',{id:'landclip',clipPathUnits:'userSpaceOnUse'});
Object.keys(GEO.coast).forEach(function(k){
  clip.appendChild(el('path',{d:dOf(projRing(GEO.coast[k]),true)}));
});
defs.appendChild(clip);
L.prefs.setAttribute('clip-path','url(#landclip)');

['NS','OG'].forEach(function(k){
  var b=BOX[k];
  L.grat.appendChild(el('rect',{x:b[0],y:b[1],width:b[2],height:b[3],rx:5,'class':'ibox'}));
});

var paths={}, SCHEM={}, bbox={};
function measure(d){
  var n=d.match(/-?\d+(?:\.\d+)?/g); if(!n) return null;
  var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for(var i=0;i<n.length;i+=2){var x=+n[i],y=+n[i+1];
    if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y;}
  return [x0,y0,x1-x0,y1-y0];
}
CODES.forEach(function(c){ if(GEO.pref[c]) SCHEM[c]=pathOf(GEO.pref[c],true); });
var COASTD=''; Object.keys(GEO.coast).forEach(function(k){
  COASTD+=dOf(projRing(GEO.coast[k]),true);});

/* A tessellated cell reaches far past the coast, so its bounding box is no
   guide to where the prefecture actually is: Tokyo's cell alone spans more
   than the whole sheet. Until surveyed geometry replaces the cells, the box
   is taken from the anchor and every point feature the prefecture owns. */
function contentBox(c){
  var home=zoneOf(PR[c].anch[0],PR[c].anch[1]), pts=[PR[c].anch];
  function take(x){ if(x[1]===c&&zoneOf(x[2],x[3])===home) pts.push([x[2],x[3]]); }
  /* Points carried in another frame, such as Tokyo's Ogasawara heritage or
     Kagoshima's Amami municipalities, would otherwise stretch the box across
     the whole sheet. Only the prefecture's own frame counts. */
  GEO.cities.forEach(take); GEO.peaks.forEach(take);
  GEO.cas.forEach(take); GEO.her.forEach(take); GEO.cap.forEach(take);
  var x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;
  for(var i=0;i<pts.length;i++){
    var q=proj(pts[i][0],pts[i][1]).p;
    if(q[0]<x0)x0=q[0]; if(q[0]>x1)x1=q[0];
    if(q[1]<y0)y0=q[1]; if(q[1]>y1)y1=q[1];
  }
  var pad=Math.max(8,Math.max(x1-x0,y1-y0)*0.16);
  return [x0-pad,y0-pad,(x1-x0)+pad*2,(y1-y0)+pad*2];
}
function drawPrefs(src,clipped){
  L.prefs.textContent=''; paths={};
  if(clipped) L.prefs.setAttribute('clip-path','url(#landclip)');
  else L.prefs.removeAttribute('clip-path');
  CODES.forEach(function(c){
    var d=src[c]; if(!d) return;
    var p=el('path',{d:d,'class':'st','data-c':c,tabindex:'0',role:'button'});
    p.setAttribute('aria-label',pn(c));
    paths[c]=p; L.prefs.appendChild(p);
    bbox[c]=clipped?contentBox(c):measure(d);
  });
  L.coast.textContent='';
  L.coast.appendChild(el('path',{d:COASTD,'class':'coast'}));
  wirePrefs(); placeCodes(); buildHitTargets();
}
/* Kagawa is a fraction of a pixel across at sheet scale. Anything that small
   gets an invisible target of constant screen size so it can be picked. */
function buildHitTargets(){
  L.hit.textContent='';
  CODES.forEach(function(c){
    var b=bbox[c]; if(!b) return;
    if(Math.max(b[2],b[3])>=13) return;
    var a=PR[c].anch, q=proj(a[0],a[1]);
    var g=el('g',{transform:'translate('+q.p[0].toFixed(1)+' '+q.p[1].toFixed(1)+')'});
    var inner=el('g',{'class':'mk'});
    var ci=el('circle',{cx:0,cy:0,r:6.5,fill:'transparent','pointer-events':'all','data-c':c});
    ci.setAttribute('aria-hidden','true');
    inner.appendChild(ci); g.appendChild(inner); L.hit.appendChild(g);
  });
}

/* graticule */
(function(){
  var f=SUBS[0], lines=[];
  for(var lon=126;lon<=148;lon+=4){
    var a=[]; for(var la=29;la<=47;la+=0.5) a.push(f(lon,la)); lines.push(a);
  }
  for(var lat=30;lat<=46;lat+=4){
    var b=[]; for(var lo=125;lo<=148;lo+=0.5) b.push(f(lo,lat)); lines.push(b);
  }
  lines.forEach(function(pts){L.grat.appendChild(el('path',{d:dOf(pts,false),'class':'grat'}));});
})();

var lblWater=[],lblRiver=[],lblRange=[],lblPhysio=[],lblPark=[],lblCity=[],
    lblInset=[],lblPeak=[],lblHer=[],lblCas=[],lblCap=[],lblSea=[];

/* seas and straits, italic like the American sheet's water names */
GEO.seas.forEach(function(s){
  var q=proj(s[1],s[2]);
  var t=el('text',{x:q.p[0].toFixed(1),y:q.p[1].toFixed(1),'class':'tw',
    'text-anchor':'middle','data-lbl':s[3]===2?'w1':'w2'});
  t.dataset.term=s[0]; L.names.appendChild(t); lblSea.push(t);
});
/* lakes */
Object.keys(GEO.lakes).forEach(function(n){
  var pts=projRing(GEO.lakes[n]), d=dOf(pts,true); if(!d) return;
  L.water.appendChild(el('path',{d:d,'class':'lake'}));
  var b=measure(d); if(!b) return;
  var t=el('text',{x:(b[0]+b[2]/2).toFixed(1),y:(b[1]+b[3]/2).toFixed(1),
    'class':'tw twl','text-anchor':'middle','data-lbl':'w2'});
  t.dataset.term=n; L.names.appendChild(t); lblWater.push(t);
});
/* watercourses, drawn in bands so they widen toward the mouth */
Object.keys(GEO.rivers).forEach(function(n){
  var pts=projRing(GEO.rivers[n]); if(pts.length<2) return;
  var bands=6, per=Math.max(2,Math.ceil((pts.length-1)/bands)), total=Math.ceil((pts.length-1)/per);
  for(var b=0,i=0;i<pts.length-1;b++,i+=per){
    var seg=pts.slice(i,Math.min(pts.length,i+per+1));
    var t=total>1?(b/(total-1)):1;
    var p=el('path',{d:dOf(seg,false),'class':'riv'});
    p.style.strokeWidth='calc(var(--u) * '+(0.4+1.15*t).toFixed(2)+'px)';
    L.rivers.appendChild(p);
  }
  var id='r'+n.replace(/\W+/g,'');
  defs.appendChild(el('path',{id:id,d:dOf(pts,false)}));
  var tx=el('text',{'class':'tw twl','data-lbl':'w1'});
  var tp=el('textPath',{startOffset:'46%'}); tp.setAttribute('href','#'+id);
  tx.dataset.term=n; tx.appendChild(tp); L.names.appendChild(tx);
  lblRiver.push({t:tx,tp:tp,id:id});
});
/* ranges */
Object.keys(GEO.ranges).forEach(function(n){
  var pts=projRing(GEO.ranges[n]); if(pts.length<2) return;
  var d=dOf(pts,false), id='g'+n.replace(/\W+/g,'');
  defs.appendChild(el('path',{id:id,d:d}));
  L.ranges.appendChild(el('path',{d:d,'class':'rng'}));
  var t=el('text',{'class':'tg','data-lbl':'g1'});
  var tp=el('textPath',{startOffset:'40%'}); tp.setAttribute('href','#'+id);
  t.dataset.term=n; t.appendChild(tp); L.ranges.appendChild(t);
  lblRange.push({t:t,tp:tp,id:id});
});
/* plains */
GEO.plains.forEach(function(r){
  var q=proj(r[0],r[1]);
  var t=el('text',{x:q.p[0].toFixed(1),y:q.p[1].toFixed(1),'class':'tp','data-lbl':'p1'});
  t.dataset.term=r[2]; L.physio.appendChild(t); lblPhysio.push(t);
});
/* national parks */
GEO.parks.forEach(function(p){
  var q=proj(p[1],p[2]);
  var g=el('g',{'data-pk':p[0],'data-y':p[3],style:'cursor:pointer',
    transform:'translate('+q.p[0].toFixed(1)+' '+q.p[1].toFixed(1)+')'});
  var mk=el('g',{'class':'mk'});
  mk.appendChild(el('circle',{cx:0,cy:0,r:2.5,'class':'pk'}));
  var t=el('text',{x:4.4,y:3,'class':'pkl','data-lbl':'k1'});
  t.dataset.term=p[0]; mk.appendChild(t); g.appendChild(mk);
  L.parks.appendChild(g); lblPark.push(t);
});
/* summits */
GEO.peaks.forEach(function(k){
  var q=proj(k[2],k[3]);
  var g=el('g',{'data-peak':k[0],'data-c':k[1],'data-m':k[4],style:'cursor:pointer',
    transform:'translate('+q.p[0].toFixed(1)+' '+q.p[1].toFixed(1)+')'});
  var mk=el('g',{'class':'mk'});
  mk.appendChild(el('path',{d:'M0 -3.6L3.1 2.1L-3.1 2.1Z',
    'class':'sm'+(k[5]===2?' sma':k[5]===1?' smv':'')}));
  var t=el('text',{x:4.4,y:3,'class':'sml','data-lbl':k[4]>=2500?'m1':'m2'});
  t.dataset.term=k[0]; mk.appendChild(t); g.appendChild(mk);
  L.peaks.appendChild(g); lblPeak.push(t);
});
/* inscribed heritage */
GEO.her.forEach(function(k){
  var q=proj(k[2],k[3]);
  var g=el('g',{'data-her':k[0],'data-c':k[1],'data-y':k[4],style:'cursor:pointer',
    transform:'translate('+q.p[0].toFixed(1)+' '+q.p[1].toFixed(1)+')'});
  var mk=el('g',{'class':'mk'});
  mk.appendChild(el('path',{d:'M0 -3.5L3.5 0L0 3.5L-3.5 0Z','class':'hr'+(k[5]?' hrn':'')}));
  var t=el('text',{x:4.4,y:3,'class':'hrl','data-lbl':'h1'});
  t.dataset.term=k[0]; mk.appendChild(t); g.appendChild(mk);
  L.heritage.appendChild(g); lblHer.push(t);
});
/* castles */
GEO.cas.forEach(function(k){
  var q=proj(k[2],k[3]);
  var g=el('g',{'data-cas':k[0],'data-c':k[1],style:'cursor:pointer',
    transform:'translate('+q.p[0].toFixed(1)+' '+q.p[1].toFixed(1)+')'});
  var mk=el('g',{'class':'mk'});
  mk.appendChild(el('path',{d:'M-3 2.6L-3 -0.6L0 -3.4L3 -0.6L3 2.6Z',
    'class':'cs'+(k[4]===0?' csn':'')}));
  var t=el('text',{x:4.4,y:3,'class':'csl','data-lbl':'x1'});
  t.dataset.term=k[0]; mk.appendChild(t); g.appendChild(mk);
  L.castles.appendChild(g); lblCas.push(t);
});
/* historic capitals */
GEO.cap.forEach(function(k){
  var q=proj(k[2],k[3]);
  var g=el('g',{'data-cap2':k[0],'data-c':k[1],style:'cursor:pointer',
    transform:'translate('+q.p[0].toFixed(1)+' '+q.p[1].toFixed(1)+')'});
  var mk=el('g',{'class':'mk'});
  mk.appendChild(el('circle',{cx:0,cy:0,r:3.4,'class':'cp'}));
  mk.appendChild(el('circle',{cx:0,cy:0,r:1.2,'class':'cpi'}));
  var t=el('text',{x:5,y:3.1,'class':'cpl','data-lbl':'q1'});
  t.dataset.term=k[0]; mk.appendChild(t); g.appendChild(mk);
  L.caps.appendChild(g); lblCap.push(t);
});
/* settlement, in five tiers so that zoom reveals more */
function cityTier(pop,cap){
  if(cap||pop>=1000000) return 0;
  if(pop>=400000) return 1;
  if(pop>=200000) return 2;
  if(pop>=100000) return 3;
  return 4;
}
GEO.cities.forEach(function(c){
  var q=proj(c[2],c[3]), tier=cityTier(c[4],c[5]);
  var g=el('g',{'data-cty':c[0],'data-c':c[1],'data-pop':c[4],'data-cap':c[5]?'1':'0',
    'data-tier':tier,style:'cursor:pointer',
    transform:'translate('+q.p[0].toFixed(1)+' '+q.p[1].toFixed(1)+')'});
  var mk=el('g',{'class':'mk'});
  if(c[5]){
    mk.appendChild(el('circle',{cx:0,cy:0,r:3.1,'class':'ctc'}));
    mk.appendChild(el('circle',{cx:0,cy:0,r:1.2,'class':'ct'}));
  } else {
    var r=c[4]>1500000?2.1:c[4]>700000?1.65:c[4]>250000?1.25:1;
    mk.appendChild(el('circle',{cx:0,cy:0,r:r,'class':'ct'}));
  }
  var t=el('text',{x:4.8,y:3.1,'class':'ctl'+(c[5]?' cap':''),'data-lbl':'c'+tier});
  t.dataset.term=c[0]; mk.appendChild(t); g.appendChild(mk);
  L.cities.appendChild(g); lblCity.push(t);
});
/* prefecture names, then inset captions */
var lblCode=[];
CODES.forEach(function(c){
  var t=el('text',{'class':'tl','data-lbl':'s1'});
  t.dataset.c=c; L.names.appendChild(t); lblCode.push({t:t,c:c});
});
function placeCodes(){
  lblCode.forEach(function(o){
    var a=PR[o.c].anch, q=proj(a[0],a[1]);
    o.t.setAttribute('x',q.p[0].toFixed(1)); o.t.setAttribute('y',(q.p[1]+3).toFixed(1));
  });
}
var INSETN={
  NS:[['NANSEI ISLANDS','RYUKYU IS.','RYUKYU'],
      ['南西諸島','琉球群島','琉球'],
      ['南西諸島','琉球諸島','琉球']],
  OG:[['OGASAWARA ISLANDS','OGASAWARA IS.','OGASAWARA'],
      ['小笠原群島','小笠原'],['小笠原諸島','小笠原']]};
['NS','OG'].forEach(function(k){
  var b=BOX[k];
  var t=el('text',{x:(b[0]+b[2]/2).toFixed(1),y:(b[1]+b[3]+13).toFixed(1),
    'class':'il','text-anchor':'middle'});
  t.dataset.code=k; L.names.appendChild(t); lblInset.push(t);
});

drawPrefs(SCHEM,true);

/* ------------------------------------------------------------ interaction -- */
var tip=$('#tip'), stage=$('#stage'), reader=$('#reader'), sel=null;
function showTip(html,e){
  tip.innerHTML=html;
  var r=stage.getBoundingClientRect();
  tip.style.left=Math.max(60,Math.min(r.width-60,e.clientX-r.left))+'px';
  tip.style.top=(e.clientY-r.top)+'px';
  tip.style.opacity='1';
}
function hideTip(){tip.style.opacity='0';}
function wirePrefs(){
  Object.keys(paths).forEach(function(c){
    var p=paths[c];
    p.addEventListener('keydown',function(e){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openPref(c);}});
    p.addEventListener('pointerenter',function(e){
      if(e.pointerType==='touch') return;
      showTip('<b>'+esc(pn(c))+'</b><span>'+fmt(PR[c].pop)+' \u00B7 '
        +fmt(PR[c].area)+' km\u00B2</span>',e);});
    p.addEventListener('pointermove',function(e){
      if(e.pointerType!=='touch'&&tip.style.opacity==='1'){
        var r=stage.getBoundingClientRect();
        tip.style.left=Math.max(60,Math.min(r.width-60,e.clientX-r.left))+'px';
        tip.style.top=(e.clientY-r.top)+'px';}});
    p.addEventListener('pointerleave',hideTip);
  });
  if(sel&&paths[sel]) paths[sel].classList.add('sel');
}
function wireMarkers(){
  $$('[data-pk],[data-cty],[data-peak],[data-her],[data-cas],[data-cap2]',svg).forEach(function(g){
    g.addEventListener('pointerenter',function(e){
      if(e.pointerType==='touch') return;
      e.stopPropagation();
      var c=g.getAttribute('data-c'), who=c&&PR[c]?pn(c):'';
      var h='';
      if(g.hasAttribute('data-pk'))
        h='<b>'+esc(G(g.getAttribute('data-pk')))+'</b><span>'+esc(T('cEst'))+' '+g.getAttribute('data-y')+'</span>';
      else if(g.hasAttribute('data-peak'))
        h='<b>'+esc(G(g.getAttribute('data-peak')))+'</b><span>'+fmt(+g.getAttribute('data-m'))+' m \u00B7 '+esc(who)+'</span>';
      else if(g.hasAttribute('data-her'))
        h='<b>'+esc(G(g.getAttribute('data-her')))+'</b><span>UNESCO '+g.getAttribute('data-y')+' \u00B7 '+esc(who)+'</span>';
      else if(g.hasAttribute('data-cas'))
        h='<b>'+esc(G(g.getAttribute('data-cas')))+'</b><span>'+esc(T('kCastle'))+' \u00B7 '+esc(who)+'</span>';
      else if(g.hasAttribute('data-cap2'))
        h='<b>'+esc(G(g.getAttribute('data-cap2')))+'</b><span>'+esc(T('kSeat'))+' \u00B7 '+esc(who)+'</span>';
      else
        h='<b>'+esc(G(g.getAttribute('data-cty')))+'</b><span>'
          +(g.getAttribute('data-cap')==='1'?esc(T('kCap'))+' \u00B7 ':'')
          +fmt(+g.getAttribute('data-pop'))+' \u00B7 '+esc(who)+'</span>';
      showTip(h,e);});
    g.addEventListener('pointerleave',hideTip);
  });
}
wireMarkers();

/* ---------------------------------------------------------------- reader -- */
function chips(a,cls){
  if(!a||!a.length) return '<span style="color:var(--ink3);font-style:italic">'+T('none')+'</span>';
  return '<div class="chips">'+a.map(function(x){
    return '<span class="chip '+cls+'">'+esc(x)+'</span>';}).join('')+'</div>';
}
function cell(v,l){return '<div><div class="v">'+v+'</div><div class="tag">'+l+'</div></div>';}
function clearSel(){Object.keys(paths).forEach(function(k){paths[k].classList.remove('sel');});}
/* Scroll just far enough to show the record's heading. Jumping it to the top of
   the viewport pushes the map out of sight, which makes picking a second
   prefecture awkward. */
function revealRecord(){
  var r=reader.getBoundingClientRect(), want=window.innerHeight-150;
  if(r.top>want+8){
    var dy=r.top-want;
    if(window.scrollBy) window.scrollBy({top:dy,left:0,behavior:'smooth'});
    else window.scrollTo(0,window.pageYOffset+dy);
  } else if(r.bottom<80) reader.scrollIntoView({behavior:'smooth',block:'center'});
}
function showHint(){
  var tot=0,ar=0; CODES.forEach(function(c){tot+=PR[c].pop;ar+=PR[c].area;});
  sel=null;
  reader.innerHTML='<div class="hint"><span class="tag">'+T('promptH')+'</span>'
   +'<p>'+T('promptP')+'</p><div class="natg">'
   +cell(fmt(tot),T('nPop'))+cell(fmt(ar),T('nArea'))
   +cell('47',T('nPref'))+cell(String(PROV.length),T('nProv'))
   +cell(String(GEO.parks.length),T('nParks'))+cell(String(GEO.her.length),T('nHer'))
   +cell('3,776',T('nHi'))+cell('&minus;4',T('nLo'))
   +cell(fmt(GEO.cities.length),T('nMuni'))+cell('14,125',T('nIsl'))+'</div></div>';
}
function openPref(c){
  var s=PR[c]; if(!s) return;
  clearSel();
  if(paths[c]) paths[c].classList.add('sel');
  sel=c; hideTip();
  var provs=s.prov.map(function(k){var v=PVBY[k];return v?L3(v):k;});
  reader.innerHTML=
   '<div class="rd-h"><div style="min-width:0"><span class="tag">'+esc(L3(s.reg))+'</span>'
   +'<h2>'+esc(L3(s.n))+'</h2><div class="nick">'+esc(LI()===0?s.n[2]:s.n[0])+'</div></div>'
   +'<button class="rd-x" id="rdX" aria-label="Close">&times;</button></div>'
   +'<div class="rd-b">'
   +'<div class="blk"><div class="figs">'
   +'<div><div class="v">'+fmt(s.pop)+'</div><div class="tag">'+T('fPop')+'</div>'
     +'<div class="r">'+T('rank')+' '+s.pr+'</div></div>'
   +'<div><div class="v">'+fmt(s.area)+'</div><div class="tag">'+T('fArea')+'</div>'
     +'<div class="r">'+T('rank')+' '+s.ar+'</div></div>'
   +'<div><div class="v">'+Math.round(s.den)+'</div><div class="tag">'+T('fDen')+'</div>'
     +'<div class="r">'+T('rank')+' '+s.dr+'</div></div>'
   +'<div><div class="v">'+String(c)+'</div><div class="tag">'+T('fCode')+'</div></div>'
   +'<div><div class="v">'+s.prov.length+'</div><div class="tag">'+T('fProvN')+'</div></div>'
   +'</div></div>'
   +'<div class="blk"><dl class="kv">'
   +'<dt>'+T('kCap')+'</dt><dd>'+esc(L3(s.cap))+'</dd>'
   +'<dt>'+T('kBig')+'</dt><dd>'+esc(G(s.big[0]))+' <span class="mono">'+fmt(s.bigp)+'</span></dd>'
   +'<dt>'+T('kFlower')+'</dt><dd>'+esc(L3(s.fl))+'</dd>'
   +'<dt>'+T('kHigh')+'</dt><dd>'+esc(G(s.hi[0]))+' <span class="mono">'+fmt(s.hi[1])+' m</span></dd>'
   +'<dt>'+T('kShare')+'</dt><dd class="mono">'+(100*s.pop/NATPOP).toFixed(2)+'%</dd>'
   +'</dl></div>'
   +'<div class="blk"><span class="tag">'+T('bRelief')+'</span>'
   +'<div class="relief"><div><div class="tag">'+T('rHigh')+'</div>'+esc(G(s.hi[0]))
     +' <span class="mono" style="color:var(--tobi)">'+fmt(s.hi[1])+'</span></div>'
   +'<div style="text-align:right"><div class="tag">'+T('rDen')+'</div>'
     +'<span class="mono" style="color:var(--hanada)">'+Math.round(s.den)+'</span></div></div>'
   +'<div class="track"><span style="width:'+(Math.max(0,s.hi[1])/3776*100).toFixed(1)+'%"></span></div>'
   +'<div class="mini"><span>0</span><span>'+T('rCap')+'</span><span>3,776</span></div></div>'
   +'<div class="blk"><span class="tag">'+T('bProv')+'</span>'+chips(provs,'r')+'</div>'
   +'<div class="blk"><span class="tag">'+T('bPhys')+'</span>'
     +'<p class="prose">'+esc(s.note[LI()])+'</p></div>'
   +'<div class="blk"><span class="tag">'+T('bFeat')+'</span>'
     +chips(s.nat.map(L3),'')+'</div>'
   +'<div class="blk"><span class="tag">'+T('bPeaks')+'</span>'
     +chips(s.pk.map(function(k){return L3(k)+' '+fmt(k[3])+' m';}),'r')+'</div>'
   +'<div class="blk"><span class="tag">'+T('bHer')+'</span>'
     +chips(s.her.map(L3),'p')+'</div>'
   +'<div class="blk"><span class="tag">'+T('bCas')+'</span>'
     +chips(s.cas.map(L3),'')+'</div>'
   +'<div class="blk"><span class="tag">'+T('bFood')+'</span>'
     +chips(s.food.map(L3),'w')+'</div></div>';
  $('#rdX').addEventListener('click',closeReader);
  if(typeof typeset==='function') typeset();
  revealRecord();
}
function closeReader(){ clearSel(); showHint(); }

/* ------------------------------------------------------------- zoom / pan -- */
var V=SHEET.slice(), V0=SHEET.slice(), MINW=V0[2]/26, anim=null;
function syncU(){
  var r=svg.getBoundingClientRect();
  if(r.width<=0||r.height<=0) return;
  var sc=Math.min(r.width/V[2],r.height/V[3]);
  if(sc>0) svg.style.setProperty('--u',(1/sc).toFixed(5));
}
function applyVB(){
  svg.setAttribute('viewBox',V[0].toFixed(2)+' '+V[1].toFixed(2)+' '+V[2].toFixed(2)+' '+V[3].toFixed(2));
  syncU(); detail();
}
function clampV(){
  V[2]=Math.max(MINW,Math.min(V0[2],V[2])); V[3]=V[2]*(V0[3]/V0[2]);
  var mx=V[2]*0.30, my=V[3]*0.30;
  V[0]=Math.max(V0[0]-mx,Math.min(V[0],V0[0]+V0[2]-V[2]+mx));
  V[1]=Math.max(V0[1]-my,Math.min(V[1],V0[1]+V0[3]-V[3]+my));
}
function setView(x,y,w,instant){
  var tw=Math.max(MINW,Math.min(V0[2],w));
  var target=[x,y,tw,tw*(V0[3]/V0[2])];
  if(anim){cancelAnimationFrame(anim);anim=null;}
  if(instant||window.matchMedia('(prefers-reduced-motion:reduce)').matches){
    V=target; clampV(); applyVB(); return;
  }
  var from=V.slice(), t0=performance.now(), dur=340;
  (function step(now){
    var k=Math.min(1,(now-t0)/dur), e=1-Math.pow(1-k,3);
    V=[from[0]+(target[0]-from[0])*e, from[1]+(target[1]-from[1])*e,
       from[2]+(target[2]-from[2])*e, from[3]+(target[3]-from[3])*e];
    clampV(); applyVB();
    if(k<1) anim=requestAnimationFrame(step); else anim=null;
  })(t0);
}
function zoomAbout(factor,cx,cy,instant){
  var nw=Math.max(MINW,Math.min(V0[2],V[2]*factor));
  var nh=nw*(V0[3]/V0[2]);
  setView(cx-(cx-V[0])*(nw/V[2]), cy-(cy-V[1])*(nh/V[3]), nw, instant);
}
function toMap(clientX,clientY){
  var r=svg.getBoundingClientRect();
  var sc=Math.min(r.width/V[2],r.height/V[3]);
  var ox=(r.width-V[2]*sc)/2, oy=(r.height-V[3]*sc)/2;
  return [V[0]+(clientX-r.left-ox)/sc, V[1]+(clientY-r.top-oy)/sc];
}
svg.addEventListener('wheel',function(e){
  e.preventDefault();
  var m=toMap(e.clientX,e.clientY);
  var d=e.deltaMode===1?e.deltaY*16:e.deltaY;
  zoomAbout(Math.exp(Math.max(-0.6,Math.min(0.6,d*0.0016))),m[0],m[1],true);
},{passive:false});
var ptrs={}, pinch=null, down=null, moved=0;
/* Pointer capture routes later events to the svg, so a click never reaches the
   prefecture path. Taps are therefore detected here. */
function hitAt(cx,cy){
  function pick(x,y){
    var e=document.elementFromPoint(x,y);
    if(!e||!e.closest||!svg.contains(e)) return null;
    return {st:e.closest('[data-c]'),
            mk:e.closest('[data-pk],[data-cty],[data-peak],[data-her],[data-cas],[data-cap2]')};
  }
  var at=pick(cx,cy);
  if(at){ if(at.mk&&at.mk.getAttribute('data-c')) return at.mk; if(at.st) return at.st; if(at.mk) return at.mk; }
  var ring=[[0,-6],[6,0],[0,6],[-6,0],[4,-4],[-4,4],[4,4],[-4,-4],[0,-12],[12,0],[0,12],[-12,0]];
  for(var i=0;i<ring.length;i++){
    var q=pick(cx+ring[i][0],cy+ring[i][1]);
    if(!q) continue;
    if(q.st) return q.st;
    if(q.mk&&i<4) return q.mk;
  }
  return null;
}
function handleTap(cx,cy){
  var n=hitAt(cx,cy);
  if(!n){ if(sel) closeReader(); return; }
  var c=n.getAttribute('data-c');
  if(c&&PR[c]) return openPref(c);
}
svg.addEventListener('pointerdown',function(e){
  try{svg.setPointerCapture(e.pointerId);}catch(err){}
  ptrs[e.pointerId]={x:e.clientX,y:e.clientY};
  var ids=Object.keys(ptrs);
  if(ids.length===1){svg.classList.add('dragging');hideTip();
    down={x:e.clientX,y:e.clientY,t:Date.now()}; moved=0;}
  if(ids.length===2){
    down=null;
    var a=ptrs[ids[0]], b=ptrs[ids[1]];
    pinch={d:Math.hypot(a.x-b.x,a.y-b.y),w:V[2],m:toMap((a.x+b.x)/2,(a.y+b.y)/2),vx:V[0],vy:V[1]};
  }
});
svg.addEventListener('pointermove',function(e){
  if(!ptrs[e.pointerId]) return;
  var prev=ptrs[e.pointerId];
  ptrs[e.pointerId]={x:e.clientX,y:e.clientY};
  var ids=Object.keys(ptrs);
  if(down) moved=Math.max(moved,Math.hypot(e.clientX-down.x,e.clientY-down.y));
  if(ids.length===2&&pinch){
    var a=ptrs[ids[0]], b=ptrs[ids[1]], nd=Math.hypot(a.x-b.x,a.y-b.y);
    if(nd>4&&pinch.d>4){
      var nw=Math.max(MINW,Math.min(V0[2],pinch.w*(pinch.d/nd)));
      var nh=nw*(V0[3]/V0[2]);
      V=[pinch.m[0]-(pinch.m[0]-pinch.vx)*(nw/pinch.w),
         pinch.m[1]-(pinch.m[1]-pinch.vy)*(nh/(pinch.w*(V0[3]/V0[2]))),nw,nh];
      clampV(); applyVB();
    }
    return;
  }
  if(ids.length===1&&moved>3){
    var r=svg.getBoundingClientRect();
    var sc=Math.min(r.width/V[2],r.height/V[3]);
    V[0]-=(e.clientX-prev.x)/sc; V[1]-=(e.clientY-prev.y)/sc;
    clampV(); applyVB();
  }
});
function endPointer(e){
  if(down&&ptrs[e.pointerId]&&moved<5&&Date.now()-down.t<700) handleTap(e.clientX,e.clientY);
  delete ptrs[e.pointerId];
  if(!Object.keys(ptrs).length){svg.classList.remove('dragging');pinch=null;down=null;}
  else pinch=null;
}
['pointerup','pointercancel'].forEach(function(t){svg.addEventListener(t,endPointer);});
svg.addEventListener('lostpointercapture',function(e){
  if(ptrs[e.pointerId]){delete ptrs[e.pointerId];
    if(!Object.keys(ptrs).length){svg.classList.remove('dragging');pinch=null;down=null;}}
});
svg.addEventListener('dblclick',function(e){
  e.preventDefault();
  var m=toMap(e.clientX,e.clientY);
  zoomAbout(e.shiftKey?1.9:0.52,m[0],m[1]);
});
svg.addEventListener('keydown',function(e){
  var step=V[2]*0.16, k=e.key;
  if(k==='+'||k==='='){zoomAbout(0.7,V[0]+V[2]/2,V[1]+V[3]/2);}
  else if(k==='-'||k==='_'){zoomAbout(1.43,V[0]+V[2]/2,V[1]+V[3]/2);}
  else if(k==='ArrowLeft'){V[0]-=step;clampV();applyVB();}
  else if(k==='ArrowRight'){V[0]+=step;clampV();applyVB();}
  else if(k==='ArrowUp'){V[1]-=step;clampV();applyVB();}
  else if(k==='ArrowDown'){V[1]+=step;clampV();applyVB();}
  else if(k==='Home'||k==='0'){setView(V0[0],V0[1],V0[2]);}
  else return;
  e.preventDefault();
});
$('#zin').onclick=function(){zoomAbout(0.66,V[0]+V[2]/2,V[1]+V[3]/2);};
$('#zout').onclick=function(){zoomAbout(1.52,V[0]+V[2]/2,V[1]+V[3]/2);};
$('#zfit').onclick=function(){setView(V0[0],V0[1],V0[2]);};
function flyTo(c){
  var b=bbox[c]; if(!b) return;
  var pad=Math.max(b[2],b[3])*0.14;
  var w=Math.max(b[2]+pad*2,(b[3]+pad*2)*(V0[2]/V0[3]),MINW*1.4);
  w=Math.min(w,V0[2]);
  setView(b[0]+b[2]/2-w/2, b[1]+b[3]/2-w*(V0[3]/V0[2])/2, w);
}
function flyToPoint(lon,lat,w){
  var q=proj(lon,lat), ww=Math.max(MINW*1.3,Math.min(V0[2],w||V0[2]/6));
  setView(q.p[0]-ww/2, q.p[1]-ww*(V0[3]/V0[2])/2, ww);
}

/* level of detail */
var lastKey='';
function detail(){
  var z=V0[2]/V[2];
  $('#zlevel').textContent=(z<10?z.toFixed(1):Math.round(z))+'\u00D7';
  var maxTier = z>=6?4 : z>=3.6?3 : z>=2.2?2 : z>=1.45?1 : 0;
  var key=[maxTier, z>=1.3, z>=1.6, z>=2.2, z>=2.8].join('|');
  if(key===lastKey) return;
  lastKey=key;
  for(var t=0;t<=4;t++){
    var on=t<=maxTier;
    $$('[data-lbl="c'+t+'"]',svg).forEach(function(n){n.style.display=on?'':'none';});
    $$('[data-tier="'+t+'"]',svg).forEach(function(n){n.style.display=(t<=maxTier+1)?'':'none';});
  }
  $$('[data-lbl="m2"]',svg).forEach(function(n){n.style.display=z>=1.6?'':'none';});
  $$('[data-lbl="k1"]',svg).forEach(function(n){n.style.display=z>=1.3?'':'none';});
  $$('[data-lbl="h1"]',svg).forEach(function(n){n.style.display=z>=1.6?'':'none';});
  $$('[data-lbl="x1"]',svg).forEach(function(n){n.style.display=z>=2.2?'':'none';});
  $$('[data-lbl="q1"]',svg).forEach(function(n){n.style.display=z>=1.3?'':'none';});
  $$('[data-lbl="w2"]',svg).forEach(function(n){n.style.display=z>=1.6?'':'none';});
  $$('[data-lbl="g1"]',svg).forEach(function(n){n.style.display=z<4?'':'none';});
  L.ranges.style.opacity=z<3?'1':z<5?'0.45':'0';
  L.grat.style.opacity=z<4?'1':'0.35';
  L.physio.style.opacity=z<3?'1':'0';
  L.muni.style.opacity=z>=2?'1':'0.45';
  requestAnimationFrame(function(){fitCaptions();fitPathLabels();declutter();});
}
function fitCaptions(){
  var li=LI();
  lblInset.forEach(function(t){
    var k=t.dataset.code, box=BOX[k], forms=INSETN[k][li];
    t.style.removeProperty('font-size');
    for(var i=0;i<forms.length;i++){
      t.textContent=forms[i];
      var w=0; try{w=t.getComputedTextLength();}catch(e){return;}
      if(w<=box[2]*0.96) return;
      if(i===forms.length-1){
        var cs=parseFloat(getComputedStyle(t).fontSize)||9.6;
        t.style.fontSize=(cs*Math.max(0.55,(box[2]*0.96)/w)).toFixed(2)+'px';
      }
    }
  });
}
function fitPathLabels(){
  [[lblRange,0.9],[lblRiver,0.94]].forEach(function(pair){
    pair[0].forEach(function(o){
      var pe=document.getElementById(o.id); if(!pe) return;
      var pl=0,tw=0;
      try{pl=pe.getTotalLength();tw=o.t.getComputedTextLength();}catch(e){return;}
      o.t.style.display=(tw>0&&tw<pl*pair[1])?'':'none';
    });
  });
}
/* Withhold any name that would collide with a more important one. Measured in
   screen space, because marker labels sit inside a counter-scaled group. */
function declutter(){
  var placed=[], vis=svg.getBoundingClientRect();
  $$('text[data-lbl]',svg).forEach(function(t){t.removeAttribute('data-hid');});
  ['s1','c0','q1','w1','m1','h1','k1','c1','c2','m2','w2','x1','c3','c4','p1']
  .forEach(function(g){
    $$('text[data-lbl="'+g+'"]',svg).forEach(function(t){
      if(t.style.display==='none'||!t.textContent) return;
      var b=t.getBoundingClientRect();
      if(!b.width||!b.height) return;
      if(b.right<vis.left-40||b.left>vis.right+40||
         b.bottom<vis.top-40||b.top>vis.bottom+40) return;
      var pad=1.5, r=[b.left-pad,b.top-pad,b.right+pad,b.bottom+pad];
      for(var i=0;i<placed.length;i++){
        var q=placed[i];
        if(r[0]<q[2]&&r[2]>q[0]&&r[1]<q[3]&&r[3]>q[1]){t.setAttribute('data-hid','1');return;}
      }
      placed.push(r);
    });
  });
}
/* scale bar */
function drawScale(){
  var s=$('#sbar'); if(!s) return;
  var r=svg.getBoundingClientRect(); if(!r.width) return;
  var a=SUBS[0](137,36), b=SUBS[0](138,36);
  var unitsPerKm=Math.hypot(a[0]-b[0],a[1]-b[1])/(111.32*Math.cos(36*RAD));
  var sc=Math.min(r.width/V[2],r.height/V[3]);
  var pxPerKm=unitsPerKm*sc, best=10, len=0;
  [5,10,25,50,100,200,250,500,1000].forEach(function(t){
    var L2=t*pxPerKm; if(L2<=96){best=t;len=L2;}});
  if(!len){best=5;len=5*pxPerKm;}
  s.innerHTML='';
  var g=el('g'), seg=4, sw=len/seg;
  for(var i=0;i<seg;i++) g.appendChild(el('rect',{x:(i*sw).toFixed(1),y:3,
    width:sw.toFixed(1),height:4,fill:i%2?'var(--surf)':'var(--ink)',
    stroke:'var(--ink)','stroke-width':'.5'}));
  var t1=el('text',{x:0,y:15,'font-family':'var(--mono)','font-size':'8',fill:'var(--ink2)'});
  t1.textContent='0';
  var t2=el('text',{x:len.toFixed(1),y:15,'font-family':'var(--mono)','font-size':'8',
    fill:'var(--ink2)','text-anchor':'end'});
  t2.textContent=fmt(best)+' km';
  g.appendChild(t1); g.appendChild(t2); s.appendChild(g);
  s.setAttribute('width',Math.max(70,len+6));
}

/* --------------------------------------------------------------- layers --- */
var LAYERS=[['prefs','lyPrefs',1,''],['muni','lyMuni',0,''],
 ['water','lyWater',1,'var(--hanada)'],['rivers','lyRivers',1,'var(--hanada)'],
 ['ranges','lyRanges',1,'var(--tobi)'],['physio','lyPhysio',0,'var(--tobi)'],
 ['peaks','lyPeaks',1,'var(--tobi)'],['parks','lyParks',1,'var(--tokiwa)'],
 ['heritage','lyHer',1,'var(--ama)'],['castles','lyCas',0,'var(--budou)'],
 ['caps','lyCaps',0,'var(--red)'],['cities','lyCities',1,'var(--ink)'],
 ['names','lyNames',1,''],['grat','lyGrat',1,'var(--rikyu)']];
LAYERS.forEach(function(a){
  var b=document.createElement('button');
  b.className='lsw'; b.setAttribute('aria-pressed',a[2]?'true':'false'); b.dataset.layer=a[0];
  b.innerHTML='<span data-t="'+a[1]+'"></span>'+(a[3]?'<i style="color:'+a[3]+'"></i>':'');
  b.addEventListener('click',function(){
    var on=b.getAttribute('aria-pressed')!=='true';
    b.setAttribute('aria-pressed',String(on));
    L[a[0]].setAttribute('data-off',on?'0':'1');
    if(a[0]==='prefs'){L.coast.setAttribute('data-off',on?'0':'1');
      L.hit.setAttribute('data-off',on?'0':'1');}
  });
  $('#layers').appendChild(b);
  if(!a[2]) L[a[0]].setAttribute('data-off','1');
});
/* thematic tint, quantile classed */
var RAMPS={
  light:['#F4EDE4','#E7D8D8','#D3B8C6','#B694AE','#94658F','#622954'],
  dusk :['#EFE6DA','#E0CFCF','#CBAFBE','#AE8CA6','#8C5D87','#5A2549'],
  night:['#2A333F','#36304A','#443456','#553963','#6B4172','#874E85']
};
function RAMP(){var g=document.documentElement.getAttribute('data-ground');return RAMPS[g]||RAMPS.light;}
var THEMES=[['','thNone'],['pop','thPop'],['den','thDen'],['area','thArea'],
 ['hiv','thHi'],['bigp','thBig'],['nprov','thProv'],['nher','thHer']];
function themeVal(c,k){
  var s=PR[c];
  if(k==='hiv') return s.hi[1];
  if(k==='nprov') return s.prov.length;
  if(k==='nher') return s.her.length;
  return s[k];
}
function buildThemes(){
  var s=$('#theme'), keep=s.value; s.innerHTML='';
  THEMES.forEach(function(t){
    var o=document.createElement('option'); o.value=t[0]; o.textContent=T(t[1]); s.appendChild(o);});
  s.value=keep||'';
}
function applyTheme(k){
  var key=$('#key');
  if(!k){CODES.forEach(function(c){if(paths[c])paths[c].style.removeProperty('fill');});
    key.innerHTML=''; return;}
  var vals=[];
  CODES.forEach(function(c){var v=themeVal(c,k); if(isFinite(v)&&v>0) vals.push(v);});
  vals.sort(function(a,b){return a-b;});
  var R=RAMP(), n=R.length, brk=[];
  for(var i=1;i<n;i++) brk.push(vals[Math.floor(i*vals.length/n)]);
  CODES.forEach(function(c){
    var v=themeVal(c,k), p=paths[c]; if(!p) return;
    if(!isFinite(v)||v<=0){p.style.fill='var(--surf3)';return;}
    var i=0; while(i<brk.length&&v>=brk[i]) i++;
    p.style.fill=R[i];
  });
  key.innerHTML='<div class="keybar">'+R.map(function(c){
      return '<span style="flex:1;background:'+c+'"></span>';}).join('')+'</div>'
    +'<div class="keycap"><span>'+fmt(Math.round(vals[0]))+'</span><span>'+T('thSextile')
    +'</span><span>'+fmt(Math.round(vals[vals.length-1]))+'</span></div>';
}
$('#theme').addEventListener('change',function(e){applyTheme(e.target.value);});

/* --------------------------------------------------------------- search --- */
var IDX=[];
function buildIndex(){
  var out=[],seen={};
  function add(t,k,c,go){ if(!t) return; var key=t+'|'+k+'|'+c;
    if(seen[key])return; seen[key]=1; out.push({t:t,k:k,c:c,go:go}); }
  CODES.forEach(function(c){
    var s=PR[c];
    add(L3(s.n),T('cPref'),c); add(s.n[0],T('cPref'),c); add(s.n[2],T('cPref'),c);
    add(L3(s.cap),T('kCap'),c);
    s.nat.forEach(function(x){add(L3(x),L3(s.n),c);});
  });
  GEO.cities.forEach(function(x){add(G(x[0]),T('cCity'),x[1]);});
  PEAKS.forEach(function(k){add(L3(k),T('cPeak'),k[6][0],{lon:k[4],lat:k[3],w:V0[2]/9});});
  HER.forEach(function(h){add(L3(h),T('cHer'),h[5][0],{lon:h[3+0]||0,lat:0});});
  PROV.forEach(function(v){add(L3(v),T('kProv'),null,{prov:v[0]});});
  GEO.her.forEach(function(h){add(G(h[0]),T('cHer'),h[1],{lon:h[2],lat:h[3],w:V0[2]/9});});
  GEO.cas.forEach(function(k){add(G(k[0]),T('cCas'),k[1],{lon:k[2],lat:k[3],w:V0[2]/12});});
  GEO.cap.forEach(function(k){add(G(k[0]),T('kSeat'),k[1],{lon:k[2],lat:k[3],w:V0[2]/9});});
  GEO.parks.forEach(function(p){add(G(p[0]),T('cPark'),null,{lon:p[1],lat:p[2],w:V0[2]/7});});
  IDX=out.filter(function(o){return o.t;});
}
var res=$('#res'), qEl=$('#q'), qActive=-1, qHits=[];
function runSearch(){
  var v=qEl.value.trim().toLowerCase();
  $('#qx').hidden=!v;
  if(!v){res.classList.remove('open');res.innerHTML='';qHits=[];return;}
  qHits=IDX.filter(function(i){return i.t.toLowerCase().indexOf(v)>=0;})
    .sort(function(a,b){return a.t.toLowerCase().indexOf(v)-b.t.toLowerCase().indexOf(v)
      || a.t.length-b.t.length;}).slice(0,24);
  qActive=-1;
  res.innerHTML=qHits.length?qHits.map(function(h,i){
    return '<button data-i="'+i+'"><span class="k">'+esc(h.k)+'</span>'+esc(h.t)+'</button>';
  }).join(''):'<div style="padding:.4rem .5rem;font-size:.85em;color:var(--ink3)">'+T('noMatch')+'</div>';
  res.classList.add('open');
  $$('button',res).forEach(function(b){b.onclick=function(){pickHit(+b.dataset.i);};});
}
function pickHit(i){
  var h=qHits[i]; if(!h) return;
  if(h.go&&h.go.prov){ openProvince(h.go.prov); }
  else if(h.c&&PR[h.c]){ openPref(h.c); if(h.go&&h.go.lon!==undefined&&h.go.lat) flyToPoint(h.go.lon,h.go.lat,h.go.w); else flyTo(h.c); }
  else if(h.go&&h.go.lon!==undefined&&h.go.lat) flyToPoint(h.go.lon,h.go.lat,h.go.w);
  res.classList.remove('open'); qEl.blur();
}
qEl.addEventListener('input',runSearch);
qEl.addEventListener('keydown',function(e){
  if(e.key==='ArrowDown'||e.key==='ArrowUp'){
    e.preventDefault(); if(!qHits.length) return;
    qActive=(qActive+(e.key==='ArrowDown'?1:-1)+qHits.length)%qHits.length;
    $$('button',res).forEach(function(b,i){b.classList.toggle('on',i===qActive);
      if(i===qActive) b.scrollIntoView({block:'nearest'});});
  } else if(e.key==='Enter'){ e.preventDefault(); pickHit(qActive<0?0:qActive); }
  else if(e.key==='Escape'){ qEl.value=''; runSearch(); }
});
$('#qx').addEventListener('click',function(){qEl.value='';runSearch();qEl.focus();});
document.addEventListener('pointerdown',function(e){
  if(!e.target.closest('.search')&&!e.target.closest('.res')) res.classList.remove('open');
  if(!e.target.closest('#setPop')&&!e.target.closest('#setBtn')) closePop();
  if(!e.target.closest('#lpanel')&&!e.target.closest('#lbtn')) closeLPanel();
});


/* --------------------------------------------------------------- strings -- */
var STR={
htmlLang:['en','zh-Hant-TW','ja'],
title:['Japan Reference Atlas','日本參考圖鑑','日本参考図鑑'],
settings:['Settings','設定','設定'],
sLang:['Language','語言','言語'],
sGround:['Ground','底色','地色'],
gAuto:['Auto','自動','自動'],
gPaper:['Paper','紙','紙'],gDusk:['Dusk','暮','暮'],gNight:['Night','夜','夜'],
gAutoWhy:['Auto follows the system setting and the clock. It is showing %s. A light system takes Paper by day and Dusk after dark; a dark system takes Dusk by day and Night after dark.',
 '「自動」依系統設定與時刻切換，目前為 %s。淺色系統白天用紙、入夜轉暮；深色系統白天用暮、入夜轉夜。',
 '「自動」はシステム設定と時刻に従う。現在は %s。明るい設定では昼が紙、夜が暮。暗い設定では昼が暮、夜が夜となる。'],
gWhypaper:['Fixed to the parchment ground.','固定為羊皮紙底。','紙の地に固定。'],
gWhydusk:['Fixed to the twilight ground, the middle step between paper and night.',
 '固定為暮色底，介於紙與夜之間的中間階。','暮の地に固定。紙と夜の中間にあたる。'],
gWhynight:['Fixed to the night ground.','固定為夜間底。','夜の地に固定。'],
sDense:['Tighter type','緊湊排版','詰めた組版'],
sSurvey:['Surveyed boundaries','實測界線','実測境界'],
sMuni:['Municipal boundaries','市區町村界','市区町村界'],
layers:['Layers','圖層','図層'],theme:['Thematic tint','主題著色','主題着色'],
mapHint:['Drag to pan, scroll or pinch to zoom, double click to zoom in. Select a prefecture for its record. Keyboard: arrows pan, plus and minus zoom, 0 resets.',
 '拖曳平移，滾輪或雙指縮放，雙擊放大。點選都道府縣可展開紀錄。鍵盤：方向鍵平移，加減縮放，0 重設。',
 'ドラッグで移動、ホイールまたはピンチで拡大縮小、ダブルクリックで拡大。都道府県を選ぶと記録が開く。キーボードは矢印で移動、プラスとマイナスで拡大縮小、0で初期化。'],
qph:['Search prefectures, cities, summits, provinces','檢索都道府縣、市町村、山岳、令制國','都道府県・市町村・山岳・令制国を検索'],
noMatch:['No match','查無結果','該当なし'],
fidLocal:['Outlines are approximated from seed points.','界線為種子點近似。','境界は種子点による近似。'],
fidLoading:['Fetching published geometry…','正在取得公開幾何……','公表された幾何を取得中…'],
fidSurvey:['Showing published prefectural geometry.','已改用公開的都道府縣幾何。','公表された都道府県の幾何を表示中。'],
fidMuni:['Published geometry with municipal boundaries.','公開幾何並含市區町村界。','公表幾何に市区町村界を重ねて表示中。'],
fidFail:['Could not reach the published geometry, so the approximated outlines remain.',
 '無法取得公開幾何，維持近似界線。','公表された幾何に接続できないため、近似の境界のままとする。'],
eraPrompt:['Select a band or a name to read the era and narrow the chronicle below.',
 '點選色帶或名稱可閱讀該時代，並將下方年表收束至該時代。',
 '帯または名称を選ぶと時代の解説が出て、下の年表がその時代に絞られる。'],
nfChron:['Chronicle','年表','年表'],
nfEras:['Historical eras','時代區分','時代区分'],
nfErasP:['The band is drawn to scale from the Yayoi period onward. The Jōmon period runs for some fourteen millennia before it and is carried separately, because on the same axis it would flatten everything else. Select a band or a name to read the era and narrow the chronicle beneath it.',
 '比例帶自彌生時代起算。其前的繩文時代長達約一萬四千年，另以虛線標示，因為置於同一軸上會把其餘全部壓平。點選色帶或名稱可閱讀該時代，並將下方年表收束至該時代。',
 '帯は弥生以降を縮尺どおりに示す。その前の縄文は約一万四千年に及ぶため別に掲げる。同じ軸に置けば他がすべて潰れてしまうからである。帯または名称を選ぶと時代の解説が出て、下の年表がその時代に絞られる。'],
tlShowing:['%n entries in the chronicle below.','下方年表中有 %n 條屬於此時代。','下の年表に %n 件。'],
nfChronP:['Entries marked with a diamond changed the shape of the map. Selecting an era above narrows this list to its span.',
 '標菱形者為改變版圖的條目。於上方選取時代可將本表收束至該時代。',
 '菱形の項目は版図を変えた出来事である。上で時代を選ぶと、この表はその期間に絞られる。'],
tlAll:['Show all','顯示全部','すべて表示'],
gSystem:['System','系統','システム'],
gClock:['Local time','本地時刻','現地時刻'],
gDay:['Day','白天','昼'],gNightC:['Night','夜間','夜'],
gLightSys:['Light system','淺色系統','明るい設定'],
gDarkSys:['Dark system','深色系統','暗い設定'],
gNightHours:['Night runs 18:00 to 06:00.','夜間為十八時至六時。','夜は十八時から六時まで。'],
eraSeat:['Seat of power','權力所在','権力の所在'],
lgJomon:['Jōmon, before the band','繩文，色帶之前','縄文、帯より前'],
lgSeat:['Era with a recorded seat','有京城可跳轉','都の記録がある時代'],
lgMap:['Entry that changed the map','改變版圖的條目','版図を変えた項目'],
seJ:['Construction','構成','構成'],
mEdition:['Edition','版次','版'],mProjection:['Projection','投影','投影法'],
mPopulation:['Population','人口','人口'],mPrefectures:['Divisions','行政區','行政区画'],
mOnSheet:['On the sheet','圖上收錄','図上収録'],
promptH:['Select a prefecture','請選擇都道府縣','都道府県を選択'],
promptP:['Every prefecture carries a record: former provinces, capital, population and area with national rank, the prefectural flower, the highest summit, inscribed heritage, surviving castles and the local table. Names and prose follow the language set in the settings menu.',
 '每一都道府縣皆有紀錄：令制國、首府、人口與面積及全國排名、縣花、最高峰、登錄遺產、現存城郭與在地飲饌。名稱與敘述依設定選單所選語言呈現。',
 '各都道府県に記録がある。令制国、県庁所在地、人口と面積および全国順位、県花、最高峰、登録遺産、現存城郭、地域の食である。名称と説明は設定で選んだ言語に従う。'],
nPop:['Population','人口','人口'],nArea:['Land area km²','國土面積 km²','国土面積 km²'],
nPref:['Prefectures','都道府縣','都道府県'],nProv:['Provinces recorded','收錄令制國','収録令制国'],
nParks:['National parks','國立公園','国立公園'],nHer:['World Heritage','世界遺產','世界遺産'],
nHi:['Highest point m','最高點 m','最高地点 m'],nLo:['Lowest point m','最低點 m','最低地点 m'],
nMuni:['Municipalities listed','收錄市町村','収録市町村'],nIsl:['Islands','島嶼','島嶼'],
fPop:['Population','人口','人口'],fArea:['Area km²','面積 km²','面積 km²'],
fDen:['Per km²','每平方公里','1km²あたり'],fCode:['JIS code','JIS 代碼','JISコード'],
fProvN:['Provinces','令制國數','令制国数'],rank:['rank','排名','順位'],
kCap:['Capital','首府','県庁所在地'],kBig:['Largest municipality','最大市町村','最大の市町村'],
kFlower:['Prefectural flower','縣花','県花'],kHigh:['Highest summit','最高峰','最高峰'],
kShare:['Share of Japan','佔全國比重','全国に占める割合'],kProv:['Province','令制國','令制国'],
kCastle:['Castle','城郭','城郭'],kSeat:['Historic capital','歷代京城','歴代の都'],
bRelief:['Relief','地勢','地勢'],rHigh:['Highest summit','最高峰','最高峰'],
rDen:['Density','人口密度','人口密度'],rCap:['against Fuji','以富士為度','富士を基準に'],
bProv:['Former provinces','令制國','令制国'],bPhys:['Character','概說','概説'],
bFeat:['Land and water','山川','山河'],bPeaks:['Summits','山岳','山岳'],
bHer:['World Heritage','世界遺產','世界遺産'],bCas:['Castles','城郭','城郭'],
bFood:['Table and craft','飲饌與工藝','食と工芸'],none:['none recorded','未收錄','記載なし'],
cPref:['Prefecture','都道府縣','都道府県'],cCity:['Municipality','市町村','市町村'],
cPeak:['Summit','山岳','山岳'],cHer:['Heritage','世界遺產','世界遺産'],
cCas:['Castle','城郭','城郭'],cPark:['National park','國立公園','国立公園'],
cEst:['designated','指定','指定'],
cCap:['Capital','首府','県庁所在地'],cPop:['Population','人口','人口'],
cArea:['Area km²','面積 km²','面積 km²'],cDen:['Per km²','每 km²','1km²'],
cReg:['Region','地方','地方'],cFlower:['Flower','縣花','県花'],
cHigh:['Highest m','最高 m','最高 m'],cProvN:['Provinces','令制國','令制国'],
cYear:['Year','年','年'],cType:['Type','類別','種別'],cNote:['Note','備註','備考'],
cCircuit:['Circuit','道','道'],cModern:['Modern prefectures','今之都道府縣','現在の都道府県'],
cSeat2:['Seat and note','治所與備註','国府と備考'],cName:['Name','名稱','名称'],
cM:['Metres','標高 m','標高 m'],cKind:['Kind','種別','種別'],
lyPrefs:['Prefectures','都道府縣','都道府県'],lyMuni:['Municipalities','市區町村','市区町村'],
lyWater:['Lakes','湖沼','湖沼'],lyRivers:['Rivers','河川','河川'],
lyRanges:['Ranges','山脈','山脈'],lyPhysio:['Plains','平原','平野'],
lyPeaks:['Summits','山岳','山岳'],lyParks:['National parks','國立公園','国立公園'],
lyHer:['World Heritage','世界遺產','世界遺産'],lyCas:['Castles','城郭','城郭'],
lyCaps:['Historic capitals','歷代京城','歴代の都'],lyCities:['Municipalities','市町村','市町村'],
lyNames:['Names','地名','地名'],lyGrat:['Graticule','經緯網','経緯線'],
thNone:['None','無','なし'],thPop:['Population','人口','人口'],thDen:['Density','人口密度','人口密度'],
thArea:['Area','面積','面積'],thHi:['Highest summit','最高峰','最高峰'],
thBig:['Largest municipality','最大市町村','最大の市町村'],
thProv:['Provinces','令制國數','令制国数'],thHer:['World Heritage','世界遺產','世界遺産'],
thSextile:['sextiles','六分位','六分位'],
t0:['Overview','國家概覽','国の概要'],
t1:['Table','表','表'],t1h:['The forty-seven prefectures','四十七都道府縣','四十七都道府県'],
t2:['Table','表','表'],t2h:['Summits','山岳','山岳'],
t5:['Register','簿','簿'],t5h:['Ritsuryō provinces','令制國','令制国'],
t6:['Table','表','表'],t6h:['World Heritage and castles','世界遺產與城郭','世界遺産と城郭'],
t3:['Reference','參考','参考'],t3h:['Superlatives','之最','極値'],
t4:['Notes','註記','注記'],t4h:['Method and sources','編纂方法與出典','編纂方法と出典'],
sortHint:['Select a heading to sort','點選欄首排序','見出しを選ぶと並べ替え'],
nfFlag:['Flag and seals','國旗與紋章','国旗と紋章'],
nfAnthem:['National anthem','國歌','国歌'],
nfHistory:['Historical eras','時代區分','時代区分'],
nfHistoryP:['The band is drawn to scale from the Yayoi period onward; the Jōmon period runs for some fourteen millennia before it and would flatten everything else. Select an era to travel to its seat of power.',
 '比例帶自彌生時代起算；其前的繩文時代長達約一萬四千年，同軸繪製會把其餘全部壓平。點選時代可移至該時代的權力所在。',
 '帯は弥生以降を比例で示す。その前の縄文は約一万四千年に及び、同じ軸では他がすべて潰れる。時代を選ぶとその時代の権力の所在へ移る。'],
nfOfficial:['Official sources','官方連結','公式サイト'],
lkGov:['Government of Japan','日本國政府','日本国政府'],
lkImp:['Imperial Household Agency','宮內廳','宮内庁'],
lkGsi:['Geospatial Information Authority','國土地理院','国土地理院'],
lkKoryu:['Japan-Taiwan Exchange Association','日本臺灣交流協會','日本台湾交流協会'],
anthemTr:['Rendering','譯文','訳'],
anthemSub:['Kimigayo · text from the Kokin Wakashū, about 905 · melody 1880',
 '君之代・詞出《古今和歌集》約九〇五年・曲一八八〇年',
 '君が代・詞は『古今和歌集』約九〇五年・曲は一八八〇年'],
flAdopted:['Adopted','制定','制定'],flRatio:['Proportion','比例','比率'],
flColours:['Colours','色','色'],flLaw:['Statute','法源','法令'],
n1h:['Boundaries','界線','境界'],
n1:['Prefectural outlines are approximated by tessellation from seed points and trimmed to the coastline. They are calibrated so that every municipality, castle and summit in this atlas falls inside the correct prefecture, but they are not surveyed administrative lines. Turn on surveyed boundaries in the settings menu to replace them with published geometry.',
 '縣界以種子點鑲嵌近似，並裁切至海岸線。已校準使本圖所收之市町村、城郭與山岳全數落在正確縣內，但並非實測行政界線。可於設定選單開啟實測界線以公開幾何取代。',
 '県境は種子点による分割で近似し、海岸線で切り取っている。本図の市町村・城郭・山岳がすべて正しい県に入るよう校正したが、実測の行政界ではない。設定から実測境界を有効にすると公表された幾何に置き換わる。'],
n2h:['Coastline','海岸線','海岸線'],
n2:['The coastline is traced by hand at roughly three to six kilometre vertex spacing across seventy-nine islands and is a generalization, not a survey. Named capes, bays and peninsulas sit on their true coordinates.',
 '海岸線為人工描繪，涵蓋七十九座島嶼，頂點間距約三至六公里，屬概括化處理而非實測。具名之岬、灣、半島均採真實座標。',
 '海岸線は七十九島にわたり頂点間隔およそ三から六キロで手作業により描いた概括であり、実測ではない。名のある岬・湾・半島は実際の座標に置く。'],
n3h:['Projection and insets','投影與嵌入圖','投影と挿図'],
n3:['Albers equal area conic, standard parallels 32 and 44 north, central meridian 137 east. The Nansei and Ogasawara islands are carried in their own frames, each fitted to its box by measurement rather than by hand, so the boxes can be rearranged without redrawing anything.',
 '亞爾勃斯等積圓錐投影，標準緯線北緯三十二度與四十四度，中央經線東經一三七度。南西諸島與小笠原諸島各置專屬圖框，框內比例由量測自動求得而非手調，故圖框可任意重排而無須重繪。',
 'アルベルス正積円錐図法、標準緯線は北緯三二度と四四度、中央経線は東経一三七度。南西諸島と小笠原諸島は別枠に収め、枠内の縮尺は実測により自動で決まるため、枠の配置を変えても描き直しは要らない。'],
n4h:['Figures','數值','数値'],
n4:['Populations are 2024 estimates. Areas follow the Geospatial Information Authority of Japan. Elevations, lake depths and river lengths follow published values from the same authority. Inscription years follow the UNESCO record. Municipality counts per prefecture are omitted because they could not be verified against a current register.',
 '人口為二〇二四年推計。面積依國土地理院。標高、湖深與河川長度依同院公布值。登錄年份依聯合國教科文組織紀錄。各縣市町村總數未列，因無法對照現行登錄資料查證。',
 '人口は二〇二四年推計。面積は国土地理院による。標高・水深・河川延長も同院の公表値による。登録年はユネスコの記録による。県別の市町村数は現行の登録資料と照合できないため掲げていない。'],
n6h:['Ground','底色','地色'],
n6:['Auto reads two signals, the system colour scheme and the local clock, and settles on one of three grounds. A light system takes Paper by day and Dusk after dark; a dark system takes Dusk by day and Night after dark. Night runs from 18:00 to 06:00 local time. Any of the three can be fixed instead.',
 '「自動」讀取兩項訊號：系統色彩偏好與本地時刻，據以決定三種底色之一。淺色系統白天用紙、入夜轉暮；深色系統白天用暮、入夜轉夜。夜間定義為本地時間十八時至六時。亦可固定為其中任一種。',
 '「自動」はシステムの配色設定と現地時刻という二つの信号を読み、三つの地色のいずれかに落ち着く。明るい設定では昼が紙、日没後が暮。暗い設定では昼が暮、日没後が夜。夜は現地時間の十八時から六時までとする。三つのいずれかに固定することもできる。'],
n5h:['The anthem text','國歌歌詞','国歌の歌詞'],
n5:['The text is a waka of the Heian period, entered anonymously as poem 343 in the Kokin Wakashū about 905, and carried in the schedule to the Act on National Flag and Anthem of 1999. The roman line beneath each verse is a mechanical transliteration, not a reading of the melody. The English and Chinese renderings are conveniences for the reader; a translation is an interpretation, and published versions differ from one another. If a rendering here comes from a published translator, credit them in this note.',
 '歌詞為平安時代和歌，以詠人不知之名收於約九〇五年成書的《古今和歌集》第三四三首，並載於一九九九年《國旗及國歌法》附則。各句下方的羅馬字為機械轉寫，非曲調之標示。英文與中文譯文係為便利讀者而附；翻譯即詮釋，各家版本互有出入。若所用譯文出自特定譯者，宜於此處註明。',
 '歌詞は平安期の和歌で、約九〇五年成立の『古今和歌集』第三四三番に詠み人知らずとして載り、一九九九年の国旗及び国歌に関する法律の別記にも掲げられる。各句の下のローマ字は機械的な翻字であり、旋律の指示ではない。英語と中国語の訳は読者の便のために添えたものである。翻訳は解釈であり、published な版によって異なる。特定の訳者による訳を用いる場合は、ここに名を記すのがよい。'],
srcH:['Sources','出典','出典'],
srcBody:['Statistics Bureau of Japan, population estimates 2024<br>Geospatial Information Authority of Japan, area, elevation and hydrography<br>Agency for Cultural Affairs, castle and heritage designations<br>UNESCO World Heritage Centre, inscription record<br>Ministry of the Environment, national park designations<br>Surveyed boundary geometry: Global Map Japan via dataofjapan/land',
 '日本總務省統計局，二〇二四年人口推計<br>國土地理院，面積、標高與水文<br>文化廳，城郭與文化財指定<br>聯合國教科文組織世界遺產中心，登錄紀錄<br>環境省，國立公園指定<br>實測界線幾何：地球地圖日本，經 dataofjapan/land',
 '総務省統計局、二〇二四年人口推計<br>国土地理院、面積・標高・水文<br>文化庁、城郭および文化財の指定<br>ユネスコ世界遺産センター、登録記録<br>環境省、国立公園の指定<br>実測境界の幾何：地球地図日本（dataofjapan/land 経由）']
};

/* glossary: every named feature carries its own trilingual array */
var GLOSS={};
function gl(a){ if(a&&a[0]) GLOSS[a[0]]=a; }
PEAKS.forEach(function(k){gl([k[0],k[1],k[2]]);});
LAKES.forEach(function(k){gl([k[0],k[1],k[2]]);});
RIVERS.forEach(function(k){gl([k[0],k[1],k[2]]);});
HER.forEach(function(k){gl([k[0],k[1],k[2]]);});
CAS.forEach(function(k){gl([k[0],k[1],k[2]]);});
PARKS.forEach(function(k){gl([k[0],k[1],k[2]]);});
CAPS.forEach(function(k){gl([k[0],k[1],k[2]]);});
RANGES.forEach(function(k){gl([k[0],k[1],k[2]]);});
CANON.forEach(function(k){gl([k[1],k[2],k[3]]);});
CODES.forEach(function(c){
  var s=PR[c];
  gl(s.n); gl(s.cap); gl(s.big); gl(s.fl);
  s.nat.forEach(gl); s.food.forEach(gl); s.pk.forEach(gl); s.her.forEach(gl); s.cas.forEach(gl);
});
/* Every named thing on the sheet carries its own trilingual array, so the
   glossary is built from the data rather than kept by hand alongside it. */
GEO.cities.forEach(function(c){gl([c[0],c[6],c[7]]);});
GEO.plains.forEach(function(p){gl([p[2],p[3],p[4]]);});
GEO.seas.forEach(function(s){gl([s[0],s[4],s[5]]);});
function G(n){var a=GLOSS[n];return a?L3(a):n;}

var PVBY={}; PROV.forEach(function(v){PVBY[v[0]]=v;});
var CIRCBY={}; CIRC.forEach(function(c){CIRCBY[c[0]]=c;});
var NATPOP=0, NATAREA=0;
CODES.forEach(function(c){NATPOP+=PR[c].pop;NATAREA+=PR[c].area;});

function openProvince(key){
  var v=PVBY[key]; if(!v) return;
  clearSel(); sel=null; hideTip();
  var holders=CODES.filter(function(c){return PR[c].prov.indexOf(key)>=0;});
  reader.innerHTML=
   '<div class="rd-h"><div style="min-width:0"><span class="tag">'+T('kProv')+'</span>'
   +'<h2>'+esc(L3(v))+'</h2><div class="nick">'+esc(LI()===0?v[2]:v[0])+'</div></div>'
   +'<button class="rd-x" id="rdX" aria-label="Close">&times;</button></div>'
   +'<div class="rd-b">'
   +'<div class="blk"><dl class="kv">'
   +'<dt>'+T('cCircuit')+'</dt><dd>'+esc(L3(CIRCBY[v[3]]?[CIRCBY[v[3]][1],CIRCBY[v[3]][2],CIRCBY[v[3]][3]]:[v[3]]))+'</dd>'
   +'<dt>'+T('cModern')+'</dt><dd>'+esc(v[4])+'</dd>'
   +'<dt>'+T('cSeat2')+'</dt><dd>'+esc(v[5])+'</dd>'
   +'</dl></div>'
   +'<div class="blk"><span class="tag">'+T('cModern')+'</span>'
   +'<div class="chips">'+holders.map(function(c){
      return '<span class="chip" style="cursor:pointer;color:var(--ruri)" data-go="'+c+'">'+esc(pn(c))+'</span>';
     }).join('')+'</div></div></div>';
  $('#rdX').addEventListener('click',closeReader);
  $$('[data-go]',reader).forEach(function(b){b.onclick=function(){
    openPref(b.dataset.go); flyTo(b.dataset.go);};});
  revealRecord();
}

/* --------------------------------------------------------------- tables --- */
var COL=[['n','cPref',0,0],['reg','cReg',0,1],['cap','cCap',0,0],['pop','cPop',1,0],
 ['den','cDen',1,1],['area','cArea',1,0],['hiv','cHigh',1,1],['nprov','cProvN',1,2],
 ['fl','cFlower',0,2],['big','cBig',0,1]];
var sk1='n', sd1={};
function sortVal(c,k){
  var s=PR[c];
  if(k==='n') return L3(s.n);
  if(k==='reg') return L3(s.reg);
  if(k==='cap') return L3(s.cap);
  if(k==='fl') return L3(s.fl);
  if(k==='big') return G(s.big[0]);
  if(k==='hiv') return s.hi[1];
  if(k==='nprov') return s.prov.length;
  return s[k];
}
function tbl1(){
  $('#tPr thead tr').innerHTML=COL.map(function(c){
    return '<th data-k="'+c[0]+'"'+(c[2]?' class="n"':'')+(c[3]?' data-opt="'+c[3]+'"':'')
      +(sk1===c[0]?' aria-sort="'+(sd1[c[0]]?'descending':'ascending')+'"':'')
      +'>'+T(c[1])+'</th>';}).join('');
  $$('#tPr th').forEach(function(th){th.onclick=function(){
    var k=th.dataset.k;
    sd1[k]=(sk1===k)?!sd1[k]:(['pop','den','area','hiv','nprov'].indexOf(k)>=0);
    sk1=k; tbl1();};});
  var lc=cur==='zh'?'zh-Hant':cur==='ja'?'ja':'en';
  var rows=CODES.slice().sort(function(a,b){
    var x=sortVal(a,sk1), y=sortVal(b,sk1);
    var r=(typeof x==='number')?x-y:String(x).localeCompare(String(y),lc);
    return sd1[sk1]?-r:r;});
  $('#tPr tbody').innerHTML=rows.map(function(c){var s=PR[c];
    return '<tr><td class="nm"><button data-c="'+c+'">'+esc(L3(s.n))+'</button></td>'
      +'<td data-opt="1">'+esc(L3(s.reg))+'</td>'
      +'<td>'+esc(L3(s.cap))+'</td>'
      +'<td class="n mono">'+fmt(s.pop)+'</td>'
      +'<td class="n mono" data-opt="1">'+Math.round(s.den)+'</td>'
      +'<td class="n mono">'+fmt(s.area)+'</td>'
      +'<td class="n mono" data-opt="1">'+fmt(s.hi[1])+'</td>'
      +'<td class="n mono" data-opt="2">'+s.prov.length+'</td>'
      +'<td data-opt="2">'+esc(L3(s.fl))+'</td>'
      +'<td data-opt="1">'+esc(G(s.big[0]))+'</td></tr>';}).join('');
  $$('#tPr td.nm button').forEach(function(b){b.onclick=function(){
    openPref(b.dataset.c); flyTo(b.dataset.c);
    $('.main').scrollIntoView({block:'start',behavior:'smooth'});};});
}
var sk2='m', sd2={m:1};
function tbl2(){
  $('#tPk thead tr').innerHTML=
    [['nm','cName',0,0],['m','cM',1,0],['pref','cPref',0,0],['kind','cKind',0,1]]
    .map(function(c){
      return '<th data-k="'+c[0]+'"'+(c[2]?' class="n"':'')+(c[3]?' data-opt="1"':'')
        +(sk2===c[0]?' aria-sort="'+(sd2[c[0]]?'descending':'ascending')+'"':'')
        +'>'+T(c[1])+'</th>';}).join('');
  $$('#tPk th').forEach(function(th){th.onclick=function(){
    var k=th.dataset.k; sd2[k]=(sk2===k)?!sd2[k]:(k==='m'); sk2=k; tbl2();};});
  var KIND=[['Non-volcanic','非火山','非火山'],['Volcano','火山','火山'],['Active volcano','活火山','活火山']];
  var rows=PEAKS.map(function(k){
    return {nm:L3(k),m:k[5],pref:k[6].map(pn).join(' / '),kind:L3(KIND[k[7]]),lon:k[4],lat:k[3],c:k[6][0]};});
  rows.sort(function(a,b){var x=a[sk2],y=b[sk2];
    var r=(typeof x==='number')?x-y:String(x).localeCompare(String(y));
    return sd2[sk2]?-r:r;});
  $('#tPk tbody').innerHTML=rows.map(function(p){
    return '<tr><td class="nm"><button data-lon="'+p.lon+'" data-lat="'+p.lat+'" data-c="'+p.c+'">'
      +esc(p.nm)+'</button></td>'
      +'<td class="n mono">'+fmt(p.m)+'</td><td>'+esc(p.pref)+'</td>'
      +'<td data-opt="1" style="color:var(--ink2)">'+esc(p.kind)+'</td></tr>';}).join('');
  $$('#tPk td.nm button').forEach(function(b){b.onclick=function(){
    openPref(b.dataset.c); flyToPoint(+b.dataset.lon,+b.dataset.lat,V0[2]/8);
    $('.main').scrollIntoView({block:'start',behavior:'smooth'});};});
  $('#pkc').textContent=rows.length+' \u00B7 '+PEAKS.filter(function(k){return k[7]===2;}).length;
}
var sk3='n', sd3={};
function tbl3prov(){
  $('#tPv thead tr').innerHTML=
    [['n','cName',0],['cir','cCircuit',0],['mod','cModern',1],['seat','cSeat2',2]]
    .map(function(c){
      return '<th data-k="'+c[0]+'"'+(c[2]?' data-opt="'+c[2]+'"':'')
        +(sk3===c[0]?' aria-sort="'+(sd3[c[0]]?'descending':'ascending')+'"':'')
        +'>'+T(c[1])+'</th>';}).join('');
  $$('#tPv th').forEach(function(th){th.onclick=function(){
    var k=th.dataset.k; sd3[k]=(sk3===k)?!sd3[k]:false; sk3=k; tbl3prov();};});
  var rows=PROV.map(function(v){
    var ci=CIRCBY[v[3]];
    return {key:v[0],n:L3(v),cir:ci?L3([ci[1],ci[2],ci[3]]):v[3],mod:v[4],seat:v[5]};});
  rows.sort(function(a,b){var r=String(a[sk3]).localeCompare(String(b[sk3]));return sd3[sk3]?-r:r;});
  $('#tPv tbody').innerHTML=rows.map(function(v){
    return '<tr><td class="nm"><button data-p="'+esc(v.key)+'">'+esc(v.n)+'</button></td>'
      +'<td>'+esc(v.cir)+'</td>'
      +'<td data-opt="1">'+esc(v.mod)+'</td>'
      +'<td class="wrap" data-opt="2" style="color:var(--ink2)">'+esc(v.seat)+'</td></tr>';}).join('');
  $$('#tPv td.nm button').forEach(function(b){b.onclick=function(){
    openProvince(b.dataset.p);
    $('.main').scrollIntoView({block:'start',behavior:'smooth'});};});
  $('#pvc').textContent=rows.length+' \u00B7 '+CIRC.length;
}
var sk4='y', sd4={y:0};
function tbl4her(){
  $('#tHr thead tr').innerHTML=
    [['nm','cName',0,0],['y','cYear',1,0],['kind','cType',0,0],['pref','cPref',0,1]]
    .map(function(c){
      return '<th data-k="'+c[0]+'"'+(c[2]?' class="n"':'')+(c[3]?' data-opt="1"':'')
        +(sk4===c[0]?' aria-sort="'+(sd4[c[0]]?'descending':'ascending')+'"':'')
        +'>'+T(c[1])+'</th>';}).join('');
  $$('#tHr th').forEach(function(th){th.onclick=function(){
    var k=th.dataset.k; sd4[k]=(sk4===k)?!sd4[k]:(k==='y'); sk4=k; tbl4her();};});
  var HK=[['Cultural','文化遺產','文化遺産'],['Natural','自然遺產','自然遺産']];
  var CK=[['National Treasure keep','國寶天守','国宝天守'],['Original keep','現存天守','現存天守'],
          ['Reconstructed','復原・再建','復元・再建']];
  var rows=[];
  HER.forEach(function(h){
    var g=GEO.her.filter(function(x){return x[0]===h[0];})[0];
    rows.push({nm:L3(h),y:h[3],kind:L3(HK[h[4]]),pref:h[5].map(pn).join(' / '),
      c:h[5][0],lon:g?g[2]:null,lat:g?g[3]:null});});
  CAS.forEach(function(k){
    var g=GEO.cas.filter(function(x){return x[0]===k[0];})[0];
    rows.push({nm:L3(k),y:0,kind:L3(CK[k[4]]),pref:pn(k[3]),
      c:k[3],lon:g?g[2]:null,lat:g?g[3]:null});});
  rows.sort(function(a,b){var x=a[sk4],y=b[sk4];
    var r=(typeof x==='number')?x-y:String(x).localeCompare(String(y));
    return sd4[sk4]?-r:r;});
  $('#tHr tbody').innerHTML=rows.map(function(p){
    return '<tr><td class="nm"><button data-c="'+p.c+'"'
      +(p.lon!==null?' data-lon="'+p.lon+'" data-lat="'+p.lat+'"':'')+'>'+esc(p.nm)+'</button></td>'
      +'<td class="n mono">'+(p.y?p.y:'\u00B7')+'</td>'
      +'<td style="color:var(--ink2)">'+esc(p.kind)+'</td>'
      +'<td data-opt="1">'+esc(p.pref)+'</td></tr>';}).join('');
  $$('#tHr td.nm button').forEach(function(b){b.onclick=function(){
    openPref(b.dataset.c);
    if(b.dataset.lon) flyToPoint(+b.dataset.lon,+b.dataset.lat,V0[2]/10); else flyTo(b.dataset.c);
    $('.main').scrollIntoView({block:'start',behavior:'smooth'});};});
  $('#hrc').textContent=HER.length+' \u00B7 '+CAS.length;
}
function tblFacts(){
  var F=[], li=LI();
  function push(l,v){F.push('<div class="fact"><div class="l">'+l+'</div><div class="v">'+v+'</div></div>');}
  function P(a){return a[li];}
  function by(k,d){return CODES.slice().sort(function(a,b){return d*(sortVal(a,k)-sortVal(b,k));});}
  var N=function(c){return '<b>'+esc(pn(c))+'</b>';};
  var M=function(v,u){return ' <span class="mono">'+v+(u||'')+'</span>';};
  var pop=by('pop',-1), area=by('area',-1), den=by('den',-1), hi=by('hiv',-1), pv=by('nprov',-1);
  push(P(['Most populous','人口最多','人口最多']),N(pop[0])+M(fmt(PR[pop[0]].pop)));
  push(P(['Least populous','人口最少','人口最少']),N(pop[46])+M(fmt(PR[pop[46]].pop)));
  push(P(['Largest','面積最大','面積最大']),N(area[0])+M(fmt(PR[area[0]].area),' km²'));
  push(P(['Smallest','面積最小','面積最小']),N(area[46])+M(fmt(PR[area[46]].area),' km²'));
  push(P(['Densest','人口最密','人口密度最高']),N(den[0])+M(Math.round(PR[den[0]].den),' /km²'));
  push(P(['Sparsest','人口最疏','人口密度最低']),N(den[46])+M(Math.round(PR[den[46]].den),' /km²'));
  push(P(['Highest summit','最高峰','最高峰']),
    '<b>'+esc(G(PR[hi[0]].hi[0]))+'</b>'+M(fmt(PR[hi[0]].hi[1]),' m')+' \u00B7 '+esc(pn(hi[0])));
  push(P(['Lowest prefectural high point','各縣最高點中最低者','県最高点で最も低い']),
    '<b>'+esc(G(PR[hi[46]].hi[0]))+'</b>'+M(fmt(PR[hi[46]].hi[1]),' m')+' \u00B7 '+esc(pn(hi[46])));
  push(P(['Most former provinces','含令制國最多','旧国を最も多く含む']),
    N(pv[0])+M(PR[pv[0]].prov.length));
  var lk=LAKES.slice().sort(function(a,b){return b[3]-a[3];})[0];
  var dp=LAKES.slice().sort(function(a,b){return b[4]-a[4];})[0];
  var rv=RIVERS.slice().sort(function(a,b){return b[3]-a[3];})[0];
  var bs=RIVERS.slice().sort(function(a,b){return b[4]-a[4];})[0];
  push(P(['Largest lake','最大湖泊','最大の湖']),'<b>'+esc(L3(lk))+'</b>'+M(fmt(lk[3]),' km²'));
  push(P(['Deepest lake','最深湖泊','最も深い湖']),'<b>'+esc(L3(dp))+'</b>'+M(fmt(dp[4]),' m'));
  push(P(['Longest river','最長河川','最長の川']),'<b>'+esc(L3(rv))+'</b>'+M(fmt(rv[3]),' km'));
  push(P(['Largest river basin','流域最廣','最大の流域']),'<b>'+esc(L3(bs))+'</b>'+M(fmt(bs[4]),' km²'));
  push(P(['Lowest natural point','天然最低點','自然の最低地点']),
    P(['<b>Hachirōgata</b>','<b>八郎潟</b>','<b>八郎潟</b>'])+M('\u22124',' m'));
  push(P(['Coastline','海岸線','海岸線']),M('29,751',' km'));
  push(P(['Islands counted in 2023','二〇二三年清點島嶼','二〇二三年の島数']),M('14,125'));
  push(P(['Exclusive economic zone','專屬經濟海域','排他的経済水域']),M('4,470,000',' km²'));
  push(P(['Active volcanoes on this sheet','圖上活火山','図上の活火山']),
    M(String(PEAKS.filter(function(k){return k[7]===2;}).length)));
  push(P(['Surviving castle keeps','現存天守','現存天守']),
    M(String(CAS.filter(function(k){return k[4]<2;}).length))+' / '+CAS.length);
  push(P(['World Heritage properties','世界遺產','世界遺産']),
    M(String(HER.length))+' \u00B7 '+HER.filter(function(h){return h[4]===1;}).length
    +' '+P(['natural','自然','自然']));
  push(P(['Ritsuryō provinces recorded','收錄令制國','収録令制国']),M(String(PROV.length)));
  push(P(['First national park','最早的國立公園','最初の国立公園']),
    P(['<b>Unzen-Amakusa, Setonaikai, Kirishima</b> <span class="mono">1934</span>',
       '<b>雲仙天草、瀨戶內海、霧島</b> <span class="mono">1934</span>',
       '<b>雲仙天草・瀬戸内海・霧島</b> <span class="mono">1934</span>']));
  push(P(['Most recent national park','最新的國立公園','最新の国立公園']),
    P(['<b>Hidaka-sanmyaku Erimo-Tokachi</b> <span class="mono">2024</span>',
       '<b>日高山脈襟裳十勝</b> <span class="mono">2024</span>',
       '<b>日高山脈襟裳十勝</b> <span class="mono">2024</span>']));
  $('#facts').innerHTML=F.join('');
}

/* -------------------------------------------------- surveyed geometry ----- */
var FID='local';
/* The fidelity of the outlines is a matter for whoever opens the settings
   panel, not for the masthead. Nothing about it is shouted at the reader. */
function setFid(state){
  FID=state;
  var line=$('#fidTxt');
  if(line) line.textContent=T(state==='local'?'fidLocal':state==='loading'?'fidLoading'
    :state==='survey'?'fidSurvey':state==='muni'?'fidMuni':'fidFail');
  if(state==='fail'){
    var sw=$('#swSurvey'); if(sw) sw.setAttribute('aria-pressed','false');
    var sm=$('#swMuni'); if(sm) sm.setAttribute('aria-pressed','false');
  }
  paintStrip();
}
function decodeTopo(topo,name){
  var tr=topo.transform, q=!!tr, sx=1,sy=1,tx=0,ty=0;
  if(q){sx=tr.scale[0];sy=tr.scale[1];tx=tr.translate[0];ty=tr.translate[1];}
  var arcs=topo.arcs.map(function(src){
    var x=0,y=0,out=[];
    for(var i=0;i<src.length;i++){
      if(q){x+=src[i][0];y+=src[i][1];out.push([x*sx+tx,y*sy+ty]);}
      else out.push([src[i][0],src[i][1]]);
    }
    return out;});
  function ring(idx){
    var out=[];
    for(var i=0;i<idx.length;i++){
      var k=idx[i],rev=k<0,a=arcs[rev?~k:k];
      if(!a)continue;
      if(rev){for(var j=a.length-1;j>=0;j--)out.push(a[j]);}
      else{for(var m=0;m<a.length;m++)out.push(a[m]);}
    }
    return out;}
  function ringsOf(g){
    var rs=[];
    if(g.type==='Polygon')(g.arcs||[]).forEach(function(r){rs.push(ring(r));});
    else if(g.type==='MultiPolygon')(g.arcs||[]).forEach(function(pl){
      pl.forEach(function(r){rs.push(ring(r));});});
    return rs;}
  var o=topo.objects&&(topo.objects[name]||topo.objects[Object.keys(topo.objects)[0]]);
  if(!o) return null;
  return (o.geometries||[o]).map(function(g){
    return {id:String(g.id!=null?g.id:(g.properties&&(g.properties.id||g.properties.code)||'')),
            rings:ringsOf(g)};});
}
function decodeGeo(fc){
  if(!fc||!fc.features) return null;
  return fc.features.map(function(f){
    var g=f.geometry||{}, rs=[];
    if(g.type==='Polygon') (g.coordinates||[]).forEach(function(r){rs.push(r);});
    else if(g.type==='MultiPolygon') (g.coordinates||[]).forEach(function(pl){
      pl.forEach(function(r){rs.push(r);});});
    var p=f.properties||{};
    return {id:String(f.id!=null?f.id:(p.id||p.code||p.pref||'')),rings:rs};
  });
}
function ringsToPath(rs,lonlat){
  var d='';
  for(var i=0;i<rs.length;i++){
    var r=rs[i]; if(r.length<3) continue;
    if(lonlat) r=projRing(r);
    d+='M'+r[0][0].toFixed(1)+' '+r[0][1].toFixed(1);
    for(var j=1;j<r.length;j++) d+='L'+r[j][0].toFixed(1)+' '+r[j][1].toFixed(1);
    d+='Z';
  }
  return d;
}
function getJSON(url,ms){
  return new Promise(function(res,rej){
    var done=false, timer=setTimeout(function(){
      if(!done){done=true;rej(new Error('timeout'));}},ms||18000);
    function ok(j){if(!done){done=true;clearTimeout(timer);res(j);}}
    function bad(e){if(!done){done=true;clearTimeout(timer);rej(e);}}
    function xhr(){
      try{
        var x=new XMLHttpRequest(); x.open('GET',url,true);
        x.onload=function(){try{ok(JSON.parse(x.responseText));}catch(e){bad(e);}};
        x.onerror=function(){bad(new Error('xhr'));};
        x.send();
      }catch(e){bad(e);}
    }
    if(typeof fetch==='function'){
      fetch(url).then(function(r){
        if(!r.ok) throw new Error('http '+r.status); return r.json();
      }).then(ok,function(){xhr();});
    } else xhr();
  });
}
/* Only WGS84 payloads are usable. jpn-atlas is pre-projected to an
   850 by 680 viewport, so it is deliberately not in this list. */
var MIRRORS={
  pref:['https://cdn.jsdelivr.net/gh/dataofjapan/land@master/japan.topojson',
        'https://fastly.jsdelivr.net/gh/dataofjapan/land@master/japan.topojson',
        'https://gcore.jsdelivr.net/gh/dataofjapan/land@master/japan.topojson',
        'https://raw.githubusercontent.com/dataofjapan/land/master/japan.topojson',
        'https://cdn.jsdelivr.net/gh/dataofjapan/land@master/japan.geojson'],
  muni:['https://cdn.jsdelivr.net/gh/smartnews-smri/japan-topography@main/data/municipality/topojson/s0010/N03-21_210101.json',
        'https://fastly.jsdelivr.net/gh/smartnews-smri/japan-topography@main/data/municipality/topojson/s0010/N03-21_210101.json']
};
function looksLonLat(geoms){
  var n=0, ok=0;
  for(var i=0;i<geoms.length&&n<400;i++){
    var rs=geoms[i].rings;
    for(var j=0;j<rs.length&&n<400;j++){
      var r=rs[j], step=Math.max(1,Math.floor(r.length/6));
      for(var k=0;k<r.length&&n<400;k+=step){
        n++;
        if(Math.abs(r[k][0])<=180&&Math.abs(r[k][1])<=90) ok++;
      }
    }
  }
  return n>0&&ok/n>0.95;
}
function pad2(v){var s=String(v).replace(/[^0-9]/g,'');return s.length===1?'0'+s:s.slice(0,2);}
var surveyed=null, loading=false;
function loadSurveyed(withMuni){
  if(loading) return;
  loading=true; setFid('loading');
  var urls=MIRRORS.pref.slice();
  (function attempt(){
    if(!urls.length){loading=false;setFid(surveyed?'survey':'fail');return;}
    var u=urls.shift();
    getJSON(u,18000).then(function(doc){
      var gs=doc.type==='Topology'?decodeTopo(doc,'japan'):decodeGeo(doc);
      if(!gs||!gs.length) throw new Error('no geometry');
      if(!looksLonLat(gs)) throw new Error('pre-projected payload');
      var map={}, all='';
      gs.forEach(function(g){
        var code=pad2(g.id); if(!code||!PR[code]) return;
        var d=ringsToPath(g.rings,true);
        if(d){map[code]=(map[code]||'')+d;}
      });
      Object.keys(map).forEach(function(k){all+=map[k];});
      if(Object.keys(map).length<45) throw new Error('incomplete: '+Object.keys(map).length);
      var bb=measure(all);
      if(!bb||bb[2]<=0||bb[3]<=0) throw new Error('empty geometry');
      var ix=Math.max(0,Math.min(bb[0]+bb[2],V0[0]+V0[2])-Math.max(bb[0],V0[0]));
      var iy=Math.max(0,Math.min(bb[1]+bb[3],V0[1]+V0[3])-Math.max(bb[1],V0[1]));
      var inside=(ix*iy)/(bb[2]*bb[3]), covers=(ix*iy)/(V0[2]*V0[3]);
      if(inside<0.75||covers<0.20) throw new Error('does not fit the sheet');
      surveyed=map; drawPrefs(map,false);
      L.muni.textContent='';
      if($('#theme').value) applyTheme($('#theme').value);
      loading=false; setFid('survey');
      lastKey=''; detail();
      if(withMuni) loadMuni();
    }).catch(function(){attempt();});
  })();
}
function loadMuni(){
  var urls=MIRRORS.muni.slice();
  (function attempt(){
    if(!urls.length){$('#swMuni').setAttribute('aria-pressed','false');return;}
    getJSON(urls.shift(),22000).then(function(doc){
      var gs=doc.type==='Topology'?decodeTopo(doc,null):decodeGeo(doc);
      if(!gs||gs.length<500) throw new Error('too few');
      if(!looksLonLat(gs)) throw new Error('pre-projected');
      var d=gs.map(function(g){return ringsToPath(g.rings,true);}).join('');
      var bb=measure(d);
      if(!bb||bb[2]<=0) throw new Error('empty');
      L.muni.textContent='';
      L.muni.appendChild(el('path',{d:d,'class':'cnty'}));
      var b=$('#layers [data-layer=muni]');
      b.setAttribute('aria-pressed','true'); L.muni.setAttribute('data-off','0');
      setFid('muni'); lastKey=''; detail();
    }).catch(function(){attempt();});
  })();
}
function revertLocal(){
  drawPrefs(SCHEM,true); L.muni.textContent='';
  $('#layers [data-layer=muni]').setAttribute('aria-pressed','false');
  L.muni.setAttribute('data-off','1');
  if($('#theme').value) applyTheme($('#theme').value);
  setFid('local'); lastKey=''; detail();
}

/* -------------------------------------------------- national section ------ */
/* The flag follows the Act on National Flag and Anthem of 1999: proportion
   2:3, the crimson disc centred with a diameter three fifths of the hoist. */
function drawFlag(){
  var f=$('#flag'); if(!f) return;
  f.textContent='';
  f.appendChild(el('rect',{x:0,y:0,width:900,height:600,fill:'#FFFFFF'}));
  f.appendChild(el('circle',{cx:450,cy:300,r:180,fill:'#BC002D'}));
  f.appendChild(el('rect',{x:0,y:0,width:900,height:600,fill:'none',
    stroke:'var(--line2)','stroke-width':2}));
}
function kikuPetal(r0,r1,w){
  var m=r0+(r1-r0)*0.42, t=r1-(r1-r0)*0.12;
  return 'M0 '+(-r0).toFixed(1)
    +'C'+w.toFixed(1)+' '+(-(r0+(r1-r0)*0.10)).toFixed(1)
    +','+(w*1.02).toFixed(1)+' '+(-m).toFixed(1)
    +','+(w*0.36).toFixed(1)+' '+(-t).toFixed(1)
    +'C'+(w*0.16).toFixed(1)+' '+(-r1).toFixed(1)
    +','+(-w*0.16).toFixed(1)+' '+(-r1).toFixed(1)
    +','+(-w*0.36).toFixed(1)+' '+(-t).toFixed(1)
    +'C'+(-(w*1.02)).toFixed(1)+' '+(-m).toFixed(1)
    +','+(-w).toFixed(1)+' '+(-(r0+(r1-r0)*0.10)).toFixed(1)
    +',0 '+(-r0).toFixed(1)+'Z';
}
/* 十六八重表菊: sixteen petals in the front rank with a second rank showing
   between them, over a raised boss. Petals are ogival with a central keel. */
function sealKiku(){
  var rear='',front='',keel='';
  for(var i=0;i<16;i++){
    var af=i*22.5, ar=af+11.25;
    rear +='<path d="'+kikuPetal(21,86,14.5)+'" transform="rotate('+ar+')"/>';
    front+='<path d="'+kikuPetal(17,100,18.5)+'" transform="rotate('+af+')"/>';
    keel +='<path d="M0 -26 L0 -92" transform="rotate('+af+')"/>';
  }
  return '<svg viewBox="-112 -112 224 224" role="img">'
    +'<g stroke-linejoin="round">'
    +'<g fill="var(--ama)" stroke="var(--tobi)" stroke-width="1.5" opacity=".62">'+rear+'</g>'
    +'<g fill="var(--ama)" stroke="var(--tobi)" stroke-width="1.7">'+front+'</g>'
    +'<g fill="none" stroke="var(--tobi)" stroke-width="1" opacity=".38" stroke-linecap="round">'+keel+'</g>'
    +'<circle cx="0" cy="0" r="26" fill="var(--ama)" stroke="var(--tobi)" stroke-width="1.7"/>'
    +'<circle cx="0" cy="0" r="17" fill="none" stroke="var(--tobi)" stroke-width="1.3" opacity=".72"/>'
    +'<circle cx="0" cy="0" r="8" fill="var(--tobi)" opacity=".62"/>'
    +'</g></svg>';
}
/* 五七桐: three spikes bearing five, seven and five blossoms above three
   paulownia leaves. Each blossom is a tubular bell; the leaves are cordate
   with a stalk and five veins. */
/* 五七桐. A paulownia blossom is a tube that flares to a three lobed mouth,
   so it is built from a body, a scalloped lip and a calyx rather than an
   ellipse. Blossoms alternate up each spike on short pedicels and shrink
   toward the tip. The leaves are cordate, notched at the stalk, with a
   midrib and four laterals. */
var KIRI_BELL=
  '<path d="M0 0C-3.6 -1.1,-5.6 -4.2,-6.4 -8.2C-7.6 -14.2,-8.4 -19.4,-6.4 -23.8'
 +'C-4.6 -27.8,-2.4 -30,0 -31.4C2.4 -30,4.6 -27.8,6.4 -23.8'
 +'C8.4 -19.4,7.6 -14.2,6.4 -8.2C5.6 -4.2,3.6 -1.1,0 0Z"/>'
 +'<path d="M-6.6 -22.6C-5.1 -27.4,-2.7 -29.9,0 -31.4C2.7 -29.9,5.1 -27.4,6.6 -22.6"'
 +' fill="none" stroke="var(--tobi)" stroke-width="1.15" opacity=".55"/>'
 +'<path d="M-2.7 -26.6C-1.6 -29.2,-0.8 -30.4,0 -31.4C0.8 -30.4,1.6 -29.2,2.7 -26.6"'
 +' fill="none" stroke="var(--tobi)" stroke-width="1" opacity=".45"/>'
 +'<path d="M0 -5.4L0 -21" fill="none" stroke="var(--tobi)" stroke-width="1" opacity=".33"/>'
 +'<path d="M-3.4 -0.6C-2.2 -3.2,-1.1 -4.4,0 -5C1.1 -4.4,2.2 -3.2,3.4 -0.6Z"'
 +' opacity=".85"/>';
function kiriSpike(n){
  var rows=Math.floor(n/2), odd=n%2;
  var top=-(12+rows*17+(odd?18:0));
  var out='<path d="M-2.7 11 L2.7 11 L1.9 '+top.toFixed(0)+' L-1.9 '+top.toFixed(0)+' Z"/>';
  for(var i=0;i<rows;i++){
    var y=-8-i*17, s=(1-i*0.085), a=21-i*3, dx=(10.6*s);
    out+='<path d="M0 '+(y+3).toFixed(1)+'L'+(-dx*0.62).toFixed(1)+' '+(y-1.5).toFixed(1)+'"'
       +' fill="none" stroke="var(--tobi)" stroke-width="1.3" stroke-linecap="round"/>';
    out+='<path d="M0 '+(y+3).toFixed(1)+'L'+(dx*0.62).toFixed(1)+' '+(y-1.5).toFixed(1)+'"'
       +' fill="none" stroke="var(--tobi)" stroke-width="1.3" stroke-linecap="round"/>';
    out+='<g transform="translate('+(-dx).toFixed(1)+','+(y-1).toFixed(1)+') rotate(-'+a
       +') scale('+s.toFixed(3)+')">'+KIRI_BELL+'</g>';
    out+='<g transform="translate('+dx.toFixed(1)+','+(y-1).toFixed(1)+') rotate('+a
       +') scale('+s.toFixed(3)+')">'+KIRI_BELL+'</g>';
  }
  if(odd){
    var ys=-8-rows*17-3, ss=(1-rows*0.085);
    out+='<g transform="translate(0,'+ys.toFixed(1)+') scale('+ss.toFixed(3)+')">'+KIRI_BELL+'</g>';
  }
  return out;
}
var KIRI_LEAF=
  '<path d="M0 -5C-3.4 1.6,-7.6 4.4,-12.6 7.6C-23 14.2,-30.4 29,-30 45.6'
 +'C-29.6 63.4,-19.4 84,0 104C19.4 84,29.6 63.4,30 45.6'
 +'C30.4 29,23 14.2,12.6 7.6C7.6 4.4,3.4 1.6,0 -5Z"/>'
 +'<g fill="none" stroke="var(--tobi)" stroke-width="1.25" opacity=".38" stroke-linecap="round">'
 +'<path d="M0 3L0 96"/><path d="M0 17L-19.5 39"/><path d="M0 17L19.5 39"/>'
 +'<path d="M0 44L-19.5 66"/><path d="M0 44L19.5 66"/></g>';
function sealKiri(){
  var g='<g fill="var(--ama)" stroke="var(--tobi)" stroke-width="1.75" stroke-linejoin="round">';
  g+='<g transform="translate(-57,22) rotate(-29) scale(.90)">'+KIRI_LEAF+'</g>';
  g+='<g transform="translate(57,22) rotate(29) scale(.90)">'+KIRI_LEAF+'</g>';
  g+='<g transform="translate(0,30)">'+KIRI_LEAF+'</g>';
  g+='<g transform="translate(-47,13) rotate(-24)">'+kiriSpike(5)+'</g>';
  g+='<g transform="translate(47,13) rotate(24)">'+kiriSpike(5)+'</g>';
  g+='<g transform="translate(0,3)">'+kiriSpike(7)+'</g>';
  return '<svg viewBox="-110 -126 220 292" role="img">'+g+'</g></svg>';
}
/* One national timeline. Entries marked with a diamond changed the shape of
   the map, which is why a history belongs in an atlas at all. */
var HIST=[
[57,0,['An envoy of Na receives a golden seal from the Han court','奴國遣使獲漢廷賜金印','奴国の使者が漢の金印を受ける'],'Hakata Bay'],
[239,0,['Himiko of Yamatai sends envoys to Wei','邪馬臺國卑彌呼遣使魏國','邪馬台国の卑弥呼が魏に使いを送る'],'Wei zhi'],
[538,0,['Buddhism transmitted from Baekje','佛教自百濟傳入','百済より仏教が伝わる'],'or 552'],
[645,1,['Taika Reform begins the provincial and district system','大化改新開啟國郡制','大化の改新により国郡制が始まる'],'kuni and kōri'],
[701,1,['Taihō Code completes the ritsuryō provinces','大寶律令確立令制國','大宝律令により令制国が整う'],'Gokishichidō'],
[710,1,['Capital moved to Heijō-kyō at Nara','遷都平城京','平城京に遷都'],'Nara'],
[794,1,['Capital moved to Heian-kyō, seat for a thousand years','遷都平安京，此後千年為都','平安京に遷都、以後千年の都'],'Kyoto'],
[1185,1,['Kamakura shogunate, the first warrior government','鎌倉幕府，首個武家政權','鎌倉幕府、最初の武家政権'],'Minamoto'],
[1274,0,['First Mongol invasion; the second follows in 1281','蒙古首次來襲，一二八一年再至','文永の役、一二八一年に弘安の役'],'Hakata Bay'],
[1336,1,['Ashikaga shogunate at Kyoto; two courts contend to 1392','足利幕府開於京都，南北朝對峙至一三九二年','足利幕府が京に開かれ、南北朝は一三九二年まで'],'Muromachi'],
[1467,0,['Ōnin War opens a century of general civil war','應仁之亂開啟百年戰國','応仁の乱から百年の戦国へ'],'to 1477'],
[1543,0,['Portuguese reach Tanegashima with firearms','葡萄牙人攜火繩槍抵種子島','ポルトガル人が鉄砲を伝える'],'Tanegashima'],
[1590,0,['Hideyoshi completes the unification of the country','豐臣秀吉完成天下統一','秀吉が天下統一を果たす'],'Odawara'],
[1600,0,['Sekigahara decides the succession to Hideyoshi','關原之戰決定豐臣之後的天下','関ヶ原の戦い'],'Gifu'],
[1603,1,['Edo shogunate founded; Edo becomes the seat of power','江戶幕府成立，江戶成為權力所在','江戸幕府開府、江戸が権力の座に'],'Tokugawa'],
[1609,1,['Satsuma invades the Ryūkyū Kingdom','薩摩入侵琉球王國','薩摩が琉球王国に侵攻'],'Ryukyu'],
[1639,0,['Maritime restrictions completed; Dejima remains the one channel','海禁完成，出島為唯一通口','鎖国が完成、出島のみが窓口'],'Nagasaki'],
[1854,0,['Convention of Kanagawa opens Shimoda and Hakodate','神奈川條約開下田與函館','日米和親条約で下田と箱館を開く'],'Perry'],
[1868,1,['Meiji Restoration; Edo renamed Tokyo and the court moves there','明治維新，江戶改稱東京，朝廷東遷','明治維新、江戸を東京と改め遷る'],'Tokyo'],
[1869,1,['Ezo renamed Hokkaidō and surveyed into eleven provinces','蝦夷改稱北海道，劃為十一國','蝦夷地を北海道と改め十一国に分ける'],'Kaitakushi'],
[1871,1,['Domains abolished and replaced by prefectures','廢藩置縣','廃藩置県'],'302 then 72'],
[1879,1,['The Ryūkyū Kingdom is annexed as Okinawa Prefecture','琉球王國併為沖繩縣','琉球処分により沖縄県となる'],'Okinawa'],
[1888,1,['The count of prefectures settles at forty-seven','都道府縣數目定於四十七','府県の数が四十七に定まる'],'Kagawa last'],
[1889,0,['Meiji Constitution promulgated; the Diet opens in 1890','頒布明治憲法，一八九〇年開設帝國議會','大日本帝国憲法発布、翌々年に帝国議会'],'11 February'],
[1923,0,['Great Kantō earthquake destroys much of Tokyo and Yokohama','關東大地震摧毀東京與橫濱大半','関東大震災で東京と横浜が壊滅'],'1 September'],
[1945,1,['Defeat; Okinawa and the Ryūkyūs pass under American administration','戰敗，沖繩與琉球轉由美國治理','敗戦、沖縄と琉球は米国施政下に'],'August'],
[1947,0,['The postwar Constitution comes into force','戰後憲法施行','日本国憲法施行'],'3 May'],
[1964,0,['Tokyo Olympics; the Tōkaidō Shinkansen opens','東京奧運，東海道新幹線通車','東京五輪、東海道新幹線開業'],'October'],
[1972,1,['Okinawa is returned to Japanese administration','沖繩歸還日本施政','沖縄の施政権が返還される'],'15 May'],
[1995,0,['The Kobe earthquake kills more than six thousand','阪神大地震奪走逾六千條性命','阪神淡路大震災で六千人以上が犠牲に'],'17 January'],
[2011,0,['Tōhoku earthquake and tsunami; the Fukushima accident follows','東北大地震與海嘯，繼以福島核災','東日本大震災と津波、福島の事故が続く'],'11 March'],
[2019,0,['Reiwa era begins on the accession of the Emperor Naruhito','德仁天皇即位，令和改元','徳仁天皇の即位により令和が始まる'],'1 May'],
[2024,0,['A magnitude 7.6 earthquake strikes the Noto Peninsula','能登半島發生規模七點六強震','能登半島地震、マグニチュード七・六'],'1 January']
];
var ERACOL=['#6A8F8D','#5DAC81','#007B43','#C4A882','#724938','#2B618F','#4C6CB3',
            '#66327C','#522F60','#622954','#ED6D3D','#B8860B','#707C74','#2E5C6E','#8A4E7A','#C00000'];
/* ---------------------------------------------------------------------
   君が代. The text is a waka of the Heian period, recorded anonymously as
   poem 343 in the Kokin Wakashū about 905, and carried in the schedule to
   the Act on National Flag and Anthem of 1999. The romanization below is a
   mechanical transliteration. The renderings that follow are conveniences
   for the reader: a translation is an interpretation, and others differ.
   --------------------------------------------------------------------- */
var ANTHEM_VERSE=['君が代は','千代に八千代に','細石の','巌となりて','苔の生すまで'];
var ANTHEM_ROMAJI=['Kimi ga yo wa','Chiyo ni yachiyo ni','Sazare-ishi no',
                   'Iwao to narite','Koke no musu made'];
var ANTHEM_TR=[
 ['May your reign Continue','for a thousand, eight thousand generations,',
  'Until the tiny pebbles','Grow into massive boulders','Lush with moss'],
 ['吾君壽長久','千代長存八千代','永末歲常青','直至細石成巨巖','巖上生苔不止息'],
 null
];

var eraSel=null;
/* A year is a label, not a quantity, so it never takes a thousands
   separator. A count of years does. */
function yrLabel(v){
  return v<0 ? String(-v)+' '+(cur==='en'?'BC':'前') : String(v);
}
function eraSpan(e){
  return yrLabel(e[2])+' '+(cur==='en'?'to':cur==='zh'?'至':'から')+' '
    +(e[3]===null?(cur==='en'?'present':'現在'):yrLabel(e[3]));
}
var ERA_T0=-300, ERA_T1=2026;
/* How long an era ran is the fact a reader wants next after its dates, so
   it sits on the same line as the span. */
function eraLength(e){
  var open=(e[3]===null), end=open?ERA_T1:e[3], n=end-e[2];
  var v=fmt(n);
  if(cur==='zh') return open?('迄今 '+v+' 年'):(v+' 年');
  if(cur==='ja') return open?('現在まで '+v+' 年'):(v+' 年間');
  return open?(v+' years to date'):(v+' years');
}
function eraList(){
  return ERAS.filter(function(e){return e[2]>=ERA_T0&&e[0]!=='nanbokucho';});
}
/* The band carries proportion and nothing else. Putting the names inside it
   is what caused the clipping and the collisions, so they move to a chip row
   underneath where they are free to wrap. */
function paintEras(){
  var li=LI(), hist=eraList(), SPAN=ERA_T1-ERA_T0;
  $('#eraPreLbl').textContent=ERAS[0][1][li]+' \u00B7 '+eraSpan(ERAS[0]);
  /* Widths are strictly proportional, with no minimum. Because the names sit
     in the chips below, a thirty year era may be three pixels wide without
     becoming unreadable, and the axis stays a true linear scale. */
  $('#eraband').innerHTML=hist.map(function(e){
    var a0=Math.max(ERA_T0,e[2]), b0=(e[3]===null?ERA_T1:e[3]);
    var col=ERACOL[ERAS.indexOf(e)%ERACOL.length];
    var lbl=e[1][li]+' '+eraSpan(e);
    return '<button type="button" data-era="'+e[0]+'" aria-pressed="'+(eraSel===e[0])+'"'
      +' style="width:'+((b0-a0)/SPAN*100).toFixed(3)+'%;background:'+col+'"'
      +' aria-label="'+esc(lbl)+'" title="'+esc(lbl)+'"></button>';
  }).join('');
  /* Thin the scale as the band narrows so the years never collide. */
  var bw=0; try{bw=$('#eraband').getBoundingClientRect().width;}catch(err){}
  if(!bw) bw=600;
  var ticks = bw>=620 ? [ERA_T0,0,500,1000,1500,ERA_T1]
            : bw>=380 ? [ERA_T0,500,1500,ERA_T1]
            :           [ERA_T0,1000,ERA_T1];
  $('#erascale').innerHTML=ticks.map(function(y,i){
    var pos=(y-ERA_T0)/SPAN*100;
    if(i===0) return '<span style="left:0">'+yrLabel(y)+'</span>';
    if(i===ticks.length-1) return '<span class="last" style="right:0">'+yrLabel(y)+'</span>';
    return '<span style="left:'+pos.toFixed(2)+'%;transform:translateX(-50%)">'+yrLabel(y)+'</span>';
  }).join('');
  $('#erachips').innerHTML=hist.map(function(e){
    var col=ERACOL[ERAS.indexOf(e)%ERACOL.length];
    return '<button type="button" data-era="'+e[0]+'" aria-pressed="'+(eraSel===e[0])+'">'
      +'<i style="background:'+col+'"></i>'+esc(e[1][li])
      +'<span class="y">'+esc(eraSpan(e))+'</span></button>';}).join('');
  var cav=$('#eracaveat'); if(cav) cav.textContent=ERANOTE[li];
  $$('#eraband button').concat($$('#erachips button')).forEach(function(b){
    b.addEventListener('click',function(){pickEra(b.dataset.era);});});
  showEra();
}
/* Selecting an era narrows the chronicle below it. That is a use for the
   band; sending the reader to the map instead would be a detour. */
function pickEra(id){
  eraSel=(eraSel===id)?null:id;
  $$('#eraband button').concat($$('#erachips button')).forEach(function(n){
    n.setAttribute('aria-pressed',String(n.dataset.era===eraSel));});
  showEra();
}
function showEra(){
  var box=$('#eraDetail'); if(!box) return;
  var li=LI();
  /* run the filter first, so that clearing the selection also clears the
     dimming instead of leaving the chronicle stuck on the last era */
  var n=filterChronicle();
  if(!eraSel){ box.innerHTML='<span class="idle">'+esc(T('eraPrompt'))+'</span>'; return; }
  var e=null; ERAS.forEach(function(x){if(x[0]===eraSel)e=x;});
  if(!e){ box.innerHTML=''; return; }
  var cap=null; GEO.cap.forEach(function(k){if(k[0]===e[4])cap=k;});
  box.innerHTML='<b>'+esc(e[1][li])+'</b>'
    +'<span class="yr">'+esc(eraSpan(e))+' \u00B7 '+esc(eraLength(e))+'</span><br>'
    +esc(e[5][li])
    +(cap?'<span class="st">'+esc(T('eraSeat'))+' \u00B7 '+esc(G(cap[0]))+' \u00B7 '
      +esc(pn(cap[1]))+'</span>':'')
    +'<span class="st">'+esc(T('tlShowing').replace('%n',String(n)))
    +' <button type="button" id="tlClear">'+esc(T('tlAll'))+'</button></span>';
  var cb=$('#tlClear'); if(cb) cb.onclick=function(){pickEra(eraSel);};
  protectRuns(box);
}
function filterChronicle(){
  var rows=$$('#tline li');
  if(!eraSel){
    rows.forEach(function(n){n.classList.remove('dim');n.classList.remove('sel');});
    return 0;
  }
  var e=null; ERAS.forEach(function(x){if(x[0]===eraSel)e=x;});
  if(!e) return 0;
  var a0=e[2], b0=(e[3]===null?9999:e[3]);
  rows.forEach(function(li){
    var y=+li.getAttribute('data-y'), on=(y>=a0&&y<=b0);
    li.classList.toggle('sel',on); li.classList.toggle('dim',!on);
  });
  /* counted from the source, so the figure is right even if the list has
     not been laid out yet */
  var n=0;
  HIST.forEach(function(h){ if(h[0]>=a0&&h[0]<=b0) n++; });
  return n;
}
function paintNational(){
  var li=LI();
  $('#natName').textContent=['Japan','日本國','日本国'][li];
  drawFlag();
  $('#flagP').textContent=SYM[0][3][li];
  $('#anthemT').textContent=['Kimigayo','君之代','君が代'][li];
  $('#anthemSub').textContent=T('anthemSub');
  var vs=$('#anthemV');
  if(ANTHEM_VERSE.length){
    vs.innerHTML=ANTHEM_VERSE.map(function(line,i){
      return '<span class="ln">'+esc(line)+'</span>'
        +'<span class="rom">'+esc(ANTHEM_ROMAJI[i]||'')+'</span>';}).join('');
    vs.style.display='';
  } else { vs.textContent=''; vs.style.display='none'; }
  var tr=$('#anthemTr'), rows=ANTHEM_TR[li];
  if(tr){
    if(rows&&rows.length){
      tr.innerHTML='<span class="lbl">'+esc(T('anthemTr'))+'</span>'
        +rows.map(function(r){return '<span class="ln">'+esc(r)+'</span>';}).join('');
      tr.style.display='';
    } else { tr.textContent=''; tr.style.display='none'; }
  }
  $('#anthemNote').textContent=ANTHEMNOTE[li];
  $('#anthemkv').innerHTML=ANTHEM.map(function(r){
    return '<dt>'+esc(r[0][li])+'</dt><dd>'+esc(r[1][li])+'</dd>';}).join('');
  $('#seals').innerHTML=
    '<div class="seal">'+sealKiku()+'<div class="cap"><b>'+esc(SYM[1][1][li])+'</b>'+esc(SYM[1][2][li])+'</div></div>'
   +'<div class="seal">'+sealKiri()+'<div class="cap"><b>'+esc(SYM[2][1][li])+'</b>'+esc(SYM[2][2][li])+'</div></div>';
  $('#sealspec').innerHTML=
    '<dt>'+T('seJ')+'</dt><dd class="mono">16 + 16 \u00B7 5-7-5</dd>'
   +'<dt>'+['Imperial crest from','皇室紋自','皇室紋の由来'][li]+'</dt><dd>'
     +['thirteenth century, reserved to the imperial house from 1869',
       '十三世紀，一八六九年起專屬皇室','十三世紀、一八六九年より皇室専用'][li]+'</dd>'
   +'<dt>'+['Government crest','政府紋','政府の紋'][li]+'</dt><dd>'
     +['Cabinet and the Prime Minister\u2019s Office','內閣與總理大臣官邸','内閣および総理大臣官邸'][li]+'</dd>';
  var big=CODES.slice().sort(function(a,b){return PR[b].pop-PR[a].pop;})[0];
  $('#natfacts').innerHTML=
    '<div><dt class="tag">'+T('kCap')+'</dt><dd>'+esc(['Tokyo','東京','東京'][li])+'</dd></div>'
   +'<div><dt class="tag">'+T('thBig')+'</dt><dd>'+esc(G(PR[big].big[0]))+'</dd></div>'
   +'<div><dt class="tag">'+['Head of state','國家元首','国家元首'][li]+'</dt><dd>'
     +['Emperor Naruhito','天皇德仁','天皇徳仁'][li]+'</dd></div>'
   +'<div><dt class="tag">'+['Era','年號','元号'][li]+'</dt><dd>'
     +['Reiwa, from 2019','令和，自二〇一九年','令和、二〇一九年から'][li]+'</dd></div>'
   +'<div><dt class="tag">'+['Constitution','憲法','憲法'][li]+'</dt><dd>1947-05-03</dd></div>'
   +'<div><dt class="tag">'+['Divisions','行政區','行政区画'][li]+'</dt><dd>1+1+2+43</dd></div>'
   +'<div><dt class="tag">'+['Currency','貨幣','通貨'][li]+'</dt><dd>JPY \u00A5</dd></div>'
   +'<div><dt class="tag">'+['Codes','代碼','コード'][li]+'</dt><dd class="mono">JP \u00B7 JPN \u00B7 392</dd></div>';
  $('#flagspec').innerHTML=
    '<dt>'+T('flAdopted')+'</dt><dd>1999-08-13</dd>'
   +'<dt>'+T('flRatio')+'</dt><dd class="mono">2 : 3</dd>'
   +'<dt>'+T('flColours')+'</dt><dd class="mono">#FFFFFF &middot; #BC002D</dd>'
   +'<dt>'+T('flLaw')+'</dt><dd>'+['Act on National Flag and Anthem','國旗及國歌法','国旗及び国歌に関する法律'][li]+'</dd>';
  $('#tline').innerHTML=HIST.map(function(a){
    return '<li data-y="'+a[0]+'"'+(a[1]?' class="mapchg"':'')+'><span class="y">'+a[0]+'</span>'
      +'<span class="w">'+esc(a[2][li])+'<span class="a">'+esc(a[3])+'</span></span></li>';}).join('');
  paintEras(); filterChronicle();
}

/* --------------------------------------------------------------- chrome --- */
/* Browsers break Chinese and Japanese between any two han characters, which
   is correct for prose but wrong inside a number: 一八七〇年 must not become
   一八 / 七〇年. Runs of kanji numerals, and figures with their units, are
   sealed into a nowrap span after each render. Text nodes only, so nothing
   with a listener on it is touched. */
var NB_RE=/[〇零一二三四五六七八九十百千萬万]+(?:年代|世紀|年|月|日)|[〇零一二三四五六七八九十百千萬万]{2,}|\d[\d,]*(?:\.\d+)?\s?(?:km²|km|m|%)/g;
function protectRuns(root){
  if(!root||!document.createTreeWalker) return;
  var w,nodes=[],n;
  try{ w=document.createTreeWalker(root,4,null,false); }catch(e){ return; }
  while((n=w.nextNode())){
    if(n.parentNode&&n.parentNode.className==='nb') continue;
    NB_RE.lastIndex=0;
    if(NB_RE.test(n.nodeValue)) nodes.push(n);
  }
  nodes.forEach(function(t){
    var s=t.nodeValue, frag=document.createDocumentFragment(), last=0, m;
    NB_RE.lastIndex=0;
    while((m=NB_RE.exec(s))){
      if(m.index>last) frag.appendChild(document.createTextNode(s.slice(last,m.index)));
      var sp=document.createElement('span');
      sp.className='nb'; sp.textContent=m[0];
      frag.appendChild(sp);
      last=m.index+m[0].length;
    }
    if(last<s.length) frag.appendChild(document.createTextNode(s.slice(last)));
    if(t.parentNode) t.parentNode.replaceChild(frag,t);
  });
}
var PROSE='.prose,.hint p,.notes p,.notes .warn,.sym p,.natcol p,.eracaveat,'
  +'.eranote,.rec .prose,.versetr,.src,.seal .cap,.tline .w,.natfacts dd,'
  +'.fact .v,.kv dd,table.nat td.v,.eranote .st';
function typeset(){ $$(PROSE).forEach(protectRuns); }
function paintStrip(){
  var ed=cur==='en'?'August 2026':'2026年8月';
  $('#strip').innerHTML=
   '<div><span class="tag">'+T('mEdition')+'</span><span class="v">'+ed+'</span></div>'
  +'<div><span class="tag">'+T('mProjection')+'</span><span class="v">Albers Equal Area Conic</span></div>'
  +'<div><span class="tag">'+T('mPopulation')+'</span><span class="v"><b>'+fmt(NATPOP)+'</b></span></div>'
  +'<div><span class="tag">'+T('mPrefectures')+'</span><span class="v">47 \u00B7 '+PROV.length+'</span></div>'
  +'<div><span class="tag">'+T('mOnSheet')+'</span><span class="v">'
    +GEO.cities.length+' \u00B7 '+PEAKS.length+' \u00B7 '+HER.length+'</span></div>';
}
function paint(){
  document.documentElement.setAttribute('lang',T('htmlLang'));
  $$('[data-t]').forEach(function(n){
    var k=n.getAttribute('data-t');
    if(k==='srcBody') n.innerHTML=T(k); else n.textContent=T(k);});
  qEl.setAttribute('placeholder',T('qph'));
  qEl.setAttribute('aria-label',T('qph'));
  lblWater.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblSea.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblRiver.forEach(function(o){o.tp.textContent=G(o.t.dataset.term);});
  lblRange.forEach(function(o){o.tp.textContent=G(o.t.dataset.term).toUpperCase();});
  lblPhysio.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblPark.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblCity.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblPeak.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblHer.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblCas.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblCap.forEach(function(t){t.textContent=G(t.dataset.term);});
  lblCode.forEach(function(o){o.t.textContent=pn(o.c).replace(/[縣県]$/,'');});
  lblInset.forEach(function(t){t.textContent=INSETN[t.dataset.code][LI()][0];});
  Object.keys(paths).forEach(function(c){paths[c].setAttribute('aria-label',pn(c));});
  buildThemes(); buildIndex(); tbl1(); tbl2(); tbl3prov(); tbl4her(); tblFacts();
  paintNational(); paintStrip(); setFid(FID);
  qEl.value=''; res.classList.remove('open'); $('#qx').hidden=true;
  if(sel) openPref(sel); else showHint();
  lastKey=''; drawScale(); detail();
  typeset();
}
function closePop(){$('#setPop').classList.remove('open');$('#setBtn').setAttribute('aria-expanded','false');}
function closeLPanel(){$('#lpanel').classList.remove('open');$('#lbtn').setAttribute('aria-expanded','false');}
$('#setBtn').addEventListener('click',function(e){
  e.stopPropagation();
  var open=!$('#setPop').classList.contains('open');
  $('#setPop').classList.toggle('open',open);
  this.setAttribute('aria-expanded',String(open));
});
$$('#segLang button').forEach(function(b){b.addEventListener('click',function(){
  cur=b.dataset.lang;
  $$('#segLang button').forEach(function(o){o.setAttribute('aria-pressed',String(o===b));});
  paint();});});
/* Dusk earns its place as the shared middle ground: it is what a light system
   shows after dark and what a dark system shows by day. Auto resolves the two
   signals, the system colour scheme and the local clock, into one of three. */
var groundPref='auto';
function isNight(){var h=new Date().getHours();return h<6||h>=18;}
function sysDark(){
  try{return window.matchMedia('(prefers-color-scheme: dark)').matches;}catch(e){return false;}
}
function resolveGround(){
  if(groundPref!=='auto') return groundPref;
  return sysDark() ? (isNight()?'night':'dusk') : (isNight()?'dusk':'paper');
}
/* Two inputs, four cases, three grounds. Showing the grid removes any
   question about which rule is in force and why. */
function applyGround(){
  var g=resolveGround();
  if(document.documentElement.getAttribute('data-ground')!==g)
    document.documentElement.setAttribute('data-ground',g);
  $$('#segGround button').forEach(function(o){
    o.setAttribute('aria-pressed',String(o.dataset.ground===groundPref));});
  if($('#theme').value) applyTheme($('#theme').value);
}
$$('#segGround button').forEach(function(b){b.addEventListener('click',function(){
  groundPref=b.dataset.ground; applyGround();});});
(function(){
  try{
    var mq=window.matchMedia('(prefers-color-scheme: dark)');
    if(mq.addEventListener) mq.addEventListener('change',applyGround);
    else if(mq.addListener) mq.addListener(applyGround);
  }catch(e){}
  document.addEventListener('visibilitychange',function(){
    if(!document.hidden) applyGround();});
  setInterval(applyGround,300000);
})();
$('#swDense').addEventListener('click',function(){
  var on=this.getAttribute('aria-pressed')!=='true';
  this.setAttribute('aria-pressed',String(on));
  document.documentElement.setAttribute('data-density',on?'tight':'');
  requestAnimationFrame(function(){syncU();drawScale();});
});
$('#swSurvey').addEventListener('click',function(){
  var on=this.getAttribute('aria-pressed')!=='true';
  this.setAttribute('aria-pressed',String(on));
  if(on) loadSurveyed($('#swMuni').getAttribute('aria-pressed')==='true');
  else {surveyed=null;$('#swMuni').setAttribute('aria-pressed','false');revertLocal();}
});
$('#swMuni').addEventListener('click',function(){
  var on=this.getAttribute('aria-pressed')!=='true';
  this.setAttribute('aria-pressed',String(on));
  if(on){$('#swSurvey').setAttribute('aria-pressed','true');
    if(surveyed) loadMuni(); else loadSurveyed(true);}
  else {L.muni.textContent='';
    $('#layers [data-layer=muni]').setAttribute('aria-pressed','false');
    L.muni.setAttribute('data-off','1'); if(surveyed) setFid('survey');}
});
$('#lbtn').addEventListener('click',function(e){
  e.stopPropagation();
  var open=!$('#lpanel').classList.contains('open');
  $('#lpanel').classList.toggle('open',open);
  this.setAttribute('aria-expanded',String(open));
});
document.addEventListener('keydown',function(e){
  if(e.key!=='Escape') return;
  if($('#setPop').classList.contains('open')) return closePop();
  if($('#lpanel').classList.contains('open')) return closeLPanel();
  if(res.classList.contains('open')) {res.classList.remove('open');return;}
  if(sel) closeReader();
});
var rz;
window.addEventListener('resize',function(){
  clearTimeout(rz);
  rz=setTimeout(function(){syncU();drawScale();lastKey='';detail();},90);
});
if(window.ResizeObserver) new ResizeObserver(function(){syncU();drawScale();}).observe(stage);

applyGround();
paint();
applyVB();
if(/^#\d{2}$/.test(location.hash)){
  var c0=location.hash.slice(1);
  if(PR[c0]){openPref(c0);flyTo(c0);}
}
loadSurveyed(false);

}

export default function JapanReferenceAtlas() {
  const initialized = useRef(false);

  useLayoutEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    /*
     * App.jsx-only host isolation. A stock Vite/React project commonly imports
     * src/index.css from main.jsx. Those unrelated global rules can otherwise
     * alter body, button, heading, and :root rendering even when App.jsx itself
     * is a faithful conversion. Disable only pre-existing stylesheet nodes;
     * the atlas-owned stylesheet and Google Fonts link remain active. This
     * compatibility layer changes no japan.html atlas content, data, IDs,
     * classes, SVG, CSS rules, or runtime algorithms.
     */
    Array.from(document.head.querySelectorAll('style, link[rel="stylesheet"]')).forEach((node) => {
      if (node.getAttribute("data-japan-atlas-owned") === "true") return;
      node.media = "not all";
    });

    // Remove host-page metadata that would otherwise compete with the original atlas head.
    document.head.querySelectorAll(
      'title, meta[name="viewport"], meta[name="theme-color"], meta[name="description"]'
    ).forEach((node) => {
      if (node.getAttribute("data-japan-atlas-owned") !== "true") node.remove();
    });

    // Preserve the original <html> attributes before the original runtime initializes.
    document.documentElement.lang = "en";
    document.documentElement.setAttribute("data-ground", "paper");
    document.documentElement.setAttribute("data-density", "");
    document.title = "Japan Reference Atlas";

    initializeJapanAtlas();
  }, []);

  const head = typeof document === "undefined" ? null : createPortal(
    <>
      <meta data-japan-atlas-owned="true" charSet="utf-8" />
      <meta data-japan-atlas-owned="true" name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
      <meta data-japan-atlas-owned="true" name="theme-color" content="#FCFAF2" />
      <meta data-japan-atlas-owned="true" name="description" content="Reference atlas of Japan: 47 prefectures, 87 ritsuryo provinces, relief, waters, heritage and castles, in English, Chinese and Japanese." />
      <title data-japan-atlas-owned="true">Japan Reference Atlas</title>
      <link data-japan-atlas-owned="true" rel="preconnect" href="https://fonts.googleapis.com" />
      <link data-japan-atlas-owned="true" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link data-japan-atlas-owned="true" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,500;8..60,600;8..60,700&family=Noto+Serif+TC:wght@400;500;600;700&family=Noto+Serif+JP:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style data-japan-atlas-owned="true">{JAPAN_ATLAS_CSS}</style>
    </>,
    document.head
  );

  return (
    <>
      {head}
      <div className="app">

      <header className="hd">
        <h1 data-t="title"></h1>
        <div className="hd-r" style={{ position: "relative" }}>
          <button className="iconbtn" id="setBtn" aria-haspopup="true" aria-expanded="false">
            <span className="sr" data-t="settings"></span>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11A1.7 1.7 0 0 0 8.9 19.3a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11A1.7 1.7 0 0 0 4.7 8.9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H9.1A1.7 1.7 0 0 0 10.13 3V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87v.08a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1.03z"/></svg>
          </button>
          <div className="pop" id="setPop" role="dialog">
            <div className="grp"><span className="tag" data-t="sLang"></span>
              <div className="seg" id="segLang">
                <button data-lang="en" aria-pressed="true">English</button>
                <button data-lang="zh" aria-pressed="false">中文</button>
                <button data-lang="ja" aria-pressed="false">日本語</button>
              </div>
            </div>
            <div className="grp"><span className="tag" data-t="sGround"></span>
              <div className="seg" id="segGround">
                <button data-ground="auto" aria-pressed="true" data-t="gAuto"></button>
                <button data-ground="paper" aria-pressed="false" data-t="gPaper"></button>
                <button data-ground="dusk" aria-pressed="false" data-t="gDusk"></button>
                <button data-ground="night" aria-pressed="false" data-t="gNight"></button>
              </div>
            </div>
            <div className="grp">
              <button className="rowsw" id="swDense" aria-pressed="false">
                <span data-t="sDense"></span><span className="knob"></span></button>
              <button className="rowsw" id="swSurvey" aria-pressed="true">
                <span data-t="sSurvey"></span><span className="knob"></span></button>
              <button className="rowsw" id="swMuni" aria-pressed="false">
                <span data-t="sMuni"></span><span className="knob"></span></button>
              <p className="subline" id="fidTxt"></p>
            </div>
          </div>
        </div>
      </header>

      <div className="strip" id="strip"></div>

      <div className="main">
        <div>
          <div className="stage" id="stage">
            <svg id="map" viewBox="0 0 760 1000" preserveAspectRatio="xMidYMid meet"
                 role="application" aria-label="Map of Japan" tabIndex="0"></svg>

            <div className="ov ov-tl">
              <div style={{ position: "relative" }}>
                <div className="glass search">
                  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4.2-4.2"/></svg>
                  <input id="q" type="search" autoComplete="off" spellCheck={false} />
                  <button id="qx" hidden aria-label="Clear">&times;</button>
                </div>
                <div className="res" id="res" role="listbox"></div>
              </div>
            </div>

            <div className="ov ov-tr">
              <div className="glass zoomstack">
                <button id="zin"><span className="sr">Zoom in</span>
                  <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
                <button id="zout"><span className="sr">Zoom out</span>
                  <svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>
                <button id="zfit"><span className="sr">Reset view</span>
                  <svg viewBox="0 0 24 24"><path d="M9 4H4v5M15 4h5v5M15 20h5v-5M9 20H4v-5"/></svg></button>
                <div className="zlevel" id="zlevel">1.0&times;</div>
              </div>
            </div>

            <div className="ov ov-bl">
              <button className="glass chipbtn" id="lbtn" aria-expanded="false">
                <svg viewBox="0 0 24 24"><path d="M12 3l9 5-9 5-9-5 9-5M3 13l9 5 9-5M3 17l9 5 9-5"/></svg>
                <span data-t="layers"></span></button>
              <div className="glass scalebox">
                <svg width="112" height="18" id="sbar"></svg>
                <svg width="16" height="20" viewBox="0 0 16 20" aria-hidden="true" style={{ flex: "0 0 auto" }}>
                  <line x1="8" y1="19" x2="8" y2="5" stroke="currentColor" strokeWidth=".9"/>
                  <path d="M8 1.5 L10.4 7 L5.6 7 Z" fill="currentColor"/></svg>
              </div>
            </div>

            <div className="lpanel" id="lpanel">
              <div className="grp"><span className="tag" data-t="layers"></span><div id="layers"></div></div>
              <div className="grp"><span className="tag" data-t="theme"></span>
                <select className="sel" id="theme"></select>
                <div id="key"></div>
              </div>
            </div>

            <div className="tip" id="tip" aria-hidden="true"></div>
          </div>
          <p style={{ marginTop: ".5rem", color: "var(--ink3)", fontSize: ".8em", lineHeight: 1.5 }} data-t="mapHint"></p>
        </div>
      </div>

      <section className="rec" id="reader" aria-live="polite"></section>

      <details className="ref natsec" id="nat">
        <summary><span className="tag" data-t="t0"></span><h2 id="natName"></h2></summary>
        <div className="refbody">
          <dl className="natfacts" id="natfacts"></dl>
          <div className="natgrid2">
            <div className="natcol">
              <span className="tag" data-t="nfFlag"></span>
              <div className="flagbox"><svg id="flag" viewBox="0 0 900 600" role="img"></svg></div>
              <p className="prose" id="flagP"></p>
              <dl className="kv" id="flagspec"></dl>
              <div className="seals" id="seals"></div>
              <dl className="kv" id="sealspec" style={{ marginTop: ".6rem" }}></dl>
            </div>
            <div className="natcol">
              <span className="tag" data-t="nfAnthem"></span>
              <h3 className="anthemT" id="anthemT">君が代</h3>
              <p className="anthemSub" id="anthemSub"></p>
              <p className="verse" id="anthemV"></p>
              <p className="versetr" id="anthemTr"></p>
              <p className="prose" id="anthemNote"></p>
              <dl className="kv anthemkv" id="anthemkv" style={{ marginTop: ".7rem" }}></dl>
            </div>
          </div>
          <div className="nathist">
            <span className="tag" data-t="nfEras"></span>
            <p className="prose" data-t="nfErasP"></p>
            <div className="eras">
              <div className="erapre"><span id="eraPreLbl"></span><i></i></div>
              <div className="eraband" id="eraband" role="group"></div>
              <div className="erascale" id="erascale"></div>
              <div className="erachips" id="erachips" role="group"></div>
              <div className="eranote" id="eraDetail"></div>
              <p className="eracaveat" id="eracaveat"></p>
            </div>
            <div className="histsplit">
              <span className="tag" data-t="nfChron"></span>
              <p className="prose" data-t="nfChronP"></p>
              <ol className="tline" id="tline"></ol>
            </div>
          </div>
          <div className="natfoot">
            <span className="tag" data-t="nfOfficial"></span>
            <ul className="links">
              <li><a href="https://www.japan.go.jp/" target="_blank" rel="noopener">japan.go.jp</a>
                <span data-t="lkGov"></span></li>
              <li><a href="https://www.kunaicho.go.jp/" target="_blank" rel="noopener">kunaicho.go.jp</a>
                <span data-t="lkImp"></span></li>
              <li><a href="https://www.gsi.go.jp/" target="_blank" rel="noopener">gsi.go.jp</a>
                <span data-t="lkGsi"></span></li>
              <li><a href="https://www.koryu.or.jp/tw/" target="_blank" rel="noopener">koryu.or.jp</a>
                <span data-t="lkKoryu"></span></li>
            </ul>
          </div>
        </div>
      </details>

      <details className="ref"><summary><span className="tag" data-t="t1"></span><h2 data-t="t1h"></h2>
          <span className="c" data-t="sortHint"></span></summary>
        <div className="refbody"><div className="tw-wrap"><table id="tPr"><thead><tr></tr></thead><tbody></tbody></table></div></div>
      </details>

      <details className="ref"><summary><span className="tag" data-t="t2"></span><h2 data-t="t2h"></h2>
          <span className="c" id="pkc"></span></summary>
        <div className="refbody"><div className="tw-wrap"><table id="tPk"><thead><tr></tr></thead><tbody></tbody></table></div></div>
      </details>

      <details className="ref"><summary><span className="tag" data-t="t5"></span><h2 data-t="t5h"></h2>
          <span className="c" id="pvc"></span></summary>
        <div className="refbody"><div className="tw-wrap"><table id="tPv"><thead><tr></tr></thead><tbody></tbody></table></div></div>
      </details>

      <details className="ref"><summary><span className="tag" data-t="t6"></span><h2 data-t="t6h"></h2>
          <span className="c" id="hrc"></span></summary>
        <div className="refbody"><div className="tw-wrap"><table id="tHr"><thead><tr></tr></thead><tbody></tbody></table></div></div>
      </details>

      <details className="ref"><summary><span className="tag" data-t="t3"></span><h2 data-t="t3h"></h2></summary>
        <div className="refbody"><div className="facts" id="facts"></div></div>
      </details>

      <details className="ref notes"><summary><span className="tag" data-t="t4"></span><h2 data-t="t4h"></h2></summary>
        <div className="refbody">
        <h3 data-t="n1h"></h3><p className="warn" data-t="n1"></p>
        <h3 data-t="n2h"></h3><p data-t="n2"></p>
        <h3 data-t="n3h"></h3><p data-t="n3"></p>
        <h3 data-t="n4h"></h3><p data-t="n4"></p>
        <h3 data-t="n5h"></h3><p data-t="n5"></p>
        <h3 data-t="n6h"></h3><p data-t="n6"></p>
        <h3 data-t="srcH"></h3>
        <div className="src" data-t="srcBody"></div>
        </div>
      </details>
      </div>
    </>
  );
}
