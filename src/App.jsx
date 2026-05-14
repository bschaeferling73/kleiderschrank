import { useState, useEffect } from "react";

// ── Konfiguration ─────────────────────────────────────────────────────────────
const HOME_CITY   = "Boebingen an der Rems";
const WORK_CITY   = "Oberkochen";
const BASE_PATH = import.meta.env.BASE_URL + "Bilder";

// ── Kompletter Kleiderschrank ─────────────────────────────────────────────────
// Format: { name (ohne .jpg), folder, cat }
const WARDROBE = [
  // ACCESSOIRES
  { name:"Guertel_braun_Office-Lager-Freizeit",      folder:"Accessoires", cat:"Accessoire" },
  { name:"Guertel_schwarz_Office-Lager-Freizeit",    folder:"Accessoires", cat:"Accessoire" },
  { name:"Schal_ockergrau_Office-Lager-Freizeit",    folder:"Accessoires", cat:"Accessoire" },
  { name:"Schal_rotgrau_Office-Freizeit-Lager",      folder:"Accessoires", cat:"Accessoire" },
  // HEMDEN – Kurzarm
  { name:"Hemd_kurzarm_blau_grau_kariert_Lager-Freizeit",              folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_blau_Lager-Freizeit",                           folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_blau_schwarz_gemustert_Office-Lager-Freizeit",  folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_blau_schwarz_gemustert_Office",                 folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_blau_weiss_gepunktet_Lager-Freizeit",           folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_dunkelorange_Lager-Freizeit",                   folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_gemustert_Joop_Freizeit",                       folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_gemustert_orientalisch_Freizeit",               folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_grau_schwarz_Lager-Freizeit",                   folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_grossgemustert_Freizeit",                       folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_hellgrau_Lager-Freizeit",                       folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_Leinen_Boss_petrol_Freizeit",                   folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_Leinen_hellrot_Office-Freizeit",                folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_Leinen_rosaweissgestreift_Office-Freizeit",     folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_petrolschwarz_gemustert_Lager-Freizeit",        folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_rotblau_kariert_Lager-Freizeit",                folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_kurzarm_rot_schwarz_gemustert_Office",                  folder:"Hemden", cat:"Oberteil" },
  // HEMDEN – Langarm
  { name:"Hemd_langarm_Baumwolle_blauschwarz_Office-Freizeit",         folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_beigeweissschwarz_gestreift_Freizeit",          folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Blatt_gemustert_Office-Freizeit",               folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_blauschwarz_gestreift_Office-Freizeit",         folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_blau_edel_Office-Freizeit",                     folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_blau_gemustert_Office-Freizeit",                folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_blau_Office-Freizeit",                          folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_blau_weiss_gestreift_Office-Freizeit",          folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Cord_ocker_Lager",                              folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Denim_dunkelblau_Lager-Freizeit",               folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_dunkelblau_Office-Freizeit",                    folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_dunkelbraun_Olymp_Office-Freizeit",             folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_farbige_Karos_Office-Freizeit",                 folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_farbig_gestreift_Office-Freizeit",              folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Flanell_gruengrau_Lager",                       folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_florales_Muster_Office-Freizeit",               folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_grau_Office-Freizeit",                          folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_gruenblau_Office-Freizeit",                     folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_hellblau_Office-Freizeit",                      folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_jeansblau_Lager",                               folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Joop_grau_gemustert_Office-Freizeit",           folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_kariert_orangebeige_Lager",                     folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_kariert_Print_Office-Lager-Freizeit",           folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Leinen_hellrot_Office-Freizeit",                folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Leinen_tuerkis_Office-Freizeit",                folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_langarm_Olymp_blau_schwarz_Microprint_Office-Freizeit", folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_Overshirt_grau_Lager-Freizeit",                         folder:"Hemden", cat:"Oberteil" },
  { name:"Hemd_Poloshirt_orange_gemustert_Freizeit",                   folder:"Hemden", cat:"Oberteil" },
  // JACKEN
  { name:"Jacke_Blouson_blau_Membran_Office-Lager-Freizeit",        folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Blouson_sand_Gore-Tex_Office-Lager-Freizeit",       folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Blouson_sand_Membran_Office-Lager-Freizeit",        folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_BossBlouson_schwarz_Gore-Tex_Office-Lager-Freizeit",folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_FieldjacketStrellson_sand_Baumwolle_Office-Lager-Freizeit", folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Fieljacket_sand_Leinen_Office-Lager-Freizeit",      folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_gestreift_sandgrau_Baumwolle_Office-Lager-Freizeit",folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Overshirt_braun_Baumwolle_Office-Lager-Freizeit",   folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Overshirt_gelbschwarz_Membran_Lager-Freizeit",      folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Regenjacke_dunkelbraun_Gore-Tex_Office-Lager-Freizeit", folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Softshell_graugelb_Gore-Tex_Lager-Freizeit",        folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Softshell_rot_Gore-Tex_Freizeit",                   folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Softshell_schwarz_Gore-Tex_Lager-Freizeit",         folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Steppweste_dunkelblau_Office-Lager-Freizeit",       folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Steppweste_gelbschwarz_Membran_Lager-Freizeit",     folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Steppweste_ocker_Membran_Office-Lager-Freizeit",    folder:"Jacken", cat:"Jacke" },
  { name:"Jacke_Winter_blau_Membran_Office-Lager-Freizeit",         folder:"Jacken", cat:"Jacke" },
  // PULLOVER
  { name:"Kapuzenhoodie_PME_Lager-Freizeit",                        folder:"Pullover", cat:"Oberteil" },
  { name:"Pullover_hellblau_Office-Freizeit",                       folder:"Pullover", cat:"Oberteil" },
  { name:"Sweatshirt_dunkelblau_Lager-Freizeit",                    folder:"Pullover", cat:"Oberteil" },
  { name:"Sweatshirt_dunkelblau_Office-Freizeit",                   folder:"Pullover", cat:"Oberteil" },
  { name:"Sweatshirt_Rugby_gestreift_Lager-Freizeit",               folder:"Pullover", cat:"Oberteil" },
  { name:"Sweatshirt_Rugby_Lager-Freizeit",                         folder:"Pullover", cat:"Oberteil" },
  // SCHUHE
  { name:"Schuhe_cognacfarben_Office-Freizeit",                     folder:"Schuhe", cat:"Schuhe" },
  { name:"Schuhe_Derby_Brogues_schwarz_Office-Freizeit",            folder:"Schuhe", cat:"Schuhe" },
  { name:"Schuhe_Ledersneaker_braun_Geox_Office-Freizeit",          folder:"Schuhe", cat:"Schuhe" },
  { name:"Schuhe_Sneaker_grau_Geox_Office-Freizeit",                folder:"Schuhe", cat:"Schuhe" },
  { name:"Schuhe_Sneaker_ocker_Office-Lager-Freizeit",              folder:"Schuhe", cat:"Schuhe" },
  { name:"Schuhe_Sneaker_schwarz_Office-Freizeit",                  folder:"Schuhe", cat:"Schuhe" },
  { name:"Schuhe_Winter_Wandern_farbig_Freizeit",                   folder:"Schuhe", cat:"Schuhe" },
  { name:"Schuhe_Workwear_camel_Lager-Freizeit",                    folder:"Schuhe", cat:"Schuhe" },
  // WESTEN
  { name:"Weste_braun_Office-Lager-Freizeit",                       folder:"Weste", cat:"Weste" },
  { name:"Weste_dunkelblau_Office-Freizeit",                        folder:"Weste", cat:"Weste" },
  { name:"Weste_graugemustert_Office-Freizeit",                     folder:"Weste", cat:"Weste" },
  { name:"Weste_sandgrau_Office-Lager-Freizeit",                    folder:"Weste", cat:"Weste" },
  // HOSEN
  { name:"Hose_Baumwolle_dunkelbraun_Freizeit",              folder:"Hosen", cat:"Hose" },
  { name:"Hose_Cargo_gemustert_PME_Lager-Freizeit",          folder:"Hosen", cat:"Hose" },
  { name:"Hose_Cargo_olive_Lager-Freizeit",                  folder:"Hosen", cat:"Hose" },
  { name:"Hose_Cargo_oliv_PME_Lager-Freizeit",               folder:"Hosen", cat:"Hose" },
  { name:"Hose_Cargo_sand_PME_Lager-Freizeit",               folder:"Hosen", cat:"Hose" },
  { name:"Hose_Cargo_schwarzgrau_Lager-Freizeit",            folder:"Hosen", cat:"Hose" },
  { name:"Hose_Cargo_schwarz_Lager-Freizeit",                folder:"Hosen", cat:"Hose" },
  { name:"Hose_Chino_Alberto_grau_Office-Freizeit",          folder:"Hosen", cat:"Hose" },
  { name:"Hose_Chino_blau_feingemustert_Office-Freizeit",    folder:"Hosen", cat:"Hose" },
  { name:"Hose_Chino_feinkariert_hellgrau_Office-Freizeit",  folder:"Hosen", cat:"Hose" },
  { name:"Hose_Chino_hellbraun_leicht_Freizeit",             folder:"Hosen", cat:"Hose" },
  { name:"Hose_Jeans_blau_leicht_Office-Freizeit",           folder:"Hosen", cat:"Hose" },
  { name:"Hose_Jeans_dunkelblau_Office-Freizeit",            folder:"Hosen", cat:"Hose" },
  { name:"Hose_Jeans_leicht_hellblau_Office-Freizeit",       folder:"Hosen", cat:"Hose" },
  { name:"Hose_Jeans_schwarz_Office-Freizeit",               folder:"Hosen", cat:"Hose" },
  { name:"Hose_Leinen_blau_Freizeit",                        folder:"Hosen", cat:"Hose" },
  { name:"Hose_Leinen_grau_Freizeit",                        folder:"Hosen", cat:"Hose" },
  { name:"Hose_Leinen_schwarzgrau_Freizeit",                 folder:"Hosen", cat:"Hose" },
  { name:"Hose_ocker_leicht_Freizeit",                       folder:"Hosen", cat:"Hose" },
  { name:"Hose_sand_Freizeit",                               folder:"Hosen", cat:"Hose" },
  { name:"Hose_sand_gestreift_Office-Freizeit",              folder:"Hosen", cat:"Hose" },
];

// Bildpfad aus Eintrag ableiten
function imgPath(item) {
  return `${BASE_PATH}/${item.folder}/${item.name}.jpg`;
}

// Kontext-Filter: letztes Segment des Namens enthält "Office" oder "Lager"
function matchesContext(item, type) {
  const lastSeg = item.name.split("_").pop();
  return lastSeg.includes(type) || (lastSeg.includes("Office") && lastSeg.includes("Lager"));
}

// ── Wetter-Übersetzungen ──────────────────────────────────────────────────────
const WEATHER_DE = {
  "Sunny":"Sonnig","Clear":"Klar","Partly cloudy":"Teils bewölkt","Cloudy":"Bewölkt",
  "Overcast":"Bedeckt","Mist":"Neblig","Fog":"Nebel","Freezing fog":"Gefrierender Nebel",
  "Patchy rain possible":"Vereinzelt Regen möglich","Patchy rain nearby":"Vereinzelt Regen in der Nähe",
  "Patchy snow possible":"Vereinzelt Schnee möglich","Thundery outbreaks possible":"Gewitter möglich",
  "Light drizzle":"Leichter Nieselregen","Light rain":"Leichter Regen","Moderate rain":"Mäßiger Regen",
  "Heavy rain":"Starker Regen","Light snow":"Leichter Schneefall","Heavy snow":"Starker Schneefall",
  "Light rain shower":"Leichter Regenschauer","Moderate or heavy rain shower":"Mäßiger bis starker Regenschauer",
  "Torrential rain shower":"Starker Regenguss","Light showers of ice pellets":"Leichte Eiskörnerschauer",
  "Patchy light rain with thunder":"Vereinzelt leichter Regen mit Donner",
  "Moderate or heavy rain with thunder":"Mäßiger bis starker Regen mit Donner",
  "Light rain at times":"Zeitweise leichter Regen","Moderate rain at times":"Zeitweise mäßiger Regen",
  "Blizzard":"Schneesturm","Blowing snow":"Schneetreiben",
};
const translateWeather = d => WEATHER_DE[d] || d;

// ── Styles ────────────────────────────────────────────────────────────────────
const style = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #1a1208; min-height: 100vh; font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; }

  .app {
    min-height: 100vh;
    background: linear-gradient(160deg, #1a1208 0%, #2d1f0e 40%, #1a1208 100%);
    color: #e8d5b0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 2rem 1.5rem; position: relative; overflow: hidden;
  }
  .app::before {
    content:''; position:absolute; top:-50%; left:-50%; width:200%; height:200%;
    background: radial-gradient(ellipse at 60% 30%, rgba(212,160,60,0.08) 0%, transparent 60%);
    pointer-events:none;
  }

  .card {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(212,160,60,0.2);
    border-radius: 4px; padding: 2rem 2.5rem 3rem;
    max-width: 960px; width: 100%; position: relative; backdrop-filter: blur(10px);
  }
  .card::before {
    content:''; position:absolute; top:0; left:2rem; right:2rem; height:1px;
    background: linear-gradient(90deg, transparent, rgba(212,160,60,0.6), transparent);
  }
  @media (max-width:600px) { .card { padding: 1.5rem 1.25rem 2rem; } }

  .time-display {
    font-size: 7rem; font-weight: 200; letter-spacing: -3px; color: #d4a03c;
    line-height: 1; margin-bottom: 0.5rem;
    font-variant-numeric: tabular-nums; font-variant-ligatures: none;
  }
  @media (max-width:600px) { .time-display { font-size: 5rem; } }

  .date-display {
    font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(232,213,176,0.5); margin-bottom: 2rem;
  }

  .section-title { font-size: 1.5rem; font-weight: 300; color: #e8d5b0; margin-bottom: 1.5rem; line-height: 1.3; font-variant-ligatures: none; }

  .weather-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-bottom: 1rem; }
  .weather-block {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    text-align: center; gap: 0.3rem;
    background: rgba(212,160,60,0.06); border: 1px solid rgba(212,160,60,0.15);
    border-radius: 3px; padding: 1rem 0.75rem;
  }
  .weather-temp { font-size: 2.5rem; font-weight: 200; color: #d4a03c; line-height: 1; font-variant-ligatures: none; }
  .weather-info { width: 100%; }
  .weather-location { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,213,176,0.4); margin-bottom: 0.3rem; }
  .weather-desc { font-size: 0.8rem; color: #e8d5b0; margin-bottom: 0.15rem; }
  .weather-feels { font-size: 0.72rem; color: rgba(232,213,176,0.45); }

  .umbrella-warning {
    display: flex; align-items: center; gap: 0.75rem;
    background: rgba(30,100,200,0.1); border: 1px solid rgba(80,150,255,0.3);
    border-radius: 3px; padding: 0.85rem 1rem; margin-bottom: 1.25rem;
    animation: pulse-border 2s ease-in-out infinite;
  }
  @keyframes pulse-border { 0%,100% { border-color: rgba(80,150,255,0.3); } 50% { border-color: rgba(80,150,255,0.7); } }
  .umbrella-icon { font-size: 1.8rem; flex-shrink: 0; }
  .umbrella-text { flex: 1; }
  .umbrella-title { font-size: 1rem; font-weight: 500; color: #90c4ff; margin-bottom: 0.2rem; }
  .umbrella-sub { font-size: 0.75rem; color: rgba(144,196,255,0.65); line-height: 1.4; }

  .choice-label { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(232,213,176,0.45); margin-bottom: 1rem; }
  .choice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .choice-btn {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(212,160,60,0.2);
    border-radius: 3px; padding: 1.5rem 1.25rem; cursor: pointer; color: #e8d5b0;
    font-family: 'Segoe UI', system-ui, sans-serif; transition: all 0.2s; text-align: left;
  }
  .choice-btn:hover { background: rgba(212,160,60,0.1); border-color: rgba(212,160,60,0.5); }
  .choice-btn .btn-title { font-size: 1.4rem; font-weight: 700; display: block; margin-bottom: 0.5rem; color: #d4a03c; letter-spacing: 0.12em; font-variant-ligatures: none; }
  .choice-btn .btn-desc { font-size: 0.78rem; color: rgba(232,213,176,0.5); line-height: 1.4; }

  .loading-state { text-align: center; padding: 3rem 0; }
  .loading-spinner {
    width: 44px; height: 44px; border: 1px solid rgba(212,160,60,0.2); border-top-color: #d4a03c;
    border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1.5rem;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .loading-text { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(232,213,176,0.5); }

  .context-badge {
    display: inline-block; font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(212,160,60,0.7); border: 1px solid rgba(212,160,60,0.2);
    border-radius: 2px; padding: 0.25rem 0.6rem; margin-bottom: 1rem;
  }
  .outfit-greeting { font-size: 1.4rem; font-weight: 300; color: #d4a03c; margin-bottom: 0.75rem; line-height: 1.4; font-variant-ligatures: none; }
  .outfit-desc { font-size: 0.9rem; color: rgba(232,213,176,0.7); line-height: 1.7; margin-bottom: 1.75rem; padding-bottom: 1.75rem; border-bottom: 1px solid rgba(212,160,60,0.1); }

  .items-label { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(232,213,176,0.4); margin-bottom: 1rem; text-align: center; }

  .items-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1.75rem; }
  @media (min-width: 1100px) { .items-grid { grid-template-columns: repeat(4, 1fr); } }
  @media (max-width: 500px)  { .items-grid { grid-template-columns: repeat(2, 1fr); } }

  .item-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(212,160,60,0.12);
    border-radius: 3px; overflow: hidden; transition: border-color 0.2s, transform 0.15s; cursor: pointer;
  }
  .item-card:hover { border-color: rgba(212,160,60,0.5); transform: scale(1.02); }
  .item-img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; background: rgba(212,160,60,0.05); }
  .item-img-placeholder { width: 100%; aspect-ratio: 3/4; display: flex; align-items: center; justify-content: center; background: rgba(212,160,60,0.05); font-size: 2.5rem; }
  .item-label { padding: 0.5rem 0.6rem 0.2rem; font-size: 0.7rem; color: rgba(232,213,176,0.5); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .item-cat { font-size: 0.65rem; color: rgba(212,160,60,0.6); padding: 0 0.6rem 0.5rem; text-transform: uppercase; letter-spacing: 0.08em; }

  .divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(212,160,60,0.15), transparent); margin: 1.5rem 0; }

  .reset-btn {
    width: 100%; background: transparent; border: 1px solid rgba(212,160,60,0.2); border-radius: 3px;
    padding: 0.9rem; color: rgba(232,213,176,0.5); font-family: 'Segoe UI', system-ui, sans-serif;
    font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s;
  }
  .reset-btn:hover { border-color: rgba(212,160,60,0.4); color: #e8d5b0; }

  .error-msg { font-size: 0.82rem; color: rgba(220,100,80,0.8); background: rgba(220,100,80,0.06); border: 1px solid rgba(220,100,80,0.15); border-radius: 3px; padding: 1rem; margin-bottom: 1rem; line-height: 1.5; }

  .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.92); display: flex; align-items: center; justify-content: center; z-index: 1000; cursor: zoom-out; padding: 2rem; }
  .lightbox img { max-width: 90vw; max-height: 90vh; object-fit: contain; border-radius: 4px; box-shadow: 0 0 60px rgba(212,160,60,0.15); }
  .lightbox-close { position: fixed; top: 1.5rem; right: 1.5rem; font-size: 2rem; color: rgba(232,213,176,0.7); cursor: pointer; background: none; border: none; line-height: 1; }
  .lightbox-name { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); font-size: 0.8rem; letter-spacing: 0.1em; color: rgba(232,213,176,0.5); text-transform: uppercase; }
`;

// ── Clock ─────────────────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const h = String(time.getHours()).padStart(2,"0");
  const m = String(time.getMinutes()).padStart(2,"0");
  const days   = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];
  const months = ["Jan","Feb","Mär","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"];
  return (
    <div>
      <div className="time-display">{h}:{m}</div>
      <div className="date-display">{days[time.getDay()]}, {time.getDate()}. {months[time.getMonth()]} {time.getFullYear()}</div>
    </div>
  );
}

const CAT_LABEL = { Oberteil:"OBERTEIL", Hose:"HOSE", Jacke:"JACKE", Weste:"WESTE", Schuhe:"SCHUHE", Accessoire:"ACCESSOIRE" };

function catFromName(name) {
  const f = name.split("_")[0].toLowerCase();
  if (["hemd","pullover","sweatshirt","kapuzenhoodie","woolover"].includes(f)) return "Oberteil";
  if (["hose","chino","jeans","cargo","leinen"].includes(f)) return "Hose";
  if (f === "jacke") return "Jacke";
  if (f === "weste") return "Weste";
  if (f === "schuhe") return "Schuhe";
  if (["guertel","gürtel","schal","muetze"].includes(f)) return "Accessoire";
  // Fallback: Name enthält bekannte Kategorie-Wörter
  const n = name.toLowerCase();
  if (n.includes("hose") || n.includes("chino") || n.includes("jeans") || n.includes("cargo")) return "Hose";
  if (n.includes("hemd") || n.includes("shirt") || n.includes("pullover")) return "Oberteil";
  if (n.includes("jacke")) return "Jacke";
  if (n.includes("schuhe")) return "Schuhe";
  return "Accessoire";
}

// ── Hauptkomponente ───────────────────────────────────────────────────────────
export default function App() {
  const [step,        setStep]        = useState("loading_weather");
  const [weatherHome, setWeatherHome] = useState(null);
  const [weatherWork, setWeatherWork] = useState(null);
  const [officeType,  setOfficeType]  = useState(null);
  const [outfit,      setOutfit]      = useState(null);
  const [error,       setError]       = useState(null);
  const [lightbox,    setLightbox]    = useState(null);

  useEffect(() => { fetchWeather(); }, []);

  async function fetchOneWeather(city) {
    try {
      const res  = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
      const data = await res.json();
      const c    = data.current_condition[0];
      const hourly  = data.weather?.[0]?.hourly || [];
      const now     = new Date().getHours();
      const upcoming = hourly.filter(h => parseInt(h.time)/100 >= now).slice(0,3);
      const maxRain  = upcoming.length ? Math.max(...upcoming.map(h => parseInt(h.chanceofrain||0))) : parseInt(c.precipMM>0?70:10);
      return { temp: c.temp_C, desc: translateWeather(c.weatherDesc[0].value), feels: c.FeelsLikeC, rain: maxRain };
    } catch { return { temp:"--", desc:"Nicht verfügbar", feels:"--", rain:0 }; }
  }

  async function fetchWeather() {
    const [home, work] = await Promise.all([fetchOneWeather(HOME_CITY), fetchOneWeather(WORK_CITY)]);
    setWeatherHome(home); setWeatherWork(work); setStep("context");
  }

  async function suggestOutfit(type) {
    setOfficeType(type); setStep("loading_outfit");

    const weatherDesc = weatherHome && weatherWork
      ? `Zuhause (Boebingen): ${weatherHome.temp}°C, ${weatherHome.desc}, gefühlt ${weatherHome.feels}°C. Arbeit (Oberkochen): ${weatherWork.temp}°C, ${weatherWork.desc}, gefühlt ${weatherWork.feels}°C, Regenwahrscheinlichkeit ${weatherWork.rain}%`
      : "Wetter unbekannt";

    const contextDesc = type === "Office"
      ? "Büro – schick und professionell (Langarmhemd, gute Schuhe, Blazer wenn vorhanden)"
      : "Halle 8 – praktisch und robust (bequeme Hosen, Sweatshirt oder Kurzarmhemd, Sneaker)";

    const rainChance = weatherWork?.rain || 0;
    const rainRule   = rainChance > 60
      ? `REGEN-REGEL (${rainChance}% Regen – AKTIV): Wähle NUR Jacken mit Membran, Gore-Tex oder Softshell im Namen. Jacken mit Baumwolle oder Leinen sind VERBOTEN.`
      : `REGEN-REGEL (${rainChance}% – trocken): Alle Jacken erlaubt. Regenjacken nur wenn stilpassend.`;

    // Kleidung nach Kontext filtern
    const filtered = WARDROBE.filter(item => matchesContext(item, type));
    const fileList  = filtered.map(f => `${f.name} [${f.cat}]`).join("\n");

    // Lookup-Map: Name → WARDROBE-Eintrag
    const byName = {};
    filtered.forEach(f => { byName[f.name] = f; });

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY || "",
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 1000,
          system: `Du bist Bernds persönlicher Morgen-Stylist mit Humor. Es ist früh morgens, Bernd steht im Ankleidezimmer.

PFLICHT (genau je 1): Oberteil, Hose, Schuhe
OPTIONAL (max je 1): Jacke, Weste, Accessoire
VERBOTEN: 2x Jacke, 0x Hose

${rainRule}

WICHTIG: Verwende AUSSCHLIESSLICH die exakten Namen aus der Liste. Kopiere sie 1:1.

Für "greeting": Ein witziger, persönlicher Morgengruß für Bernd – bezogen auf das Wetter.
Beispiele:
- Bei Regen: "Hey Bernd, heute regnet's wie aus Eimern – gut dass du keine Katze bist!"
- Bei Wind: "Morgen Bernd! Heute bläst es – halt die Hose fest!"
- Bei Kälte: "Guten Morgen Bernd, draußen friert sich der Postbote einen ab!"
- Bei Sonnenschein: "Bernd! Die Sonne lacht – heute wird ein guter Tag!"
Maximal 2 Sätze, locker und humorvoll, kein Outfit beschreiben.

Für "outfit_description": Leer lassen – einfach "" zurückgeben.

Antworte NUR mit diesem JSON (keine Backticks):
{"greeting":"witziger Morgengruss","outfit_description":"","items":[{"name":"EXAKTER_NAME_AUS_LISTE"}]}`,
          messages: [{ role: "user", content: `Wetter: ${weatherDesc}\nKontext: ${contextDesc}\n\nVerfügbare Kleidung:\n${fileList}` }]
        })
      });

      const data = await res.json();
      if (!data.content?.length) throw new Error(data.error?.message || "Keine Antwort");

      const rawText  = data.content.filter(b => b.type==="text").pop()?.text || "";
      const jsonMatch = rawText.replace(/```json|```/g,"").trim().match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Ungültiges Antwortformat");
      const parsed = JSON.parse(jsonMatch[0]);

      // Items anreichern: WARDROBE-Eintrag nachschlagen, Kategorie und Bildpfad setzen
      const NASS = ["baumwolle","leinen"];
      const seen = {};
      const uniqueCats = ["jacke","hose","oberteil","schuhe","weste"];

      let items = (parsed.items || [])
        .map(item => {
          // Claude ersetzt manchmal Bindestriche durch Leerzeichen – normalisieren
          const normalizedName = item.name.replace(/ /g, "-");
          const entry = byName[normalizedName] || byName[item.name];
          if (!entry) {
            console.warn("⚠️ Unbekannter Name:", JSON.stringify(item.name));
            const prefix = normalizedName.toLowerCase().split("_").slice(0,3).join("_");
            const fuzzy  = filtered.find(f => f.name.toLowerCase().startsWith(prefix));
            if (fuzzy) return { name: fuzzy.name, cat: fuzzy.cat, img: imgPath(fuzzy) };
            return null;
          }
          return { name: entry.name, cat: entry.cat, img: imgPath(entry) };
        })
        .filter(Boolean)
        .filter(item => {
          // Regen: Baumwoll-/Leinen-Jacken raus
          if (rainChance > 60 && item.cat === "Jacke") {
            if (NASS.some(m => item.name.toLowerCase().includes(m))) return false;
          }
          // Duplikate raus
          const key = uniqueCats.find(c => item.cat.toLowerCase() === c);
          if (key) { if (seen[key]) return false; seen[key] = true; }
          return true;
        });

      // Hose fehlt? Erste verfügbare Hose ergänzen
      if (!items.some(i => i.cat === "Hose")) {
        const hoseEntry = filtered.find(f => f.cat === "Hose");
        if (hoseEntry) items.splice(1, 0, { name: hoseEntry.name, cat: "Hose", img: imgPath(hoseEntry) });
      }

      setOutfit({ greeting: parsed.greeting, outfit_description: parsed.outfit_description, items });
      setStep("result");
    } catch(e) { setError(e.message); setStep("error"); }
  }

  function reset() { setStep("context"); setOfficeType(null); setOutfit(null); setError(null); }

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h>=5  && h<11) return "Guten Morgen.";
    if (h>=11 && h<14) return "Guten Mittag.";
    if (h>=14 && h<18) return "Guten Nachmittag.";
    if (h>=18 && h<22) return "Guten Abend.";
    return "Noch so spät?";
  };

  return (
    <>
      <style>{style}</style>
      <div className="app">
        <div className="card">
          <Clock />

          {/* WETTER + AUSWAHL */}
          {step === "context" && (
            <>
              <div className="weather-row">
                <div className="weather-block home">
                  <div className="weather-temp">{weatherHome?.temp}°</div>
                  <div className="weather-info">
                    <div className="weather-location">Zuhause</div>
                    <div className="weather-desc">{weatherHome?.desc}</div>
                    <div className="weather-feels">Gefühlt {weatherHome?.feels}°</div>
                  </div>
                </div>
                <div className="weather-block work">
                  <div className="weather-temp">{weatherWork?.temp}°</div>
                  <div className="weather-info">
                    <div className="weather-location">Oberkochen</div>
                    <div className="weather-desc">{weatherWork?.desc}</div>
                    <div className="weather-feels">Gefühlt {weatherWork?.feels}°</div>
                  </div>
                </div>
              </div>

              {weatherWork?.rain > 80 && (
                <div className="umbrella-warning">
                  <div className="umbrella-icon">☂️</div>
                  <div className="umbrella-text">
                    <div className="umbrella-title">Regenschirm nicht vergessen!</div>
                    <div className="umbrella-sub">Regenwahrscheinlichkeit in Oberkochen: {weatherWork.rain}% — Parkhaus → Büro wird nass.</div>
                  </div>
                </div>
              )}

              <div className="section-title">{getGreeting()}<br/>Wo arbeitest du heute?</div>
              <div className="choice-label">Arbeitsort wählen</div>
              <div className="choice-grid">
                <button className="choice-btn" onClick={() => suggestOutfit("Office")}>
                  <span className="btn-title">BÜRO</span>
                  <span className="btn-desc">Schick, professionell, langes Hemd</span>
                </button>
                <button className="choice-btn" onClick={() => suggestOutfit("Lager")}>
                  <span className="btn-title">HALLE&nbsp;8</span>
                  <span className="btn-desc">Kernig, praktisch, robust</span>
                </button>
              </div>
            </>
          )}

          {step === "loading_weather" && (
            <div className="loading-state"><div className="loading-spinner"/><div className="loading-text">Wetter wird geladen…</div></div>
          )}
          {step === "loading_outfit" && (
            <div className="loading-state"><div className="loading-spinner"/><div className="loading-text">Dein Kleiderschrank wird durchsucht…</div></div>
          )}

          {/* ERGEBNIS */}
          {step === "result" && outfit && (
            <>
              <div className="context-badge">{officeType === "Office" ? "✦ Büro" : "✦ Halle 8"}</div>
              <div className="outfit-greeting">{outfit.greeting}</div>
              {outfit.outfit_description && <div className="outfit-desc">{outfit.outfit_description}</div>}

              {outfit.items?.length > 0 && (
                <>
                  <div className="items-label">Outfit des Tages</div>
                  <div className="items-grid">
                    {outfit.items.map((item, i) => {
                      const displayCat = catFromName(item.name);
                      const emoji = {Oberteil:"👔",Hose:"👖",Jacke:"🧥",Weste:"🦺",Schuhe:"👞",Accessoire:"⌚"}[displayCat] || "👕";
                      return (
                        <div key={i} className="item-card" onClick={() => item.img && setLightbox({url: item.img, name: item.name})}>
                          {item.img
                            ? <img className="item-img" src={item.img} alt={item.name} onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }} />
                            : null
                          }
                          <div className="item-img-placeholder" style={{display: item.img ? "none" : "flex"}}>
                            {emoji}
                          </div>
                          <div className="item-label" title={item.name}>{item.name}</div>
                          <div className="item-cat">{CAT_LABEL[displayCat] || displayCat}</div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}

              <div className="divider"/>
              {weatherWork?.rain > 80 && (
                <div className="umbrella-warning" style={{marginBottom:"1rem"}}>
                  <div className="umbrella-icon">☂️</div>
                  <div className="umbrella-text">
                    <div className="umbrella-title">Regenschirm einpacken!</div>
                    <div className="umbrella-sub">Regen in Oberkochen: {weatherWork.rain}%</div>
                  </div>
                </div>
              )}
              <button className="reset-btn" onClick={reset}>↺ Anderen Kontext wählen</button>
            </>
          )}

          {step === "error" && (
            <>
              <div className="error-msg"><strong>Fehler:</strong><br/>{error}</div>
              <button className="reset-btn" onClick={reset}>↺ Erneut versuchen</button>
            </>
          )}
        </div>
      </div>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <img src={lightbox.url} alt={lightbox.name}/>
          <div className="lightbox-name">{lightbox.name}</div>
        </div>
      )}
    </>
  );
}
