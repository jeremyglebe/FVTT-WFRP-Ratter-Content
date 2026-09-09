//#region src/module/constants.ts
var e = "fvtt-wfrp-ratter", t = "Drowsy's WFRP4e Ratter Implementation", n = "fvtt-wfrp-ratter.ratter-11-tables", r = "modules/fvtt-wfrp-ratter/icons/mutations/mutants-handbook-mutation.png", i = "mutantsHandbookPatron", a = "mutantsHandbookChosenPatron", o = "mutantsHandbookChaosSpawn", s = "mutantsHandbookRetired", c = "mutantsHandbookPossessionRemoved", l = "mutantsHandbookCorruption", u = "mutantsHandbookPendingCorruption", d = "mutantsHandbookPendingMutation", f = {
	dwarf: "ueEWO9920dCmA7qP",
	elf: "X4hMeYoCFx77QIvv",
	gnome: "gktszioKqcA637wH",
	halfling: "4QnKxakvIARiyqAq",
	human: "2XUdBDbSoynCvCoL",
	ogre: "5hidSDB0YHyyrTVi"
}, p = "AAOqrs1CNIgUk5OI", ee = {
	major: {
		mental: "oDBJER6WRFUUCBZX",
		physical: "T0RrHIA3JIYZqlvF"
	},
	minor: {
		mental: "wAgVEmE8c1c2mxRI",
		physical: "uNVEtSgHB0pqquzM"
	},
	trivial: {
		mental: "720DtHbXYchWhSx1",
		physical: "baHAuTz7BJJlvED1"
	}
}, te = {
	khorne: "ymLfyXm3vCnKqMqV",
	nurgle: "rG3ht32Wh5SAVuNz",
	slaanesh: "QHWmoKtujyUHxfG1",
	tzeentch: "MuS2keCF2SFOZYCg"
}, ne = {
	khorne: "xYZjhCQJutOjg9d2",
	nurgle: "0Cou1rcMlV2EKpES",
	slaanesh: "2Y3sAdXUrS0RElg8",
	tzeentch: "nRyJeXxAsuOe5gdV"
}, re = {
	dwarf: "dwarf",
	elf: "elf",
	gnome: "gnome",
	halfling: "halfling",
	helf: "elf",
	"high elf": "elf",
	"high-elf": "elf",
	human: "human",
	ogre: "ogre",
	welf: "elf",
	"wood elf": "elf",
	"wood-elf": "elf"
};
function ie(e) {
	return re[e.trim().toLowerCase()];
}
function m(e) {
	let t = e.trim().toLowerCase();
	if (t.startsWith("physical")) return "physical";
	if (t.startsWith("mental")) return "mental";
}
function ae(e) {
	let t = e.trim().toLowerCase();
	if (t.startsWith("trivial")) return "trivial";
	if (t.startsWith("minor")) return "minor";
	if (t.startsWith("major")) return "major";
	if (t.includes("chosen")) return "chosen";
}
function oe(e) {
	return Math.min(Math.max(0, Math.floor(e)), 4) * 10;
}
function se(e, t) {
	return e === "physical" ? t.toughness : t.willpower;
}
function h(e, t) {
	return Math.max(0, e - Math.max(0, t));
}
function ce(e) {
	let t = 0, n = 0;
	for (let r of e) {
		let e = m(r);
		e === "mental" ? t += 1 : e === "physical" && (n += 1);
	}
	return {
		mental: t,
		physical: n,
		total: e.length
	};
}
function le(e, t) {
	let n = [];
	return e.physical > t.toughness && n.push("physical"), e.mental > t.willpower && n.push("mental"), n;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/document-helpers.ts
function g(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function _(e) {
	return e.trim().toLowerCase();
}
function ue(t, n) {
	return typeof t.getFlag == "function" ? t.getFlag(e, n) : void 0;
}
function de(e) {
	let t = e.itemTypes, n = Object.values(t ?? {}).flatMap((e) => e ?? []), r = [];
	try {
		r = Array.from(e.items);
	} catch {}
	return [...r, ...n].filter((e, t, n) => n.findIndex((t) => t === e || typeof e.id == "string" && e.id.length > 0 && t.id === e.id) === t);
}
function v(e) {
	return e.getFlag("fvtt-wfrp-ratter", "mutantsHandbookRetired") === !0 || e.getFlag("fvtt-wfrp-ratter", "mutantsHandbookPossessionRemoved") === !0;
}
function y(e, t) {
	return (e.itemTypes.mutation ?? []).filter((e) => (t === void 0 || e.id !== t) && !v(e));
}
function fe(e) {
	return typeof e == "string" ? [_(e)] : Array.isArray(e) ? e.filter((e) => typeof e == "string").map(_) : [];
}
function pe(e) {
	let t = ue(e, "mutationAutomation");
	if (!g(t)) return;
	let n = t.state;
	if (!g(n)) return;
	let r = n.acquisition;
	if (!(!g(r) || r.status !== "resolved")) return g(r.selections) ? r.selections : void 0;
}
function b(e, t, n) {
	let r = pe(e);
	if (!r) return !1;
	let i = new Set(n.map(_));
	return fe(r[t]).some((e) => i.has(e));
}
function me(e, t, n) {
	let r = _(t);
	return y(e, n).find((e) => _(e.name) === r);
}
function he(e, t) {
	let n = _(t);
	return de(e).some((e) => {
		if (e.type !== "talent" || typeof e.name != "string") return !1;
		let t = _(e.name);
		return t === n || t.startsWith(`${n} (`);
	});
}
function ge(e, t) {
	let n = e;
	for (let e of t) {
		if (!g(n)) return;
		n = n[e];
	}
	return n;
}
function _e(e) {
	let t = e.currentCareer, n = [...g(t) ? [t] : [], ...de(e).filter((e) => e.type === "career" && ge(e.system, ["current", "value"]) === !0)];
	for (let e of n) {
		let t = ge(e, [
			"system",
			"careergroup",
			"value"
		]);
		if (typeof t == "string" && t.trim().length > 0) return _(t);
	}
}
function ve(e, t) {
	return y(e, t).some((e) => ["additional extremities", "additional limbs"].includes(_(e.name)) && b(e, "limb", ["legs"]));
}
function ye(e, t) {
	return y(e, t).some((e) => ["additional extremities", "additional limbs"].includes(_(e.name)) && b(e, "limb", ["arms"]));
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/updates.ts
async function x(e, t) {
	if (!await e.update(t, { skipCorruption: !0 })) throw Error(`Foundry prevented the required update to ${e.name}.`);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/chosen-patrons.ts
var S = [
	"khorne",
	"nurgle",
	"slaanesh",
	"tzeentch"
];
function C(e) {
	return `Chosen of ${e.charAt(0).toUpperCase()}${e.slice(1)}`;
}
function be(t) {
	if (t.type !== "trait") return;
	let n = typeof t.getFlag == "function" ? t.getFlag(e, a) : t.flags?.[e]?.[a];
	return S.find((e) => e === n) || S.find((e) => _(t.name) === _(C(e)));
}
function w(e) {
	return [...new Set(Array.from(e.items).map(be).filter((e) => e !== void 0))];
}
function T(t) {
	if (typeof t.getFlag != "function") return;
	let n = t.getFlag(e, i);
	return n === "unassigned" ? n : S.find((e) => e === n);
}
function xe(e) {
	let t = w(e);
	if (t.length === 1) return t[0];
	if (!(t.length > 1)) return T(e);
}
async function Se(t, n) {
	if (w(t).includes(n)) {
		await Ce(t);
		return;
	}
	let r = `Compendium.${e}.ratter-11-items.Item.${ne[n]}`, i = await fromUuid(r);
	if (!i || i.type !== "trait") throw Error(`The required ${C(n)} Trait is unavailable.`);
	let a = i.toObject();
	if (delete a._id, delete a._key, (await t.createEmbeddedDocuments("Item", [a], { skipSpecialisationChoice: !0 })).length !== 1) throw Error(`Foundry prevented ${C(n)} from being added to ${t.name}.`);
	await Ce(t);
}
async function Ce(t) {
	T(t) !== void 0 && await x(t, { [`flags.${e}.-=${i}`]: null });
}
async function we(e) {
	let t = T(e);
	t && t !== "unassigned" && w(e).length === 0 && await Se(e, t);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/actor-state.ts
function Te(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return t.type === "character" && typeof t.name == "string" && typeof t.uuid == "string" && typeof t.createEmbeddedDocuments == "function" && typeof t.deleteEmbeddedDocuments == "function" && typeof t.getFlag == "function" && typeof t.has == "function" && typeof t.setupCharacteristic == "function" && typeof t.setupSkill == "function" && typeof t.update == "function" && typeof t.updateEmbeddedDocuments == "function";
}
function Ee(e) {
	let t = w(e).length > 0 || xe(e) !== void 0;
	return ce((e.itemTypes.mutation ?? []).filter((e) => !v(e) && !(t && _(e.name) === "possessed")).map((e) => e.system.mutationType.value));
}
function De(e) {
	return (e.itemTypes.mutation ?? []).some((e) => _(e.name) === "possessed" && !v(e));
}
function Oe(t) {
	return t.getFlag(e, o) === !0;
}
async function ke(t) {
	let n = (t.itemTypes.mutation ?? []).filter((e) => _(e.name) === "possessed" && !v(e)).map((t) => ({
		_id: t.id,
		[`flags.${e}.${c}`]: !0
	}));
	if (n.length !== 0 && (await t.updateEmbeddedDocuments("Item", n)).length !== n.length) throw Error(`Foundry prevented Possessed from being retired for ${t.name}.`);
}
async function Ae(t) {
	let n = y(t).filter((e) => _(e.name) === "skinwalker");
	if (n.length === 0) return [];
	let r = await t.updateEmbeddedDocuments("Item", n.map((t) => ({
		_id: t.id,
		[`flags.${e}.${s}`]: !0
	})));
	if (r.length !== n.length) {
		let e = new Set(r.map((e) => e.id)), i = n.filter((t) => e.has(t.id)).map((e) => e.id);
		try {
			await je(t, i);
		} catch (e) {
			throw AggregateError([e], `Foundry only partially retired Skinwalker for ${t.name}, and rollback failed.`, { cause: e });
		}
		throw Error(`Foundry prevented Skinwalker from being retired for ${t.name}.`);
	}
	return n.map((e) => e.id);
}
async function je(e, t) {
	if (t.length !== 0 && (await e.updateEmbeddedDocuments("Item", t.map((e) => ({
		_id: e,
		"flags.fvtt-wfrp-ratter.-=mutantsHandbookRetired": null
	})))).length !== t.length) throw Error(`Foundry prevented retired mutations from being restored for ${e.name}.`);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/pending-corruption.ts
var Me = `flags.${e}.${u}`, E = `flags.${e}.-=${u}`, Ne = `flags.${e}.${d}`;
function D(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Pe(e) {
	return e === "mental" || e === "physical";
}
function Fe(e) {
	if (!(!D(e) || e.version !== 1) && (e.kind === "test" && typeof e.messageId == "string" || e.kind === "mutation" && typeof e.actorUuid == "string" && typeof e.mutationName == "string" && Pe(e.nature) && typeof e.token == "string")) return e;
}
function O(t) {
	return Fe(t.getFlag(e, u));
}
function Ie(e) {
	return O(e) !== void 0;
}
async function Le(e, t) {
	await x(e, { [Me]: {
		kind: "test",
		messageId: t,
		version: 1
	} });
}
async function Re(e) {
	await x(e, { [E]: null });
}
function k(e) {
	let t = Fe(e.flags?.["fvtt-wfrp-ratter"]?.mutantsHandbookPendingMutation ?? e.getFlag("fvtt-wfrp-ratter", "mutantsHandbookPendingMutation"));
	return t?.kind === "mutation" ? t : void 0;
}
function ze(e, t) {
	let n = e[t];
	if (D(n)) return n;
	let r = {};
	return e[t] = r, r;
}
function Be(e) {
	let t = e.effects;
	return Array.isArray(t) ? t.some((e) => {
		if (!D(e)) return !1;
		let t = e.system, n = D(t) ? t.scriptData : void 0;
		return Array.isArray(n) && n.some((e) => D(e) && e.trigger === "immediate" && typeof e.label == "string" && e.label.startsWith("Acquire ") && typeof e.script == "string" && !e.script.includes("prepareMutationAcquisition"));
	}) : !1;
}
function Ve(t, n) {
	let r = crypto.randomUUID().replaceAll("-", "").slice(0, 16), i = typeof t.img == "string" ? t.img : "icons/svg/aura.svg", a = n.nature === "physical" ? "t" : "wp", o = JSON.stringify(n.name), s = JSON.stringify(n.nature);
	return {
		_id: r,
		changes: [],
		description: "",
		disabled: !1,
		duration: {},
		flags: {
			[e]: { scope: "corruption-card" },
			wfrp4e: {}
		},
		img: i,
		name: `${n.name} — Corruption Acquisition`,
		origin: null,
		statuses: [],
		tint: "#ffffff",
		transfer: !0,
		type: "base",
		system: {
			sourceData: {},
			transferData: {
				area: { aura: {} },
				avoidTest: { value: "none" },
				documentType: "Actor",
				equipTransfer: !1,
				prompt: !1,
				type: "document"
			},
			scriptData: [{
				async: !0,
				label: `Resolve ${n.name} Corruption Card`,
				options: {
					deleteEffect: !0,
					dialog: {
						activateScript: "",
						hideScript: "",
						submissionScript: "",
						targeter: !1
					},
					immediate: { deleteEffect: !0 }
				},
				trigger: "immediate",
				script: `const options = args.options ?? {};
const actor = this.actor;
const moduleId = "${e}";
const pending = this.item.flags[moduleId].${d};
const expected = actor.getFlag(moduleId, "${u}");
const mutationName = ${o};
if (pending.actorUuid !== actor.uuid || pending.mutationName !== mutationName || pending.nature !== ${s} || expected?.kind !== "mutation" || expected.token !== pending.token) {
  ui.notifications.warn(mutationName + " is no longer the pending mutation for " + actor.name + ".");
  options.abortItemCreation = true;
  options.mutationAcquisitionCancelled = true;
  return false;
}
const resilience = Number(actor.system.status.resilience.value ?? 0);
if (resilience > 0 && await foundry.applications.api.DialogV2.confirm({
  window: {title: "Resist " + mutationName},
  content: "<p>Spend 1 Resilience to resist " + mutationName + "?</p>",
  yes: {label: "Spend Resilience"},
  no: {label: "Keep Mutation"},
  rejectClose: false
})) {
  const loss = Math.max(0, Number(actor.system.characteristics.${a}.bonus ?? 0));
  await actor.update({
    ["flags." + moduleId + ".-=${u}"]: null,
    "system.status.corruption.value": Math.max(0, Number(actor.system.status.corruption.value) - loss),
    "system.status.resilience.value": resilience - 1
  });
  options.abortItemCreation = true;
  options.mutationAcquisitionCancelled = true;
  await ChatMessage.create({content: "<p><strong>" + actor.name + "</strong> spends Resilience and resists <strong>" + mutationName + "</strong>.</p>"});
  return false;
}
options.mutationAcquisitionCanReroll = false;
options.mutationAcquisitionHandlesChimeranRetirement = true;
return true;`
			}],
			zone: {}
		}
	};
}
function He(t, n) {
	let r = structuredClone(t.data), i = ze(ze(r, "flags"), e);
	if (i[d] = n, !Be(r)) throw Error(`${t.name} has no embedded Mutant's Handbook acquisition script and cannot be posted.`);
	return Array.isArray(r.effects) && (r.effects = [Ve(r, t), ...r.effects]), r;
}
async function Ue(e, t) {
	let n = O(e), r = {
		actorUuid: e.uuid,
		kind: "mutation",
		mutationName: t.name,
		nature: t.nature,
		token: crypto.randomUUID(),
		version: 1
	}, i = new Item.implementation(He(t, r));
	await x(e, { [Me]: r });
	try {
		await i.postItem(void 0, n?.kind === "test" ? { "flags.wfrp4e.sourceMessageId": n.messageId } : void 0);
	} catch (t) {
		throw await x(e, { ...n ? { [Me]: n } : { [E]: null } }), t;
	}
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/messages.ts
function A(e, t) {
	if (!game) throw Error("Foundry game global is unavailable while formatting a mutation message.");
	return game.i18n.format(`FVTT_WFRP_RATTER.Mutations.${e}`, t);
}
async function j(e) {
	if (!game) throw Error("Foundry game global is unavailable while posting a mutation message.");
	try {
		let t = ChatMessage.applyMode({
			author: game.user.id,
			content: e
		}, "gm");
		await ChatMessage.create(t);
	} catch (e) {
		console.error("The Mutant's Handbook workflow could not create an informational message.", e);
	}
}
function M(e) {
	ui.notifications.warn(e);
}
function We(e) {
	let t = e instanceof Error ? e.message : String(e), n = game ? game.i18n.format("FVTT_WFRP_RATTER.Mutations.Error", { message: t }) : `The Mutant's Handbook mutation workflow failed: ${t}`;
	console.error(e), ui.notifications.error(n);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/dialogs.ts
var Ge = [
	"human",
	"dwarf",
	"elf",
	"halfling",
	"gnome",
	"ogre"
], Ke = [
	"khorne",
	"nurgle",
	"slaanesh",
	"tzeentch"
];
function qe(e) {
	return `${e.charAt(0).toUpperCase()}${e.slice(1)}`;
}
function Je(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#39;");
}
async function Ye(e, t, n) {
	let r = [
		...n ? [{
			action: "reroll",
			callback: () => "reroll",
			default: !0,
			label: "Reroll"
		}] : [],
		{
			action: "accept",
			callback: () => "accept",
			default: !n,
			label: "Accept Anyway"
		},
		{
			action: "cancel",
			callback: () => "cancel",
			label: "Cancel"
		}
	], i = await foundry.applications.api.DialogV2.wait({
		buttons: r,
		content: `<div class="fvtt-wfrp-ratter-root"><div role="alert" class="tw:dui-alert tw:dui-alert-warning"><span>${Je(t.message)}</span></div><p>${n ? "Reroll this table result, accept it despite the warning, or cancel the mutation procedure." : "Accept this mutation despite the warning, or cancel adding it."}</p></div>`,
		rejectClose: !1,
		window: { title: `Review ${e}` }
	});
	return i === "accept" || i === "reroll" ? i : "cancel";
}
async function Xe(e, t) {
	if (!game) throw Error("Foundry game global is unavailable while choosing a species profile.");
	let n = await foundry.applications.api.DialogV2.wait({
		buttons: Ge.map((e) => ({
			action: e,
			label: qe(e)
		})),
		content: game.i18n.format("FVTT_WFRP_RATTER.Mutations.UnknownSpeciesPrompt", {
			name: e,
			species: t || game.i18n.localize("FVTT_WFRP_RATTER.Mutations.UnknownSpecies")
		}),
		rejectClose: !1,
		window: { title: game.i18n.localize("FVTT_WFRP_RATTER.Mutations.UnknownSpeciesTitle") }
	});
	return Ge.find((e) => e === n);
}
async function Ze(e) {
	if (!game) throw Error("Foundry game global is unavailable while choosing a Chaos patron.");
	let t = await foundry.applications.api.DialogV2.wait({
		buttons: Ke.map((e) => ({
			action: e,
			label: qe(e)
		})),
		content: game.i18n.format("FVTT_WFRP_RATTER.Mutations.PatronPrompt", { name: e }),
		rejectClose: !0,
		window: { title: game.i18n.localize("FVTT_WFRP_RATTER.Mutations.PatronTitle") }
	});
	return Ke.find((e) => e === t);
}
async function Qe(e, t) {
	if (!game) throw Error("Foundry game global is unavailable while spending Resilience.");
	return await foundry.applications.api.DialogV2.confirm({
		content: game.i18n.format("FVTT_WFRP_RATTER.Mutations.ResiliencePrompt", {
			mutation: t,
			name: e
		}),
		no: { label: game.i18n.localize("FVTT_WFRP_RATTER.Mutations.KeepMutation") },
		rejectClose: !1,
		window: { title: game.i18n.localize("FVTT_WFRP_RATTER.Mutations.ResilienceTitle") },
		yes: { label: game.i18n.localize("FVTT_WFRP_RATTER.Mutations.SpendResilience") }
	}) === !0;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/grant-data.ts
function N(e) {
	return Array.isArray(e) ? e.map(N) : typeof e == "object" && e ? Object.fromEntries(Object.entries(e).sort(([e], [t]) => e < t ? -1 : +(e > t)).map(([e, t]) => [e, N(t)])) : e;
}
function P(e) {
	return JSON.stringify(N({
		configure: e.configure ?? {},
		ranks: e.ranks ?? 1,
		scope: e.scope ?? "all",
		sourceUuid: e.sourceUuid,
		stack: e.stack ?? "singleton",
		type: e.type
	}));
}
function $e(e) {
	let t = { ...e };
	return delete t.scope, P({
		...t,
		ranks: 1
	});
}
function F(e) {
	let t;
	try {
		t = JSON.parse(e);
	} catch {
		return;
	}
	if (typeof t != "object" || !t || Array.isArray(t)) return;
	let n = t;
	if (!(n.stack !== "rank" || n.type !== "skill" && n.type !== "talent")) return n.ranks = 1, n.scope = "all", JSON.stringify(N(n));
}
function et(e, t) {
	let n = e;
	for (let e of t.split(".")) {
		if (typeof n != "object" || !n) return;
		n = n[e];
	}
	return n;
}
function tt(e, t, n) {
	let r = t.split(".").filter(Boolean), i = /* @__PURE__ */ new Set([
		"__proto__",
		"constructor",
		"prototype"
	]);
	if (r.length === 0 || r.some((e) => i.has(e))) throw Error(`Unsafe mutation grant configuration path: ${t}.`);
	let a = e;
	for (let e of r.slice(0, -1)) {
		let t = a[e];
		(typeof t != "object" || !t || Array.isArray(t)) && (a[e] = {}), a = a[e];
	}
	a[r.at(-1)] = n;
}
function nt(e, t) {
	t.configure?.name && (e.name = t.configure.name);
	let n = e.system, r = typeof n == "object" && n ? n : {};
	e.system = r;
	for (let [e, n] of Object.entries(t.configure?.system ?? {})) tt(r, e.replace(/^system\./, ""), N(n));
	return t.ranks !== void 0 && (t.type === "skill" || t.type === "talent") && tt(r, "advances.value", t.ranks), e;
}
function rt(e, t, n) {
	if (e.type !== n.type) return !1;
	let r = e.toObject(), i = n.configure?.name ?? t.name;
	if (r.name !== i) return !1;
	let a = r.system;
	if (typeof a != "object" || !a) return !1;
	for (let [e, t] of Object.entries(n.configure?.system ?? {})) {
		let n = e.replace(/^system\./, "");
		if (JSON.stringify(N(et(a, n))) !== JSON.stringify(N(t))) return !1;
	}
	return n.ranks === void 0 || n.type !== "skill" && n.type !== "talent" || Number(et(a, "advances.value")) === n.ranks;
}
function it(e, t) {
	let n = e.toObject()._stats;
	return typeof n != "object" || !n ? !1 : n.compendiumSource === t;
}
function I(t) {
	let n = t.flags?.[e]?.mutationGrant;
	if (typeof n != "object" || !n) return;
	let r = n;
	if (r.version !== 2 || typeof r.managed != "boolean" || typeof r.signature != "string" || typeof r.sourceUuid != "string" || !Array.isArray(r.owners)) return;
	let i = r.owners.filter((e) => typeof e == "object" && !!e && typeof e.grantKey == "string" && typeof e.ownerId == "string");
	return {
		...r,
		owners: i
	};
}
function L(t) {
	let n = t.flags?.[e]?.mutationGrantOwners;
	return Array.isArray(n) ? n.filter((e) => typeof e == "string") : [];
}
function R(t) {
	return t.flags?.[e]?.mutationGrantManaged === !0;
}
function at(t) {
	let n = t.flags?.[e]?.mutationSkillGrant;
	if (typeof n != "object" || !n) return;
	let r = n;
	if (r.version !== 1 || typeof r.managed != "boolean" || !Number.isFinite(r.appliedRanks) || (r.appliedRanks ?? -1) < 0 || !Array.isArray(r.owners)) return;
	let i = r.owners.filter((e) => typeof e == "object" && !!e && typeof e.grantKey == "string" && typeof e.ownerId == "string" && Number.isFinite(e.ranks) && e.ranks > 0 && typeof e.signature == "string" && typeof e.sourceUuid == "string");
	if (i.length === r.owners.length) return {
		...r,
		owners: i
	};
}
//#endregion
//#region src/functions/mutants-handbook/actions/constants.ts
var ot = [
	"w8zPEHooiAzTdLYu",
	"A7OLAWKXWUfh0UGU",
	"O6QDcWXjqBD1C8R6",
	"1YH1DgABwSXNaMI7",
	"rMh2lJZMML0W61MH",
	"oyDtC4mkFBxcCYju",
	"XheCM6GZG8FhAoGp",
	"0KO8587hDiF4PSCq",
	"tZZlX68I8HTDr3Db",
	"5KF01h4PSOrrABbf",
	"xpllKoAOD5X9C8Pi",
	"ihjcMhBrb24nwkhm",
	"sdXBHwy9bpRcLriW",
	"UOkDReH2uUWWAgrf",
	"NDDLEunW5biRvTfy",
	"q3sK3RsdsJxrifZP",
	"mNNavbJayRcsyeXJ"
], st = ["b5xKInMaTt8ljJVQ"];
[...ot, ...st];
//#endregion
//#region src/functions/mutants-handbook/actions/support-item-ids.ts
var z = {
	"acidic-saliva-spit": "FebzFfLAxgNhm7wr",
	"additional-head-control": "JewvTFlDyMLJBb2l",
	"beast-alpha-command": "1MfdvldnRNRjRQLf",
	"bloodsucker-feed": "76HnLBLuPBKS2EoZ",
	"bodysnatcher-drone-deploy": "UUvwkshI1hvD6qI6",
	"bloomblight-touch-heal": "2EZ7EBagV6uv1BzH",
	"burning-body-aura": "hluAuXdF352vkxBr",
	"chameleon-skin-camouflage": "MX6xt2WTzQHNJGCc",
	"contagious-madness-aura": "Ya0PZjQf230jkZ4f",
	"dimensional-instability-teleport": "MoKSSwRQMfv7EDTr",
	"ecstatic-milk-produce-dose": "40o7GdhDDB2FsP3I",
	"entrancement-beguile": "Vbsxzv776wXEnkvd",
	"ethereal-become-insubstantial": "5nSig5q0dPjZbOiy",
	"evil-eye-gaze": "kJSprf6VC0f7Wvei",
	"frostbite-touch": "BzRsJd1lFnACCLvE",
	"fleshcrafter-bonecraft": "35MrhPCM6yH0ceIj",
	"fleshcrafter-cosmetic": "NGvZAq54UMaTkB1C",
	"fleshcrafter-reshape": "cpoT2lHmQ3EHoqUh",
	"fleshcrafter-stop-bleeding": "pEJ8uaJssHy86Qol",
	"gnawer-gnaw": "GBTyHGDL44bKay3Q",
	"green-sovereign-command-plants": "Do7S8MvFzdg7SXnb",
	"green-sovereign-branch-strike": "p7fFRvr9MB2ILZnV",
	"green-sovereign-root-grapple": "UGCgLAnwlQX9muh7",
	"green-sovereign-strike-or-grapple": "2Chrquot50KfU3CN",
	"gut-worm-attack": "YpfKStGc61L8YHE2",
	"horrid-scream-unleash": "AVzEGfrXzDigJMlG",
	"hungering-maw-free-bite": "kmDWEJdBmG28nNgs",
	"hungering-maw-grapple": "OQ9m964Hb2utHF6d",
	"infernal-furnace-breath": "83rVtBBBLWeJvJNl",
	"infernal-furnace-critical-burst": "2ZHu2EdcoZUZAsAy",
	"infernal-furnace-death-explosion": "Yk3454zXQ7eAa9BS",
	"invisibility-vanish": "tNdEPnV5ZWTKAmUc",
	"levitation-rise": "eHZzMCNjhVk0c9Kx",
	"life-leech-touch": "QLbD612y8GsxzAlx",
	"life-leech-combat-touch": "SRJqfQmSB6XtrJ9Q",
	"mirror-image-disguise": "4gBZGA6253HIOVhs",
	"oracle-augury": "x4D4RF5FYU4cakr0",
	"oracle-foresight": "iT9boxhs6HcuCkeL",
	"phantasmal-mind-animate": "by1jszZB8rqOXxBu",
	"phantasmal-mind-illusion": "ELnT60LdqXvoPwyh",
	"piercing-tongue-attack": "26xuNz3nFbtESVJk",
	"pyrokinesis-blast": "4IABIUu3vFX912f0",
	"pyrokinesis-ignite": "LFtTluanEnKTgnrU",
	"razor-sharp-claws-attack": "pqkiTNQePUJVMwNH",
	"scrying-touch-psychometry": "ufxPg25r4pxHAJoc",
	"shapeshifter-assume-form": "dtpkQMEEb7ptR5O0",
	"shapeshifter-revert-form": "9OmpGEgdwvqakVkC",
	"skinwalker-assume-form": "tfZuhiTraftqUnEF",
	"skinwalker-revert-form": "RWJnvcJCcHC9yVAA",
	"spectral-companion-manifest": "ZyEHAcyOJZK9NNbf",
	"spelleater-gland-spend-sl": "bwc2MG1frBYRGzae",
	"swarmform-reform": "gLK2MGXqfHAeD6Jm",
	"swarmform-transform": "4zzOVfS16UTHD1fd",
	"symbiotic-twin-manifest": "ZyYYGoZePtEpR56N",
	"tail-mace-free-attack": "wiyTBt7rJhv3SSgJ",
	"tail-prehensile-free-attack": "ygmUvxH502mHLAgd",
	"tail-scorpion-free-attack": "yS52LEFz9wsKvCeU",
	"tantalising-aura": "Mi2Nxe9YZwyIeQqc",
	"telekinesis-hurl-weapon": "irW6FspLKIVVunSj",
	"telekinesis-hurl-projectile": "bjjhwfE1bs3F6jNl",
	"telekinesis-move-object": "O4HLCBWIBwAGz1qT",
	"telepathy-project-thoughts": "UlUAKp147NaJFmwR",
	"telepathy-read-thoughts": "eo0COW83jsIN7lxD",
	"temporal-instability-surge": "rWKJa2FcsqQ4ygI4",
	"thorns-launch": "PeoiDXzx5HEAL4Tq",
	"thorns-unarmed": "eFGzLQJMLrQCqw6e",
	"thunderhead-lightning-bolt": "KIaxtPoGuEqxDOoi",
	"thunderhead-combat-touch": "XR4N1wln3vnJQjCU",
	"thunderhead-shock": "ptfZukLxHg6K5c1C",
	"wind-caller-breeze": "EjCDzlyidhCuuaKg",
	"wind-caller-gust": "OdGQUMwOrpNwrfNn",
	"vestigial-twin-manifest": "6QEdptsyoC5WAZcW",
	"warp-spasm-end": "rbdiWJcE1Zs8Wv6W",
	"warp-spasm-transform": "pGEJ3HWTAozRcuZr",
	"werebeast-revert": "hDsSaNDAoQdi4pYy",
	"werebeast-transform": "j4XrtvCyx7fKQYfu"
}, ct = [
	{
		actionType: "attack",
		conditions: ["Spitting, drooling acid onto objects, and consuming unusual materials share this TB-per-day allowance.", "Glass and gold are not damaged by the acid."],
		duration: "Immediate",
		id: "acidic-saliva-spit",
		implementation: "support",
		itemId: z["acidic-saliva-spit"],
		mutationId: "NvnDw82FSvjCpsxz",
		mutationName: "Acidic Saliva",
		name: "Spit Acid",
		outcome: "On a successful Ballistic Skill Test, the spit deals 5 + SL Damage.",
		range: "SB + TB yards",
		rules: "Use the normal ranged-combat rules. The acid can also melt most unattended materials.",
		target: "creature-or-object",
		test: {
			SL: !0,
			attackType: "ranged",
			characteristic: "bs",
			damage: !0,
			difficulty: "challenging",
			specification: "+5"
		},
		usage: {
			max: "tb",
			period: "day"
		}
	},
	{
		actionType: "control",
		conditions: ["The target must be an animal or a bestial creature with Intelligence 15 or lower and must hear the mutant.", "Domestic or Broken animals receive +20; monsters receive -20."],
		duration: "GM-determined",
		id: "beast-alpha-command",
		implementation: "support",
		itemId: z["beast-alpha-command"],
		mutationId: "IAojmuCNEt6z9EwB",
		mutationName: "Beast Alpha",
		name: "Command Beast",
		outcome: "A won Opposed Willpower Test makes the beast follow a simple conveyed intent.",
		range: "Hearing range",
		rules: "Commands convey intent, such as attack, flee, or calm down, rather than complex instructions.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "healing",
		conditions: ["Resolve the Fangs or Piercing Tongue attack before applying this rider."],
		duration: "Immediate",
		id: "bloodsucker-feed",
		implementation: "support",
		itemId: z["bloodsucker-feed"],
		mutationId: "tBOg8CYxOPXLBUMF",
		mutationName: "Bloodsucker",
		name: "Feed on Blood",
		outcome: "Heal as many Wounds as the bitten opponent loses.",
		range: "Touch",
		rules: "One Wound worth of blood can replace a meal. This action is a rider on the linked bite or tongue attack.",
		target: "single"
	},
	{
		actionType: "healing",
		conditions: ["The target must then pass a Challenging (+0) Endurance Test or gain a randomly rolled symptom for 1d10 days."],
		duration: "Immediate healing; symptom lasts 1d10 days",
		id: "bloomblight-touch-heal",
		implementation: "support",
		itemId: z["bloomblight-touch-heal"],
		mutationId: "Rpt4fqmrRuoN0Wz0",
		mutationName: "Bloomblight Touch",
		name: "Bloomblight Healing Touch",
		outcome: "On success, heal the living target for Fellowship + SL Wounds.",
		range: "Touch",
		rules: "A failed target Endurance Test causes Buboes, Fever, Flux, Nausea, or Pox as rolled on the mutation table.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "attack",
		duration: "Immediate",
		id: "corrosive-vomit-attack",
		implementation: "native",
		mutationId: "vesyHqLaA7yKb4Ca",
		mutationName: "Corrosive Vomit",
		name: "Vomit",
		outcome: "Resolve the owned Vomit (TB +4) Creature Trait attack.",
		range: "As the owned Vomit Creature Trait",
		rules: "Each additional mutation level increases the configured attack Damage by 1.",
		target: "area"
	},
	{
		actionType: "movement",
		conditions: [
			"The destination must be in line of sight.",
			"Each additional use before an eight-hour rest worsens Difficulty by one step.",
			"The mutant may carry one physically touching passenger per SL; each passenger worsens Difficulty by one step."
		],
		duration: "Immediate",
		id: "dimensional-instability-teleport",
		implementation: "support",
		itemId: z["dimensional-instability-teleport"],
		miscast: "minor",
		mutationId: "w8zPEHooiAzTdLYu",
		mutationName: "Dimensional Instability",
		name: "Teleport",
		outcome: "On success, teleport as the mutant's Movement.",
		range: "WP yards",
		rules: "Difficulty progression resets after eight hours of rest.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "average"
		}
	},
	{
		actionType: "resource",
		conditions: ["The mutant is immune to their own milk.", "A consumer must pass the source's Easy (+20) Endurance Test or gain Addiction (Enthralling Milk)."],
		duration: "4 hours per dose; only duration stacks",
		id: "ecstatic-milk-produce-dose",
		implementation: "support",
		itemId: z["ecstatic-milk-produce-dose"],
		mutationId: "u5uyIhwDYnXOFOTY",
		mutationName: "Ecstatic Milk",
		name: "Produce Ecstatic Milk",
		outcome: "Produce a dose that grants Acute Sense (All), +1 Movement, +10 Agility, and +10 Initiative, followed by 1 Fatigued per dose.",
		range: "Self",
		rules: "The consumer craves vivid sensory stimulus while affected; apply the addiction Test and delayed Fatigued manually.",
		target: "none",
		usage: {
			max: "tb",
			period: "day"
		}
	},
	{
		actionType: "attack",
		duration: "Until the Entangled effect is removed",
		id: "ensnaring-tongue-attack",
		implementation: "native",
		mutationId: "KCWuur9cvnmekn72",
		mutationName: "Ensnaring Tongue",
		name: "Tongue Attack",
		outcome: "Resolve the owned Tongue Attack Creature Trait and Entangle the target on a successful hit.",
		range: "TB x 2 yards",
		rules: "The tongue can sustain TB Wounds before severing and regrows one inch per week; those consequences remain manual.",
		target: "single"
	},
	{
		actionType: "control",
		conditions: [
			"The target must be living.",
			"At most WPB people may be entranced at once.",
			"A Critical Success makes the target conspicuously eager or lovesick."
		],
		duration: "WPB + SL hours",
		id: "entrancement-beguile",
		implementation: "support",
		itemId: z["entrancement-beguile"],
		mutationId: "3K649FcYKM9vmAPo",
		mutationName: "Entrancement",
		name: "Entrancement",
		outcome: "Winning an Opposed Willpower Test makes the target eager to please and grants +20 to the mutant's social interactions with them.",
		range: "Source does not specify a range",
		rules: "The target retains self-preservation and does not follow commands mindlessly.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "control",
		conditions: ["The mutant must be able to look at the target."],
		duration: "Conditions persist normally",
		id: "evil-eye-gaze",
		implementation: "support",
		itemId: z["evil-eye-gaze"],
		mutationId: "bgKHmWGNH4jxzOhC",
		mutationName: "Evil Eye",
		name: "Inflict Crippling Pain",
		outcome: "Win an Opposed Willpower Test to give the target 1 Fatigued; they then test Hard (-20) Endurance or become Prone. On failure, the mutant gains 1 Stunned.",
		range: "Sight",
		rules: "Resolve the target's Endurance Test and all resulting Conditions from the original Test card.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "attack",
		duration: "Immediate",
		id: "fangs-bite",
		implementation: "native",
		mutationId: "21yzNwQwaqNEJ86D",
		mutationName: "Fangs",
		name: "Bite",
		outcome: "Resolve the owned Bite (SB +3) Creature Trait attack.",
		range: "Melee",
		rules: "The configured Bite gains +1 Damage for each additional mutation level and may carry the retained Venom result.",
		target: "single"
	},
	{
		actionType: "skill",
		conditions: ["Fleshcraft cannot be used in combat and usually takes several minutes or hours."],
		duration: "Permanent until altered again",
		id: "fleshcrafter-cosmetic",
		implementation: "support",
		itemId: z["fleshcrafter-cosmetic"],
		mutationId: "bnvOpEm16kCdb9oh",
		mutationName: "Fleshcrafter",
		name: "Cosmetic Fleshcraft",
		outcome: "Make cosmetic changes to flesh and appearance.",
		range: "Touch",
		rules: "The GM sets accumulated successes for disguises, Fellowship changes, or Attractive; Critical failures create a negative result.",
		target: "single",
		test: {
			difficulty: "challenging",
			skill: "trade-fleshcraft"
		}
	},
	{
		actionType: "skill",
		conditions: ["Fleshcraft cannot be used in combat and usually takes several minutes or hours."],
		duration: "Permanent until altered again",
		id: "fleshcrafter-reshape",
		implementation: "support",
		itemId: z["fleshcrafter-reshape"],
		mutationId: "bnvOpEm16kCdb9oh",
		mutationName: "Fleshcrafter",
		name: "Drastic Fleshcraft",
		outcome: "Trade 1 point between physical Characteristics per SL, subject to GM approval.",
		range: "Touch",
		rules: "The GM may instead permit Charm, Intimidation, or Fear changes; Critical failures create a negative result.",
		target: "single",
		test: {
			difficulty: "difficult",
			skill: "trade-fleshcraft"
		}
	},
	{
		actionType: "skill",
		conditions: ["Fleshcraft cannot be used in combat and usually takes several minutes or hours."],
		duration: "Permanent until altered again",
		id: "fleshcrafter-bonecraft",
		implementation: "support",
		itemId: z["fleshcrafter-bonecraft"],
		mutationId: "bnvOpEm16kCdb9oh",
		mutationName: "Fleshcrafter",
		name: "Bonecraft",
		outcome: "Alter stature within species Size limits, create bone protrusions, or craft a bone object.",
		range: "Touch",
		rules: "The GM adjudicates the exact alteration; Critical failures create a negative result.",
		target: "creature-or-object",
		test: {
			difficulty: "hard",
			skill: "trade-fleshcraft"
		}
	},
	{
		actionType: "healing",
		conditions: ["Fleshcraft cannot be used in combat and usually takes several minutes or hours."],
		duration: "Immediate",
		id: "fleshcrafter-stop-bleeding",
		implementation: "support",
		itemId: z["fleshcrafter-stop-bleeding"],
		mutationId: "bnvOpEm16kCdb9oh",
		mutationName: "Fleshcrafter",
		name: "Fleshcraft Bleeding",
		outcome: "Remove 1 Bleeding Condition per SL.",
		range: "Touch",
		rules: "Critical failures create a negative result chosen by the GM.",
		target: "single",
		test: {
			difficulty: "challenging",
			skill: "trade-fleshcraft"
		}
	},
	{
		actionType: "control",
		conditions: ["The touched target makes the Challenging (+0) Endurance Test; the mutant does not roll."],
		duration: "Stunned persists normally",
		id: "frostbite-touch",
		implementation: "support",
		itemId: z["frostbite-touch"],
		mutationId: "nToBQW3xOzVt9WhX",
		mutationName: "Frostbite",
		name: "Freezing Touch",
		outcome: "The target gains Stunned unless they pass a Challenging (+0) Endurance Test.",
		range: "Touch",
		rules: "A given target can be stunned by this mutation only once per scene.",
		target: "single",
		usage: {
			max: 1,
			perTarget: !0,
			period: "scene"
		}
	}
], lt = [
	{
		actionType: "utility",
		conditions: ["The skin normally adapts to the surroundings automatically.", "Passing for an unmutated person instead requires the source's Average (+20) Cool Test to resist adapting for the scene."],
		duration: "One scene or until the surroundings materially change",
		id: "chameleon-skin-camouflage",
		implementation: "support",
		itemId: z["chameleon-skin-camouflage"],
		mutationId: "mEaGI63MtfCQ9KS7",
		mutationName: "Chameleon Skin",
		name: "Use Chameleon Camouflage",
		outcome: "Gain +20 Stealth while the skin matches the surroundings.",
		range: "Self",
		rules: "The conditional Stealth modifier and scene state remain player/GM guidance; this action records the deliberate use of camouflage.",
		target: "self"
	},
	{
		actionType: "utility",
		conditions: ["The mutant must have stored SL in the Spelleater Gland.", "When the gland absorbs a spell, record its SL and clear any unspent energy at the end of the next Round."],
		duration: "Applied to one spell as it is cast",
		id: "spelleater-gland-spend-sl",
		implementation: "support",
		itemId: z["spelleater-gland-spend-sl"],
		mutationId: "OTBdbPb9D9yfSFrm",
		mutationName: "Spelleater Gland",
		name: "Spend Stored Spell Energy",
		outcome: "Reduce the cast spell's CN by 1 for each stored SL spent.",
		range: "Self",
		rules: "Choose how many stored SL to consume before resolving the spell; do not spend more SL than the gland currently stores.",
		target: "self"
	},
	{
		actionType: "utility",
		conditions: ["Only Magical attacks can harm the mutant while Ethereal.", "Becoming solid with a limb inside an object destroys it; becoming solid with the body or head trapped is fatal."],
		duration: "WPB + SL rounds",
		id: "ethereal-become-insubstantial",
		implementation: "support",
		itemId: z["ethereal-become-insubstantial"],
		miscast: "minor",
		mutationId: "A7OLAWKXWUfh0UGU",
		mutationName: "Ethereal",
		name: "Become Ethereal",
		outcome: "On success, gain the Ethereal Creature Trait and become insubstantial for the duration.",
		range: "Self",
		rules: "Applying the outcome creates the managed Ethereal form and duration; the GM adjudicates trapped limbs or body parts when it ends.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "utility",
		conditions: ["The invisibility ends when the mutant draws attention by attacking or making a large noise.", "A viewer with Second Sight may make a Challenging (+0) Perception Test to notice the mutant nearby."],
		duration: "WP + SL rounds; double duration for each additional mutation level",
		id: "invisibility-vanish",
		implementation: "support",
		itemId: z["invisibility-vanish"],
		miscast: "minor",
		mutationId: "1YH1DgABwSXNaMI7",
		mutationName: "Invisibility",
		name: "Become Invisible",
		outcome: "On success, remain concealed from everyone without Second Sight.",
		range: "Self",
		rules: "Applying the outcome creates the timed concealment Effect; remove it early after an attack or sufficiently loud noise.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "utility",
		duration: "One scene",
		id: "oracle-foresight",
		implementation: "support",
		itemId: z["oracle-foresight"],
		miscast: "minor",
		mutationId: "0KO8587hDiF4PSCq",
		mutationName: "Oracle",
		name: "Moment-to-Moment Foresight",
		outcome: "On success, gain +10 Initiative and +1 Fortune per mutation level for the scene.",
		range: "Self",
		rules: "Applying the outcome creates the scene-long Initiative and Fortune bonuses and replaces an existing foresight Effect.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "utility",
		duration: "GM-determined",
		id: "wind-caller-breeze",
		implementation: "support",
		itemId: z["wind-caller-breeze"],
		miscast: "minor",
		mutationId: "UOkDReH2uUWWAgrf",
		mutationName: "Wind Caller",
		name: "Call a Breeze",
		outcome: "On success, make the wind blow slightly more or less within range.",
		range: "WP yards",
		rules: "This covers small wind effects; use the separate gust action for forceful feats.",
		target: "area",
		test: {
			characteristic: "wp",
			difficulty: "average"
		}
	},
	{
		actionType: "attack",
		conditions: ["Use this wrapper only when spending Advantage to make the Maw attack as a Free Action."],
		duration: "Immediate",
		id: "hungering-maw-free-bite",
		implementation: "support",
		itemId: z["hungering-maw-free-bite"],
		mutationId: "kMq1tiXJG6Pyp0nc",
		mutationName: "Hungering Maw",
		name: "Maw Free Bite",
		outcome: "Resolve a Bite attack dealing SB + 5 + SL Damage.",
		range: "Melee",
		rules: "Spend 1 Advantage before making the Melee (Brawling) attack; use the owned Bite normally for a primary Action.",
		target: "single",
		test: {
			SL: !0,
			attackType: "melee",
			bonusCharacteristic: "s",
			damage: !0,
			difficulty: "challenging",
			skill: "melee-brawling",
			specification: "+5"
		},
		usage: { advantageCost: 1 }
	},
	{
		actionType: "attack",
		conditions: ["The retained Tail result must be Saurian Tail."],
		duration: "Immediate",
		id: "tail-saurian-attack",
		implementation: "native",
		mutationId: "bSVbWpX8AcBSIyTU",
		mutationName: "Tail",
		name: "Saurian Tail Attack",
		outcome: "Resolve the owned Tail Attack (SB +2) Creature Trait.",
		range: "Melee",
		rules: "The source does not grant the Saurian Tail a separate Advantage-funded Free Action.",
		target: "single"
	},
	{
		actionType: "control",
		conditions: ["Use WPB instead of SB for forceful feats.", "Stunning an opponent requires an Opposed Test."],
		duration: "Immediate or the chosen Extended Test",
		id: "wind-caller-gust",
		implementation: "support",
		itemId: z["wind-caller-gust"],
		miscast: "minor",
		mutationId: "UOkDReH2uUWWAgrf",
		mutationName: "Wind Caller",
		name: "Call a Gust",
		outcome: "Create a gust to fill a sail, clear small debris, topple an object, or attempt to Stun an opponent.",
		range: "Source does not specify a range",
		rules: "The power may be performed as an Extended Test; resolve object resistance or the target's opposed Test manually.",
		target: "creature-or-object",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	}
], ut = [
	{
		actionType: "attack",
		conditions: ["First succeed at the separate Green Sovereign power Test.", "Branches count as Improvised Weapons."],
		duration: "Immediate",
		id: "green-sovereign-branch-strike",
		implementation: "support",
		itemId: z["green-sovereign-branch-strike"],
		mutationId: "O6QDcWXjqBD1C8R6",
		mutationName: "Green Sovereign",
		name: "Branch Strike",
		outcome: "Strike using WPB instead of SB, with normal Improvised Weapon rules.",
		qualities: ["undamaging"],
		range: "WP yards",
		rules: "This is the required Weapon Skill Test after the power Test succeeds.",
		target: "single",
		test: {
			SL: !0,
			attackType: "melee",
			bonusCharacteristic: "wp",
			characteristic: "ws",
			damage: !0,
			difficulty: "challenging",
			specification: "+1"
		}
	},
	{
		actionType: "control",
		conditions: ["First succeed at the separate Green Sovereign power Test."],
		duration: "Normal grapple duration",
		id: "green-sovereign-root-grapple",
		implementation: "support",
		itemId: z["green-sovereign-root-grapple"],
		mutationId: "O6QDcWXjqBD1C8R6",
		mutationName: "Green Sovereign",
		name: "Root and Vine Grapple",
		outcome: "Resolve the grapple using WPB instead of SB for feats of force.",
		range: "WP yards",
		rules: "This is the required Weapon Skill Test after the power Test succeeds.",
		target: "single",
		test: {
			characteristic: "ws",
			difficulty: "challenging"
		}
	},
	{
		actionType: "attack",
		conditions: ["First succeed at the separate Telekinesis power Test.", "Choose a throwing weapon or comparable projectile such as a knife or rock."],
		duration: "Immediate",
		id: "telekinesis-hurl-projectile",
		implementation: "support",
		itemId: z["telekinesis-hurl-projectile"],
		mutationId: "xpllKoAOD5X9C8Pi",
		mutationName: "Telekinesis",
		name: "Hurl Telekinetic Projectile",
		outcome: "Resolve the projectile's Damage and Qualities using WPB instead of SB.",
		range: "The selected throwing weapon's range",
		rules: "This is the required Ballistic Skill Test after the power Test succeeds.",
		target: "single",
		test: {
			characteristic: "bs",
			difficulty: "challenging"
		}
	},
	{
		actionType: "control",
		conditions: ["Use this combat touch Test before Leech Life; do not roll normal damage."],
		duration: "Immediate",
		id: "life-leech-combat-touch",
		implementation: "support",
		itemId: z["life-leech-combat-touch"],
		mutationId: "oyDtC4mkFBxcCYju",
		mutationName: "Life Leech",
		name: "Combat Touch",
		outcome: "Win the Opposed Test to touch the target, then use the Leech Life action.",
		range: "Touch",
		rules: "Outside combat, the source does not require this preliminary Test.",
		target: "single",
		test: {
			difficulty: "challenging",
			skill: "melee-brawling"
		}
	},
	{
		actionType: "control",
		conditions: ["Use this combat touch Test before Electric Touch."],
		duration: "Immediate",
		id: "thunderhead-combat-touch",
		implementation: "support",
		itemId: z["thunderhead-combat-touch"],
		mutationId: "sdXBHwy9bpRcLriW",
		mutationName: "Thunderhead",
		name: "Combat Touch",
		outcome: "Win the Melee (Brawling) Test to touch the target, then use Electric Touch.",
		range: "Touch",
		rules: "Outside combat, the source does not require this preliminary Test.",
		target: "single",
		test: {
			difficulty: "challenging",
			skill: "melee-brawling"
		}
	}
], dt = [
	{
		actionType: "control",
		duration: "Immediate",
		id: "gnawer-bite",
		implementation: "native",
		mutationId: "NSczK3KBMIJztNFL",
		mutationName: "Gnawer",
		name: "Bite",
		outcome: "Resolve the owned Bite (SB +1) Creature Trait attack.",
		range: "Melee",
		rules: "Ordinary bites use the native Creature Trait; the special gnawing action is catalogued separately.",
		target: "single"
	},
	{
		actionType: "utility",
		conditions: ["The target must be organic material such as wood or leather, and the mutant must be able to gnaw rather than merely bite it."],
		duration: "Measured per turn of sustained gnawing",
		id: "gnawer-gnaw",
		implementation: "support",
		itemId: z["gnawer-gnaw"],
		mutationId: "NSczK3KBMIJztNFL",
		mutationName: "Gnawer",
		name: "Gnaw Organic Material",
		outcome: "Deal twice the normal damage per turn to the organic material.",
		range: "Touch",
		rules: "This is sustained structural damage, not the ordinary Bite attack.",
		target: "object"
	},
	{
		actionType: "utility",
		conditions: ["Only vegetation and plants can be commanded."],
		duration: "GM-determined",
		id: "green-sovereign-command-plants",
		implementation: "support",
		itemId: z["green-sovereign-command-plants"],
		miscast: "minor",
		mutationId: "O6QDcWXjqBD1C8R6",
		mutationName: "Green Sovereign",
		name: "Command Plants",
		outcome: "On success, make plants perform a small non-combat feat such as shedding leaves, ripening fruit, or rattling branches.",
		range: "WP yards",
		rules: "The power controls existing vegetation; the GM adjudicates comparable small effects.",
		target: "area",
		test: {
			characteristic: "wp",
			difficulty: "average"
		}
	},
	{
		actionType: "attack",
		conditions: ["The source requires both the Challenging (+0) Willpower Test and a Weapon Skill Test.", "Choose either an Improvised Weapon branch strike or a grapple using roots and vines."],
		duration: "Immediate strike or normal grapple duration",
		id: "green-sovereign-strike-or-grapple",
		implementation: "support",
		itemId: z["green-sovereign-strike-or-grapple"],
		miscast: "minor",
		mutationId: "O6QDcWXjqBD1C8R6",
		mutationName: "Green Sovereign",
		name: "Plant Strike or Grapple",
		outcome: "On success, proceed to the provided branch-strike or root-grapple Test.",
		range: "WP yards",
		rules: "This is the power Test; roll the separate Weapon Skill action after it succeeds.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "attack",
		conditions: ["The target must be engaged with the mutant in melee.", "A shield can block this attack as though it were a projectile."],
		duration: "Immediate",
		id: "gut-worm-attack",
		implementation: "support",
		itemId: z["gut-worm-attack"],
		mutationId: "sfoURj3eoxtUYRFf",
		mutationName: "Gut Worm",
		name: "Gut Worm Free Attack",
		outcome: "On success, the worm deals SB + 1 + SL Damage.",
		range: "Engaged target",
		rules: "Spend 1 Advantage before rolling the Ballistic Skill attack as a Free Action.",
		target: "single",
		test: {
			SL: !0,
			attackType: "ranged",
			bonusCharacteristic: "s",
			characteristic: "bs",
			damage: !0,
			difficulty: "challenging",
			specification: "+1"
		},
		usage: { advantageCost: 1 }
	},
	{
		actionType: "attack",
		duration: "Immediate",
		id: "horns-attack",
		implementation: "native",
		mutationId: "0KJD1mq4myyF3ghQ",
		mutationName: "Horns",
		name: "Horns",
		outcome: "Resolve the owned Horns (SB +3) Creature Trait attack.",
		range: "Melee",
		rules: "Each additional mutation level increases the configured attack Damage by 1.",
		target: "single"
	},
	{
		actionType: "control",
		conditions: ["Each affected creature gains 1 Deafened and must pass Challenging (+0) Cool or gain Fear 1.", "A creature with Skittish gains 3 Broken instead."],
		duration: "Conditions persist normally",
		id: "horrid-scream-unleash",
		implementation: "support",
		itemId: z["horrid-scream-unleash"],
		mutationId: "zwl6VTWh854Bvheu",
		mutationName: "Horrid Scream",
		name: "Unleash Horrid Scream",
		outcome: "Affect every eligible creature in range with Deafened and the mutation's fear response.",
		range: "WP yards",
		rules: "This costs an Action. Each affected creature resolves its own Cool Test.",
		target: "area"
	},
	{
		actionType: "attack",
		duration: "Immediate",
		id: "hungering-maw-bite",
		implementation: "native",
		mutationId: "kMq1tiXJG6Pyp0nc",
		mutationName: "Hungering Maw",
		name: "Maw Bite",
		outcome: "Resolve the owned Bite (SB +5) Creature Trait attack.",
		range: "Melee",
		rules: "The Bite can be used as the primary attack normally; the mutation also permits a 1-Advantage Free Action.",
		target: "single"
	},
	{
		actionType: "control",
		conditions: ["Choose this instead of inflicting Bite damage."],
		duration: "Normal grapple duration",
		id: "hungering-maw-grapple",
		implementation: "support",
		itemId: z["hungering-maw-grapple"],
		mutationId: "kMq1tiXJG6Pyp0nc",
		mutationName: "Hungering Maw",
		name: "Maw Free Grapple",
		outcome: "Make an Opposed Melee (Brawling) Test to grapple the target with the maw.",
		range: "Melee",
		rules: "Spend 1 Advantage to use the maw as a Free Action; use the ordinary primary action when no Advantage is spent.",
		target: "single",
		test: {
			difficulty: "challenging",
			skill: "melee-brawling"
		},
		usage: { advantageCost: 1 }
	},
	{
		actionType: "attack",
		conditions: ["The Fire and Cold Immunity grants are separate from this action."],
		duration: "Immediate",
		id: "infernal-furnace-breath",
		implementation: "support",
		itemId: z["infernal-furnace-breath"],
		mutationId: "IUBfAizppAlcAgWL",
		mutationName: "Infernal Furnace",
		name: "Infernal Breath",
		outcome: "Resolve a Breath (TB x2, Fire) Creature Trait attack.",
		range: "As Breath (TB x2, Fire)",
		rules: "Illumination is continuous; use the separate body-Critical burst and death-explosion actions when those triggers occur.",
		target: "area",
		test: {
			SL: !0,
			attackType: "ranged",
			bonusCharacteristic: "t",
			bonusMultiplier: 2,
			characteristic: "t",
			damage: !0,
			difficulty: "challenging",
			specification: "x2, Fire"
		}
	},
	{
		actionType: "movement",
		duration: "WPB + SL rounds; double duration for each additional mutation level",
		id: "levitation-rise",
		implementation: "support",
		itemId: z["levitation-rise"],
		miscast: "minor",
		mutationId: "rMh2lJZMML0W61MH",
		mutationName: "Levitation",
		name: "Levitate",
		outcome: "On success, gain Flight with a rating equal to 30 times the mutation level.",
		range: "Self",
		rules: "Applying the outcome creates the timed Flight Effect and replaces an existing Levitation Effect.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "attack",
		conditions: ["In combat, first win an Opposed Melee (Brawling) Test to touch the target; do not roll normal Brawling damage.", "The target may be a living creature or organic material such as plant matter, leather, or cloth."],
		duration: "Immediate",
		id: "life-leech-touch",
		implementation: "support",
		itemId: z["life-leech-touch"],
		miscast: "minor",
		mutationId: "oyDtC4mkFBxcCYju",
		mutationName: "Life Leech",
		name: "Leech Life",
		outcome: "Deal SL Damage ignoring Armour to creatures, or reduce an object's AP by SL, then heal the same amount.",
		range: "Touch",
		rules: "Toughness still protects creatures. Add 1 Damage per additional mutation level; each Damage may instead count as one good meal.",
		target: "creature-or-object",
		test: {
			SL: !0,
			attackType: "melee",
			characteristic: "wp",
			damage: !0,
			difficulty: "challenging",
			specification: "+0"
		}
	},
	{
		actionType: "attack",
		duration: "Immediate",
		id: "long-spines-attack",
		implementation: "native",
		mutationId: "xplswIRGiyIn5L6X",
		mutationName: "Long Spines",
		name: "Ram with Spines",
		outcome: "Resolve the owned Horns (SB +1), named for the spines, as a melee attack.",
		range: "Melee",
		rules: "Retained upgrades may add Venom, retractability, or +1 Damage.",
		target: "single"
	},
	{
		actionType: "utility",
		conditions: ["The mutant must be familiar with the imitated person.", "The imitated person must be no more than one Size step smaller or larger."],
		duration: "WP + (SL x 10) minutes; double duration for each additional mutation level",
		id: "mirror-image-disguise",
		implementation: "support",
		itemId: z["mirror-image-disguise"],
		miscast: "minor",
		mutationId: "XheCM6GZG8FhAoGp",
		mutationName: "Mirror Image",
		name: "Assume a Mirror Image",
		outcome: "On success, assume the target person's face, stature, clothing, and voice.",
		range: "Self",
		rules: "Those without Second Sight are fooled automatically; Second Sight permits Perception, but dispelling is required to see through it.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "skill",
		duration: "As the Augury Skill",
		id: "oracle-augury",
		implementation: "support",
		itemId: z["oracle-augury"],
		miscast: "minor",
		mutationId: "0KO8587hDiF4PSCq",
		mutationName: "Oracle",
		name: "Augury",
		outcome: "Resolve the owned Augury Skill using its Winds of Magic rules.",
		range: "As the Augury Skill",
		rules: "The mutation grants 10 Augury Advances per level and permits one use per day.",
		target: "none",
		test: {
			difficulty: "challenging",
			skill: "augury"
		},
		usage: {
			max: 1,
			period: "day"
		}
	}
], ft = [
	{
		actionType: "control",
		duration: "As the owned Creature Trait",
		id: "petrifying-gaze",
		implementation: "native",
		mutationId: "91fvvDsNtm8bfqOM",
		mutationName: "Petrifying Gaze",
		name: "Petrifying Gaze",
		outcome: "Resolve the owned Petrifying Gaze Creature Trait.",
		range: "As the owned Petrifying Gaze Creature Trait",
		rules: "The Core Creature Trait supplies its Test and degree-based effects.",
		target: "single"
	},
	{
		actionType: "utility",
		conditions: ["The illusion is static unless animated with the separate action.", "A viewer with Second Sight may make a Difficult (-10) Perception Test, but must dispel the illusion to see through it."],
		duration: "WP + (SL x 10) minutes",
		id: "phantasmal-mind-illusion",
		implementation: "support",
		itemId: z["phantasmal-mind-illusion"],
		miscast: "minor",
		mutationId: "tZZlX68I8HTDr3Db",
		mutationName: "Phantasmal Mind",
		name: "Create Phantasmal Image",
		outcome: "On success, create a static illusionary image chosen by the mutant.",
		range: "Source does not specify the area's range",
		rules: "Viewers without Second Sight are fooled automatically; people outside the chosen area do not see it.",
		target: "area",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "utility",
		conditions: ["A Phantasmal Mind illusion must already be active."],
		duration: "One round",
		id: "phantasmal-mind-animate",
		implementation: "support",
		itemId: z["phantasmal-mind-animate"],
		mutationId: "tZZlX68I8HTDr3Db",
		mutationName: "Phantasmal Mind",
		name: "Animate Phantasmal Image",
		outcome: "On success, animate the otherwise static illusion during the round.",
		range: "The active illusion's area",
		rules: "This action does not extend the illusion's original duration.",
		target: "area",
		test: {
			characteristic: "wp",
			difficulty: "hard"
		}
	},
	{
		actionType: "attack",
		conditions: ["Apply the retained Venom (Average) result when present.", "With Bloodsucker, lodging, ongoing Wounds, severing, and regrowth remain manual reactive or timed rules."],
		duration: "Immediate",
		id: "piercing-tongue-attack",
		implementation: "support",
		itemId: z["piercing-tongue-attack"],
		mutationId: "uAYtIoGnhuRpIjs9",
		mutationName: "Piercing Tongue",
		name: "Piercing Tongue",
		outcome: "On a successful Ballistic Skill Test, deal SB + SL Damage with the Precise Quality.",
		qualities: ["precise"],
		range: "4 yards",
		rules: "The tongue itself can sustain 2 Wounds and regrows two inches per week if severed.",
		target: "single",
		test: {
			SL: !0,
			attackType: "ranged",
			bonusCharacteristic: "s",
			characteristic: "bs",
			damage: !0,
			difficulty: "challenging",
			specification: "+0"
		}
	},
	{
		actionType: "attack",
		duration: "Immediate",
		id: "pincer-claw-attack",
		implementation: "native",
		mutationId: "Sak78tbYEARrf7RD",
		mutationName: "Pincer Claw",
		name: "Pincer Claw",
		outcome: "Resolve the owned Weapon (SB +4) Creature Trait attack.",
		range: "Melee",
		rules: "The separately owned Constrictor Trait governs constriction; the claw cannot wield items or use Dexterity Skills.",
		target: "single"
	},
	{
		actionType: "utility",
		conditions: ["Setting a creature Ablaze requires flammable clothing or fur."],
		duration: "Immediate ignition; Ablaze persists normally",
		id: "pyrokinesis-ignite",
		implementation: "support",
		itemId: z["pyrokinesis-ignite"],
		miscast: "minor",
		mutationId: "5KF01h4PSOrrABbf",
		mutationName: "Pyrokinesis",
		name: "Ignite",
		outcome: "On success, light a torch or campfire, or set an eligible target Ablaze.",
		range: "WP yards",
		rules: "The action increases heat until something suitable catches fire; the GM confirms whether a target is flammable.",
		target: "creature-or-object",
		test: {
			characteristic: "wp",
			difficulty: "average"
		}
	},
	{
		actionType: "attack",
		conditions: ["Each creature in the area makes an Average (+20) Endurance Test or gains 1 Ablaze.", "Toughness and Armour protect against the blast's Damage normally."],
		duration: "Immediate; Ablaze persists normally",
		id: "pyrokinesis-blast",
		implementation: "support",
		itemId: z["pyrokinesis-blast"],
		miscast: "minor",
		mutationId: "5KF01h4PSOrrABbf",
		mutationName: "Pyrokinesis",
		name: "Fire Blast",
		outcome: "On success, deal WPB + SL Damage throughout the area.",
		range: "WPB-yard area",
		rules: "Resolve Damage and each target's Endurance Test from the original action card.",
		target: "area",
		test: {
			SL: !0,
			attackType: "ranged",
			bonusCharacteristic: "wp",
			characteristic: "wp",
			damage: !0,
			difficulty: "challenging",
			specification: "+0"
		}
	},
	{
		actionType: "attack",
		conditions: ["The mutation requires at least one clawless hand when acquired."],
		duration: "Immediate",
		id: "razor-sharp-claws-attack",
		implementation: "support",
		itemId: z["razor-sharp-claws-attack"],
		mutationId: "5KLgj76uWOvi1Hx0",
		mutationName: "Razor-sharp Claws",
		name: "Razor-sharp Claws",
		outcome: "Resolve an unarmed attack with the Damaging Quality.",
		qualities: ["damaging"],
		range: "Melee",
		rules: "Retained acquisition determines whether the claws are retractable; that property does not change the attack.",
		target: "single",
		test: {
			SL: !0,
			attackType: "melee",
			bonusCharacteristic: "s",
			characteristic: "ws",
			damage: !0,
			difficulty: "challenging",
			specification: "+0"
		}
	},
	{
		actionType: "skill",
		conditions: ["The mutant must touch the person or object being read."],
		duration: "As the Psychometry Skill",
		id: "scrying-touch-psychometry",
		implementation: "support",
		itemId: z["scrying-touch-psychometry"],
		mutationId: "EcZopIPOTXZofeHh",
		mutationName: "Scrying Touch",
		name: "Psychometry",
		outcome: "Resolve the owned Psychometry Skill using its Winds of Magic rules.",
		range: "Touch",
		rules: "The mutation grants 10 Psychometry Advances per level; apply Fatigued after an ungloved reading when the source rule is triggered.",
		target: "creature-or-object",
		test: {
			difficulty: "challenging",
			skill: "psychometry"
		}
	},
	{
		actionType: "attack",
		duration: "As the owned Web Creature Trait",
		id: "spiderkin-web",
		implementation: "native",
		mutationId: "rmqh8BM8Bsa2pK8S",
		mutationName: "Spiderkin",
		name: "Web",
		outcome: "Resolve the owned Web (T) Creature Trait attack.",
		range: "SB x 3 yards",
		rules: "The Core Web Creature Trait supplies its Test and entangling effects.",
		target: "single"
	}
], pt = [
	{
		actionType: "control",
		conditions: ["Target every creature currently engaged with the mutant."],
		duration: "Resolve at the end of each Round",
		id: "burning-body-aura",
		implementation: "support",
		itemId: z["burning-body-aura"],
		mutationId: "jTQNDgvjHRM2s357",
		mutationName: "Burning Body",
		name: "Resolve Burning Aura",
		outcome: "Each target tests Challenging Endurance or gains 1 Ablaze.",
		range: "Engaged creatures",
		rules: "Select the engaged creatures, then apply the outcome from this card.",
		target: "multiple"
	},
	{
		actionType: "control",
		conditions: ["Target sentient creatures in range that are not already affected this Round."],
		duration: "One Round",
		id: "contagious-madness-aura",
		implementation: "support",
		itemId: z["contagious-madness-aura"],
		mutationId: "1TCTKzF5nkk90k4A",
		mutationName: "Contagious Madness",
		name: "Resolve Contagious Madness Aura",
		outcome: "Each target tests Average Cool; failures roll on the Contagious Madness Table.",
		range: "Willpower yards",
		rules: "Select all newly exposed sentient creatures, then apply the outcome from this card.",
		target: "multiple"
	},
	{
		actionType: "control",
		conditions: ["Use after the mutant suffers a Critical Wound to the body."],
		duration: "Immediate",
		id: "infernal-furnace-critical-burst",
		implementation: "support",
		itemId: z["infernal-furnace-critical-burst"],
		mutationId: "IUBfAizppAlcAgWL",
		mutationName: "Infernal Furnace",
		name: "Resolve Body-Critical Flame Burst",
		outcome: "Creatures within 2 yards test Average Endurance or gain 1 Ablaze.",
		range: "2 yards",
		rules: "Select every creature in range, then apply the outcome from this card.",
		target: "multiple"
	},
	{
		actionType: "attack",
		conditions: ["Use when the mutant dies."],
		duration: "Immediate",
		id: "infernal-furnace-death-explosion",
		implementation: "support",
		itemId: z["infernal-furnace-death-explosion"],
		mutationId: "IUBfAizppAlcAgWL",
		mutationName: "Infernal Furnace",
		name: "Resolve Death Explosion",
		outcome: "Each target suffers TB x3 Damage and gains 1 Ablaze.",
		range: "TB x3 yards",
		rules: "Select every creature in range. Apply Damage normally; the outcome applies Ablaze.",
		target: "multiple"
	},
	{
		actionType: "control",
		conditions: ["Target every living creature within range."],
		duration: "Resolve each Round",
		id: "tantalising-aura",
		implementation: "support",
		itemId: z["tantalising-aura"],
		mutationId: "UocYY55QaW15zWYk",
		mutationName: "Tantalising Aura",
		name: "Resolve Tantalising Aura",
		outcome: "Each target tests Average Willpower or gains Surprised and must approach the mutant.",
		range: "WPB yards",
		rules: "Select all living creatures in range, then apply the outcome from this card.",
		target: "multiple"
	}
], B = (e) => ({
	...e,
	implementation: "support",
	itemId: z[e.id]
}), mt = [
	B({
		actionType: "control",
		duration: "Immediate",
		id: "additional-head-control",
		mutationId: "gnBENJ8AzIgoa39t",
		mutationName: "Additional Head",
		name: "Resist the Additional Head",
		outcome: "Retain control when the secondary head can directly pursue its own Ambition.",
		range: "Self",
		rules: "Test when the secondary head has a direct opportunity to pursue its own Ambition.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "average"
		}
	}),
	B({
		actionType: "companion",
		duration: "Persistent; regrows one month after destruction",
		id: "bodysnatcher-drone-deploy",
		mutationId: "LgBwqZBzYaVggfVI",
		mutationName: "Bodysnatcher Drone",
		name: "Create Bodysnatcher Drone",
		outcome: "Create or recover a linked Tiny drone Actor with its printed profile.",
		range: "Willpower yards while active",
		rules: "Applying the outcome creates one managed drone Actor and links it to this mutant.",
		target: "self"
	}),
	B({
		actionType: "form",
		conditions: ["The assumed humanoid species must have been observed for at least one hour."],
		duration: "TB + SL hours",
		id: "shapeshifter-assume-form",
		miscast: "minor",
		mutationId: "NDDLEunW5biRvTfy",
		mutationName: "Shapeshifter",
		name: "Assume Observed Form",
		outcome: "Create a timed Shapeshifter form marker.",
		range: "Self",
		rules: "Record the copied appearance in the effect after applying the outcome.",
		target: "self",
		test: {
			characteristic: "t",
			difficulty: "challenging"
		}
	}),
	B({
		actionType: "form",
		duration: "Immediate",
		id: "shapeshifter-revert-form",
		mutationId: "NDDLEunW5biRvTfy",
		mutationName: "Shapeshifter",
		name: "Revert Shapeshifter Form",
		outcome: "Remove the managed Shapeshifter form.",
		range: "Self",
		rules: "Apply this outcome to return to the mutant's natural form.",
		target: "self"
	}),
	B({
		actionType: "form",
		conditions: ["Target the consumed humanoid or ordinary beast whose form is being stored."],
		duration: "Until voluntarily reverted or a new source is consumed",
		id: "skinwalker-assume-form",
		mutationId: "JtmI1wOwKqWT4zVG",
		mutationName: "Skinwalker",
		name: "Assume Consumed Form",
		outcome: "Copy the selected source Actor's physical Characteristics and movement into a managed form.",
		range: "Self",
		rules: "The four-hour consumption and source eligibility remain GM-verified prerequisites.",
		target: "single"
	}),
	B({
		actionType: "form",
		duration: "Immediate",
		id: "skinwalker-revert-form",
		mutationId: "JtmI1wOwKqWT4zVG",
		mutationName: "Skinwalker",
		name: "Revert Skinwalker Form",
		outcome: "Remove the managed Skinwalker form and copied Characteristics.",
		range: "Self",
		rules: "Apply this outcome to return to the mutant's natural form.",
		target: "self"
	}),
	B({
		actionType: "companion",
		duration: "Persistent",
		id: "spectral-companion-manifest",
		mutationId: "wpD9QuU8AuxSExbe",
		mutationName: "Spectral Companion",
		name: "Create Spectral Companion",
		outcome: "Create or recover a linked companion Actor using the retained type, name, and ambitions.",
		range: "Willpower yards",
		rules: "The GM supplies or imports the chosen spirit's full creature profile if needed.",
		target: "self"
	}),
	B({
		actionType: "form",
		duration: "Until reformed",
		id: "swarmform-transform",
		miscast: "minor",
		mutationId: "q3sK3RsdsJxrifZP",
		mutationName: "Swarmform",
		name: "Become the Swarm",
		outcome: "Apply the Swarm form, retained Size, and source-specific movement.",
		range: "Self",
		rules: "The form retains current Wounds and completes after one Round.",
		target: "self",
		test: {
			characteristic: "t",
			difficulty: "challenging"
		}
	}),
	B({
		actionType: "form",
		duration: "Immediate",
		id: "swarmform-reform",
		mutationId: "q3sK3RsdsJxrifZP",
		mutationName: "Swarmform",
		name: "Reform from the Swarm",
		outcome: "Remove the managed Swarm form and its movement override.",
		range: "Self",
		rules: "The GM resolves separated or destroyed portions before reformation.",
		target: "self"
	}),
	B({
		actionType: "companion",
		duration: "Permanent",
		id: "symbiotic-twin-manifest",
		mutationId: "Og9cw0jROsunkR2j",
		mutationName: "Symbiotic Twins",
		name: "Create Symbiotic Twin",
		outcome: "Clone the host into a linked twin Actor at the moment of acquisition.",
		range: "Any distance for telepathy",
		rules: "Use once after acquisition; the two Actors progress independently afterward.",
		target: "self"
	}),
	B({
		actionType: "companion",
		duration: "Permanent while attached",
		id: "vestigial-twin-manifest",
		mutationId: "33Y5xaZHFZxqaT9Q",
		mutationName: "Vestigial Twin",
		name: "Create Vestigial Twin",
		outcome: "Create or recover a linked immobile twin Actor with the printed characteristic penalties.",
		range: "Attached",
		rules: "The managed Actor records the retained personality, motivation, and ambitions.",
		target: "self"
	}),
	B({
		actionType: "form",
		duration: "One battle",
		id: "warp-spasm-transform",
		mutationId: "jPlCrsK3hTgkHsTR",
		mutationName: "Warp Spasm",
		name: "Enter Warp Spasm",
		outcome: "Apply Fear 1 and temporary Frenzy, Berserk Charge, Contortionist, and Painless support Items.",
		range: "Self",
		rules: "The form ends automatically with combat or by using End Warp Spasm.",
		target: "self"
	}),
	B({
		actionType: "form",
		duration: "Immediate",
		id: "warp-spasm-end",
		mutationId: "jPlCrsK3hTgkHsTR",
		mutationName: "Warp Spasm",
		name: "End Warp Spasm",
		outcome: "Remove Warp Spasm support and gain 1 Fatigued.",
		range: "Self",
		rules: "Apply ignored Critical Wound penalties before ending the form.",
		target: "self"
	}),
	B({
		actionType: "form",
		conditions: ["Apply the Morrslieb modifier printed in the mutation before rolling."],
		duration: "Until reverted",
		id: "werebeast-transform",
		miscast: "minor",
		mutationId: "mNNavbJayRcsyeXJ",
		mutationName: "Werebeast",
		name: "Assume Werebeast Form",
		outcome: "Activate the retained Bestial Body grants as a managed werebeast form.",
		range: "Self",
		rules: "Transformation takes one Round; retained acquisition choices define the form.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	}),
	B({
		actionType: "form",
		conditions: ["Apply the inverse Morrslieb modifier printed in the mutation before rolling."],
		duration: "Immediate",
		id: "werebeast-revert",
		miscast: "minor",
		mutationId: "mNNavbJayRcsyeXJ",
		mutationName: "Werebeast",
		name: "Revert Werebeast Form",
		outcome: "Remove the managed Werebeast form and its temporary grants.",
		range: "Self",
		rules: "Reversion takes one Round.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	})
], ht = [
	{
		actionType: "control",
		conditions: ["The retained Tail result must be Mace Tail."],
		duration: "Immediate",
		id: "tail-mace-free-attack",
		implementation: "support",
		itemId: z["tail-mace-free-attack"],
		mutationId: "bSVbWpX8AcBSIyTU",
		mutationName: "Tail",
		name: "Mace Tail Free Attack",
		outcome: "Resolve the owned Weapon (SB +3) Creature Trait attack with Pummel.",
		qualities: ["pummel"],
		range: "Melee",
		rules: "Spend 1 Advantage to attack as a Free Action; the tail may instead attack normally as the primary action.",
		target: "single",
		test: {
			SL: !0,
			attackType: "melee",
			bonusCharacteristic: "s",
			characteristic: "ws",
			damage: !0,
			difficulty: "challenging",
			specification: "+3"
		},
		usage: { advantageCost: 1 }
	},
	{
		actionType: "attack",
		conditions: ["The retained Tail result must be Prehensile Tail.", "The tail must be holding a weapon within its SB Encumbrance allowance."],
		duration: "Immediate",
		id: "tail-prehensile-free-attack",
		implementation: "support",
		itemId: z["tail-prehensile-free-attack"],
		mutationId: "bSVbWpX8AcBSIyTU",
		mutationName: "Tail",
		name: "Prehensile Tail Free Attack",
		outcome: "Resolve an attack with the weapon held by the tail.",
		range: "The held weapon's range",
		rules: "Spend 1 Advantage to attack as a Free Action; the held weapon may instead attack normally as the primary action.",
		target: "single",
		usage: { advantageCost: 1 }
	},
	{
		actionType: "attack",
		conditions: ["The retained Tail result must be Scorpion Stinger."],
		duration: "Immediate",
		id: "tail-scorpion-free-attack",
		implementation: "support",
		itemId: z["tail-scorpion-free-attack"],
		mutationId: "bSVbWpX8AcBSIyTU",
		mutationName: "Tail",
		name: "Scorpion Stinger Free Attack",
		outcome: "Resolve the owned Weapon (SB +3) Creature Trait with Impale and Venom (Average).",
		qualities: ["impale"],
		range: "Melee",
		rules: "Spend 1 Advantage to attack as a Free Action; the stinger may instead attack normally as the primary action.",
		target: "single",
		test: {
			SL: !0,
			attackType: "melee",
			bonusCharacteristic: "s",
			characteristic: "ws",
			damage: !0,
			difficulty: "challenging",
			specification: "+3"
		},
		usage: { advantageCost: 1 }
	},
	{
		actionType: "control",
		conditions: ["Use WP instead of Strength to determine carrying capacity and to resolve contested lifting."],
		duration: "WP rounds",
		id: "telekinesis-move-object",
		implementation: "support",
		itemId: z["telekinesis-move-object"],
		miscast: "minor",
		mutationId: "xpllKoAOD5X9C8Pi",
		mutationName: "Telekinesis",
		name: "Move Object with Telekinesis",
		outcome: "On success, move matter at WPB yards per round.",
		range: "Source does not specify an initial range",
		rules: "The duration and any contested lifting remain player/GM guidance until timed and opposed effects are implemented.",
		target: "object",
		test: {
			characteristic: "wp",
			difficulty: "average"
		}
	},
	{
		actionType: "attack",
		conditions: ["The source requires both the Challenging (+0) Willpower Test and a Ballistic Skill Test.", "The projectile must be a throwing weapon or comparable object such as a knife or rock."],
		duration: "Immediate",
		id: "telekinesis-hurl-weapon",
		implementation: "support",
		itemId: z["telekinesis-hurl-weapon"],
		miscast: "minor",
		mutationId: "xpllKoAOD5X9C8Pi",
		mutationName: "Telekinesis",
		name: "Hurl Weapon with Telekinesis",
		outcome: "On success, proceed to the provided Ballistic Skill projectile Test.",
		range: "The thrown weapon's range",
		rules: "This is the power Test; roll the separate projectile action after it succeeds.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "control",
		conditions: ["The target must be sentient, within range, and either visible or known to be in the area.", "The target may reply without a Test during the same round."],
		duration: "The same round",
		id: "telepathy-project-thoughts",
		implementation: "support",
		itemId: z["telepathy-project-thoughts"],
		miscast: "minor",
		mutationId: "ihjcMhBrb24nwkhm",
		mutationName: "Telepathy",
		name: "Project Thoughts",
		outcome: "On success, project thoughts into the target's mind as an Action.",
		range: "WP yards",
		rules: "Charm, Intimidation, and other social Skills work as they do in ordinary communication.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "average"
		}
	},
	{
		actionType: "control",
		conditions: [
			"The target must be sentient, within range, and either visible or known to be in the area.",
			"Reading memories applies -30; the subconscious cannot be raided.",
			"A failed Opposed Test prevents targeting that creature again until after eight hours of rest."
		],
		duration: "Immediate",
		id: "telepathy-read-thoughts",
		implementation: "support",
		itemId: z["telepathy-read-thoughts"],
		miscast: "minor",
		mutationId: "ihjcMhBrb24nwkhm",
		mutationName: "Telepathy",
		name: "Read Thoughts",
		outcome: "Win an Opposed Willpower Test to read surface thoughts or memories; fewer than 2 SL alerts the target.",
		range: "WP yards",
		rules: "The Telepathy mutation tracks failed opposed targets until a confirmed eight-hour rest; successful opposed uses do not create a cooldown.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "utility",
		conditions: ["After resolving the Test, roll 1d10; on a 10 the mutant ages one full year."],
		duration: "The current turn",
		id: "temporal-instability-surge",
		implementation: "support",
		itemId: z["temporal-instability-surge"],
		miscast: "major",
		mutationId: "b5xKInMaTt8ljJVQ",
		mutationName: "Temporal Instability",
		name: "Plunge Forward in Time",
		outcome: "On success, gain one additional Movement and Action during the turn.",
		range: "Self",
		rules: "The extra turn resources and possible aging remain guidance so rerolls cannot leave stale state.",
		target: "self",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "attack",
		conditions: ["Apply the retained Venom (Average) result when present."],
		duration: "Immediate",
		id: "thorns-launch",
		implementation: "support",
		itemId: z["thorns-launch"],
		mutationId: "3I87KH11NFbNEfIW",
		mutationName: "Thorns",
		name: "Launch Thorn",
		outcome: "On a successful Ballistic Skill Test, deal 1 + SL Damage.",
		range: "10 + SB yards",
		rules: "This ranged attack costs an Action.",
		target: "single",
		test: {
			SL: !0,
			attackType: "ranged",
			characteristic: "bs",
			damage: !0,
			difficulty: "challenging",
			specification: "+1"
		}
	},
	{
		actionType: "attack",
		conditions: ["The +1 Damage also applies when the mutant makes a Grappling attack."],
		duration: "Immediate",
		id: "thorns-unarmed",
		implementation: "support",
		itemId: z["thorns-unarmed"],
		mutationId: "3I87KH11NFbNEfIW",
		mutationName: "Thorns",
		name: "Thorn-covered Unarmed Attack",
		outcome: "Resolve an Unarmed or Grappling attack with +1 Damage.",
		range: "Melee",
		rules: "Use Melee (Brawling); the ranged thorn-launching action is catalogued separately.",
		target: "single",
		test: {
			SL: !0,
			attackType: "melee",
			bonusCharacteristic: "s",
			damage: !0,
			difficulty: "challenging",
			skill: "melee-brawling",
			specification: "+1"
		}
	},
	{
		actionType: "control",
		conditions: ["In combat, first win a Melee (Brawling) Test to touch the target."],
		duration: "Stunned persists normally",
		id: "thunderhead-shock",
		implementation: "support",
		itemId: z["thunderhead-shock"],
		miscast: "minor",
		mutationId: "sdXBHwy9bpRcLriW",
		mutationName: "Thunderhead",
		name: "Electric Touch",
		outcome: "Win an Opposed Willpower versus Toughness Test to Stun the touched target.",
		range: "Touch",
		rules: "Resolve the additional combat touch Test before the opposed power Test when required.",
		target: "single",
		test: {
			characteristic: "wp",
			difficulty: "challenging"
		}
	},
	{
		actionType: "attack",
		conditions: ["Metal armour does not protect against this Damage."],
		duration: "Immediate; Blinded persists normally",
		id: "thunderhead-lightning-bolt",
		implementation: "support",
		itemId: z["thunderhead-lightning-bolt"],
		miscast: "minor",
		mutationId: "sdXBHwy9bpRcLriW",
		mutationName: "Thunderhead",
		name: "Lightning Bolt",
		outcome: "On success, deal WPB + SL Damage and inflict 1 Blinded.",
		range: "WPB yards",
		rules: "The action card reports Damage and Blinded guidance without applying irreversible outcome state.",
		target: "single",
		test: {
			SL: !0,
			attackType: "ranged",
			bonusCharacteristic: "wp",
			characteristic: "wp",
			damage: !0,
			difficulty: "challenging",
			specification: "+0"
		}
	}
], gt = Object.freeze([
	...ct,
	...dt,
	...ft,
	...ht,
	...ut,
	...lt,
	...pt,
	...mt
]), _t = new Map(gt.map((e) => [e.id, e])), V = /* @__PURE__ */ new Map();
for (let e of gt) {
	let t = V.get(e.mutationId) ?? [];
	t.push(e), V.set(e.mutationId, t);
}
new Map([...V].map(([e, t]) => [e, Object.freeze(t)]));
function vt(e) {
	return _t.get(e);
}
//#endregion
//#region src/functions/mutants-handbook/actions/outcomes.ts
var yt = {
	"bodysnatcher-drone-deploy": [{
		companion: "bodysnatcher-drone",
		kind: "companion",
		subject: "self",
		when: "always"
	}],
	"bloomblight-touch-heal": [{
		amount: "fellowship-plus-sl",
		kind: "heal",
		subject: "targets",
		when: "success"
	}, {
		characteristic: "t",
		difficulty: "challenging",
		failureConditions: [],
		failureRoll: {
			formula: "1d5",
			label: "Bloomblight symptom: 1 Buboes, 2 Fever, 3 Flux, 4 Nausea, 5 Pox; lasts 1d10 days"
		},
		kind: "follow-up-test",
		subject: "targets",
		when: "success"
	}],
	"chameleon-skin-camouflage": [{
		effect: "camouflage",
		kind: "effect",
		subject: "self",
		when: "always"
	}],
	"burning-body-aura": [{
		characteristic: "t",
		difficulty: "challenging",
		failureConditions: [{ condition: "ablaze" }],
		kind: "follow-up-test",
		subject: "targets",
		when: "always"
	}],
	"contagious-madness-aura": [{
		difficulty: "average",
		failureConditions: [],
		failureRoll: {
			formula: "1d100",
			label: "Contagious Madness Table result (this Round)"
		},
		kind: "follow-up-test",
		skill: "Cool",
		subject: "targets",
		when: "always"
	}],
	"entrancement-beguile": [{
		effect: "entrancement",
		kind: "effect",
		subject: "targets",
		when: "success"
	}],
	"ethereal-become-insubstantial": [{
		form: "ethereal",
		kind: "form",
		mode: "activate",
		subject: "self",
		when: "success"
	}],
	"evil-eye-gaze": [
		{
			condition: "stunned",
			kind: "condition",
			subject: "self",
			when: "failure"
		},
		{
			condition: "fatigued",
			kind: "condition",
			subject: "targets",
			when: "success"
		},
		{
			characteristic: "t",
			difficulty: "hard",
			failureConditions: [{ condition: "prone" }],
			kind: "follow-up-test",
			subject: "targets",
			when: "success"
		}
	],
	"fleshcrafter-stop-bleeding": [{
		amount: "sl",
		condition: "bleeding",
		kind: "remove-condition",
		subject: "targets",
		when: "success"
	}],
	"frostbite-touch": [{
		characteristic: "t",
		difficulty: "challenging",
		failureConditions: [{ condition: "stunned" }],
		kind: "follow-up-test",
		subject: "targets",
		when: "always"
	}],
	"horrid-scream-unleash": [{
		condition: "deafened",
		kind: "condition",
		subject: "targets",
		when: "always"
	}, {
		characteristic: "wp",
		difficulty: "challenging",
		failureConditions: [{ condition: "broken" }],
		kind: "follow-up-test",
		subject: "targets",
		when: "always"
	}],
	"invisibility-vanish": [{
		effect: "invisible",
		kind: "effect",
		subject: "self",
		when: "success"
	}],
	"infernal-furnace-critical-burst": [{
		characteristic: "t",
		difficulty: "average",
		failureConditions: [{ condition: "ablaze" }],
		kind: "follow-up-test",
		subject: "targets",
		when: "always"
	}],
	"infernal-furnace-death-explosion": [{
		condition: "ablaze",
		kind: "condition",
		subject: "targets",
		when: "always"
	}],
	"levitation-rise": [{
		effect: "levitation",
		kind: "effect",
		subject: "self",
		when: "success"
	}],
	"life-leech-touch": [{
		amount: "sl",
		kind: "heal",
		subject: "self",
		when: "success"
	}],
	"mirror-image-disguise": [{
		form: "mirror-image",
		kind: "form",
		mode: "activate",
		subject: "self",
		when: "success"
	}],
	"oracle-foresight": [{
		effect: "foresight",
		kind: "effect",
		subject: "self",
		when: "success"
	}],
	"pyrokinesis-blast": [{
		characteristic: "t",
		difficulty: "average",
		failureConditions: [{ condition: "ablaze" }],
		kind: "follow-up-test",
		subject: "targets",
		when: "success"
	}],
	"pyrokinesis-ignite": [{
		condition: "ablaze",
		kind: "condition",
		subject: "targets",
		when: "success"
	}],
	"shapeshifter-assume-form": [{
		form: "shapeshifter",
		kind: "form",
		mode: "activate",
		subject: "self",
		when: "success"
	}],
	"shapeshifter-revert-form": [{
		form: "shapeshifter",
		kind: "form",
		mode: "revert",
		subject: "self",
		when: "always"
	}],
	"skinwalker-assume-form": [{
		form: "skinwalker",
		kind: "form",
		mode: "activate",
		source: "targets",
		subject: "self",
		when: "always"
	}],
	"skinwalker-revert-form": [{
		form: "skinwalker",
		kind: "form",
		mode: "revert",
		subject: "self",
		when: "always"
	}],
	"spectral-companion-manifest": [{
		companion: "spectral-companion",
		kind: "companion",
		subject: "self",
		when: "always"
	}],
	"swarmform-reform": [{
		form: "swarmform",
		kind: "form",
		mode: "revert",
		subject: "self",
		when: "always"
	}],
	"swarmform-transform": [{
		form: "swarmform",
		kind: "form",
		mode: "activate",
		subject: "self",
		when: "success"
	}],
	"symbiotic-twin-manifest": [{
		companion: "symbiotic-twin",
		kind: "companion",
		subject: "self",
		when: "always"
	}],
	"telekinesis-move-object": [{
		effect: "telekinesis",
		kind: "effect",
		subject: "self",
		when: "success"
	}],
	"tantalising-aura": [{
		characteristic: "wp",
		difficulty: "average",
		failureConditions: [{ condition: "surprised" }],
		kind: "follow-up-test",
		subject: "targets",
		when: "always"
	}],
	"temporal-instability-surge": [{
		effect: "temporal-surge",
		kind: "effect",
		subject: "self",
		when: "success"
	}, {
		formula: "1d10",
		kind: "roll",
		label: "Temporal Instability ageing (10 = one year)",
		when: "always"
	}],
	"thunderhead-lightning-bolt": [{
		condition: "blinded",
		kind: "condition",
		subject: "targets",
		when: "success"
	}],
	"thunderhead-shock": [{
		condition: "stunned",
		kind: "condition",
		subject: "targets",
		when: "success"
	}],
	"vestigial-twin-manifest": [{
		companion: "vestigial-twin",
		kind: "companion",
		subject: "self",
		when: "always"
	}],
	"warp-spasm-end": [{
		form: "warp-spasm",
		kind: "form",
		mode: "revert",
		subject: "self",
		when: "always"
	}],
	"warp-spasm-transform": [{
		form: "warp-spasm",
		kind: "form",
		mode: "activate",
		subject: "self",
		when: "always"
	}],
	"werebeast-revert": [{
		form: "werebeast",
		kind: "form",
		mode: "revert",
		subject: "self",
		when: "success"
	}],
	"werebeast-transform": [{
		form: "werebeast",
		kind: "form",
		mode: "activate",
		subject: "self",
		when: "success"
	}]
};
function bt(e) {
	return yt[e] ?? [];
}
Object.freeze(Object.keys(yt));
//#endregion
//#region src/functions/mutants-handbook/automation/size.ts
function xt(e, t, n, r, i) {
	let a = [
		"tiny",
		"ltl",
		"sml",
		"avg",
		"lrg",
		"enor",
		"mnst"
	], o = e.find((e) => e.type === "trait" && e.name === r && !e.system?.disabled), s = Object.entries(n).find(([, e]) => e === o?.system?.specification?.value)?.[0] ?? (e.some((e) => e.type === "talent" && e.name === i) ? "sml" : "avg"), c = t > 0 ? "yhzLZ7Ud1kdTZa8r" : "tIHHlqp9hHTCFeTg", l = e.filter((e) => {
		let t = e.flags?.["fvtt-wfrp-ratter"], n = t?.mutationAutomation;
		return e.type === "mutation" && n?.definitionId === c && t?.mutantsHandbookRetired !== !0 && t?.mutantsHandbookPossessionRemoved !== !0;
	}).length, u = a.indexOf(s), d = Math.max(0, Math.min(a.length - 1, u + t * l));
	return t > 0 ? u < 5 && d >= 5 : u >= 5 && d < 5;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/grant-reconciliation/acquisition-grants.ts
var St = /* @__PURE__ */ new Set([
	"armour",
	"psychology",
	"skill",
	"talent",
	"trait",
	"weapon"
]), Ct = /* @__PURE__ */ new Set([
	"configuration",
	"rank",
	"singleton"
]), wt = 256, Tt = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]), Et = /^Compendium\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.Item\.[A-Za-z0-9_-]+$/, Dt = /^[A-Za-z0-9][A-Za-z0-9:_-]{0,127}$/, H = Symbol("invalid-acquisition-value"), Ot = "bSVbWpX8AcBSIyTU", kt = {
	mace: ["tail-mace-free-attack", "Mace Tail: Free Attack"],
	prehensile: ["tail-prehensile-free-attack", "Prehensile Tail: Free Attack"],
	scorpion: ["tail-scorpion-free-attack", "Scorpion Stinger: Free Attack"]
};
function U(e) {
	if (typeof e != "object" || !e || Array.isArray(e)) return !1;
	let t = Object.getPrototypeOf(e);
	return t === Object.prototype || t === null;
}
function W(e, t, n = 0) {
	if (e === null || typeof e == "string" || typeof e == "boolean") return e;
	if (typeof e == "number") return Number.isFinite(e) ? e : H;
	if (n >= 20 || typeof e != "object" || !e || t.has(e)) return H;
	if (t.add(e), Array.isArray(e)) {
		let r = [];
		for (let i of e) {
			let e = W(i, t, n + 1);
			if (e === H) return H;
			r.push(e);
		}
		return t.delete(e), r;
	}
	if (!U(e)) return H;
	let r = {};
	for (let [i, a] of Object.entries(e)) {
		if (Tt.has(i)) return H;
		let e = W(a, t, n + 1);
		if (e === H) return H;
		r[i] = e;
	}
	return t.delete(e), r;
}
function At(e) {
	let t = e.replace(/^system\./, ""), n = t.split(".");
	return t.length > 0 && n.every((e) => e && !Tt.has(e)) ? t : void 0;
}
function jt(e) {
	if (e === void 0 || !U(e) || Object.keys(e).some((e) => e !== "name" && e !== "system")) return;
	let t = {};
	if (e.name !== void 0) {
		if (typeof e.name != "string" || e.name.trim().length === 0) return;
		t.name = e.name;
	}
	if (e.system !== void 0) {
		if (!U(e.system)) return;
		let n = {}, r = [];
		for (let [t, i] of Object.entries(e.system)) {
			let e = At(t), a = W(i, /* @__PURE__ */ new Set());
			if (!e || a === H || r.some((t) => e.startsWith(`${t}.`) || t.startsWith(`${e}.`))) return;
			r.push(e), n[t] = a;
		}
		t.system = n;
	}
	return t;
}
function Mt(e) {
	if (!U(e)) return;
	let t = /* @__PURE__ */ new Set([
		"aggregate",
		"aggregateKey",
		"configure",
		"key",
		"name",
		"ranks",
		"scope",
		"sourceUuid",
		"stack",
		"type"
	]);
	if (Object.keys(e).some((e) => !t.has(e))) return;
	let { key: n, name: r, sourceUuid: i, type: a } = e;
	if (typeof n != "string" || !Dt.test(n) || typeof r != "string" || r.trim().length === 0 || typeof i != "string" || !Et.test(i) || typeof a != "string" || !St.has(a)) return;
	let o = e.stack ?? "singleton";
	if (typeof o != "string" || !Ct.has(o) || o === "rank" && a !== "skill" && a !== "talent" || e.scope !== void 0 && e.scope !== "first" || e.aggregate !== void 0 && e.aggregate !== "latest" || e.aggregate === "latest" && o !== "configuration") return;
	let s = e.aggregateKey;
	if (s !== void 0 && (typeof s != "string" || s.trim().length === 0 || s.length > wt) || e.ranks !== void 0 && (!Number.isSafeInteger(e.ranks) || Number(e.ranks) < 1) || e.ranks !== void 0 && a !== "skill" && a !== "talent") return;
	let c = jt(e.configure);
	if (e.configure === void 0 || c !== void 0) return {
		...e.aggregate === "latest" ? { aggregate: "latest" } : {},
		...typeof s == "string" ? { aggregateKey: s } : {},
		...c ? { configure: c } : {},
		key: n,
		name: r,
		...e.ranks === void 0 ? {} : { ranks: Number(e.ranks) },
		...e.scope === "first" ? { scope: "first" } : {},
		sourceUuid: i,
		stack: o,
		type: a
	};
}
function Nt(e) {
	return !U(e) || e.status !== "resolved" || e.version !== void 0 && e.version !== 1 || !Number.isSafeInteger(e.occurrence) || Number(e.occurrence) < 1 || !U(e.rolls) || !U(e.selections) || W(e.rolls, /* @__PURE__ */ new Set()) === H || W(e.selections, /* @__PURE__ */ new Set()) === H || !Array.isArray(e.grants) ? !1 : e.acceptedBlocks === void 0 || Array.isArray(e.acceptedBlocks) && e.acceptedBlocks.every((e) => U(e) && Object.keys(e).every((e) => e === "kind" || e === "message") && typeof e.kind == "string" && typeof e.message == "string");
}
function Pt(t) {
	let n = t.flags?.[e]?.mutationAutomation;
	if (!U(n) || n.definitionId === "mNNavbJayRcsyeXJ") return [];
	let r = n.state;
	if (!U(r) || !Nt(r.acquisition)) return [];
	let i = r.acquisition.grants.map(Mt).filter((e) => e !== void 0), a = /* @__PURE__ */ new Map();
	for (let e of i) a.set(e.key, (a.get(e.key) ?? 0) + 1);
	return i.filter((e) => a.get(e.key) === 1);
}
function Ft(t) {
	let n = t.flags?.[e]?.mutationAutomation;
	if (!U(n)) return;
	let r = n.state;
	if (!U(r)) return;
	let i = r.acquisition;
	if (!U(i) || i.version !== void 0 && i.version !== 1) return;
	let a = i.occurrence;
	return Number.isSafeInteger(a) && Number(a) > 0 ? Number(a) : void 0;
}
function It(t) {
	let n = t.flags?.[e]?.mutationAutomation;
	if (!U(n) || n.definitionId !== Ot) return;
	let r = n.state;
	if (!U(r)) return;
	let i = r.acquisition;
	if (!U(i) || i.status !== "resolved") return;
	let a = i.selections;
	if (!U(a) || typeof a.tail != "string") return;
	let o = kt[a.tail];
	if (!o) return;
	let [s, c] = o;
	return {
		key: `mutation-action:${s}`,
		name: c,
		sourceUuid: `Compendium.${e}.ratter-11-items.Item.${z[s]}`,
		stack: "singleton",
		type: "trait"
	};
}
function Lt(e, t = []) {
	if (e.flags?.["fvtt-wfrp-ratter"]?.mutationAutomation && e.flags["fvtt-wfrp-ratter"].mutationAutomation.definitionId === "yhzLZ7Ud1kdTZa8r" && e.actor && (!game || !xt(Array.from(e.actor.items, (e) => e.toObject()), 1, Reflect.get(game, "wfrp4e").config.actorSizes, game.i18n.localize("NAME.Size"), game.i18n.localize("NAME.Small")))) return [];
	let n = t.map(Mt).filter((e) => e !== void 0), r = new Map(n.map((e) => [e.key, e])), i = It(e);
	i && r.set(i.key, i);
	for (let t of Pt(e)) {
		let e = r.get(t.key), n = e?.stack === "configuration" && t.stack === "configuration";
		r.set(t.key, {
			...t,
			...n && e.aggregate === "latest" && t.aggregate === void 0 ? { aggregate: "latest" } : {},
			...n && e.aggregateKey && t.aggregateKey === void 0 ? { aggregateKey: e.aggregateKey } : {}
		});
	}
	return [...r.values()];
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/grant-reconciliation/helpers.ts
function G(e) {
	return Array.from(e.items);
}
function Rt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.createEmbeddedDocuments == "function" && typeof t.deleteEmbeddedDocuments == "function" && t.items !== void 0;
}
function zt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.name == "string" && typeof t.type == "string" && typeof t.toObject == "function";
}
function K(t) {
	let n = t.flags?.[e]?.mutationAutomation;
	if (typeof n != "object" || !n) return;
	let r = n;
	if (!(typeof r.definitionId != "string" || typeof r.version != "number" || r.grants !== void 0 && !Array.isArray(r.grants))) return n;
}
function Bt(t) {
	return t.getFlag(e, c) === !0;
}
function q(e) {
	return Bt(e) || e.getFlag("fvtt-wfrp-ratter", "mutantsHandbookRetired") === !0;
}
function Vt(e, t, n) {
	return G(e).filter((e) => e.type === "mutation" && !q(e) && K(e)?.definitionId === n).sort((e, t) => e.id.localeCompare(t.id))[0]?.id === t.id;
}
async function Ht(e, t, n) {
	t.update ? await t.update(n) : await e.updateEmbeddedDocuments("Item", [{
		_id: t.id,
		...n
	}]);
}
function Ut(e, t, n, r) {
	let i = I(e), a = L(e).map((e) => ({
		grantKey: "legacy",
		ownerId: e
	})), o = [...i?.owners ?? a];
	return o.some((e) => e.ownerId === r.ownerId && e.grantKey === r.grantKey) || o.push(r), {
		managed: i?.managed ?? R(e),
		owners: o,
		signature: n,
		sourceUuid: t.sourceUuid,
		version: 2
	};
}
function Wt(e, t, n, r, i) {
	let a = G(e).filter((e) => rt(e, t, n)).sort((e, t) => e.id.localeCompare(t.id)), o = a.find((e) => {
		let t = I(e);
		return t?.signature === r && t.owners.some((e) => e.ownerId === i.ownerId && e.grantKey === i.grantKey);
	});
	return (n.stack ?? "singleton") === "rank" ? o ?? a.find((e) => L(e).includes(i.ownerId)) : a.filter((e) => {
		let t = I(e);
		return t?.signature === r || !t && L(e).length === 0 && (n.type === "skill" || it(e, n.sourceUuid));
	}).sort((e, t) => +(I(e)?.managed === !0) - (I(t)?.managed === !0) || e.id.localeCompare(t.id))[0] || a.find((e) => L(e).includes(i.ownerId)) || a.find((e) => {
		let t = I(e);
		return t?.signature === r || !t && L(e).length === 0 && it(e, n.sourceUuid);
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/grant-reconciliation/owner-cleanup.ts
async function J(t, n, r) {
	let i = [];
	for (let a of G(t)) {
		let o = I(a), s = L(a), c = (o?.owners ?? []).filter((e) => {
			if (e.ownerId !== n) return !0;
			let t = r.get(e.grantKey);
			return t !== void 0 && t.signature === o?.signature && (t.itemId === void 0 || t.itemId === a.id);
		}), l = [...r.values()], u = l.some((e) => e.itemId === a.id), d = l.some((e) => e.itemId === void 0), f = s.filter((e) => e !== n || u || d);
		if (c.length === (o?.owners.length ?? 0) && f.length === s.length) continue;
		if ((o?.managed ?? R(a)) && c.length === 0 && f.length === 0 && !at(a)) {
			i.push(a.id);
			continue;
		}
		let p = {};
		f.length > 0 ? (p[`flags.${e}.mutationGrantOwners`] = f, R(a) && (p[`flags.${e}.mutationGrantManaged`] = !0)) : (p[`flags.${e}.-=mutationGrantManaged`] = null, p[`flags.${e}.-=mutationGrantOwners`] = null), o && c.length > 0 ? p[`flags.${e}.mutationGrant`] = {
			...o,
			owners: c
		} : o && (p[`flags.${e}.-=mutationGrant`] = null), await Ht(t, a, p);
	}
	i.length > 0 && await t.deleteEmbeddedDocuments("Item", i);
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/ranked-skill-items.ts
function Y(e) {
	return Array.from(e.items);
}
function Gt(e) {
	if (typeof e != "object" || !e) return !1;
	let t = e;
	return typeof t.name == "string" && typeof t.type == "string" && typeof t.toObject == "function";
}
function Kt(e) {
	let t = e.toObject().system;
	if (typeof t != "object" || !t) return 0;
	let n = t.advances;
	if (typeof n != "object" || !n) return 0;
	let r = Number(n.value);
	return Number.isFinite(r) ? r : 0;
}
function qt(e) {
	let t = at(e);
	if (t) return {
		...t,
		legacy: !1
	};
	let n = I(e);
	if (!n) return;
	let r;
	try {
		r = JSON.parse(n.signature);
	} catch {
		return;
	}
	if (typeof r != "object" || !r) return;
	let i = r;
	if (i.stack !== "rank" || i.type !== "skill") return;
	let a = Number(i.ranks);
	if (!Number.isFinite(a) || a <= 0) return;
	let o = n.owners.map((e) => ({
		...e,
		ranks: a,
		signature: n.signature,
		sourceUuid: n.sourceUuid
	}));
	return {
		appliedRanks: a * o.length,
		legacy: !0,
		managed: n.managed,
		owners: o
	};
}
function Jt(e, t) {
	let n = Kt(e), r = qt(e);
	if (!r) return Math.max(0, n);
	let i = r.legacy && t !== void 0 ? Math.max(r.appliedRanks, Math.min(t, n)) : r.appliedRanks;
	return Math.max(0, n - i);
}
function Yt(e) {
	return qt(e)?.managed === !0;
}
function Xt(e, t) {
	let n = typeof e.system == "object" && e.system !== null ? e.system : {};
	e.system = n;
	let r = n.advances, i = typeof r == "object" && r ? r : {};
	n.advances = i, i.value = t;
}
function Zt(t, n) {
	let r = typeof t.flags == "object" && t.flags !== null ? t.flags : {};
	t.flags = r;
	let i = typeof r["fvtt-wfrp-ratter"] == "object" && r["fvtt-wfrp-ratter"] !== null ? r[e] : {};
	r[e] = i, i.mutationSkillGrant = n;
}
async function Qt(e, t, n) {
	let r = { skipExperienceChecks: !0 };
	t.update ? await t.update(n, r) : await e.updateEmbeddedDocuments("Item", [{
		_id: t.id,
		...n
	}], r);
}
function $t(t) {
	return {
		"system.advances.value": t,
		[`flags.${e}.-=mutationSkillGrant`]: null
	};
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/grant-reconciliation/ranked-grant-data.ts
function en(e) {
	if (e.type !== "talent") return;
	let t = I(e);
	if (!t || !F(t.signature)) return;
	let n = 0;
	try {
		n = Number(JSON.parse(t.signature).ranks);
	} catch {
		return;
	}
	if (!(!Number.isFinite(n) || n <= 0)) return {
		appliedRanks: n * t.owners.length,
		legacy: !0,
		managed: t.managed,
		owners: t.owners.map((e) => ({
			...e,
			ranks: n,
			signature: t.signature,
			sourceUuid: t.sourceUuid
		}))
	};
}
function X(e) {
	return qt(e) ?? en(e);
}
function tn(e, t) {
	let n = en(e);
	if (!n) return Jt(e, t);
	let r = e.toObject().system, i = Number(r?.advances?.value ?? 0), a = t === void 0 ? n.appliedRanks : Math.max(n.appliedRanks, Math.min(t, i));
	return Math.max(0, i - a);
}
function nn(e) {
	let t = X(e);
	return t?.managed === !1 ? 0 : t ? 2 : 1;
}
function rn(e, t) {
	return X(e)?.owners.some((e) => F(e.signature) === t) ?? !1;
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/skill-grant-reconciliation.ts
function Z(e, t) {
	return e < t ? -1 : +(e > t);
}
function an(e, t) {
	let n = { ...t.grant };
	return delete n.ranks, rt(e, { name: t.name }, n);
}
async function on(e, t) {
	let n = /* @__PURE__ */ new Map();
	return await Promise.all(t.map(async ({ grant: t, mutation: r }) => {
		if (t.type !== "skill" && t.type !== "talent") return;
		let i = $e(t);
		if (t.configure?.name || n.has(i)) return;
		let a = P(t), o = Y(e).find((e) => e.type === t.type && X(e)?.owners.some((e) => e.sourceUuid === t.sourceUuid && (e.ownerId === r.id && e.grantKey === t.key || e.signature === a)));
		if (o) {
			n.set(i, o.name);
			return;
		}
		let s = await fromUuid(t.sourceUuid);
		Gt(s) && s.type === t.type && n.set(i, s.name);
	})), t.flatMap(({ grant: e, mutation: t }) => {
		if (e.type !== "skill" && e.type !== "talent") return [];
		let r = $e(e);
		return [{
			grant: e,
			grantKey: e.key,
			identity: r,
			mutationName: t.name,
			name: e.configure?.name ?? n.get(r) ?? e.name,
			ownerId: t.id,
			ranks: e.ranks ?? 1,
			signature: P(e),
			sourceUuid: e.sourceUuid
		}];
	});
}
function sn(e) {
	return e.map(({ grantKey: e, ownerId: t, ranks: n, signature: r, sourceUuid: i }) => ({
		grantKey: e,
		ownerId: t,
		ranks: n,
		signature: r,
		sourceUuid: i
	}));
}
async function cn(e, t) {
	let n = t[0];
	if (!n) return;
	let r = await fromUuid(n.sourceUuid);
	if (!Gt(r) || r.type !== n.grant.type) {
		ui.notifications.warn(`${n.mutationName}: could not grant ${n.name}. Enable its source module and reconcile mutation automation.`);
		return;
	}
	let i = nt(r.toObject(), n.grant);
	if (delete i._id, delete i._key, Xt(i, 0), Zt(i, {
		appliedRanks: 0,
		managed: !0,
		owners: [],
		version: 1
	}), !(await e.createEmbeddedDocuments("Item", [i], {
		skipExperienceChecks: !0,
		skipSpecialisationChoice: !0
	})).find(Gt) && !Y(e).some((e) => an(e, n))) throw Error(`${n.mutationName}: Foundry prevented the ${n.name} grant.`);
	await un(e, n.identity, t, !1);
}
async function ln(e, t) {
	let n = [];
	for (let r of t) {
		let t = X(r);
		if (!t) continue;
		let i = tn(r);
		t.managed && i === 0 && !I(r) ? n.push(r.id) : await Qt(e, r, $t(i));
	}
	n.length > 0 && await e.deleteEmbeddedDocuments("Item", n);
}
async function un(t, n, r, i = !0) {
	let a = r[0], o = Y(t).filter((e) => a ? an(e, a) : rn(e, n)).sort((e, t) => nn(e) - nn(t) || Z(e.id, t.id));
	if (r.length === 0) {
		await ln(t, o);
		return;
	}
	let s = o[0];
	if (!s) {
		if (!i) throw Error(`${a?.name ?? "Ranked Item"}: Foundry did not retain the mutation grant.`);
		await cn(t, r);
		return;
	}
	let c = o.slice(1).filter((e) => X(e));
	o.slice(1).filter((e) => !X(e)).length > 0 && ui.notifications.warn(`${a?.name}: multiple user-owned Items share this configuration. Mutation advances were applied only to ${s.name}; review the duplicates manually.`);
	let l = r.reduce((e, t) => e + t.ranks, 0), u = tn(s, l), d = {
		appliedRanks: l,
		managed: X(s)?.managed ?? I(s)?.managed ?? !1,
		owners: sn(r),
		version: 1
	};
	await Qt(t, s, {
		"system.advances.value": u + l,
		[`flags.${e}.mutationSkillGrant`]: d
	});
	let f = [];
	for (let e of c) {
		let n = tn(e);
		(Yt(e) || X(e)?.managed) && n === 0 && !I(e) ? f.push(e.id) : (await Qt(t, e, $t(n)), n > 0 && ui.notifications.warn(`${a?.name}: retained a duplicate Item containing non-mutation advances; review the duplicate manually.`));
	}
	f.length > 0 && await t.deleteEmbeddedDocuments("Item", f);
}
async function dn(e, t) {
	let n = await on(e, t), r = /* @__PURE__ */ new Map();
	for (let e of n) {
		let t = r.get(e.identity) ?? [];
		t.push(e), r.set(e.identity, t);
	}
	let i = /* @__PURE__ */ new Set();
	for (let t of Y(e)) for (let e of X(t)?.owners ?? []) {
		let t = F(e.signature);
		t && i.add(t);
	}
	for (let t of [...i].filter((e) => !r.has(e)).sort(Z)) await un(e, t, []);
	for (let t of [...r.keys()].sort(Z)) await un(e, t, (r.get(t) ?? []).sort((e, t) => Z(e.ownerId, t.ownerId) || Z(e.grantKey, t.grantKey)));
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/automation/grant-reconciliation.ts
var Q = /* @__PURE__ */ new Map();
async function fn(t, n, r, i, a) {
	let o = nt(n.toObject(), r);
	delete o._id, delete o._key;
	let s = typeof o.flags == "object" && o.flags !== null ? o.flags : {};
	o.flags = s;
	let c = typeof s["fvtt-wfrp-ratter"] == "object" && s["fvtt-wfrp-ratter"] !== null ? s[e] : {};
	return s[e] = c, c.mutationGrant = {
		managed: !0,
		owners: [a],
		signature: i,
		sourceUuid: r.sourceUuid,
		version: 2
	}, (await t.createEmbeddedDocuments("Item", [o], { skipSpecialisationChoice: !0 }))[0]?.id;
}
async function pn(t, n, r) {
	let i = P(r), a = await fromUuid(r.sourceUuid);
	if (!zt(a) || a.type !== r.type) return ui.notifications.warn(`${n.name}: could not grant ${r.configure?.name ?? r.key}. Enable its source module and reconcile mutation automation.`), { signature: i };
	let o = {
		grantKey: r.key,
		ownerId: n.id
	}, s = Wt(t, a, r, i, o);
	if (!s) {
		let e = await fn(t, a, r, i, o);
		return e ? {
			itemId: e,
			signature: i
		} : { signature: i };
	}
	let c = Ut(s, r, i, o), l = s.flags?.["fvtt-wfrp-ratter"] ?? {};
	return JSON.stringify(I(s)) === JSON.stringify(c) && !("mutationGrantManaged" in l) && !("mutationGrantOwners" in l) || await Ht(t, s, {
		[`flags.${e}.mutationGrant`]: c,
		[`flags.${e}.-=mutationGrantManaged`]: null,
		[`flags.${e}.-=mutationGrantOwners`]: null
	}), {
		itemId: s.id,
		signature: i
	};
}
async function mn(e) {
	let t = G(e).filter((e) => e.type === "mutation" && !q(e)), n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map();
	for (let [o, s] of t.entries()) {
		let t = K(s);
		if (!t) continue;
		let c = (a.get(t.definitionId) ?? 0) + 1;
		a.set(t.definitionId, c), r.set(s.id, /* @__PURE__ */ new Map());
		for (let a of Lt(s, t.grants)) if (!(a.scope === "first" && !Vt(e, s, t.definitionId))) {
			if ((a.type === "skill" || a.type === "talent") && a.stack === "rank") n.push({
				grant: a,
				mutation: s
			});
			else if (a.aggregate === "latest" && a.stack === "configuration") {
				let e = `${t.definitionId}\0${a.aggregateKey ?? a.key}`, n = i.get(e) ?? [];
				n.push({
					grant: a,
					mutation: s,
					occurrence: Ft(s) ?? c,
					order: o
				}), i.set(e, n);
			} else r.get(s.id)?.set(a.key, await pn(e, s, a));
		}
	}
	await dn(e, n);
	for (let t of i.values()) {
		t.sort((e, t) => e.occurrence - t.occurrence || e.order - t.order);
		let n = t.at(-1)?.grant;
		if (n) for (let i of t) r.get(i.mutation.id)?.set(n.key, await pn(e, i.mutation, n));
	}
	for (let n of t) {
		let t = r.get(n.id);
		t && await J(e, n.id, t);
	}
	let o = new Set(G(e).filter((e) => e.type === "mutation" && !q(e) && K(e) !== void 0).map((e) => e.id)), s = /* @__PURE__ */ new Set();
	for (let t of G(e)) {
		for (let e of I(t)?.owners ?? []) o.has(e.ownerId) || s.add(e.ownerId);
		for (let e of L(t)) o.has(e) || s.add(e);
	}
	for (let t of s) await J(e, t, /* @__PURE__ */ new Map());
}
async function hn(e, t) {
	let n = (Q.get(e) ?? Promise.resolve()).catch(() => void 0).then(t);
	Q.set(e, n);
	try {
		await n;
	} finally {
		Q.get(e) === n && Q.delete(e);
	}
}
async function gn(e) {
	let t = await fromUuid(e);
	if (!Rt(t)) throw Error(`Mutation automation could not resolve Actor ${e}.`);
	await hn(e, () => mn(t));
}
async function _n(e, t) {
	let n = await fromUuid(e);
	if (!Rt(n)) throw Error(`Mutation automation could not resolve Actor ${e}.`);
	await hn(e, async () => {
		await J(n, t, /* @__PURE__ */ new Map()), await mn(n);
	});
}
//#endregion
//#region src/module/wfrp4e/mutants-handbook/mutation-drop.ts
function vn(e) {
	return {
		toughness: Number(e.system.characteristics.t.bonus),
		willpower: Number(e.system.characteristics.wp.bonus)
	};
}
function yn(e, t) {
	return se(t, vn(e));
}
function $(e) {
	return e.abortItemCreation = !0, e.mutationAcquisitionCancelled = !0, !1;
}
function bn(e, t) {
	return e.name === t.mutationName && m(e.system.mutationType.value) === t.nature;
}
async function xn(e, t, n) {
	let r = k(e);
	if (!r) return !0;
	let i = O(t);
	if (r.actorUuid !== t.uuid) return M(`${e.name} was rolled for another Actor and cannot be acquired here.`), $(n);
	if (!bn(e, r)) return M(`${e.name} no longer matches the rolled mutation card.`), $(n);
	if (i?.kind !== "mutation" || i.token !== r.token) return M(`${e.name} is no longer awaiting acquisition for ${t.name}.`), $(n);
	let a = Number(t.system.status.resilience.value);
	if (a > 0 && await Qe(t.name, e.name)) {
		let i = yn(t, r.nature);
		return await x(t, {
			[E]: null,
			"system.status.corruption.value": h(Number(t.system.status.corruption.value), i),
			"system.status.resilience.value": Math.max(0, a - 1)
		}), e.updateSource?.({ [Ne]: null }), await j(A("Resisted", {
			loss: i,
			mutation: e.name,
			name: t.name
		})), $(n);
	}
	return n.mutationAcquisitionCanReroll = !1, n.mutationAcquisitionHandlesChimeranRetirement = !0, !0;
}
async function Sn(e, t) {
	for (let n of t) {
		let t = A("ChaosSpawn", {
			bonus: n === "physical" ? "Toughness Bonus" : "Willpower Bonus",
			name: e.name,
			nature: n
		});
		M(t), await j(t);
	}
}
async function Cn(t) {
	let n = k(t), r = t.actor;
	if (!n || !r) return !1;
	let i = O(r);
	if (i?.kind !== "mutation" || i.token !== n.token) throw Error(`${t.name} is not the pending mutation for ${r.name}.`);
	if (!bn(t, n)) throw Error(`${t.name} no longer matches its pending mutation result.`);
	let a = yn(r, n.nature), s = [];
	try {
		t.name.trim().toLowerCase() === "chimeran curse" && (s = await Ae(r));
		let n = le(Ee(r), vn(r));
		await x(r, {
			[E]: null,
			...n.length > 0 ? { [`flags.${e}.${o}`]: !0 } : {},
			"system.status.corruption.value": h(Number(r.system.status.corruption.value), a)
		});
		try {
			await t.update?.({ [Ne]: null }, { skipMutationAcquisition: !0 });
		} catch (e) {
			console.warn(`${t.name}: could not clear its completed mutation-drop marker.`, e);
		}
		return await j(A("Gained", {
			loss: a,
			mutation: t.name,
			name: r.name
		})), await Sn(r, n), !0;
	} catch (e) {
		let n = [e];
		try {
			await je(r, s);
		} catch (e) {
			n.push(e);
		}
		try {
			await r.deleteEmbeddedDocuments("Item", [t.id]);
		} catch (e) {
			n.push(e);
		}
		throw n.length > 1 ? AggregateError(n, `Failed to roll back mutation acquisition for ${r.name}.`, { cause: e }) : e;
	}
}
//#endregion
export { c as $, we as A, pe as B, Oe as C, Se as D, Ae as E, ve as F, ie as G, se as H, ye as I, l as J, m as K, b as L, me as M, y as N, xe as O, _e as P, te as Q, he as R, De as S, ke as T, h as U, fe as V, oe as W, s as X, r as Y, ee as Z, Ie as _, bt as a, k as b, Xe as c, A as d, n as et, j as f, O as g, Re as h, _n as i, t as it, x as j, w as k, Ye as l, M as m, xn as n, f as nt, vt as o, We as p, ae as q, gn as r, e as rt, Ze as s, Cn as t, p as tt, Qe as u, Le as v, Te as w, Ee as x, Ue as y, _ as z };

//# sourceMappingURL=mutation-drop-BHS5UE2d.js.map