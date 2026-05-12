import { FormEvent, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  Check,
  GitBranch,
  MessageCircle,
  MoreVertical,
  Phone,
  Plus,
  Send,
  Sparkles,
  Trash2,
  UserRound,
  Video,
  Wand2,
} from 'lucide-react';

type LeadForm = {
  name: string;
  businessName: string;
  phone: string;
  segment: string;
  goal: string;
};

type AgentSettings = {
  templateId: string;
  businessName: string;
  agentName: string;
  schedule: string;
  services: string;
  prices: string;
  rules: string;
  tone: string;
  customInstructions: string;
};

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type FlowBlock = {
  id: string;
  type: 'saudacao' | 'pergunta' | 'opcao' | 'agenda' | 'humano';
  title: string;
  message: string;
  options: string[];
};

type Template = {
  id: string;
  label: string;
  icon: string;
  description: string;
  defaults: Omit<AgentSettings, 'businessName'>;
  opening: string;
  flow: FlowBlock[];
};

const blockTypes: Array<{ type: FlowBlock['type']; label: string }> = [
  { type: 'saudacao', label: 'Saudacao' },
  { type: 'pergunta', label: 'Pergunta' },
  { type: 'opcao', label: 'Opcoes' },
  { type: 'agenda', label: 'Agenda' },
  { type: 'humano', label: 'Humano' },
];

