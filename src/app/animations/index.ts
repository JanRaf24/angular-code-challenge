import { animate, query, stagger, state, style, transition, trigger } from '@angular/animations';

/**
 * Fades in and slides the element upward
 */
export function fadeInUpTrigger(name: string = 'fadeInUp', duration = '500ms') {
  return trigger(name, [
    transition(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      animate(`${duration} ease-out`, style({ opacity: 1, transform: 'translateY(0)' }))
    ])
  ]);
}

/**
 * Slides the element in from the right
 */
export function slideInRightTrigger(name: string = 'slideInRight', duration = '400ms') {
  return trigger(name, [
    state('noAnimation', style({opacity: 1, transform: 'translateX(0)'})),
    state('animate', style({opacity: 1, transform: 'translateX(0)' })),
    transition('void => animate', [
      style({ opacity: 0, transform: 'translateX(100px)' }),
      animate(`${duration} ease-out`, style({ opacity: 1, transform: 'translateX(0)' }))
    ]),
    transition('animate => void', [
      animate(`${duration} ease-in`, style({ opacity: 0, transform: 'translateX(100px)' }))
    ]),
    transition(':leave', [
      animate(`${duration} ease-in`, style({ opacity: 0, transform: 'translateX(100px)' }))
    ])
  ]);
}

/**
 * Zoom in animation with fade
 */
export function zoomInTrigger(name: string = 'zoomIn', duration = '400ms') {
  return trigger(name, [
    transition(':enter', [
      style({ opacity: 0, transform: 'scale(0.95)' }),
      animate(`${duration} ease-out`, style({ opacity: 1, transform: 'scale(1)' }))
    ]),
    transition(':leave', [
      animate(`${duration} ease-in`, style({ opacity: 0, transform: 'scale(0.8)' }))
    ])
  ]);
}

/**
 * Stagger cards for animation
 */
export function staggeredCardTrigger(name: string = 'staggerCards', timings: number = 100, duration = '400ms') {
  return trigger('staggerCards', [
    transition(':enter', [
      query('.card', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger(timings, [
          animate(`${duration} ease-out`, style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ], { optional: true })
    ])
  ]);
}