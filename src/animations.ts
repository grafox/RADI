import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  // Transition between any two states
  transition('* <=> *', [
    // Events to apply before animations start
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      })
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' })
    ], { optional: true }),
    
    // Animate both pages in parallel
    group([
      query(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms 150ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ], { optional: true }),
    ]),
  ]),
]);
