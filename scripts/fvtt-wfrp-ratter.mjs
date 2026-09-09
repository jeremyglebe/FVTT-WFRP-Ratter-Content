import { A as e, C as t, D as n, E as r, G as i, H as a, J as o, K as s, O as c, Q as l, S as u, T as d, U as ee, W as te, Z as ne, _ as re, a as f, b as ie, c as ae, d as p, et as oe, f as m, g as h, h as g, i as se, it as ce, j as le, k as ue, m as _, nt as de, o as fe, p as v, q as pe, r as y, rt as b, s as me, t as he, tt as ge, u as _e, v as ve, w as x, x as ye, y as be } from "../mutation-drop-BHS5UE2d.js";
//#region src/module/wfrp4e/mutants-handbook/mutation-results.ts
function xe(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.type === "mutation" && typeof t.name == "string" && typeof t.toObject == "function" && !!t.system;
}
function Se(e) {
	let t = e.toObject();
	return delete t._id, delete t._key, delete t._stats, delete t.folder, delete t.ownership, t;
}
function Ce(e) {
	return {
		data: {
			effects: [],
			flags: { [b]: {
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
async function we(e, t) {
	if (!e.documentUuid) {
		if (t === "khorne" && e.name.trim().toLowerCase() === "prejudice") return Ce(e);
		throw Error(`The table result ${e.name} does not link to a mutation Item.`);
	}
	let n = await fromUuid(e.documentUuid);
	if (!xe(n)) throw Error(`The table result ${e.name} does not resolve to a mutation Item.`);
	let r = s(n.system.mutationType.value);
	if (!r) throw Error(`The mutation ${n.name} has no physical or mental classification.`);
	let i = n.getFlag(b, "mutationAutomation")?.acquisition;
	return {
		...i ? { acquisition: i } : {},
		data: Se(n),
		name: n.name,
		nature: r
	};
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/outcomes.ts
function Te(e) {
	return {
		toughness: Number(e.system.characteristics.t.bonus),
		willpower: Number(e.system.characteristics.wp.bonus)
	};
}
function Ee(e, t) {
	return a(t, Te(e));
}
function De(e) {
	return `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
}
async function Oe(e, t) {
	return Number(e.system.status.resilience.value) > 0 && await _e(e.name, t);
}
async function ke(e, t, n, r = {}) {
	let i = {
		...r,
		"system.status.corruption.value": ee(Number(e.system.status.corruption.value), t)
	};
	n && (i["system.status.resilience.value"] = Math.max(0, Number(e.system.status.resilience.value) - 1)), await le(e, i);
}
async function Ae(e, t) {
	if (!game) throw Error("Foundry game global is unavailable while applying Chosen of Chaos.");
	let r = game.i18n.localize("FVTT_WFRP_RATTER.Mutations.ChosenOutcome");
	if (await Oe(e, r)) {
		let n = Ee(e, t);
		return await ke(e, n, !0), await m(p("Resisted", {
			loss: n,
			mutation: r,
			name: e.name
		})), !0;
	}
	let i = await me(e.name);
	if (!i) return _(p("PatronRequired", { name: e.name })), !1;
	let a = u(e), o = Ee(e, t);
	if (await n(e, i), await ke(e, o, !1), a && (await d(e), await y(e.uuid)), await m(p("Chosen", {
		loss: o,
		name: e.name,
		patron: De(i)
	})), a) {
		let t = p("PossessedRemoved", { name: e.name });
		_(t), await m(t);
	}
	return !0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/patron-notes.ts
var je = {
	khorne: "Use only Ape/Monkey, Bear, Boar/Pig, Bovine, Canine, or Goat/Sheep.",
	nurgle: "Use only Ape/Monkey, Bear, Boar/Pig, Bovine, Deer/Elk, Goat/Sheep, Horse/Camel, Insect, Pachyderm, or Spider.",
	slaanesh: "Use only Amphibian, Arthropod, Fish, Feline, Lizard/Snake, or Mollusca.",
	tzeentch: "Use only Bat, Bird, Fish, Insect, Mollusca, or Spider."
}, Me = {
	khorne: "Use only Daemonic, Mechanoid, or Metal.",
	nurgle: "Use only Daemonic, Fenbeast, or Undead.",
	slaanesh: "Use only Daemonic or Metal.",
	tzeentch: "Use only Daemonic or Mechanoid."
}, Ne = {
	khorne: "Use only Destruction, Drugs, or Pain.",
	nurgle: "Use only Devotion, Gluttony, or Service.",
	slaanesh: "Use only Art, Lust, or Pain.",
	tzeentch: "Use only Gambling, Greed, or Theft."
}, Pe = {
	khorne: "Use only Leathery Hide, Fur, or Metal.",
	slaanesh: "Use only Rubbery Skin, Scales, or Carapace."
}, Fe = /* @__PURE__ */ new Set([
	"bestial arms",
	"bestial body",
	"bestial head",
	"bestial legs",
	"bestial limbs"
]), Ie = /* @__PURE__ */ new Set([
	"unnatural arms",
	"unnatural body",
	"unnatural head",
	"unnatural legs",
	"unnatural limbs"
]);
function Le(e, t) {
	let n = t.trim().toLowerCase();
	if (Fe.has(n)) return je[e];
	if (Ie.has(n)) return Me[e];
	if (n === "addiction") return Ne[e];
	if (n === "mark of chaos") return `The mark is the Mark of ${e.charAt(0).toUpperCase()}${e.slice(1)}.`;
	if (n === "protective skin") return Pe[e];
	if (e === "khorne" && n === "prejudice") return "This automation treats Prejudice as mental for Corruption reduction and mutation limits.";
	if (e === "nurgle" && n === "corrupted blood") return "The source attaches a mismatched footnote listing Leathery Hide, Bark, and Carapace; the GM must decide how to handle it.";
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/tables.ts
function Re(e) {
	return typeof e == "object" && !!e && "draw" in e;
}
async function ze(e) {
	let t = game?.packs.get(oe);
	if (!t) throw Error(`The required compendium ${oe} is unavailable.`);
	let n = await t.getDocument(e);
	if (!Re(n)) throw Error(`The required Mutant's Handbook table ${e} is unavailable.`);
	return n;
}
async function S(e, t, n = !0) {
	let r = (await (await ze(e)).draw({
		displayChat: n,
		messageMode: "gm",
		recursive: !0,
		...t ? { roll: new Roll(t) } : {}
	})).results[0];
	if (!r) throw Error(`The Mutant's Handbook table ${e} returned no result.`);
	return r;
}
function Be(e) {
	return S(de[e]);
}
function Ve(e) {
	let t = te(e), n = t > 0 ? `1d100 + ${t}` : "1d100";
	return S(ge, n);
}
function He(e, t) {
	return S(ne[t][e], void 0, !1);
}
function Ue(e) {
	return S(l[e], void 0, !1);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/workflow.ts
function We(e) {
	return `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
}
async function Ge(e, t) {
	if (t !== "unassigned") return t;
	let r = await me(e.name);
	if (!r) {
		_(p("PatronRequired", { name: e.name }));
		return;
	}
	return await n(e, r), r;
}
async function Ke(e, t) {
	let n = await Ge(e, t);
	if (!n) return !1;
	let r = await we(await Ue(n), n);
	await be(e, r);
	let i = Le(n, r.name);
	return i && await m(p("PatronRestriction", {
		mutation: r.name,
		note: i,
		patron: We(n)
	})), !0;
}
async function qe(e) {
	let t = e.system.details.species.value, n = i(t) ?? await ae(e.name, t);
	if (!n) return _(p("SpeciesRequired", { name: e.name })), !1;
	let r = await Be(n), a = s(r.name);
	if (!a) throw Error(`The nature table returned an unrecognized result: ${r.name}.`);
	let o = await Ve(ye(e).total), c = pe(o.name);
	if (!c) throw Error(`The severity table returned an unrecognized result: ${o.name}.`);
	if (c === "chosen") return Ae(e, a);
	let l = await He(a, c);
	if (!l.documentUuid && pe(l.name) === "chosen") return Ae(e, a);
	let u = await we(l);
	if (u.nature !== a) throw Error(`${u.name} does not match the rolled ${a} mutation table.`);
	return await be(e, u), !0;
}
async function Je(e) {
	if (ue(e).length > 1) return _(p("PatronConflict", { name: e.name })), !1;
	let t = c(e);
	return t ? Ke(e, t) : qe(e);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/corruption-chat.ts
var Ye = "mutantsHandbookCorruptionFlow", C = /* @__PURE__ */ new Set(), w = /* @__PURE__ */ new Map();
function T(e) {
	let t = e.flags?.[b]?.[Ye];
	if (typeof t != "object" || !t) return;
	let n = t;
	if (!(typeof n.actorUuid != "string" || n.status !== "complete" && n.status !== "pending" || n.version !== 1)) return n;
}
async function E(e, t) {
	if (typeof e.setFlag != "function") throw Error("Foundry cannot store the Mutant's Handbook chat-card state.");
	await e.setFlag(b, Ye, t);
}
async function Xe(e, t) {
	let n = t.context.messageId, r = n ? game?.messages.get(n) : void 0;
	if (!n || !r) throw Error("The Endurance Test did not create a chat message to continue from.");
	let i = r.system.test?.failed ?? t.failed;
	if (await E(r, {
		actorUuid: e.uuid,
		status: i ? "pending" : "complete",
		version: 1
	}), i) try {
		await ve(e, n);
	} catch (e) {
		throw await E(r, null), e;
	}
}
async function Ze(e) {
	let t = T(e), n = e.id;
	if (!t || t.status !== "pending" || !n || C.has(n)) return !1;
	C.add(n);
	try {
		let r = await fromUuid(t.actorUuid);
		if (!x(r)) throw Error(`${t.actorUuid} no longer resolves to a WFRP4e character Actor.`);
		let i = h(r);
		if (i?.kind !== "test" || i.messageId !== n) throw Error(`${r.name} is no longer waiting on this Corruption Test.`);
		let a = e.system.test;
		if (!a) throw Error("The Corruption Test chat message no longer contains its WFRP Test data.");
		if (a.failed) {
			if (!await Je(r)) return !1;
			let e = h(r);
			e?.kind === "test" && e.messageId === n && await g(r);
		} else await g(r);
		return await E(e, {
			...t,
			status: "complete"
		}), !0;
	} finally {
		C.delete(n);
	}
}
async function Qe(e) {
	let t = e.system.test?.context.previousMessage;
	if (!t || !e.id) return !1;
	let n = game?.messages.get(t), r = n ? T(n) : void 0;
	if (!n || !r || r.status !== "pending") return !1;
	let i = await fromUuid(r.actorUuid);
	if (!x(i)) throw Error(`${r.actorUuid} no longer resolves to a WFRP4e character Actor.`);
	let a = e.system.test?.failed;
	if (typeof a != "boolean") return !1;
	await E(e, {
		actorUuid: r.actorUuid,
		status: a ? "pending" : "complete",
		version: 1
	});
	let o = h(i);
	return o?.kind === "test" && o.messageId === t && (a ? await ve(i, e.id) : await g(i)), typeof n.delete == "function" ? await n.delete() : await E(n, null), !0;
}
async function $e(e) {
	let t = e.id;
	if (!t) return !1;
	let n = w.get(t);
	if (n) return n;
	let r = Qe(e).finally(() => {
		w.delete(t);
	});
	return w.set(t, r), r;
}
function et(e) {
	return game?.user.isGM === !0 || e.isAuthor === !0;
}
function tt(e, t) {
	let n = T(e);
	if (!n || e.system.test?.failed !== !1) return !1;
	if (!t.querySelector("[data-ratter-corruption-result=\"success\"]")) {
		let e = document.createElement("p");
		e.dataset.ratterCorruptionResult = "success", e.textContent = game.i18n.localize("FVTT_WFRP_RATTER.Mutations.CorruptionHeld"), (t.querySelector(".message-content") ?? t).append(e);
	}
	return n.status === "pending" && Ze(e).catch(v), !0;
}
function nt(e, t) {
	let n = T(e);
	if (tt(e, t) || !n || n.status !== "pending" || e.system.test?.failed !== !0 || !et(e) || t.querySelector("[data-ratter-action=\"continue-corruption\"]")) return;
	let r = document.createElement("button");
	r.type = "button", r.classList.add("chat-button"), r.dataset.ratterAction = "continue-corruption", r.innerHTML = `<i class="fa-solid fa-forward"></i> ${game.i18n.localize("FVTT_WFRP_RATTER.Mutations.ContinueCorruption")}`, r.addEventListener("click", async () => {
		r.disabled = !0;
		try {
			await Ze(e) || (r.disabled = !1);
		} catch (e) {
			r.disabled = !1, v(e);
		}
	}), (t.querySelector(".message-content") ?? t).append(r);
}
function rt() {
	Hooks.on("createChatMessage", (e) => {
		$e(e).catch(v);
	}), Hooks.on("renderChatMessageHTML", (e, t) => {
		if (typeof t != "object" || !t || !(t instanceof HTMLElement)) return;
		let n = e;
		nt(n, t), !T(n) && n.system.test?.context.previousMessage && $e(n).then(() => nt(n, t)).catch(v);
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/check.ts
var it = /* @__PURE__ */ new Set();
async function at(e) {
	let n = e.system.status.corruption;
	if (!(Number(n.value) <= Number(n.max) || it.has(e.uuid) || re(e) || t(e))) {
		if (!game) throw Error("Foundry game global is unavailable during a corruption check.");
		it.add(e.uuid);
		try {
			let t = game.i18n.localize("NAME.Endurance"), n = {
				fields: { difficulty: "challenging" },
				[o]: !0,
				skipTargets: !0,
				title: game.i18n.format("DIALOG.MutateTitle", { test: t })
			}, r = e.has(t, "skill"), i = r ? await e.setupSkill(r, n) : await e.setupCharacteristic("t", n);
			if (!i) return;
			await i.roll(), await Xe(e, i);
		} finally {
			it.delete(e.uuid);
		}
	}
}
async function ot(e) {
	let t = await fromUuid(e);
	if (!x(t)) throw Error(`${e} does not resolve to a WFRP4e character Actor.`);
	await at(t);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/documents.ts
function D(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function st(e) {
	return D(e) ? e : void 0;
}
function ct(e) {
	return D(e) ? e : void 0;
}
function lt(e) {
	return D(e) ? e : void 0;
}
function O(e) {
	return D(e.context) || (e.context = {}), e.context;
}
function ut(e) {
	let t = e.flags?.[b]?.mutationAction;
	return D(t) && typeof t.actionId == "string" ? t.actionId : void 0;
}
function dt(e, t, n) {
	let r = n.context?.mutationActionId, i = n.preData?.options?.mutationActionId, a = n.item;
	return r === t || i === t || a?.id === e.id || a?.uuid !== void 0 && a.uuid === e.uuid;
}
function ft(e) {
	try {
		return e.items ? [...e.items] : [];
	} catch {
		return [];
	}
}
function k(e, t) {
	return (e.itemTypes?.mutation ?? ft(e)).filter((e) => {
		if (e.type !== void 0 && e.type !== "mutation") return !1;
		let n = e.flags?.[b], r = n?.mutationAutomation;
		return (D(r) ? r.definitionId : e.id) === t && n?.mutantsHandbookRetired !== !0 && n?.mutantsHandbookPossessionRemoved !== !0;
	}).length;
}
function pt(e, t) {
	return mt(e, t)[0];
}
function mt(e, t) {
	return (e.itemTypes?.mutation ?? ft(e)).filter((e) => {
		if (e.type !== void 0 && e.type !== "mutation") return !1;
		let n = e.flags?.[b], r = n?.mutationAutomation;
		return (D(r) ? r.definitionId : e.id) === t && n?.mutantsHandbookRetired !== !0 && n?.mutantsHandbookPossessionRemoved !== !0;
	});
}
function ht(e) {
	let t = e?.flags?.[b]?.mutationAutomation, n = e?.getFlag?.(b, "mutationAutomation"), r = D(t) ? t : D(n) ? n : void 0, i = D(r?.state) ? r.state : void 0, a = D(i?.acquisition) ? i.acquisition : void 0;
	return a?.status === "resolved" ? a : {};
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/usage.ts
var gt = "mutationActionUsage", _t = 28800, vt = "dimensional-instability-teleport", A = /* @__PURE__ */ new Map();
function j() {
	return Reflect.get(globalThis, "game");
}
function yt() {
	let e = Number(j()?.time?.worldTime);
	return Number.isFinite(e) ? e : Math.floor(Date.now() / 1e3);
}
function bt(e) {
	let t = e.flags?.[b]?.[gt];
	if (!D(t) || t.version !== 1 || !D(t.actions)) return {
		actions: {},
		version: 1
	};
	let n = {};
	for (let [e, r] of Object.entries(t.actions)) Array.isArray(r) && (n[e] = r.filter((e) => D(e) && typeof e.id == "string" && Number.isFinite(e.at) && typeof e.period == "string" && typeof e.targetId == "string"));
	return {
		actions: n,
		version: 1
	};
}
function xt(e, t) {
	return e === "day" ? `day:${Math.floor(t / 86400)}` : e === "scene" ? `scene:${j()?.combat?.id ?? j()?.scene?.id ?? "none"}` : e ?? "use";
}
function St(e) {
	if (typeof e == "string") return e;
	if (D(e)) for (let t of [
		"token",
		"id",
		"uuid",
		"actor"
	]) {
		let n = e[t];
		if (typeof n == "string") return n;
		if (D(n)) {
			let e = n.uuid ?? n.id;
			if (typeof e == "string") return e;
		}
	}
}
function Ct(e, t) {
	if (!e.usage?.perTarget) return ["*"];
	let n = t?.context?.targets, r = Array.isArray(n) ? n : [...j()?.user?.targets ?? []], i = [...new Set(r.map(St).filter((e) => !!e))];
	return i.length ? i : ["untargeted"];
}
function M(e, t, n = yt()) {
	let r = bt(t).actions[e.id] ?? [];
	if (e.id === vt) return r;
	if (e.usage?.period === "eight-hours") return r.filter((e) => e.at > n - _t);
	let i = xt(e.usage?.period, n);
	return r.filter((e) => e.period === i);
}
function wt(e, t) {
	let n = e.usage?.max;
	return n === "tb" ? Math.max(0, Number(t.system?.characteristics?.t?.bonus) || 0) : typeof n == "number" ? n : Infinity;
}
function Tt(e) {
	let t = O(e), n = t.mutationActionUseId;
	if (typeof n == "string" && n) return n;
	let r = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
	return t.mutationActionUseId = r, r;
}
function Et(e, t, n, r) {
	let i = wt(e, t), a = M(e, n), o = r?.context?.mutationActionUseId;
	return Ct(e, r).every((e) => {
		let t = a.filter((t) => t.targetId === e);
		return t.some((e) => e.id === o) || t.length < i;
	});
}
function Dt(e, t, n, r) {
	let i = r?.context?.mutationActionUseId;
	return typeof i == "string" && M(e, n).some((e) => e.id === i) ? !0 : (Number(t.system?.status?.advantage?.value) || 0) >= (e.usage?.advantageCost ?? 0) && Et(e, t, n, r);
}
function Ot(e, t) {
	if (e.mutationName !== "Dimensional Instability") return e.test?.difficulty;
	let n = [
		"average",
		"challenging",
		"difficult",
		"hard",
		"vhard"
	];
	return n[Math.min(n.length - 1, M(e, t).length)];
}
async function kt(e, t) {
	if (t <= 0) return;
	if (e.modifyAdvantage) {
		await e.modifyAdvantage(-t);
		return;
	}
	let n = Number(e.system?.status?.advantage?.value) || 0;
	await e.update?.({ "system.status.advantage.value": Math.max(0, n - t) });
}
async function At(e, t, n, r) {
	let i = Tt(r);
	if (e.id === vt) {
		let e = n.flags?.[b]?.mutationRest, t = D(e) ? e.id : "initial";
		r.preData ??= {};
		let i = r.preData.options ??= {};
		if (i.mutationActionRestEpoch ??= t, i.mutationActionRestEpoch !== t) return !0;
	}
	if (!Dt(e, t, n, r)) return !1;
	let a = bt(n), o = a.actions[e.id] ?? [];
	if (o.some((e) => e.id === i)) return !0;
	await kt(t, e.usage?.advantageCost ?? 0);
	let s = yt(), c = xt(e.usage?.period, s), l = Ct(e, r).map((e) => ({
		at: s,
		id: i,
		period: c,
		targetId: e
	})), u = e.id === vt ? o : o.filter((e) => e.at > s - 2764800).slice(-99);
	return a.actions[e.id] = [...u, ...l], await n.update?.({ [`flags.${b}.${gt}`]: a }), !0;
}
async function jt(e, t, n, r) {
	let i = `${n.uuid ?? n.id ?? "item"}:${e.id}`, a = (A.get(i) ?? Promise.resolve(!0)).catch(() => !1).then(() => At(e, t, n, r));
	A.set(i, a);
	try {
		return await a;
	} finally {
		A.get(i) === a && A.delete(i);
	}
}
function Mt(e, t) {
	return M(e, t).length;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/card.ts
var N = "data-ratter-mutation-action";
function P(e) {
	return String(e ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
}
function Nt(e) {
	return Array.isArray(e) ? e.filter((e) => typeof e == "string") : typeof e == "string" && e ? [e] : [];
}
function F(e, t) {
	let n = Nt(t);
	return n.length ? `<p><strong>${P(e)}:</strong> ${n.map(P).join("; ")}</p>` : "";
}
function Pt(e, t, n, r) {
	let i = Number(r.result?.SL), a = t.system?.characteristics?.wp, o = Math.max(1, k(t, e.mutationId)), s = [
		Number.isFinite(i) ? `SL ${i}` : void 0,
		Number.isFinite(Number(a?.value)) ? `WP ${Number(a?.value)}` : void 0,
		Number.isFinite(Number(a?.bonus)) ? `WPB ${Number(a?.bonus)}` : void 0,
		`mutation level ${o}`
	].filter((e) => !!e);
	return e.usage?.period && s.push(`uses this ${e.usage.period}: ${Mt(e, n)}`), s.join("; ");
}
function Ft(e, t) {
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
function It(e, t, n, r) {
	let i = Nt(e.conditions), a = f(e.id).length ? "<p><strong>Automation:</strong> After accepting the final roll, right-click this chat card and choose Apply Mutant’s Handbook Outcome.</p>" : "";
	return [
		`<section ${N}="${P(e.id)}">`,
		`<p><strong>${P(e.mutationName)} — ${P(e.name)}</strong></p>`,
		F("Target", e.target),
		F("Range", e.range),
		F("Duration", e.duration),
		F("Outcome", e.outcome),
		F("Rules", e.rules),
		i.length ? `<p><strong>Condition guidance:</strong> ${i.map(P).join("; ")}. Apply these only after the final roll is accepted.</p>` : "",
		`<p><strong>Rolled values:</strong> ${P(Pt(e, t, n, r))}</p>`,
		a,
		"</section>"
	].join("");
}
function Lt(e, t, n, r) {
	!dt(n, e.id, r) || !r.result || (Ft(e, r), r.result.other ??= [], r.result.other = r.result.other.filter((e) => !e.includes(N)), r.result.other.push(It(e, t, n, r)));
}
function Rt(e) {
	let t = f(e.id).length ? "<p><strong>Automation:</strong> Right-click this chat card and choose Apply Mutant’s Handbook Outcome.</p>" : "";
	return [
		`<section ${N}="${P(e.id)}">`,
		`<h3>${P(e.mutationName)} — ${P(e.name)}</h3>`,
		F("Target", e.target),
		F("Range", e.range),
		F("Duration", e.duration),
		F("Outcome", e.outcome),
		F("Rules", e.rules),
		F("Condition guidance", e.conditions),
		t,
		"</section>"
	].join("");
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/outcome-documents.ts
function zt(e) {
	let t = e.system?.test, n = t?.options?.mutationActionId ?? t?.preData?.options?.mutationActionId;
	if (typeof n == "string") return n;
	let r = e.flags?.[b]?.mutationActionOutcome;
	return D(r) && typeof r.actionId == "string" ? r.actionId : void 0;
}
function Bt(e) {
	return e.flags?.[b]?.mutationActionOutcomeApplied === !0;
}
async function Vt(e) {
	await e.setFlag?.(b, "mutationActionOutcomeApplied", !0);
}
function Ht(e) {
	if (!D(e)) return;
	let t = e.actor;
	return D(t) ? t : e;
}
function Ut(e) {
	let t = e?.targets?.filter((e) => D(e)) ?? [];
	return t.length ? t : [...Reflect.get(globalThis, "game")?.user?.targets ?? []].flatMap((e) => Ht(e) ?? []);
}
async function Wt(e) {
	let t = e.system?.test ? Reflect.get(e.system.test, "actor") : void 0;
	if (D(t)) return t;
	let n = e.flags?.[b]?.mutationActionOutcome, r = D(n) ? n.actorUuid : void 0;
	if (typeof r != "string") return;
	let i = await Reflect.get(globalThis, "fromUuid")?.(r);
	return D(i) ? i : void 0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/effect-helpers.ts
function I(e, t = 0) {
	let n = Number(e);
	return Number.isFinite(n) ? n : t;
}
function L(e, t, n) {
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
function R(e, t) {
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
var Gt = "Compendium.wfrp4e-core.items.Item.EO05HX7jql0g605A";
async function Kt(e, t, n) {
	let r = t === "ActiveEffect" ? e.effects : e.items, i = r ? [...r].filter((e) => e.flags?.[b]?.actionId === n).map(({ id: e }) => e).filter((e) => typeof e == "string") : [];
	i.length && await e.deleteEmbeddedDocuments?.(t, i);
}
function z(e, t, n) {
	return {
		changes: [],
		description: n,
		disabled: !1,
		duration: R(),
		flags: {
			[b]: {
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
function qt(e, t, n) {
	return {
		levels: Math.max(1, k(e, t.mutationId)),
		sl: I(n?.result?.SL),
		wp: I(e.system?.characteristics?.wp?.value),
		wpb: I(e.system?.characteristics?.wp?.bonus)
	};
}
async function Jt(e, t, n) {
	if (!e.createEmbeddedDocuments) return;
	let { levels: r, sl: i, wpb: a } = qt(e, t, n), o = Math.max(1, a + i) * 2 ** (r - 1), s = (await Reflect.get(globalThis, "fromUuid")?.(Gt))?.toObject?.();
	if (!s) return;
	await Kt(e, "Item", t.id), delete s._id, s.name = `${t.mutationName} — Flight (${30 * r})`;
	let c = s.system ??= {}, l = c.specification ??= {};
	l.value = String(30 * r);
	let u = s.flags ??= {};
	u[b] = {
		actionId: t.id,
		automationPhase: "mutation-phase-5",
		rounds: o
	};
	let d = Array.isArray(s.effects) ? s.effects : [];
	d.push({
		...z(t, "Levitation duration", `Expires after ${o} rounds.`),
		system: {
			scriptData: [L("Expire Mutant's Handbook outcome", "endRound", `const key = "flags.${b}.rounds";\nconst left = Number(this.item.getFlag("${b}", "rounds")) - 1;\nif (left <= 0) return this.item.delete();\nreturn this.item.update({[key]: left});`)],
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
function Yt(e, t, n, r, i = t) {
	let { levels: a, sl: o, wp: s, wpb: c } = qt(i, n, r);
	if (e === "invisible") {
		let e = Math.max(1, s + o) * 2 ** (a - 1), t = z(n, "Invisible", "Ends early after an attack or conspicuously loud noise.");
		return t.duration = R(e), t.statuses = ["invisible"], t.img = "icons/svg/invisible.svg", t;
	}
	if (e === "entrancement") {
		let e = Math.max(1, c + o), t = z(n, `${n.mutationName} — Entranced`, `The source mutant gains +20 to social interactions with this Actor for ${e} hours.`);
		return t.duration = R(void 0, e * 3600), t;
	}
	if (e === "camouflage") {
		let e = z(n, "Chameleon Camouflage (Scene)", "+20 to Stealth while the skin still matches the surroundings; delete when the scene changes."), t = e.system;
		return t.scriptData = [L("Expire Mutant's Handbook outcome", "dialog", "if (args.skill?.name?.toLowerCase().includes(\"stealth\")) args.fields.modifier += 20;"), L("Expire Mutant's Handbook outcome", "endCombat", "return this.effect.delete();")], e;
	}
	if (e === "foresight") {
		let e = I(t.system?.status && t.system.status.fortune ? t.system.status.fortune.value : 0), r = z(n, "Oracle Foresight (Scene)", `+10 Initiative and ${a} temporary Fortune; delete when the scene ends.`);
		r.changes = [{
			key: "system.characteristics.i.modifier",
			mode: 2,
			priority: null,
			value: "10"
		}];
		let i = r.system;
		i.scriptData = [L("Expire Mutant's Handbook outcome", "endCombat", "return this.effect.delete();"), L("Expire Mutant's Handbook outcome", "deleteEffect", `const current = Number(this.actor.system.status.fortune.value);\nif (current > ${e}) return this.actor.update({"system.status.fortune.value": ${e}});`)];
		let o = r.flags, s = o[b] ??= {};
		return s.baseFortune = e, s.fortune = a, r;
	}
	let l = Math.max(1, s);
	if (e === "temporal-surge") {
		let e = z(n, "Temporal Surge (This Turn)", "One additional Movement and Action are available during the current turn.");
		e.duration = R();
		let t = e.system;
		return t.scriptData = [L("Expire Mutant's Handbook outcome", "endTurn", "return this.effect.delete();")], e;
	}
	let u = z(n, "Telekinesis Active", `May move matter at WPB yards per round for ${l} rounds.`);
	return u.duration = R(l), u;
}
async function Xt(e, t, n, r, i = t) {
	if (e === "levitation") return Jt(t, n, r);
	await Kt(t, "ActiveEffect", n.id);
	let a = Yt(e, t, n, r, i);
	if (await t.createEmbeddedDocuments?.("ActiveEffect", [a]), e === "foresight") {
		let e = Math.max(1, k(t, n.mutationId)), r = t.system?.status?.fortune, i = I(r?.value);
		await t.update?.({ "system.status.fortune.value": i + e });
	}
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/form-items.ts
var Zt = {
	Contortionist: "Compendium.wfrp4e-core.items.Item.TaYriYcJkFuIdBKp",
	Frenzy: "Compendium.wfrp4e-core.items.Item.hXcfygzujgyMN1uI",
	Painless: "Compendium.wfrp4e-core.items.Item.wMwSRDmgiF2IdCJr"
};
function Qt(e, t, n) {
	let r = /^(.*) (\d+)$/.exec(e), i = r?.[1] ?? e, a = r?.[2] ?? (i === "Fear" ? "1" : "");
	return {
		effects: [],
		flags: { [b]: {
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
async function $t(e, t, n) {
	let r = Reflect.get(globalThis, "fromUuid"), i = (Zt[e] ? await r?.(Zt[e]) : void 0)?.toObject?.() ?? Qt(e, t, n);
	delete i._id;
	let a = D(i.flags) ? i.flags : {};
	return i.flags = a, a[b] = {
		automationPhase: "mutation-phase-5",
		mutationForm: n
	}, i;
}
async function en(e, t, n) {
	n.length && await e.createEmbeddedDocuments?.("Item", await Promise.all(n.map(([e, n]) => $t(e, n, t))));
}
function tn(e) {
	return Array.isArray(e.grants) ? e.grants.filter(D) : [];
}
async function nn(e, t, n) {
	let r = Reflect.get(globalThis, "fromUuid"), i = [];
	for (let e of tn(n)) {
		let n = (typeof e.sourceUuid == "string" ? await r?.(e.sourceUuid) : void 0)?.toObject?.();
		if (!n) continue;
		delete n._id;
		let a = D(n.flags) ? n.flags : {};
		n.flags = a, a[b] = {
			automationPhase: "mutation-phase-5",
			mutationForm: t
		}, i.push(n);
	}
	i.length && await e.createEmbeddedDocuments?.("Item", i);
}
function rn(e) {
	return (Array.isArray(e.modifiers) ? e.modifiers.filter(D) : []).flatMap((e) => {
		let t = I(e.value, NaN);
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
function an(e) {
	let t = Array.isArray(e.modifiers) ? e.modifiers.filter((e) => D(e) && e.kind === "test") : [];
	return t.length ? L("Resolve Mutant's Handbook form", "dialog", `const modifiers = ${JSON.stringify(t)};\nconst skillName = args.skill?.name ?? args.test?.item?.name ?? "";\nconst characteristic = args.characteristic ?? args.test?.characteristicKey;\nfor (const modifier of modifiers) {\n  const matchesSkill = (modifier.skills ?? []).some(name => skillName === name || skillName.startsWith(name + " ("));\n  const matchesCharacteristic = (modifier.characteristics ?? []).includes(characteristic);\n  if (!matchesSkill && !matchesCharacteristic) continue;\n  const current = Number(args.fields.modifier);\n  const next = current + Number(modifier.value);\n  if (Number.isFinite(next)) args.fields.modifier = next;\n}`) : void 0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/forms.ts
var on = [
	"ws",
	"bs",
	"s",
	"t",
	"ag",
	"dex"
], sn = {
	A7OLAWKXWUfh0UGU: "ethereal",
	XheCM6GZG8FhAoGp: "mirror-image",
	NDDLEunW5biRvTfy: "shapeshifter",
	JtmI1wOwKqWT4zVG: "skinwalker",
	q3sK3RsdsJxrifZP: "swarmform",
	jPlCrsK3hTgkHsTR: "warp-spasm",
	mNNavbJayRcsyeXJ: "werebeast"
};
function cn(e) {
	try {
		return e.items ? [...e.items] : [];
	} catch {
		return [];
	}
}
async function ln(e, t) {
	let n = cn(e).filter((e) => e.flags?.[b]?.mutationForm === t).flatMap((e) => e.id ? [e.id] : []), r = [...e.effects ?? []].filter((e) => e.flags?.[b]?.mutationForm === t).flatMap((e) => e.id ? [e.id] : []);
	return n.length && await e.deleteEmbeddedDocuments?.("Item", n), r.length && await e.deleteEmbeddedDocuments?.("ActiveEffect", r), n.length > 0 || r.length > 0;
}
async function un(e, t) {
	let n = sn[t];
	!n || k(e, t) > 0 || await ln(e, n);
}
function B(e, t, n, r, i) {
	let a = `const ids = (this.actor.items ?? []).filter(item => item.flags?.["${b}"]?.mutationForm === "${t}").map(item => item.id);\nif (ids.length) await this.actor.deleteEmbeddedDocuments("Item", ids);`;
	return {
		changes: [],
		description: n,
		disabled: !1,
		duration: R(r, i),
		flags: {
			[b]: {
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
			scriptData: [L("Resolve Mutant's Handbook form", "deleteEffect", a)],
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
function V(e, t) {
	let n = (D(e.selections) ? e.selections : {})[t];
	return String(Array.isArray(n) ? n[0] ?? "" : n ?? "");
}
function dn(e) {
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
async function fn(e, t, n, r, i, a) {
	if (await ln(n, e), t === "revert") return;
	let o = ht(pt(n, r.mutationId)), s = I(i?.result?.SL), c = B(r, e, r.outcome), l = [];
	if (e === "ethereal") c = B(r, e, r.outcome, Math.max(1, I(n.system?.characteristics?.wp?.bonus) + s)), l = [["Ethereal", "trait"]];
	else if (e === "mirror-image") {
		let t = Math.max(1, k(n, r.mutationId)), i = Math.max(1, I(n.system?.characteristics?.wp?.value) + s * 10) * 2 ** (t - 1);
		c = B(r, e, r.outcome, void 0, i * 60);
	} else if (e === "shapeshifter") {
		let t = Math.max(1, I(n.system?.characteristics?.t?.bonus) + s);
		c = B(r, e, r.outcome, void 0, t * 3600);
	} else if (e === "skinwalker" && a) {
		c.changes = on.flatMap((e) => {
			let t = I(a.system?.characteristics?.[e]?.value) - I(n.system?.characteristics?.[e]?.value);
			return t ? [{
				key: `system.characteristics.${e}.modifier`,
				mode: 2,
				priority: null,
				value: String(t)
			}] : [];
		});
		let e = I(a.system?.details?.move?.value, NaN);
		Number.isFinite(e) && c.changes.push({
			key: "system.details.move.value",
			mode: 5,
			priority: null,
			value: String(e)
		});
	} else if (e === "swarmform") {
		let e = dn(V(o, "swarm-source"));
		c.changes = [...e.move === void 0 ? [] : [{
			key: "system.details.move.value",
			mode: 5,
			priority: null,
			value: String(e.move)
		}], ...V(o, "swarm-size") ? [{
			key: "system.details.size.value",
			mode: 5,
			priority: null,
			value: V(o, "swarm-size")
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
			L("Resolve Mutant's Handbook form", "endCombat", "return this.effect.delete();"),
			L("Resolve Mutant's Handbook form", "deleteEffect", "await this.actor.addCondition(\"fatigued\", 1);")
		];
	} else if (e === "werebeast") {
		c.changes = rn(o);
		let t = an(o);
		if (t) {
			let e = c.system;
			e.scriptData = [...e.scriptData ?? [], t];
		}
		await nn(n, e, o);
	}
	await en(n, e, l), await n.createEmbeddedDocuments?.("ActiveEffect", [c]);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/companions.ts
function H(e, t) {
	let n = (D(e.selections) ? e.selections : {})[t];
	return String(Array.isArray(n) ? n[0] ?? "" : n ?? "");
}
function pn(e) {
	return e.split("-").filter(Boolean).map((e) => `${e[0]?.toUpperCase() ?? ""}${e.slice(1)}`).join(" ");
}
function mn(e, t, n) {
	let r = D(e.characteristics) ? e.characteristics : {};
	e.characteristics = r;
	let i = D(r[t]) ? r[t] : {};
	r[t] = i, i.initial = n, i.advances = 0, i.modifier = 0, i.value = n;
}
function U(e, t) {
	return [
		"personality",
		"motivation",
		"short-ambition",
		"long-ambition"
	].flatMap((n) => {
		let r = H(e, `${t}-${n}`);
		return r ? [`<p><strong>${pn(n)}:</strong> ${r}</p>`] : [];
	}).join("");
}
function hn(e, t, n) {
	let r = e.name ?? "Mutant";
	if (t === "spectral-companion") {
		let e = H(n, "companion-type") || "ghost";
		return {
			flags: {},
			img: "icons/magic/death/undead-ghost-scream-teal.webp",
			name: H(n, "companion-name") || `${r}'s ${pn(e)}`,
			system: { details: { notes: { value: U(n, "companion") } } },
			type: "creature"
		};
	}
	let i = e.toObject?.() ?? {};
	delete i._id, i.effects = [], i.flags = {}, i.folder = null, i.items = [], i.type = "creature";
	let a = D(i.system) ? i.system : {};
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
		})) mn(a, e, t);
		return a.details = {
			...D(a.details) ? a.details : {},
			move: { value: 2 },
			size: { value: "tiny" }
		}, a.status = {
			...D(a.status) ? a.status : {},
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
		mn(a, t, Number.isFinite(n) ? Math.max(0, r - n) : 0);
	}
	return a.details = {
		...D(a.details) ? a.details : {},
		move: { value: 0 },
		notes: { value: U(n, "twin") }
	}, a.status = {
		...D(a.status) ? a.status : {},
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
function gn(e, t) {
	let n = e.toObject?.() ?? {};
	delete n._id, n.name = `${e.name ?? "Mutant"}'s Symbiotic Twin`, Array.isArray(n.items) && (n.items = n.items.filter((e) => {
		if (!D(e) || !D(e.flags)) return !0;
		let t = e.flags[b];
		return !D(t) || !D(t.mutationAction) || t.mutationAction.actionId !== "symbiotic-twin-manifest";
	}));
	let r = D(n.system) ? n.system : {};
	n.system = r;
	let i = D(r.details) ? r.details : {};
	return r.details = i, i.notes = { value: U(t, "twin") }, n;
}
function _n(e, t) {
	let n = e.flags?.[b]?.mutationCompanions, r = D(n) ? n[t] : void 0;
	return typeof r == "string" ? [{ uuid: r }] : Array.isArray(r) ? r.flatMap((e) => D(e) && typeof e.uuid == "string" ? [{
		uuid: e.uuid,
		...typeof e.mutationItemId == "string" ? { mutationItemId: e.mutationItemId } : {}
	}] : []) : [];
}
async function vn(e, t) {
	let n = _n(e, t), r = Reflect.get(globalThis, "fromUuid");
	return r ? (await Promise.all(n.map(async (e) => await r(e.uuid) ? e : void 0))).filter((e) => e !== void 0) : n;
}
function yn(e, t) {
	let n = new Set(t.flatMap((e) => e.mutationItemId ? [e.mutationItemId] : []));
	return e.find((e) => !e.id || !n.has(e.id)) ?? e[t.length];
}
async function bn(e, t, n) {
	let r = mt(t, n.mutationId), i = await vn(t, e);
	if (!r.length || i.length >= r.length) return;
	let a = yn(r, i), o = ht(a), s = e === "symbiotic-twin" ? gn(t, o) : hn(t, e, o), c = D(s.flags) ? s.flags : {};
	s.flags = c, c[b] = {
		automationPhase: "mutation-phase-5",
		mutationCompanion: {
			hostUuid: t.uuid ?? t.id,
			kind: e,
			mutationId: n.mutationId
		}
	};
	let l = await Reflect.get(globalThis, "Actor")?.create?.(s), u = l?.uuid ?? l?.id;
	u && (await t.update?.({ [`flags.${b}.mutationCompanions.${e}`]: [...i, {
		mutationItemId: a?.id,
		uuid: u
	}] }), e === "symbiotic-twin" && (await t.update?.({ [`flags.${b}.mutationTwinUuid`]: u }), await l?.update?.({ [`flags.${b}.mutationTwinUuid`]: t.uuid ?? t.id })));
}
var W = /* @__PURE__ */ new Set();
function xn() {
	Hooks.on("updateActor", (e, t, n, r) => {
		let i = Reflect.get(globalThis, "game");
		if (typeof r == "string" && i?.user?.id !== r || !D(e) || !D(t)) return;
		let a = e, o = a.uuid ?? a.id, s = a.flags?.[b]?.mutationTwinUuid, c = D(t.system) ? t.system : void 0, l = D(c?.status) ? c.status : void 0, u = D(l?.wounds) ? l.wounds : void 0, d = t["system.status.wounds.value"] ?? u?.value;
		if (typeof o != "string" || typeof s != "string" || !Number.isFinite(Number(d)) || W.has(o)) return;
		let ee = Reflect.get(globalThis, "fromUuid");
		W.add(s), ee?.(s).then((e) => e?.update?.({ "system.status.wounds.value": Number(d) })).finally(() => W.delete(s));
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/outcomes.ts
var Sn = /* @__PURE__ */ new WeakSet();
function Cn(e) {
	return e ? typeof e.failed == "boolean" ? !e.failed : e.result?.outcome !== "failure" : !0;
}
function wn(e, t) {
	return e.when === "always" ? !0 : e.when === "success" ? Cn(t) : !Cn(t);
}
function Tn(e, t, n) {
	return e === "self" ? [t] : n;
}
async function En(e, t) {
	let n = Reflect.get(globalThis, "Roll");
	n && await (await new n(e).evaluate()).toMessage?.({ flavor: t });
}
async function Dn(e, t, n) {
	for (let r of t) {
		let t = {
			appendTitle: ` — ${n} follow-up`,
			fields: { difficulty: e.difficulty }
		}, i = e.skill ? await r.setupSkill?.(e.skill, t) : await r.setupCharacteristic?.(e.characteristic ?? "wp", t);
		if (i?.roll && (await i.roll(), !Cn(i))) {
			for (let t of e.failureConditions) {
				let e = t.condition === "broken" && r.has?.("Skittish") ? 3 : t.amount ?? 1;
				await r.addCondition?.(t.condition, e);
			}
			e.failureRoll && await En(e.failureRoll.formula, e.failureRoll.label);
		}
	}
}
function On(e, t, n) {
	let r = Number(n?.result?.SL) || 0;
	return e === "sl" ? Math.max(0, r) : e === "fellowship-plus-sl" ? Math.max(0, (Number(t.system?.characteristics?.fel?.value) || 0) + r) : e;
}
async function kn(e, t, n, r, i) {
	if (e.kind === "roll") return En(e.formula, e.label);
	if (e.kind === "follow-up-test") return Dn(e, n, i.name);
	if (e.kind === "companion") return bn(e.companion, t, i);
	if (e.kind === "form") return fn(e.form, e.mode, t, i, r, n[0]);
	let a = Tn(e.subject, t, n);
	if (e.kind === "condition") {
		for (let n of a) {
			let i = On(e.amount ?? 1, t, r);
			await n.addCondition?.(e.condition, i);
		}
		return;
	}
	if (e.kind === "remove-condition") {
		let n = On(e.amount ?? 1, t, r);
		for (let t of a) for (let r = 0; r < n; r += 1) await t.removeCondition?.(e.condition);
		return;
	}
	if (e.kind === "heal") {
		let n = On(e.amount, t, r);
		for (let e of a) await e.modifyWounds?.(n);
		return;
	}
	if (e.kind === "effect") for (let n of a) await Xt(e.effect, n, i, r, t);
}
function An(e) {
	Reflect.get(globalThis, "ui")?.notifications?.warn?.(e);
}
function jn(e) {
	let t = zt(e);
	return !!(t && f(t).length);
}
async function Mn(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	if (Sn.has(t) || Bt(t)) return !1;
	let n = zt(t), r = n ? fe(n) : void 0;
	if (!r) return !1;
	let i = t.system?.test, a = await Wt(t);
	if (!a) return !1;
	let o = f(r.id).filter((e) => wn(e, i)), s = Ut(i);
	if (o.some((e) => e.kind !== "roll" && e.subject === "targets" || e.kind === "form" && e.source === "targets") && s.length === 0) return An(`Target one or more Actors before applying ${r.name}.`), !1;
	Sn.add(t);
	try {
		for (let e of o) await kn(e, a, s, i, r);
		return await Vt(t), !0;
	} finally {
		Sn.delete(t);
	}
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actions/index.ts
var Nn = /* @__PURE__ */ new WeakSet();
function G(e, t, n) {
	let r = fe(n), i = st(e), a = ct(t);
	if (!r || !i || !a) return;
	let o = ut(a);
	if (o === void 0 || o === n) return {
		action: r,
		actor: i,
		item: a
	};
}
function Pn(e, t) {
	Reflect.get(globalThis, "ui")?.notifications?.warn?.(`${t.name ?? "This Actor"} cannot use ${e.name}: its use limit or Advantage cost is not available.`);
}
function Fn(e, t, n) {
	let r = e.test?.bonusMultiplier ?? 1, i = e.test?.bonusCharacteristic;
	if (r <= 1 || !i) return;
	let a = O(n), o = `mutationActionDamage:${e.id}`;
	if (typeof a[o] == "number") return;
	let s = Number(t.system?.characteristics?.[i]?.bonus);
	if (!Number.isFinite(s)) return;
	let c = s * (r - 1);
	n.preData ??= {};
	let l = Number(n.preData.additionalDamage) || 0;
	n.preData.additionalDamage = l + c, a[o] = c;
}
function In(e, t) {
	let n = t.result;
	if (!n || Nn.has(n)) return;
	let r = Number(O(t)[`mutationActionDamage:${e.id}`]), i = Number(n.damage);
	!Number.isFinite(r) || r === 0 || !Number.isFinite(i) || (n.damage = i + r, n.breakdown?.damage?.other?.push({
		label: e.name,
		value: r
	}), Nn.add(n));
}
function Ln(e, t, n, r) {
	let i = G(e, t, n);
	if (!i || !D(r)) return;
	let { action: a, actor: o, item: s } = i;
	if (!Dt(a, o, s)) {
		r.abort = !0, Pn(a, o);
		return;
	}
	let c = D(r.fields) ? r.fields : {};
	r.fields = c;
	let l = Ot(a, s);
	l && (c.difficulty = l);
	let u = D(r.flags) ? r.flags : {};
	r.flags = u, u.mutationActionId = a.id;
}
async function Rn(e, t, n, r) {
	let i = G(e, t, n), a = lt(r);
	if (!i || !a) return !1;
	let { action: o, actor: s, item: c } = i, l = O(a);
	l.mutationActionId = o.id, l.mutationActionItemUuid = c.uuid ?? c.id, a.preData ??= {}, a.preData.options ??= {}, a.preData.options.mutationActionActorUuid = s.uuid ?? s.id, a.preData.options.mutationActionId = o.id, a.preData.options.mutationActionItemUuid = c.uuid ?? c.id, a.preData.options.mutationActionUseId ??= globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
	let u = await jt(o, s, c, a);
	return u ? Fn(o, s, a) : Pn(o, s), u;
}
async function zn(e, t, n, r) {
	let i = G(e, t, n), a = lt(r);
	!i || !a || (In(i.action, a), Lt(i.action, i.actor, i.item, a));
}
function Bn(e, t, n) {
	let r = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
	return {
		appendTitle: ` — ${e.mutationName}: ${e.name}`,
		fields: { difficulty: Ot(e, n) ?? "challenging" },
		mutationActionId: e.id,
		mutationActionActorUuid: t.uuid ?? t.id,
		mutationActionItemUuid: n.uuid ?? n.id,
		mutationActionUseId: r
	};
}
async function Vn(e, t, n) {
	let r = Bn(e, t, n);
	if (t.setupTrait) return t.setupTrait(n, r);
	if (e.test && "skill" in e.test && t.setupSkill) return t.setupSkill(e.test.skill, r);
	if (e.test && "characteristic" in e.test && t.setupCharacteristic) return t.setupCharacteristic(e.test.characteristic, r);
}
async function Hn(e, t, n) {
	let r = Reflect.get(globalThis, "game"), i = Rt(e), a = r?.wfrp4e?.utility?.chatDataSetup?.(i) ?? { content: i };
	a.flags = {
		...typeof a.flags == "object" && a.flags ? a.flags : {},
		"fvtt-wfrp-ratter": { mutationActionOutcome: {
			actionId: e.id,
			actorUuid: t.uuid ?? t.id,
			itemUuid: n.uuid ?? n.id
		} }
	}, await Reflect.get(globalThis, "ChatMessage")?.create?.(a);
}
async function Un(e, t, n) {
	let r = G(e, t, n);
	if (!r) return;
	let { action: i, actor: a, item: o } = r, s = i.test ? await Vn(i, a, o) : { context: Bn(i, a, o) };
	if (s && await Rn(a, o, i.id, s)) {
		if (i.test && s.roll) {
			await s.roll();
			return;
		}
		await Hn(i, a, o);
	}
}
//#endregion
//#region src/module/api/create-module-api.ts
function Wn() {
	return {
		applyMutationActionOutcome: Mn,
		checkMutantsHandbookCorruption: ot,
		id: b,
		logStatus() {
			console.log(`${ce} is loaded.`);
		},
		prepareMutationActionDialog: Ln,
		recordMutationActionUse: Rn,
		reconcileMutationAutomation: y,
		removeMutationGrantOwner: se,
		resolveMutationActionTest: zn,
		title: ce,
		useMutationAction: Un
	};
}
//#endregion
//#region src/module/api/register-module-api.ts
function Gn() {
	if (!game) throw Error("Foundry game global is unavailable during module API registration.");
	let e = game.modules.get(b);
	if (!e) throw Error(`Foundry module registry entry was not found for ${b}.`);
	e.api = Wn();
}
//#endregion
//#region src/module/settings.ts
var Kn = "useMutantsHandbookMutations";
function qn() {
	if (!game) throw Error("Foundry game global is unavailable during settings registration.");
	game.settings.register(b, Kn, {
		config: !0,
		default: !1,
		hint: "FVTT_WFRP_RATTER.Settings.MutantsHandbook.Hint",
		name: "FVTT_WFRP_RATTER.Settings.MutantsHandbook.Name",
		scope: "world",
		type: Boolean
	});
}
function Jn() {
	return game?.settings.get(b, Kn) === !0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/context-options.ts
function Yn(e) {
	let t = e.dataset.messageId;
	return t ? game?.messages.get(t) : void 0;
}
function Xn() {
	Hooks.on("getChatMessageContextOptions", (e, t) => {
		game && t.push({
			callback: async (e) => {
				let t = Yn(e);
				t && await Mn(t);
			},
			condition: (e) => {
				let t = Yn(e);
				return !!(t && t.flags?.["fvtt-wfrp-ratter"]?.mutationActionOutcomeApplied !== !0 && jn(t));
			},
			name: "Apply Mutant’s Handbook Outcome"
		});
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/hooks.ts
function Zn(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (t.type !== "mutation" || typeof t.id != "string" || typeof t.actor?.uuid != "string") return;
	let n = t.flags?.[b]?.mutationAutomation;
	return typeof n == "object" && n ? t : void 0;
}
function Qn(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (typeof t.id != "string" || typeof t.actor?.uuid != "string") return;
	let n = t.flags?.[b];
	return typeof n?.mutationGrant == "object" || typeof n?.mutationSkillGrant == "object" ? t : void 0;
}
function $n(e) {
	if (typeof e != "object" || !e) return;
	let t = e;
	if (t.type === "mutation" && typeof t.id == "string" && typeof t.actor?.uuid == "string" && typeof t.getFlag == "function") return ie(t) ? t : void 0;
}
function K(e) {
	e.catch(v);
}
async function er(e, t, n, r) {
	if (!q(r) || typeof e != "object" || !e || typeof t != "object" || !t || !("disabled" in t)) return;
	let i = e, a = i.flags?.[b];
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
function tr(e) {
	let t = [];
	for (let n of e.itemTypes?.mutation ?? []) {
		let e = n.flags?.[b];
		if (e?.mutantsHandbookRetired !== !0 && e?.mutantsHandbookPossessionRemoved !== !0) for (let e of n.effects ?? []) e.flags?.["fvtt-wfrp-ratter"]?.lightAutomation === !0 && e.active !== !1 && e.disabled !== !0 && e._source?.disabled !== !0 && t.push(e);
	}
	return t;
}
async function nr(e) {
	if (game?.user.isUniqueGM !== !0 || typeof e != "object" || !e) return;
	let t = /* @__PURE__ */ new Set();
	for (let n of e.scene?.tokens ?? []) n.actor && t.add(n.actor);
	for (let e of t) for (let t of tr(e)) {
		let e = Array.isArray(t.scripts) ? t.scripts : [];
		for (let t of e) t.trigger === "immediate" && await t.execute({});
	}
}
function rr(e) {
	let t = e.flags?.[b]?.mutationAutomation;
	return typeof t == "object" && t && typeof t.definitionId == "string" ? t.definitionId : void 0;
}
async function ir(e) {
	let t = rr(e);
	t && e.actor && await un(e.actor, t), e.actor && await se(e.actor.uuid, e.id);
}
function q(e) {
	return typeof e == "string" && game?.user.id === e;
}
async function ar(e, t = {}) {
	e.actor && !await he(e) && e.name.trim().toLowerCase() === "chimeran curse" && t.mutationAcquisitionHandlesChimeranRetirement !== !0 && await r(e.actor);
}
function or() {
	Hooks.on("canvasReady", (e) => {
		K(nr(e));
	}), Hooks.on("updateActiveEffect", (e, t, n, r) => {
		K(er(e, t, n, r));
	}), Hooks.on("createItem", (e, t, n) => {
		if (!q(n)) return;
		let r = Zn(e) ?? $n(e);
		r?.actor && K(ar(r, typeof t == "object" && t ? t : {}));
	}), Hooks.on("deleteItem", (e, t, n) => {
		if (!q(n)) return;
		let r = Zn(e);
		if (r?.actor) {
			K(ir(r));
			return;
		}
		let i = Qn(e);
		i?.actor && K(y(i.actor.uuid));
	}), Hooks.on("updateItem", (e, t, n, r) => {
		if (!q(r)) return;
		let i = Zn(e), a = i?.flags?.[b];
		i?.actor && (a?.mutantsHandbookRetired === !0 || a?.mutantsHandbookPossessionRemoved === !0) && K(ir(i));
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/migration.ts
var sr = `${b}.ratter-11-items`, cr = "The Mutant's Handbook", lr = 7, ur = /* @__PURE__ */ new Set(["nqE2hnmX2A3Mg5I1", "mNNavbJayRcsyeXJ"]), dr = /* @__PURE__ */ new Set([
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
function J(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Y(e) {
	return e.toObject();
}
function X(e) {
	let t = e.flags;
	if (!J(t)) return {};
	let n = t[b];
	return J(n) ? n : {};
}
function Z(e) {
	let t = e.effects;
	return Array.isArray(t) ? t.filter(J) : [];
}
function Q(e) {
	return Array.isArray(e) ? e.map(Q) : J(e) ? Object.fromEntries(Object.entries(e).sort(([e], [t]) => e.localeCompare(t)).map(([e, t]) => [e, Q(t)])) : e;
}
function fr(e, t) {
	return JSON.stringify(Q(e)) === JSON.stringify(Q(t));
}
function pr(e) {
	let t = { ...e };
	return delete t._key, delete t._stats, t;
}
function mr(e, t) {
	let n = new Map(Z(e).filter($).map((e) => [e._id, e]));
	return Z(t).filter($).map((e) => {
		let t = n.get(e._id);
		return t && typeof t.disabled == "boolean" ? {
			...e,
			disabled: t.disabled
		} : e;
	});
}
function $(e) {
	let t = e.flags;
	if (!J(t)) return !1;
	let n = t[b];
	return J(n) && typeof n.automationPhase == "string";
}
function hr(e, t) {
	if (!J(e)) return t;
	let n = Object.fromEntries(Object.entries(e).filter(([e]) => !dr.has(e))), r = e.version, i = t.version, a = t.definitionId, o = n.state, s = J(o) ? o.acquisition : void 0;
	return typeof r == "number" && r < lr && typeof i == "number" && i >= lr && typeof a == "string" && ur.has(a) && J(o) && J(s) && s.status === "resolved" && (n = {
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
function gr(e, t) {
	let n = X(t).mutationAutomation;
	if (!J(n)) return;
	let r = X(e).mutationAutomation, i = hr(r, n), a = Z(e).filter($), o = mr(e, t), s = [...o, ...Z(e).filter((e) => !$(e))], c = {};
	return fr(r, i) || (c[`flags.${b}.mutationAutomation`] = i), fr(a.map(pr), o.map(pr)) || (c.effects = s), Object.keys(c).length > 0 ? c : void 0;
}
function _r(e) {
	return J(e) ? e.type === "mutation" && typeof e.id == "string" && typeof e.name == "string" && typeof e.toObject == "function" : !1;
}
function vr(e) {
	let t = X(Y(e)).mutationAutomation;
	return J(t) && typeof t.definitionId == "string" ? t.definitionId : void 0;
}
function yr(e) {
	let t = X(Y(e)).mutationAutomation;
	if (!J(t)) return !1;
	let n = t.definitionId, r = t.state, i = J(r) ? r.acquisition : void 0;
	return typeof n == "string" && ur.has(n) && J(i) && i.status === "pending";
}
function br(e) {
	return X(Y(e)).sourceDocument === cr;
}
function xr(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let t of e) n.set(t.uuid, t);
	for (let e of t) for (let t of e.tokens ?? []) t.actor && n.set(t.actor.uuid, t.actor);
	return [...n.values()];
}
async function Sr(e, t) {
	if (!e.deleteEmbeddedDocuments || !e.createEmbeddedDocuments) throw Error(`${e.name} does not support embedded Active Effect migration.`);
	let n = Z(Y(e)).filter($), r = n.map((e) => e._id).filter((e) => typeof e == "string");
	if (r.length !== n.length) throw Error(`${e.name} has a managed Active Effect without an ID.`);
	let i = mr(Y(e), Y(t)).map((e) => {
		let t = { ...e };
		return delete t._key, t;
	});
	r.length > 0 && await e.deleteEmbeddedDocuments("ActiveEffect", r), i.length > 0 && await e.createEmbeddedDocuments("ActiveEffect", i, {
		keepId: !0,
		skipMutationAcquisition: !0
	});
}
async function Cr() {
	if (!game || game.user.isUniqueGM !== !0) return;
	let t = game.packs.get(sr);
	if (!t) throw Error(`The required compendium ${sr} is unavailable.`);
	let n = (await t.getDocuments()).filter(_r), r = new Map(n.map((e) => [vr(e) ?? e.id, e])), i = new Map(n.map((e) => [e.name, e])), a = xr(game.actors ?? [], game.scenes ?? []);
	for (let t of a) {
		await e(t);
		let n = [], a = [];
		for (let e of Array.from(t.items).filter(_r)) {
			let t = (vr(e) ? r.get(vr(e)) : void 0) ?? (br(e) ? i.get(e.name) : void 0);
			if (!t) continue;
			let o = gr(Y(e), Y(t));
			o && ("effects" in o && (a.push({
				owned: e,
				source: t
			}), delete o.effects), Object.keys(o).length > 0 && n.push({
				_id: e.id,
				...o
			}));
		}
		n.length > 0 && await t.updateEmbeddedDocuments("Item", n);
		for (let e of a) await Sr(e.owned, e.source);
		let o = Array.from(t.items).filter(_r).filter(yr);
		if (o.length > 0) {
			let { resolveOwnedMutationAcquisition: e } = await import("../runtime-Dm5WAeM4.js");
			for (let t of o) {
				if (!t.uuid) throw Error(`${t.name} has no UUID for acquisition repair.`);
				await e(t.uuid);
			}
		}
		await y(t.uuid);
	}
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/replacement.ts
var wr = Symbol.for(`${b}.mutantsHandbookReplacement`);
function Tr() {
	let e = CONFIG.Actor.dataModels.character.prototype;
	if (e[wr] === !0) return;
	let t = e.checkCorruption;
	if (typeof t != "function") throw Error("WFRP4e's character corruption check is unavailable.");
	Object.defineProperty(e, wr, { value: !0 }), e.checkCorruption = async function() {
		if (!Jn()) {
			await t.call(this);
			return;
		}
		try {
			await at(this.parent);
		} catch (e) {
			v(e);
		}
	};
}
//#endregion
//#region src/module/hooks/register-module-hooks.ts
function Er() {
	Hooks.once("init", () => {
		qn(), Gn(), Xn(), rt(), or(), xn();
	}), Hooks.once("ready", async () => {
		Tr();
		try {
			await Cr(), await nr(Reflect.get(globalThis, "canvas"));
		} catch (e) {
			v(e);
		}
	});
}
//#endregion
//#region src/main.ts
Er();
//#endregion

//# sourceMappingURL=fvtt-wfrp-ratter.mjs.map