function checkForUninitializedTabs() {
	if (document.querySelectorAll('.tabs-vertical:not([data-tabs-instantiated])')) {
		initTabs();
	}
}

function initTabs() {
	const allTabsComponentsOnPage: any = document.querySelectorAll('.tabs-vertical');
	const allTablistssOnPage: NodeList = document.querySelectorAll('[role="tablist"]');

	for (let i = 0; i < allTabsComponentsOnPage.length; i++) {
		let indexOfThisComponent = i;
		let thisComponent: any = allTabsComponentsOnPage[i];
		thisComponent.setAttribute('data-tabs-instantiated', true);

		let tabsOfThisComponent = allTabsComponentsOnPage[i].querySelectorAll('[role="tab"]');
		let panelsOfThisComponent = allTabsComponentsOnPage[i].querySelectorAll('[role="tabpanel"]');

		generateAttrs(tabsOfThisComponent, panelsOfThisComponent, indexOfThisComponent);
		addTabListeners(tabsOfThisComponent);
	}
}
function generateAttrs(tabsOfThisComponent, panelsOfThisComponent, indexOfThisComponent) {
	const componentPrefix: string = 'tabs-vert';
	const tabPrefix: string = 'tab';
	const panelPrefix: string = 'panel';
	for (let i = 0; i < tabsOfThisComponent.length; i++) {
		let thisTabID = `${componentPrefix}-${indexOfThisComponent}-${tabPrefix}-${i}`;
		let thisPanelID = `${componentPrefix}-${indexOfThisComponent}-${panelPrefix}-${i}`;

		tabsOfThisComponent[i].id = thisTabID;
		tabsOfThisComponent[i].setAttribute('aria-controls', thisPanelID);
		panelsOfThisComponent[i].id = thisPanelID;
		panelsOfThisComponent[i].setAttribute('aria-labelledby', thisTabID);
	}
}
function addTabListeners(tabsOfThisComponent) {
	for (let thisTab of tabsOfThisComponent) {
		thisTab.addEventListener('click', hideUnhideTabs);
		thisTab.addEventListener('mouseover', hideUnhideTabs);
	}
}
function hideUnhideTabs(event) {
	let tabThatWasSelected = event.target;
	let componentInteractedWith = tabThatWasSelected.closest('.tabs-vertical');
	let tabsOfComponentInteractedWith = componentInteractedWith.querySelectorAll('[role="tab"]');
	let panelsOfComponentInteractedWith = componentInteractedWith.querySelectorAll('[role="tabpanel"]');
	let idOfTabThatSelected = tabThatWasSelected.id;
	let panelBelongingToTabSelected = componentInteractedWith.querySelector(`[aria-labelledby="${idOfTabThatSelected}"]`);

	hideAllTabPanels(panelsOfComponentInteractedWith);
	deselectAllTabs(tabsOfComponentInteractedWith);
	tabThatWasSelected.setAttribute('aria-selected', 'true');
	panelBelongingToTabSelected.removeAttribute('hidden');
}
function hideAllTabPanels(panelsOfComponentInteractedWith) {
	for (let panel of panelsOfComponentInteractedWith) {
		panel.setAttribute('hidden', '');
	}
}
function deselectAllTabs(tabsOfComponentInteractedWith) {
	for (let tab of tabsOfComponentInteractedWith) {
		tab.setAttribute('aria-selected', 'false');
	}
}
document.addEventListener('DOMContentLoaded', checkForUninitializedTabs);