const templates: Template[] = [
  {
    id: 'dentista',
    label: 'Dentista',
    icon: 'D',
    description: 'Triagem, agenda, procedimentos e retorno preventivo.',
    defaults: {
      templateId: 'dentista',
      agentName: 'Clara',
      schedule: 'Segunda a sexta, das 8h as 18h',
      services: 'Limpeza, avaliacao, clareamento, restauracao e urgencias',
      prices: 'Avaliacao inicial a partir de R$ 80. Demais valores apos triagem.',
      rules: 'Coletar nome, queixa principal, melhor horario e encaminhar urgencias para humano.',
      tone: 'acolhedor e profissional',
      customInstructions: 'Sempre explicar o proximo passo antes de sugerir agendamento.',
    },
    opening: 'Oi, sou a Clara. Posso te ajudar a entender o melhor atendimento e encontrar um horario.',
    flow: [
      createFlowBlock('saudacao', 'Boas-vindas', 'Ola! Sou a Clara da clinica. Vou te ajudar com informacoes e agenda.'),
      createFlowBlock('pergunta', 'Triagem', 'Qual procedimento voce procura ou qual incomodo esta sentindo?'),
      createFlowBlock('opcao', 'Servico indicado', 'Pelo que voce contou, posso te orientar entre avaliacao, limpeza ou urgencia.'),
      createFlowBlock('agenda', 'Agendamento', 'Qual dia e periodo fica melhor para voce?'),
      createFlowBlock('humano', 'Encaminhar', 'Vou encaminhar seus dados para a equipe confirmar o horario.'),
    ],
  },
  {
    id: 'barbearia',
    label: 'Barbearia',
    icon: 'B',
    description: 'Cortes, barba, combos, horarios e fidelizacao.',
    defaults: {
      templateId: 'barbearia',
      agentName: 'Theo',
      schedule: 'Terca a sabado, das 9h as 20h',
      services: 'Corte masculino, barba, sobrancelha, pigmentacao e combos',
      prices: 'Corte R$ 45, barba R$ 35, combo corte + barba R$ 70',
      rules: 'Perguntar servico, barbeiro preferido e horario desejado antes de confirmar.',
      tone: 'direto, simpatico e moderno',
      customInstructions: 'Oferecer combo quando o cliente pedir corte ou barba separadamente.',
    },
    opening: 'Fala! Sou o Theo. Quer marcar corte, barba ou um combo?',
    flow: [
      createFlowBlock('saudacao', 'Chegada', 'Como posso te ajudar?', ['Agendar um corte', 'Ver precos', 'Localizacao']),
      createFlowBlock('opcao', 'Precos', 'Temos corte, barba, combo e servicos extras. Qual voce gostaria de consultar?', ['Combo barba e corte', 'Corte navalhado', 'Sobrancelha']),
      createFlowBlock('pergunta', 'Barbeiros', 'Hoje temos alguns profissionais disponiveis para atendimento. O que voce quer saber?', ['Quem corta hoje?', 'Quero escolher barbeiro', 'Pode ser qualquer um']),
      createFlowBlock('agenda', 'Horario', 'Perfeito. Para marcar seu horario, escolha uma opcao.', ['Quero marcar agora', 'Ver horarios de hoje', 'Ver horarios de amanha']),
      createFlowBlock('humano', 'Localizacao', 'Ficamos perto do centro. Quer marcar um horario?', ['Quero marcar um horario']),
    ],
  },
  {
    id: 'manicure',
    label: 'Manicure',
    icon: 'M',
    description: 'Esmaltacao, alongamento, manutencao e encaixes.',
    defaults: {
      templateId: 'manicure',
      agentName: 'Lia',
      schedule: 'Segunda a sabado, das 9h as 19h',
      services: 'Manicure, pedicure, banho de gel, alongamento e manutencao',
      prices: 'Manicure R$ 35, pedicure R$ 40, alongamento a partir de R$ 130',
      rules: 'Confirmar servico, data, se precisa remover alongamento e forma de pagamento.',
      tone: 'leve, cuidadoso e consultivo',
      customInstructions: 'Sugerir manutencao quando o cliente mencionar alongamento.',
    },
    opening: 'Oii, sou a Lia. Me conta qual servico voce quer fazer hoje?',
    flow: [
      createFlowBlock('saudacao', 'Boas-vindas', 'Oii! Qual servico voce quer fazer hoje?'),
      createFlowBlock('opcao', 'Servicos', 'Manicure, pedicure, alongamento, banho de gel ou manutencao?'),
      createFlowBlock('pergunta', 'Detalhes', 'Voce precisa remover algum alongamento ou esmalte atual?'),
      createFlowBlock('agenda', 'Encaixe', 'Qual dia e periodo voce prefere?'),
      createFlowBlock('humano', 'Finalizacao', 'Vou confirmar disponibilidade e ja te retorno.'),
    ],
  },
  {
    id: 'estetica',
    label: 'Clinica estetica',
    icon: 'E',
    description: 'Avaliacao, protocolos, objecoes e agendamento.',
    defaults: {
      templateId: 'estetica',
      agentName: 'Maya',
      schedule: 'Segunda a sexta, das 10h as 19h',
      services: 'Limpeza de pele, drenagem, botox, bioestimulador e protocolos faciais',
      prices: 'Avaliacao gratuita. Procedimentos com valor apos analise do caso.',
      rules: 'Nao prometer resultado medico. Conduzir para avaliacao com especialista.',
      tone: 'premium, seguro e educado',
      customInstructions: 'Quando houver duvida tecnica, orientar avaliacao presencial.',
    },
    opening: 'Oi, sou a Maya. Posso te ajudar a escolher o protocolo ideal e agendar sua avaliacao.',
    flow: [
      createFlowBlock('saudacao', 'Recepcao', 'Ola! Vou te ajudar a entender qual protocolo combina com seu objetivo.'),
      createFlowBlock('pergunta', 'Objetivo', 'Seu foco e pele, gordura localizada, rejuvenescimento ou relaxamento?'),
      createFlowBlock('pergunta', 'Historico', 'Voce ja fez algum procedimento estetico antes?'),
      createFlowBlock('agenda', 'Avaliacao', 'O ideal e agendar uma avaliacao. Qual periodo fica melhor?'),
      createFlowBlock('humano', 'Especialista', 'Vou encaminhar para uma especialista validar o melhor protocolo.'),
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery',
    icon: 'P',
    description: 'Cardapio, pedido, endereco, pagamento e status.',
    defaults: {
      templateId: 'delivery',
      agentName: 'Nina',
      schedule: 'Todos os dias, das 18h as 23h',
      services: 'Pedidos por delivery, retirada no balcao, combos e bebidas',
      prices: 'Pizza media a partir de R$ 45, combos a partir de R$ 69',
      rules: 'Coletar pedido, endereco, forma de pagamento e confirmar taxa de entrega.',
      tone: 'rapido, simpatico e objetivo',
      customInstructions: 'Sempre confirmar o resumo do pedido antes de finalizar.',
    },
    opening: 'Oi, sou a Nina. Posso te ajudar a fazer um pedido agora.',
    flow: [
      createFlowBlock('saudacao', 'Inicio do pedido', 'Ola! Voce quer ver cardapio, pedir novamente ou falar com atendente?'),
      createFlowBlock('opcao', 'Cardapio', 'Escolha uma categoria: pizzas, combos, bebidas ou sobremesas.'),
      createFlowBlock('pergunta', 'Endereco', 'Me envie o endereco completo para calcular a entrega.'),
      createFlowBlock('opcao', 'Pagamento', 'Qual forma de pagamento: Pix, cartao ou dinheiro?'),
      createFlowBlock('humano', 'Confirmacao', 'Pedido recebido. Vou enviar para a cozinha confirmar o prazo.'),
    ],
  },
  {
    id: 'personalizado',
    label: 'Personalizado',
    icon: '+',
    description: 'Comece do zero com perguntas para montar IA e fluxo.',
    defaults: {
      templateId: 'personalizado',
      agentName: 'Alex',
      schedule: '',
      services: '',
      prices: '',
      rules: 'Perguntar objetivo do cliente, entender necessidade, oferecer proximo passo e encaminhar para humano quando necessario.',
      tone: 'natural, claro e consultivo',
      customInstructions: 'Use as informacoes preenchidas para criar uma conversa sob medida.',
    },
    opening: 'Oi, sou o Alex. Me conta o que voce precisa e eu te ajudo com o proximo passo.',
    flow: [
      createFlowBlock('saudacao', 'Apresentacao', 'Ola! Sou o assistente virtual. Como posso te ajudar hoje?'),
      createFlowBlock('pergunta', 'Objetivo', 'Qual e o seu principal objetivo agora?'),
      createFlowBlock('pergunta', 'Servico', 'Qual servico, produto ou atendimento voce procura?'),
      createFlowBlock('pergunta', 'Horario', 'Qual dia ou periodo voce prefere?'),
      createFlowBlock('humano', 'Proximo passo', 'Vou enviar suas informacoes para a equipe continuar.'),
    ],
  },
];

const emptyLead: LeadForm = {
  name: '',
  businessName: '',
  phone: '',
  segment: '',
  goal: '',
};

export default function AgentSimulatorSection() {
  const [lead, setLead] = useState<LeadForm>(emptyLead);
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [builderMode, setBuilderMode] = useState<'ia' | 'fluxo'>('ia');
  const [agent, setAgent] = useState<AgentSettings>({
    ...templates[0].defaults,
    businessName: '',
  });
  const [flowBlocks, setFlowBlocks] = useState<FlowBlock[]>(templates[0].flow);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: templates[0].opening },
  ]);
  const [input, setInput] = useState('');
  const [isRegisteringLead, setIsRegisteringLead] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState('');
  const [activeFlowIndex, setActiveFlowIndex] = useState(0);
  const [flowSelections, setFlowSelections] = useState<string[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatScroll = chatScrollRef.current;
    if (!chatScroll) return;

    chatScroll.scrollTo({
      top: chatScroll.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages.length, isSending, activeFlowIndex, flowSelections.length, builderMode]);

  function updateLead(field: keyof LeadForm, value: string) {
    setLead((current) => ({ ...current, [field]: value }));
  }

  function updateAgent(field: keyof AgentSettings, value: string) {
    setAgent((current) => ({ ...current, [field]: value }));
  }

  function updateFlowBlock(id: string, field: keyof FlowBlock, value: string) {
    if (field === 'message' || field === 'options') return;

    setFlowBlocks((current) =>
      current.map((block) => (block.id === id ? { ...block, [field]: value } : block)),
    );
  }

  function updateFlowOption(blockId: string, optionIndex: number, value: string) {
    setFlowBlocks((current) =>
      current.map((block) =>
        block.id === blockId
          ? {
              ...block,
              options: block.options.map((option, index) => (index === optionIndex ? value : option)),
            }
          : block,
      ),
    );
  }

  function addFlowOption(blockId: string) {
    setFlowBlocks((current) =>
      current.map((block) =>
        block.id === blockId
          ? { ...block, options: [...block.options, 'Nova opcao'] }
          : block,
      ),
    );
  }

  function removeFlowOption(blockId: string, optionIndex: number) {
    setFlowBlocks((current) =>
      current.map((block) =>
        block.id === blockId
          ? { ...block, options: block.options.filter((_, index) => index !== optionIndex) }
          : block,
      ),
    );
  }

  function addFlowBlock(type: FlowBlock['type']) {
    const label = blockTypes.find((block) => block.type === type)?.label || 'Bloco';
    setFlowBlocks((current) => [
      ...current,
      createFlowBlock(type, label, `Mensagem do bloco de ${label.toLowerCase()}.`),
    ]);
  }

  function removeFlowBlock(id: string) {
    setFlowBlocks((current) => current.filter((block) => block.id !== id));
    setActiveFlowIndex((current) => Math.max(0, Math.min(current, flowBlocks.length - 2)));
  }

  function selectTemplate(template: Template) {
    setSelectedTemplateId(template.id);
    setAgent((current) => ({
      ...template.defaults,
      businessName: current.businessName || lead.businessName,
    }));
    setFlowBlocks(template.flow);
    setMessages([{ role: 'assistant', content: template.opening }]);
    setActiveFlowIndex(0);
    setFlowSelections([]);
  }

  function selectFlowOption(blockIndex: number, option: string) {
    if (!leadCaptured) return;

    setFlowSelections((current) => {
      const next = current.slice(0, blockIndex);
      next[blockIndex] = option;
      return next;
    });

    setActiveFlowIndex(Math.min(blockIndex + 1, flowBlocks.length - 1));
  }

  async function handleLeadSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsRegisteringLead(true);
    setStatus('');

    try {
      await fetch('/api/agent-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch {
      setStatus('Lead salvo localmente. A API sera conectada quando o servidor estiver pronto.');
    } finally {
      setAgent((current) => ({
        ...current,
        businessName: current.businessName || lead.businessName,
      }));
      setLeadCaptured(true);
      setIsRegisteringLead(false);
    }
  }

  async function sendMessage() {
    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmedInput },
    ];

    setMessages(nextMessages);
    setInput('');
    setIsSending(true);
    setStatus('');

    try {
      const response = await fetch('/api/chat-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead,
          agent: {
            ...agent,
            customInstructions: `${agent.customInstructions}\n\nFluxo configurado:\n${flowBlocks
              .map((block, index) => `${index + 1}. ${block.title}: ${block.message} Botoes: ${block.options.join(', ')}`)
              .join('\n')}`,
          },
          messages: nextMessages,
        }),
      });

      if (!response.ok) {
        throw new Error('Simulation request failed');
      }

      const data = (await response.json()) as { reply: string; mode: string };
      setMessages((current) => [
        ...current,
        { role: 'assistant', content: data.reply },
      ]);

      if (data.mode === 'fallback') {
        setStatus('Modo demo ativo. Configure OPENROUTER_API_KEY para respostas com IA.');
      }
    } catch {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content:
            'Tive uma instabilidade ao responder. Me chama de novo com a duvida principal que eu continuo a simulacao.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section id="simulador-agente" className="relative scroll-mt-6 overflow-hidden bg-black py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/70 to-black" />
      <div className="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="relative z-10 container mx-auto max-w-7xl px-4">
        <motion.div
          className="mb-14 max-w-4xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Simulador interativo
          </div>
          <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Teste gratuitamente seu agente de IA
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-gray-400 md:text-lg">
            Faca um cadastro rapido para liberar a previa gratuita. Depois escolha um modelo, ajuste os dados do negocio e veja como o atendimento ficaria no WhatsApp.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <motion.div
            className="rounded-xl border border-cyan-400/15 bg-slate-950/70 p-5 backdrop-blur-xl md:p-6"
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {!leadCaptured ? (
              <LeadCaptureForm
                lead={lead}
                isRegisteringLead={isRegisteringLead}
                onUpdateLead={updateLead}
                onSubmit={handleLeadSubmit}
              />
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Template da automacao</h3>
                    <p className="text-sm text-gray-400">Lead capturado: {lead.name}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-400/15 text-emerald-300">
                    <Check className="h-5 w-5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {templates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => selectTemplate(template)}
                      className={`rounded-lg border p-4 text-left transition ${
                        selectedTemplateId === template.id
                          ? 'border-cyan-300 bg-cyan-400/10 text-white'
                          : 'border-cyan-400/10 bg-black/30 text-gray-300 hover:border-cyan-300/50'
                      }`}
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-cyan-400/15 text-sm font-bold text-cyan-200">
                          {template.icon}
                        </span>
                        <span className="font-semibold">{template.label}</span>
                      </div>
                      <p className="text-sm text-gray-400">{template.description}</p>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 rounded-lg border border-cyan-400/15 bg-black/30 p-1">
                  <button
                    type="button"
                    onClick={() => setBuilderMode('ia')}
                    className={`flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold transition ${
                      builderMode === 'ia' ? 'bg-cyan-400 text-black' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <Wand2 className="h-4 w-4" />
                    Agente IA
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuilderMode('fluxo')}
                    className={`flex items-center justify-center gap-2 rounded-md px-3 py-3 text-sm font-semibold transition ${
                      builderMode === 'fluxo' ? 'bg-cyan-400 text-black' : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    <GitBranch className="h-4 w-4" />
                    Fluxo
                  </button>
                </div>

                {builderMode === 'ia' ? (
                  <AgentForm agent={agent} onUpdateAgent={updateAgent} />
                ) : (
                  <FlowBuilder
                    flowBlocks={flowBlocks}
                    onAddBlock={addFlowBlock}
                    onRemoveBlock={removeFlowBlock}
                    onUpdateBlock={updateFlowBlock}
                    onAddOption={addFlowOption}
                    onRemoveOption={removeFlowOption}
                    onUpdateOption={updateFlowOption}
                  />
                )}
              </div>
            )}
          </motion.div>

          <motion.div
            className="rounded-xl border border-cyan-400/15 bg-slate-950/70 p-5 backdrop-blur-xl md:p-6"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className={`${leadCaptured ? '' : 'pointer-events-none opacity-45'}`}>
                <WhatsAppPreview
                  mode={builderMode}
                  agentName={agent.agentName}
                  businessName={agent.businessName || lead.businessName}
                  messages={messages}
                  flowBlocks={flowBlocks}
                  activeFlowIndex={activeFlowIndex}
                  flowSelections={flowSelections}
                  input={input}
                  isSending={isSending}
                  leadCaptured={leadCaptured}
                  status={status}
                  chatScrollRef={chatScrollRef}
                  onInputChange={setInput}
                  onSendMessage={sendMessage}
                  onFlowOptionClick={selectFlowOption}
                />

                {!leadCaptured && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                    <MessageCircle className="h-4 w-4 text-cyan-300" />
                    Faca o cadastro gratuito para liberar a previa.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function LeadCaptureForm({
  lead,
  isRegisteringLead,
  onUpdateLead,
  onSubmit,
}: {
  lead: LeadForm;
  isRegisteringLead: boolean;
  onUpdateLead: (field: keyof LeadForm, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="rounded-xl border border-cyan-400/15 bg-black/30 p-5">
        <div className="mb-2 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-400 text-black">
            <UserRound className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Cadastro gratuito</h3>
            <p className="text-sm text-gray-400">Libere a previa do agente em menos de um minuto.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <LeadInput label="Seu nome" value={lead.name} onChange={(value) => onUpdateLead('name', value)} required />
        <LeadInput label="WhatsApp" value={lead.phone} onChange={(value) => onUpdateLead('phone', value)} required />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <LeadInput label="Empresa" value={lead.businessName} onChange={(value) => onUpdateLead('businessName', value)} required />
        <LeadInput label="Segmento" value={lead.segment} onChange={(value) => onUpdateLead('segment', value)} required />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-300">O que voce quer automatizar?</span>
        <textarea
          value={lead.goal}
          onChange={(event) => onUpdateLead('goal', event.target.value)}
          className="min-h-24 w-full rounded-lg border border-cyan-400/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          placeholder="Ex: atendimento, agendamento, vendas ou orcamentos."
          required
        />
      </label>

      <button
        type="submit"
        disabled={isRegisteringLead}
        className="btn-neon-solid flex w-full items-center justify-center gap-2 rounded-lg font-semibold disabled:opacity-60"
      >
        {isRegisteringLead ? 'Liberando...' : 'Testar gratuitamente'}
        <ArrowRight className="h-5 w-5" />
      </button>
    </form>
  );
}

function AgentForm({
  agent,
  onUpdateAgent,
}: {
  agent: AgentSettings;
  onUpdateAgent: (field: keyof AgentSettings, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <LeadInput label="Nome da empresa no prompt" value={agent.businessName} onChange={(value) => onUpdateAgent('businessName', value)} />
      <LeadInput label="Nome do atendente/agente" value={agent.agentName} onChange={(value) => onUpdateAgent('agentName', value)} />
      <LeadInput label="Horario de atendimento do estabelecimento" value={agent.schedule} onChange={(value) => onUpdateAgent('schedule', value)} />
      <LeadInput label="Servicos que voce presta" value={agent.services} onChange={(value) => onUpdateAgent('services', value)} />
      <LeadInput label="Preco ou media de preco" value={agent.prices} onChange={(value) => onUpdateAgent('prices', value)} />
      <LeadInput label="Tom de voz do atendente" value={agent.tone} onChange={(value) => onUpdateAgent('tone', value)} />
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-gray-300">Objetivo, protocolo, regras e personalizacao</span>
        <textarea
          value={`${agent.rules}\n${agent.customInstructions}`}
          onChange={(event) => {
            onUpdateAgent('rules', event.target.value);
            onUpdateAgent('customInstructions', '');
          }}
          className="min-h-32 w-full rounded-lg border border-cyan-400/15 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-cyan-300"
          placeholder="Ex: qualificar o lead, oferecer avaliacao, coletar horario, enviar para humano..."
        />
      </label>
    </div>
  );
}

function FlowBuilder({
  flowBlocks,
  onAddBlock,
  onRemoveBlock,
  onUpdateBlock,
  onAddOption,
  onRemoveOption,
  onUpdateOption,
}: {
  flowBlocks: FlowBlock[];
  onAddBlock: (type: FlowBlock['type']) => void;
  onRemoveBlock: (id: string) => void;
  onUpdateBlock: (id: string, field: keyof FlowBlock, value: string) => void;
  onAddOption: (blockId: string) => void;
  onRemoveOption: (blockId: string, optionIndex: number) => void;
  onUpdateOption: (blockId: string, optionIndex: number, value: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-300">
          <Plus className="h-4 w-4 text-cyan-300" />
          Qual bloco voce quer adicionar?
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {blockTypes.map((blockType) => (
            <button
              key={blockType.type}
              type="button"
              onClick={() => onAddBlock(blockType.type)}
              className="rounded-lg border border-cyan-400/15 bg-black/40 px-3 py-2 text-sm text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/10"
            >
              {blockType.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[560px] space-y-3 overflow-y-auto pr-1">
        {flowBlocks.map((block, index) => (
          <div key={block.id} className="rounded-xl border border-cyan-400/15 bg-black/40 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-cyan-400/15 text-sm font-bold text-cyan-200">
                  {index + 1}
                </span>
                <select
                  value={block.type}
                  onChange={(event) => onUpdateBlock(block.id, 'type', event.target.value)}
                  className="h-9 rounded-md border border-cyan-400/15 bg-slate-950 px-2 text-sm text-white outline-none"
                >
                  {blockTypes.map((blockType) => (
                    <option key={blockType.type} value={blockType.type}>
                      {blockType.label}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => onRemoveBlock(block.id)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-red-300/20 text-red-200 transition hover:bg-red-400/10"
                aria-label="Remover bloco"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            <LeadInput label="Nome do bloco" value={block.title} onChange={(value) => onUpdateBlock(block.id, 'title', value)} />
            <div className="mt-3 rounded-lg border border-cyan-400/10 bg-slate-950/70 p-3">
              <div className="mb-1 text-xs uppercase tracking-[0.18em] text-cyan-200">Mensagem fixa</div>
              <p className="text-sm leading-relaxed text-gray-300">{block.message}</p>
            </div>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium text-gray-300">Botoes editaveis</span>
                <button
                  type="button"
                  onClick={() => onAddOption(block.id)}
                  className="flex items-center gap-1 rounded-md border border-cyan-400/15 px-2 py-1 text-xs text-cyan-100 transition hover:bg-cyan-400/10"
                >
                  <Plus className="h-3 w-3" />
                  Botao
                </button>
              </div>
              {block.options.map((option, optionIndex) => (
                <div key={`${block.id}-${optionIndex}`} className="flex items-center gap-2">
                  <input
                    value={option}
                    onChange={(event) => onUpdateOption(block.id, optionIndex, event.target.value)}
                    className="h-10 min-w-0 flex-1 rounded-lg border border-cyan-400/15 bg-black/40 px-3 text-sm text-white outline-none transition focus:border-cyan-300"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveOption(block.id, optionIndex)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-300/20 text-red-200 transition hover:bg-red-400/10"
                    aria-label="Remover botao"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatsAppPreview({
  mode,
  agentName,
  businessName,
  messages,
  flowBlocks,
  activeFlowIndex,
  flowSelections,
  input,
  isSending,
  leadCaptured,
  status,
  chatScrollRef,
  onInputChange,
  onSendMessage,
  onFlowOptionClick,
}: {
  mode: 'ia' | 'fluxo';
  agentName: string;
  businessName: string;
  messages: ChatMessage[];
  flowBlocks: FlowBlock[];
  activeFlowIndex: number;
  flowSelections: string[];
  input: string;
  isSending: boolean;
  leadCaptured: boolean;
  status: string;
  chatScrollRef: React.RefObject<HTMLDivElement | null>;
  onInputChange: (value: string) => void;
  onSendMessage: () => Promise<void>;
  onFlowOptionClick: (blockIndex: number, option: string) => void;
}) {
  const initials = (agentName || businessName || 'AI').slice(0, 2).toUpperCase();
  const isFlowMode = mode === 'fluxo';

  return (
    <div className="mx-auto max-w-[440px] rounded-[2rem] border border-slate-700/80 bg-slate-950 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
      <div className="mx-auto mb-3 h-1.5 w-20 rounded-full bg-slate-700" />
      <div className="flex h-[680px] min-h-0 flex-col overflow-hidden rounded-[1.45rem] border border-black/40 bg-[#0b141a]">
      <div className="flex items-center justify-between gap-3 border-b border-black/30 bg-[#202c33] px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-emerald-300 text-sm font-black text-slate-950">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="truncate font-semibold text-white">{agentName || 'Agente IA'}</div>
            <div className="truncate text-xs text-emerald-300">
              {businessName ? `${businessName} • online` : 'online para simulacao'}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-300">
          <button className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10" aria-label="Ligar">
            <Phone className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10" aria-label="Video">
            <Video className="h-4 w-4" />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/10" aria-label="Mais opcoes">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={chatScrollRef} className="min-h-0 flex-1 overflow-y-auto bg-[#0b141a] p-4">
        <div className="space-y-3">
          {isFlowMode ? (
            flowBlocks.slice(0, activeFlowIndex + 1).map((block, index) => (
              <div key={block.id} className="space-y-3">
                <div className="flex justify-start">
                  <div className="max-w-[88%] rounded-lg rounded-tl-sm bg-[#202c33] px-4 py-3 text-sm leading-relaxed text-slate-100 shadow">
                  <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                    Bloco {index + 1} • {block.title}
                  </div>
                  <p>{block.message}</p>
                  {index === activeFlowIndex && block.options.length > 0 && (
                    <div className="mt-3 grid gap-2">
                      {block.options.map((option, optionIndex) => (
                        <button
                          key={`${block.id}-preview-${optionIndex}`}
                          type="button"
                          onClick={() => onFlowOptionClick(index, option)}
                          className="rounded-lg border border-[#00a884]/45 bg-[#111b21] px-3 py-2 text-left text-sm font-medium text-[#53d8b1] transition hover:bg-[#16262d]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="mt-1 text-right text-[10px] text-white/45">20:31</div>
                  </div>
                </div>
                {flowSelections[index] && (
                  <div className="flex justify-end">
                    <div className="max-w-[82%] rounded-lg rounded-tr-sm bg-[#005c4b] px-4 py-2 text-sm leading-relaxed text-white shadow">
                      {flowSelections[index]}
                      <div className="mt-1 text-right text-[10px] text-white/45">20:31</div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[82%] rounded-lg px-4 py-2 text-sm leading-relaxed shadow ${
                    message.role === 'user'
                      ? 'rounded-tr-sm bg-[#005c4b] text-white'
                      : 'rounded-tl-sm bg-[#202c33] text-slate-100'
                  }`}
                >
                  {message.content}
                  <div className="mt-1 text-right text-[10px] text-white/45">20:31</div>
                </div>
              </div>
            ))
          )}
          {!isFlowMode && isSending && (
            <div className="flex justify-start">
              <div className="rounded-lg rounded-tl-sm bg-[#202c33] px-4 py-2 text-sm text-gray-300">
                digitando...
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-black/30 bg-[#202c33] p-3">
        {status && <p className="mb-3 text-xs text-amber-200">{status}</p>}
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                void onSendMessage();
              }
            }}
            className="h-12 min-w-0 flex-1 rounded-full border border-transparent bg-[#2a3942] px-4 text-white outline-none transition placeholder:text-slate-400 focus:border-cyan-300"
            placeholder={isFlowMode ? 'Clique em um botao para avancar' : leadCaptured ? 'Mensagem' : 'Preencha o lead para testar'}
            disabled={!leadCaptured || isSending || isFlowMode}
          />
          <button
            type="button"
            onClick={() => void onSendMessage()}
            disabled={!leadCaptured || isSending || !input.trim() || isFlowMode}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white transition hover:bg-[#06cf9c] disabled:opacity-50"
            aria-label="Enviar mensagem"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}

function LeadInput({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-gray-300">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full rounded-lg border border-cyan-400/15 bg-black/40 px-4 text-white outline-none transition focus:border-cyan-300"
        required={required}
      />
    </label>
  );
}

function createFlowBlock(
  type: FlowBlock['type'],
  title: string,
  message: string,
  options = getDefaultOptions(type),
): FlowBlock {
  return {
    id: `${type}-${Math.random().toString(36).slice(2, 9)}`,
    type,
    title,
    message,
    options,
  };
}

function getDefaultOptions(type: FlowBlock['type']) {
  const defaults: Record<FlowBlock['type'], string[]> = {
    saudacao: ['Ver precos', 'Ver horarios', 'Localizacao'],
    pergunta: ['Opcao 1', 'Opcao 2', 'Falar com atendente'],
    opcao: ['Servico principal', 'Combo', 'Outro servico'],
    agenda: ['Quero marcar um horario', 'Ver disponibilidade', 'Falar com atendente'],
    humano: ['Chamar atendente'],
  };

  return defaults[type];
}
