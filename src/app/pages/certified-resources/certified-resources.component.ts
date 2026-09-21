import { Component } from '@angular/core';

@Component({
  selector: 'app-certified-resources',
  standalone: true,
  imports: [],
  templateUrl: './certified-resources.component.html',
  styleUrl: './certified-resources.component.scss'
})
export class CertifiedResourcesComponent {
  /** Visual row-major order matching live 4-column layout. */
  readonly badges = [
    'net.png',
    'angular.png',
    'c.png',
    'ccnp.png',
    'hcie.png',
    'certification-itil.png',
    'hcnp.png',
    'Java.png',
    'microsoft.png',
    'microsoft-certified-professional.png',
    'node-js.png',
    'oracal.png',
    'pmi-certified.png',
    'python.png',
    'rails.png',
    'react-js.png',
    'vmware-certified.png',
    'vpen.png',
    'ccie.png'
  ].map((file) => `assets/images/certified/${file}`);
}
