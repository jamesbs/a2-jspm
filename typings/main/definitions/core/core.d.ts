// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/metadata/di.d.ts
declare module 'core/src/core/metadata/di' {
import { Type } from 'angular2/src/facade/lang';
import { DependencyMetadata } from 'angular2/src/core/di/metadata';
/**
 * Specifies that a constant attribute value should be injected.
 *
 * The directive can inject constant string literals of host element attributes.
 *
 * ### Example
 *
 * Suppose we have an `<input>` element and want to know its `type`.
 *
 * ```html
 * <input type="text">
 * ```
 *
 * A decorator can inject string literal `text` like so:
 *
 * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
 */
export class AttributeMetadata extends DependencyMetadata {
    attributeName: string;
    constructor(attributeName: string);
    token: AttributeMetadata;
    toString(): string;
}
/**
 * Declares an injectable parameter to be a live list of directives or variable
 * bindings from the content children of a directive.
 *
 * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
 *
 * Assume that `<tabs>` component would like to get a list its children `<pane>`
 * components as shown in this example:
 *
 * ```html
 * <tabs>
 *   <pane title="Overview">...</pane>
 *   <pane *ngFor="#o of objects" [title]="o.title">{{o.text}}</pane>
 * </tabs>
 * ```
 *
 * The preferred solution is to query for `Pane` directives using this decorator.
 *
 * ```javascript
 * @Component({
 *   selector: 'pane',
 *   inputs: ['title']
 * })
 * class Pane {
 *   title:string;
 * }
 *
 * @Component({
 *  selector: 'tabs',
 *  template: `
 *    <ul>
 *      <li *ngFor="#pane of panes">{{pane.title}}</li>
 *    </ul>
 *    <content></content>
 *  `
 * })
 * class Tabs {
 *   panes: QueryList<Pane>;
 *   constructor(@Query(Pane) panes:QueryList<Pane>) {
  *    this.panes = panes;
  *  }
 * }
 * ```
 *
 * A query can look for variable bindings by passing in a string with desired binding symbol.
 *
 * ### Example ([live demo](http://plnkr.co/edit/sT2j25cH1dURAyBRCKx1?p=preview))
 * ```html
 * <seeker>
 *   <div #findme>...</div>
 * </seeker>
 *
 * @Component({ selector: 'seeker' })
 * class Seeker {
 *   constructor(@Query('findme') elList: QueryList<ElementRef>) {...}
 * }
 * ```
 *
 * In this case the object that is injected depend on the type of the variable
 * binding. It can be an ElementRef, a directive or a component.
 *
 * Passing in a comma separated list of variable bindings will query for all of them.
 *
 * ```html
 * <seeker>
 *   <div #find-me>...</div>
 *   <div #find-me-too>...</div>
 * </seeker>
 *
 *  @Component({
 *   selector: 'seeker'
 * })
 * class Seeker {
 *   constructor(@Query('findMe, findMeToo') elList: QueryList<ElementRef>) {...}
 * }
 * ```
 *
 * Configure whether query looks for direct children or all descendants
 * of the querying element, by using the `descendants` parameter.
 * It is set to `false` by default.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wtGeB977bv7qvA5FTYl9?p=preview))
 * ```html
 * <container #first>
 *   <item>a</item>
 *   <item>b</item>
 *   <container #second>
 *     <item>c</item>
 *   </container>
 * </container>
 * ```
 *
 * When querying for items, the first container will see only `a` and `b` by default,
 * but with `Query(TextDirective, {descendants: true})` it will see `c` too.
 *
 * The queried directives are kept in a depth-first pre-order with respect to their
 * positions in the DOM.
 *
 * Query does not look deep into any subcomponent views.
 *
 * Query is updated as part of the change-detection cycle. Since change detection
 * happens after construction of a directive, QueryList will always be empty when observed in the
 * constructor.
 *
 * The injected object is an unmodifiable live list.
 * See {@link QueryList} for more details.
 */
export class QueryMetadata extends DependencyMetadata {
    private _selector;
    /**
     * whether we want to query only direct children (false) or all
     * children (true).
     */
    descendants: boolean;
    first: boolean;
    constructor(_selector: Type | string, {descendants, first}?: {
        descendants?: boolean;
        first?: boolean;
    });
    /**
     * always `false` to differentiate it with {@link ViewQueryMetadata}.
     */
    isViewQuery: boolean;
    /**
     * what this is querying for.
     */
    selector: any;
    /**
     * whether this is querying for a variable binding or a directive.
     */
    isVarBindingQuery: boolean;
    /**
     * returns a list of variable bindings this is querying for.
     * Only applicable if this is a variable bindings query.
     */
    varBindings: string[];
    toString(): string;
}
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChildren(ChildDirective) contentChildren: QueryList<ChildDirective>;
 *
 *   ngAfterContentInit() {
 *     // contentChildren is set
 *   }
 * }
 * ```
 */
export class ContentChildrenMetadata extends QueryMetadata {
    constructor(_selector: Type | string, {descendants}?: {
        descendants?: boolean;
    });
}
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChild(ChildDirective) contentChild;
 *
 *   ngAfterContentInit() {
 *     // contentChild is set
 *   }
 * }
 * ```
 */
export class ContentChildMetadata extends QueryMetadata {
    constructor(_selector: Type | string);
}
/**
 * Similar to {@link QueryMetadata}, but querying the component view, instead of
 * the content children.
 *
 * ### Example ([live demo](http://plnkr.co/edit/eNsFHDf7YjyM6IzKxM1j?p=preview))
 *
 * ```javascript
 * @Component({...})
 * @View({
 *   template: `
 *     <item> a </item>
 *     <item> b </item>
 *     <item> c </item>
 *   `
 * })
 * class MyComponent {
 *   shown: boolean;
 *
 *   constructor(private @Query(Item) items:QueryList<Item>) {
 *     items.changes.subscribe(() => console.log(items.length));
 *   }
 * }
 * ```
 *
 * Supports the same querying parameters as {@link QueryMetadata}, except
 * `descendants`. This always queries the whole view.
 *
 * As `shown` is flipped between true and false, items will contain zero of one
 * items.
 *
 * Specifies that a {@link QueryList} should be injected.
 *
 * The injected object is an iterable and observable live list.
 * See {@link QueryList} for more details.
 */
export class ViewQueryMetadata extends QueryMetadata {
    constructor(_selector: Type | string, {descendants, first}?: {
        descendants?: boolean;
        first?: boolean;
    });
    /**
     * always `true` to differentiate it with {@link QueryMetadata}.
     */
    isViewQuery: boolean;
    toString(): string;
}
/**
 * Configures a view query.
 *
 * View queries are set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'someDir',
 *   templateUrl: 'someTemplate',
 *   directives: [ItemDirective]
 * })
 * class SomeDir {
 *   @ViewChildren(ItemDirective) viewChildren: QueryList<ItemDirective>;
 *
 *   ngAfterViewInit() {
 *     // viewChildren is set
 *   }
 * }
 * ```
 */
export class ViewChildrenMetadata extends ViewQueryMetadata {
    constructor(_selector: Type | string);
}
/**
 * Configures a view query.
 *
 * View queries are set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'someDir',
 *   templateUrl: 'someTemplate',
 *   directives: [ItemDirective]
 * })
 * class SomeDir {
 *   @ViewChild(ItemDirective) viewChild:ItemDirective;
 *
 *   ngAfterViewInit() {
 *     // viewChild is set
 *   }
 * }
 * ```
 */
