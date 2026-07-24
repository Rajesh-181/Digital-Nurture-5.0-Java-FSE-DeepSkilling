import { CanDeactivateFn } from '@angular/router';

// Component interface definition that components can implement
// to allow generic unsaved-change checks, or we can target the component class directly.
export interface HasUnsavedChanges {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) => {
  // Call the component's own canDeactivate function if it exists
  if (component && component.canDeactivate) {
    return component.canDeactivate();
  }
  return true;
};
