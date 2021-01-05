import { Directive, ViewContainerRef, ComponentFactory, ComponentRef, Input, ComponentFactoryResolver, TemplateRef, OnDestroy, Renderer2 } from '@angular/core';
import { LoadingComponent } from './loading.component';

@Directive({
	selector: '[appLoading]'
})
export class LoadingDirective implements OnDestroy {
	private loadingComponent: ComponentRef<LoadingComponent>;

	@Input('appLoading') set loading(loading: boolean) {
		loading ? this.createLoading() : this.destroyLoading();
	}

	constructor(
		private vcRef: ViewContainerRef,
		private renderer: Renderer2,
		private componentFactoryResolver: ComponentFactoryResolver,

	) {	}

	public createLoading(): void {
		const loadingComponentFactotry = this.componentFactoryResolver.resolveComponentFactory(LoadingComponent);
		this.loadingComponent = this.vcRef.createComponent(loadingComponentFactotry);
		this.renderer.appendChild(
			this.vcRef.element.nativeElement,
			this.loadingComponent.injector.get(LoadingComponent).vcRef.element.nativeElement
		);
	}

	public destroyLoading(): void {
		if (this.loadingComponent) {
			this.loadingComponent.destroy();
		}
	}

	public ngOnDestroy(): void { this.destroyLoading(); }
}
