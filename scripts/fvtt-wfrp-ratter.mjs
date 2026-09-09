import { A as e, C as t, D as n, E as r, G as i, H as a, J as o, K as s, O as c, Q as l, S as u, T as d, U as ee, W as te, Z as ne, _ as re, a as f, b as ie, c as ae, d as p, et as oe, f as m, g as se, h as ce, i as le, it as ue, j as de, k as fe, m as h, nt as pe, o as me, p as g, q as he, r as _, rt as v, s as ge, t as _e, tt as ve, u as ye, v as be, w as xe, x as Se, y as Ce } from "../mutation-drop-BHS5UE2d.js";
//#region src/module/wfrp4e/mutants-handbook/mutation-results.ts
function we(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.type === "mutation" && typeof t.name == "string" && typeof t.toObject == "function" && !!t.system;
}
function Te(e) {
	let t = e.toObject();
	return delete t._id, delete t._key, delete t._stats, delete t.folder, delete t.ownership, t;
}
function Ee(e) {
	return {
		data: {
			effects: [],
			flags: { [v]: {
				patron: "khorne",
				sourceDocument: "The Mutant's Handbook"
			} },
			img: e.img ?? "modules/fvtt-wfrp-ratter/icons/mutations/mutants-handbook-mutation.png",
			name: e.name,
			system: {
				description: { value: e.description },
				gmdescription: { value: "" },
				modifier: { value: "" },
				modifiesSkills: { value: !1 },
				mutationType: { value: "mental" },
				source: { value: "The Mutant's Handbook" }
			},
			type: "mutation"
		},
		name: e.name,
		nature: "mental"
	};
}
async function De(e, t) {
	if (!e.documentUuid) {
		if (t === "khorne" && e.name.trim().toLowerCase() === "prejudice") return Ee(e);
		throw Error(`The table result ${e.name} does not link to a mutation Item.`);
	}
	let n = await fromUuid(e.documentUuid);
	if (!we(n)) throw Error(`The table result ${e.name} does not resolve to a mutation Item.`);
	let r = s(n.system.mutationType.value);
	if (!r) throw Error(`The mutation ${n.name} has no physical or mental classification.`);
	let i = n.getFlag(v, "mutationAutomation")?.acquisition;
	return {
		...i ? { acquisition: i } : {},
		data: Te(n),
		name: n.name,
		nature: r
	};
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/outcomes.ts
function Oe(e) {
	return {
		toughness: Number(e.system.characteristics.t.bonus),
		willpower: Number(e.system.characteristics.wp.bonus)
	};
}
function ke(e, t) {
	return a(t, Oe(e));
}
function Ae(e) {
	return `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
}
async function je(e, t) {
	return Number(e.system.status.resilience.value) > 0 && await ye(e.name, t);
}
async function Me(e, t, n, r = {}) {
	let i = {
		...r,
		"system.status.corruption.value": ee(Number(e.system.status.corruption.value), t)
	};
	n && (i["system.status.resilience.value"] = Math.max(0, Number(e.system.status.resilience.value) - 1)), await de(e, i);
}
async function Ne(e, t) {
	if (!game) throw Error("Foundry game global is unavailable while applying Chosen of Chaos.");
	let r = game.i18n.localize("FVTT_WFRP_RATTER.Mutations.ChosenOutcome");
	if (await je(e, r)) {
		let n = ke(e, t);
		return await Me(e, n, !0), await m(p("Resisted", {
			loss: n,
			mutation: r,
			name: e.name
		})), !0;
	}
	let i = await ge(e.name);
	if (!i) return h(p("PatronRequired", { name: e.name })), !1;
	let a = u(e), o = ke(e, t);
	if (await n(e, i), await Me(e, o, !1), a && (await d(e), await _(e.uuid)), await m(p("Chosen", {
		loss: o,
		name: e.name,
		patron: Ae(i)
	})), a) {
		let t = p("PossessedRemoved", { name: e.name });
		h(t), await m(t);
	}
	return !0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/patron-notes.ts
var Pe = {
	khorne: "Use only Ape/Monkey, Bear, Boar/Pig, Bovine, Canine, or Goat/Sheep.",
	nurgle: "Use only Ape/Monkey, Bear, Boar/Pig, Bovine, Deer/Elk, Goat/Sheep, Horse/Camel, Insect, Pachyderm, or Spider.",
	slaanesh: "Use only Amphibian, Arthropod, Fish, Feline, Lizard/Snake, or Mollusca.",
	tzeentch: "Use only Bat, Bird, Fish, Insect, Mollusca, or Spider."
}, Fe = {
	khorne: "Use only Daemonic, Mechanoid, or Metal.",
	nurgle: "Use only Daemonic, Fenbeast, or Undead.",
	slaanesh: "Use only Daemonic or Metal.",
	tzeentch: "Use only Daemonic or Mechanoid."
}, Ie = {
	khorne: "Use only Destruction, Drugs, or Pain.",
	nurgle: "Use only Devotion, Gluttony, or Service.",
	slaanesh: "Use only Art, Lust, or Pain.",
	tzeentch: "Use only Gambling, Greed, or Theft."
}, Le = {
	khorne: "Use only Leathery Hide, Fur, or Metal.",
	slaanesh: "Use only Rubbery Skin, Scales, or Carapace."
}, Re = /* @__PURE__ */ new Set([
	"bestial arms",
	"bestial body",
	"bestial head",
	"bestial legs",
	"bestial limbs"
]), ze = /* @__PURE__ */ new Set([
	"unnatural arms",
	"unnatural body",
	"unnatural head",
	"unnatural legs",
	"unnatural limbs"
]);
function Be(e, t) {
	let n = t.trim().toLowerCase();
	if (Re.has(n)) return Pe[e];
	if (ze.has(n)) return Fe[e];
	if (n === "addiction") return Ie[e];
	if (n === "mark of chaos") return `The mark is the Mark of ${e.charAt(0).toUpperCase()}${e.slice(1)}.`;
	if (n === "protective skin") return Le[e];
	if (e === "khorne" && n === "prejudice") return "This automation treats Prejudice as mental for Corruption reduction and mutation limits.";
	if (e === "nurgle" && n === "corrupted blood") return "The source attaches a mismatched footnote listing Leathery Hide, Bark, and Carapace; the GM must decide how to handle it.";
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/tables.ts
function Ve(e) {
	return typeof e == "object" && !!e && "draw" in e;
}
async function He(e) {
	let t = game?.packs.get(oe);
	if (!t) throw Error(`The required compendium ${oe} is unavailable.`);
	let n = await t.getDocument(e);
	if (!Ve(n)) throw Error(`The required Mutant's Handbook table ${e} is unavailable.`);
	return n;
}
async function y(e, t, n = !0) {
	let r = (await (await He(e)).draw({
		displayChat: n,
		messageMode: "gm",
		recursive: !0,
		...t ? { roll: new Roll(t) } : {}
	})).results[0];
	if (!r) throw Error(`The Mutant's Handbook table ${e} returned no result.`);
	return r;
}
function Ue(e) {
	return y(pe[e]);
}
function We(e) {
	let t = te(e), n = t > 0 ? `1d100 + ${t}` : "1d100";
	return y(ve, n);
}
function Ge(e, t) {
	return y(ne[t][e], void 0, !1);
}
function Ke(e) {
	return y(l[e], void 0, !1);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/workflow.ts
function qe(e) {
	return `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
}
async function Je(e, t) {
	if (t !== "unassigned") return t;
	let r = await ge(e.name);
	if (!r) {
		h(p("PatronRequired", { name: e.name }));
		return;
	}
	return await n(e, r), r;
}
async function Ye(e, t) {
	let n = await Je(e, t);
	if (!n) return !1;
	let r = await De(await Ke(n), n);
	await Ce(e, r);
	let i = Be(n, r.name);
	return i && await m(p("PatronRestriction", {
		mutation: r.name,
		note: i,
		patron: qe(n)
	})), !0;
}
async function Xe(e) {
	let t = e.system.details.species.value, n = i(t) ?? await ae(e.name, t);
	if (!n) return h(p("SpeciesRequired", { name: e.name })), !1;
	let r = await Ue(n), a = s(r.name);
	if (!a) throw Error(`The nature table returned an unrecognized result: ${r.name}.`);
	let o = await We(Se(e).total), c = he(o.name);
	if (!c) throw Error(`The severity table returned an unrecognized result: ${o.name}.`);
	if (c === "chosen") return Ne(e, a);
	let l = await Ge(a, c);
	if (!l.documentUuid && he(l.name) === "chosen") return Ne(e, a);
	let u = await De(l);
	if (u.nature !== a) throw Error(`${u.name} does not match the rolled ${a} mutation table.`);
	return await Ce(e, u), !0;
}
async function Ze(e) {
	if (fe(e).length > 1) return h(p("PatronConflict", { name: e.name })), !1;
	let t = c(e);
	return t ? Ye(e, t) : Xe(e);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/corruption-chat.ts
var Qe = "mutantsHandbookCorruptionFlow", $e = /* @__PURE__ */ new Set(), et = /* @__PURE__ */ new Map();
function b(e) {
	let t = e.flags?.[v]?.[Qe];
	if (typeof t != "object" || !t) return;
	let n = t;
	if (!(typeof n.actorUuid != "string" || n.status !== "complete" && n.status !== "pending" || n.version !== 1)) return n;
}
async function x(e, t) {
	if (typeof e.setFlag != "function") throw Error("Foundry cannot store the Mutant's Handbook chat-card state.");
	await e.setFlag(v, Qe, t);
}
async function tt(e, t) {
	let n = t.context.messageId, r = n ? game?.messages.get(n) : void 0;
	if (!n || !r) throw Error("The Endurance Test did not create a chat message to continue from.");
	let i = r.system.test?.failed ?? t.failed;
	if (await x(r, {
		actorUuid: e.uuid,
		status: i ? "pending" : "complete",
		version: 1
	}), i) try {
		await be(e, n);
	} catch (e) {
		throw await x(r, null), e;
	}
}
async function nt(e) {
	let t = b(e), n = e.id;
	if (!t || t.status !== "pending" || !n || $e.has(n)) return !1;
	$e.add(n);
	try {
		let r = await fromUuid(t.actorUuid);
		if (!xe(r)) throw Error(`${t.actorUuid} no longer resolves to a WFRP4e character Actor.`);
		let i = se(r);
		if (i?.kind !== "test" || i.messageId !== n) throw Error(`${r.name} is no longer waiting on this Corruption Test.`);
		let a = e.system.test;
		if (!a) throw Error("The Corruption Test chat message no longer contains its WFRP Test data.");
		if (a.failed) {
			if (!await Ze(r)) return !1;
			let e = se(r);
			e?.kind === "test" && e.messageId === n && await ce(r);
		} else await ce(r);
		return await x(e, {
			...t,
			status: "complete"
		}), !0;
	} finally {
		$e.delete(n);
	}
}
async function rt(e) {
	let t = e.system.test?.context.previousMessage;
	if (!t || !e.id) return !1;
	let n = game?.messages.get(t), r = n ? b(n) : void 0;
	if (!n || !r || r.status !== "pending") return !1;
	let i = await fromUuid(r.actorUuid);
	if (!xe(i)) throw Error(`${r.actorUuid} no longer resolves to a WFRP4e character Actor.`);
	let a = e.system.test?.failed;
	if (typeof a != "boolean") return !1;
	await x(e, {
		actorUuid: r.actorUuid,
		status: a ? "pending" : "complete",
		version: 1
	});
	let o = se(i);
	return o?.kind === "test" && o.messageId === t && (a ? await be(i, e.id) : await ce(i)), typeof n.delete == "function" ? await n.delete() : await x(n, null), !0;
}
async function it(e) {
	let t = e.id;
	if (!t) return !1;
	let n = et.get(t);
	if (n) return n;
	let r = rt(e).finally(() => {
		et.delete(t);
	});
	return et.set(t, r), r;
}
function at(e) {
	return game?.user.isGM === !0 || e.isAuthor === !0;
}
function ot(e, t) {
	let n = b(e);
	if (!n || e.system.test?.failed !== !1) return !1;
	if (!t.querySelector("[data-ratter-corruption-result=\"success\"]")) {
		let e = document.createElement("p");
		e.dataset.ratterCorruptionResult = "success", e.textContent = game.i18n.localize("FVTT_WFRP_RATTER.Mutations.CorruptionHeld"), (t.querySelector(".message-content") ?? t).append(e);
	}
	return n.status === "pending" && nt(e).catch(g), !0;
}
function st(e, t) {
	let n = b(e);
	if (ot(e, t) || !n || n.status !== "pending" || e.system.test?.failed !== !0 || !at(e) || t.querySelector("[data-ratter-action=\"continue-corruption\"]")) return;
	let r = document.createElement("button");
	r.type = "button", r.classList.add("chat-button"), r.dataset.ratterAction = "continue-corruption", r.innerHTML = `<i class="fa-solid fa-forward"></i> ${game.i18n.localize("FVTT_WFRP_RATTER.Mutations.ContinueCorruption")}`, r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			await nt(e) || (r.disabled = !1);
		} catch (e) {
			r.disabled = !1, g(e);
		}
	}), (t.querySelector(".message-content") ?? t).append(r);
}
function ct() {
	Hooks.on("createChatMessage", (e) => {
		it(e).catch(g);
	}), Hooks.on("renderChatMessageHTML", (e, t) => {
		if (typeof t != "object" || !t || !(t instanceof HTMLElement)) return;
		let n = e;
		st(n, t), !b(n) && n.system.test?.context.previousMessage && it(n).then(() => st(n, t)).catch(g);
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/check.ts
var S = /* @__PURE__ */ new Set();
async function lt(e) {
	let n = e.system.status.corruption;
	if (!(Number(n.value) <= Number(n.max) || S.has(e.uuid) || re(e) || t(e))) {
		if (!game) throw Error("Foundry game global is unavailable during a corruption check.");
		S.add(e.uuid);
		try {
			let t = game.i18n.localize("NAME.Endurance"), n = {
				fields: { difficulty: "challenging" },
				[o]: !0,
				skipTargets: !0,
				title: game.i18n.format("DIALOG.MutateTitle", { test: t })
			}, r = e.has(t, "skill"), i = r ? await e.setupSkill(r, n) : await e.setupCharacteristic("t", n);
			if (!i) return;
			await i.roll(), await tt(e, i);
		} finally {
			S.delete(e.uuid);
		}
	}
}
async function ut(e) {
	let t = await fromUuid(e);
	if (!xe(t)) throw Error(`${e} does not resolve to a WFRP4e character Actor.`);
	await lt(t);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/documents.ts
function C(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function dt(e) {
	return C(e) ? e : void 0;
}
function ft(e) {
	return C(e) ? e : void 0;
}
function pt(e) {
	return C(e) ? e : void 0;
}
function w(e) {
	return C(e.context) || (e.context = {}), e.context;
}
function mt(e) {
	let t = e.flags?.[v]?.mutationAction;
	return C(t) && typeof t.actionId == "string" ? t.actionId : void 0;
}
function ht(e, t, n) {
	let r = n.context?.mutationActionId, i = n.preData?.options?.mutationActionId, a = n.item;
	return r === t || i === t || a?.id === e.id || a?.uuid !== void 0 && a.uuid === e.uuid;
}
function gt(e) {
	try {
		return e.items ? [...e.items] : [];
	} catch {
		return [];
	}
}
function T(e, t) {
	return (e.itemTypes?.mutation ?? gt(e)).filter((e) => {
		if (e.type !== void 0 && e.type !== "mutation") return !1;
		let n = e.flags?.[v], r = n?.mutationAutomation;
		return (C(r) ? r.definitionId : e.id) === t && n?.mutantsHandbookRetired !== !0 && n?.mutantsHandbookPossessionRemoved !== !0;
	}).length;
}
function _t(e, t) {
	return vt(e, t)[0];
}
function vt(e, t) {
	return (e.itemTypes?.mutation ?? gt(e)).filter((e) => {
		if (e.type !== void 0 && e.type !== "mutation") return !1;
		let n = e.flags?.[v], r = n?.mutationAutomation;
		return (C(r) ? r.definitionId : e.id) === t && n?.mutantsHandbookRetired !== !0 && n?.mutantsHandbookPossessionRemoved !== !0;
	});
}
function yt(e) {
	let t = e?.flags?.[v]?.mutationAutomation, n = e?.getFlag?.(v, "mutationAutomation"), r = C(t) ? t : C(n) ? n : void 0, i = C(r?.state) ? r.state : void 0, a = C(i?.acquisition) ? i.acquisition : void 0;
	return a?.status === "resolved" ? a : {};
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/usage.ts
var bt = "mutationActionUsage", xt = 28800, E = "dimensional-instability-teleport", D = /* @__PURE__ */ new Map();
function O() {
	return Reflect.get(globalThis, "game");
}
function St() {
	let e = Number(O()?.time?.worldTime);
	return Number.isFinite(e) ? e : Math.floor(Date.now() / 1e3);
}
function Ct(e) {
	let t = e.flags?.[v]?.[bt];
	if (!C(t) || t.version !== 1 || !C(t.actions)) return {
		actions: {},
		version: 1
	};
	let n = {};
	for (let [e, r] of Object.entries(t.actions)) Array.isArray(r) && (n[e] = r.filter((e) => C(e) && typeof e.id == "string" && Number.isFinite(e.at) && typeof e.period == "string" && typeof e.targetId == "string"));
	return {
		actions: n,
		version: 1
	};
}
function wt(e, t) {
	return e === "day" ? `day:${Math.floor(t / 86400)}` : e === "scene" ? `scene:${O()?.combat?.id ?? O()?.scene?.id ?? "none"}` : e ?? "use";
}
function Tt(e) {
	if (typeof e == "string") return e;
	if (C(e)) for (let t of [
		"token",
		"id",
		"uuid",
		"actor"
	]) {
		let n = e[t];
		if (typeof n == "string") return n;
		if (C(n)) {
			let e = n.uuid ?? n.id;
			if (typeof e == "string") return e;
		}
	}
}
function Et(e, t) {
	if (!e.usage?.perTarget) return ["*"];
	let n = t?.context?.targets, r = Array.isArray(n) ? n : [...O()?.user?.targets ?? []], i = [...new Set(r.map(Tt).filter((e) => !!e))];
	return i.length ? i : ["untargeted"];
}
function k(e, t, n = St()) {
	let r = Ct(t).actions[e.id] ?? [];
	if (e.id === E) return r;
	if (e.usage?.period === "eight-hours") return r.filter((e) => e.at > n - xt);
	let i = wt(e.usage?.period, n);
	return r.filter((e) => e.period === i);
}
function Dt(e, t) {
	let n = e.usage?.max;
	return n === "tb" ? Math.max(0, Number(t.system?.characteristics?.t?.bonus) || 0) : typeof n == "number" ? n : Infinity;
}
function Ot(e) {
	let t = w(e), n = t.mutationActionUseId;
	if (typeof n == "string" && n) return n;
	let r = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
	return t.mutationActionUseId = r, r;
}
function kt(e, t, n, r) {
	let i = Dt(e, t), a = k(e, n), o = r?.context?.mutationActionUseId;
	return Et(e, r).every((e) => {
		let t = a.filter((t) => t.targetId === e);
		return t.some((e) => e.id === o) || t.length < i;
	});
}
function At(e, t, n, r) {
	let i = r?.context?.mutationActionUseId;
	return typeof i == "string" && k(e, n).some((e) => e.id === i) ? !0 : (Number(t.system?.status?.advantage?.value) || 0) >= (e.usage?.advantageCost ?? 0) && kt(e, t, n, r);
}
function jt(e, t) {
	if (e.mutationName !== "Dimensional Instability") return e.test?.difficulty;
	let n = [
		"average",
		"challenging",
		"difficult",
		"hard",
		"vhard"
	];
	return n[Math.min(n.length - 1, k(e, t).length)];
}
async function Mt(e, t) {
	if (t <= 0) return;
	if (e.modifyAdvantage) {
		await e.modifyAdvantage(-t);
		return;
	}
	let n = Number(e.system?.status?.advantage?.value) || 0;
	await e.update?.({ "system.status.advantage.value": Math.max(0, n - t) });
}
async function Nt(e, t, n, r) {
	let i = Ot(r);
	if (e.id === E) {
		let e = n.flags?.[v]?.mutationRest, t = C(e) ? e.id : "initial";
		r.preData ??= {};
		let i = r.preData.options ??= {};
		if (i.mutationActionRestEpoch ??= t, i.mutationActionRestEpoch !== t) return !0;
	}
	if (!At(e, t, n, r)) return !1;
	let a = Ct(n), o = a.actions[e.id] ?? [];
	if (o.some((e) => e.id === i)) return !0;
	await Mt(t, e.usage?.advantageCost ?? 0);
	let s = St(), c = wt(e.usage?.period, s), l = Et(e, r).map((e) => ({
		at: s,
		id: i,
		period: c,
		targetId: e
	})), u = e.id === E ? o : o.filter((e) => e.at > s - 2764800).slice(-99);
	return a.actions[e.id] = [...u, ...l], await n.update?.({ [`flags.${v}.${bt}`]: a }), !0;
}
async function Pt(e, t, n, r) {
	let i = `${n.uuid ?? n.id ?? "item"}:${e.id}`, a = (D.get(i) ?? Promise.resolve(!0)).catch(() => !1).then(() => Nt(e, t, n, r));
	D.set(i, a);
	try {
		return await a;
	} finally {
		D.get(i) === a && D.delete(i);
	}
}
function Ft(e, t) {
	return k(e, t).length;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/card.ts
var A = "data-ratter-mutation-action";
function j(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
}
function It(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : typeof e == "string" && e ? [e] : [];
}
function M(e, t) {
	let n = It(t);
	return n.length ? `<p><strong>${j(e)}:</strong> ${n.map(j).join("; ")}</p>` : "";
}
function Lt(e, t, n, r) {
	let i = Number(r.result?.SL), a = t.system?.characteristics?.wp, o = Math.max(1, T(t, e.mutationId)), s = [
		Number.isFinite(i) ? `SL ${i}` : void 0,
		Number.isFinite(Number(a?.value)) ? `WP ${Number(a?.value)}` : void 0,
		Number.isFinite(Number(a?.bonus)) ? `WPB ${Number(a?.bonus)}` : void 0,
		`mutation level ${o}`
	].filter((e) => !!e);
	return e.usage?.period && s.push(`uses this ${e.usage.period}: ${Ft(e, n)}`), s.join("; ");
}
function Rt(e, t) {
	if (!e.miscast || !t.result) return;
	if (t.result.tables ??= {}, !t.isFumble) {
		t.result.tables.miscast?.key === `${e.miscast}mis` && delete t.result.tables.miscast;
		return;
	}
	let n = e.miscast === "major", r = Reflect.get(globalThis, "game");
	t.result.tables.miscast = {
		class: "fumble-roll",
		key: n ? "majormis" : "minormis",
		label: r?.i18n?.localize?.(n ? "ROLL.MajorMis" : "ROLL.MinorMis") ?? (n ? "Major Miscast" : "Minor Miscast")
	};
}
function zt(e, t, n, r) {
	let i = It(e.conditions), a = f(e.id).length ? "<p><strong>Automation:</strong> After accepting the final roll, right-click this chat card and choose Apply Mutant’s Handbook Outcome.</p>" : "";
	return [
		`<section ${A}="${j(e.id)}">`,
		`<p><strong>${j(e.mutationName)} — ${j(e.name)}</strong></p>`,
		M("Target", e.target),
		M("Range", e.range),
		M("Duration", e.duration),
		M("Outcome", e.outcome),
		M("Rules", e.rules),
		i.length ? `<p><strong>Condition guidance:</strong> ${i.map(j).join("; ")}. Apply these only after the final roll is accepted.</p>` : "",
		`<p><strong>Rolled values:</strong> ${j(Lt(e, t, n, r))}</p>`,
		a,
		"</section>"
	].join("");
}
function Bt(e, t, n, r) {
	!ht(n, e.id, r) || !r.result || (Rt(e, r), r.result.other ??= [], r.result.other = r.result.other.filter((e) => !e.includes(A)), r.result.other.push(zt(e, t, n, r)));
}
function Vt(e) {
	let t = f(e.id).length ? "<p><strong>Automation:</strong> Right-click this chat card and choose Apply Mutant’s Handbook Outcome.</p>" : "";
	return [
		`<section ${A}="${j(e.id)}">`,
		`<h3>${j(e.mutationName)} — ${j(e.name)}</h3>`,
		M("Target", e.target),
		M("Range", e.range),
		M("Duration", e.duration),
		M("Outcome", e.outcome),
		M("Rules", e.rules),
		M("Condition guidance", e.conditions),
		t,
		"</section>"
	].join("");
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/outcome-documents.ts
function Ht(e) {
	let t = e.system?.test, n = t?.options?.mutationActionId ?? t?.preData?.options?.mutationActionId;
	if (typeof n == "string") return n;
	let r = e.flags?.[v]?.mutationActionOutcome;
	return C(r) && typeof r.actionId == "string" ? r.actionId : void 0;
}
function Ut(e) {
	return e.flags?.[v]?.mutationActionOutcomeApplied === !0;
}
async function Wt(e) {
	await e.setFlag?.(v, "mutationActionOutcomeApplied", !0);
}
function Gt(e) {
	if (!C(e)) return;
	let t = e.actor;
	return C(t) ? t : e;
}
function Kt(e) {
	let t = e?.targets?.filter((e) => C(e)) ?? [];
	return t.length ? t : [...Reflect.get(globalThis, "game")?.user?.targets ?? []].flatMap((e) => Gt(e) ?? []);
}
async function qt(e) {
	let t = e.system?.test ? Reflect.get(e.system.test, "actor") : void 0;
	if (C(t)) return t;
	let n = e.flags?.[v]?.mutationActionOutcome, r = C(n) ? n.actorUuid : void 0;
	if (typeof r != "string") return;
	let i = await Reflect.get(globalThis, "fromUuid")?.(r);
	return C(i) ? i : void 0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/effect-helpers.ts
function N(e, t = 0) {
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function P(e, t, n) {
	return {
		async: !0,
		label: e,
		options: {
			activateScript: "return true;",
			hideScript: "",
			submissionScript: "",
			targeter: !1
		},
		script: n,
		trigger: t
	};
}
function F(e, t) {
	return {
		combat: null,
		rounds: e ?? null,
		seconds: t ?? null,
		startRound: null,
		startTime: null,
		startTurn: null,
		turns: null
	};
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/timed-effects.ts
var Jt = "Compendium.wfrp4e-core.items.Item.EO05HX7jql0g605A";
async function Yt(e, t, n) {
	let r = t === "ActiveEffect" ? e.effects : e.items, i = r ? [...r].filter((e) => e.flags?.[v]?.actionId === n).map(({ id: e }) => e).filter((e) => typeof e == "string") : [];
	i.length && await e.deleteEmbeddedDocuments?.(t, i);
}
function I(e, t, n) {
	return {
		changes: [],
		description: n,
		disabled: !1,
		duration: F(),
		flags: {
			[v]: {
				actionId: e.id,
				automationPhase: "mutation-phase-5"
			},
			wfrp4e: {}
		},
		img: "icons/svg/clockwork.svg",
		name: t,
		statuses: [],
		system: {
			scriptData: [],
			sourceData: {},
			transferData: {
				area: { aura: {} },
				avoidTest: { value: "none" },
				documentType: "Actor",
				equipTransfer: !1,
				prompt: !1,
				type: "document"
			},
			zone: {}
		},
		transfer: !1,
		type: "base"
	};
}
function Xt(e, t, n) {
	return {
		levels: Math.max(1, T(e, t.mutationId)),
		sl: N(n?.result?.SL),
		wp: N(e.system?.characteristics?.wp?.value),
		wpb: N(e.system?.characteristics?.wp?.bonus)
	};
}
async function Zt(e, t, n) {
	if (!e.createEmbeddedDocuments) return;
	let { levels: r, sl: i, wpb: a } = Xt(e, t, n), o = Math.max(1, a + i) * 2 ** (r - 1), s = (await Reflect.get(globalThis, "fromUuid")?.(Jt))?.toObject?.();
	if (!s) return;
	await Yt(e, "Item", t.id), delete s._id, s.name = `${t.mutationName} — Flight (${30 * r})`;
	let c = s.system ??= {}, l = c.specification ??= {};
	l.value = String(30 * r);
	let u = s.flags ??= {};
	u[v] = {
		actionId: t.id,
		automationPhase: "mutation-phase-5",
		rounds: o
	};
	let d = Array.isArray(s.effects) ? s.effects : [];
	d.push({
		...I(t, "Levitation duration", `Expires after ${o} rounds.`),
		system: {
			scriptData: [P("Expire Mutant's Handbook outcome", "endRound", `const key = "flags.${v}.rounds";\nconst left = Number(this.item.getFlag("${v}", "rounds")) - 1;\nif (left <= 0) return this.item.delete();\nreturn this.item.update({[key]: left});`)],
			sourceData: {},
			transferData: {
				area: { aura: {} },
				avoidTest: { value: "none" },
				documentType: "Actor",
				equipTransfer: !1,
				prompt: !1,
				type: "document"
			},
			zone: {}
		},
		transfer: !0
	}), s.effects = d, await e.createEmbeddedDocuments("Item", [s]);
}
function Qt(e, t, n, r, i = t) {
	let { levels: a, sl: o, wp: s, wpb: c } = Xt(i, n, r);
	if (e === "invisible") {
		let e = Math.max(1, s + o) * 2 ** (a - 1), t = I(n, "Invisible", "Ends early after an attack or conspicuously loud noise.");
		return t.duration = F(e), t.statuses = ["invisible"], t.img = "icons/svg/invisible.svg", t;
	}
	if (e === "entrancement") {
		let e = Math.max(1, c + o), t = I(n, `${n.mutationName} — Entranced`, `The source mutant gains +20 to social interactions with this Actor for ${e} hours.`);
		return t.duration = F(void 0, e * 3600), t;
	}
	if (e === "camouflage") {
		let e = I(n, "Chameleon Camouflage (Scene)", "+20 to Stealth while the skin still matches the surroundings; delete when the scene changes."), t = e.system;
		return t.scriptData = [P("Expire Mutant's Handbook outcome", "dialog", "if (args.skill?.name?.toLowerCase().includes(\"stealth\")) args.fields.modifier += 20;"), P("Expire Mutant's Handbook outcome", "endCombat", "return this.effect.delete();")], e;
	}
	if (e === "foresight") {
		let e = N(t.system?.status && t.system.status.fortune ? t.system.status.fortune.value : 0), r = I(n, "Oracle Foresight (Scene)", `+10 Initiative and ${a} temporary Fortune; delete when the scene ends.`);
		r.changes = [{
			key: "system.characteristics.i.modifier",
			mode: 2,
			priority: null,
			value: "10"
		}];
		let i = r.system;
		i.scriptData = [P("Expire Mutant's Handbook outcome", "endCombat", "return this.effect.delete();"), P("Expire Mutant's Handbook outcome", "deleteEffect", `const current = Number(this.actor.system.status.fortune.value);\nif (current > ${e}) return this.actor.update({"system.status.fortune.value": ${e}});`)];
		let o = r.flags, s = o[v] ??= {};
		return s.baseFortune = e, s.fortune = a, r;
	}
	let l = Math.max(1, s);
	if (e === "temporal-surge") {
		let e = I(n, "Temporal Surge (This Turn)", "One additional Movement and Action are available during the current turn.");
		e.duration = F();
		let t = e.system;
		return t.scriptData = [P("Expire Mutant's Handbook outcome", "endTurn", "return this.effect.delete();")], e;
	}
	let u = I(n, "Telekinesis Active", `May move matter at WPB yards per round for ${l} rounds.`);
	return u.duration = F(l), u;
}
async function $t(e, t, n, r, i = t) {
	if (e === "levitation") return Zt(t, n, r);
	await Yt(t, "ActiveEffect", n.id);
	let a = Qt(e, t, n, r, i);
	if (await t.createEmbeddedDocuments?.("ActiveEffect", [a]), e === "foresight") {
		let e = Math.max(1, T(t, n.mutationId)), r = t.system?.status?.fortune, i = N(r?.value);
		await t.update?.({ "system.status.fortune.value": i + e });
	}
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/form-items.ts
var en = {
	Contortionist: "Compendium.wfrp4e-core.items.Item.TaYriYcJkFuIdBKp",
	Frenzy: "Compendium.wfrp4e-core.items.Item.hXcfygzujgyMN1uI",
	Painless: "Compendium.wfrp4e-core.items.Item.wMwSRDmgiF2IdCJr"
};
function tn(e, t, n) {
	let r = /^(.*) (\d+)$/.exec(e), i = r?.[1] ?? e, a = r?.[2] ?? (i === "Fear" ? "1" : "");
	return {
		effects: [],
		flags: { [v]: {
			automationPhase: "mutation-phase-5",
			mutationForm: n
		} },
		img: "systems/wfrp4e/icons/blank.png",
		name: i,
		system: {
			description: { value: `<p>Temporary ${e} benefit supplied by the active Mutant's Handbook form.</p>` },
			specification: { value: a }
		},
		type: t
	};
}
async function nn(e, t, n) {
	let r = Reflect.get(globalThis, "fromUuid"), i = (en[e] ? await r?.(en[e]) : void 0)?.toObject?.() ?? tn(e, t, n);
	delete i._id;
	let a = C(i.flags) ? i.flags : {};
	return i.flags = a, a[v] = {
		automationPhase: "mutation-phase-5",
		mutationForm: n
	}, i;
}
async function rn(e, t, n) {
	n.length && await e.createEmbeddedDocuments?.("Item", await Promise.all(n.map(([e, n]) => nn(e, n, t))));
}
function an(e) {
	return Array.isArray(e.grants) ? e.grants.filter(C) : [];
}
async function on(e, t, n) {
	let r = Reflect.get(globalThis, "fromUuid"), i = [];
	for (let e of an(n)) {
		let n = (typeof e.sourceUuid == "string" ? await r?.(e.sourceUuid) : void 0)?.toObject?.();
		if (!n) continue;
		delete n._id;
		let a = C(n.flags) ? n.flags : {};
		n.flags = a, a[v] = {
			automationPhase: "mutation-phase-5",
			mutationForm: t
		}, i.push(n);
	}
	i.length && await e.createEmbeddedDocuments?.("Item", i);
}
function sn(e) {
	return (Array.isArray(e.modifiers) ? e.modifiers.filter(C) : []).flatMap((e) => {
		let t = N(e.value, NaN);
		return Number.isFinite(t) ? e.kind === "characteristic" && typeof e.characteristic == "string" ? [{
			key: `system.characteristics.${e.characteristic}.modifier`,
			mode: 2,
			priority: null,
			value: String(t)
		}] : e.kind === "move" ? [{
			key: "system.details.move.value",
			mode: 2,
			priority: null,
			value: String(t)
		}] : [] : [];
	});
}
function cn(e) {
	let t = Array.isArray(e.modifiers) ? e.modifiers.filter((e) => C(e) && e.kind === "test") : [];
	return t.length ? P("Resolve Mutant's Handbook form", "dialog", `const modifiers = ${JSON.stringify(t)};\nconst skillName = args.skill?.name ?? args.test?.item?.name ?? "";\nconst characteristic = args.characteristic ?? args.test?.characteristicKey;\nfor (const modifier of modifiers) {\n  const matchesSkill = (modifier.skills ?? []).some(name => skillName === name || skillName.startsWith(name + " ("));\n  const matchesCharacteristic = (modifier.characteristics ?? []).includes(characteristic);\n  if (!matchesSkill && !matchesCharacteristic) continue;\n  const current = Number(args.fields.modifier);\n  const next = current + Number(modifier.value);\n  if (Number.isFinite(next)) args.fields.modifier = next;\n}`) : void 0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/forms.ts
var ln = [
	"ws",
	"bs",
	"s",
	"t",
	"ag",
	"dex"
], un = {
	A7OLAWKXWUfh0UGU: "ethereal",
	XheCM6GZG8FhAoGp: "mirror-image",
	NDDLEunW5biRvTfy: "shapeshifter",
	JtmI1wOwKqWT4zVG: "skinwalker",
	q3sK3RsdsJxrifZP: "swarmform",
	jPlCrsK3hTgkHsTR: "warp-spasm",
	mNNavbJayRcsyeXJ: "werebeast"
};
function dn(e) {
	try {
		return e.items ? [...e.items] : [];
	} catch {
		return [];
	}
}
async function fn(e, t) {
	let n = dn(e).filter((e) => e.flags?.[v]?.mutationForm === t).flatMap((e) => e.id ? [e.id] : []), r = [...e.effects ?? []].filter((e) => e.flags?.[v]?.mutationForm === t).flatMap((e) => e.id ? [e.id] : []);
	return n.length && await e.deleteEmbeddedDocuments?.("Item", n), r.length && await e.deleteEmbeddedDocuments?.("ActiveEffect", r), n.length > 0 || r.length > 0;
}
async function pn(e, t) {
	let n = un[t];
	!n || T(e, t) > 0 || await fn(e, n);
}
function L(e, t, n, r, i) {
	let a = `const ids = (this.actor.items ?? []).filter(item => item.flags?.["${v}"]?.mutationForm === "${t}").map(item => item.id);\nif (ids.length) await this.actor.deleteEmbeddedDocuments("Item", ids);`;
	return {
		changes: [],
		description: n,
		disabled: !1,
		duration: F(r, i),
		flags: {
			[v]: {
				actionId: e.id,
				automationPhase: "mutation-phase-5",
				mutationForm: t
			},
			wfrp4e: {}
		},
		img: "icons/svg/mystery-man.svg",
		name: `${e.mutationName} — Active Form`,
		statuses: [],
		system: {
			scriptData: [P("Resolve Mutant's Handbook form", "deleteEffect", a)],
			sourceData: {},
			transferData: {
				area: { aura: {} },
				avoidTest: { value: "none" },
				documentType: "Actor",
				equipTransfer: !1,
				prompt: !1,
				type: "document"
			},
			zone: {}
		},
		transfer: !1,
		type: "base"
	};
}
function R(e, t) {
	let n = (C(e.selections) ? e.selections : {})[t];
	return String(Array.isArray(n) ? n[0] ?? "" : n ?? "");
}
function mn(e) {
	return {
		amphibian: {
			move: 3,
			trait: "Swim 5"
		},
		arthropod: {
			move: 3,
			trait: "Swim 4"
		},
		"bird-bat": { trait: "Flight 30" },
		fish: { trait: "Swim 10" },
		"insect-spider": {
			move: 4,
			trait: "Flight 5"
		},
		"lizard-snake": {
			move: 5,
			trait: "Swim 4"
		},
		mollusc: {
			move: 2,
			trait: "Swim 5"
		},
		"rodent-rabbit": { move: 5 }
	}[e] ?? {};
}
async function hn(e, t, n, r, i, a) {
	if (await fn(n, e), t === "revert") return;
	let o = yt(_t(n, r.mutationId)), s = N(i?.result?.SL), c = L(r, e, r.outcome), l = [];
	if (e === "ethereal") c = L(r, e, r.outcome, Math.max(1, N(n.system?.characteristics?.wp?.bonus) + s)), l = [["Ethereal", "trait"]];
	else if (e === "mirror-image") {
		let t = Math.max(1, T(n, r.mutationId)), i = Math.max(1, N(n.system?.characteristics?.wp?.value) + s * 10) * 2 ** (t - 1);
		c = L(r, e, r.outcome, void 0, i * 60);
	} else if (e === "shapeshifter") {
		let t = Math.max(1, N(n.system?.characteristics?.t?.bonus) + s);
		c = L(r, e, r.outcome, void 0, t * 3600);
	} else if (e === "skinwalker" && a) {
		c.changes = ln.flatMap((e) => {
			let t = N(a.system?.characteristics?.[e]?.value) - N(n.system?.characteristics?.[e]?.value);
			return t ? [{
				key: `system.characteristics.${e}.modifier`,
				mode: 2,
				priority: null,
				value: String(t)
			}] : [];
		});
		let e = N(a.system?.details?.move?.value, NaN);
		Number.isFinite(e) && c.changes.push({
			key: "system.details.move.value",
			mode: 5,
			priority: null,
			value: String(e)
		});
	} else if (e === "swarmform") {
		let e = mn(R(o, "swarm-source"));
		c.changes = [...e.move === void 0 ? [] : [{
			key: "system.details.move.value",
			mode: 5,
			priority: null,
			value: String(e.move)
		}], ...R(o, "swarm-size") ? [{
			key: "system.details.size.value",
			mode: 5,
			priority: null,
			value: R(o, "swarm-size")
		}] : []], l = [["Swarm", "trait"], ...e.trait ? [[e.trait, "trait"]] : []];
	} else if (e === "warp-spasm") {
		l = [
			["Frenzy", "talent"],
			["Berserk Charge", "talent"],
			["Contortionist", "talent"],
			["Painless", "trait"],
			["Fear", "trait"]
		];
		let e = c.system;
		e.scriptData = [
			...e.scriptData ?? [],
			P("Resolve Mutant's Handbook form", "endCombat", "return this.effect.delete();"),
			P("Resolve Mutant's Handbook form", "deleteEffect", "await this.actor.addCondition(\"fatigued\", 1);")
		];
	} else if (e === "werebeast") {
		c.changes = sn(o);
		let t = cn(o);
		if (t) {
			let e = c.system;
			e.scriptData = [...e.scriptData ?? [], t];
		}
		await on(n, e, o);
	}
	await rn(n, e, l), await n.createEmbeddedDocuments?.("ActiveEffect", [c]);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/companions.ts
function gn(e, t) {
	let n = (C(e.selections) ? e.selections : {})[t];
	return String(Array.isArray(n) ? n[0] ?? "" : n ?? "");
}
function _n(e) {
	return e.split("-").filter(Boolean).map((e) => `${e[0]?.toUpperCase() ?? ""}${e.slice(1)}`).join(" ");
}
function vn(e, t, n) {
	let r = C(e.characteristics) ? e.characteristics : {};
	e.characteristics = r;
	let i = C(r[t]) ? r[t] : {};
	r[t] = i, i.initial = n, i.advances = 0, i.modifier = 0, i.value = n;
}
function yn(e, t) {
	return [
		"personality",
		"motivation",
		"short-ambition",
		"long-ambition"
	].flatMap((n) => {
		let r = gn(e, `${t}-${n}`);
		return r ? [`<p><strong>${_n(n)}:</strong> ${r}</p>`] : [];
	}).join("");
}
function bn(e, t, n) {
	let r = e.name ?? "Mutant";
	if (t === "spectral-companion") {
		let e = gn(n, "companion-type") || "ghost";
		return {
			flags: {},
			img: "icons/magic/death/undead-ghost-scream-teal.webp",
			name: gn(n, "companion-name") || `${r}'s ${_n(e)}`,
			system: { details: { notes: { value: yn(n, "companion") } } },
			type: "creature"
		};
	}
	let i = e.toObject?.() ?? {};
	delete i._id, i.effects = [], i.flags = {}, i.folder = null, i.items = [], i.type = "creature";
	let a = C(i.system) ? i.system : {};
	if (i.system = a, t === "bodysnatcher-drone") {
		i.name = `${r}'s Bodysnatcher Drone`;
		for (let [e, t] of Object.entries({
			ag: 30,
			bs: 0,
			dex: 0,
			fel: 0,
			i: 0,
			int: 0,
			s: 0,
			t: 0,
			wp: 0,
			ws: 30
		})) vn(a, e, t);
		return a.details = {
			...C(a.details) ? a.details : {},
			move: { value: 2 },
			size: { value: "tiny" }
		}, a.status = {
			...C(a.status) ? a.status : {},
			wounds: {
				max: 1,
				value: 1
			}
		}, i.items = [
			{
				name: "Dodge",
				type: "skill",
				system: {
					advances: { value: 0 },
					characteristic: { value: "ag" }
				}
			},
			{
				name: "Melee (Grapple)",
				type: "skill",
				system: {
					advances: { value: 0 },
					characteristic: { value: "ws" }
				}
			},
			{
				name: "Stealth",
				type: "skill",
				system: {
					advances: { value: 10 },
					characteristic: { value: "ag" }
				}
			},
			{
				name: "Wallcrawler",
				type: "trait",
				system: {
					description: { value: "<p>May traverse walls and ceilings.</p>" },
					specification: { value: "" }
				}
			}
		], i;
	}
	i.name = `${r}'s Vestigial Twin`;
	for (let t of [
		"ws",
		"bs",
		"s",
		"t",
		"ag",
		"fel"
	]) {
		let n = t === "t" || t === "fel" ? 20 : t === "ag" ? Infinity : 30, r = Number(e.system?.characteristics?.[t]?.value) || 0;
		vn(a, t, Number.isFinite(n) ? Math.max(0, r - n) : 0);
	}
	return a.details = {
		...C(a.details) ? a.details : {},
		move: { value: 0 },
		notes: { value: yn(n, "twin") }
	}, a.status = {
		...C(a.status) ? a.status : {},
		fate: {
			max: 0,
			value: 0
		},
		resilience: {
			max: 0,
			value: 0
		}
	}, i;
}
function xn(e, t) {
	let n = e.toObject?.() ?? {};
	delete n._id, n.name = `${e.name ?? "Mutant"}'s Symbiotic Twin`, Array.isArray(n.items) && (n.items = n.items.filter((e) => {
		if (!C(e) || !C(e.flags)) return !0;
		let t = e.flags[v];
		return !C(t) || !C(t.mutationAction) || t.mutationAction.actionId !== "symbiotic-twin-manifest";
	}));
	let r = C(n.system) ? n.system : {};
	n.system = r;
	let i = C(r.details) ? r.details : {};
	return r.details = i, i.notes = { value: yn(t, "twin") }, n;
}
function Sn(e, t) {
	let n = e.flags?.[v]?.mutationCompanions, r = C(n) ? n[t] : void 0;
	return typeof r == "string" ? [{ uuid: r }] : Array.isArray(r) ? r.flatMap((e) => C(e) && typeof e.uuid == "string" ? [{
		uuid: e.uuid,
		...typeof e.mutationItemId == "string" ? { mutationItemId: e.mutationItemId } : {}
	}] : []) : [];
}
async function Cn(e, t) {
	let n = Sn(e, t), r = Reflect.get(globalThis, "fromUuid");
	return r ? (await Promise.all(n.map(async (e) => await r(e.uuid) ? e : void 0))).filter((e) => e !== void 0) : n;
}
function wn(e, t) {
	let n = new Set(t.flatMap((e) => e.mutationItemId ? [e.mutationItemId] : []));
	return e.find((e) => !e.id || !n.has(e.id)) ?? e[t.length];
}
async function Tn(e, t, n) {
	let r = vt(t, n.mutationId), i = await Cn(t, e);
	if (!r.length || i.length >= r.length) return;
	let a = wn(r, i), o = yt(a), s = e === "symbiotic-twin" ? xn(t, o) : bn(t, e, o), c = C(s.flags) ? s.flags : {};
	s.flags = c, c[v] = {
		automationPhase: "mutation-phase-5",
		mutationCompanion: {
			hostUuid: t.uuid ?? t.id,
			kind: e,
			mutationId: n.mutationId
		}
	};
	let l = await Reflect.get(globalThis, "Actor")?.create?.(s), u = l?.uuid ?? l?.id;
	u && (await t.update?.({ [`flags.${v}.mutationCompanions.${e}`]: [...i, {
		mutationItemId: a?.id,
		uuid: u
	}] }), e === "symbiotic-twin" && (await t.update?.({ [`flags.${v}.mutationTwinUuid`]: u }), await l?.update?.({ [`flags.${v}.mutationTwinUuid`]: t.uuid ?? t.id })));
}
var En = /* @__PURE__ */ new Set();
function Dn() {
	Hooks.on("updateActor", (e, t, n, r) => {
		let i = Reflect.get(globalThis, "game");
		if (typeof r == "string" && i?.user?.id !== r || !C(e) || !C(t)) return;
		let a = e, o = a.uuid ?? a.id, s = a.flags?.[v]?.mutationTwinUuid, c = C(t.system) ? t.system : void 0, l = C(c?.status) ? c.status : void 0, u = C(l?.wounds) ? l.wounds : void 0, d = t["system.status.wounds.value"] ?? u?.value;
		if (typeof o != "string" || typeof s != "string" || !Number.isFinite(Number(d)) || En.has(o)) return;
		let ee = Reflect.get(globalThis, "fromUuid");
		En.add(s), ee?.(s).then((e) => e?.update?.({ "system.status.wounds.value": Number(d) })).finally(() => En.delete(s));
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/outcomes.ts
var On = /* @__PURE__ */ new WeakSet();
function z(e) {
	return e ? typeof e.failed == "boolean" ? !e.failed : e.result?.outcome !== "failure" : !0;
}
function kn(e, t) {
	return e.when === "always" ? !0 : e.when === "success" ? z(t) : !z(t);
}
function An(e, t, n) {
	return e === "self" ? [t] : n;
}
async function jn(e, t) {
	let n = Reflect.get(globalThis, "Roll");
	n && await (await new n(e).evaluate()).toMessage?.({ flavor: t });
}
async function Mn(e, t, n) {
	for (let r of t) {
		let t = {
			appendTitle: ` — ${n} follow-up`,
			fields: { difficulty: e.difficulty }
		}, i = e.skill ? await r.setupSkill?.(e.skill, t) : await r.setupCharacteristic?.(e.characteristic ?? "wp", t);
		if (i?.roll && (await i.roll(), !z(i))) {
			for (let t of e.failureConditions) {
				let e = t.condition === "broken" && r.has?.("Skittish") ? 3 : t.amount ?? 1;
				await r.addCondition?.(t.condition, e);
			}
			e.failureRoll && await jn(e.failureRoll.formula, e.failureRoll.label);
		}
	}
}
function B(e, t, n) {
	let r = Number(n?.result?.SL) || 0;
	return e === "sl" ? Math.max(0, r) : e === "fellowship-plus-sl" ? Math.max(0, (Number(t.system?.characteristics?.fel?.value) || 0) + r) : e;
}
async function Nn(e, t, n, r, i) {
	if (e.kind === "roll") return jn(e.formula, e.label);
	if (e.kind === "follow-up-test") return Mn(e, n, i.name);
	if (e.kind === "companion") return Tn(e.companion, t, i);
	if (e.kind === "form") return hn(e.form, e.mode, t, i, r, n[0]);
	let a = An(e.subject, t, n);
	if (e.kind === "condition") {
		for (let n of a) {
			let i = B(e.amount ?? 1, t, r);
			await n.addCondition?.(e.condition, i);
		}
		return;
	}
	if (e.kind === "remove-condition") {
		let n = B(e.amount ?? 1, t, r);
		for (let t of a) for (let r = 0; r < n; r += 1) await t.removeCondition?.(e.condition);
		return;
	}
	if (e.kind === "heal") {
		let n = B(e.amount, t, r);
		for (let e of a) await e.modifyWounds?.(n);
		return;
	}
	if (e.kind === "effect") for (let n of a) await $t(e.effect, n, i, r, t);
}
function Pn(e) {
	Reflect.get(globalThis, "ui")?.notifications?.warn?.(e);
}
function Fn(e) {
	let t = Ht(e);
	return !!(t && f(t).length);
}
async function In(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	if (On.has(t) || Ut(t)) return !1;
	let n = Ht(t), r = n ? me(n) : void 0;
	if (!r) return !1;
	let i = t.system?.test, a = await qt(t);
	if (!a) return !1;
	let o = f(r.id).filter((e) => kn(e, i)), s = Kt(i);
	if (o.some((e) => e.kind !== "roll" && e.subject === "targets" || e.kind === "form" && e.source === "targets") && s.length === 0) return Pn(`Target one or more Actors before applying ${r.name}.`), !1;
	On.add(t);
	try {
		for (let e of o) await Nn(e, a, s, i, r);
		return await Wt(t), !0;
	} finally {
		On.delete(t);
	}
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/index.ts
var Ln = /* @__PURE__ */ new WeakSet();
function V(e, t, n) {
	let r = me(n), i = dt(e), a = ft(t);
	if (!r || !i || !a) return;
	let o = mt(a);
	if (o === void 0 || o === n) return {
		action: r,
		actor: i,
		item: a
	};
}
function Rn(e, t) {
	Reflect.get(globalThis, "ui")?.notifications?.warn?.(`${t.name ?? "This Actor"} cannot use ${e.name}: its use limit or Advantage cost is not available.`);
}
function zn(e, t, n) {
	let r = e.test?.bonusMultiplier ?? 1, i = e.test?.bonusCharacteristic;
	if (r <= 1 || !i) return;
	let a = w(n), o = `mutationActionDamage:${e.id}`;
	if (typeof a[o] == "number") return;
	let s = Number(t.system?.characteristics?.[i]?.bonus);
	if (!Number.isFinite(s)) return;
	let c = s * (r - 1);
	n.preData ??= {};
	let l = Number(n.preData.additionalDamage) || 0;
	n.preData.additionalDamage = l + c, a[o] = c;
}
function Bn(e, t) {
	let n = t.result;
	if (!n || Ln.has(n)) return;
	let r = Number(w(t)[`mutationActionDamage:${e.id}`]), i = Number(n.damage);
	!Number.isFinite(r) || r === 0 || !Number.isFinite(i) || (n.damage = i + r, n.breakdown?.damage?.other?.push({
		label: e.name,
		value: r
	}), Ln.add(n));
}
function Vn(e, t, n, r) {
	let i = V(e, t, n);
	if (!i || !C(r)) return;
	let { action: a, actor: o, item: s } = i;
	if (!At(a, o, s)) {
		r.abort = !0, Rn(a, o);
		return;
	}
	let c = C(r.fields) ? r.fields : {};
	r.fields = c;
	let l = jt(a, s);
	l && (c.difficulty = l);
	let u = C(r.flags) ? r.flags : {};
	r.flags = u, u.mutationActionId = a.id;
}
async function Hn(e, t, n, r) {
	let i = V(e, t, n), a = pt(r);
	if (!i || !a) return !1;
	let { action: o, actor: s, item: c } = i, l = w(a);
	l.mutationActionId = o.id, l.mutationActionItemUuid = c.uuid ?? c.id, a.preData ??= {}, a.preData.options ??= {}, a.preData.options.mutationActionActorUuid = s.uuid ?? s.id, a.preData.options.mutationActionId = o.id, a.preData.options.mutationActionItemUuid = c.uuid ?? c.id, a.preData.options.mutationActionUseId ??= globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
	let u = await Pt(o, s, c, a);
	return u ? zn(o, s, a) : Rn(o, s), u;
}
async function Un(e, t, n, r) {
	let i = V(e, t, n), a = pt(r);
	!i || !a || (Bn(i.action, a), Bt(i.action, i.actor, i.item, a));
}
function Wn(e, t, n) {
	let r = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
	return {
		appendTitle: ` — ${e.mutationName}: ${e.name}`,
		fields: { difficulty: jt(e, n) ?? "challenging" },
		mutationActionId: e.id,
		mutationActionActorUuid: t.uuid ?? t.id,
		mutationActionItemUuid: n.uuid ?? n.id,
		mutationActionUseId: r
	};
}
async function Gn(e, t, n) {
	let r = Wn(e, t, n);
	if (t.setupTrait) return t.setupTrait(n, r);
	if (e.test && "skill" in e.test && t.setupSkill) return t.setupSkill(e.test.skill, r);
	if (e.test && "characteristic" in e.test && t.setupCharacteristic) return t.setupCharacteristic(e.test.characteristic, r);
}
async function Kn(e, t, n) {
	let r = Reflect.get(globalThis, "game"), i = Vt(e), a = r?.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	a.flags = {
		...typeof a.flags == "object" && a.flags ? a.flags : {},
		"fvtt-wfrp-ratter": { mutationActionOutcome: {
			actionId: e.id,
			actorUuid: t.uuid ?? t.id,
			itemUuid: n.uuid ?? n.id
		} }
	}, await Reflect.get(globalThis, "ChatMessage")?.create?.(a);
}
async function qn(e, t, n) {
	let r = V(e, t, n);
	if (!r) return;
	let { action: i, actor: a, item: o } = r, s = i.test ? await Gn(i, a, o) : { context: Wn(i, a, o) };
	if (s && await Hn(a, o, i.id, s)) {
		if (i.test && s.roll) {
			await s.roll();
			return;
		}
		await Kn(i, a, o);
	}
}
//#endregion
//#region src/module/api/create-module-api.ts
function Jn() {
	return {
		applyMutationActionOutcome: In,
		checkMutantsHandbookCorruption: ut,
		id: v,
		logStatus() {
			console.log(`${ue} is loaded.`);
		},
		prepareMutationActionDialog: Vn,
		recordMutationActionUse: Hn,
		reconcileMutationAutomation: _,
		removeMutationGrantOwner: le,
		resolveMutationActionTest: Un,
		title: ue,
		useMutationAction: qn
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Yn() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(v);
	if (!e) throw Error(`Foundry module registry entry was not found for ${v}.`);
	e.api = Jn();
}
//#endregion
//#region src/module/settings.ts
var Xn = "useMutantsHandbookMutations";
function Zn() {
	if (!game) throw Error("Foundry game global is unavailable during settings registration.");
	game.settings.register(v, Xn, {
		config: !0,
		default: !1,
		hint: "FVTT_WFRP_RATTER.Settings.MutantsHandbook.Hint",
		name: "FVTT_WFRP_RATTER.Settings.MutantsHandbook.Name",
		scope: "world",
		type: Boolean
	});
}
function Qn() {
	return game?.settings.get(v, Xn) === !0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/context-options.ts
function $n(e) {
	let t = e.dataset.messageId;
	return t ? game?.messages.get(t) : void 0;
}
function er() {
	Hooks.on("getChatMessageContextOptions", (e, t) => {
		game && t.push({
			callback: async (e) => {
				let t = $n(e);
				t && await In(t);
			},
			condition: (e) => {
				let t = $n(e);
				return !!(t && t.flags?.["fvtt-wfrp-ratter"]?.mutationActionOutcomeApplied !== !0 && Fn(t));
			},
			name: "Apply Mutant’s Handbook Outcome"
		});
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/hooks.ts
function H(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (t.type !== "mutation" || typeof t.id != "string" || typeof t.actor?.uuid != "string") return;
	let n = t.flags?.[v]?.mutationAutomation;
	return typeof n == "object" && n ? t : void 0;
}
function tr(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (typeof t.id != "string" || typeof t.actor?.uuid != "string") return;
	let n = t.flags?.[v];
	return typeof n?.mutationGrant == "object" || typeof n?.mutationSkillGrant == "object" ? t : void 0;
}
function nr(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (t.type === "mutation" && typeof t.id == "string" && typeof t.actor?.uuid == "string" && typeof t.getFlag == "function") return ie(t) ? t : void 0;
}
function U(e) {
	e.catch(g);
}
async function rr(e, t, n, r) {
	if (!W(r) || typeof e != "object" || !e || typeof t != "object" || !t || !("disabled" in t)) return;
	let i = e, a = i.flags?.[v];
	if (i.parent?.documentName !== "Item" || a?.lightAutomation !== !0) return;
	let o = Array.isArray(i.scripts) ? i.scripts : [];
	await Promise.all(o.filter((e) => e.trigger === "updateDocument" && e.options?.runIfDisabled === !0).map((e) => e.execute({
		data: t,
		document: i,
		options: n,
		type: "effect",
		user: r
	})));
}
function ir(e) {
	let t = [];
	for (let n of e.itemTypes?.mutation ?? []) {
		let e = n.flags?.[v];
		if (e?.mutantsHandbookRetired !== !0 && e?.mutantsHandbookPossessionRemoved !== !0) for (let e of n.effects ?? []) e.flags?.["fvtt-wfrp-ratter"]?.lightAutomation === !0 && e.active !== !1 && e.disabled !== !0 && e._source?.disabled !== !0 && t.push(e);
	}
	return t;
}
async function ar(e) {
	if (game?.user.isUniqueGM !== !0 || typeof e != "object" || !e) return;
	let t = /* @__PURE__ */ new Set();
	for (let n of e.scene?.tokens ?? []) n.actor && t.add(n.actor);
	for (let e of t) for (let t of ir(e)) {
		let e = Array.isArray(t.scripts) ? t.scripts : [];
		for (let t of e) t.trigger === "immediate" && await t.execute({});
	}
}
function or(e) {
	let t = e.flags?.[v]?.mutationAutomation;
	return typeof t == "object" && t && typeof t.definitionId == "string" ? t.definitionId : void 0;
}
async function sr(e) {
	let t = or(e);
	t && e.actor && await pn(e.actor, t), e.actor && await le(e.actor.uuid, e.id);
}
function W(e) {
	return typeof e == "string" && game?.user.id === e;
}
async function cr(e, t = {}) {
	e.actor && !await _e(e) && e.name.trim().toLowerCase() === "chimeran curse" && t.mutationAcquisitionHandlesChimeranRetirement !== !0 && await r(e.actor);
}
function lr() {
	Hooks.on("canvasReady", (e) => {
		U(ar(e));
	}), Hooks.on("updateActiveEffect", (e, t, n, r) => {
		U(rr(e, t, n, r));
	}), Hooks.on("createItem", (e, t, n) => {
		if (!W(n)) return;
		let r = H(e) ?? nr(e);
		r?.actor && U(cr(r, typeof t == "object" && t ? t : {}));
	}), Hooks.on("deleteItem", (e, t, n) => {
		if (!W(n)) return;
		let r = H(e);
		if (r?.actor) {
			U(sr(r));
			return;
		}
		let i = tr(e);
		i?.actor && U(_(i.actor.uuid));
	}), Hooks.on("updateItem", (e, t, n, r) => {
		if (!W(r)) return;
		let i = H(e), a = i?.flags?.[v];
		i?.actor && (a?.mutantsHandbookRetired === !0 || a?.mutantsHandbookPossessionRemoved === !0) && U(sr(i));
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/migration.ts
var ur = `${v}.ratter-11-items`, dr = "The Mutant's Handbook", fr = 7, pr = /* @__PURE__ */ new Set(["nqE2hnmX2A3Mg5I1", "mNNavbJayRcsyeXJ"]), mr = /* @__PURE__ */ new Set([
	"acquisition",
	"actions",
	"automated",
	"definitionId",
	"grants",
	"manual",
	"retainedRolls",
	"selfControl",
	"status",
	"version"
]);
function G(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function K(e) {
	return e.toObject();
}
function q(e) {
	let t = e.flags;
	if (!G(t)) return {};
	let n = t[v];
	return G(n) ? n : {};
}
function J(e) {
	let t = e.effects;
	return Array.isArray(t) ? t.filter(G) : [];
}
function Y(e) {
	return Array.isArray(e) ? e.map(Y) : G(e) ? Object.fromEntries(Object.entries(e).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => [e, Y(t)])) : e;
}
function hr(e, t) {
	return JSON.stringify(Y(e)) === JSON.stringify(Y(t));
}
function gr(e) {
	let t = { ...e };
	return delete t._key, delete t._stats, t;
}
function _r(e, t) {
	let n = new Map(J(e).filter(X).map((e) => [e._id, e]));
	return J(t).filter(X).map((e) => {
		let t = n.get(e._id);
		return t && typeof t.disabled == "boolean" ? {
			...e,
			disabled: t.disabled
		} : e;
	});
}
function X(e) {
	let t = e.flags;
	if (!G(t)) return !1;
	let n = t[v];
	return G(n) && typeof n.automationPhase == "string";
}
function vr(e, t) {
	if (!G(e)) return t;
	let n = Object.fromEntries(Object.entries(e).filter(([e]) => !mr.has(e))), r = e.version, i = t.version, a = t.definitionId, o = n.state, s = G(o) ? o.acquisition : void 0;
	return typeof r == "number" && r < fr && typeof i == "number" && i >= fr && typeof a == "string" && pr.has(a) && G(o) && G(s) && s.status === "resolved" && (n = {
		...n,
		state: {
			...o,
			acquisition: {
				...s,
				grants: [],
				modifiers: [],
				status: "pending"
			}
		}
	}), {
		...t,
		...n
	};
}
function yr(e, t) {
	let n = q(t).mutationAutomation;
	if (!G(n)) return;
	let r = q(e).mutationAutomation, i = vr(r, n), a = J(e).filter(X), o = _r(e, t), s = [...o, ...J(e).filter((e) => !X(e))], c = {};
	return hr(r, i) || (c[`flags.${v}.mutationAutomation`] = i), hr(a.map(gr), o.map(gr)) || (c.effects = s), Object.keys(c).length > 0 ? c : void 0;
}
function br(e) {
	return G(e) ? e.type === "mutation" && typeof e.id == "string" && typeof e.name == "string" && typeof e.toObject == "function" : !1;
}
function xr(e) {
	let t = q(K(e)).mutationAutomation;
	return G(t) && typeof t.definitionId == "string" ? t.definitionId : void 0;
}
function Sr(e) {
	let t = q(K(e)).mutationAutomation;
	if (!G(t)) return !1;
	let n = t.definitionId, r = t.state, i = G(r) ? r.acquisition : void 0;
	return typeof n == "string" && pr.has(n) && G(i) && i.status === "pending";
}
function Cr(e) {
	return q(K(e)).sourceDocument === dr;
}
function wr(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.uuid, t);
	for (let e of t) for (let t of e.tokens ?? []) t.actor && n.set(t.actor.uuid, t.actor);
	return [...n.values()];
}
async function Tr(e, t) {
	if (!e.deleteEmbeddedDocuments || !e.createEmbeddedDocuments) throw Error(`${e.name} does not support embedded Active Effect migration.`);
	let n = J(K(e)).filter(X), r = n.map((e) => e._id).filter((e) => typeof e == "string");
	if (r.length !== n.length) throw Error(`${e.name} has a managed Active Effect without an ID.`);
	let i = _r(K(e), K(t)).map((e) => {
		let t = { ...e };
		return delete t._key, t;
	});
	r.length > 0 && await e.deleteEmbeddedDocuments("ActiveEffect", r), i.length > 0 && await e.createEmbeddedDocuments("ActiveEffect", i, {
		keepId: !0,
		skipMutationAcquisition: !0
	});
}
async function Er() {
	if (!game || game.user.isUniqueGM !== !0) return;
	let t = game.packs.get(ur);
	if (!t) throw Error(`The required compendium ${ur} is unavailable.`);
	let n = (await t.getDocuments()).filter(br), r = new Map(n.map((e) => [xr(e) ?? e.id, e])), i = new Map(n.map((e) => [e.name, e])), a = wr(game.actors ?? [], game.scenes ?? []);
	for (let t of a) {
		await e(t);
		let n = [], a = [];
		for (let e of Array.from(t.items).filter(br)) {
			let t = (xr(e) ? r.get(xr(e)) : void 0) ?? (Cr(e) ? i.get(e.name) : void 0);
			if (!t) continue;
			let o = yr(K(e), K(t));
			o && ("effects" in o && (a.push({
				owned: e,
				source: t
			}), delete o.effects), Object.keys(o).length > 0 && n.push({
				_id: e.id,
				...o
			}));
		}
		n.length > 0 && await t.updateEmbeddedDocuments("Item", n);
		for (let e of a) await Tr(e.owned, e.source);
		let o = Array.from(t.items).filter(br).filter(Sr);
		if (o.length > 0) {
			let { resolveOwnedMutationAcquisition: e } = await import("../runtime-Dm5WAeM4.js");
			for (let t of o) {
				if (!t.uuid) throw Error(`${t.name} has no UUID for acquisition repair.`);
				await e(t.uuid);
			}
		}
		await _(t.uuid);
	}
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/replacement.ts
var Dr = Symbol.for(`${v}.mutantsHandbookReplacement`);
function Or() {
	let e = CONFIG.Actor.dataModels.character.prototype;
	if (e[Dr] === !0) return;
	let t = e.checkCorruption;
	if (typeof t != "function") throw Error("WFRP4e's character corruption check is unavailable.");
	Object.defineProperty(e, Dr, { value: !0 }), e.checkCorruption = async function() {
		if (!Qn()) {
			await t.call(this);
			return;
		}
		try {
			await lt(this.parent);
		} catch (e) {
			g(e);
		}
	};
}
var kr = "wfrp4e-customizer-apps.species", Ar = "fvtt-wfrp-ratter.ratter-species", Z = "Ratter Species requires Drowsy's WFRP4e Customizers to be enabled and its Species Item type registered. Enable Customizers and reload the world before opening or importing these Items.";
function Q(e) {
	return e.modules.get("wfrp4e-customizer-apps")?.active === !0 && typeof e.models[kr] == "function";
}
var jr = /* @__PURE__ */ new WeakSet(), Mr = /* @__PURE__ */ new WeakSet();
function Nr(e, t, n) {
	if (Mr.has(e)) return;
	Mr.add(e);
	let r = e.importFromCompendium;
	e.importFromCompendium = async function(e, i, ...a) {
		return e.collection === "fvtt-wfrp-ratter.ratter-species" && !t() ? (n(Z), null) : r.call(this, e, i, ...a);
	};
}
function Pr(e, t, n) {
	if (!jr.has(e)) {
		jr.add(e);
		for (let r of [
			"getDocument",
			"getDocuments",
			"importAll",
			"importDialog"
		]) {
			let i = e[r];
			e[r] = async function(...e) {
				return t() ? i.apply(this, e) : (n(Z), r === "getDocuments" || r === "importAll" ? [] : null);
			};
		}
	}
}
function Fr(e) {
	return e.type === kr && e.flags?.["fvtt-wfrp-ratter"]?.speciesTemplate?.version === 1;
}
async function Ir(e, t, n, r, i) {
	let a = `Compendium.${t}.${n}.`;
	if (!e?.startsWith(a)) return;
	let o = e.slice(a.length);
	if (!/^[A-Za-z0-9]{16}$/.test(o)) throw Error(`Invalid Ratter species dependency: ${e}`);
	let s = r.contents.find((t) => t._stats?.compendiumSource === e), c = i.get(t);
	if (!c) throw Error(`Missing Ratter dependency pack: ${t}`);
	let l = s ?? await r.importFromCompendium(c, o);
	if (!l) throw Error(`Could not import Ratter species dependency: ${e}`);
	return {
		uuid: l.uuid,
		id: l.id,
		name: l.name
	};
}
async function Lr(e, t) {
	if (e.parent || e.pack || !Fr(e) || !Q(t)) return !1;
	let n = {}, r = await Ir(e.system?.subspeciesOf?.uuid, Ar, "Item", t.items, t.packs), i = await Ir(e.system?.tables?.career?.uuid, "fvtt-wfrp-ratter.ratter-10-tables", "RollTable", t.tables, t.packs);
	return r && (n["system.subspeciesOf"] = r), i && (n["system.tables.career"] = i), Object.keys(n).length ? (await e.update(n), !0) : !1;
}
function $() {
	let e = Reflect.get(globalThis, "game"), t = Reflect.get(globalThis, "CONFIG");
	return {
		modules: e.modules,
		models: t.Item.dataModels,
		packs: e.packs,
		items: e.items,
		tables: e.tables
	};
}
function Rr() {
	let e = () => {
		let e = game?.packs.get(Ar);
		e && Pr(e, () => Q($()), (e) => ui.notifications.warn(e)), Nr($().items, () => Q($()), (e) => ui.notifications.warn(e));
	};
	Hooks.on("setup", e), Hooks.once("ready", () => {
		e(), game?.user.isGM && !Q($()) && ui.notifications.warn(Z);
	});
	let t = /* @__PURE__ */ new WeakSet();
	Hooks.on("renderCompendium", (e, n) => {
		if (!(e.collection?.collection !== "fvtt-wfrp-ratter.ratter-species" || !(n instanceof HTMLElement) || t.has(n))) {
			t.add(n);
			for (let e of [
				"click",
				"contextmenu",
				"dragstart"
			]) n.addEventListener(e, (e) => {
				Q($()) || !(e.target instanceof Element) || !e.target.closest("[data-entry-id]") || (e.preventDefault(), e.stopImmediatePropagation(), ui.notifications.warn(Z));
			}, { capture: !0 });
		}
	});
	let n = /* @__PURE__ */ new Set(), r = !1, i = async () => {
		if (r) return;
		r = !0;
		let e = !1;
		try {
			for (; n.size;) {
				let t = n.values().next().value;
				if (!t) break;
				n.delete(t), e = await Lr(t, $()) || e;
			}
			e && ui.notifications.warn("Ratter species imported and world references linked. Reload the world to register Vampire and its bloodlines in Customizers character creation. Choose a starting bloodline gift and five different Weaknesses manually.");
		} catch (e) {
			n.clear(), ui.notifications.error(`Ratter species references could not be linked: ${e instanceof Error ? e.message : String(e)}. Correct the world parent/career references before reloading.`);
		} finally {
			r = !1;
		}
	};
	Hooks.on("createItem", (e, t, r) => {
		let a = e;
		r !== game?.user.id || !game?.user.isGM || a.parent || a.pack || !Fr(a) || (n.add(a), Promise.resolve().then(i));
	});
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function zr() {
	Hooks.once("init", () => {
		Zn(), Yn(), er(), ct(), lr(), Dn(), Rr();
	}), Hooks.once("ready", async () => {
		Or();
		try {
			await Er(), await ar(Reflect.get(globalThis, "canvas"));
		} catch (e) {
			g(e);
		}
	});
}
//#endregion
//#region src/main.ts
zr();
//#endregion

//# sourceMappingURL=fvtt-wfrp-ratter.mjs.map