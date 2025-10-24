import { Injectable, signal } from '@angular/core';
import { Service } from '../models/service.model';

const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    name: 'Smartphones',
    description: 'Screen replacements, battery swaps, and water damage repair for all major brands.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>`
  },
  {
    id: '2',
    name: 'Laptops & PCs',
    description: 'Hardware upgrades, OS troubleshooting, virus removal, and component-level board repair.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25Z" /></svg>`
  },
  {
    id: '3',
    name: 'Game Consoles',
    description: 'Fixing "red ring of death", HDMI port replacement, and disk drive errors on all consoles.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" /></svg>`
  },
  {
    id: '4',
    name: 'Audio Equipment',
    description: 'Repairing headphones, speakers, and amplifiers. Specializing in vintage audio gear.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" /></svg>`
  },
  {
    id: '5',
    name: 'Custom Electronics',
    description: 'Prototyping, custom modifications, and repair of unique or hobbyist electronic projects.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.055 15.055 0 0 1-4.5 0m4.5 0v-.334c0-.627-.504-1.131-1.131-1.131h-2.538c-.627 0-1.131.504-1.131 1.131v.334m4.5 0a12.059 12.059 0 0 0-4.5 0" /></svg>`
  }
];

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private services = signal<Service[]>(MOCK_SERVICES);

  getServices() {
    return this.services.asReadonly();
  }

  getServiceById(id: string) {
    return this.services().find(s => s.id === id);
  }

  addService(service: Omit<Service, 'id'>) {
    const newService: Service = { ...service, id: Date.now().toString() };
    this.services.update(services => [...services, newService]);
  }

  updateService(updatedService: Service) {
    this.services.update(services => 
      services.map(service => service.id === updatedService.id ? updatedService : service)
    );
  }

  deleteService(id: string) {
    this.services.update(services => services.filter(service => service.id !== id));
  }
}
