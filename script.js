const services = [
  {
    id: 'strategy-roadmap',
    title: 'Digital Strategy & Roadmapping',
    category: 'Strategy',
    summary:
      'Holistic discovery workshops and a 12-month execution plan guiding your digital transformation priorities.',
    description:
      'Translate business objectives into a measured, outcome-driven roadmap tailored to organizational constraints and opportunities.',
    tags: ['Discovery', 'Vision', 'Stakeholder Alignment'],
    deliverables: [
      'Executive-ready digital strategy blueprint',
      '12-month prioritized initiative roadmap',
      'Investment and resourcing model with ROI ranges',
    ],
    highlights: [
      'Facilitated stakeholder alignment workshops',
      'Competitive benchmarking and capability scoring',
      'Risk register with mitigation strategies',
    ],
  },
  {
    id: 'ux-research',
    title: 'UX Research & Experience Design',
    category: 'Product',
    summary:
      'End-to-end research, persona development, and high-fidelity UX design for web and mobile applications.',
    description:
      'Discover user motivations and design intuitive journeys with interactive prototypes that accelerate stakeholder sign-off.',
    tags: ['Personas', 'Journey Mapping', 'Prototyping'],
    deliverables: [
      'User personas and experience principles',
      'Interactive Figma prototype with UI kit',
      'Usability testing report and recommendations',
    ],
    highlights: [
      'Moderated and unmoderated user testing',
      'Design system integration for component reuse',
      'Accessibility-first heuristics embedded in flows',
    ],
  },
  {
    id: 'cloud-migration',
    title: 'Cloud Migration & Modernization',
    category: 'Engineering',
    summary:
      'Assessment, migration strategy, and execution runbook for moving core workloads to a secure cloud environment.',
    description:
      'De-risk complex migrations with phased delivery, governance controls, and automated CI/CD pipelines.',
    tags: ['Azure', 'AWS', 'DevOps'],
    deliverables: [
      'Current-state assessment and TCO model',
      'Landing zone design with security guardrails',
      'Migration execution plan with success metrics',
    ],
    highlights: [
      'Automation playbooks improving deployment velocity',
      'Resilience testing and rollback procedures',
      'Knowledge transfer sessions for internal teams',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics Acceleration',
    category: 'Data',
    summary:
      'Create a modern analytics stack with governed data pipelines, dashboards, and insights sprints.',
    description:
      'Unlock meaningful insights with a unified data platform and actionable storytelling for stakeholders.',
    tags: ['ETL', 'Dashboards', 'Data Governance'],
    deliverables: [
      'Modern warehouse architecture blueprint',
      'Automated ETL/ELT pipelines and CI checks',
      'Executive dashboards with KPI narratives',
    ],
    highlights: [
      'Data quality scorecards and stewardship models',
      'Embedded analytics enablement for business teams',
      'Performance optimization and cost-control guardrails',
    ],
  },
  {
    id: 'martech-automation',
    title: 'MarTech Automation Programs',
    category: 'Growth',
    summary:
      'Lifecycle marketing automation with journey orchestration, personalization, and campaign analytics.',
    description:
      'Increase engagement with orchestrated campaigns, advanced segmentation, and real-time personalization.',
    tags: ['Lifecycle', 'Personalization', 'Analytics'],
    deliverables: [
      'Campaign playbooks and orchestration maps',
      'Personalization and segmentation frameworks',
      'Experimentation backlog with success metrics',
    ],
    highlights: [
      'Closed-loop reporting with attribution modeling',
      'Marketing automation platform setup and training',
      'Governance model ensuring regulatory compliance',
    ],
  },
  {
    id: 'managed-devops',
    title: 'Managed DevOps Enablement',
    category: 'Operations',
    summary:
      'End-to-end DevOps support including pipeline automation, observability, and reliability engineering.',
    description:
      'Deliver resilient systems with observability dashboards, automated testing, and incident response playbooks.',
    tags: ['SRE', 'CI/CD', 'Observability'],
    deliverables: [
      'CI/CD pipeline implementation and documentation',
      'Observability dashboards across environments',
      'Incident response and on-call runbooks',
    ],
    highlights: [
      'Automated quality gates and compliance checks',
      'Blue/green and canary deployment strategies',
      'Capability uplift sessions for engineering teams',
    ],
  },
];

const state = {
  filtered: services,
};

const elements = {
  servicesGrid: document.getElementById('services-grid'),
  emptyState: document.getElementById('empty-state'),
  serviceCount: document.getElementById('service-count'),
  searchInput: document.getElementById('service-search'),
  modal: document.getElementById('service-modal'),
  modalBackdrop: document.querySelector('#service-modal .service-modal__backdrop'),
  modalCloseBtn: document.querySelector('#service-modal .service-modal__close'),
  modalTitle: document.getElementById('modal-title'),
  modalSummary: document.getElementById('modal-summary'),
  modalCategory: document.getElementById('modal-category'),
  modalDeliverables: document.getElementById('modal-deliverables'),
  modalHighlights: document.getElementById('modal-highlights'),
};

const renderServices = (items) => {
  elements.servicesGrid.innerHTML = '';

  if (items.length === 0) {
    elements.emptyState.classList.remove('d-none');
    elements.serviceCount.textContent = '0 services';
    return;
  }

  const fragment = document.createDocumentFragment();

  items.forEach((service) => {
    const col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-xl-4';

    const card = document.createElement('article');
    card.className = 'service-card h-100';
    card.setAttribute('data-service-id', service.id);
    card.innerHTML = `
      <span class="service-card__category text-uppercase text-primary fw-semibold">${service.category}</span>
      <h3 class="service-card__title text-dark">${service.title}</h3>
      <p class="service-card__description">${service.summary}</p>
      <div class="d-flex service-card__tags mt-3">
        ${service.tags
          .map((tag) => `<span class="service-tag">${tag}</span>`)
          .join('')}
      </div>
      <button type="button" class="btn btn-outline-primary service-card__cta mt-auto">
        View details
      </button>
    `;

    card.querySelector('.service-card__cta').addEventListener('click', () => {
      openServiceModal(service);
    });

    col.appendChild(card);
    fragment.appendChild(col);
  });

  elements.servicesGrid.appendChild(fragment);
  elements.emptyState.classList.add('d-none');
  elements.serviceCount.textContent =
    items.length === 1 ? '1 service' : `${items.length} services`;
};

const openServiceModal = (service) => {
  elements.modalTitle.textContent = service.title;
  elements.modalSummary.textContent = service.description;
  elements.modalCategory.textContent = service.category;

  elements.modalDeliverables.innerHTML = service.deliverables
    .map((item) => `<li>${item}</li>`)
    .join('');

  elements.modalHighlights.innerHTML = service.highlights
    .map((item) => `<li>${item}</li>`)
    .join('');

  elements.modal.classList.add('is-visible');
  elements.modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  elements.modalCloseBtn.focus();
};

const closeServiceModal = () => {
  elements.modal.classList.remove('is-visible');
  elements.modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

const handleSearch = (event) => {
  const query = event.target.value.toLowerCase().trim();

  if (!query) {
    state.filtered = [...services];
    renderServices(state.filtered);
    return;
  }

  state.filtered = services.filter((service) => {
    const haystack = [
      service.title,
      service.category,
      service.summary,
      service.description,
      ...service.tags,
      ...service.deliverables,
      ...service.highlights,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });

  renderServices(state.filtered);
};

const handleModalKeydown = (event) => {
  if (event.key === 'Escape') {
    closeServiceModal();
  }
};

const bindEvents = () => {
  elements.searchInput.addEventListener('input', handleSearch);
  elements.modalCloseBtn.addEventListener('click', closeServiceModal);
  elements.modalBackdrop.addEventListener('click', closeServiceModal);
  document.addEventListener('keydown', handleModalKeydown);
};

const init = () => {
  renderServices(state.filtered);
  bindEvents();
};

document.addEventListener('DOMContentLoaded', init);
