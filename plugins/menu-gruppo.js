import { performance } from 'perf_hooks';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Definizione di __dirname per i moduli ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (message, { conn, usedPrefix, command }) => {
    const userCount = Object.keys(global.db.data.users).length;
    const botName = global.db.data.nomedelbot || 'ChatUnity';

    if (command === 'menu') {
        return await (await import('./menu-principale.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menuadmin') {
        return await (await import('./menu-admin.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menuowner') {
        return await (await import('./menu-owner.js')).default(message, { conn, usedPrefix });
    }
    if (command === 'menusicurezza') {
        return await (await import('./menu-sicurezza.js')).default(message, { conn, usedPrefix });
    }

    const menuText = generateMenuText(usedPrefix, botName, userCount);

    const imagePath = path.join(__dirname, '../menu/onepiece5.jpeg'); 

    await conn.sendMessage(
        message.chat,
        {
            image: { url: imagePath },
            caption: menuText,
            footer: 'Scegli un menu:',
            buttons: [
                { buttonId: `${usedPrefix}menu`, buttonText: { displayText: "🏠 Menu Principale" }, type: 1 },
                { buttonId: `${usedPrefix}menuadmin`, buttonText: { displayText: "🛡️ Menu Admin" }, type: 1 },
                { buttonId: `${usedPrefix}menuowner`, buttonText: { displayText: "👑 Menu Owner" }, type: 1 },
                { buttonId: `${usedPrefix}menusicurezza`, buttonText: { displayText: "🚨 Menu Sicurezza" }, type: 1 },
                { buttonId: `${usedPrefix}menuia`, buttonText: { displayText: "🤖 Menu IA" }, type: 1 }
            ],
            viewOnce: true,
            headerType: 4
        }
    );
};

async function fetchProfilePictureUrl(conn, sender) {
    try {
        return await conn.profilePictureUrl(sender);
    } catch (error) {
        return 'default-profile-picture-url'; // Fallback URL in caso di errore
    }
}

handler.help = ['menugruppo', 'menu', 'menuadmin', 'menuowner', 'menusicurezza'];
handler.tags = ['menugruppo'];
handler.command = /^(gruppo|menugruppo|menugp)$/i;

export default handler;

function generateMenuText(prefix, botName, userCount) {
    return `
╭━〔 *⚡𝑴𝑬𝑵𝑼 𝐆𝐑𝐔𝐏𝐏𝐎⚡* 〕━┈⊷  
┃◈╭━━━━━━━━━━━━━·๏  
┃◈┃• *𝑪𝑶𝑴𝑨𝑵𝑫𝑰 𝐏𝐄𝐑 𝐈 𝐌𝐄𝐌𝐁𝐑𝐈*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭─✦ *MUSICA & AUDIO* ✦═╗  
┃◈┃• 🎵 *.play* (canzone)  
┃◈┃• 🎥 *.playlist*   
┃◈┃• 🎥 *.ytsearch*  
┃◈┃• 🎶 *.shazam* (audio)  
┃◈┃• 🔊 *.tomp3* (video)  
┃◈┃• 🎤 *.lyrics* (artista-titolo)  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ *INFORMAZIONI & UTILITÀ* ✦╗  
┃◈┃• 🌍 *.meteo* (città)  
┃◈┃• 🕒 *.orario* (città)  
┃◈┃• 🌐 *.traduci* (testo)  
┃◈┃• 📊 *.contaparole* (testo)
┃◈┃• 🆔 *.id* (gruppo)
┃◈┃• 💻 *.gitclone* (repo)
┃◈┃• ℹ️ *.info* [@utente]
┃◈┃• 📜 *.regole*
┃◈┃• 📚 *.wikipedia* (argomento)
┃◈┃• 🔍 *.checkscam* (check sito)
┃◈┃• 📜 *.dashboard*  
┃◈┃• 🔍 *.cercaimmagine* 
┃◈┃• ❓ *.script*  
┃◈┃• 🛡️ *.offusca*  
┃◈┃• 📰 *.news*  
┃◈┃• 🗞️ *.notiziario*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ *IMMAGINI & MODIFICA* ✦╗  
┃◈┃• 🛠️ *.sticker* (foto a sticker)  
┃◈┃• 🖼️ *.png* (sticker a foto)  
┃◈┃• 📷 *.hd* (migliora qualità foto)  
┃◈┃• 🖼️ *.rimuovisfondo* (foto)  
┃◈┃• 🔍 *.rivela* (foto nascosta
┃◈┃• 🤕 *.bonk* (meme))  
┃◈┃• 🖼️ *.toimg* (da sticker)  
┃◈┃• 📖 *.leggi* (foto)  
┃◈┃• 🌀 *.blur* (sfoca immagine)  
┃◈┃• 🖼️ *.pinterest* (in arrivo)  
┃◈┃• 🎴 *.hornycard* [@utente]  
┃◈┃• 🧠 *.stupido/a* @  
┃◈┃• 🌀 *.emojimix*  
┃◈┃• 🎯 *.wanted*  @
┃◈┃• 🤡 *.scherzo*  @
┃◈┃• 📱 *.nokia*  @
┃◈┃• 🚔 *.carcere*  @
┃◈┃• 📢 *.ads*  @
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈ 
┃◈╭✦ *POKEMON* ✦╗     
┃◈┃• 🥚 *.apripokemon*
┃◈┃• 🛒 *.buypokemon*
┃◈┃• 🏆 *.classificapokemon*
┃◈┃• 🎁 *.pacchetti*
┃◈┃• ⚔️ *.combatti*
┃◈┃• 🔄 *.evolvi*
┃◈┃• 🌑 *.darknessinfo*
┃◈┃• 🎒 *.inventario*
┃◈┃• 🍀 *.pity*
┃◈┃• 🔄 *.scambia*
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭─✦ *GANG SYSTEM* ✦═╗  
┃◈┃• 🥷🏻 *.creagang*  
┃◈┃• 🔪 *.infogang*  
┃◈┃• ⛓ *.abbandonagang*  
┃◈┃• 🩸 *.invitogang* @  
┃◈┃• 🎧 *.caccialogang* @  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭─✦ *GIOCHI & CASINÒ* ✦╗  
┃◈┃• 🎮 *.tris*  
┃◈┃• 🎲 *.dado*  
┃◈┃• 🎰 *.slot*  
┃◈┃• 🃏 *.casinò*  
┃◈┃• 💰 *.scommessa* (quantità)  
┃◈┃• 🔫 *.roulette*  
┃◈┃• 🪙 *.moneta* (testa o croce)  
┃◈┃• 🧮 *.mate* (problema mate)  
┃◈┃• 📈 *.scf* (sasso carta forbici)  
┃◈┃• 🐾 *.pokedex* (info Pokémon)  
┃◈┃• 🏳️ *.bandiera*  
┃◈┃• 🎶 *.ic*  
┃◈┃• 🤖 *.auto*  
┃◈┃• ⚽ *.fut*  
┃◈┃• 🎯 *.missioni*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ *ECONOMIA & CLASSIFICHE* ✦╗  
┃◈┃• 💰 *.portafoglio* (saldo)  
┃◈┃• 🏦 *.banca*   
┃◈┃• 💸 *.daily*  
┃◈┃• 🏆 *.classifica* (top utenti)  
┃◈┃• 💳 *.donauc*   
┃◈┃• 🛒 *.compra* (acquista UC)  
┃◈┃• 🤑 *.ruba* @utente  
┃◈┃• 📤 *.ritira* (UC dalla banca)  
┃◈┃• ⛏️ *.mina* (guadagna XP)  
┃◈┃• 📊 *.xp*  
┃◈┃• ♻️ *.donaxp* @utente  
┃◈┃• 🎯 *.rubaxp* @utente  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ *INTERAZIONI SOCIALI* ✦╗  
┃◈┃• 💍 *.sposami* (proposta)  
┃◈┃• 💔 *.divorzia* (fine relazione)  
┃◈┃• 💌 *.amore* @utente (affinità)  
┃◈┃• 💋 *.bacia* @utente  
┃◈┃• 😡 *.odio* @utente  
┃◈┃• 🗣️ *.rizz* @utente (fascino)  
┃◈┃• 🤫 *.segreto* @utente  
┃◈┃• ☠️ *.minaccia* @utente  
┃◈┃• 🔥 *.zizzania* @utente (crea litigi)  
┃◈┃• 🚫 *.obbligo* (obb o v)  
┃◈┃• 💋 *.ditalino* @  
┃◈┃• 💋 *.sega* @  
┃◈┃• 💋 *.scopa* @  
┃◈┃• 🖕 *.insulta* @  
┃◈┃• 💍 *.sposa* @  
┃◈┃• 👥 *.amicizia/listamici* @  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ *QUANTO È?* ✦╗  
┃◈┃• 🏳‍🌈 *.gay* @  
┃◈┃• 🏳‍🌈 *.lesbica* @  
┃◈┃• ♿ *.ritardato/a* @  
┃◈┃• ♿ *.down* @  
┃◈┃• ♿ *.disabile* @  
┃◈┃• ♿ *.mongoloide* @  
┃◈┃• ⚫ *.negro* @  
┃◈┃• 🐓 *.cornuto* @  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈  
┃◈╭✦ *TEST PERSONALITÀ* ✦╗  
┃◈┃• 🍺 *.alcolizzato*  
┃◈┃• 🌿 *.drogato*  
┃◈┃• 🍑 *.figa*  
┃◈┃• 🍑 *.ano*  
┃◈┃• 🎭 *.personalita*  
┃◈┃• 🔮 *.zodiaco*  
┃◈┃• 🏹 *.nomeninja*  
┃◈┃• 😈 *.infame*  
┃◈┃• 🙏 *.topbestemmie*  
┃◈╰━━━━━━━━━━━━┈⊷  
┃◈ 
┃◈┃• *𝑽𝑬𝑹𝑺𝑰𝑶𝑵𝑬:* ${vs}  
┃◈┃• *𝐂𝐎𝐋𝐋𝐀𝐁: �𝐍𝐄 𝐏𝐈���* 
┃◈┃• *𝐒𝐔𝐏𝐏𝐎𝐑𝐓𝐎:* (.supporto)  
┃◈└──────────┈⊷  
╰━━━━━━━━━━━━━┈⊷  

  `
}
