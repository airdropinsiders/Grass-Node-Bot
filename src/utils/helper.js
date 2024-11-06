import moment from "moment-timezone";
import { Bless } from "./bless.js";

export class Helper {
  static myCode = "9730e76e-b983-41c0-b583-69fddfd3b714";
  static myCode2 = "waputra";
  static log = new Bless();
  static spinnerContent = (data) => `
Email        : ${data.email}
User Id      : ${data.id}
Points       : ${data.point}
Device Id    : ${data.device}
IP           : ${data.ip} (${data.ipScore}%)

Status : ${data.msg}
Delay : ${data.delay}
`;
  static delay = (ms, acc, msg, obj) => {
    return new Promise(async (resolve) => {
      let remainingMilliseconds = ms;

      if (acc != undefined) {
        await this.log.log(msg, acc, obj, `Delaying for ${this.msToTime(ms)}`);
      } else {
        await this.log.info(`Delaying for ${this.msToTime(ms)}`);
      }

      const interval = setInterval(async () => {
        remainingMilliseconds -= 1000;
        if (acc != undefined) {
          await this.log.log(
            msg,
            acc,
            obj,
            `Delaying for ${this.msToTime(remainingMilliseconds)}`
          );
        } else {
          await this.log.info(
            `Delaying for ${this.msToTime(remainingMilliseconds)}`
          );
        }

        if (remainingMilliseconds <= 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);

      setTimeout(async () => {
        clearInterval(interval);

        await this.log.clearInfo();

        if (acc) {
          await this.log.log(msg, acc, obj);
        }
        resolve();
      }, ms);
    });
  };

  static randomUserAgent() {
    const list_useragent = [
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15",
      "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104",
      "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104",
      "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374",
      "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374",
    ];
    return list_useragent[Math.floor(Math.random() * list_useragent.length)];
  }

  static readTime(milliseconds) {
    const date = moment.unix(milliseconds);
    return date.format("YYYY-MM-DD HH:mm:ss");
  }

  static getCurrentTimestamp() {
    const timestamp = moment().tz("Asia/Singapore").unix();
    return timestamp.toString();
  }

  static random(min, max) {
    const rand = Math.floor(Math.random() * (max - min + 1)) + min;
    return rand;
  }

  static randomFloat(min, max, fixed = 4) {
    const rand = Math.random() * (max - min) + min;
    return parseFloat(rand.toFixed(fixed));
  }

  static msToTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const remainingMillisecondsAfterHours = milliseconds % (1000 * 60 * 60);
    const minutes = Math.floor(remainingMillisecondsAfterHours / (1000 * 60));
    const remainingMillisecondsAfterMinutes =
      remainingMillisecondsAfterHours % (1000 * 60);
    const seconds = Math.round(remainingMillisecondsAfterMinutes / 1000);

    return `${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
  }

  static generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static serializeBigInt = (obj) => {
    return JSON.parse(
      JSON.stringify(obj, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  };

  static isToday(date) {
    const lastCheckInDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCheckInDateOnly = new Date(lastCheckInDate);
    lastCheckInDateOnly.setHours(0, 0, 0, 0);
    if (lastCheckInDateOnly.getTime() === today.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  static refCheck(currentInviter, currentId) {
    if (currentInviter != this.myCode && !currentId.includes(this.myCode2)) {
      throw Error(
        "Sorry, You cannot use this bot, please join with creator refferal code"
      );
    }
  }

  static showSkelLogo() {
    console.log(`
      █████╗ ██╗██████╗ ██████╗ ██████╗  ██████╗ ██████╗ 
     ██╔══██╗██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
     ███████║██║██████╔╝██║  ██║██████╔╝██║   ██║██████╔╝
     ██╔══██║██║██╔══██╗██║  ██║██╔══██╗██║   ██║██╔═══╝ 
     ██║  ██║██║██║  ██║██████╔╝██║  ██║╚██████╔╝██║     
     ╚═╝  ╚═╝╚═╝╚═╝  ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     
                                                         
     ██╗███╗   ██╗███████╗██╗██████╗ ███████╗██████╗     
     ██║████╗  ██║██╔════╝██║██╔══██╗██╔════╝██╔══██╗    
     ██║██╔██╗ ██║███████╗██║██║  ██║█████╗  ██████╔╝    
     ██║██║╚██╗██║╚════██║██║██║  ██║██╔══╝  ██╔══██╗    
     ██║██║ ╚████║███████║██║██████╔╝███████╗██║  ██║    
     ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝    
     `);
  }
}