export class ViewChildMetadata extends ViewQueryMetadata {
    constructor(_selector: Type | string);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/metadata/directives.d.ts
declare module 'core/src/core/metadata/directives' {
import { Type } from 'angular2/src/facade/lang';
import { InjectableMetadata } from 'angular2/src/core/di/metadata';
import { ChangeDetectionStrategy } from 'angular2/src/core/change_detection';
import { ViewEncapsulation } from 'angular2/src/core/metadata/view';
/**
 * Directives allow you to attach behavior to elements in the DOM.
 *
 * {@link DirectiveMetadata}s with an embedded view are called {@link ComponentMetadata}s.
 *
 * A directive consists of a single directive annotation and a controller class. When the
 * directive's `selector` matches
 * elements in the DOM, the following steps occur:
 *
 * 1. For each directive, the `ElementInjector` attempts to resolve the directive's constructor
 * arguments.
 * 2. Angular instantiates directives for each matched element using `ElementInjector` in a
 * depth-first order,
 *    as declared in the HTML.
 *
 * ## Understanding How Injection Works
 *
 * There are three stages of injection resolution.
 * - *Pre-existing Injectors*:
 *   - The terminal {@link Injector} cannot resolve dependencies. It either throws an error or, if
 * the dependency was
 *     specified as `@Optional`, returns `null`.
 *   - The platform injector resolves browser singleton resources, such as: cookies, title,
 * location, and others.
 * - *Component Injectors*: Each component instance has its own {@link Injector}, and they follow
 * the same parent-child hierarchy
 *     as the component instances in the DOM.
 * - *Element Injectors*: Each component instance has a Shadow DOM. Within the Shadow DOM each
 * element has an `ElementInjector`
 *     which follow the same parent-child hierarchy as the DOM elements themselves.
 *
 * When a template is instantiated, it also must instantiate the corresponding directives in a
 * depth-first order. The
 * current `ElementInjector` resolves the constructor dependencies for each directive.
 *
 * Angular then resolves dependencies as follows, according to the order in which they appear in the
 * {@link ViewMetadata}:
 *
 * 1. Dependencies on the current element
 * 2. Dependencies on element injectors and their parents until it encounters a Shadow DOM boundary
 * 3. Dependencies on component injectors and their parents until it encounters the root component
 * 4. Dependencies on pre-existing injectors
 *
 *
 * The `ElementInjector` can inject other directives, element-specific special objects, or it can
 * delegate to the parent
 * injector.
 *
 * To inject other directives, declare the constructor parameter as:
 * - `directive:DirectiveType`: a directive on the current element only
 * - `@Host() directive:DirectiveType`: any directive that matches the type between the current
 * element and the
 *    Shadow DOM root.
 * - `@Query(DirectiveType) query:QueryList<DirectiveType>`: A live collection of direct child
 * directives.
 * - `@QueryDescendants(DirectiveType) query:QueryList<DirectiveType>`: A live collection of any
 * child directives.
 *
 * To inject element-specific special objects, declare the constructor parameter as:
 * - `element: ElementRef` to obtain a reference to logical element in the view.
 * - `viewContainer: ViewContainerRef` to control child template instantiation, for
 * {@link DirectiveMetadata} directives only
 * - `bindingPropagation: BindingPropagation` to control change detection in a more granular way.
 *
 * ### Example
 *
 * The following example demonstrates how dependency injection resolves constructor arguments in
 * practice.
 *
 *
 * Assume this HTML template:
 *
 * ```
 * <div dependency="1">
 *   <div dependency="2">
 *     <div dependency="3" my-directive>
 *       <div dependency="4">
 *         <div dependency="5"></div>
 *       </div>
 *       <div dependency="6"></div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * With the following `dependency` decorator and `SomeService` injectable class.
 *
 * ```
 * @Injectable()
 * class SomeService {
 * }
 *
 * @Directive({
 *   selector: '[dependency]',
 *   inputs: [
 *     'id: dependency'
 *   ]
 * })
 * class Dependency {
 *   id:string;
 * }
 * ```
 *
 * Let's step through the different ways in which `MyDirective` could be declared...
 *
 *
 * ### No injection
 *
 * Here the constructor is declared with no arguments, therefore nothing is injected into
 * `MyDirective`.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor() {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with no dependencies.
 *
 *
 * ### Component-level injection
 *
 * Directives can inject any injectable instance from the closest component injector or any of its
 * parents.
 *
 * Here, the constructor declares a parameter, `someService`, and injects the `SomeService` type
 * from the parent
 * component's injector.
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(someService: SomeService) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a dependency on `SomeService`.
 *
 *
 * ### Injecting a directive from the current element
 *
 * Directives can inject other directives declared on the current element.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(dependency: Dependency) {
 *     expect(dependency.id).toEqual(3);
 *   }
 * }
 * ```
 * This directive would be instantiated with `Dependency` declared at the same element, in this case
 * `dependency="3"`.
 *
 * ### Injecting a directive from any ancestor elements
 *
 * Directives can inject other directives declared on any ancestor element (in the current Shadow
 * DOM), i.e. on the current element, the
 * parent element, or its parents.
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Host() dependency: Dependency) {
 *     expect(dependency.id).toEqual(2);
 *   }
 * }
 * ```
 *
 * `@Host` checks the current element, the parent, as well as its parents recursively. If
 * `dependency="2"` didn't
 * exist on the direct parent, this injection would
 * have returned
 * `dependency="1"`.
 *
 *
 * ### Injecting a live collection of direct child directives
 *
 *
 * A directive can also query for other child directives. Since parent directives are instantiated
 * before child directives, a directive can't simply inject the list of child directives. Instead,
 * the directive injects a {@link QueryList}, which updates its contents as children are added,
 * removed, or moved by a directive that uses a {@link ViewContainerRef} such as a `ngFor`, an
 * `ngIf`, or an `ngSwitch`.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Query(Dependency) dependencies:QueryList<Dependency>) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a {@link QueryList} which contains `Dependency` 4 and
 * `Dependency` 6. Here, `Dependency` 5 would not be included, because it is not a direct child.
 *
 * ### Injecting a live collection of descendant directives
 *
 * By passing the descendant flag to `@Query` above, we can include the children of the child
 * elements.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Query(Dependency, {descendants: true}) dependencies:QueryList<Dependency>) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a Query which would contain `Dependency` 4, 5 and 6.
 *
 * ### Optional injection
 *
 * The normal behavior of directives is to return an error when a specified dependency cannot be
 * resolved. If you
 * would like to inject `null` on unresolved dependency instead, you can annotate that dependency
 * with `@Optional()`.
 * This explicitly permits the author of a template to treat some of the surrounding directives as
 * optional.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Optional() dependency:Dependency) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a `Dependency` directive found on the current element.
 * If none can be
 * found, the injector supplies `null` instead of throwing an error.
 *
 * ### Example
 *
 * Here we use a decorator directive to simply define basic tool-tip behavior.
 *
 * ```
 * @Directive({
 *   selector: '[tooltip]',
 *   inputs: [
 *     'text: tooltip'
 *   ],
 *   host: {
 *     '(mouseenter)': 'onMouseEnter()',
 *     '(mouseleave)': 'onMouseLeave()'
 *   }
 * })
 * class Tooltip{
 *   text:string;
 *   overlay:Overlay; // NOT YET IMPLEMENTED
 *   overlayManager:OverlayManager; // NOT YET IMPLEMENTED
 *
 *   constructor(overlayManager:OverlayManager) {
 *     this.overlay = overlay;
 *   }
 *
 *   onMouseEnter() {
 *     // exact signature to be determined
 *     this.overlay = this.overlayManager.open(text, ...);
 *   }
 *
 *   onMouseLeave() {
 *     this.overlay.close();
 *     this.overlay = null;
 *   }
 * }
 * ```
 * In our HTML template, we can then add this behavior to a `<div>` or any other element with the
 * `tooltip` selector,
 * like so:
 *
 * ```
 * <div tooltip="some text here"></div>
 * ```
 *
 * Directives can also control the instantiation, destruction, and positioning of inline template
 * elements:
 *
 * A directive uses a {@link ViewContainerRef} to instantiate, insert, move, and destroy views at
 * runtime.
 * The {@link ViewContainerRef} is created as a result of `<template>` element, and represents a
 * location in the current view
 * where these actions are performed.
 *
 * Views are always created as children of the current {@link ViewMetadata}, and as siblings of the
 * `<template>` element. Thus a
 * directive in a child view cannot inject the directive that created it.
 *
 * Since directives that create views via ViewContainers are common in Angular, and using the full
 * `<template>` element syntax is wordy, Angular
 * also supports a shorthand notation: `<li *foo="bar">` and `<li template="foo: bar">` are
 * equivalent.
 *
 * Thus,
 *
 * ```
 * <ul>
 *   <li *foo="bar" title="text"></li>
 * </ul>
 * ```
 *
 * Expands in use to:
 *
 * ```
 * <ul>
 *   <template [foo]="bar">
 *     <li title="text"></li>
 *   </template>
 * </ul>
 * ```
 *
 * Notice that although the shorthand places `*foo="bar"` within the `<li>` element, the binding for
 * the directive
 * controller is correctly instantiated on the `<template>` element rather than the `<li>` element.
 *
 * ## Lifecycle hooks
 *
 * When the directive class implements some {@link angular2/lifecycle_hooks} the callbacks are
 * called by the change detection at defined points in time during the life of the directive.
 *
 * ### Example
 *
 * Let's suppose we want to implement the `unless` behavior, to conditionally include a template.
 *
 * Here is a simple directive that triggers on an `unless` selector:
 *
 * ```
 * @Directive({
 *   selector: '[unless]',
 *   inputs: ['unless']
 * })
 * export class Unless {
 *   viewContainer: ViewContainerRef;
 *   templateRef: TemplateRef;
 *   prevCondition: boolean;
 *
 *   constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef) {
 *     this.viewContainer = viewContainer;
 *     this.templateRef = templateRef;
 *     this.prevCondition = null;
 *   }
 *
 *   set unless(newCondition) {
 *     if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
 *       this.prevCondition = true;
 *       this.viewContainer.clear();
 *     } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
 *       this.prevCondition = false;
 *       this.viewContainer.create(this.templateRef);
 *     }
 *   }
 * }
 * ```
 *
 * We can then use this `unless` selector in a template:
 * ```
 * <ul>
 *   <li *unless="expr"></li>
 * </ul>
 * ```
 *
 * Once the directive instantiates the child view, the shorthand notation for the template expands
 * and the result is:
 *
 * ```
 * <ul>
 *   <template [unless]="exp">
 *     <li></li>
 *   </template>
 *   <li></li>
 * </ul>
 * ```
 *
 * Note also that although the `<li></li>` template still exists inside the `<template></template>`,
 * the instantiated
 * view occurs on the second `<li></li>` which is a sibling to the `<template>` element.
 */
export class DirectiveMetadata extends InjectableMetadata {
    /**
     * The CSS selector that triggers the instantiation of a directive.
     *
     * Angular only allows directives to trigger on CSS selectors that do not cross element
     * boundaries.
     *
     * `selector` may be declared as one of the following:
     *
     * - `element-name`: select by element name.
     * - `.class`: select by class name.
     * - `[attribute]`: select by attribute name.
     * - `[attribute=value]`: select by attribute name and value.
     * - `:not(sub_selector)`: select only if the element does not match the `sub_selector`.
     * - `selector1, selector2`: select if either `selector1` or `selector2` matches.
     *
     *
     * ### Example
     *
     * Suppose we have a directive with an `input[type=text]` selector.
     *
     * And the following HTML:
     *
     * ```html
     * <form>
     *   <input type="text">
     *   <input type="radio">
     * <form>
     * ```
     *
     * The directive would only be instantiated on the `<input type="text">` element.
     *
     */
    selector: string;
    /**
     * Enumerates the set of data-bound input properties for a directive
     *
     * Angular automatically updates input properties during change detection.
     *
     * The `inputs` property defines a set of `directiveProperty` to `bindingProperty`
     * configuration:
     *
     * - `directiveProperty` specifies the component property where the value is written.
     * - `bindingProperty` specifies the DOM property where the value is read from.
     *
     * When `bindingProperty` is not provided, it is assumed to be equal to `directiveProperty`.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ivhfXY?p=preview))
     *
     * The following example creates a component with two data-bound properties.
     *
     * ```typescript
     * @Component({
     *   selector: 'bank-account',
     *   inputs: ['bankName', 'id: account-id'],
     *   template: `
     *     Bank Name: {{bankName}}
     *     Account Id: {{id}}
     *   `
     * })
     * class BankAccount {
     *   bankName: string;
     *   id: string;
     *
     *   // this property is not bound, and won't be automatically updated by Angular
     *   normalizedBankName: string;
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `
     *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
     *   `,
     *   directives: [BankAccount]
     * })
     * class App {}
     *
     * bootstrap(App);
     * ```
     *
     */
    inputs: string[];
    properties: string[];
    private _inputs;
    private _properties;
    /**
     * Enumerates the set of event-bound output properties.
     *
     * When an output property emits an event, an event handler attached to that event
     * the template is invoked.
     *
     * The `outputs` property defines a set of `directiveProperty` to `bindingProperty`
     * configuration:
     *
     * - `directiveProperty` specifies the component property that emits events.
     * - `bindingProperty` specifies the DOM property the event handler is attached to.
     *
     * ### Example ([live demo](http://plnkr.co/edit/d5CNq7?p=preview))
     *
     * ```typescript
     * @Directive({
     *   selector: 'interval-dir',
     *   outputs: ['everySecond', 'five5Secs: everyFiveSeconds']
     * })
     * class IntervalDir {
     *   everySecond = new EventEmitter();
     *   five5Secs = new EventEmitter();
     *
     *   constructor() {
     *     setInterval(() => this.everySecond.emit("event"), 1000);
     *     setInterval(() => this.five5Secs.emit("event"), 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `
     *     <interval-dir (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()">
     *     </interval-dir>
     *   `,
     *   directives: [IntervalDir]
     * })
     * class App {
     *   everySecond() { console.log('second'); }
     *   everyFiveSeconds() { console.log('five seconds'); }
     * }
     * bootstrap(App);
     * ```
     *
     */
    outputs: string[];
    events: string[];
    private _outputs;
    private _events;
    /**
     * Specify the events, actions, properties and attributes related to the host element.
     *
     * ## Host Listeners
     *
     * Specifies which DOM events a directive listens to via a set of `(event)` to `method`
     * key-value pairs:
     *
     * - `event`: the DOM event that the directive listens to.
     * - `statement`: the statement to execute when the event occurs.
     * If the evaluation of the statement returns `false`, then `preventDefault`is applied on the DOM
     * event.
     *
     * To listen to global events, a target must be added to the event name.
     * The target can be `window`, `document` or `body`.
     *
     * When writing a directive event binding, you can also refer to the $event local variable.
     *
     * ### Example ([live demo](http://plnkr.co/edit/DlA5KU?p=preview))
     *
     * The following example declares a directive that attaches a click listener to the button and
     * counts clicks.
     *
     * ```typescript
     * @Directive({
     *   selector: 'button[counting]',
     *   host: {
     *     '(click)': 'onClick($event.target)'
     *   }
     * })
     * class CountClicks {
     *   numberOfClicks = 0;
     *
     *   onClick(btn) {
     *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `<button counting>Increment</button>`,
     *   directives: [CountClicks]
     * })
     * class App {}
     *
     * bootstrap(App);
     * ```
     *
     * ## Host Property Bindings
     *
     * Specifies which DOM properties a directive updates.
     *
     * Angular automatically checks host property bindings during change detection.
     * If a binding changes, it will update the host element of the directive.
     *
     * ### Example ([live demo](http://plnkr.co/edit/gNg0ED?p=preview))
     *
     * The following example creates a directive that sets the `valid` and `invalid` classes
     * on the DOM element that has ngModel directive on it.
     *
     * ```typescript
     * @Directive({
     *   selector: '[ngModel]',
     *   host: {
     *     '[class.valid]': 'valid',
     *     '[class.invalid]': 'invalid'
     *   }
     * })
     * class NgModelStatus {
     *   constructor(public control:NgModel) {}
     *   get valid { return this.control.valid; }
     *   get invalid { return this.control.invalid; }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: `<input [(ngModel)]="prop">`,
     *   directives: [FORM_DIRECTIVES, NgModelStatus]
     * })
     * class App {
     *   prop;
     * }
     *
     * bootstrap(App);
     * ```
     *
     * ## Attributes
     *
     * Specifies static attributes that should be propagated to a host element.
     *
     * ### Example
     *
     * In this example using `my-button` directive (ex.: `<div my-button></div>`) on a host element
     * (here: `<div>` ) will ensure that this element will get the "button" role.
     *
     * ```typescript
     * @Directive({
     *   selector: '[my-button]',
     *   host: {
     *     'role': 'button'
     *   }
     * })
     * class MyButton {
     * }
     * ```
     */
    host: {
        [key: string]: string;
    };
    /**
     * Defines the set of injectable objects that are visible to a Directive and its light DOM
     * children.
     *
     * ## Simple Example
     *
     * Here is an example of a class that can be injected:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'greet',
     *   bindings: [
     *     Greeter
     *   ]
     * })
     * class HelloWorld {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     * ```
     */
    providers: any[];
    /** @deprecated */
    bindings: any[];
    private _providers;
    private _bindings;
    /**
     * Defines the name that can be used in the template to assign this directive to a variable.
     *
     * ## Simple Example
     *
     * ```
     * @Directive({
     *   selector: 'child-dir',
     *   exportAs: 'child'
     * })
     * class ChildDir {
     * }
     *
     * @Component({
     *   selector: 'main',
     *   template: `<child-dir #c="child"></child-dir>`,
     *   directives: [ChildDir]
     * })
     * class MainComponent {
     * }
     *
     * ```
     */
    exportAs: string;
    /**
     * Configures the queries that will be injected into the directive.
     *
     * Content queries are set before the `ngAfterContentInit` callback is called.
     * View queries are set before the `ngAfterViewInit` callback is called.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'someDir',
     *   queries: {
     *     contentChildren: new ContentChildren(ChildDirective),
     *     viewChildren: new ViewChildren(ChildDirective)
     *   },
     *   template: '<child-directive></child-directive>',
     *   directives: [ChildDirective]
     * })
     * class SomeDir {
     *   contentChildren: QueryList<ChildDirective>,
     *   viewChildren: QueryList<ChildDirective>
     *
     *   ngAfterContentInit() {
     *     // contentChildren is set
     *   }
     *
     *   ngAfterViewInit() {
     *     // viewChildren is set
     *   }
     * }
     * ```
     */
    queries: {
        [key: string]: any;
    };
    constructor({selector, inputs, outputs, properties, events, host, bindings, providers, exportAs, queries}?: {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        properties?: string[];
        events?: string[];
        host?: {
            [key: string]: string;
        };
        providers?: any[];
        /** @deprecated */ bindings?: any[];
        exportAs?: string;
        queries?: {
            [key: string]: any;
        };
    });
}
/**
 * Declare reusable UI building blocks for an application.
 *
 * Each Angular component requires a single `@Component` annotation. The
 * `@Component`
 * annotation specifies when a component is instantiated, and which properties and hostListeners it
 * binds to.
 *
 * When a component is instantiated, Angular
 * - creates a shadow DOM for the component.
 * - loads the selected template into the shadow DOM.
 * - creates all the injectable objects configured with `providers` and `viewProviders`.
 *
 * All template expressions and statements are then evaluated against the component instance.
 *
 * For details on the `@View` annotation, see {@link ViewMetadata}.
 *
 * ## Lifecycle hooks
 *
 * When the component class implements some {@link angular2/lifecycle_hooks} the callbacks are
 * called by the change detection at defined points in time during the life of the component.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='component'}
 */
export class ComponentMetadata extends DirectiveMetadata {
    /**
     * Defines the used change detection strategy.
     *
     * When a component is instantiated, Angular creates a change detector, which is responsible for
     * propagating the component's bindings.
     *
     * The `changeDetection` property defines, whether the change detection will be checked every time
     * or only when the component tells it to do so.
     */
    changeDetection: ChangeDetectionStrategy;
    /**
     * Defines the set of injectable objects that are visible to its view DOM children.
     *
     * ## Simple Example
     *
     * Here is an example of a class that can be injected:
     *
     * ```
     * class Greeter {
     *    greet(name:string) {
     *      return 'Hello ' + name + '!';
     *    }
     * }
     *
     * @Directive({
     *   selector: 'needs-greeter'
     * })
     * class NeedsGreeter {
     *   greeter:Greeter;
     *
     *   constructor(greeter:Greeter) {
     *     this.greeter = greeter;
     *   }
     * }
     *
     * @Component({
     *   selector: 'greet',
     *   viewProviders: [
     *     Greeter
     *   ],
     *   template: `<needs-greeter></needs-greeter>`,
     *   directives: [NeedsGreeter]
     * })
     * class HelloWorld {
     * }
     *
     * ```
     */
    viewProviders: any[];
    viewBindings: any[];
    private _viewProviders;
    private _viewBindings;
    /**
     * The module id of the module that contains the component.
     * Needed to be able to resolve relative urls for templates and styles.
     * In Dart, this can be determined automatically and does not need to be set.
     * In CommonJS, this can always be set to `module.id`.
     *
     * ## Simple Example
     *
     * ```
     * @Directive({
     *   selector: 'someDir',
     *   moduleId: module.id
     * })
     * class SomeDir {
     * }
     *
     * ```
     */
    moduleId: string;
    templateUrl: string;
    template: string;
    styleUrls: string[];
    styles: string[];
    directives: Array<Type | any[]>;
    pipes: Array<Type | any[]>;
    encapsulation: ViewEncapsulation;
    constructor({selector, inputs, outputs, properties, events, host, exportAs, moduleId, bindings, providers, viewBindings, viewProviders, changeDetection, queries, templateUrl, template, styleUrls, styles, directives, pipes, encapsulation}?: {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        properties?: string[];
        events?: string[];
        host?: {
            [key: string]: string;
        };
        /** @deprecated */ bindings?: any[];
        providers?: any[];
        exportAs?: string;
        moduleId?: string;
        /** @deprecated */ viewBindings?: any[];
        viewProviders?: any[];
        queries?: {
            [key: string]: any;
        };
        changeDetection?: ChangeDetectionStrategy;
        templateUrl?: string;
        template?: string;
        styleUrls?: string[];
        styles?: string[];
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        encapsulation?: ViewEncapsulation;
    });
}
/**
 * Declare reusable pipe function.
 *
 * A "pure" pipe is only re-evaluated when either the input or any of the arguments change.
 *
 * When not specified, pipes default to being pure.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='pipe'}
 */
export class PipeMetadata extends InjectableMetadata {
    name: string;
    constructor({name, pure}: {
        name: string;
        pure?: boolean;
    });
    pure: boolean;
}
/**
 * Declares a data-bound input property.
 *
 * Angular automatically updates data-bound properties during change detection.
 *
 * `InputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * The following example creates a component with two input properties.
 *
 * ```typescript
 * @Component({
 *   selector: 'bank-account',
 *   template: `
 *     Bank Name: {{bankName}}
 *     Account Id: {{id}}
 *   `
 * })
 * class BankAccount {
 *   @Input() bankName: string;
 *   @Input('account-id') id: string;
 *
 *   // this property is not bound, and won't be automatically updated by Angular
 *   normalizedBankName: string;
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
 *   `,
 *   directives: [BankAccount]
 * })
 * class App {}
 *
 * bootstrap(App);
 * ```
 */
export class InputMetadata {
    /**
     * Name used when instantiating a component in the temlate.
     */
    bindingPropertyName: string;
    constructor(
        /**
         * Name used when instantiating a component in the temlate.
         */
        bindingPropertyName?: string);
}
/**
 * Declares an event-bound output property.
 *
 * When an output property emits an event, an event handler attached to that event
 * the template is invoked.
 *
 * `OutputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * ```typescript
 * @Directive({
 *   selector: 'interval-dir',
 * })
 * class IntervalDir {
 *   @Output() everySecond = new EventEmitter();
 *   @Output('everyFiveSeconds') five5Secs = new EventEmitter();
 *
 *   constructor() {
 *     setInterval(() => this.everySecond.emit("event"), 1000);
 *     setInterval(() => this.five5Secs.emit("event"), 5000);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <interval-dir (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()">
 *     </interval-dir>
 *   `,
 *   directives: [IntervalDir]
 * })
 * class App {
 *   everySecond() { console.log('second'); }
 *   everyFiveSeconds() { console.log('five seconds'); }
 * }
 * bootstrap(App);
 * ```
 */
export class OutputMetadata {
    bindingPropertyName: string;
    constructor(bindingPropertyName?: string);
}
/**
 * Declares a host property binding.
 *
 * Angular automatically checks host property bindings during change detection.
 * If a binding changes, it will update the host element of the directive.
 *
 * `HostBindingMetadata` takes an optional parameter that specifies the property
 * name of the host element that will be updated. When not provided,
 * the class property name is used.
 *
 * ### Example
 *
 * The following example creates a directive that sets the `valid` and `invalid` classes
 * on the DOM element that has ngModel directive on it.
 *
 * ```typescript
 * @Directive({selector: '[ngModel]'})
 * class NgModelStatus {
 *   constructor(public control:NgModel) {}
 *   @HostBinding('class.valid') get valid { return this.control.valid; }
 *   @HostBinding('class.invalid') get invalid { return this.control.invalid; }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<input [(ngModel)]="prop">`,
 *   directives: [FORM_DIRECTIVES, NgModelStatus]
 * })
 * class App {
 *   prop;
 * }
 *
 * bootstrap(App);
 * ```
 */
export class HostBindingMetadata {
    hostPropertyName: string;
    constructor(hostPropertyName?: string);
}
/**
 * Declares a host listener.
 *
 * Angular will invoke the decorated method when the host element emits the specified event.
 *
 * If the decorated method returns `false`, then `preventDefault` is applied on the DOM
 * event.
 *
 * ### Example
 *
 * The following example declares a directive that attaches a click listener to the button and
 * counts clicks.
 *
 * ```typescript
 * @Directive({selector: 'button[counting]'})
 * class CountClicks {
 *   numberOfClicks = 0;
 *
 *   @HostListener('click', ['$event.target'])
 *   onClick(btn) {
 *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<button counting>Increment</button>`,
 *   directives: [CountClicks]
 * })
 * class App {}
 *
 * bootstrap(App);
 * ```
 */
export class HostListenerMetadata {
    eventName: string;
    args: string[];
    constructor(eventName: string, args?: string[]);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/metadata/view.d.ts
declare module 'core/src/core/metadata/view' {
import { Type } from 'angular2/src/facade/lang';
/**
 * Defines template and style encapsulation options available for Component's {@link View}.
 *
 * See {@link ViewMetadata#encapsulation}.
 */
export enum ViewEncapsulation {
    /**
     * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
     * Element and pre-processing the style rules provided via
     * {@link ViewMetadata#styles} or {@link ViewMetadata#stylesUrls}, and adding the new Host Element
     * attribute to all selectors.
     *
     * This is the default option.
     */
    Emulated = 0,
    /**
     * Use the native encapsulation mechanism of the renderer.
     *
     * For the DOM this means using [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) and
     * creating a ShadowRoot for Component's Host Element.
     */
    Native = 1,
    /**
     * Don't provide any template or style encapsulation.
     */
    None = 2,
}
export var VIEW_ENCAPSULATION_VALUES: ViewEncapsulation[];
/**
 * Metadata properties available for configuring Views.
 *
 * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
 * `@View` annotation specifies the HTML template to use, and lists the directives that are active
 * within the template.
 *
 * When a component is instantiated, the template is loaded into the component's shadow root, and
 * the expressions and statements in the template are evaluated against the component.
 *
 * For details on the `@Component` annotation, see {@link ComponentMetadata}.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'greet',
 *   template: 'Hello {{name}}!',
 *   directives: [GreetUser, Bold]
 * })
 * class Greet {
 *   name: string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 * ```
 */
export class ViewMetadata {
    /**
     * Specifies a template URL for an Angular component.
     *
     * NOTE: Only one of `templateUrl` or `template` can be defined per View.
     *
     * <!-- TODO: what's the url relative to? -->
     */
    templateUrl: string;
    /**
     * Specifies an inline template for an Angular component.
     *
     * NOTE: Only one of `templateUrl` or `template` can be defined per View.
     */
    template: string;
    /**
     * Specifies stylesheet URLs for an Angular component.
     *
     * <!-- TODO: what's the url relative to? -->
     */
    styleUrls: string[];
    /**
     * Specifies an inline stylesheet for an Angular component.
     */
    styles: string[];
    /**
     * Specifies a list of directives that can be used within a template.
     *
     * Directives must be listed explicitly to provide proper component encapsulation.
     *
     * ### Example
     *
     * ```javascript
     * @Component({
     *   selector: 'my-component',
     *   directives: [NgFor]
     *   template: '
     *   <ul>
     *     <li *ngFor="#item of items">{{item}}</li>
     *   </ul>'
     * })
     * class MyComponent {
     * }
     * ```
     */
    directives: Array<Type | any[]>;
    pipes: Array<Type | any[]>;
    /**
     * Specify how the template and the styles should be encapsulated.
     * The default is {@link ViewEncapsulation#Emulated `ViewEncapsulation.Emulated`} if the view
     * has styles,
     * otherwise {@link ViewEncapsulation#None `ViewEncapsulation.None`}.
     */
    encapsulation: ViewEncapsulation;
    constructor({templateUrl, template, directives, pipes, encapsulation, styles, styleUrls}?: {
        templateUrl?: string;
        template?: string;
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        encapsulation?: ViewEncapsulation;
        styles?: string[];
        styleUrls?: string[];
    });
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/metadata.d.ts
declare module 'core/src/core/metadata' {
/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
export { QueryMetadata, ContentChildrenMetadata, ContentChildMetadata, ViewChildrenMetadata, ViewQueryMetadata, ViewChildMetadata, AttributeMetadata } from 'core/src/core/metadata/di';
export { ComponentMetadata, DirectiveMetadata, PipeMetadata, InputMetadata, OutputMetadata, HostBindingMetadata, HostListenerMetadata } from 'core/src/core/metadata/directives';
export { ViewMetadata, ViewEncapsulation } from 'core/src/core/metadata/view';
import { QueryMetadata, ContentChildrenMetadata, ViewChildrenMetadata, AttributeMetadata } from 'core/src/core/metadata/di';
import { ComponentMetadata, DirectiveMetadata } from 'core/src/core/metadata/directives';
import { ViewMetadata, ViewEncapsulation } from 'core/src/core/metadata/view';
import { ChangeDetectionStrategy } from 'angular2/src/core/change_detection/change_detection';
import { TypeDecorator } from 'core/src/core/util/decorators';
import { Type } from 'angular2/src/facade/lang';
/**
 * Interface for the {@link DirectiveMetadata} decorator function.
 *
 * See {@link DirectiveFactory}.
 */
export interface DirectiveDecorator extends TypeDecorator {
}
/**
 * Interface for the {@link ComponentMetadata} decorator function.
 *
 * See {@link ComponentFactory}.
 */
export interface ComponentDecorator extends TypeDecorator {
    /**
     * Chain {@link ViewMetadata} annotation.
     */
    View(obj: {
        templateUrl?: string;
        template?: string;
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        renderer?: string;
        styles?: string[];
        styleUrls?: string[];
    }): ViewDecorator;
}
/**
 * Interface for the {@link ViewMetadata} decorator function.
 *
 * See {@link ViewFactory}.
 */
export interface ViewDecorator extends TypeDecorator {
    /**
     * Chain {@link ViewMetadata} annotation.
     */
    View(obj: {
        templateUrl?: string;
        template?: string;
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        renderer?: string;
        styles?: string[];
        styleUrls?: string[];
    }): ViewDecorator;
}
/**
 * {@link DirectiveMetadata} factory for creating annotations, decorators or DSL.
 *
 * ### Example as TypeScript Decorator
 *
 * {@example core/ts/metadata/metadata.ts region='directive'}
 *
 * ### Example as ES5 DSL
 *
 * ```
 * var MyDirective = ng
 *   .Directive({...})
 *   .Class({
 *     constructor: function() {
 *       ...
 *     }
 *   })
 * ```
 *
 * ### Example as ES5 annotation
 *
 * ```
 * var MyDirective = function() {
 *   ...
 * };
 *
 * MyDirective.annotations = [
 *   new ng.Directive({...})
 * ]
 * ```
 */
export interface DirectiveFactory {
    (obj: {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        properties?: string[];
        events?: string[];
        host?: {
            [key: string]: string;
        };
        bindings?: any[];
        providers?: any[];
        exportAs?: string;
        queries?: {
            [key: string]: any;
        };
    }): DirectiveDecorator;
    new (obj: {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        properties?: string[];
        events?: string[];
        host?: {
            [key: string]: string;
        };
        bindings?: any[];
        providers?: any[];
        exportAs?: string;
        queries?: {
            [key: string]: any;
        };
    }): DirectiveMetadata;
}
/**
 * {@link ComponentMetadata} factory for creating annotations, decorators or DSL.
 *
 * ### Example as TypeScript Decorator
 *
 * {@example core/ts/metadata/metadata.ts region='component'}
 *
 * ### Example as ES5 DSL
 *
 * ```
 * var MyComponent = ng
 *   .Component({...})
 *   .Class({
 *     constructor: function() {
 *       ...
 *     }
 *   })
 * ```
 *
 * ### Example as ES5 annotation
 *
 * ```
 * var MyComponent = function() {
 *   ...
 * };
 *
 * MyComponent.annotations = [
 *   new ng.Component({...})
 * ]
 * ```
 */
export interface ComponentFactory {
    (obj: {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        properties?: string[];
        events?: string[];
        host?: {
            [key: string]: string;
        };
        bindings?: any[];
        providers?: any[];
        exportAs?: string;
        moduleId?: string;
        queries?: {
            [key: string]: any;
        };
        viewBindings?: any[];
        viewProviders?: any[];
        changeDetection?: ChangeDetectionStrategy;
        templateUrl?: string;
        template?: string;
        styleUrls?: string[];
        styles?: string[];
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        encapsulation?: ViewEncapsulation;
    }): ComponentDecorator;
    new (obj: {
        selector?: string;
        inputs?: string[];
        outputs?: string[];
        properties?: string[];
        events?: string[];
        host?: {
            [key: string]: string;
        };
        bindings?: any[];
        providers?: any[];
        exportAs?: string;
        moduleId?: string;
        queries?: {
            [key: string]: any;
        };
        viewBindings?: any[];
        viewProviders?: any[];
        changeDetection?: ChangeDetectionStrategy;
        templateUrl?: string;
        template?: string;
        styleUrls?: string[];
        styles?: string[];
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        encapsulation?: ViewEncapsulation;
    }): ComponentMetadata;
}
/**
 * {@link ViewMetadata} factory for creating annotations, decorators or DSL.
 *
 * ### Example as TypeScript Decorator
 *
 * ```
 * import {Component, View} from "angular2/core";
 *
 * @Component({...})
 * @View({...})
 * class MyComponent {
 *   constructor() {
 *     ...
 *   }
 * }
 * ```
 *
 * ### Example as ES5 DSL
 *
 * ```
 * var MyComponent = ng
 *   .Component({...})
 *   .View({...})
 *   .Class({
 *     constructor: function() {
 *       ...
 *     }
 *   })
 * ```
 *
 * ### Example as ES5 annotation
 *
 * ```
 * var MyComponent = function() {
 *   ...
 * };
 *
 * MyComponent.annotations = [
 *   new ng.Component({...}),
 *   new ng.View({...})
 * ]
 * ```
 */
export interface ViewFactory {
    (obj: {
        templateUrl?: string;
        template?: string;
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        encapsulation?: ViewEncapsulation;
        styles?: string[];
        styleUrls?: string[];
    }): ViewDecorator;
    new (obj: {
        templateUrl?: string;
        template?: string;
        directives?: Array<Type | any[]>;
        pipes?: Array<Type | any[]>;
        encapsulation?: ViewEncapsulation;
        styles?: string[];
        styleUrls?: string[];
    }): ViewMetadata;
}
/**
 * {@link AttributeMetadata} factory for creating annotations, decorators or DSL.
 *
 * ### Example as TypeScript Decorator
 *
 * {@example core/ts/metadata/metadata.ts region='attributeFactory'}
 *
 * ### Example as ES5 DSL
 *
 * ```
 * var MyComponent = ng
 *   .Component({...})
 *   .Class({
 *     constructor: [new ng.Attribute('title'), function(title) {
 *       ...
 *     }]
 *   })
 * ```
 *
 * ### Example as ES5 annotation
 *
 * ```
 * var MyComponent = function(title) {
 *   ...
 * };
 *
 * MyComponent.annotations = [
 *   new ng.Component({...})
 * ]
 * MyComponent.parameters = [
 *   [new ng.Attribute('title')]
 * ]
 * ```
 */
export interface AttributeFactory {
    (name: string): TypeDecorator;
    new (name: string): AttributeMetadata;
}
/**
 * {@link QueryMetadata} factory for creating annotations, decorators or DSL.
 *
 * ### Example as TypeScript Decorator
 *
 * ```
 * import {Query, QueryList, Component} from "angular2/core";
 *
 * @Component({...})
 * class MyComponent {
 *   constructor(@Query(SomeType) queryList: QueryList<SomeType>) {
 *     ...
 *   }
 * }
 * ```
 *
 * ### Example as ES5 DSL
 *
 * ```
 * var MyComponent = ng
 *   .Component({...})
 *   .Class({
 *     constructor: [new ng.Query(SomeType), function(queryList) {
 *       ...
 *     }]
 *   })
 * ```
 *
 * ### Example as ES5 annotation
 *
 * ```
 * var MyComponent = function(queryList) {
 *   ...
 * };
 *
 * MyComponent.annotations = [
 *   new ng.Component({...})
 * ]
 * MyComponent.parameters = [
 *   [new ng.Query(SomeType)]
 * ]
 * ```
 */
export interface QueryFactory {
    (selector: Type | string, {descendants}?: {
        descendants?: boolean;
    }): ParameterDecorator;
    new (selector: Type | string, {descendants}?: {
        descendants?: boolean;
    }): QueryMetadata;
}
/**
 * Factory for {@link ContentChildren}.
 */
export interface ContentChildrenFactory {
    (selector: Type | string, {descendants}?: {
        descendants?: boolean;
    }): any;
    new (selector: Type | string, {descendants}?: {
        descendants?: boolean;
    }): ContentChildrenMetadata;
}
/**
 * Factory for {@link ContentChild}.
 */
export interface ContentChildFactory {
    (selector: Type | string): any;
    new (selector: Type | string): ContentChildFactory;
}
/**
 * Factory for {@link ViewChildren}.
 */
export interface ViewChildrenFactory {
    (selector: Type | string): any;
    new (selector: Type | string): ViewChildrenMetadata;
}
/**
 * Factory for {@link ViewChild}.
 */
export interface ViewChildFactory {
    (selector: Type | string): any;
    new (selector: Type | string): ViewChildFactory;
}
/**
 * {@link PipeMetadata} factory for creating decorators.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='pipe'}
 */
export interface PipeFactory {
    (obj: {
        name: string;
        pure?: boolean;
    }): any;
    new (obj: {
        name: string;
        pure?: boolean;
    }): any;
}
/**
 * {@link InputMetadata} factory for creating decorators.
 *
 * See {@link InputMetadata}.
 */
export interface InputFactory {
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
}
/**
 * {@link OutputMetadata} factory for creating decorators.
 *
 * See {@link OutputMetadata}.
 */
export interface OutputFactory {
    (bindingPropertyName?: string): any;
    new (bindingPropertyName?: string): any;
}
/**
 * {@link HostBindingMetadata} factory function.
 */
export interface HostBindingFactory {
    (hostPropertyName?: string): any;
    new (hostPropertyName?: string): any;
}
/**
 * {@link HostListenerMetadata} factory function.
 */
export interface HostListenerFactory {
    (eventName: string, args?: string[]): any;
    new (eventName: string, args?: string[]): any;
}
/**
 * Declare reusable UI building blocks for an application.
 *
 * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
 * `@Component`
 * annotation specifies when a component is instantiated, and which properties and hostListeners it
 * binds to.
 *
 * When a component is instantiated, Angular
 * - creates a shadow DOM for the component.
 * - loads the selected template into the shadow DOM.
 * - creates all the injectable objects configured with `providers` and `viewProviders`.
 *
 * All template expressions and statements are then evaluated against the component instance.
 *
 * For details on the `@View` annotation, see {@link ViewMetadata}.
 *
 * ## Lifecycle hooks
 *
 * When the component class implements some {@link angular2/lifecycle_hooks} the callbacks are
 * called by the change detection at defined points in time during the life of the component.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='component'}
 */
export var Component: ComponentFactory;
/**
 * Directives allow you to attach behavior to elements in the DOM.
 *
 * {@link DirectiveMetadata}s with an embedded view are called {@link ComponentMetadata}s.
 *
 * A directive consists of a single directive annotation and a controller class. When the
 * directive's `selector` matches
 * elements in the DOM, the following steps occur:
 *
 * 1. For each directive, the `ElementInjector` attempts to resolve the directive's constructor
 * arguments.
 * 2. Angular instantiates directives for each matched element using `ElementInjector` in a
 * depth-first order,
 *    as declared in the HTML.
 *
 * ## Understanding How Injection Works
 *
 * There are three stages of injection resolution.
 * - *Pre-existing Injectors*:
 *   - The terminal {@link Injector} cannot resolve dependencies. It either throws an error or, if
 * the dependency was
 *     specified as `@Optional`, returns `null`.
 *   - The platform injector resolves browser singleton resources, such as: cookies, title,
 * location, and others.
 * - *Component Injectors*: Each component instance has its own {@link Injector}, and they follow
 * the same parent-child hierarchy
 *     as the component instances in the DOM.
 * - *Element Injectors*: Each component instance has a Shadow DOM. Within the Shadow DOM each
 * element has an `ElementInjector`
 *     which follow the same parent-child hierarchy as the DOM elements themselves.
 *
 * When a template is instantiated, it also must instantiate the corresponding directives in a
 * depth-first order. The
 * current `ElementInjector` resolves the constructor dependencies for each directive.
 *
 * Angular then resolves dependencies as follows, according to the order in which they appear in the
 * {@link ViewMetadata}:
 *
 * 1. Dependencies on the current element
 * 2. Dependencies on element injectors and their parents until it encounters a Shadow DOM boundary
 * 3. Dependencies on component injectors and their parents until it encounters the root component
 * 4. Dependencies on pre-existing injectors
 *
 *
 * The `ElementInjector` can inject other directives, element-specific special objects, or it can
 * delegate to the parent
 * injector.
 *
 * To inject other directives, declare the constructor parameter as:
 * - `directive:DirectiveType`: a directive on the current element only
 * - `@Host() directive:DirectiveType`: any directive that matches the type between the current
 * element and the
 *    Shadow DOM root.
 * - `@Query(DirectiveType) query:QueryList<DirectiveType>`: A live collection of direct child
 * directives.
 * - `@QueryDescendants(DirectiveType) query:QueryList<DirectiveType>`: A live collection of any
 * child directives.
 *
 * To inject element-specific special objects, declare the constructor parameter as:
 * - `element: ElementRef` to obtain a reference to logical element in the view.
 * - `viewContainer: ViewContainerRef` to control child template instantiation, for
 * {@link DirectiveMetadata} directives only
 * - `bindingPropagation: BindingPropagation` to control change detection in a more granular way.
 *
 * ### Example
 *
 * The following example demonstrates how dependency injection resolves constructor arguments in
 * practice.
 *
 *
 * Assume this HTML template:
 *
 * ```
 * <div dependency="1">
 *   <div dependency="2">
 *     <div dependency="3" my-directive>
 *       <div dependency="4">
 *         <div dependency="5"></div>
 *       </div>
 *       <div dependency="6"></div>
 *     </div>
 *   </div>
 * </div>
 * ```
 *
 * With the following `dependency` decorator and `SomeService` injectable class.
 *
 * ```
 * @Injectable()
 * class SomeService {
 * }
 *
 * @Directive({
 *   selector: '[dependency]',
 *   inputs: [
 *     'id: dependency'
 *   ]
 * })
 * class Dependency {
 *   id:string;
 * }
 * ```
 *
 * Let's step through the different ways in which `MyDirective` could be declared...
 *
 *
 * ### No injection
 *
 * Here the constructor is declared with no arguments, therefore nothing is injected into
 * `MyDirective`.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor() {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with no dependencies.
 *
 *
 * ### Component-level injection
 *
 * Directives can inject any injectable instance from the closest component injector or any of its
 * parents.
 *
 * Here, the constructor declares a parameter, `someService`, and injects the `SomeService` type
 * from the parent
 * component's injector.
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(someService: SomeService) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a dependency on `SomeService`.
 *
 *
 * ### Injecting a directive from the current element
 *
 * Directives can inject other directives declared on the current element.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(dependency: Dependency) {
 *     expect(dependency.id).toEqual(3);
 *   }
 * }
 * ```
 * This directive would be instantiated with `Dependency` declared at the same element, in this case
 * `dependency="3"`.
 *
 * ### Injecting a directive from any ancestor elements
 *
 * Directives can inject other directives declared on any ancestor element (in the current Shadow
 * DOM), i.e. on the current element, the
 * parent element, or its parents.
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Host() dependency: Dependency) {
 *     expect(dependency.id).toEqual(2);
 *   }
 * }
 * ```
 *
 * `@Host` checks the current element, the parent, as well as its parents recursively. If
 * `dependency="2"` didn't
 * exist on the direct parent, this injection would
 * have returned
 * `dependency="1"`.
 *
 *
 * ### Injecting a live collection of direct child directives
 *
 *
 * A directive can also query for other child directives. Since parent directives are instantiated
 * before child directives, a directive can't simply inject the list of child directives. Instead,
 * the directive injects a {@link QueryList}, which updates its contents as children are added,
 * removed, or moved by a directive that uses a {@link ViewContainerRef} such as a `ngFor`, an
 * `ngIf`, or an `ngSwitch`.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Query(Dependency) dependencies:QueryList<Dependency>) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a {@link QueryList} which contains `Dependency` 4 and
 * 6. Here, `Dependency` 5 would not be included, because it is not a direct child.
 *
 * ### Injecting a live collection of descendant directives
 *
 * By passing the descendant flag to `@Query` above, we can include the children of the child
 * elements.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Query(Dependency, {descendants: true}) dependencies:QueryList<Dependency>) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a Query which would contain `Dependency` 4, 5 and 6.
 *
 * ### Optional injection
 *
 * The normal behavior of directives is to return an error when a specified dependency cannot be
 * resolved. If you
 * would like to inject `null` on unresolved dependency instead, you can annotate that dependency
 * with `@Optional()`.
 * This explicitly permits the author of a template to treat some of the surrounding directives as
 * optional.
 *
 * ```
 * @Directive({ selector: '[my-directive]' })
 * class MyDirective {
 *   constructor(@Optional() dependency:Dependency) {
 *   }
 * }
 * ```
 *
 * This directive would be instantiated with a `Dependency` directive found on the current element.
 * If none can be
 * found, the injector supplies `null` instead of throwing an error.
 *
 * ### Example
 *
 * Here we use a decorator directive to simply define basic tool-tip behavior.
 *
 * ```
 * @Directive({
 *   selector: '[tooltip]',
 *   inputs: [
 *     'text: tooltip'
 *   ],
 *   host: {
 *     '(mouseenter)': 'onMouseEnter()',
 *     '(mouseleave)': 'onMouseLeave()'
 *   }
 * })
 * class Tooltip{
 *   text:string;
 *   overlay:Overlay; // NOT YET IMPLEMENTED
 *   overlayManager:OverlayManager; // NOT YET IMPLEMENTED
 *
 *   constructor(overlayManager:OverlayManager) {
 *     this.overlay = overlay;
 *   }
 *
 *   onMouseEnter() {
 *     // exact signature to be determined
 *     this.overlay = this.overlayManager.open(text, ...);
 *   }
 *
 *   onMouseLeave() {
 *     this.overlay.close();
 *     this.overlay = null;
 *   }
 * }
 * ```
 * In our HTML template, we can then add this behavior to a `<div>` or any other element with the
 * `tooltip` selector,
 * like so:
 *
 * ```
 * <div tooltip="some text here"></div>
 * ```
 *
 * Directives can also control the instantiation, destruction, and positioning of inline template
 * elements:
 *
 * A directive uses a {@link ViewContainerRef} to instantiate, insert, move, and destroy views at
 * runtime.
 * The {@link ViewContainerRef} is created as a result of `<template>` element, and represents a
 * location in the current view
 * where these actions are performed.
 *
 * Views are always created as children of the current {@link ViewMetadata}, and as siblings of the
 * `<template>` element. Thus a
 * directive in a child view cannot inject the directive that created it.
 *
 * Since directives that create views via ViewContainers are common in Angular, and using the full
 * `<template>` element syntax is wordy, Angular
 * also supports a shorthand notation: `<li *foo="bar">` and `<li template="foo: bar">` are
 * equivalent.
 *
 * Thus,
 *
 * ```
 * <ul>
 *   <li *foo="bar" title="text"></li>
 * </ul>
 * ```
 *
 * Expands in use to:
 *
 * ```
 * <ul>
 *   <template [foo]="bar">
 *     <li title="text"></li>
 *   </template>
 * </ul>
 * ```
 *
 * Notice that although the shorthand places `*foo="bar"` within the `<li>` element, the binding for
 * the directive
 * controller is correctly instantiated on the `<template>` element rather than the `<li>` element.
 *
 * ## Lifecycle hooks
 *
 * When the directive class implements some {@link angular2/lifecycle_hooks} the callbacks are
 * called by the change detection at defined points in time during the life of the directive.
 *
 * ### Example
 *
 * Let's suppose we want to implement the `unless` behavior, to conditionally include a template.
 *
 * Here is a simple directive that triggers on an `unless` selector:
 *
 * ```
 * @Directive({
 *   selector: '[unless]',
 *   inputs: ['unless']
 * })
 * export class Unless {
 *   viewContainer: ViewContainerRef;
 *   templateRef: TemplateRef;
 *   prevCondition: boolean;
 *
 *   constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef) {
 *     this.viewContainer = viewContainer;
 *     this.templateRef = templateRef;
 *     this.prevCondition = null;
 *   }
 *
 *   set unless(newCondition) {
 *     if (newCondition && (isBlank(this.prevCondition) || !this.prevCondition)) {
 *       this.prevCondition = true;
 *       this.viewContainer.clear();
 *     } else if (!newCondition && (isBlank(this.prevCondition) || this.prevCondition)) {
 *       this.prevCondition = false;
 *       this.viewContainer.create(this.templateRef);
 *     }
 *   }
 * }
 * ```
 *
 * We can then use this `unless` selector in a template:
 * ```
 * <ul>
 *   <li *unless="expr"></li>
 * </ul>
 * ```
 *
 * Once the directive instantiates the child view, the shorthand notation for the template expands
 * and the result is:
 *
 * ```
 * <ul>
 *   <template [unless]="exp">
 *     <li></li>
 *   </template>
 *   <li></li>
 * </ul>
 * ```
 *
 * Note also that although the `<li></li>` template still exists inside the `<template></template>`,
 * the instantiated
 * view occurs on the second `<li></li>` which is a sibling to the `<template>` element.
 */
export var Directive: DirectiveFactory;
/**
 * Metadata properties available for configuring Views.
 *
 * Each Angular component requires a single `@Component` and at least one `@View` annotation. The
 * `@View` annotation specifies the HTML template to use, and lists the directives that are active
 * within the template.
 *
 * When a component is instantiated, the template is loaded into the component's shadow root, and
 * the expressions and statements in the template are evaluated against the component.
 *
 * For details on the `@Component` annotation, see {@link ComponentMetadata}.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'greet',
 *   template: 'Hello {{name}}!',
 *   directives: [GreetUser, Bold]
 * })
 * class Greet {
 *   name: string;
 *
 *   constructor() {
 *     this.name = 'World';
 *   }
 * }
 * ```
 */
export var View: ViewFactory;
/**
 * Specifies that a constant attribute value should be injected.
 *
 * The directive can inject constant string literals of host element attributes.
 *
 * ### Example
 *
 * Suppose we have an `<input>` element and want to know its `type`.
 *
 * ```html
 * <input type="text">
 * ```
 *
 * A decorator can inject string literal `text` like so:
 *
 * {@example core/ts/metadata/metadata.ts region='attributeMetadata'}
 */
export var Attribute: AttributeFactory;
/**
 * Declares an injectable parameter to be a live list of directives or variable
 * bindings from the content children of a directive.
 *
 * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
 *
 * Assume that `<tabs>` component would like to get a list its children `<pane>`
 * components as shown in this example:
 *
 * ```html
 * <tabs>
 *   <pane title="Overview">...</pane>
 *   <pane *ngFor="#o of objects" [title]="o.title">{{o.text}}</pane>
 * </tabs>
 * ```
 *
 * The preferred solution is to query for `Pane` directives using this decorator.
 *
 * ```javascript
 * @Component({
 *   selector: 'pane',
 *   inputs: ['title']
 * })
 * class Pane {
 *   title:string;
 * }
 *
 * @Component({
 *  selector: 'tabs',
 *  template: `
 *    <ul>
 *      <li *ngFor="#pane of panes">{{pane.title}}</li>
 *    </ul>
 *    <content></content>
 *  `
 * })
 * class Tabs {
 *   panes: QueryList<Pane>;
 *   constructor(@Query(Pane) panes:QueryList<Pane>) {
 *     this.panes = panes;
 *   }
 * }
 * ```
 *
 * A query can look for variable bindings by passing in a string with desired binding symbol.
 *
 * ### Example ([live demo](http://plnkr.co/edit/sT2j25cH1dURAyBRCKx1?p=preview))
 * ```html
 * <seeker>
 *   <div #findme>...</div>
 * </seeker>
 *
 * @Component({ selector: 'foo' })
 * class seeker {
 *   constructor(@Query('findme') elList: QueryList<ElementRef>) {...}
 * }
 * ```
 *
 * In this case the object that is injected depend on the type of the variable
 * binding. It can be an ElementRef, a directive or a component.
 *
 * Passing in a comma separated list of variable bindings will query for all of them.
 *
 * ```html
 * <seeker>
 *   <div #findMe>...</div>
 *   <div #findMeToo>...</div>
 * </seeker>
 *
 *  @Component({
 *   selector: 'foo'
 * })
 * class Seeker {
 *   constructor(@Query('findMe, findMeToo') elList: QueryList<ElementRef>) {...}
 * }
 * ```
 *
 * Configure whether query looks for direct children or all descendants
 * of the querying element, by using the `descendants` parameter.
 * It is set to `false` by default.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wtGeB977bv7qvA5FTYl9?p=preview))
 * ```html
 * <container #first>
 *   <item>a</item>
 *   <item>b</item>
 *   <container #second>
 *     <item>c</item>
 *   </container>
 * </container>
 * ```
 *
 * When querying for items, the first container will see only `a` and `b` by default,
 * but with `Query(TextDirective, {descendants: true})` it will see `c` too.
 *
 * The queried directives are kept in a depth-first pre-order with respect to their
 * positions in the DOM.
 *
 * Query does not look deep into any subcomponent views.
 *
 * Query is updated as part of the change-detection cycle. Since change detection
 * happens after construction of a directive, QueryList will always be empty when observed in the
 * constructor.
 *
 * The injected object is an unmodifiable live list.
 * See {@link QueryList} for more details.
 */
export var Query: QueryFactory;
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChildren(ChildDirective) contentChildren: QueryList<ChildDirective>;
 *
 *   ngAfterContentInit() {
 *     // contentChildren is set
 *   }
 * }
 * ```
 */
export var ContentChildren: ContentChildrenFactory;
/**
 * Configures a content query.
 *
 * Content queries are set before the `ngAfterContentInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Directive({
 *   selector: 'someDir'
 * })
 * class SomeDir {
 *   @ContentChild(ChildDirective) contentChild;
 *
 *   ngAfterContentInit() {
 *     // contentChild is set
 *   }
 * }
 * ```
 */
export var ContentChild: ContentChildFactory;
/**
 * Configures a view query.
 *
 * View queries are set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'someDir',
 *   templateUrl: 'someTemplate',
 *   directives: [ItemDirective]
 * })
 * class SomeDir {
 *   @ViewChildren(ItemDirective) viewChildren: QueryList<ItemDirective>;
 *
 *   ngAfterViewInit() {
 *     // viewChildren is set
 *   }
 * }
 * ```
 */
export var ViewChildren: ViewChildrenFactory;
/**
 * Configures a view query.
 *
 * View queries are set before the `ngAfterViewInit` callback is called.
 *
 * ### Example
 *
 * ```
 * @Component({
 *   selector: 'someDir',
 *   templateUrl: 'someTemplate',
 *   directives: [ItemDirective]
 * })
 * class SomeDir {
 *   @ViewChild(ItemDirective) viewChild:ItemDirective;
 *
 *   ngAfterViewInit() {
 *     // viewChild is set
 *   }
 * }
 * ```
 */
export var ViewChild: ViewChildFactory;
/**
 * Similar to {@link QueryMetadata}, but querying the component view, instead of
 * the content children.
 *
 * ### Example ([live demo](http://plnkr.co/edit/eNsFHDf7YjyM6IzKxM1j?p=preview))
 *
 * ```javascript
 * @Component({...})
 * @View({
 *   template: `
 *     <item> a </item>
 *     <item> b </item>
 *     <item> c </item>
 *   `
 * })
 * class MyComponent {
 *   shown: boolean;
 *
 *   constructor(private @Query(Item) items:QueryList<Item>) {
 *     items.changes.subscribe(() => console.log(items.length));
 *   }
 * }
 * ```
 *
 * Supports the same querying parameters as {@link QueryMetadata}, except
 * `descendants`. This always queries the whole view.
 *
 * As `shown` is flipped between true and false, items will contain zero of one
 * items.
 *
 * Specifies that a {@link QueryList} should be injected.
 *
 * The injected object is an iterable and observable live list.
 * See {@link QueryList} for more details.
 */
export var ViewQuery: QueryFactory;
/**
 * Declare reusable pipe function.
 *
 * ### Example
 *
 * {@example core/ts/metadata/metadata.ts region='pipe'}
 */
export var Pipe: PipeFactory;
/**
 * Declares a data-bound input property.
 *
 * Angular automatically updates data-bound properties during change detection.
 *
 * `InputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * The following example creates a component with two input properties.
 *
 * ```typescript
 * @Component({
 *   selector: 'bank-account',
 *   template: `
 *     Bank Name: {{bankName}}
 *     Account Id: {{id}}
 *   `
 * })
 * class BankAccount {
 *   @Input() bankName: string;
 *   @Input('account-id') id: string;
 *
 *   // this property is not bound, and won't be automatically updated by Angular
 *   normalizedBankName: string;
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <bank-account bank-name="RBC" account-id="4747"></bank-account>
 *   `,
 *   directives: [BankAccount]
 * })
 * class App {}
 *
 * bootstrap(App);
 * ```
 */
export var Input: InputFactory;
/**
 * Declares an event-bound output property.
 *
 * When an output property emits an event, an event handler attached to that event
 * the template is invoked.
 *
 * `OutputMetadata` takes an optional parameter that specifies the name
 * used when instantiating a component in the template. When not provided,
 * the name of the decorated property is used.
 *
 * ### Example
 *
 * ```typescript
 * @Directive({
 *   selector: 'interval-dir',
 * })
 * class IntervalDir {
 *   @Output() everySecond = new EventEmitter();
 *   @Output('everyFiveSeconds') five5Secs = new EventEmitter();
 *
 *   constructor() {
 *     setInterval(() => this.everySecond.emit("event"), 1000);
 *     setInterval(() => this.five5Secs.emit("event"), 5000);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <interval-dir (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()">
 *     </interval-dir>
 *   `,
 *   directives: [IntervalDir]
 * })
 * class App {
 *   everySecond() { console.log('second'); }
 *   everyFiveSeconds() { console.log('five seconds'); }
 * }
 * bootstrap(App);
 * ```
 */
export var Output: OutputFactory;
/**
 * Declares a host property binding.
 *
 * Angular automatically checks host property bindings during change detection.
 * If a binding changes, it will update the host element of the directive.
 *
 * `HostBindingMetadata` takes an optional parameter that specifies the property
 * name of the host element that will be updated. When not provided,
 * the class property name is used.
 *
 * ### Example
 *
 * The following example creates a directive that sets the `valid` and `invalid` classes
 * on the DOM element that has ngModel directive on it.
 *
 * ```typescript
 * @Directive({selector: '[ngModel]'})
 * class NgModelStatus {
 *   constructor(public control:NgModel) {}
 *   @HostBinding('[class.valid]') get valid { return this.control.valid; }
 *   @HostBinding('[class.invalid]') get invalid { return this.control.invalid; }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<input [(ngModel)]="prop">`,
 *   directives: [FORM_DIRECTIVES, NgModelStatus]
 * })
 * class App {
 *   prop;
 * }
 *
 * bootstrap(App);
 * ```
 */
export var HostBinding: HostBindingFactory;
/**
 * Declares a host listener.
 *
 * Angular will invoke the decorated method when the host element emits the specified event.
 *
 * If the decorated method returns `false`, then `preventDefault` is applied on the DOM
 * event.
 *
 * ### Example
 *
 * The following example declares a directive that attaches a click listener to the button and
 * counts clicks.
 *
 * ```typescript
 * @Directive({selector: 'button[counting]'})
 * class CountClicks {
 *   numberOfClicks = 0;
 *
 *   @HostListener('click', ['$event.target'])
 *   onClick(btn) {
 *     console.log("button", btn, "number of clicks:", this.numberOfClicks++);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<button counting>Increment</button>`,
 *   directives: [CountClicks]
 * })
 * class App {}
 *
 * bootstrap(App);
 * ```
 */
export var HostListener: HostListenerFactory;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/util/decorators.d.ts
declare module 'core/src/core/util/decorators' {
import { ConcreteType, Type } from 'angular2/src/facade/lang';
/**
 * Declares the interface to be used with {@link Class}.
 */
export interface ClassDefinition {
    /**
     * Optional argument for specifying the superclass.
     */
    extends?: Type;
    /**
     * Required constructor function for a class.
     *
     * The function may be optionally wrapped in an `Array`, in which case additional parameter
     * annotations may be specified.
     * The number of arguments and the number of parameter annotations must match.
     *
     * See {@link Class} for example of usage.
     */
    constructor: Function | any[];
    /**
     * Other methods on the class. Note that values should have type 'Function' but TS requires
     * all properties to have a narrower type than the index signature.
     */
    [x: string]: Type | Function | any[];
}
/**
 * An interface implemented by all Angular type decorators, which allows them to be used as ES7
 * decorators as well as
 * Angular DSL syntax.
 *
 * DSL syntax:
 *
 * ```
 * var MyClass = ng
 *   .Component({...})
 *   .View({...})
 *   .Class({...});
 * ```
 *
 * ES7 syntax:
 *
 * ```
 * @ng.Component({...})
 * @ng.View({...})
 * class MyClass {...}
 * ```
 */
export interface TypeDecorator {
    /**
     * Invoke as ES7 decorator.
     */
    <T extends Type>(type: T): T;
    (target: Object, propertyKey?: string | symbol, parameterIndex?: number): void;
    /**
     * Storage for the accumulated annotations so far used by the DSL syntax.
     *
     * Used by {@link Class} to annotate the generated class.
     */
    annotations: any[];
    /**
     * Generate a class from the definition and annotate it with {@link TypeDecorator#annotations}.
     */
    Class(obj: ClassDefinition): ConcreteType;
}
/**
 * Provides a way for expressing ES6 classes with parameter annotations in ES5.
 *
 * ## Basic Example
 *
 * ```
 * var Greeter = ng.Class({
 *   constructor: function(name) {
 *     this.name = name;
 *   },
 *
 *   greet: function() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class Greeter {
 *   constructor(name) {
 *     this.name = name;
 *   }
 *
 *   greet() {
 *     alert('Hello ' + this.name + '!');
 *   }
 * }
 * ```
 *
 * or equivalent to ES5:
 *
 * ```
 * var Greeter = function (name) {
 *   this.name = name;
 * }
 *
 * Greeter.prototype.greet = function () {
 *   alert('Hello ' + this.name + '!');
 * }
 * ```
 *
 * ### Example with parameter annotations
 *
 * ```
 * var MyService = ng.Class({
 *   constructor: [String, [new Query(), QueryList], function(name, queryList) {
 *     ...
 *   }]
 * });
 * ```
 *
 * is equivalent to ES6:
 *
 * ```
 * class MyService {
 *   constructor(name: string, @Query() queryList: QueryList) {
 *     ...
 *   }
 * }
 * ```
 *
 * ### Example with inheritance
 *
 * ```
 * var Shape = ng.Class({
 *   constructor: (color) {
 *     this.color = color;
 *   }
 * });
 *
 * var Square = ng.Class({
 *   extends: Shape,
 *   constructor: function(color, size) {
 *     Shape.call(this, color);
 *     this.size = size;
 *   }
 * });
 * ```
 */
export function Class(clsDef: ClassDefinition): ConcreteType;
export function makeDecorator(annotationCls: any, chainFn?: (fn: Function) => void): (...args: any[]) => (cls: any) => any;
export function makeParamDecorator(annotationCls: any): any;
export function makePropDecorator(decoratorCls: any): any;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/util.d.ts
declare module 'core/src/core/util' {
export { Class, ClassDefinition, TypeDecorator } from 'core/src/core/util/decorators';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/prod_mode.d.ts
declare module 'core/src/core/prod_mode' {
export { enableProdMode } from 'angular2/src/facade/lang';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/metadata.d.ts
declare module 'core/src/core/di/metadata' {
/**
 * A parameter metadata that specifies a dependency.
 *
 * ### Example ([live demo](http://plnkr.co/edit/6uHYJK?p=preview))
 *
 * ```typescript
 * class Engine {}
 *
 * @Injectable()
 * class Car {
 *   engine;
 *   constructor(@Inject("MyEngine") engine:Engine) {
 *     this.engine = engine;
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([
 *  provide("MyEngine", {useClass: Engine}),
 *  Car
 * ]);
 *
 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
 * ```
 *
 * When `@Inject()` is not present, {@link Injector} will use the type annotation of the parameter.
 *
 * ### Example
 *
 * ```typescript
 * class Engine {}
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine: Engine) {} //same as constructor(@Inject(Engine) engine:Engine)
 * }
 *
 * var injector = Injector.resolveAndCreate([Engine, Car]);
 * expect(injector.get(Car).engine instanceof Engine).toBe(true);
 * ```
 */
export class InjectMetadata {
    token: any;
    constructor(token: any);
    toString(): string;
}
/**
 * A parameter metadata that marks a dependency as optional. {@link Injector} provides `null` if
 * the dependency is not found.
 *
 * ### Example ([live demo](http://plnkr.co/edit/AsryOm?p=preview))
 *
 * ```typescript
 * class Engine {}
 *
 * @Injectable()
 * class Car {
 *   engine;
 *   constructor(@Optional() engine:Engine) {
 *     this.engine = engine;
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([Car]);
 * expect(injector.get(Car).engine).toBeNull();
 * ```
 */
export class OptionalMetadata {
    toString(): string;
}
/**
 * `DependencyMetadata` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
export class DependencyMetadata {
    token: any;
}
/**
 * A marker metadata that marks a class as available to {@link Injector} for creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Wk4DMQ?p=preview))
 *
 * ```typescript
 * @Injectable()
 * class UsefulService {}
 *
 * @Injectable()
 * class NeedsService {
 *   constructor(public service:UsefulService) {}
 * }
 *
 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
 * expect(injector.get(NeedsService).service instanceof UsefulService).toBe(true);
 * ```
 * {@link Injector} will throw {@link NoAnnotationError} when trying to instantiate a class that
 * does not have `@Injectable` marker, as shown in the example below.
 *
 * ```typescript
 * class UsefulService {}
 *
 * class NeedsService {
 *   constructor(public service:UsefulService) {}
 * }
 *
 * var injector = Injector.resolveAndCreate([NeedsService, UsefulService]);
 * expect(() => injector.get(NeedsService)).toThrowError();
 * ```
 */
export class InjectableMetadata {
    constructor();
}
/**
 * Specifies that an {@link Injector} should retrieve a dependency only from itself.
 *
 * ### Example ([live demo](http://plnkr.co/edit/NeagAg?p=preview))
 *
 * ```typescript
 * class Dependency {
 * }
 *
 * @Injectable()
 * class NeedsDependency {
 *   dependency;
 *   constructor(@Self() dependency:Dependency) {
 *     this.dependency = dependency;
 *   }
 * }
 *
 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
 * var nd = inj.get(NeedsDependency);
 *
 * expect(nd.dependency instanceof Dependency).toBe(true);
 *
 * var inj = Injector.resolveAndCreate([Dependency]);
 * var child = inj.resolveAndCreateChild([NeedsDependency]);
 * expect(() => child.get(NeedsDependency)).toThrowError();
 * ```
 */
export class SelfMetadata {
    toString(): string;
}
/**
 * Specifies that the dependency resolution should start from the parent injector.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Wchdzb?p=preview))
 *
 * ```typescript
 * class Dependency {
 * }
 *
 * @Injectable()
 * class NeedsDependency {
 *   dependency;
 *   constructor(@SkipSelf() dependency:Dependency) {
 *     this.dependency = dependency;
 *   }
 * }
 *
 * var parent = Injector.resolveAndCreate([Dependency]);
 * var child = parent.resolveAndCreateChild([NeedsDependency]);
 * expect(child.get(NeedsDependency).dependency instanceof Depedency).toBe(true);
 *
 * var inj = Injector.resolveAndCreate([Dependency, NeedsDependency]);
 * expect(() => inj.get(NeedsDependency)).toThrowError();
 * ```
 */
export class SkipSelfMetadata {
    toString(): string;
}
/**
 * Specifies that an injector should retrieve a dependency from any injector until reaching the
 * closest host.
 *
 * In Angular, a component element is automatically declared as a host for all the injectors in
 * its view.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GX79pV?p=preview))
 *
 * In the following example `App` contains `ParentCmp`, which contains `ChildDirective`.
 * So `ParentCmp` is the host of `ChildDirective`.
 *
 * `ChildDirective` depends on two services: `HostService` and `OtherService`.
 * `HostService` is defined at `ParentCmp`, and `OtherService` is defined at `App`.
 *
 *```typescript
 * class OtherService {}
 * class HostService {}
 *
 * @Directive({
 *   selector: 'child-directive'
 * })
 * class ChildDirective {
 *   constructor(@Optional() @Host() os:OtherService, @Optional() @Host() hs:HostService){
 *     console.log("os is null", os);
 *     console.log("hs is NOT null", hs);
 *   }
 * }
 *
 * @Component({
 *   selector: 'parent-cmp',
 *   providers: [HostService],
 *   template: `
 *     Dir: <child-directive></child-directive>
 *   `,
 *   directives: [ChildDirective]
 * })
 * class ParentCmp {
 * }
 *
 * @Component({
 *   selector: 'app',
 *   providers: [OtherService],
 *   template: `
 *     Parent: <parent-cmp></parent-cmp>
 *   `,
 *   directives: [ParentCmp]
 * })
 * class App {
 * }
 *
 * bootstrap(App);
 *```
 */
export class HostMetadata {
    toString(): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/decorators.d.ts
declare module 'core/src/core/di/decorators' {
import { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata } from 'core/src/core/di/metadata';
/**
 * Factory for creating {@link InjectMetadata}.
 */
export interface InjectFactory {
    (token: any): any;
    new (token: any): InjectMetadata;
}
/**
 * Factory for creating {@link OptionalMetadata}.
 */
export interface OptionalFactory {
    (): any;
    new (): OptionalMetadata;
}
/**
 * Factory for creating {@link InjectableMetadata}.
 */
export interface InjectableFactory {
    (): any;
    new (): InjectableMetadata;
}
/**
 * Factory for creating {@link SelfMetadata}.
 */
export interface SelfFactory {
    (): any;
    new (): SelfMetadata;
}
/**
 * Factory for creating {@link HostMetadata}.
 */
export interface HostFactory {
    (): any;
    new (): HostMetadata;
}
/**
 * Factory for creating {@link SkipSelfMetadata}.
 */
export interface SkipSelfFactory {
    (): any;
    new (): SkipSelfMetadata;
}
/**
 * Factory for creating {@link InjectMetadata}.
 */
export var Inject: InjectFactory;
/**
 * Factory for creating {@link OptionalMetadata}.
 */
export var Optional: OptionalFactory;
/**
 * Factory for creating {@link InjectableMetadata}.
 */
export var Injectable: InjectableFactory;
/**
 * Factory for creating {@link SelfMetadata}.
 */
export var Self: SelfFactory;
/**
 * Factory for creating {@link HostMetadata}.
 */
export var Host: HostFactory;
/**
 * Factory for creating {@link SkipSelfMetadata}.
 */
export var SkipSelf: SkipSelfFactory;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/forward_ref.d.ts
declare module 'core/src/core/di/forward_ref' {
import { Type } from 'angular2/src/facade/lang';
/**
 * An interface that a function passed into {@link forwardRef} has to implement.
 *
 * ### Example
 *
 * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref_fn'}
 */
export interface ForwardRefFn {
    (): any;
}
/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, `forwardRef` is used when the `token` which we need to refer to for the purposes of
 * DI is declared,
 * but not yet defined. It is also used when the `token` which we use when creating a query is not
 * yet defined.
 *
 * ### Example
 * {@example core/di/ts/forward_ref/forward_ref.ts region='forward_ref'}
 */
export function forwardRef(forwardRefFn: ForwardRefFn): Type;
/**
 * Lazily retrieves the reference value from a forwardRef.
 *
 * Acts as the identity function when given a non-forward-ref value.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GU72mJrk1fiodChcmiDR?p=preview))
 *
 * ```typescript
 * var ref = forwardRef(() => "refValue");
 * expect(resolveForwardRef(ref)).toEqual("refValue");
 * expect(resolveForwardRef("regularValue")).toEqual("regularValue");
 * ```
 *
 * See: {@link forwardRef}
 */
export function resolveForwardRef(type: any): any;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/injector.d.ts
declare module 'core/src/core/di/injector' {
import { ResolvedProvider, Provider, Dependency } from 'core/src/core/di/provider';
import { Type } from 'angular2/src/facade/lang';
export const UNDEFINED: Object;
/**
 * Visibility of a {@link Provider}.
 */
export enum Visibility {
    /**
     * A `Public` {@link Provider} is only visible to regular (as opposed to host) child injectors.
     */
    Public = 0,
    /**
     * A `Private` {@link Provider} is only visible to host (as opposed to regular) child injectors.
     */
    Private = 1,
    /**
     * A `PublicAndPrivate` {@link Provider} is visible to both host and regular child injectors.
     */
    PublicAndPrivate = 2,
}
export interface ProtoInjectorStrategy {
    getProviderAtIndex(index: number): ResolvedProvider;
    createInjectorStrategy(inj: Injector): InjectorStrategy;
}
export class ProtoInjectorInlineStrategy implements ProtoInjectorStrategy {
    provider0: ResolvedProvider;
    provider1: ResolvedProvider;
    provider2: ResolvedProvider;
    provider3: ResolvedProvider;
    provider4: ResolvedProvider;
    provider5: ResolvedProvider;
    provider6: ResolvedProvider;
    provider7: ResolvedProvider;
    provider8: ResolvedProvider;
    provider9: ResolvedProvider;
    keyId0: number;
    keyId1: number;
    keyId2: number;
    keyId3: number;
    keyId4: number;
    keyId5: number;
    keyId6: number;
    keyId7: number;
    keyId8: number;
    keyId9: number;
    visibility0: Visibility;
    visibility1: Visibility;
    visibility2: Visibility;
    visibility3: Visibility;
    visibility4: Visibility;
    visibility5: Visibility;
    visibility6: Visibility;
    visibility7: Visibility;
    visibility8: Visibility;
    visibility9: Visibility;
    constructor(protoEI: ProtoInjector, bwv: ProviderWithVisibility[]);
    getProviderAtIndex(index: number): ResolvedProvider;
    createInjectorStrategy(injector: Injector): InjectorStrategy;
}
export class ProtoInjectorDynamicStrategy implements ProtoInjectorStrategy {
    providers: ResolvedProvider[];
    keyIds: number[];
    visibilities: Visibility[];
    constructor(protoInj: ProtoInjector, bwv: ProviderWithVisibility[]);
    getProviderAtIndex(index: number): ResolvedProvider;
    createInjectorStrategy(ei: Injector): InjectorStrategy;
}
export class ProtoInjector {
    static fromResolvedProviders(providers: ResolvedProvider[]): ProtoInjector;
    numberOfProviders: number;
    constructor(bwv: ProviderWithVisibility[]);
    getProviderAtIndex(index: number): ResolvedProvider;
}
export interface InjectorStrategy {
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
    resetConstructionCounter(): void;
    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
}
export class InjectorInlineStrategy implements InjectorStrategy {
    injector: Injector;
    protoStrategy: ProtoInjectorInlineStrategy;
    obj0: any;
    obj1: any;
    obj2: any;
    obj3: any;
    obj4: any;
    obj5: any;
    obj6: any;
    obj7: any;
    obj8: any;
    obj9: any;
    constructor(injector: Injector, protoStrategy: ProtoInjectorInlineStrategy);
    resetConstructionCounter(): void;
    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
}
export class InjectorDynamicStrategy implements InjectorStrategy {
    protoStrategy: ProtoInjectorDynamicStrategy;
    injector: Injector;
    objs: any[];
    constructor(protoStrategy: ProtoInjectorDynamicStrategy, injector: Injector);
    resetConstructionCounter(): void;
    instantiateProvider(provider: ResolvedProvider, visibility: Visibility): any;
    getObjByKeyId(keyId: number, visibility: Visibility): any;
    getObjAtIndex(index: number): any;
    getMaxNumberOfObjects(): number;
}
export class ProviderWithVisibility {
    provider: ResolvedProvider;
    visibility: Visibility;
    constructor(provider: ResolvedProvider, visibility: Visibility);
    getKeyId(): number;
}
/**
 * Used to provide dependencies that cannot be easily expressed as providers.
 */
export interface DependencyProvider {
    getDependency(injector: Injector, provider: ResolvedProvider, dependency: Dependency): any;
}
/**
 * A dependency injection container used for instantiating objects and resolving dependencies.
 *
 * An `Injector` is a replacement for a `new` operator, which can automatically resolve the
 * constructor dependencies.
 *
 * In typical use, application code asks for the dependencies in the constructor and they are
 * resolved by the `Injector`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/jzjec0?p=preview))
 *
 * The following example creates an `Injector` configured to create `Engine` and `Car`.
 *
 * ```typescript
 * @Injectable()
 * class Engine {
 * }
 *
 * @Injectable()
 * class Car {
 *   constructor(public engine:Engine) {}
 * }
 *
 * var injector = Injector.resolveAndCreate([Car, Engine]);
 * var car = injector.get(Car);
 * expect(car instanceof Car).toBe(true);
 * expect(car.engine instanceof Engine).toBe(true);
 * ```
 *
 * Notice, we don't use the `new` operator because we explicitly want to have the `Injector`
 * resolve all of the object's dependencies automatically.
 */
export class Injector {
    private _isHostBoundary;
    private _depProvider;
    private _debugContext;
    /**
     * Turns an array of provider definitions into an array of resolved providers.
     *
     * A resolution is a process of flattening multiple nested arrays and converting individual
     * providers into an array of {@link ResolvedProvider}s.
     *
     * ### Example ([live demo](http://plnkr.co/edit/AiXTHi?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = Injector.resolve([Car, [[Engine]]]);
     *
     * expect(providers.length).toEqual(2);
     *
     * expect(providers[0] instanceof ResolvedProvider).toBe(true);
     * expect(providers[0].key.displayName).toBe("Car");
     * expect(providers[0].dependencies.length).toEqual(1);
     * expect(providers[0].factory).toBeDefined();
     *
     * expect(providers[1].key.displayName).toBe("Engine");
     * });
     * ```
     *
     * See {@link Injector#fromResolvedProviders} for more info.
     */
    static resolve(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
    /**
     * Resolves an array of providers and creates an injector from those providers.
     *
     * The passed-in providers can be an array of `Type`, {@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ePOccA?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Car, Engine]);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     *
     * This function is slower than the corresponding `fromResolvedProviders`
     * because it needs to resolve the passed-in providers first.
     * See {@link Injector#resolve} and {@link Injector#fromResolvedProviders}.
     */
    static resolveAndCreate(providers: Array<Type | Provider | any[]>): Injector;
    /**
     * Creates an injector from previously resolved providers.
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/KrSMci?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var providers = Injector.resolve([Car, Engine]);
     * var injector = Injector.fromResolvedProviders(providers);
     * expect(injector.get(Car) instanceof Car).toBe(true);
     * ```
     */
    static fromResolvedProviders(providers: ResolvedProvider[]): Injector;
    /**
     * @deprecated
     */
    static fromResolvedBindings(providers: ResolvedProvider[]): Injector;
    /**
     * Private
     */
    constructor(_proto: any, _parent?: Injector, _isHostBoundary?: boolean, _depProvider?: any, _debugContext?: Function);
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Throws {@link NoProviderError} if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide("validToken", {useValue: "Value"})
     * ]);
     * expect(injector.get("validToken")).toEqual("Value");
     * expect(() => injector.get("invalidToken")).toThrowError();
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.get(Injector)).toBe(injector);
     * ```
     */
    get(token: any): any;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * Returns null if not found.
     *
     * ### Example ([live demo](http://plnkr.co/edit/tpEbEy?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide("validToken", {useValue: "Value"})
     * ]);
     * expect(injector.getOptional("validToken")).toEqual("Value");
     * expect(injector.getOptional("invalidToken")).toBe(null);
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([]);
     * expect(injector.getOptional(Injector)).toBe(injector);
     * ```
     */
    getOptional(token: any): any;
    /**
     * Parent of this injector.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/eosMGo?p=preview))
     *
     * ```typescript
     * var parent = Injector.resolveAndCreate([]);
     * var child = parent.resolveAndCreateChild([]);
     * expect(child.parent).toBe(parent);
     * ```
     */
    parent: Injector;
    /**
     * Resolves an array of providers and creates a child injector from those providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * The passed-in providers can be an array of `Type`, {@link Provider},
     * or a recursive array of more providers.
     *
     * ### Example ([live demo](http://plnkr.co/edit/opB3T4?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parent = Injector.resolveAndCreate([ParentProvider]);
     * var child = parent.resolveAndCreateChild([ChildProvider]);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     *
     * This function is slower than the corresponding `createChildFromResolved`
     * because it needs to resolve the passed-in providers first.
     * See {@link Injector#resolve} and {@link Injector#createChildFromResolved}.
     */
    resolveAndCreateChild(providers: Array<Type | Provider | any[]>): Injector;
    /**
     * Creates a child injector from previously resolved providers.
     *
     * <!-- TODO: Add a link to the section of the user guide talking about hierarchical injection.
     * -->
     *
     * This API is the recommended way to construct injectors in performance-sensitive parts.
     *
     * ### Example ([live demo](http://plnkr.co/edit/VhyfjN?p=preview))
     *
     * ```typescript
     * class ParentProvider {}
     * class ChildProvider {}
     *
     * var parentProviders = Injector.resolve([ParentProvider]);
     * var childProviders = Injector.resolve([ChildProvider]);
     *
     * var parent = Injector.fromResolvedProviders(parentProviders);
     * var child = parent.createChildFromResolved(childProviders);
     *
     * expect(child.get(ParentProvider) instanceof ParentProvider).toBe(true);
     * expect(child.get(ChildProvider) instanceof ChildProvider).toBe(true);
     * expect(child.get(ParentProvider)).toBe(parent.get(ParentProvider));
     * ```
     */
    createChildFromResolved(providers: ResolvedProvider[]): Injector;
    /**
     * Resolves a provider and instantiates an object in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/yvVXoB?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     *
     * var car = injector.resolveAndInstantiate(Car);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.resolveAndInstantiate(Car));
     * ```
     */
    resolveAndInstantiate(provider: Type | Provider): any;
    /**
     * Instantiates an object using a resolved provider in the context of the injector.
     *
     * The created object does not get cached by the injector.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ptCImQ?p=preview))
     *
     * ```typescript
     * @Injectable()
     * class Engine {
     * }
     *
     * @Injectable()
     * class Car {
     *   constructor(public engine:Engine) {}
     * }
     *
     * var injector = Injector.resolveAndCreate([Engine]);
     * var carProvider = Injector.resolve([Car])[0];
     * var car = injector.instantiateResolved(carProvider);
     * expect(car.engine).toBe(injector.get(Engine));
     * expect(car).not.toBe(injector.instantiateResolved(carProvider));
     * ```
     */
    instantiateResolved(provider: ResolvedProvider): any;
    private _instantiateProvider(provider, visibility);
    private _instantiate(provider, resolvedFactory, visibility);
    private _getByDependency(provider, dep, providerVisibility);
    private _getByKey(key, lowerBoundVisibility, upperBoundVisibility, optional, providerVisibility);
    displayName: string;
    toString(): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/provider.d.ts
declare module 'core/src/core/di/provider' {
import { Type } from 'angular2/src/facade/lang';
import { Key } from 'core/src/core/di/key';
/**
 * `Dependency` is used by the framework to extend DI.
 * This is internal to Angular and should not be used directly.
 */
export class Dependency {
    key: Key;
    optional: boolean;
    lowerBoundVisibility: any;
    upperBoundVisibility: any;
    properties: any[];
    constructor(key: Key, optional: boolean, lowerBoundVisibility: any, upperBoundVisibility: any, properties: any[]);
    static fromKey(key: Key): Dependency;
}
/**
 * Describes how the {@link Injector} should instantiate a given token.
 *
 * See {@link provide}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/GNAyj6K6PfYg2NBzgwZ5?p%3Dpreview&p=preview))
 *
 * ```javascript
 * var injector = Injector.resolveAndCreate([
 *   new Provider("message", { useValue: 'Hello' })
 * ]);
 *
 * expect(injector.get("message")).toEqual('Hello');
 * ```
 */
export class Provider {
    /**
     * Token used when retrieving this provider. Usually, it is a type {@link Type}.
     */
    token: any;
    /**
     * Binds a DI token to an implementation class.
     *
     * ### Example ([live demo](http://plnkr.co/edit/RSTG86qgmoxCyj9SWPwY?p=preview))
     *
     * Because `useExisting` and `useClass` are often confused, the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useClass: Car })
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useExisting: Car })
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    useClass: Type;
    /**
     * Binds a DI token to a value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/UFVsMVQIDe7l4waWziES?p=preview))
     *
     * ```javascript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("message", { useValue: 'Hello' })
     * ]);
     *
     * expect(injector.get("message")).toEqual('Hello');
     * ```
     */
    useValue: any;
    /**
     * Binds a DI token to an existing token.
     *
     * {@link Injector} returns the same instance as if the provided token was used.
     * This is in contrast to `useClass` where a separate instance of `useClass` is returned.
     *
     * ### Example ([live demo](http://plnkr.co/edit/QsatsOJJ6P8T2fMe9gr8?p=preview))
     *
     * Because `useExisting` and `useClass` are often confused the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useExisting: Car })
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   new Provider(Vehicle, { useClass: Car })
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    useExisting: any;
    /**
     * Binds a DI token to a function which computes the value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
     *                       deps: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     *
     * Used in conjunction with dependencies.
     */
    useFactory: Function;
    /**
     * Specifies a set of dependencies
     * (as `token`s) which should be injected into the factory function.
     *
     * ### Example ([live demo](http://plnkr.co/edit/Scoxy0pJNqKGAPZY1VVC?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider(Number, { useFactory: () => { return 1+2; }}),
     *   new Provider(String, { useFactory: (value) => { return "Value: " + value; },
     *                       deps: [Number] })
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     *
     * Used in conjunction with `useFactory`.
     */
    dependencies: Object[];
    constructor(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
        useClass?: Type;
        useValue?: any;
        useExisting?: any;
        useFactory?: Function;
        deps?: Object[];
        multi?: boolean;
    });
    /**
     * Creates multiple providers matching the same token (a multi-provider).
     *
     * Multi-providers are used for creating pluggable service, where the system comes
     * with some default providers, and the user can register additional providers.
     * The combination of the default providers and the additional providers will be
     * used to drive the behavior of the system.
     *
     * ### Example
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("Strings", { useValue: "String1", multi: true}),
     *   new Provider("Strings", { useValue: "String2", multi: true})
     * ]);
     *
     * expect(injector.get("Strings")).toEqual(["String1", "String2"]);
     * ```
     *
     * Multi-providers and regular providers cannot be mixed. The following
     * will throw an exception:
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   new Provider("Strings", { useValue: "String1", multi: true }),
     *   new Provider("Strings", { useValue: "String2"})
     * ]);
     * ```
     */
    multi: boolean;
}
/**
 * See {@link Provider} instead.
 *
 * @deprecated
 */
export class Binding extends Provider {
    constructor(token: any, {toClass, toValue, toAlias, toFactory, deps, multi}: {
        toClass?: Type;
        toValue?: any;
        toAlias?: any;
        toFactory: Function;
        deps?: Object[];
        multi?: boolean;
    });
    /**
     * @deprecated
     */
    toClass: Type;
    /**
     * @deprecated
     */
    toAlias: any;
    /**
     * @deprecated
     */
    toFactory: Function;
    /**
     * @deprecated
     */
    toValue: any;
}
/**
 * An internal resolved representation of a {@link Provider} used by the {@link Injector}.
 *
 * It is usually created automatically by `Injector.resolveAndCreate`.
 *
 * It can be created manually, as follows:
 *
 * ### Example ([live demo](http://plnkr.co/edit/RfEnhh8kUEI0G3qsnIeT?p%3Dpreview&p=preview))
 *
 * ```typescript
 * var resolvedProviders = Injector.resolve([new Provider('message', {useValue: 'Hello'})]);
 * var injector = Injector.fromResolvedProviders(resolvedProviders);
 *
 * expect(injector.get('message')).toEqual('Hello');
 * ```
 */
export interface ResolvedProvider {
    /**
     * A key, usually a `Type`.
     */
    key: Key;
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    resolvedFactories: ResolvedFactory[];
    /**
     * Indicates if the provider is a multi-provider or a regular provider.
     */
    multiProvider: boolean;
}
/**
 * See {@link ResolvedProvider} instead.
 *
 * @deprecated
 */
export interface ResolvedBinding extends ResolvedProvider {
}
export class ResolvedProvider_ implements ResolvedBinding {
    key: Key;
    resolvedFactories: ResolvedFactory[];
    multiProvider: boolean;
    constructor(key: Key, resolvedFactories: ResolvedFactory[], multiProvider: boolean);
    resolvedFactory: ResolvedFactory;
}
/**
 * An internal resolved representation of a factory function created by resolving {@link Provider}.
 */
export class ResolvedFactory {
    /**
     * Factory function which can return an instance of an object represented by a key.
     */
    factory: Function;
    /**
     * Arguments (dependencies) to the `factory` function.
     */
    dependencies: Dependency[];
    constructor(
        /**
         * Factory function which can return an instance of an object represented by a key.
         */
        factory: Function, 
        /**
         * Arguments (dependencies) to the `factory` function.
         */
        dependencies: Dependency[]);
}
/**
 * Creates a {@link Provider}.
 *
 * To construct a {@link Provider}, bind a `token` to either a class, a value, a factory function,
 * or
 * to an existing `token`.
 * See {@link ProviderBuilder} for more details.
 *
 * The `token` is most commonly a class or {@link angular2/di/OpaqueToken}.
 *
 * @deprecated
 */
export function bind(token: any): ProviderBuilder;
/**
 * Creates a {@link Provider}.
 *
 * See {@link Provider} for more details.
 *
 * <!-- TODO: improve the docs -->
 */
export function provide(token: any, {useClass, useValue, useExisting, useFactory, deps, multi}: {
    useClass?: Type;
    useValue?: any;
    useExisting?: any;
    useFactory?: Function;
    deps?: Object[];
    multi?: boolean;
}): Provider;
/**
 * Helper class for the {@link bind} function.
 */
export class ProviderBuilder {
    token: any;
    constructor(token: any);
    /**
     * Binds a DI token to a class.
     *
     * ### Example ([live demo](http://plnkr.co/edit/ZpBCSYqv6e2ud5KXLdxQ?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused, the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useClass: Car})
     * ]);
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useExisting: Car})
     * ]);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toClass(type: Type): Provider;
    /**
     * Binds a DI token to a value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/G024PFHmDL0cJFgfZK8O?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide('message', {useValue: 'Hello'})
     * ]);
     *
     * expect(injector.get('message')).toEqual('Hello');
     * ```
     */
    toValue(value: any): Provider;
    /**
     * Binds a DI token to an existing token.
     *
     * Angular will return the same instance as if the provided token was used. (This is
     * in contrast to `useClass` where a separate instance of `useClass` will be returned.)
     *
     * ### Example ([live demo](http://plnkr.co/edit/uBaoF2pN5cfc5AfZapNw?p=preview))
     *
     * Because `toAlias` and `toClass` are often confused, the example contains
     * both use cases for easy comparison.
     *
     * ```typescript
     * class Vehicle {}
     *
     * class Car extends Vehicle {}
     *
     * var injectorAlias = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useExisting: Car})
     * ]);
     * var injectorClass = Injector.resolveAndCreate([
     *   Car,
     *   provide(Vehicle, {useClass: Car})
     * ]);
     *
     * expect(injectorAlias.get(Vehicle)).toBe(injectorAlias.get(Car));
     * expect(injectorAlias.get(Vehicle) instanceof Car).toBe(true);
     *
     * expect(injectorClass.get(Vehicle)).not.toBe(injectorClass.get(Car));
     * expect(injectorClass.get(Vehicle) instanceof Car).toBe(true);
     * ```
     */
    toAlias(aliasToken: any): Provider;
    /**
     * Binds a DI token to a function which computes the value.
     *
     * ### Example ([live demo](http://plnkr.co/edit/OejNIfTT3zb1iBxaIYOb?p=preview))
     *
     * ```typescript
     * var injector = Injector.resolveAndCreate([
     *   provide(Number, {useFactory: () => { return 1+2; }}),
     *   provide(String, {useFactory: (v) => { return "Value: " + v; }, deps: [Number]})
     * ]);
     *
     * expect(injector.get(Number)).toEqual(3);
     * expect(injector.get(String)).toEqual('Value: 3');
     * ```
     */
    toFactory(factory: Function, dependencies?: any[]): Provider;
}
/**
 * Resolve a single provider.
 */
export function resolveFactory(provider: Provider): ResolvedFactory;
/**
 * Converts the {@link Provider} into {@link ResolvedProvider}.
 *
 * {@link Injector} internally only uses {@link ResolvedProvider}, {@link Provider} contains
 * convenience provider syntax.
 */
export function resolveProvider(provider: Provider): ResolvedProvider;
/**
 * Resolve a list of Providers.
 */
export function resolveProviders(providers: Array<Type | Provider | any[]>): ResolvedProvider[];
/**
 * Merges a list of ResolvedProviders into a list where
 * each key is contained exactly once and multi providers
 * have been merged.
 */
export function mergeResolvedProviders(providers: ResolvedProvider[], normalizedProvidersMap: Map<number, ResolvedProvider>): Map<number, ResolvedProvider>;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/key.d.ts
declare module 'core/src/core/di/key' {
/**
 * A unique object used for retrieving items from the {@link Injector}.
 *
 * Keys have:
 * - a system-wide unique `id`.
 * - a `token`.
 *
 * `Key` is used internally by {@link Injector} because its system-wide unique `id` allows the
 * injector to store created objects in a more efficient way.
 *
 * `Key` should not be created directly. {@link Injector} creates keys automatically when resolving
 * providers.
 */
export class Key {
    token: Object;
    id: number;
    /**
     * Private
     */
    constructor(token: Object, id: number);
    /**
     * Returns a stringified token.
     */
    displayName: string;
    /**
     * Retrieves a `Key` for a token.
     */
    static get(token: Object): Key;
    /**
     * @returns the number of keys registered in the system.
     */
    static numberOfKeys: number;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/exceptions.d.ts
declare module 'core/src/core/di/exceptions' {
import { BaseException, WrappedException } from 'angular2/src/facade/exceptions';
import { Key } from 'core/src/core/di/key';
import { Injector } from 'core/src/core/di/injector';
/**
 * Base class for all errors arising from misconfigured providers.
 */
export class AbstractProviderError extends BaseException {
    constructor(injector: Injector, key: Key, constructResolvingMessage: Function);
    addKey(injector: Injector, key: Key): void;
    context: any;
}
/**
 * Thrown when trying to retrieve a dependency by `Key` from {@link Injector}, but the
 * {@link Injector} does not have a {@link Provider} for {@link Key}.
 *
 * ### Example ([live demo](http://plnkr.co/edit/vq8D3FRB9aGbnWJqtEPE?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b:B) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 */
export class NoProviderError extends AbstractProviderError {
    constructor(injector: Injector, key: Key);
}
/**
 * Thrown when dependencies form a cycle.
 *
 * ### Example ([live demo](http://plnkr.co/edit/wYQdNos0Tzql3ei1EV9j?p=info))
 *
 * ```typescript
 * var injector = Injector.resolveAndCreate([
 *   provide("one", {useFactory: (two) => "two", deps: [[new Inject("two")]]}),
 *   provide("two", {useFactory: (one) => "one", deps: [[new Inject("one")]]})
 * ]);
 *
 * expect(() => injector.get("one")).toThrowError();
 * ```
 *
 * Retrieving `A` or `B` throws a `CyclicDependencyError` as the graph above cannot be constructed.
 */
export class CyclicDependencyError extends AbstractProviderError {
    constructor(injector: Injector, key: Key);
}
/**
 * Thrown when a constructing type returns with an Error.
 *
 * The `InstantiationError` class contains the original error plus the dependency graph which caused
 * this object to be instantiated.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7aWYdcqTQsP0eNqEdUAf?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor() {
 *     throw new Error('message');
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([A]);

 * try {
 *   injector.get(A);
 * } catch (e) {
 *   expect(e instanceof InstantiationError).toBe(true);
 *   expect(e.originalException.message).toEqual("message");
 *   expect(e.originalStack).toBeDefined();
 * }
 * ```
 */
export class InstantiationError extends WrappedException {
    constructor(injector: Injector, originalException: any, originalStack: any, key: Key);
    addKey(injector: Injector, key: Key): void;
    wrapperMessage: string;
    causeKey: Key;
    context: any;
}
/**
 * Thrown when an object other then {@link Provider} (or `Type`) is passed to {@link Injector}
 * creation.
 *
 * ### Example ([live demo](http://plnkr.co/edit/YatCFbPAMCL0JSSQ4mvH?p=preview))
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate(["not a type"])).toThrowError();
 * ```
 */
export class InvalidProviderError extends BaseException {
    constructor(provider: any);
}
/**
 * Thrown when the class has no annotation information.
 *
 * Lack of annotation information prevents the {@link Injector} from determining which dependencies
 * need to be injected into the constructor.
 *
 * ### Example ([live demo](http://plnkr.co/edit/rHnZtlNS7vJOPQ6pcVkm?p=preview))
 *
 * ```typescript
 * class A {
 *   constructor(b) {}
 * }
 *
 * expect(() => Injector.resolveAndCreate([A])).toThrowError();
 * ```
 *
 * This error is also thrown when the class not marked with {@link Injectable} has parameter types.
 *
 * ```typescript
 * class B {}
 *
 * class A {
 *   constructor(b:B) {} // no information about the parameter types of A is available at runtime.
 * }
 *
 * expect(() => Injector.resolveAndCreate([A,B])).toThrowError();
 * ```
 */
export class NoAnnotationError extends BaseException {
    constructor(typeOrFunc: any, params: any[][]);
    private static _genMessage(typeOrFunc, params);
}
/**
 * Thrown when getting an object by index.
 *
 * ### Example ([live demo](http://plnkr.co/edit/bRs0SX2OTQiJzqvjgl8P?p=preview))
 *
 * ```typescript
 * class A {}
 *
 * var injector = Injector.resolveAndCreate([A]);
 *
 * expect(() => injector.getAt(100)).toThrowError();
 * ```
 */
export class OutOfBoundsError extends BaseException {
    constructor(index: any);
}
/**
 * Thrown when a multi provider and a regular provider are bound to the same token.
 *
 * ### Example
 *
 * ```typescript
 * expect(() => Injector.resolveAndCreate([
 *   new Provider("Strings", {useValue: "string1", multi: true}),
 *   new Provider("Strings", {useValue: "string2", multi: false})
 * ])).toThrowError();
 * ```
 */
export class MixingMultiProvidersWithRegularProvidersError extends BaseException {
    constructor(provider1: any, provider2: any);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di/opaque_token.d.ts
declare module 'core/src/core/di/opaque_token' {
/**
 * Creates a token that can be used in a DI Provider.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
 *
 * ```typescript
 * var t = new OpaqueToken("value");
 *
 * var injector = Injector.resolveAndCreate([
 *   provide(t, {useValue: "bindingValue"})
 * ]);
 *
 * expect(injector.get(t)).toEqual("bindingValue");
 * ```
 *
 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
 * caused by multiple providers using the same string as two different tokens.
 *
 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
 * error messages.
 */
export class OpaqueToken {
    private _desc;
    constructor(_desc: string);
    toString(): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/di.d.ts
declare module 'core/src/core/di' {
/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
export { InjectMetadata, OptionalMetadata, InjectableMetadata, SelfMetadata, HostMetadata, SkipSelfMetadata, DependencyMetadata } from 'core/src/core/di/metadata';
export * from 'core/src/core/di/decorators';
export { forwardRef, resolveForwardRef, ForwardRefFn } from 'core/src/core/di/forward_ref';
export { Injector } from 'core/src/core/di/injector';
export { Binding, ProviderBuilder, ResolvedBinding, ResolvedFactory, Dependency, bind, Provider, ResolvedProvider, provide } from 'core/src/core/di/provider';
export { Key } from 'core/src/core/di/key';
export { NoProviderError, AbstractProviderError, CyclicDependencyError, InstantiationError, InvalidProviderError, NoAnnotationError, OutOfBoundsError } from 'core/src/core/di/exceptions';
export { OpaqueToken } from 'core/src/core/di/opaque_token';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/facade/lang.d.ts
declare module 'core/src/facade/lang' {
export interface ZoneLike {
    fork(locals?: any): ZoneLike;
    run(fn: any, applyTo?: any, applyWith?: any): any;
}
export interface ZoneLikeConstructor {
    longStackTraceZone: {
        [key: string]: any;
    };
}
export interface BrowserNodeGlobal {
    Object: typeof Object;
    Array: typeof Array;
    Map: typeof Map;
    Set: typeof Set;
    Date: DateConstructor;
    RegExp: RegExpConstructor;
    JSON: typeof JSON;
    Math: any;
    assert(condition: any): void;
    Reflect: any;
    zone: ZoneLike;
    Zone: ZoneLikeConstructor;
    getAngularTestability: Function;
    getAllAngularTestabilities: Function;
    getAllAngularRootElements: Function;
    frameworkStabilizers: Array<Function>;
    setTimeout: Function;
    clearTimeout: Function;
    setInterval: Function;
    clearInterval: Function;
}
export const IS_DART: boolean;
var _global: BrowserNodeGlobal;
export { _global as global };
export var Type: FunctionConstructor;
/**
 * Runtime representation a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
 * the `MyCustomComponent` constructor function.
 */
export interface Type extends Function {
}
/**
 * Runtime representation of a type that is constructable (non-abstract).
 */
export interface ConcreteType extends Type {
    new (...args: any[]): any;
}
export function getTypeNameForDebugging(type: Type): string;
export var Math: any;
export var Date: DateConstructor;
export function lockMode(): void;
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 */
export function enableProdMode(): void;
export function assertionsEnabled(): boolean;
export function CONST_EXPR<T>(expr: T): T;
export function CONST(): ClassDecorator & PropertyDecorator;
export function isPresent(obj: any): boolean;
export function isBlank(obj: any): boolean;
export function isString(obj: any): boolean;
export function isFunction(obj: any): boolean;
export function isType(obj: any): boolean;
export function isStringMap(obj: any): boolean;
export function isPromise(obj: any): boolean;
export function isArray(obj: any): boolean;
export function isNumber(obj: any): boolean;
export function isDate(obj: any): boolean;
export function noop(): void;
export function stringify(token: any): string;
export function serializeEnum(val: any): number;
export function deserializeEnum(val: any, values: Map<number, any>): any;
export class StringWrapper {
    static fromCharCode(code: number): string;
    static charCodeAt(s: string, index: number): number;
    static split(s: string, regExp: RegExp): string[];
    static equals(s: string, s2: string): boolean;
    static stripLeft(s: string, charVal: string): string;
    static stripRight(s: string, charVal: string): string;
    static replace(s: string, from: string, replace: string): string;
    static replaceAll(s: string, from: RegExp, replace: string): string;
    static slice<T>(s: string, from?: number, to?: number): string;
    static replaceAllMapped(s: string, from: RegExp, cb: Function): string;
    static contains(s: string, substr: string): boolean;
    static compare(a: string, b: string): number;
}
export class StringJoiner {
    parts: any[];
    constructor(parts?: any[]);
    add(part: string): void;
    toString(): string;
}
export class NumberParseError extends Error {
    message: string;
    name: string;
    constructor(message: string);
    toString(): string;
}
export class NumberWrapper {
    static toFixed(n: number, fractionDigits: number): string;
    static equal(a: number, b: number): boolean;
    static parseIntAutoRadix(text: string): number;
    static parseInt(text: string, radix: number): number;
    static parseFloat(text: string): number;
    static NaN: number;
    static isNaN(value: any): boolean;
    static isInteger(value: any): boolean;
}
export var RegExp: RegExpConstructor;
export class RegExpWrapper {
    static create(regExpStr: string, flags?: string): RegExp;
    static firstMatch(regExp: RegExp, input: string): RegExpExecArray;
    static test(regExp: RegExp, input: string): boolean;
    static matcher(regExp: RegExp, input: string): {
        re: RegExp;
        input: string;
    };
}
export class RegExpMatcherWrapper {
    static next(matcher: {
        re: RegExp;
        input: string;
    }): RegExpExecArray;
}
export class FunctionWrapper {
    static apply(fn: Function, posArgs: any): any;
}
export function looseIdentical(a: any, b: any): boolean;
export function getMapKey<T>(value: T): T;
export function normalizeBlank(obj: Object): any;
export function normalizeBool(obj: boolean): boolean;
export function isJsObject(o: any): boolean;
export function print(obj: Error | Object): void;
export class Json {
    static parse(s: string): Object;
    static stringify(data: Object): string;
}
export class DateWrapper {
    static create(year: number, month?: number, day?: number, hour?: number, minutes?: number, seconds?: number, milliseconds?: number): Date;
    static fromISOString(str: string): Date;
    static fromMillis(ms: number): Date;
    static toMillis(date: Date): number;
    static now(): Date;
    static toJson(date: Date): string;
}
export function setValueOnPath(global: any, path: string, value: any): void;
export function getSymbolIterator(): string | symbol;
export function evalExpression(sourceUrl: string, expr: string, declarations: string, vars: {
    [key: string]: any;
}): any;
export function isPrimitive(obj: any): boolean;
export function hasConstructor(value: Object, type: Type): boolean;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/facade/async.d.ts
declare module 'core/src/facade/async' {
export { PromiseWrapper, PromiseCompleter } from 'angular2/src/facade/promise';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
export { Observable } from 'rxjs/Observable';
export { Subject } from 'rxjs/Subject';
export class TimerWrapper {
    static setTimeout(fn: (...args: any[]) => void, millis: number): number;
    static clearTimeout(id: number): void;
    static setInterval(fn: (...args: any[]) => void, millis: number): number;
    static clearInterval(id: number): void;
}
export class ObservableWrapper {
    static subscribe<T>(emitter: any, onNext: (value: T) => void, onError?: (exception: any) => void, onComplete?: () => void): Object;
    static isObservable(obs: any): boolean;
    /**
     * Returns whether `obs` has any subscribers listening to events.
     */
    static hasSubscribers(obs: EventEmitter<any>): boolean;
    static dispose(subscription: any): void;
    /**
     * @deprecated - use callEmit() instead
     */
    static callNext(emitter: EventEmitter<any>, value: any): void;
    static callEmit(emitter: EventEmitter<any>, value: any): void;
    static callError(emitter: EventEmitter<any>, error: any): void;
    static callComplete(emitter: EventEmitter<any>): void;
    static fromPromise(promise: Promise<any>): Observable<any>;
    static toPromise(obj: Observable<any>): Promise<any>;
}
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
export class EventEmitter<T> extends Subject<T> {
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    constructor(isAsync?: boolean);
    emit(value: T): void;
    /**
     * @deprecated - use .emit(value) instead
     */
    next(value: any): void;
    subscribe(generatorOrNext?: any, error?: any, complete?: any): any;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/facade/base_wrapped_exception.d.ts
declare module 'core/src/facade/base_wrapped_exception' {
/**
 * A base class for the WrappedException that can be used to identify
 * a WrappedException from ExceptionHandler without adding circular
 * dependency.
 */
export class BaseWrappedException extends Error {
    constructor(message: string);
    wrapperMessage: string;
    wrapperStack: any;
    originalException: any;
    originalStack: any;
    context: any;
    message: string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/facade/exceptions.d.ts
declare module 'core/src/facade/exceptions' {
import { BaseWrappedException } from 'core/src/facade/base_wrapped_exception';
export { ExceptionHandler } from 'core/src/facade/exception_handler';
export class BaseException extends Error {
    message: string;
    stack: any;
    constructor(message?: string);
    toString(): string;
}
/**
 * Wraps an exception and provides additional context or information.
 */
export class WrappedException extends BaseWrappedException {
    private _wrapperMessage;
    private _originalException;
    private _originalStack;
    private _context;
    private _wrapperStack;
    constructor(_wrapperMessage: string, _originalException: any, _originalStack?: any, _context?: any);
    wrapperMessage: string;
    wrapperStack: any;
    originalException: any;
    originalStack: any;
    context: any;
    message: string;
    toString(): string;
}
export function makeTypeError(message?: string): Error;
export function unimplemented(): any;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/facade/exception_handler.d.ts
declare module 'core/src/facade/exception_handler' {
/**
 * Provides a hook for centralized exception handling.
 *
 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
 * intercept error handling,
 * write a custom exception handler that replaces this default as appropriate for your app.
 *
 * ### Example
 *
 * ```javascript
 *
 * class MyExceptionHandler implements ExceptionHandler {
 *   call(error, stackTrace = null, reason = null) {
 *     // do something with the exception
 *   }
 * }
 *
 * bootstrap(MyApp, [provide(ExceptionHandler, {useClass: MyExceptionHandler})])
 *
 * ```
 */
export class ExceptionHandler {
    private _logger;
    private _rethrowException;
    constructor(_logger: any, _rethrowException?: boolean);
    static exceptionToString(exception: any, stackTrace?: any, reason?: string): string;
    call(exception: any, stackTrace?: any, reason?: string): void;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/facade/facade.d.ts
declare module 'core/src/facade/facade' {
export { ConcreteType, Type } from 'core/src/facade/lang';
export { EventEmitter } from 'core/src/facade/async';
export { WrappedException } from 'core/src/facade/exceptions';
export { ExceptionHandler } from 'core/src/facade/exception_handler';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/application_ref.d.ts
declare module 'core/src/core/application_ref' {
import { NgZone } from 'angular2/src/core/zone/ng_zone';
import { Type } from 'angular2/src/facade/lang';
import { Provider, Injector } from 'angular2/src/core/di';
import { ComponentRef } from 'angular2/src/core/linker/dynamic_component_loader';
import { ChangeDetectorRef } from 'angular2/src/core/change_detection/change_detector_ref';
/**
 * Create an Angular zone.
 */
export function createNgZone(): NgZone;
/**
 * Initialize the Angular 'platform' on the page.
 *
 * See {@link PlatformRef} for details on the Angular platform.
 *
 * It is also possible to specify providers to be made in the new platform. These providers
 * will be shared between all applications on the page. For example, an abstraction for
 * the browser cookie jar should be bound at the platform level, because there is only one
 * cookie jar regardless of how many applications on the page will be accessing it.
 *
 * The platform function can be called multiple times as long as the same list of providers
 * is passed into each call. If the platform function is called with a different set of
 * provides, Angular will throw an exception.
 */
export function platform(providers?: Array<Type | Provider | any[]>): PlatformRef;
/**
 * Dispose the existing platform.
 */
export function disposePlatform(): void;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link platform}().
 */
export abstract class PlatformRef {
    /**
     * Register a listener to be called when the platform is disposed.
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Retrieve the platform {@link Injector}, which is the parent injector for
     * every Angular application on the page and provides singleton providers.
     */
    injector: Injector;
    /**
     * Instantiate a new Angular application on the page.
     *
     * ### What is an application?
     *
     * Each Angular application has its own zone, change detection, compiler,
     * renderer, and other framework components. An application hosts one or more
     * root components, which can be initialized via `ApplicationRef.bootstrap()`.
     *
     * ### Application Providers
     *
     * Angular applications require numerous providers to be properly instantiated.
     * When using `application()` to create a new app on the page, these providers
     * must be provided. Fortunately, there are helper functions to configure
     * typical providers, as shown in the example below.
     *
     * ### Example
     *
     * {@example core/ts/platform/platform.ts region='longform'}
     * ### See Also
     *
     * See the {@link bootstrap} documentation for more details.
     */
    abstract application(providers: Array<Type | Provider | any[]>): ApplicationRef;
    /**
     * Instantiate a new Angular application on the page, using providers which
     * are only available asynchronously. One such use case is to initialize an
     * application running in a web worker.
     *
     * ### Usage
     *
     * `bindingFn` is a function that will be called in the new application's zone.
     * It should return a `Promise` to a list of providers to be used for the
     * new application. Once this promise resolves, the application will be
     * constructed in the same manner as a normal `application()`.
     */
    abstract asyncApplication(bindingFn: (zone: NgZone) => Promise<Array<Type | Provider | any[]>>, providers?: Array<Type | Provider | any[]>): Promise<ApplicationRef>;
    /**
     * Destroy the Angular platform and all Angular applications on the page.
     */
    abstract dispose(): void;
}
export class PlatformRef_ extends PlatformRef {
    private _injector;
    private _dispose;
    constructor(_injector: Injector, _dispose: () => void);
    registerDisposeListener(dispose: () => void): void;
    injector: Injector;
    application(providers: Array<Type | Provider | any[]>): ApplicationRef;
    asyncApplication(bindingFn: (zone: NgZone) => Promise<Array<Type | Provider | any[]>>, additionalProviders?: Array<Type | Provider | any[]>): Promise<ApplicationRef>;
    private _initApp(zone, providers);
    dispose(): void;
}
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 */
export abstract class ApplicationRef {
    /**
     * Register a listener to be called each time `bootstrap()` is called to bootstrap
     * a new root component.
     */
    abstract registerBootstrapListener(listener: (ref: ComponentRef) => void): void;
    /**
     * Register a listener to be called when the application is disposed.
     */
    abstract registerDisposeListener(dispose: () => void): void;
    /**
     * Bootstrap a new component at the root level of the application.
     *
     * ### Bootstrap process
     *
     * When bootstrapping a new root component into an application, Angular mounts the
     * specified application component onto DOM elements identified by the [componentType]'s
     * selector and kicks off automatic change detection to finish initializing the component.
     *
     * ### Optional Providers
     *
     * Providers for the given component can optionally be overridden via the `providers`
     * parameter. These providers will only apply for the root component being added and any
     * child components under it.
     *
     * ### Example
     * {@example core/ts/platform/platform.ts region='longform'}
     */
    abstract bootstrap(componentType: Type, providers?: Array<Type | Provider | any[]>): Promise<ComponentRef>;
    /**
     * Retrieve the application {@link Injector}.
     */
    injector: Injector;
    /**
     * Retrieve the application {@link NgZone}.
     */
    zone: NgZone;
    /**
     * Dispose of this application and all of its components.
     */
    abstract dispose(): void;
    /**
     * Invoke this method to explicitly process change detection and its side-effects.
     *
     * In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further changes are detected. If additional changes are picked up during this second cycle,
     * bindings in the app have side-effects that cannot be resolved in a single change detection
     * pass.
     * In this case, Angular throws an error, since an Angular application can only have one change
     * detection pass during which all change detection must complete.
     */
    abstract tick(): void;
    /**
     * Get a list of component types registered to this application.
     */
    componentTypes: Type[];
}
export class ApplicationRef_ extends ApplicationRef {
    private _platform;
    private _zone;
    private _injector;
    constructor(_platform: PlatformRef_, _zone: NgZone, _injector: Injector);
    registerBootstrapListener(listener: (ref: ComponentRef) => void): void;
    registerDisposeListener(dispose: () => void): void;
    registerChangeDetector(changeDetector: ChangeDetectorRef): void;
    unregisterChangeDetector(changeDetector: ChangeDetectorRef): void;
    bootstrap(componentType: Type, providers?: Array<Type | Provider | any[]>): Promise<ComponentRef>;
    injector: Injector;
    zone: NgZone;
    tick(): void;
    dispose(): void;
    componentTypes: Type[];
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/application_tokens.d.ts
declare module 'core/src/core/application_tokens' {
import { OpaqueToken, Provider } from 'angular2/src/core/di';
/**
 * An {@link angular2/di/OpaqueToken} representing the application root type in the {@link
 * Injector}.
 *
 * ```
 * @Component(...)
 * class MyApp {
 *   ...
 * }
 *
 * bootstrap(MyApp).then((appRef:ApplicationRef) {
 *   expect(appRef.injector.get(appComponentTypeToken)).toEqual(MyApp);
 * });
 *
 * ```
 */
export const APP_COMPONENT: OpaqueToken;
/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 */
export const APP_ID: OpaqueToken;
/**
 * Providers that will generate a random APP_ID_TOKEN.
 */
export const APP_ID_RANDOM_PROVIDER: Provider;
/**
 * A function that will be executed when a platform is initialized.
 */
export const PLATFORM_INITIALIZER: OpaqueToken;
/**
 * A function that will be executed when an application is initialized.
 */
export const APP_INITIALIZER: OpaqueToken;
/**
 * A token which indicates the root directory of the application
 */
export const PACKAGE_ROOT_URL: OpaqueToken;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/zone/ng_zone.d.ts
declare module 'core/src/core/zone/ng_zone' {
import { ZoneLike } from 'angular2/src/facade/lang';
import { EventEmitter } from 'angular2/src/facade/async';
export interface NgZoneZone extends ZoneLike {
}
/**
 * Interface for a function with zero arguments.
 */
export interface ZeroArgFunction {
    (): void;
}
/**
 * Function type for an error handler, which takes an error and a stack trace.
 */
export interface ErrorHandlingFn {
    (error: any, stackTrace: any): void;
}
/**
 * Stores error information; delivered via [NgZone.onError] stream.
 */
export class NgZoneError {
    error: any;
    stackTrace: any;
    constructor(error: any, stackTrace: any);
}
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
 * ```
 * import {Component, View, NgZone} from 'angular2/core';
 * import {NgIf} from 'angular2/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo'.
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 *   directives: [NgIf]
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *       // reenter the Angular zone and display done
 *       this._ngZone.run(() => {console.log('Outside Done!') });
 *     }}));
 *   }
 *
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 */
export class NgZone {
    /**
     * @param {bool} enableLongStackTrace whether to enable long stack trace. They should only be
     *               enabled in development mode as they significantly impact perf.
     */
    constructor({enableLongStackTrace}: {
        enableLongStackTrace: any;
    });
    /**
     * Sets the zone hook that is called just before a browser task that is handled by Angular
     * executes.
     *
     * The hook is called once per browser task that is handled by Angular.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onTurnStart` instead.
     */
    overrideOnTurnStart(onTurnStartHook: ZeroArgFunction): void;
    /**
     * Notifies subscribers just before Angular event turn starts.
     *
     * Emits an event once per browser task that is handled by Angular.
     */
    onTurnStart: any;
    /**
     * Sets the zone hook that is called immediately after Angular zone is done processing the current
     * task and any microtasks scheduled from that task.
     *
     * This is where we typically do change-detection.
     *
     * The hook is called once per browser task that is handled by Angular.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onTurnDone` instead.
     */
    overrideOnTurnDone(onTurnDoneHook: ZeroArgFunction): void;
    /**
     * Notifies subscribers immediately after Angular zone is done processing
     * the current turn and any microtasks scheduled from that turn.
     *
     * Used by Angular as a signal to kick off change-detection.
     */
    onTurnDone: EventEmitter<any>;
    /**
     * Sets the zone hook that is called immediately after the `onTurnDone` callback is called and any
     * microstasks scheduled from within that callback are drained.
     *
     * `onEventDoneFn` is executed outside Angular zone, which means that we will no longer attempt to
     * sync the UI with any model changes that occur within this callback.
     *
     * This hook is useful for validating application state (e.g. in a test).
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onEventDone` instead.
     */
    overrideOnEventDone(onEventDoneFn: ZeroArgFunction, opt_waitForAsync?: boolean): void;
    /**
     * Notifies subscribers immediately after the final `onTurnDone` callback
     * before ending VM event.
     *
     * This event is useful for validating application state (e.g. in a test).
     */
    onEventDone: EventEmitter<any>;
    /**
     * Whether there are any outstanding microtasks.
     */
    hasPendingMicrotasks: boolean;
    /**
     * Whether there are any outstanding timers.
     */
    hasPendingTimers: boolean;
    /**
     * Whether there are any outstanding asynchronous tasks of any kind that are
     * scheduled to run within Angular zone.
     *
     * Useful as a signal of UI stability. For example, when a test reaches a
     * point when [hasPendingAsyncTasks] is `false` it might be a good time to run
     * test expectations.
     */
    hasPendingAsyncTasks: boolean;
    /**
     * Sets the zone hook that is called when an error is thrown in the Angular zone.
     *
     * Setting the hook overrides any previously set hook.
     *
     * @deprecated this API will be removed in the future. Use `onError` instead.
     */
    overrideOnErrorHandler(errorHandler: ErrorHandlingFn): void;
    onError: EventEmitter<any>;
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     */
    run(fn: () => any): any;
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    runOutsideAngular(fn: () => any): any;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/zone.d.ts
declare module 'core/src/core/zone' {
export { NgZone, ZeroArgFunction, ErrorHandlingFn, NgZoneError } from 'core/src/core/zone/ng_zone';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/render/api.d.ts
declare module 'core/src/core/render/api' {
import { ViewEncapsulation } from 'angular2/src/core/metadata/view';
import { Injector } from 'angular2/src/core/di';
export class RenderComponentType {
    id: string;
    encapsulation: ViewEncapsulation;
    styles: Array<string | any[]>;
    constructor(id: string, encapsulation: ViewEncapsulation, styles: Array<string | any[]>);
}
export class RenderDebugInfo {
    injector: Injector;
    component: any;
    providerTokens: any[];
    locals: Map<string, any>;
    constructor(injector: Injector, component: any, providerTokens: any[], locals: Map<string, any>);
}
export interface ParentRenderer {
    renderComponent(componentType: RenderComponentType): Renderer;
}
export abstract class Renderer implements ParentRenderer {
    abstract renderComponent(componentType: RenderComponentType): Renderer;
    abstract selectRootElement(selector: string): any;
    abstract createElement(parentElement: any, name: string): any;
    abstract createViewRoot(hostElement: any): any;
    abstract createTemplateAnchor(parentElement: any): any;
    abstract createText(parentElement: any, value: string): any;
    abstract projectNodes(parentElement: any, nodes: any[]): any;
    abstract attachViewAfter(node: any, viewRootNodes: any[]): any;
    abstract detachView(viewRootNodes: any[]): any;
    abstract destroyView(hostElement: any, viewAllNodes: any[]): any;
    abstract listen(renderElement: any, name: string, callback: Function): Function;
    abstract listenGlobal(target: string, name: string, callback: Function): Function;
    abstract setElementProperty(renderElement: any, propertyName: string, propertyValue: any): any;
    abstract setElementAttribute(renderElement: any, attributeName: string, attributeValue: string): any;
    /**
     * Used only in debug mode to serialize property changes to comment nodes,
     * such as <template> placeholders.
     */
    abstract setBindingDebugInfo(renderElement: any, propertyName: string, propertyValue: string): any;
    abstract setElementDebugInfo(renderElement: any, info: RenderDebugInfo): any;
    abstract setElementClass(renderElement: any, className: string, isAdd: boolean): any;
    abstract setElementStyle(renderElement: any, styleName: string, styleValue: string): any;
    abstract invokeElementMethod(renderElement: any, methodName: string, args: any[]): any;
    abstract setText(renderNode: any, text: string): any;
}
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 */
export abstract class RootRenderer implements ParentRenderer {
    abstract renderComponent(componentType: RenderComponentType): Renderer;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/render.d.ts
declare module 'core/src/core/render' {
export { RootRenderer, Renderer, RenderComponentType } from 'core/src/core/render/api';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/interfaces.d.ts
declare module 'core/src/core/linker/interfaces' {
import { SimpleChange } from 'angular2/src/core/change_detection/change_detection_util';
export enum LifecycleHooks {
    OnInit = 0,
    OnDestroy = 1,
    DoCheck = 2,
    OnChanges = 3,
    AfterContentInit = 4,
    AfterContentChecked = 5,
    AfterViewInit = 6,
    AfterViewChecked = 7,
}
/**
 * Lifecycle hooks are guaranteed to be called in the following order:
 * - `OnChanges` (if any bindings have changed),
 * - `OnInit` (after the first check only),
 * - `DoCheck`,
 * - `AfterContentInit`,
 * - `AfterContentChecked`,
 * - `AfterViewInit`,
 * - `AfterViewChecked`,
 * - `OnDestroy` (at the very end before destruction)
 */
/**
 * Implement this interface to get notified when any data-bound property of your directive changes.
 *
 * `ngOnChanges` is called right after the data-bound properties have been checked and before view
 * and content children are checked if at least one of them has changed.
 *
 * The `changes` parameter contains an entry for each of the changed data-bound property. The key is
 * the property name and the value is an instance of {@link SimpleChange}.
 *
 * ### Example ([live example](http://plnkr.co/edit/AHrB6opLqHDBPkt4KpdT?p=preview)):
 *
 * ```typescript
 * @Component({
 *   selector: 'my-cmp',
 *   template: `<p>myProp = {{myProp}}</p>`
 * })
 * class MyComponent implements OnChanges {
 *   @Input() myProp: any;
 *
 *   ngOnChanges(changes: {[propName: string]: SimpleChange}) {
 *     console.log('ngOnChanges - myProp = ' + changes['myProp'].currentValue);
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <button (click)="value = value + 1">Change MyComponent</button>
 *     <my-cmp [my-prop]="value"></my-cmp>`,
 *   directives: [MyComponent]
 * })
 * export class App {
 *   value = 0;
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 * ```
 */
export interface OnChanges {
    ngOnChanges(changes: {
        [key: string]: SimpleChange;
    }): any;
}
/**
 * Implement this interface to execute custom initialization logic after your directive's
 * data-bound properties have been initialized.
 *
 * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
 * first time, and before any of its children have been checked. It is invoked only once when the
 * directive is instantiated.
 *
 * ### Example ([live example](http://plnkr.co/edit/1MBypRryXd64v4pV03Yn?p=preview))
 *
 * ```typescript
 * @Component({
 *   selector: 'my-cmp',
 *   template: `<p>my-component</p>`
 * })
 * class MyComponent implements OnInit, OnDestroy {
 *   ngOnInit() {
 *     console.log('ngOnInit');
 *   }
 *
 *   ngOnDestroy() {
 *     console.log('ngOnDestroy');
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <button (click)="hasChild = !hasChild">
 *       {{hasChild ? 'Destroy' : 'Create'}} MyComponent
 *     </button>
 *     <my-cmp *ngIf="hasChild"></my-cmp>`,
 *   directives: [MyComponent, NgIf]
 * })
 * export class App {
 *   hasChild = true;
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 *  ```
 */
export interface OnInit {
    ngOnInit(): any;
}
/**
 * Implement this interface to override the default change detection algorithm for your directive.
 *
 * `ngDoCheck` gets called to check the changes in the directives instead of the default algorithm.
 *
 * The default change detection algorithm looks for differences by comparing bound-property values
 * by reference across change detection runs. When `DoCheck` is implemented, the default algorithm
 * is disabled and `ngDoCheck` is responsible for checking for changes.
 *
 * Implementing this interface allows improving performance by using insights about the component,
 * its implementation and data types of its properties.
 *
 * Note that a directive should not implement both `DoCheck` and {@link OnChanges} at the same time.
 * `ngOnChanges` would not be called when a directive implements `DoCheck`. Reaction to the changes
 * have to be handled from within the `ngDoCheck` callback.
 *
 * Use {@link KeyValueDiffers} and {@link IterableDiffers} to add your custom check mechanisms.
 *
 * ### Example ([live demo](http://plnkr.co/edit/QpnIlF0CR2i5bcYbHEUJ?p=preview))
 *
 * In the following example `ngDoCheck` uses an {@link IterableDiffers} to detect the updates to the
 * array `list`:
 *
 * ```typescript
 * @Component({
 *   selector: 'custom-check',
 *   template: `
 *     <p>Changes:</p>
 *     <ul>
 *       <li *ngFor="#line of logs">{{line}}</li>
 *     </ul>`,
 *   directives: [NgFor]
 * })
 * class CustomCheckComponent implements DoCheck {
 *   @Input() list: any[];
 *   differ: any;
 *   logs = [];
 *
 *   constructor(differs: IterableDiffers) {
 *     this.differ = differs.find([]).create(null);
 *   }
 *
 *   ngDoCheck() {
 *     var changes = this.differ.diff(this.list);
 *
 *     if (changes) {
 *       changes.forEachAddedItem(r => this.logs.push('added ' + r.item));
 *       changes.forEachRemovedItem(r => this.logs.push('removed ' + r.item))
 *     }
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <button (click)="list.push(list.length)">Push</button>
 *     <button (click)="list.pop()">Pop</button>
 *     <custom-check [list]="list"></custom-check>`,
 *   directives: [CustomCheckComponent]
 * })
 * export class App {
 *   list = [];
 * }
 * ```
 */
export interface DoCheck {
    ngDoCheck(): any;
}
/**
 * Implement this interface to get notified when your directive is destroyed.
 *
 * `ngOnDestroy` callback is typically used for any custom cleanup that needs to occur when the
 * instance is destroyed
 *
 * ### Example ([live example](http://plnkr.co/edit/1MBypRryXd64v4pV03Yn?p=preview))
 *
 * ```typesript
 * @Component({
 *   selector: 'my-cmp',
 *   template: `<p>my-component</p>`
 * })
 * class MyComponent implements OnInit, OnDestroy {
 *   ngOnInit() {
 *     console.log('ngOnInit');
 *   }
 *
 *   ngOnDestroy() {
 *     console.log('ngOnDestroy');
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <button (click)="hasChild = !hasChild">
 *       {{hasChild ? 'Destroy' : 'Create'}} MyComponent
 *     </button>
 *     <my-cmp *ngIf="hasChild"></my-cmp>`,
 *   directives: [MyComponent, NgIf]
 * })
 * export class App {
 *   hasChild = true;
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 * ```
 *
 *
 * To create a stateful Pipe, you should implement this interface and set the `pure`
 * parameter to `false` in the {@link PipeMetadata}.
 *
 * A stateful pipe may produce different output, given the same input. It is
 * likely that a stateful pipe may contain state that should be cleaned up when
 * a binding is destroyed. For example, a subscription to a stream of data may need to
 * be disposed, or an interval may need to be cleared.
 *
 * ### Example ([live demo](http://plnkr.co/edit/i8pm5brO4sPaLxBx56MR?p=preview))
 *
 * In this example, a pipe is created to countdown its input value, updating it every
 * 50ms. Because it maintains an internal interval, it automatically clears
 * the interval when the binding is destroyed or the countdown completes.
 *
 * ```
 * import {OnDestroy, Pipe, PipeTransform} from 'angular2/core'
 * @Pipe({name: 'countdown', pure: false})
 * class CountDown implements PipeTransform, OnDestroy {
 *   remainingTime:Number;
 *   interval:SetInterval;
 *   ngOnDestroy() {
 *     if (this.interval) {
 *       clearInterval(this.interval);
 *     }
 *   }
 *   transform(value: any, args: any[] = []) {
 *     if (!parseInt(value, 10)) return null;
 *     if (typeof this.remainingTime !== 'number') {
 *       this.remainingTime = parseInt(value, 10);
 *     }
 *     if (!this.interval) {
 *       this.interval = setInterval(() => {
 *         this.remainingTime-=50;
 *         if (this.remainingTime <= 0) {
 *           this.remainingTime = 0;
 *           clearInterval(this.interval);
 *           delete this.interval;
 *         }
 *       }, 50);
 *     }
 *     return this.remainingTime;
 *   }
 * }
 * ```
 *
 * Invoking `{{ 10000 | countdown }}` would cause the value to be decremented by 50,
 * every 50ms, until it reaches 0.
 *
 */
export interface OnDestroy {
    ngOnDestroy(): any;
}
/**
 * Implement this interface to get notified when your directive's content has been fully
 * initialized.
 *
 * ### Example ([live demo](http://plnkr.co/edit/plamXUpsLQbIXpViZhUO?p=preview))
 *
 * ```typescript
 * @Component({
 *   selector: 'child-cmp',
 *   template: `{{where}} child`
 * })
 * class ChildComponent {
 *   @Input() where: string;
 * }
 *
 * @Component({
 *   selector: 'parent-cmp',
 *   template: `<ng-content></ng-content>`
 * })
 * class ParentComponent implements AfterContentInit {
 *   @ContentChild(ChildComponent) contentChild: ChildComponent;
 *
 *   constructor() {
 *     // contentChild is not initialized yet
 *     console.log(this.getMessage(this.contentChild));
 *   }
 *
 *   ngAfterContentInit() {
 *     // contentChild is updated after the content has been checked
 *     console.log('AfterContentInit: ' + this.getMessage(this.contentChild));
 *   }
 *
 *   private getMessage(cmp: ChildComponent): string {
 *     return cmp ? cmp.where + ' child' : 'no child';
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <parent-cmp>
 *       <child-cmp where="content"></child-cmp>
 *     </parent-cmp>`,
 *   directives: [ParentComponent, ChildComponent]
 * })
 * export class App {
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 * ```
 */
export interface AfterContentInit {
    ngAfterContentInit(): any;
}
/**
 * Implement this interface to get notified after every check of your directive's content.
 *
 * ### Example ([live demo](http://plnkr.co/edit/tGdrytNEKQnecIPkD7NU?p=preview))
 *
 * ```typescript
 * @Component({selector: 'child-cmp', template: `{{where}} child`})
 * class ChildComponent {
 *   @Input() where: string;
 * }
 *
 * @Component({selector: 'parent-cmp', template: `<ng-content></ng-content>`})
 * class ParentComponent implements AfterContentChecked {
 *   @ContentChild(ChildComponent) contentChild: ChildComponent;
 *
 *   constructor() {
 *     // contentChild is not initialized yet
 *     console.log(this.getMessage(this.contentChild));
 *   }
 *
 *   ngAfterContentChecked() {
 *     // contentChild is updated after the content has been checked
 *     console.log('AfterContentChecked: ' + this.getMessage(this.contentChild));
 *   }
 *
 *   private getMessage(cmp: ChildComponent): string {
 *     return cmp ? cmp.where + ' child' : 'no child';
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <parent-cmp>
 *       <button (click)="hasContent = !hasContent">Toggle content child</button>
 *       <child-cmp *ngIf="hasContent" where="content"></child-cmp>
 *     </parent-cmp>`,
 *   directives: [NgIf, ParentComponent, ChildComponent]
 * })
 * export class App {
 *   hasContent = true;
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 * ```
 */
export interface AfterContentChecked {
    ngAfterContentChecked(): any;
}
/**
 * Implement this interface to get notified when your component's view has been fully initialized.
 *
 * ### Example ([live demo](http://plnkr.co/edit/LhTKVMEM0fkJgyp4CI1W?p=preview))
 *
 * ```typescript
 * @Component({selector: 'child-cmp', template: `{{where}} child`})
 * class ChildComponent {
 *   @Input() where: string;
 * }
 *
 * @Component({
 *   selector: 'parent-cmp',
 *   template: `<child-cmp where="view"></child-cmp>`,
 *   directives: [ChildComponent]
 * })
 * class ParentComponent implements AfterViewInit {
 *   @ViewChild(ChildComponent) viewChild: ChildComponent;
 *
 *   constructor() {
 *     // viewChild is not initialized yet
 *     console.log(this.getMessage(this.viewChild));
 *   }
 *
 *   ngAfterViewInit() {
 *     // viewChild is updated after the view has been initialized
 *     console.log('ngAfterViewInit: ' + this.getMessage(this.viewChild));
 *   }
 *
 *   private getMessage(cmp: ChildComponent): string {
 *     return cmp ? cmp.where + ' child' : 'no child';
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<parent-cmp></parent-cmp>`,
 *   directives: [ParentComponent]
 * })
 * export class App {
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 * ```
 */
export interface AfterViewInit {
    ngAfterViewInit(): any;
}
/**
 * Implement this interface to get notified after every check of your component's view.
 *
 * ### Example ([live demo](http://plnkr.co/edit/0qDGHcPQkc25CXhTNzKU?p=preview))
 *
 * ```typescript
 * @Component({selector: 'child-cmp', template: `{{where}} child`})
 * class ChildComponent {
 *   @Input() where: string;
 * }
 *
 * @Component({
 *   selector: 'parent-cmp',
 *   template: `
 *     <button (click)="showView = !showView">Toggle view child</button>
 *     <child-cmp *ngIf="showView" where="view"></child-cmp>`,
 *   directives: [NgIf, ChildComponent]
 * })
 * class ParentComponent implements AfterViewChecked {
 *   @ViewChild(ChildComponent) viewChild: ChildComponent;
 *   showView = true;
 *
 *   constructor() {
 *     // viewChild is not initialized yet
 *     console.log(this.getMessage(this.viewChild));
 *   }
 *
 *   ngAfterViewChecked() {
 *     // viewChild is updated after the view has been checked
 *     console.log('AfterViewChecked: ' + this.getMessage(this.viewChild));
 *   }
 *
 *   private getMessage(cmp: ChildComponent): string {
 *     return cmp ? cmp.where + ' child' : 'no child';
 *   }
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `<parent-cmp></parent-cmp>`,
 *   directives: [ParentComponent]
 * })
 * export class App {
 * }
 *
 * bootstrap(App).catch(err => console.error(err));
 * ```
 */
export interface AfterViewChecked {
    ngAfterViewChecked(): any;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/directive_resolver.d.ts
declare module 'core/src/core/linker/directive_resolver' {
import { Type } from 'angular2/src/facade/lang';
import { DirectiveMetadata } from 'angular2/src/core/metadata';
export class DirectiveResolver {
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    resolve(type: Type): DirectiveMetadata;
    private _mergeWithPropertyMetadata(dm, propertyMetadata, directiveType);
    private _merge(dm, inputs, outputs, host, queries, directiveType);
}
export var CODEGEN_DIRECTIVE_RESOLVER: DirectiveResolver;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/view_resolver.d.ts
declare module 'core/src/core/linker/view_resolver' {
import { ViewMetadata } from 'core/src/core/metadata/view';
import { Type } from 'angular2/src/facade/lang';
/**
 * Resolves types to {@link ViewMetadata}.
 */
export class ViewResolver {
    resolve(component: Type): ViewMetadata;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/compiler.d.ts
declare module 'core/src/core/linker/compiler' {
import { HostViewFactoryRef } from 'angular2/src/core/linker/view_ref';
import { Type } from 'angular2/src/facade/lang';
import { HostViewFactoryRef_ } from 'angular2/src/core/linker/view_ref';
/**
 * Low-level service for compiling {@link Component}s into {@link ProtoViewRef ProtoViews}s, which
 * can later be used to create and render a Component instance.
 *
 * Most applications should instead use higher-level {@link DynamicComponentLoader} service, which
 * both compiles and instantiates a Component.
 */
export abstract class Compiler {
    abstract compileInHost(componentType: Type): Promise<HostViewFactoryRef>;
    abstract clearCache(): any;
}
export class Compiler_ extends Compiler {
    compileInHost(componentType: Type): Promise<HostViewFactoryRef_>;
    clearCache(): void;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/view_manager.d.ts
declare module 'core/src/core/linker/view_manager' {
import { Injector, ResolvedProvider } from 'angular2/src/core/di';
import { ElementRef } from 'core/src/core/linker/element_ref';
import { HostViewFactoryRef, EmbeddedViewRef, HostViewRef, ViewRef } from 'core/src/core/linker/view_ref';
import { ViewContainerRef } from 'core/src/core/linker/view_container_ref';
import { TemplateRef } from 'core/src/core/linker/template_ref';
import { RootRenderer } from 'angular2/src/core/render/api';
/**
 * Service exposing low level API for creating, moving and destroying Views.
 *
 * Most applications should use higher-level abstractions like {@link DynamicComponentLoader} and
 * {@link ViewContainerRef} instead.
 */
export abstract class AppViewManager {
    /**
     * Returns a {@link ViewContainerRef} of the View Container at the specified location.
     */
    abstract getViewContainer(location: ElementRef): ViewContainerRef;
    /**
     * Returns the {@link ElementRef} that makes up the specified Host View.
     */
    abstract getHostElement(hostViewRef: HostViewRef): ElementRef;
    /**
     * Searches the Component View of the Component specified via `hostLocation` and returns the
     * {@link ElementRef} for the Element identified via a Variable Name `variableName`.
     *
     * Throws an exception if the specified `hostLocation` is not a Host Element of a Component, or if
     * variable `variableName` couldn't be found in the Component View of this Component.
     */
    abstract getNamedElementInComponentView(hostLocation: ElementRef, variableName: string): ElementRef;
    /**
     * Returns the component instance for the provided Host Element.
     */
    abstract getComponent(hostLocation: ElementRef): any;
    /**
     * Creates an instance of a Component and attaches it to the first element in the global View
     * (usually DOM Document) that matches the component's selector or `overrideSelector`.
     *
     * This as a low-level way to bootstrap an application and upgrade an existing Element to a
     * Host Element. Most applications should use {@link DynamicComponentLoader#loadAsRoot} instead.
     *
     * The Component and its View are created based on the `hostProtoComponentRef` which can be
     * obtained
     * by compiling the component with {@link Compiler#compileInHost}.
     *
     * Use {@link AppViewManager#destroyRootHostView} to destroy the created Component and it's Host
     * View.
     *
     * ### Example
     *
     * ```
     * @ng.Component({
     *   selector: 'child-component'
     * })
     * @ng.View({
     *   template: 'Child'
     * })
     * class ChildComponent {
     *
     * }
     *
     * @ng.Component({
     *   selector: 'my-app'
     * })
     * @ng.View({
     *   template: `
     *     Parent (<some-component></some-component>)
     *   `
     * })
     * class MyApp implements OnDestroy {
     *   viewRef: ng.ViewRef;
     *
     *   constructor(public appViewManager: ng.AppViewManager, compiler: ng.Compiler) {
     *     compiler.compileInHost(ChildComponent).then((protoView: ng.ProtoComponentRef) => {
     *       this.viewRef = appViewManager.createRootHostView(protoView, 'some-component', null);
     *     })
     *   }
     *
     *   ngOnDestroy() {
     *     this.appViewManager.destroyRootHostView(this.viewRef);
     *     this.viewRef = null;
     *   }
     * }
     *
     * ng.bootstrap(MyApp);
     * ```
     */
    abstract createRootHostView(hostViewFactoryRef: HostViewFactoryRef, overrideSelector: string, injector: Injector, projectableNodes?: any[][]): HostViewRef;
    /**
     * Destroys the Host View created via {@link AppViewManager#createRootHostView}.
     *
     * Along with the Host View, the Component Instance as well as all nested View and Components are
     * destroyed as well.
     */
    abstract destroyRootHostView(hostViewRef: HostViewRef): any;
    /**
     * Instantiates an Embedded View based on the {@link TemplateRef `templateRef`} and inserts it
     * into the View Container specified via `viewContainerLocation` at the specified `index`.
     *
     * Returns the {@link ViewRef} for the newly created View.
     *
     * This as a low-level way to create and attach an Embedded via to a View Container. Most
     * applications should used {@link ViewContainerRef#createEmbeddedView} instead.
     *
     * Use {@link AppViewManager#destroyViewInContainer} to destroy the created Embedded View.
     */
    abstract createEmbeddedViewInContainer(viewContainerLocation: ElementRef, index: number, templateRef: TemplateRef): EmbeddedViewRef;
    /**
     * Instantiates a single {@link Component} and inserts its Host View into the View Container
     * found at `viewContainerLocation`. Within the container, the view will be inserted at position
     * specified via `index`.
     *
     * The component is instantiated using its {@link ProtoViewRef `protoViewRef`} which can be
     * obtained via {@link Compiler#compileInHost}.
     *
     * You can optionally specify `dynamicallyCreatedProviders`, which configure the {@link Injector}
     * that will be created for the Host View.
     *
     * Returns the {@link HostViewRef} of the Host View created for the newly instantiated Component.
     *
     * Use {@link AppViewManager#destroyViewInContainer} to destroy the created Host View.
     */
    abstract createHostViewInContainer(viewContainerLocation: ElementRef, index: number, hostViewFactoryRef: HostViewFactoryRef, dynamicallyCreatedProviders: ResolvedProvider[], projectableNodes: any[][]): HostViewRef;
    /**
     * Destroys an Embedded or Host View attached to a View Container at the specified `index`.
     *
     * The View Container is located via `viewContainerLocation`.
     */
    abstract destroyViewInContainer(viewContainerLocation: ElementRef, index: number): any;
    /**
     *
     * See {@link AppViewManager#detachViewInContainer}.
     */
    abstract attachViewInContainer(viewContainerLocation: ElementRef, index: number, viewRef: EmbeddedViewRef): EmbeddedViewRef;
    /**
     * See {@link AppViewManager#attachViewInContainer}.
     */
    abstract detachViewInContainer(viewContainerLocation: ElementRef, index: number): EmbeddedViewRef;
}
export class AppViewManager_ extends AppViewManager {
    private _renderer;
    private _appId;
    private _nextCompTypeId;
    constructor(_renderer: RootRenderer, _appId: string);
    getViewContainer(location: ElementRef): ViewContainerRef;
    getHostElement(hostViewRef: ViewRef): ElementRef;
    getNamedElementInComponentView(hostLocation: ElementRef, variableName: string): ElementRef;
    getComponent(hostLocation: ElementRef): any;
    createRootHostView(hostViewFactoryRef: HostViewFactoryRef, overrideSelector: string, injector: Injector, projectableNodes?: any[][]): HostViewRef;
    destroyRootHostView(hostViewRef: ViewRef): void;
    createEmbeddedViewInContainer(viewContainerLocation: ElementRef, index: number, templateRef: TemplateRef): EmbeddedViewRef;
    createHostViewInContainer(viewContainerLocation: ElementRef, index: number, hostViewFactoryRef: HostViewFactoryRef, dynamicallyCreatedProviders: ResolvedProvider[], projectableNodes: any[][]): HostViewRef;
    destroyViewInContainer(viewContainerLocation: ElementRef, index: number): void;
    attachViewInContainer(viewContainerLocation: ElementRef, index: number, viewRef: ViewRef): EmbeddedViewRef;
    detachViewInContainer(viewContainerLocation: ElementRef, index: number): EmbeddedViewRef;
    private _attachViewToContainer(view, vcAppElement, viewIndex);
    private _detachViewInContainer(vcAppElement, viewIndex);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/query_list.d.ts
declare module 'core/src/core/linker/query_list' {
import { Observable } from 'angular2/src/facade/async';
/**
 * An unmodifiable list of items that Angular keeps up to date when the state
 * of the application changes.
 *
 * The type of object that {@link QueryMetadata} and {@link ViewQueryMetadata} provide.
 *
 * Implements an iterable interface, therefore it can be used in both ES6
 * javascript `for (var i of items)` loops as well as in Angular templates with
 * `*ngFor="#i of myList"`.
 *
 * Changes can be observed by subscribing to the changes `Observable`.
 *
 * NOTE: In the future this class will implement an `Observable` interface.
 *
 * ### Example ([live demo](http://plnkr.co/edit/RX8sJnQYl9FWuSCWme5z?p=preview))
 * ```typescript
 * @Component({...})
 * class Container {
 *   constructor(@Query(Item) items: QueryList<Item>) {
 *     items.changes.subscribe(_ => console.log(items.length));
 *   }
 * }
 * ```
 */
export class QueryList<T> {
    private _results;
    private _emitter;
    changes: Observable<any>;
    length: number;
    first: T;
    last: T;
    /**
     * returns a new array with the passed in function applied to each element.
     */
    map<U>(fn: (item: T) => U): U[];
    /**
     * returns a filtered array.
     */
    filter(fn: (item: T) => boolean): T[];
    /**
     * returns a reduced value.
     */
    reduce<U>(fn: (acc: U, item: T) => U, init: U): U;
    /**
     * executes function for each element in a query.
     */
    forEach(fn: (item: T) => void): void;
    /**
     * converts QueryList into an array
     */
    toArray(): T[];
    toString(): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/dynamic_component_loader.d.ts
declare module 'core/src/core/linker/dynamic_component_loader' {
import { Injector, ResolvedProvider } from 'angular2/src/core/di';
import { Compiler } from 'core/src/core/linker/compiler';
import { Type } from 'angular2/src/facade/lang';
import { AppViewManager } from 'angular2/src/core/linker/view_manager';
import { ElementRef } from 'core/src/core/linker/element_ref';
import { HostViewRef } from 'core/src/core/linker/view_ref';
/**
 * Represents an instance of a Component created via {@link DynamicComponentLoader}.
 *
 * `ComponentRef` provides access to the Component Instance as well other objects related to this
 * Component Instance and allows you to destroy the Component Instance via the {@link #dispose}
 * method.
 */
export abstract class ComponentRef {
    /**
     * The injector provided {@link DynamicComponentLoader#loadAsRoot}.
     *
     * TODO(i): this api is useless and should be replaced by an injector retrieved from
     *     the HostElementRef, which is currently not possible.
     */
    injector: Injector;
    /**
     * Location of the Host Element of this Component Instance.
     */
    location: ElementRef;
    /**
     * The instance of the Component.
     */
    instance: any;
    /**
     * The user defined component type, represented via the constructor function.
     *
     * <!-- TODO: customize wording for Dart docs -->
     */
    componentType: Type;
    /**
     * The {@link ViewRef} of the Host View of this Component instance.
     */
    hostView: HostViewRef;
    /**
     * Destroys the component instance and all of the data structures associated with it.
     *
     * TODO(i): rename to destroy to be consistent with AppViewManager and ViewContainerRef
     */
    abstract dispose(): any;
}
export class ComponentRef_ extends ComponentRef {
    private _dispose;
    /**
     * TODO(i): refactor into public/private fields
     */
    constructor(location: ElementRef, instance: any, componentType: Type, injector: Injector, _dispose: () => void);
    dispose(): void;
}
/**
 * Service for instantiating a Component and attaching it to a View at a specified location.
 */
export abstract class DynamicComponentLoader {
    /**
     * Creates an instance of a Component `type` and attaches it to the first element in the
     * platform-specific global view that matches the component's selector.
     *
     * In a browser the platform-specific global view is the main DOM Document.
     *
     * If needed, the component's selector can be overridden via `overrideSelector`.
     *
     * You can optionally provide `injector` and this {@link Injector} will be used to instantiate the
     * Component.
     *
     * To be notified when this Component instance is destroyed, you can also optionally provide
     * `onDispose` callback.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'child-component',
     *   template: 'Child'
     * })
     * class ChildComponent {
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   template: 'Parent (<child id="child"></child>)'
     * })
     * class MyApp {
     *   constructor(dcl: DynamicComponentLoader, injector: Injector) {
     *     dcl.loadAsRoot(ChildComponent, '#child', injector);
     *   }
     * }
     *
     * bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>
     *   Parent (
     *     <child id="child">Child</child>
     *   )
     * </my-app>
     * ```
     */
    abstract loadAsRoot(type: Type, overrideSelector: string, injector: Injector, onDispose?: () => void, projectableNodes?: any[][]): Promise<ComponentRef>;
    /**
     * Creates an instance of a Component and attaches it to a View Container located inside of the
     * Component View of another Component instance.
     *
     * The targeted Component Instance is specified via its `hostLocation` {@link ElementRef}. The
     * location within the Component View of this Component Instance is specified via `anchorName`
     * Template Variable Name.
     *
     * You can optionally provide `providers` to configure the {@link Injector} provisioned for this
     * Component Instance.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'child-component',
     *   template: 'Child'
     * })
     * class ChildComponent {
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   template: 'Parent (<div #child></div>)'
     * })
     * class MyApp {
     *   constructor(dcl: DynamicComponentLoader, elementRef: ElementRef) {
     *     dcl.loadIntoLocation(ChildComponent, elementRef, 'child');
     *   }
     * }
     *
     * bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>
     *    Parent (
     *      <div #child="" class="ng-binding"></div>
     *      <child-component class="ng-binding">Child</child-component>
     *    )
     * </my-app>
     * ```
     */
    abstract loadIntoLocation(type: Type, hostLocation: ElementRef, anchorName: string, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
    /**
     * Creates an instance of a Component and attaches it to the View Container found at the
     * `location` specified as {@link ElementRef}.
     *
     * You can optionally provide `providers` to configure the {@link Injector} provisioned for this
     * Component Instance.
     *
     * Returns a promise for the {@link ComponentRef} representing the newly created Component.
     *
     *
     * ### Example
     *
     * ```
     * @Component({
     *   selector: 'child-component',
     *   template: 'Child'
     * })
     * class ChildComponent {
     * }
     *
     * @Component({
     *   selector: 'my-app',
     *   template: 'Parent'
     * })
     * class MyApp {
     *   constructor(dcl: DynamicComponentLoader, elementRef: ElementRef) {
     *     dcl.loadNextToLocation(ChildComponent, elementRef);
     *   }
     * }
     *
     * bootstrap(MyApp);
     * ```
     *
     * Resulting DOM:
     *
     * ```
     * <my-app>Parent</my-app>
     * <child-component>Child</child-component>
     * ```
     */
    abstract loadNextToLocation(type: Type, location: ElementRef, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
}
export class DynamicComponentLoader_ extends DynamicComponentLoader {
    private _compiler;
    private _viewManager;
    constructor(_compiler: Compiler, _viewManager: AppViewManager);
    loadAsRoot(type: Type, overrideSelector: string, injector: Injector, onDispose?: () => void, projectableNodes?: any[][]): Promise<ComponentRef>;
    loadIntoLocation(type: Type, hostLocation: ElementRef, anchorName: string, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
    loadNextToLocation(type: Type, location: ElementRef, providers?: ResolvedProvider[], projectableNodes?: any[][]): Promise<ComponentRef>;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/element.d.ts
declare module 'core/src/core/linker/element' {
import { Type } from 'angular2/src/facade/lang';
import { Injector, Key, Dependency, ResolvedProvider } from 'angular2/src/core/di';
import { ProtoInjector, ProviderWithVisibility, DependencyProvider } from 'angular2/src/core/di/injector';
import { ResolvedProvider_ } from 'angular2/src/core/di/provider';
import { QueryMetadata } from 'core/src/core/metadata/di';
import { AppView } from 'core/src/core/linker/view';
import { ViewType } from 'core/src/core/linker/view_type';
import { ElementRef_ } from 'core/src/core/linker/element_ref';
import { ViewContainerRef } from 'core/src/core/linker/view_container_ref';
import { ElementRef } from 'core/src/core/linker/element_ref';
import { TemplateRef } from 'core/src/core/linker/template_ref';
import { DirectiveMetadata } from 'core/src/core/metadata/directives';
import { QueryList } from 'core/src/core/linker/query_list';
import { SetterFn } from 'angular2/src/core/reflection/types';
import { AfterViewChecked } from 'angular2/src/core/linker/interfaces';
import { ResolvedMetadataCache } from 'core/src/core/linker/resolved_metadata_cache';
export class StaticKeys {
    templateRefId: number;
    viewContainerId: number;
    changeDetectorRefId: number;
    elementRefId: number;
    rendererId: number;
    constructor();
    static instance(): StaticKeys;
}
export class DirectiveDependency extends Dependency {
    attributeName: string;
    queryDecorator: QueryMetadata;
    constructor(key: Key, optional: boolean, lowerBoundVisibility: Object, upperBoundVisibility: Object, properties: any[], attributeName: string, queryDecorator: QueryMetadata);
    static createFrom(d: Dependency): DirectiveDependency;
}
export class DirectiveProvider extends ResolvedProvider_ {
    isComponent: boolean;
    providers: ResolvedProvider[];
    viewProviders: ResolvedProvider[];
    queries: QueryMetadataWithSetter[];
    constructor(key: Key, factory: Function, deps: Dependency[], isComponent: boolean, providers: ResolvedProvider[], viewProviders: ResolvedProvider[], queries: QueryMetadataWithSetter[]);
    displayName: string;
    static createFromType(type: Type, meta: DirectiveMetadata): DirectiveProvider;
}
export class QueryMetadataWithSetter {
    setter: SetterFn;
    metadata: QueryMetadata;
    constructor(setter: SetterFn, metadata: QueryMetadata);
}
export class AppProtoElement {
    firstProviderIsComponent: boolean;
    index: number;
    attributes: {
        [key: string]: string;
    };
    protoQueryRefs: ProtoQueryRef[];
    directiveVariableBindings: {
        [key: string]: number;
    };
    protoInjector: ProtoInjector;
    static create(metadataCache: ResolvedMetadataCache, index: number, attributes: {
        [key: string]: string;
    }, directiveTypes: Type[], directiveVariableBindings: {
        [key: string]: number;
    }): AppProtoElement;
    constructor(firstProviderIsComponent: boolean, index: number, attributes: {
        [key: string]: string;
    }, pwvs: ProviderWithVisibility[], protoQueryRefs: ProtoQueryRef[], directiveVariableBindings: {
        [key: string]: number;
    });
    getProviderAtIndex(index: number): any;
}
export class InjectorWithHostBoundary {
    injector: Injector;
    hostInjectorBoundary: boolean;
    constructor(injector: Injector, hostInjectorBoundary: boolean);
}
export class AppElement implements DependencyProvider, ElementRef, AfterViewChecked {
    proto: AppProtoElement;
    parentView: AppView;
    parent: AppElement;
    nativeElement: any;
    embeddedViewFactory: Function;
    static getViewParentInjector(parentViewType: ViewType, containerAppElement: AppElement, imperativelyCreatedProviders: ResolvedProvider[], rootInjector: Injector): InjectorWithHostBoundary;
    nestedViews: AppView[];
    componentView: AppView;
    private _queryStrategy;
    private _injector;
    private _strategy;
    ref: ElementRef_;
    constructor(proto: AppProtoElement, parentView: AppView, parent: AppElement, nativeElement: any, embeddedViewFactory: Function);
    attachComponentView(componentView: AppView): void;
    private _debugContext();
    hasVariableBinding(name: string): boolean;
    getVariableBinding(name: string): any;
    get(token: any): any;
    hasDirective(type: Type): boolean;
    getComponent(): any;
    getInjector(): Injector;
    getElementRef(): ElementRef;
    getViewContainerRef(): ViewContainerRef;
    getTemplateRef(): TemplateRef;
    getDependency(injector: Injector, provider: ResolvedProvider, dep: Dependency): any;
    private _buildAttribute(dep);
    addDirectivesMatchingQuery(query: QueryMetadata, list: any[]): void;
    private _buildQueryStrategy();
    getDirectiveAtIndex(index: number): any;
    ngAfterViewChecked(): void;
    ngAfterContentChecked(): void;
    traverseAndSetQueriesAsDirty(): void;
    private _setQueriesAsDirty();
}
export class ProtoQueryRef {
    dirIndex: number;
    setter: SetterFn;
    query: QueryMetadata;
    constructor(dirIndex: number, setter: SetterFn, query: QueryMetadata);
    usesPropertySyntax: boolean;
}
export class QueryRef {
    protoQueryRef: ProtoQueryRef;
    private originator;
    list: QueryList<any>;
    dirty: boolean;
    constructor(protoQueryRef: ProtoQueryRef, originator: AppElement);
    isViewQuery: boolean;
    update(): void;
    private _update();
    private _visit(inj, aggregator);
    private _visitInjector(inj, aggregator);
    private _visitViewContainerViews(views, aggregator);
    private _visitView(view, aggregator);
    private _aggregateVariableBinding(inj, aggregator);
    private _aggregateDirective(inj, aggregator);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/element_ref.d.ts
declare module 'core/src/core/linker/element_ref' {
import { AppElement } from 'core/src/core/linker/element';
/**
 * Represents a location in a View that has an injection, change-detection and render context
 * associated with it.
 *
 * An `ElementRef` is created for each element in the Template that contains a Directive, Component
 * or data-binding.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 */
export abstract class ElementRef {
    /**
     * The underlying native element or `null` if direct access to native elements is not supported
     * (e.g. when the application runs in a web worker).
     *
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding provided by Angular instead. Alternatively you take a look at {@link Renderer}
     *    which provides API that can safely be used even when direct access to native elements is not
     *    supported.
     *   </p>
     *   <p>
     *    Relying on direct DOM access creates tight coupling between your application and rendering
     *    layers which will make it impossible to separate the two and deploy your application into a
     *    web worker.
     *   </p>
     * </div>
     */
    nativeElement: any;
}
export class ElementRef_ implements ElementRef {
    private _appElement;
    constructor(_appElement: AppElement);
    internalElement: AppElement;
    nativeElement: any;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/template_ref.d.ts
declare module 'core/src/core/linker/template_ref' {
import { ElementRef, ElementRef_ } from 'core/src/core/linker/element_ref';
/**
 * Represents an Embedded Template that can be used to instantiate Embedded Views.
 *
 * You can access a `TemplateRef`, in two ways. Via a directive placed on a `<template>` element (or
 * directive prefixed with `*`) and have the `TemplateRef` for this Embedded View injected into the
 * constructor of the directive using the `TemplateRef` Token. Alternatively you can query for the
 * `TemplateRef` from a Component or a Directive via {@link Query}.
 *
 * To instantiate Embedded Views based on a Template, use
 * {@link ViewContainerRef#createEmbeddedView}, which will create the View and attach it to the
 * View Container.
 */
export abstract class TemplateRef {
    /**
     * The location in the View where the Embedded View logically belongs to.
     *
     * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
     * inherit from the contexts of this location.
     *
     * Typically new Embedded Views are attached to the View Container of this location, but in
     * advanced use-cases, the View can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     */
    elementRef: ElementRef;
}
export class TemplateRef_ extends TemplateRef {
    private _elementRef;
    constructor(_elementRef: ElementRef_);
    elementRef: ElementRef_;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/change_detector_ref.d.ts
declare module 'core/src/core/change_detection/change_detector_ref' {
import { ChangeDetector } from 'core/src/core/change_detection/interfaces';
export abstract class ChangeDetectorRef {
    /**
     * Marks all {@link ChangeDetectionStrategy#OnPush} ancestors as to be checked.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/GC512b?p=preview))
     *
     * ```typescript
     * @Component({
     *   selector: 'cmp',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `Number of ticks: {{numberOfTicks}}`
     * })
     * class Cmp {
     *   numberOfTicks = 0;
     *
     *   constructor(ref: ChangeDetectorRef) {
     *     setInterval(() => {
     *       this.numberOfTicks ++
     *       // the following is required, otherwise the view will not be updated
     *       this.ref.markForCheck();
     *     }, 1000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   changeDetection: ChangeDetectionStrategy.OnPush,
     *   template: `
     *     <cmp><cmp>
     *   `,
     *   directives: [Cmp]
     * })
     * class App {
     * }
     *
     * bootstrap(App);
     * ```
     */
    abstract markForCheck(): void;
    /**
     * Detaches the change detector from the change detector tree.
     *
     * The detached change detector will not be checked until it is reattached.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detectChanges} to implement
     * local change
     * detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds. We can do that by detaching
     * the component's change detector and doing a local check every five seconds.
     *
     * ```typescript
     * class DataProvider {
     *   // in a real application the returned data will be different every time
     *   get data() {
     *     return [1,2,3,4,5];
     *   }
     * }
     *
     * @Component({
     *   selector: 'giant-list',
     *   template: `
     *     <li *ngFor="#d of dataProvider.data">Data {{d}}</lig>
     *   `,
     *   directives: [NgFor]
     * })
     * class GiantList {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {
     *     ref.detach();
     *     setInterval(() => {
     *       this.ref.detectChanges();
     *     }, 5000);
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     <giant-list><giant-list>
     *   `,
     *   directives: [GiantList]
     * })
     * class App {
     * }
     *
     * bootstrap(App);
     * ```
     */
    abstract detach(): void;
    /**
     * Checks the change detector and its children.
     *
     * This can also be used in combination with {@link ChangeDetectorRef#detach} to implement local
     * change detection
     * checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     * ### Example
     *
     * The following example defines a component with a large list of readonly data.
     * Imagine, the data changes constantly, many times per second. For performance reasons,
     * we want to check and update the list every five seconds.
     *
     * We can do that by detaching the component's change detector and doing a local change detection
     * check
     * every five seconds.
     *
     * See {@link ChangeDetectorRef#detach} for more information.
     */
    abstract detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * This is used in development mode to verify that running change detection doesn't introduce
     * other changes.
     */
    abstract checkNoChanges(): void;
    /**
     * Reattach the change detector to the change detector tree.
     *
     * This also marks OnPush ancestors as to be checked. This reattached change detector will be
     * checked during the next change detection run.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     * ### Example ([live demo](http://plnkr.co/edit/aUhZha?p=preview))
     *
     * The following example creates a component displaying `live` data. The component will detach
     * its change detector from the main change detector tree when the component's live property
     * is set to false.
     *
     * ```typescript
     * class DataProvider {
     *   data = 1;
     *
     *   constructor() {
     *     setInterval(() => {
     *       this.data = this.data * 2;
     *     }, 500);
     *   }
     * }
     *
     * @Component({
     *   selector: 'live-data',
     *   inputs: ['live'],
     *   template: `Data: {{dataProvider.data}}`
     * })
     * class LiveData {
     *   constructor(private ref: ChangeDetectorRef, private dataProvider:DataProvider) {}
     *
     *   set live(value) {
     *     if (value)
     *       this.ref.reattach();
     *     else
     *       this.ref.detach();
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   providers: [DataProvider],
     *   template: `
     *     Live Update: <input type="checkbox" [(ngModel)]="live">
     *     <live-data [live]="live"><live-data>
     *   `,
     *   directives: [LiveData, FORM_DIRECTIVES]
     * })
     * class App {
     *   live = true;
     * }
     *
     * bootstrap(App);
     * ```
     */
    abstract reattach(): void;
}
export class ChangeDetectorRef_ extends ChangeDetectorRef {
    private _cd;
    constructor(_cd: ChangeDetector);
    markForCheck(): void;
    detach(): void;
    detectChanges(): void;
    checkNoChanges(): void;
    reattach(): void;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/pipes/pipe_provider.d.ts
declare module 'core/src/core/pipes/pipe_provider' {
import { Type } from 'angular2/src/facade/lang';
import { ResolvedFactory, ResolvedProvider_ } from 'angular2/src/core/di/provider';
import { Key } from 'angular2/src/core/di';
import { PipeMetadata } from 'core/src/core/metadata/directives';
export class PipeProvider extends ResolvedProvider_ {
    name: string;
    pure: boolean;
    constructor(name: string, pure: boolean, key: Key, resolvedFactories: ResolvedFactory[], multiBinding: boolean);
    static createFromType(type: Type, metadata: PipeMetadata): PipeProvider;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/pipe_resolver.d.ts
declare module 'core/src/core/linker/pipe_resolver' {
import { Type } from 'angular2/src/facade/lang';
import { PipeMetadata } from 'angular2/src/core/metadata';
/**
 * Resolve a `Type` for {@link PipeMetadata}.
 *
 * This interface can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 */
export class PipeResolver {
    /**
     * Return {@link PipeMetadata} for a given `Type`.
     */
    resolve(type: Type): PipeMetadata;
}
export var CODEGEN_PIPE_RESOLVER: PipeResolver;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/resolved_metadata_cache.d.ts
declare module 'core/src/core/linker/resolved_metadata_cache' {
import { Type } from 'angular2/src/facade/lang';
import { DirectiveProvider } from 'core/src/core/linker/element';
import { DirectiveResolver } from 'core/src/core/linker/directive_resolver';
import { PipeProvider } from 'core/src/core/pipes/pipe_provider';
import { PipeResolver } from 'core/src/core/linker/pipe_resolver';
export class ResolvedMetadataCache {
    private _directiveResolver;
    private _pipeResolver;
    private _directiveCache;
    private _pipeCache;
    constructor(_directiveResolver: DirectiveResolver, _pipeResolver: PipeResolver);
    getResolvedDirectiveMetadata(type: Type): DirectiveProvider;
    getResolvedPipeMetadata(type: Type): PipeProvider;
}
export var CODEGEN_RESOLVED_METADATA_CACHE: ResolvedMetadataCache;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/view_type.d.ts
declare module 'core/src/core/linker/view_type' {
export enum ViewType {
    HOST = 0,
    COMPONENT = 1,
    EMBEDDED = 2,
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/view.d.ts
declare module 'core/src/core/linker/view' {
import { ChangeDetector, ChangeDispatcher, DirectiveIndex, BindingTarget, Locals, ChangeDetectorRef } from 'angular2/src/core/change_detection/change_detection';
import { ResolvedProvider, Injector } from 'angular2/src/core/di';
import { DebugContext } from 'angular2/src/core/change_detection/interfaces';
import { AppElement } from 'core/src/core/linker/element';
import { Type } from 'angular2/src/facade/lang';
import { Renderer } from 'angular2/src/core/render/api';
import { ViewRef_ } from 'core/src/core/linker/view_ref';
import { ProtoPipes } from 'angular2/src/core/pipes/pipes';
export { DebugContext } from 'angular2/src/core/change_detection/interfaces';
import { Pipes } from 'angular2/src/core/pipes/pipes';
import { AppViewManager_ } from 'core/src/core/linker/view_manager';
import { ResolvedMetadataCache } from 'core/src/core/linker/resolved_metadata_cache';
import { ViewType } from 'core/src/core/linker/view_type';
/**
 * Cost of making objects: http://jsperf.com/instantiate-size-of-object
 *
 */
export class AppView implements ChangeDispatcher {
    proto: AppProtoView;
    renderer: Renderer;
    viewManager: AppViewManager_;
    projectableNodes: Array<any | any[]>;
    containerAppElement: AppElement;
    changeDetector: ChangeDetector;
    ref: ViewRef_;
    rootNodesOrAppElements: any[];
    allNodes: any[];
    disposables: Function[];
    appElements: AppElement[];
    /**
     * The context against which data-binding expressions in this view are evaluated against.
     * This is always a component instance.
     */
    context: any;
    /**
     * Variables, local to this view, that can be used in binding expressions (in addition to the
     * context). This is used for thing like `<video #player>` or
     * `<li template="for #item of items">`, where "player" and "item" are locals, respectively.
     */
    locals: Locals;
    pipes: Pipes;
    parentInjector: Injector;
    /**
     * Whether root injectors of this view
     * have a hostBoundary.
     */
    hostInjectorBoundary: boolean;
    destroyed: boolean;
    constructor(proto: AppProtoView, renderer: Renderer, viewManager: AppViewManager_, projectableNodes: Array<any | any[]>, containerAppElement: AppElement, imperativelyCreatedProviders: ResolvedProvider[], rootInjector: Injector, changeDetector: ChangeDetector);
    init(rootNodesOrAppElements: any[], allNodes: any[], disposables: Function[], appElements: AppElement[]): void;
    destroy(): void;
    notifyOnDestroy(): void;
    changeDetectorRef: ChangeDetectorRef;
    flatRootNodes: any[];
    hasLocal(contextName: string): boolean;
    setLocal(contextName: string, value: any): void;
    notifyOnBinding(b: BindingTarget, currentValue: any): void;
    logBindingUpdate(b: BindingTarget, value: any): void;
    notifyAfterContentChecked(): void;
    notifyAfterViewChecked(): void;
    getDebugContext(appElement: AppElement, elementIndex: number, directiveIndex: number): DebugContext;
    getDirectiveFor(directive: DirectiveIndex): any;
    getDetectorFor(directive: DirectiveIndex): ChangeDetector;
    /**
     * Triggers the event handlers for the element and the directives.
     *
     * This method is intended to be called from directive EventEmitters.
     *
     * @param {string} eventName
     * @param {*} eventObj
     * @param {number} boundElementIndex
     * @return false if preventDefault must be applied to the DOM event
     */
    triggerEventHandlers(eventName: string, eventObj: Event, boundElementIndex: number): boolean;
}
/**
 *
 */
export class AppProtoView {
    type: ViewType;
    protoPipes: ProtoPipes;
    templateVariableBindings: {
        [key: string]: string;
    };
    static create(metadataCache: ResolvedMetadataCache, type: ViewType, pipes: Type[], templateVariableBindings: {
        [key: string]: string;
    }): AppProtoView;
    constructor(type: ViewType, protoPipes: ProtoPipes, templateVariableBindings: {
        [key: string]: string;
    });
}
export class HostViewFactory {
    selector: string;
    viewFactory: Function;
    constructor(selector: string, viewFactory: Function);
}
export function flattenNestedViewRenderNodes(nodes: any[]): any[];
export function findLastRenderNode(node: any): any;
export function checkSlotCount(componentName: string, expectedSlotCount: number, projectableNodes: any[][]): void;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/view_ref.d.ts
declare module 'core/src/core/linker/view_ref' {
import { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
import { AppView, HostViewFactory } from 'core/src/core/linker/view';
export abstract class ViewRef {
    destroyed: boolean;
}
/**
 * Represents a View containing a single Element that is the Host Element of a {@link Component}
 * instance.
 *
 * A Host View is created for every dynamically created Component that was compiled on its own (as
 * opposed to as a part of another Component's Template) via {@link Compiler#compileInHost} or one
 * of the higher-level APIs: {@link AppViewManager#createRootHostView},
 * {@link AppViewManager#createHostViewInContainer}, {@link ViewContainerRef#createHostView}.
 */
export abstract class HostViewRef extends ViewRef {
    rootNodes: any[];
}
/**
 * Represents an Angular View.
 *
 * <!-- TODO: move the next two paragraphs to the dev guide -->
 * A View is a fundamental building block of the application UI. It is the smallest grouping of
 * Elements which are created and destroyed together.
 *
 * Properties of elements in a View can change, but the structure (number and order) of elements in
 * a View cannot. Changing the structure of Elements can only be done by inserting, moving or
 * removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
 * <!-- /TODO -->
 *
 * ### Example
 *
 * Given this template...
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ngFor="var item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * ... we have two {@link ProtoViewRef}s:
 *
 * Outer {@link ProtoViewRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ngFor var-item [ngForOf]="items"></template>
 * </ul>
 * ```
 *
 * Inner {@link ProtoViewRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separate {@link ProtoViewRef}s.
 *
 * The outer/inner {@link ProtoViewRef}s are then assembled into views like so:
 *
 * ```
 * <!-- ViewRef: outer-0 -->
 * Count: 2
 * <ul>
 *   <template view-container-ref></template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outer-0 -->
 * ```
 */
export abstract class EmbeddedViewRef extends ViewRef {
    /**
     * Sets `value` of local variable called `variableName` in this View.
     */
    abstract setLocal(variableName: string, value: any): void;
    /**
     * Checks whether this view has a local variable called `variableName`.
     */
    abstract hasLocal(variableName: string): boolean;
    rootNodes: any[];
}
export class ViewRef_ implements EmbeddedViewRef, HostViewRef {
    private _view;
    constructor(_view: AppView);
    internalView: AppView;
    /**
     * Return `ChangeDetectorRef`
     */
    changeDetectorRef: ChangeDetectorRef;
    rootNodes: any[];
    setLocal(variableName: string, value: any): void;
    hasLocal(variableName: string): boolean;
    destroyed: boolean;
}
export abstract class HostViewFactoryRef {
}
export class HostViewFactoryRef_ implements HostViewFactoryRef {
    private _hostViewFactory;
    constructor(_hostViewFactory: HostViewFactory);
    internalHostViewFactory: HostViewFactory;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker/view_container_ref.d.ts
declare module 'core/src/core/linker/view_container_ref' {
import { ResolvedProvider } from 'angular2/src/core/di';
import { AppElement } from 'core/src/core/linker/element';
import { ElementRef, ElementRef_ } from 'core/src/core/linker/element_ref';
import { TemplateRef } from 'core/src/core/linker/template_ref';
import { EmbeddedViewRef, HostViewRef, HostViewFactoryRef, ViewRef } from 'core/src/core/linker/view_ref';
/**
 * Represents a container where one or more Views can be attached.
 *
 * The container can contain two kinds of Views. Host Views, created by instantiating a
 * {@link Component} via {@link #createHostView}, and Embedded Views, created by instantiating an
 * {@link TemplateRef Embedded Template} via {@link #createEmbeddedView}.
 *
 * The location of the View Container within the containing View is specified by the Anchor
 * `element`. Each View Container can have only one Anchor Element and each Anchor Element can only
 * have a single View Container.
 *
 * Root elements of Views attached to this container become siblings of the Anchor Element in
 * the Rendered View.
 *
 * To access a `ViewContainerRef` of an Element, you can either place a {@link Directive} injected
 * with `ViewContainerRef` on the Element, or you obtain it via
 * {@link AppViewManager#getViewContainer}.
 *
 * <!-- TODO(i): we are also considering ElementRef#viewContainer api -->
 */
export abstract class ViewContainerRef {
    /**
     * Anchor element that specifies the location of this container in the containing View.
     * <!-- TODO: rename to anchorElement -->
     */
    element: ElementRef;
    /**
     * Destroys all Views in this container.
     */
    clear(): void;
    /**
     * Returns the {@link ViewRef} for the View located in this container at the specified index.
     */
    abstract get(index: number): ViewRef;
    /**
     * Returns the number of Views currently attached to this container.
     */
    length: number;
    /**
     * Instantiates an Embedded View based on the {@link TemplateRef `templateRef`} and inserts it
     * into this container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the {@link ViewRef} for the newly created View.
     */
    abstract createEmbeddedView(templateRef: TemplateRef, index?: number): EmbeddedViewRef;
    /**
     * Instantiates a single {@link Component} and inserts its Host View into this container at the
     * specified `index`.
     *
     * The component is instantiated using its {@link ProtoViewRef `protoView`} which can be
     * obtained via {@link Compiler#compileInHost}.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * You can optionally specify `dynamicallyCreatedProviders`, which configure the {@link Injector}
     * that will be created for the Host View.
     *
     * Returns the {@link HostViewRef} of the Host View created for the newly instantiated Component.
     */
    abstract createHostView(hostViewFactoryRef: HostViewFactoryRef, index?: number, dynamicallyCreatedProviders?: ResolvedProvider[], projectableNodes?: any[][]): HostViewRef;
    /**
     * Inserts a View identified by a {@link ViewRef} into the container at the specified `index`.
     *
     * If `index` is not specified, the new View will be inserted as the last View in the container.
     *
     * Returns the inserted {@link ViewRef}.
     */
    abstract insert(viewRef: EmbeddedViewRef, index?: number): EmbeddedViewRef;
    /**
     * Returns the index of the View, specified via {@link ViewRef}, within the current container or
     * `-1` if this container doesn't contain the View.
     */
    abstract indexOf(viewRef: ViewRef): number;
    /**
     * Destroys a View attached to this container at the specified `index`.
     *
     * If `index` is not specified, the last View in the container will be removed.
     */
    abstract remove(index?: number): void;
    /**
     * Use along with {@link #insert} to move a View within the current container.
     *
     * If the `index` param is omitted, the last {@link ViewRef} is detached.
     */
    abstract detach(index?: number): EmbeddedViewRef;
}
export class ViewContainerRef_ extends ViewContainerRef {
    private _element;
    constructor(_element: AppElement);
    get(index: number): EmbeddedViewRef;
    length: number;
    element: ElementRef_;
    createEmbeddedView(templateRef: TemplateRef, index?: number): EmbeddedViewRef;
    createHostView(hostViewFactoryRef: HostViewFactoryRef, index?: number, dynamicallyCreatedProviders?: ResolvedProvider[], projectableNodes?: any[][]): HostViewRef;
    insert(viewRef: ViewRef, index?: number): EmbeddedViewRef;
    indexOf(viewRef: ViewRef): number;
    remove(index?: number): void;
    detach(index?: number): EmbeddedViewRef;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/linker.d.ts
declare module 'core/src/core/linker' {
export { AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnChanges, OnDestroy, OnInit, DoCheck } from 'core/src/core/linker/interfaces';
export { DirectiveResolver } from 'core/src/core/linker/directive_resolver';
export { ViewResolver } from 'core/src/core/linker/view_resolver';
export { Compiler } from 'core/src/core/linker/compiler';
export { AppViewManager } from 'core/src/core/linker/view_manager';
export { QueryList } from 'core/src/core/linker/query_list';
export { DynamicComponentLoader } from 'core/src/core/linker/dynamic_component_loader';
export { ElementRef } from 'core/src/core/linker/element_ref';
export { TemplateRef } from 'core/src/core/linker/template_ref';
export { EmbeddedViewRef, HostViewRef, ViewRef, HostViewFactoryRef } from 'core/src/core/linker/view_ref';
export { ViewContainerRef } from 'core/src/core/linker/view_container_ref';
export { ComponentRef } from 'core/src/core/linker/dynamic_component_loader';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/debug/debug_node.d.ts
declare module 'core/src/core/debug/debug_node' {
import { Predicate } from 'angular2/src/facade/collection';
import { Injector } from 'angular2/src/core/di';
import { RenderDebugInfo } from 'angular2/src/core/render/api';
export class EventListener {
    name: string;
    callback: Function;
    constructor(name: string, callback: Function);
}
export class DebugNode {
    nativeNode: any;
    listeners: EventListener[];
    parent: DebugElement;
    providerTokens: any[];
    locals: Map<string, any>;
    injector: Injector;
    componentInstance: any;
    constructor(nativeNode: any, parent: DebugNode);
    setDebugInfo(info: RenderDebugInfo): void;
    inject(token: any): any;
    getLocal(name: string): any;
}
export class DebugElement extends DebugNode {
    name: string;
    properties: Map<string, any>;
    attributes: Map<string, any>;
    childNodes: DebugNode[];
    nativeElement: any;
    constructor(nativeNode: any, parent: any);
    addChild(child: DebugNode): void;
    removeChild(child: DebugNode): void;
    insertChildrenAfter(child: DebugNode, newChildren: DebugNode[]): void;
    query(predicate: Predicate<DebugElement>): DebugElement;
    queryAll(predicate: Predicate<DebugElement>): DebugElement[];
    queryAllNodes(predicate: Predicate<DebugNode>): DebugNode[];
    children: DebugElement[];
    triggerEventHandler(eventName: string, eventObj: Event): void;
}
export function asNativeElements(debugEls: DebugElement[]): any;
export function getDebugNode(nativeNode: any): DebugNode;
export function getAllDebugNodes(): DebugNode[];
export function indexDebugNode(node: DebugNode): void;
export function removeDebugNodeFromIndex(node: DebugNode): void;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/testability/testability.d.ts
declare module 'core/src/core/testability/testability' {
import { NgZone } from 'core/src/core/zone/ng_zone';
/**
 * The Testability service provides testing hooks that can be accessed from
 * the browser and by services such as Protractor. Each bootstrapped Angular
 * application on the page will have an instance of Testability.
 */
export class Testability {
    constructor(_ngZone: NgZone);
    increasePendingRequestCount(): number;
    decreasePendingRequestCount(): number;
    isStable(): boolean;
    whenStable(callback: Function): void;
    getPendingRequestCount(): number;
    isAngularEventPending(): boolean;
    findBindings(using: any, provider: string, exactMatch: boolean): any[];
    findProviders(using: any, provider: string, exactMatch: boolean): any[];
}
/**
 * A global registry of {@link Testability} instances for specific elements.
 */
export class TestabilityRegistry {
    constructor();
    registerApplication(token: any, testability: Testability): void;
    getTestability(elem: any): Testability;
    getAllTestabilities(): Testability[];
    getAllRootElements(): any[];
    findTestabilityInTree(elem: Node, findInAncestors?: boolean): Testability;
}
/**
 * Adapter interface for retrieving the `Testability` service associated for a
 * particular context.
 */
export interface GetTestability {
    addToWindow(registry: TestabilityRegistry): void;
    findTestabilityInTree(registry: TestabilityRegistry, elem: any, findInAncestors: boolean): Testability;
}
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 */
export function setTestabilityGetter(getter: GetTestability): void;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/differs/iterable_differs.d.ts
declare module 'core/src/core/change_detection/differs/iterable_differs' {
import { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
import { Provider } from 'angular2/src/core/di';
/**
 * A strategy for tracking changes over time to an iterable. Used for {@link NgFor} to
 * respond to changes in an iterable by effecting equivalent changes in the DOM.
 */
export interface IterableDiffer {
    diff(object: any): any;
    onDestroy(): any;
}
/**
  * An optional function passed into {@link NgFor} that defines how to track
  * items in an iterable (e.g. by index or id)
 */
export interface TrackByFn {
    (index: number, item: any): any;
}
/**
 * Provides a factory for {@link IterableDiffer}.
 */
export interface IterableDifferFactory {
    supports(objects: any): boolean;
    create(cdRef: ChangeDetectorRef, trackByFn?: TrackByFn): IterableDiffer;
}
/**
 * A repository of different iterable diffing strategies used by NgFor, NgClass, and others.
 */
export class IterableDiffers {
    factories: IterableDifferFactory[];
    constructor(factories: IterableDifferFactory[]);
    static create(factories: IterableDifferFactory[], parent?: IterableDiffers): IterableDiffers;
    /**
     * Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
     * inherited {@link IterableDiffers} instance with the provided factories and return a new
     * {@link IterableDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
           * which will only be applied to the injector for this component and its children.
           * This step is all that's required to make a new {@link IterableDiffer} available.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     IterableDiffers.extend([new ImmutableListDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: IterableDifferFactory[]): Provider;
    find(iterable: any): IterableDifferFactory;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/differs/keyvalue_differs.d.ts
declare module 'core/src/core/change_detection/differs/keyvalue_differs' {
import { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
import { Provider } from 'angular2/src/core/di';
/**
 * A differ that tracks changes made to an object over time.
 */
export interface KeyValueDiffer {
    diff(object: any): any;
    onDestroy(): any;
}
/**
 * Provides a factory for {@link KeyValueDiffer}.
 */
export interface KeyValueDifferFactory {
    supports(objects: any): boolean;
    create(cdRef: ChangeDetectorRef): KeyValueDiffer;
}
/**
 * A repository of different Map diffing strategies used by NgClass, NgStyle, and others.
 */
export class KeyValueDiffers {
    factories: KeyValueDifferFactory[];
    constructor(factories: KeyValueDifferFactory[]);
    static create(factories: KeyValueDifferFactory[], parent?: KeyValueDiffers): KeyValueDiffers;
    /**
     * Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
     * inherited {@link KeyValueDiffers} instance with the provided factories and return a new
     * {@link KeyValueDiffers} instance.
     *
     * The following example shows how to extend an existing list of factories,
           * which will only be applied to the injector for this component and its children.
           * This step is all that's required to make a new {@link KeyValueDiffer} available.
     *
     * ### Example
     *
     * ```
     * @Component({
     *   viewProviders: [
     *     KeyValueDiffers.extend([new ImmutableMapDiffer()])
     *   ]
     * })
     * ```
     */
    static extend(factories: KeyValueDifferFactory[]): Provider;
    find(kv: Object): KeyValueDifferFactory;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/differs/default_keyvalue_differ.d.ts
declare module 'core/src/core/change_detection/differs/default_keyvalue_differ' {
import { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
import { KeyValueDiffer, KeyValueDifferFactory } from 'core/src/core/change_detection/differs/keyvalue_differs';
export class DefaultKeyValueDifferFactory implements KeyValueDifferFactory {
    supports(obj: any): boolean;
    create(cdRef: ChangeDetectorRef): KeyValueDiffer;
}
export class DefaultKeyValueDiffer implements KeyValueDiffer {
    private _records;
    private _mapHead;
    private _previousMapHead;
    private _changesHead;
    private _changesTail;
    private _additionsHead;
    private _additionsTail;
    private _removalsHead;
    private _removalsTail;
    isDirty: boolean;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachChangedItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    diff(map: Map<any, any>): any;
    onDestroy(): void;
    check(map: Map<any, any>): boolean;
    toString(): string;
}
export class KeyValueChangeRecord {
    key: any;
    previousValue: any;
    currentValue: any;
    constructor(key: any);
    toString(): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/differs/default_iterable_differ.d.ts
declare module 'core/src/core/change_detection/differs/default_iterable_differ' {
import { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
import { IterableDiffer, IterableDifferFactory, TrackByFn } from 'core/src/core/change_detection/differs/iterable_differs';
export class DefaultIterableDifferFactory implements IterableDifferFactory {
    supports(obj: Object): boolean;
    create(cdRef: ChangeDetectorRef, trackByFn?: TrackByFn): DefaultIterableDiffer;
}
export class DefaultIterableDiffer implements IterableDiffer {
    private _trackByFn;
    private _length;
    private _collection;
    private _linkedRecords;
    private _unlinkedRecords;
    private _previousItHead;
    private _itHead;
    private _itTail;
    private _additionsHead;
    private _additionsTail;
    private _movesHead;
    private _movesTail;
    private _removalsHead;
    private _removalsTail;
    private _identityChangesHead;
    private _identityChangesTail;
    constructor(_trackByFn?: TrackByFn);
    collection: any;
    length: number;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachMovedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    forEachIdentityChange(fn: Function): void;
    diff(collection: any): DefaultIterableDiffer;
    onDestroy(): void;
    check(collection: any): boolean;
    isDirty: boolean;
    toString(): string;
}
export class CollectionChangeRecord {
    item: any;
    trackById: any;
    currentIndex: number;
    previousIndex: number;
    constructor(item: any, trackById: any);
    toString(): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/parser/ast.d.ts
declare module 'core/src/core/change_detection/parser/ast' {
export class AST {
    visit(visitor: AstVisitor): any;
    toString(): string;
}
/**
 * Represents a quoted expression of the form:
 *
 * quote = prefix `:` uninterpretedExpression
 * prefix = identifier
 * uninterpretedExpression = arbitrary string
 *
 * A quoted expression is meant to be pre-processed by an AST transformer that
 * converts it into another AST that no longer contains quoted expressions.
 * It is meant to allow third-party developers to extend Angular template
 * expression language. The `uninterpretedExpression` part of the quote is
 * therefore not interpreted by the Angular's own expression parser.
 */
export class Quote extends AST {
    prefix: string;
    uninterpretedExpression: string;
    location: any;
    constructor(prefix: string, uninterpretedExpression: string, location: any);
    visit(visitor: AstVisitor): any;
    toString(): string;
}
export class EmptyExpr extends AST {
    visit(visitor: AstVisitor): void;
}
export class ImplicitReceiver extends AST {
    visit(visitor: AstVisitor): any;
}
/**
 * Multiple expressions separated by a semicolon.
 */
export class Chain extends AST {
    expressions: any[];
    constructor(expressions: any[]);
    visit(visitor: AstVisitor): any;
}
export class Conditional extends AST {
    condition: AST;
    trueExp: AST;
    falseExp: AST;
    constructor(condition: AST, trueExp: AST, falseExp: AST);
    visit(visitor: AstVisitor): any;
}
export class PropertyRead extends AST {
    receiver: AST;
    name: string;
    getter: Function;
    constructor(receiver: AST, name: string, getter: Function);
    visit(visitor: AstVisitor): any;
}
export class PropertyWrite extends AST {
    receiver: AST;
    name: string;
    setter: Function;
    value: AST;
    constructor(receiver: AST, name: string, setter: Function, value: AST);
    visit(visitor: AstVisitor): any;
}
export class SafePropertyRead extends AST {
    receiver: AST;
    name: string;
    getter: Function;
    constructor(receiver: AST, name: string, getter: Function);
    visit(visitor: AstVisitor): any;
}
export class KeyedRead extends AST {
    obj: AST;
    key: AST;
    constructor(obj: AST, key: AST);
    visit(visitor: AstVisitor): any;
}
export class KeyedWrite extends AST {
    obj: AST;
    key: AST;
    value: AST;
    constructor(obj: AST, key: AST, value: AST);
    visit(visitor: AstVisitor): any;
}
export class BindingPipe extends AST {
    exp: AST;
    name: string;
    args: any[];
    constructor(exp: AST, name: string, args: any[]);
    visit(visitor: AstVisitor): any;
}
export class LiteralPrimitive extends AST {
    value: any;
    constructor(value: any);
    visit(visitor: AstVisitor): any;
}
export class LiteralArray extends AST {
    expressions: any[];
    constructor(expressions: any[]);
    visit(visitor: AstVisitor): any;
}
export class LiteralMap extends AST {
    keys: any[];
    values: any[];
    constructor(keys: any[], values: any[]);
    visit(visitor: AstVisitor): any;
}
export class Interpolation extends AST {
    strings: any[];
    expressions: any[];
    constructor(strings: any[], expressions: any[]);
    visit(visitor: AstVisitor): any;
}
export class Binary extends AST {
    operation: string;
    left: AST;
    right: AST;
    constructor(operation: string, left: AST, right: AST);
    visit(visitor: AstVisitor): any;
}
export class PrefixNot extends AST {
    expression: AST;
    constructor(expression: AST);
    visit(visitor: AstVisitor): any;
}
export class MethodCall extends AST {
    receiver: AST;
    name: string;
    fn: Function;
    args: any[];
    constructor(receiver: AST, name: string, fn: Function, args: any[]);
    visit(visitor: AstVisitor): any;
}
export class SafeMethodCall extends AST {
    receiver: AST;
    name: string;
    fn: Function;
    args: any[];
    constructor(receiver: AST, name: string, fn: Function, args: any[]);
    visit(visitor: AstVisitor): any;
}
export class FunctionCall extends AST {
    target: AST;
    args: any[];
    constructor(target: AST, args: any[]);
    visit(visitor: AstVisitor): any;
}
export class ASTWithSource extends AST {
    ast: AST;
    source: string;
    location: string;
    constructor(ast: AST, source: string, location: string);
    visit(visitor: AstVisitor): any;
    toString(): string;
}
export class TemplateBinding {
    key: string;
    keyIsVar: boolean;
    name: string;
    expression: ASTWithSource;
    constructor(key: string, keyIsVar: boolean, name: string, expression: ASTWithSource);
}
export interface AstVisitor {
    visitBinary(ast: Binary): any;
    visitChain(ast: Chain): any;
    visitConditional(ast: Conditional): any;
    visitFunctionCall(ast: FunctionCall): any;
    visitImplicitReceiver(ast: ImplicitReceiver): any;
    visitInterpolation(ast: Interpolation): any;
    visitKeyedRead(ast: KeyedRead): any;
    visitKeyedWrite(ast: KeyedWrite): any;
    visitLiteralArray(ast: LiteralArray): any;
    visitLiteralMap(ast: LiteralMap): any;
    visitLiteralPrimitive(ast: LiteralPrimitive): any;
    visitMethodCall(ast: MethodCall): any;
    visitPipe(ast: BindingPipe): any;
    visitPrefixNot(ast: PrefixNot): any;
    visitPropertyRead(ast: PropertyRead): any;
    visitPropertyWrite(ast: PropertyWrite): any;
    visitQuote(ast: Quote): any;
    visitSafeMethodCall(ast: SafeMethodCall): any;
    visitSafePropertyRead(ast: SafePropertyRead): any;
}
export class RecursiveAstVisitor implements AstVisitor {
    visitBinary(ast: Binary): any;
    visitChain(ast: Chain): any;
    visitConditional(ast: Conditional): any;
    visitPipe(ast: BindingPipe): any;
    visitFunctionCall(ast: FunctionCall): any;
    visitImplicitReceiver(ast: ImplicitReceiver): any;
    visitInterpolation(ast: Interpolation): any;
    visitKeyedRead(ast: KeyedRead): any;
    visitKeyedWrite(ast: KeyedWrite): any;
    visitLiteralArray(ast: LiteralArray): any;
    visitLiteralMap(ast: LiteralMap): any;
    visitLiteralPrimitive(ast: LiteralPrimitive): any;
    visitMethodCall(ast: MethodCall): any;
    visitPrefixNot(ast: PrefixNot): any;
    visitPropertyRead(ast: PropertyRead): any;
    visitPropertyWrite(ast: PropertyWrite): any;
    visitSafePropertyRead(ast: SafePropertyRead): any;
    visitSafeMethodCall(ast: SafeMethodCall): any;
    visitAll(asts: AST[]): any;
    visitQuote(ast: Quote): any;
}
export class AstTransformer implements AstVisitor {
    visitImplicitReceiver(ast: ImplicitReceiver): AST;
    visitInterpolation(ast: Interpolation): AST;
    visitLiteralPrimitive(ast: LiteralPrimitive): AST;
    visitPropertyRead(ast: PropertyRead): AST;
    visitPropertyWrite(ast: PropertyWrite): AST;
    visitSafePropertyRead(ast: SafePropertyRead): AST;
    visitMethodCall(ast: MethodCall): AST;
    visitSafeMethodCall(ast: SafeMethodCall): AST;
    visitFunctionCall(ast: FunctionCall): AST;
    visitLiteralArray(ast: LiteralArray): AST;
    visitLiteralMap(ast: LiteralMap): AST;
    visitBinary(ast: Binary): AST;
    visitPrefixNot(ast: PrefixNot): AST;
    visitConditional(ast: Conditional): AST;
    visitPipe(ast: BindingPipe): AST;
    visitKeyedRead(ast: KeyedRead): AST;
    visitKeyedWrite(ast: KeyedWrite): AST;
    visitAll(asts: any[]): any[];
    visitChain(ast: Chain): AST;
    visitQuote(ast: Quote): AST;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/parser/lexer.d.ts
declare module 'core/src/core/change_detection/parser/lexer' {
import { BaseException } from 'angular2/src/facade/exceptions';
export enum TokenType {
    Character = 0,
    Identifier = 1,
    Keyword = 2,
    String = 3,
    Operator = 4,
    Number = 5,
}
export class Lexer {
    tokenize(text: string): any[];
}
export class Token {
    index: number;
    type: TokenType;
    numValue: number;
    strValue: string;
    constructor(index: number, type: TokenType, numValue: number, strValue: string);
    isCharacter(code: number): boolean;
    isNumber(): boolean;
    isString(): boolean;
    isOperator(operater: string): boolean;
    isIdentifier(): boolean;
    isKeyword(): boolean;
    isKeywordVar(): boolean;
    isKeywordNull(): boolean;
    isKeywordUndefined(): boolean;
    isKeywordTrue(): boolean;
    isKeywordFalse(): boolean;
    toNumber(): number;
    toString(): string;
}
export var EOF: Token;
export const $EOF: number;
export const $TAB: number;
export const $LF: number;
export const $VTAB: number;
export const $FF: number;
export const $CR: number;
export const $SPACE: number;
export const $BANG: number;
export const $DQ: number;
export const $HASH: number;
export const $$: number;
export const $PERCENT: number;
export const $AMPERSAND: number;
export const $SQ: number;
export const $LPAREN: number;
export const $RPAREN: number;
export const $STAR: number;
export const $PLUS: number;
export const $COMMA: number;
export const $MINUS: number;
export const $PERIOD: number;
export const $SLASH: number;
export const $COLON: number;
export const $SEMICOLON: number;
export const $LT: number;
export const $EQ: number;
export const $GT: number;
export const $QUESTION: number;
export const $LBRACKET: number;
export const $BACKSLASH: number;
export const $RBRACKET: number;
export const $LBRACE: number;
export const $BAR: number;
export const $RBRACE: number;
export class ScannerError extends BaseException {
    message: any;
    constructor(message: any);
    toString(): string;
}
export function isIdentifier(input: string): boolean;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/parser/parser.d.ts
declare module 'core/src/core/change_detection/parser/parser' {
import { Lexer, Token } from 'core/src/core/change_detection/parser/lexer';
import { Reflector } from 'angular2/src/core/reflection/reflection';
import { AST, BindingPipe, LiteralMap, TemplateBinding, ASTWithSource } from 'core/src/core/change_detection/parser/ast';
export class Parser {
    /** @internal */ _lexer: Lexer;
    constructor(/** @internal */ _lexer: Lexer, providedReflector?: Reflector);
    parseAction(input: string, location: any): ASTWithSource;
    parseBinding(input: string, location: any): ASTWithSource;
    parseSimpleBinding(input: string, location: string): ASTWithSource;
    private _parseBindingAst(input, location);
    private _parseQuote(input, location);
    parseTemplateBindings(input: string, location: any): TemplateBinding[];
    parseInterpolation(input: string, location: any): ASTWithSource;
    wrapLiteralPrimitive(input: string, location: any): ASTWithSource;
    private _checkNoInterpolation(input, location);
    private _findInterpolationErrorColumn(parts, partInErrIdx);
}
export class _ParseAST {
    input: string;
    location: any;
    tokens: any[];
    reflector: Reflector;
    parseAction: boolean;
    index: number;
    constructor(input: string, location: any, tokens: any[], reflector: Reflector, parseAction: boolean);
    peek(offset: number): Token;
    next: Token;
    inputIndex: number;
    advance(): void;
    optionalCharacter(code: number): boolean;
    optionalKeywordVar(): boolean;
    peekKeywordVar(): boolean;
    expectCharacter(code: number): void;
    optionalOperator(op: string): boolean;
    expectOperator(operator: string): void;
    expectIdentifierOrKeyword(): string;
    expectIdentifierOrKeywordOrString(): string;
    parseChain(): AST;
    parsePipe(): AST;
    parseExpression(): AST;
    parseConditional(): AST;
    parseLogicalOr(): AST;
    parseLogicalAnd(): AST;
    parseEquality(): AST;
    parseRelational(): AST;
    parseAdditive(): AST;
    parseMultiplicative(): AST;
    parsePrefix(): AST;
    parseCallChain(): AST;
    parsePrimary(): AST;
    parseExpressionList(terminator: number): any[];
    parseLiteralMap(): LiteralMap;
    parseAccessMemberOrMethodCall(receiver: AST, isSafe?: boolean): AST;
    parseCallArguments(): BindingPipe[];
    parseBlockContent(): AST;
    /**
     * An identifier, a keyword, a string with an optional `-` inbetween.
     */
    expectTemplateBindingKey(): string;
    parseTemplateBindings(): any[];
    error(message: string, index?: number): void;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/parser/locals.d.ts
declare module 'core/src/core/change_detection/parser/locals' {
export class Locals {
    parent: Locals;
    current: Map<any, any>;
    constructor(parent: Locals, current: Map<any, any>);
    contains(name: string): boolean;
    get(name: string): any;
    set(name: string, value: any): void;
    clearLocalValues(): void;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/exceptions.d.ts
declare module 'core/src/core/change_detection/exceptions' {
import { BaseException, WrappedException } from 'angular2/src/facade/exceptions';
/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * This exception is only thrown in dev mode.
 *
 * <!-- TODO: Add a link once the dev mode option is configurable -->
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'parent',
 *   template: `
 *     <child [prop]="parentProp"></child>
 *   `,
 *   directives: [forwardRef(() => Child)]
 * })
 * class Parent {
 *   parentProp = "init";
 * }
 *
 * @Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   constructor(public parent: Parent) {}
 *
 *   set prop(v) {
 *     // this updates the parent property, which is disallowed during change detection
 *     // this will result in ExpressionChangedAfterItHasBeenCheckedException
 *     this.parent.parentProp = "updated";
 *   }
 * }
 * ```
 */
export class ExpressionChangedAfterItHasBeenCheckedException extends BaseException {
    constructor(exp: string, oldValue: any, currValue: any, context: any);
}
/**
 * Thrown when an expression evaluation raises an exception.
 *
 * This error wraps the original exception to attach additional contextual information that can
 * be useful for debugging.
 *
 * ### Example ([live demo](http://plnkr.co/edit/2Kywoz?p=preview))
 *
 * ```typescript
 * @Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   prop;
 * }
 *
 * @Component({
 *   selector: 'app',
 *   template: `
 *     <child [prop]="field.first"></child>
 *   `,
 *   directives: [Child]
 * })
 * class App {
 *   field = null;
 * }
 *
 * bootstrap(App);
 * ```
 *
 * You can access the original exception and stack through the `originalException` and
 * `originalStack` properties.
 */
export class ChangeDetectionError extends WrappedException {
    /**
     * Information about the expression that triggered the exception.
     */
    location: string;
    constructor(exp: string, originalException: any, originalStack: any, context: any);
}
/**
 * Thrown when change detector executes on dehydrated view.
 *
 * This error indicates a bug in the framework.
 *
 * This is an internal Angular error.
 */
export class DehydratedException extends BaseException {
    constructor(details: string);
}
/**
 * Wraps an exception thrown by an event handler.
 */
export class EventEvaluationError extends WrappedException {
    constructor(eventName: string, originalException: any, originalStack: any, context: any);
}
/**
 * Error context included when an event handler throws an exception.
 */
export class EventEvaluationErrorContext {
    element: any;
    componentElement: any;
    context: any;
    locals: any;
    injector: any;
    constructor(element: any, componentElement: any, context: any, locals: any, injector: any);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/interfaces.d.ts
declare module 'core/src/core/change_detection/interfaces' {
import { Locals } from 'core/src/core/change_detection/parser/locals';
import { BindingTarget, BindingRecord } from 'core/src/core/change_detection/binding_record';
import { DirectiveRecord, DirectiveIndex } from 'core/src/core/change_detection/directive_record';
import { ChangeDetectionStrategy } from 'core/src/core/change_detection/constants';
import { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
export class DebugContext {
    element: any;
    componentElement: any;
    directive: any;
    context: any;
    locals: any;
    injector: any;
    constructor(element: any, componentElement: any, directive: any, context: any, locals: any, injector: any);
}
export interface ChangeDispatcher {
    getDebugContext(appElement: any, elementIndex: number, directiveIndex: number): DebugContext;
    notifyOnBinding(bindingTarget: BindingTarget, value: any): void;
    logBindingUpdate(bindingTarget: BindingTarget, value: any): void;
    notifyAfterContentChecked(): void;
    notifyAfterViewChecked(): void;
    notifyOnDestroy(): void;
    getDetectorFor(directiveIndex: DirectiveIndex): ChangeDetector;
    getDirectiveFor(directiveIndex: DirectiveIndex): any;
}
export interface ChangeDetector {
    parent: ChangeDetector;
    mode: ChangeDetectionStrategy;
    ref: ChangeDetectorRef;
    addContentChild(cd: ChangeDetector): void;
    addViewChild(cd: ChangeDetector): void;
    removeContentChild(cd: ChangeDetector): void;
    removeViewChild(cd: ChangeDetector): void;
    remove(): void;
    hydrate(context: any, locals: Locals, dispatcher: ChangeDispatcher, pipes: any): void;
    dehydrate(): void;
    markPathToRootAsCheckOnce(): void;
    handleEvent(eventName: string, elIndex: number, event: any): any;
    detectChanges(): void;
    checkNoChanges(): void;
    destroyRecursive(): void;
    markAsCheckOnce(): void;
}
export interface ProtoChangeDetector {
    instantiate(): ChangeDetector;
}
export class ChangeDetectorGenConfig {
    genDebugInfo: boolean;
    logBindingUpdate: boolean;
    useJit: boolean;
    constructor(genDebugInfo: boolean, logBindingUpdate: boolean, useJit: boolean);
}
export class ChangeDetectorDefinition {
    id: string;
    strategy: ChangeDetectionStrategy;
    variableNames: string[];
    bindingRecords: BindingRecord[];
    eventRecords: BindingRecord[];
    directiveRecords: DirectiveRecord[];
    genConfig: ChangeDetectorGenConfig;
    constructor(id: string, strategy: ChangeDetectionStrategy, variableNames: string[], bindingRecords: BindingRecord[], eventRecords: BindingRecord[], directiveRecords: DirectiveRecord[], genConfig: ChangeDetectorGenConfig);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/constants.d.ts
declare module 'core/src/core/change_detection/constants' {
/**
 * Describes the current state of the change detector.
 */
export enum ChangeDetectorState {
    /**
     * `NeverChecked` means that the change detector has not been checked yet, and
     * initialization methods should be called during detection.
     */
    NeverChecked = 0,
    /**
     * `CheckedBefore` means that the change detector has successfully completed at least
     * one detection previously.
     */
    CheckedBefore = 1,
    /**
     * `Errored` means that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state will no longer detect changes.
     */
    Errored = 2,
}
/**
 * Describes within the change detector which strategy will be used the next time change
 * detection is triggered.
 */
export enum ChangeDetectionStrategy {
    /**
     * `CheckedOnce` means that after calling detectChanges the mode of the change detector
     * will become `Checked`.
     */
    CheckOnce = 0,
    /**
     * `Checked` means that the change detector should be skipped until its mode changes to
     * `CheckOnce`.
     */
    Checked = 1,
    /**
     * `CheckAlways` means that after calling detectChanges the mode of the change detector
     * will remain `CheckAlways`.
     */
    CheckAlways = 2,
    /**
     * `Detached` means that the change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    Detached = 3,
    /**
     * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
     */
    OnPush = 4,
    /**
     * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
     */
    Default = 5,
}
/**
 * List of possible {@link ChangeDetectionStrategy} values.
 */
export var CHANGE_DETECTION_STRATEGY_VALUES: ChangeDetectionStrategy[];
/**
 * List of possible {@link ChangeDetectorState} values.
 */
export var CHANGE_DETECTOR_STATE_VALUES: ChangeDetectorState[];
export function isDefaultChangeDetectionStrategy(changeDetectionStrategy: ChangeDetectionStrategy): boolean;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/event_binding.d.ts
declare module 'core/src/core/change_detection/event_binding' {
import { DirectiveIndex } from 'core/src/core/change_detection/directive_record';
import { ProtoRecord } from 'core/src/core/change_detection/proto_record';
export class EventBinding {
    eventName: string;
    elIndex: number;
    dirIndex: DirectiveIndex;
    records: ProtoRecord[];
    constructor(eventName: string, elIndex: number, dirIndex: DirectiveIndex, records: ProtoRecord[]);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/proto_record.d.ts
declare module 'core/src/core/change_detection/proto_record' {
import { BindingRecord } from 'core/src/core/change_detection/binding_record';
import { DirectiveIndex } from 'core/src/core/change_detection/directive_record';
export enum RecordType {
    Self = 0,
    Const = 1,
    PrimitiveOp = 2,
    PropertyRead = 3,
    PropertyWrite = 4,
    Local = 5,
    InvokeMethod = 6,
    InvokeClosure = 7,
    KeyedRead = 8,
    KeyedWrite = 9,
    Pipe = 10,
    Interpolate = 11,
    SafeProperty = 12,
    CollectionLiteral = 13,
    SafeMethodInvoke = 14,
    DirectiveLifecycle = 15,
    Chain = 16,
    SkipRecordsIf = 17,
    SkipRecordsIfNot = 18,
    SkipRecords = 19,
}
export class ProtoRecord {
    mode: RecordType;
    name: string;
    funcOrValue: any;
    args: any[];
    fixedArgs: any[];
    contextIndex: number;
    directiveIndex: DirectiveIndex;
    selfIndex: number;
    bindingRecord: BindingRecord;
    lastInBinding: boolean;
    lastInDirective: boolean;
    argumentToPureFunction: boolean;
    referencedBySelf: boolean;
    propertyBindingIndex: number;
    constructor(mode: RecordType, name: string, funcOrValue: any, args: any[], fixedArgs: any[], contextIndex: number, directiveIndex: DirectiveIndex, selfIndex: number, bindingRecord: BindingRecord, lastInBinding: boolean, lastInDirective: boolean, argumentToPureFunction: boolean, referencedBySelf: boolean, propertyBindingIndex: number);
    isPureFunction(): boolean;
    isUsedByOtherRecord(): boolean;
    shouldBeChecked(): boolean;
    isPipeRecord(): boolean;
    isConditionalSkipRecord(): boolean;
    isUnconditionalSkipRecord(): boolean;
    isSkipRecord(): boolean;
    isLifeCycleRecord(): boolean;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/proto_change_detector.d.ts
declare module 'core/src/core/change_detection/proto_change_detector' {
import { ChangeDetector, ProtoChangeDetector, ChangeDetectorDefinition } from 'core/src/core/change_detection/interfaces';
import { BindingRecord } from 'core/src/core/change_detection/binding_record';
import { EventBinding } from 'core/src/core/change_detection/event_binding';
import { ProtoRecord } from 'core/src/core/change_detection/proto_record';
export class DynamicProtoChangeDetector implements ProtoChangeDetector {
    private _definition;
    constructor(_definition: ChangeDetectorDefinition);
    instantiate(): ChangeDetector;
}
export function createPropertyRecords(definition: ChangeDetectorDefinition): ProtoRecord[];
export function createEventRecords(definition: ChangeDetectorDefinition): EventBinding[];
export class ProtoRecordBuilder {
    records: ProtoRecord[];
    add(b: BindingRecord, variableNames: string[], bindingIndex: number): void;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/jit_proto_change_detector.d.ts
declare module 'core/src/core/change_detection/jit_proto_change_detector' {
import { ProtoChangeDetector, ChangeDetector, ChangeDetectorDefinition } from 'core/src/core/change_detection/interfaces';
export class JitProtoChangeDetector implements ProtoChangeDetector {
    private definition;
    constructor(definition: ChangeDetectorDefinition);
    static isSupported(): boolean;
    instantiate(): ChangeDetector;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/binding_record.d.ts
declare module 'core/src/core/change_detection/binding_record' {
import { SetterFn } from 'angular2/src/core/reflection/types';
import { AST } from 'core/src/core/change_detection/parser/ast';
import { DirectiveIndex, DirectiveRecord } from 'core/src/core/change_detection/directive_record';
export class BindingTarget {
    mode: string;
    elementIndex: number;
    name: string;
    unit: string;
    debug: string;
    constructor(mode: string, elementIndex: number, name: string, unit: string, debug: string);
    isDirective(): boolean;
    isElementProperty(): boolean;
    isElementAttribute(): boolean;
    isElementClass(): boolean;
    isElementStyle(): boolean;
    isTextNode(): boolean;
}
export class BindingRecord {
    mode: string;
    target: BindingTarget;
    implicitReceiver: any;
    ast: AST;
    setter: SetterFn;
    lifecycleEvent: string;
    directiveRecord: DirectiveRecord;
    constructor(mode: string, target: BindingTarget, implicitReceiver: any, ast: AST, setter: SetterFn, lifecycleEvent: string, directiveRecord: DirectiveRecord);
    isDirectiveLifecycle(): boolean;
    callOnChanges(): boolean;
    isDefaultChangeDetection(): boolean;
    static createDirectiveDoCheck(directiveRecord: DirectiveRecord): BindingRecord;
    static createDirectiveOnInit(directiveRecord: DirectiveRecord): BindingRecord;
    static createDirectiveOnChanges(directiveRecord: DirectiveRecord): BindingRecord;
    static createForDirective(ast: AST, propertyName: string, setter: SetterFn, directiveRecord: DirectiveRecord): BindingRecord;
    static createForElementProperty(ast: AST, elementIndex: number, propertyName: string): BindingRecord;
    static createForElementAttribute(ast: AST, elementIndex: number, attributeName: string): BindingRecord;
    static createForElementClass(ast: AST, elementIndex: number, className: string): BindingRecord;
    static createForElementStyle(ast: AST, elementIndex: number, styleName: string, unit: string): BindingRecord;
    static createForHostProperty(directiveIndex: DirectiveIndex, ast: AST, propertyName: string): BindingRecord;
    static createForHostAttribute(directiveIndex: DirectiveIndex, ast: AST, attributeName: string): BindingRecord;
    static createForHostClass(directiveIndex: DirectiveIndex, ast: AST, className: string): BindingRecord;
    static createForHostStyle(directiveIndex: DirectiveIndex, ast: AST, styleName: string, unit: string): BindingRecord;
    static createForTextNode(ast: AST, elementIndex: number): BindingRecord;
    static createForEvent(ast: AST, eventName: string, elementIndex: number): BindingRecord;
    static createForHostEvent(ast: AST, eventName: string, directiveRecord: DirectiveRecord): BindingRecord;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/directive_record.d.ts
declare module 'core/src/core/change_detection/directive_record' {
import { ChangeDetectionStrategy } from 'core/src/core/change_detection/constants';
export class DirectiveIndex {
    elementIndex: number;
    directiveIndex: number;
    constructor(elementIndex: number, directiveIndex: number);
    name: string;
}
export class DirectiveRecord {
    directiveIndex: DirectiveIndex;
    callAfterContentInit: boolean;
    callAfterContentChecked: boolean;
    callAfterViewInit: boolean;
    callAfterViewChecked: boolean;
    callOnChanges: boolean;
    callDoCheck: boolean;
    callOnInit: boolean;
    callOnDestroy: boolean;
    changeDetection: ChangeDetectionStrategy;
    outputs: string[][];
    constructor({directiveIndex, callAfterContentInit, callAfterContentChecked, callAfterViewInit, callAfterViewChecked, callOnChanges, callDoCheck, callOnInit, callOnDestroy, changeDetection, outputs}?: {
        directiveIndex?: DirectiveIndex;
        callAfterContentInit?: boolean;
        callAfterContentChecked?: boolean;
        callAfterViewInit?: boolean;
        callAfterViewChecked?: boolean;
        callOnChanges?: boolean;
        callDoCheck?: boolean;
        callOnInit?: boolean;
        callOnDestroy?: boolean;
        changeDetection?: ChangeDetectionStrategy;
        outputs?: string[][];
    });
    isDefaultChangeDetection(): boolean;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/abstract_change_detector.d.ts
declare module 'core/src/core/change_detection/abstract_change_detector' {
import { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
import { DirectiveIndex } from 'core/src/core/change_detection/directive_record';
import { ChangeDetector, ChangeDispatcher } from 'core/src/core/change_detection/interfaces';
import { Pipes } from 'core/src/core/change_detection/pipes';
import { BindingTarget } from 'core/src/core/change_detection/binding_record';
import { Locals } from 'core/src/core/change_detection/parser/locals';
import { ChangeDetectionStrategy, ChangeDetectorState } from 'core/src/core/change_detection/constants';
export class AbstractChangeDetector<T> implements ChangeDetector {
    id: string;
    numberOfPropertyProtoRecords: number;
    bindingTargets: BindingTarget[];
    directiveIndices: DirectiveIndex[];
    strategy: ChangeDetectionStrategy;
    contentChildren: any[];
    viewChildren: any[];
    parent: ChangeDetector;
    ref: ChangeDetectorRef;
    state: ChangeDetectorState;
    context: T;
    locals: Locals;
    mode: ChangeDetectionStrategy;
    pipes: Pipes;
    propertyBindingIndex: number;
    outputSubscriptions: any[];
    dispatcher: ChangeDispatcher;
    constructor(id: string, numberOfPropertyProtoRecords: number, bindingTargets: BindingTarget[], directiveIndices: DirectiveIndex[], strategy: ChangeDetectionStrategy);
    addContentChild(cd: ChangeDetector): void;
    removeContentChild(cd: ChangeDetector): void;
    addViewChild(cd: ChangeDetector): void;
    removeViewChild(cd: ChangeDetector): void;
    remove(): void;
    handleEvent(eventName: string, elIndex: number, event: any): boolean;
    handleEventInternal(eventName: string, elIndex: number, locals: Locals): boolean;
    detectChanges(): void;
    checkNoChanges(): void;
    runDetectChanges(throwOnChange: boolean): void;
    detectChangesInRecords(throwOnChange: boolean): void;
    detectChangesInRecordsInternal(throwOnChange: boolean): void;
    hydrate(context: T, locals: Locals, dispatcher: ChangeDispatcher, pipes: Pipes): void;
    hydrateDirectives(dispatcher: ChangeDispatcher): void;
    dehydrate(): void;
    dehydrateDirectives(destroyPipes: boolean): void;
    hydrated(): boolean;
    destroyRecursive(): void;
    afterContentLifecycleCallbacks(): void;
    afterContentLifecycleCallbacksInternal(): void;
    afterViewLifecycleCallbacks(): void;
    afterViewLifecycleCallbacksInternal(): void;
    markAsCheckOnce(): void;
    markPathToRootAsCheckOnce(): void;
    private _unsubscribeFromOutputs();
    getDirectiveFor(directives: any, index: number): any;
    getDetectorFor(directives: any, index: number): ChangeDetector;
    notifyDispatcher(value: any): void;
    logBindingUpdate(value: any): void;
    addChange(changes: {
        [key: string]: any;
    }, oldValue: any, newValue: any): {
        [key: string]: any;
    };
    private _throwError(exception, stack);
    throwOnChangeError(oldValue: any, newValue: any): void;
    throwDehydratedError(detail: string): void;
    private _currentBinding();
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/dynamic_change_detector.d.ts
declare module 'core/src/core/change_detection/dynamic_change_detector' {
import { AbstractChangeDetector } from 'core/src/core/change_detection/abstract_change_detector';
import { EventBinding } from 'core/src/core/change_detection/event_binding';
import { BindingTarget } from 'core/src/core/change_detection/binding_record';
import { DirectiveRecord, DirectiveIndex } from 'core/src/core/change_detection/directive_record';
import { Locals } from 'core/src/core/change_detection/parser/locals';
import { ChangeDispatcher, ChangeDetectorGenConfig } from 'core/src/core/change_detection/interfaces';
import { ChangeDetectionStrategy } from 'core/src/core/change_detection/constants';
import { ProtoRecord } from 'core/src/core/change_detection/proto_record';
export class DynamicChangeDetector extends AbstractChangeDetector<any> {
    private _records;
    private _eventBindings;
    private _directiveRecords;
    private _genConfig;
    values: any[];
    changes: any[];
    localPipes: any[];
    prevContexts: any[];
    constructor(id: string, numberOfPropertyProtoRecords: number, propertyBindingTargets: BindingTarget[], directiveIndices: DirectiveIndex[], strategy: ChangeDetectionStrategy, _records: ProtoRecord[], _eventBindings: EventBinding[], _directiveRecords: DirectiveRecord[], _genConfig: ChangeDetectorGenConfig);
    handleEventInternal(eventName: string, elIndex: number, locals: Locals): boolean;
    private _computeSkipLength(protoIndex, proto, values);
    hydrateDirectives(dispatcher: ChangeDispatcher): void;
    private _createEventHandler(boundElementIndex, eventName);
    dehydrateDirectives(destroyPipes: boolean): void;
    checkNoChanges(): void;
    detectChangesInRecordsInternal(throwOnChange: boolean): void;
    afterContentLifecycleCallbacksInternal(): void;
    afterViewLifecycleCallbacksInternal(): void;
    private _calculateCurrValue(proto, values, locals);
    private _pipeCheck(proto, throwOnChange, values);
    private _pipeFor(proto, context);
    private _readContext(proto, values);
    private _readSelf(proto, values);
    private _writeSelf(proto, value, values);
    private _readPipe(proto);
    private _writePipe(proto, value);
    private _setChanged(proto, value);
    private _pureFuncAndArgsDidNotChange(proto);
    private _argsChanged(proto);
    private _argsOrContextChanged(proto);
    private _readArgs(proto, values);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/pipe_transform.d.ts
declare module 'core/src/core/change_detection/pipe_transform' {
/**
 * To create a Pipe, you must implement this interface.
 *
 * Angular invokes the `transform` method with the value of a binding
 * as the first argument, and any parameters as the second argument in list form.
 *
 * ## Syntax
 *
 * `value | pipeName[:arg0[:arg1...]]`
 *
 * ### Example ([live demo](http://plnkr.co/edit/f5oyIked9M2cKzvZNKHV?p=preview))
 *
 * The `RepeatPipe` below repeats the value as many times as indicated by the first argument:
 *
 * ```
 * import {Pipe, PipeTransform} from 'angular2/core';
 *
 * @Pipe({name: 'repeat'})
 * export class RepeatPipe implements PipeTransform {
 *   transform(value: any, args: any[] = []) {
 *     if (args.length == 0) {
 *       throw new Error('repeat pipe requires one argument');
 *     }
 *     let times: number = args[0];
 *     return value.repeat(times);
 *   }
 * }
 * ```
 *
 * Invoking `{{ 'ok' | repeat:3 }}` in a template produces `okokok`.
 *
 */
export interface PipeTransform {
    transform(value: any, args: any[]): any;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/pipes.d.ts
declare module 'core/src/core/change_detection/pipes' {
import { PipeTransform } from 'core/src/core/change_detection/pipe_transform';
export interface Pipes {
    get(name: string): SelectedPipe;
}
export class SelectedPipe {
    pipe: PipeTransform;
    pure: boolean;
    constructor(pipe: PipeTransform, pure: boolean);
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/change_detection_util.d.ts
declare module 'core/src/core/change_detection/change_detection_util' {
import { ProtoRecord } from 'core/src/core/change_detection/proto_record';
import { ChangeDetectionStrategy } from 'core/src/core/change_detection/constants';
import { BindingTarget } from 'core/src/core/change_detection/binding_record';
import { DirectiveIndex } from 'core/src/core/change_detection/directive_record';
import { SelectedPipe } from 'core/src/core/change_detection/pipes';
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 */
export class WrappedValue {
    wrapped: any;
    constructor(wrapped: any);
    static wrap(value: any): WrappedValue;
}
/**
 * Represents a basic change from a previous to a new value.
 */
export class SimpleChange {
    previousValue: any;
    currentValue: any;
    constructor(previousValue: any, currentValue: any);
    /**
     * Check whether the new value is the first value assigned.
     */
    isFirstChange(): boolean;
}
export class ChangeDetectionUtil {
    static uninitialized: Object;
    static arrayFn0(): any[];
    static arrayFn1(a1: any): any[];
    static arrayFn2(a1: any, a2: any): any[];
    static arrayFn3(a1: any, a2: any, a3: any): any[];
    static arrayFn4(a1: any, a2: any, a3: any, a4: any): any[];
    static arrayFn5(a1: any, a2: any, a3: any, a4: any, a5: any): any[];
    static arrayFn6(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any): any[];
    static arrayFn7(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any): any[];
    static arrayFn8(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any): any[];
    static arrayFn9(a1: any, a2: any, a3: any, a4: any, a5: any, a6: any, a7: any, a8: any, a9: any): any[];
    static operation_negate(value: any): any;
    static operation_add(left: any, right: any): any;
    static operation_subtract(left: any, right: any): any;
    static operation_multiply(left: any, right: any): any;
    static operation_divide(left: any, right: any): any;
    static operation_remainder(left: any, right: any): any;
    static operation_equals(left: any, right: any): any;
    static operation_not_equals(left: any, right: any): any;
    static operation_identical(left: any, right: any): any;
    static operation_not_identical(left: any, right: any): any;
    static operation_less_then(left: any, right: any): any;
    static operation_greater_then(left: any, right: any): any;
    static operation_less_or_equals_then(left: any, right: any): any;
    static operation_greater_or_equals_then(left: any, right: any): any;
    static cond(cond: any, trueVal: any, falseVal: any): any;
    static mapFn(keys: any[]): any;
    static keyedAccess(obj: any, args: any): any;
    static unwrapValue(value: any): any;
    static changeDetectionMode(strategy: ChangeDetectionStrategy): ChangeDetectionStrategy;
    static simpleChange(previousValue: any, currentValue: any): SimpleChange;
    static isValueBlank(value: any): boolean;
    static s(value: any): string;
    static protoByIndex(protos: ProtoRecord[], selfIndex: number): ProtoRecord;
    static callPipeOnDestroy(selectedPipe: SelectedPipe): void;
    static bindingTarget(mode: string, elementIndex: number, name: string, unit: string, debug: string): BindingTarget;
    static directiveIndex(elementIndex: number, directiveIndex: number): DirectiveIndex;
    static looseNotIdentical(a: any, b: any): boolean;
    static devModeEqual(a: any, b: any): boolean;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection/change_detection.d.ts
declare module 'core/src/core/change_detection/change_detection' {
import { IterableDiffers, IterableDifferFactory } from 'core/src/core/change_detection/differs/iterable_differs';
import { KeyValueDiffers, KeyValueDifferFactory } from 'core/src/core/change_detection/differs/keyvalue_differs';
export { DefaultKeyValueDifferFactory, KeyValueChangeRecord } from 'core/src/core/change_detection/differs/default_keyvalue_differ';
export { DefaultIterableDifferFactory, CollectionChangeRecord } from 'core/src/core/change_detection/differs/default_iterable_differ';
export { ASTWithSource, AST, AstTransformer, PropertyRead, LiteralArray, ImplicitReceiver } from 'core/src/core/change_detection/parser/ast';
export { Lexer } from 'core/src/core/change_detection/parser/lexer';
export { Parser } from 'core/src/core/change_detection/parser/parser';
export { Locals } from 'core/src/core/change_detection/parser/locals';
export { DehydratedException, ExpressionChangedAfterItHasBeenCheckedException, ChangeDetectionError } from 'core/src/core/change_detection/exceptions';
export { ProtoChangeDetector, ChangeDetector, ChangeDispatcher, ChangeDetectorDefinition, DebugContext, ChangeDetectorGenConfig } from 'core/src/core/change_detection/interfaces';
export { ChangeDetectionStrategy, CHANGE_DETECTION_STRATEGY_VALUES } from 'core/src/core/change_detection/constants';
export { DynamicProtoChangeDetector } from 'core/src/core/change_detection/proto_change_detector';
export { JitProtoChangeDetector } from 'core/src/core/change_detection/jit_proto_change_detector';
export { BindingRecord, BindingTarget } from 'core/src/core/change_detection/binding_record';
export { DirectiveIndex, DirectiveRecord } from 'core/src/core/change_detection/directive_record';
export { DynamicChangeDetector } from 'core/src/core/change_detection/dynamic_change_detector';
export { ChangeDetectorRef } from 'core/src/core/change_detection/change_detector_ref';
export { IterableDiffers, IterableDiffer, IterableDifferFactory, TrackByFn } from 'core/src/core/change_detection/differs/iterable_differs';
export { KeyValueDiffers, KeyValueDiffer, KeyValueDifferFactory } from 'core/src/core/change_detection/differs/keyvalue_differs';
export { PipeTransform } from 'core/src/core/change_detection/pipe_transform';
export { WrappedValue, SimpleChange } from 'core/src/core/change_detection/change_detection_util';
/**
 * Structural diffing for `Object`s and `Map`s.
 */
export const keyValDiff: KeyValueDifferFactory[];
/**
 * Structural diffing for `Iterable` types such as `Array`s.
 */
export const iterableDiff: IterableDifferFactory[];
export const defaultIterableDiffers: IterableDiffers;
export const defaultKeyValueDiffers: KeyValueDiffers;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/change_detection.d.ts
declare module 'core/src/core/change_detection' {
/**
 * @module
 * @description
 * Change detection enables data binding in Angular.
 */
export { ChangeDetectionStrategy, ExpressionChangedAfterItHasBeenCheckedException, ChangeDetectionError, ChangeDetectorRef, WrappedValue, SimpleChange, PipeTransform, IterableDiffers, IterableDiffer, IterableDifferFactory, KeyValueDiffers, KeyValueDiffer, KeyValueDifferFactory, CollectionChangeRecord, KeyValueChangeRecord, TrackByFn } from 'core/src/core/change_detection/change_detection';
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/platform_directives_and_pipes.d.ts
declare module 'core/src/core/platform_directives_and_pipes' {
import { OpaqueToken } from 'angular2/src/core/di';
/**
 * A token that can be provided when bootstraping an application to make an array of directives
 * available in every component of the application.
 *
 * ### Example
 *
 * ```typescript
 * import {PLATFORM_DIRECTIVES} from 'angular2/core';
 * import {OtherDirective} from './myDirectives';
 *
 * @Component({
 *   selector: 'my-component',
 *   template: `
 *     <!-- can use other directive even though the component does not list it in `directives` -->
 *     <other-directive></other-directive>
 *   `
 * })
 * export class MyComponent {
 *   ...
 * }
 *
 * bootstrap(MyComponent, [provide(PLATFORM_DIRECTIVES, {useValue: [OtherDirective], multi:true})]);
 * ```
 */
export const PLATFORM_DIRECTIVES: OpaqueToken;
/**
 * A token that can be provided when bootstraping an application to make an array of pipes
 * available in every component of the application.
 *
 * ### Example
 *
 * ```typescript
 * import {PLATFORM_PIPES} from 'angular2/core';
 * import {OtherPipe} from './myPipe';
 *
 * @Component({
 *   selector: 'my-component',
 *   template: `
 *     {{123 | other-pipe}}
 *   `
 * })
 * export class MyComponent {
 *   ...
 * }
 *
 * bootstrap(MyComponent, [provide(PLATFORM_PIPES, {useValue: [OtherPipe], multi:true})]);
 * ```
 */
export const PLATFORM_PIPES: OpaqueToken;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/platform_common_providers.d.ts
declare module 'core/src/core/platform_common_providers' {
import { Type } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
/**
 * A default set of providers which should be included in any Angular platform.
 */
export const PLATFORM_COMMON_PROVIDERS: Array<Type | Provider | any[]>;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/application_common_providers.d.ts
declare module 'core/src/core/application_common_providers' {
import { Type } from 'angular2/src/facade/lang';
import { Provider } from 'angular2/src/core/di';
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 */
export const APPLICATION_COMMON_PROVIDERS: Array<Type | Provider | any[]>;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/reflection/types.d.ts
declare module 'core/src/core/reflection/types' {
export type SetterFn = (obj: any, value: any) => void;
export type GetterFn = (obj: any) => any;
export type MethodFn = (obj: any, args: any[]) => any;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/reflection/platform_reflection_capabilities.d.ts
declare module 'core/src/core/reflection/platform_reflection_capabilities' {
import { Type } from 'angular2/src/facade/lang';
import { GetterFn, SetterFn, MethodFn } from 'core/src/core/reflection/types';
export interface PlatformReflectionCapabilities {
    isReflectionEnabled(): boolean;
    factory(type: Type): Function;
    interfaces(type: Type): any[];
    parameters(type: any): any[][];
    annotations(type: any): any[];
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    importUri(type: Type): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/reflection/reflector.d.ts
declare module 'core/src/core/reflection/reflector' {
import { Type } from 'angular2/src/facade/lang';
import { SetterFn, GetterFn, MethodFn } from 'core/src/core/reflection/types';
import { PlatformReflectionCapabilities } from 'core/src/core/reflection/platform_reflection_capabilities';
export { SetterFn, GetterFn, MethodFn } from 'core/src/core/reflection/types';
export { PlatformReflectionCapabilities } from 'core/src/core/reflection/platform_reflection_capabilities';
/**
 * Reflective information about a symbol, including annotations, interfaces, and other metadata.
 */
export class ReflectionInfo {
    annotations: any[];
    parameters: any[][];
    factory: Function;
    interfaces: any[];
    propMetadata: {
        [key: string]: any[];
    };
    constructor(annotations?: any[], parameters?: any[][], factory?: Function, interfaces?: any[], propMetadata?: {
        [key: string]: any[];
    });
}
/**
 * Provides access to reflection data about symbols. Used internally by Angular
 * to power dependency injection and compilation.
 */
export class Reflector {
    reflectionCapabilities: PlatformReflectionCapabilities;
    constructor(reflectionCapabilities: PlatformReflectionCapabilities);
    isReflectionEnabled(): boolean;
    /**
     * Causes `this` reflector to track keys used to access
     * {@link ReflectionInfo} objects.
     */
    trackUsage(): void;
    /**
     * Lists types for which reflection information was not requested since
     * {@link #trackUsage} was called. This list could later be audited as
     * potential dead code.
     */
    listUnusedKeys(): any[];
    registerFunction(func: Function, funcInfo: ReflectionInfo): void;
    registerType(type: Type, typeInfo: ReflectionInfo): void;
    registerGetters(getters: {
        [key: string]: GetterFn;
    }): void;
    registerSetters(setters: {
        [key: string]: SetterFn;
    }): void;
    registerMethods(methods: {
        [key: string]: MethodFn;
    }): void;
    factory(type: Type): Function;
    parameters(typeOrFunc: any): any[];
    annotations(typeOrFunc: any): any[];
    propMetadata(typeOrFunc: any): {
        [key: string]: any[];
    };
    interfaces(type: Type): any[];
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    importUri(type: Type): string;
}
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/src/core/reflection/reflection.d.ts
declare module 'core/src/core/reflection/reflection' {
import { Reflector } from 'core/src/core/reflection/reflector';
export { Reflector, ReflectionInfo } from 'core/src/core/reflection/reflector';
/**
 * The {@link Reflector} used internally in Angular to access metadata
 * about symbols.
 */
export var reflector: Reflector;
}

// Compiled using typings@0.6.9
// Source: jspm_packages/npm/angular2@2.0.0-beta.9/core.d.ts
declare module 'core' {
/**
 * @module
 * @description
 * Starting point to import all public core APIs.
 */
export * from 'core/src/core/metadata';
export * from 'core/src/core/util';
export * from 'core/src/core/prod_mode';
export * from 'core/src/core/di';
export * from 'core/src/facade/facade';
export { enableProdMode } from 'angular2/src/facade/lang';
export { platform, createNgZone, PlatformRef, ApplicationRef } from 'core/src/core/application_ref';
export { APP_ID, APP_COMPONENT, APP_INITIALIZER, PACKAGE_ROOT_URL, PLATFORM_INITIALIZER } from 'core/src/core/application_tokens';
export * from 'core/src/core/zone';
export * from 'core/src/core/render';
export * from 'core/src/core/linker';
export { DebugElement, DebugNode, asNativeElements } from 'core/src/core/debug/debug_node';
export * from 'core/src/core/testability/testability';
export * from 'core/src/core/change_detection';
export * from 'core/src/core/platform_directives_and_pipes';
export * from 'core/src/core/platform_common_providers';
export * from 'core/src/core/application_common_providers';
export * from 'core/src/core/reflection/reflection';
}