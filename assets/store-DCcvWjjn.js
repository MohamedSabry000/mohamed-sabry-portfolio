var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n)),l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function ee(){}ee.prototype=y.prototype;function b(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var te=b.prototype=new ee;te.constructor=b,_(te,y.prototype),te.isPureReactComponent=!0;var ne=Array.isArray;function re(){}var x={H:null,A:null,T:null,S:null},ie=Object.prototype.hasOwnProperty;function S(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function C(e,t){return S(e.type,t,e.props)}function w(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ae(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var oe=/\/+/g;function T(e,t){return typeof e==`object`&&e&&e.key!=null?ae(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(re,re):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function E(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,E(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+T(e,0):a,ne(o)?(i=``,c!=null&&(i=c.replace(oe,`$&/`)+`/`),E(o,r,i,``,function(e){return e})):o!=null&&(w(o)&&(o=C(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(oe,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(ne(e))for(var u=0;u<e.length;u++)a=e[u],s=l+T(a,u),c+=E(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+T(a,u++),c+=E(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return E(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function D(e,t,n){if(e==null)return e;var r=[],i=0;return E(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ce(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var le=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ue(e){var t=x.T,n={};n.types=t===null?null:t.types,x.T=n;try{var r=e(),i=x.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(re,le)}catch(e){le(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),x.T=t}}function de(e){var t=x.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ue(de.bind(null,e))}var fe={map:D,forEach:function(e,t,n){D(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return D(e,function(){t++}),t},toArray:function(e){return D(e,function(e){return e})||[]},only:function(e){if(!w(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=fe,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=b,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=x,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return x.H.useMemoCache(e)}},e.addTransitionType=de,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!ie.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return S(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)ie.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return S(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=w,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ce}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ue,e.unstable_useCacheRefresh=function(){return x.H.useCacheRefresh()},e.use=function(e){return x.H.use(e)},e.useActionState=function(e,t,n){return x.H.useActionState(e,t,n)},e.useCallback=function(e,t){return x.H.useCallback(e,t)},e.useContext=function(e){return x.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return x.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return x.H.useEffect(e,t)},e.useEffectEvent=function(e){return x.H.useEffectEvent(e)},e.useId=function(){return x.H.useId()},e.useImperativeHandle=function(e,t,n){return x.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return x.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return x.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return x.H.useMemo(e,t)},e.useOptimistic=function(e,t){return x.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return x.H.useReducer(e,t,n)},e.useRef=function(e){return x.H.useRef(e)},e.useState=function(e){return x.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return x.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return x.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{var t=u();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useSyncExternalStore,a=t.useRef,o=t.useEffect,s=t.useMemo,c=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,l,u){var d=a(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=s(function(){function e(e){if(!i){if(i=!0,a=e,e=l(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return o=t}return o=e}if(t=o,r(a,e))return t;var n=l(e);return u!==void 0&&u(t,n)?(a=e,t):(a=e,o=n)}var i=!1,a,o,s=n===void 0?null:n;return[function(){return e(t())},s===null?void 0:function(){return e(s())}]},[t,n,l,u]);var p=i(e,d[0],d[1]);return o(function(){f.hasValue=!0,f.value=p},[p]),c(p),p}})),f=o(((e,t)=>{t.exports=d()})),p=c(u(),1),m=f();function h(e){e()}function g(){let e=null,t=null;return{clear(){e=null,t=null},notify(){h(()=>{let t=e;for(;t;)t.callback(),t=t.next})},get(){let t=[],n=e;for(;n;)t.push(n),n=n.next;return t},subscribe(n){let r=!0,i=t={callback:n,next:null,prev:t};return i.prev?i.prev.next=i:e=i,function(){r&&e!==null&&(r=!1,i.next?i.next.prev=i.prev:t=i.prev,i.prev?i.prev.next=i.next:e=i.next)}}}}var _={notify(){},get:()=>[]};function v(e,t){let n,r=_,i=0,a=!1;function o(e){u();let t=r.subscribe(e),n=!1;return()=>{n||(n=!0,t(),d())}}function s(){r.notify()}function c(){m.onStateChange&&m.onStateChange()}function l(){return a}function u(){i++,n||(n=t?t.addNestedSub(c):e.subscribe(c),r=g())}function d(){i--,n&&i===0&&(n(),n=void 0,r.clear(),r=_)}function f(){a||(a=!0,u())}function p(){a&&(a=!1,d())}let m={addNestedSub:o,notifyNestedSubs:s,handleChangeWrapper:c,isSubscribed:l,trySubscribe:f,tryUnsubscribe:p,getListeners:()=>r};return m}var y=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,ee=typeof navigator<`u`&&navigator.product===`ReactNative`,b=y||ee?p.useLayoutEffect:p.useEffect,te=Symbol.for(`react-redux-context`),ne=typeof globalThis<`u`?globalThis:{};function re(){if(!p.createContext)return{};let e=ne[te]??=new Map,t=e.get(p.createContext);return t||(t=p.createContext(null),e.set(p.createContext,t)),t}var x=re();function ie(e){let{children:t,context:n,serverState:r,store:i}=e,a=p.useMemo(()=>{let e=v(i);return{store:i,subscription:e,getServerState:r?()=>r:void 0}},[i,r]),o=p.useMemo(()=>i.getState(),[i]);b(()=>{let{subscription:e}=a;return e.onStateChange=e.notifyNestedSubs,e.trySubscribe(),o!==i.getState()&&e.notifyNestedSubs(),()=>{e.tryUnsubscribe(),e.onStateChange=void 0}},[a,o]);let s=n||x;return p.createElement(s.Provider,{value:a},t)}var S=ie;function C(e=x){return function(){return p.useContext(e)}}var w=C();function ae(e=x){let t=e===x?w:C(e),n=()=>{let{store:e}=t();return e};return Object.assign(n,{withTypes:()=>n}),n}var oe=ae();function T(e=x){let t=e===x?oe:ae(e),n=()=>t().dispatch;return Object.assign(n,{withTypes:()=>n}),n}var se=T(),E=(e,t)=>e===t;function D(e=x){let t=e===x?w:C(e),n=(e,n={})=>{let{equalityFn:r=E}=typeof n==`function`?{equalityFn:n}:n,{store:i,subscription:a,getServerState:o}=t();p.useRef(!0);let s=p.useCallback({[e.name](t){return e(t)}}[e.name],[e]),c=(0,m.useSyncExternalStoreWithSelector)(a.addNestedSub,i.getState,o||i.getState,s,r);return p.useDebugValue(c),c};return Object.assign(n,{withTypes:()=>n}),n}var ce=D(),le=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),ue=o(((e,t)=>{t.exports=le()})),de={en:{"nav.home":`Home`,"nav.about":`About`,"nav.experience":`Experience`,"nav.projects":`Projects`,"nav.skills":`Skills`,"nav.education":`Education`,"nav.certificates":`Certificates`,"nav.contact":`Contact`,"nav.blog":`Blog`,"nav.faq":`FAQ`,"nav.admin":`Admin`,"common.present":`Present`,"common.toggleTheme":`Toggle theme`,"common.toggleLanguage":`Switch language`,"common.menu":`Menu`,"common.save":`Save changes`,"common.saving":`Saving…`,"common.saved":`Saved successfully`,"common.cancel":`Cancel`,"common.delete":`Delete`,"common.edit":`Edit`,"common.add":`Add new`,"common.moveUp":`Move up`,"common.moveDown":`Move down`,"common.search":`Search…`,"common.english":`English`,"common.arabic":`Arabic`,"common.yes":`Yes`,"common.no":`No`,"common.empty":`Nothing here yet.`,"common.confirmDelete":`Are you sure you want to delete this item?`,"hero.hello":`Hello, I'm`,"hero.available":`Available for new opportunities`,"hero.contact":`Hire me`,"hero.cv":`Download CV`,"hero.chat":`Ask my AI assistant`,"hero.years":`Years of experience`,"hero.projects":`Projects delivered`,"hero.companies":`Companies`,"about.title":`About me`,"about.subtitle":`Who I am and what I do`,"about.location":`Location`,"about.email":`Email`,"about.phone":`Phone`,"about.languages":`Languages`,"about.softSkills":`Soft skills`,"experience.title":`Work experience`,"experience.subtitle":`Where I have worked`,"projects.title":`Key projects`,"projects.subtitle":`Selected work I am proud of`,"projects.all":`All`,"projects.professional":`Professional`,"projects.personal":`Personal`,"projects.featured":`Featured`,"projects.visit":`Visit`,"projects.demo":`Watch demo`,"certificates.verify":`Verify credential`,"skills.title":`Technical skills`,"skills.subtitle":`Tools and technologies I use`,"education.title":`Education`,"education.subtitle":`Academic background`,"certificates.title":`Trainings & certificates`,"certificates.subtitle":`Continuous learning`,"blog.title":`Blog`,"blog.subtitle":`Notes on front-end engineering, React and bilingual products`,"blog.readMore":`Read article`,"blog.viewAll":`View all articles`,"blog.minRead":`min read`,"blog.back":`Back to blog`,"blog.search":`Search articles…`,"blog.allTags":`All`,"blog.empty":`No articles found.`,"blog.notFound":`Article not found`,"blog.prev":`Previous article`,"blog.next":`Next article`,"faq.title":`Frequently asked questions`,"faq.subtitle":`Quick answers to common questions`,"faq.askAi":`Still have a question? Ask my AI assistant`,"contact.title":`Get in touch`,"contact.subtitle":`Have a project or opportunity? Let’s talk.`,"contact.name":`Your name`,"contact.email":`Your email`,"contact.subject":`Subject`,"contact.message":`Message`,"contact.send":`Send message`,"contact.sending":`Sending…`,"contact.success":`Thanks! Your message was sent. I will get back to you soon.`,"contact.errorRequired":`Please fill in all fields.`,"contact.errorEmail":`Please enter a valid email address.`,"footer.rights":`All rights reserved.`,"footer.built":`Built with React 19, Redux Persist, Tailwind & Less.`,"chat.open":`Open AI assistant`,"chat.close":`Close assistant`,"chat.placeholder":`Ask me anything about Mohamed…`,"chat.send":`Send`,"chat.clear":`Clear conversation`,"chat.typing":`Typing…`,"chat.online":`Online`,"chat.llm":`AI model`,"chat.local":`Smart assistant`,"chat.disclaimer":`AI answers are based on Mohamed’s portfolio and may be imperfect.`,"admin.title":`Admin panel`,"admin.login":`Sign in`,"admin.loginTitle":`Admin sign in`,"admin.loginSubtitle":`Manage your portfolio content`,"admin.username":`Username`,"admin.password":`Password`,"admin.signingIn":`Signing in…`,"admin.invalid":`Invalid username or password.`,"admin.defaultHint":`Default credentials: admin / admin123 — change them in Settings.`,"admin.logout":`Sign out`,"admin.viewSite":`View site`,"admin.dashboard":`Dashboard`,"admin.profile":`Profile`,"admin.experience":`Experience`,"admin.projects":`Projects`,"admin.skills":`Skills`,"admin.education":`Education`,"admin.certificates":`Certificates`,"admin.languages":`Languages`,"admin.blog":`Blog`,"admin.faq":`FAQ`,"admin.sections":`Sections`,"admin.agent":`AI Agent`,"admin.messages":`Messages`,"admin.settings":`Settings`,"admin.welcome":`Welcome back`,"admin.welcomeSub":`Here is an overview of your portfolio.`,"admin.unread":`Unread messages`,"admin.chatMessages":`Visitor chat messages`,"admin.recentMessages":`Recent messages`,"admin.quickActions":`Quick actions`,"admin.sectionsHint":`Choose which sections are visible on the public portfolio.`,"admin.contactMessages":`Contact messages`,"admin.chatLog":`AI chat log (this browser)`,"admin.markRead":`Mark as read`,"admin.markUnread":`Mark as unread`,"admin.clearChat":`Clear chat log`,"admin.changeCredentials":`Change credentials`,"admin.newPassword":`New password`,"admin.confirmPassword":`Confirm password`,"admin.passwordMismatch":`Passwords do not match or are shorter than 6 characters.`,"admin.data":`Data`,"admin.export":`Export JSON`,"admin.import":`Import JSON`,"admin.importError":`Invalid portfolio file.`,"admin.reset":`Reset to CV defaults`,"admin.resetConfirm":`Reset all portfolio content to the original CV data?`,"admin.agentEnabled":`Enable AI assistant on the website`,"admin.agentName":`Assistant name`,"admin.agentGreeting":`Greeting message`,"admin.agentMode":`Response engine`,"admin.agentModeAuto":`Auto — use AI model when available, otherwise local`,"admin.agentModeLocal":`Local — built-in knowledge engine only`,"admin.agentModeRemote":`AI model only (requires server API key)`,"admin.agentInstructions":`Extra instructions for the AI model`,"admin.agentSuggestions":`Suggested questions (one per line, English | Arabic)`,"admin.agentStatus":`Server AI model status`,"admin.agentConnected":`Connected`,"admin.agentNotConfigured":`Not configured — set OPENAI_API_KEY on the server. Local engine is used.`,"admin.agentUnreachable":`API server unreachable — local engine is used.`,"admin.sanityStatus":`Sanity CMS`,"admin.sanityConnected":`Connected — assistant settings and knowledge in Sanity override the values below.`,"admin.sanityLogging":`Visitor chats are saved to Sanity.`,"admin.sanityNotConfigured":`Not configured — set SANITY_PROJECT_ID on the server to manage the assistant in Sanity.`,"admin.available":`Available for work`},ar:{"nav.home":`الرئيسية`,"nav.about":`نبذة`,"nav.experience":`الخبرات`,"nav.projects":`المشاريع`,"nav.skills":`المهارات`,"nav.education":`التعليم`,"nav.certificates":`الشهادات`,"nav.contact":`تواصل`,"nav.blog":`المدونة`,"nav.faq":`الأسئلة الشائعة`,"nav.admin":`لوحة التحكم`,"common.present":`حتى الآن`,"common.toggleTheme":`تبديل المظهر`,"common.toggleLanguage":`تغيير اللغة`,"common.menu":`القائمة`,"common.save":`حفظ التغييرات`,"common.saving":`جارٍ الحفظ…`,"common.saved":`تم الحفظ بنجاح`,"common.cancel":`إلغاء`,"common.delete":`حذف`,"common.edit":`تعديل`,"common.add":`إضافة جديد`,"common.moveUp":`تحريك لأعلى`,"common.moveDown":`تحريك لأسفل`,"common.search":`بحث…`,"common.english":`الإنجليزية`,"common.arabic":`العربية`,"common.yes":`نعم`,"common.no":`لا`,"common.empty":`لا يوجد شيء بعد.`,"common.confirmDelete":`هل أنت متأكد من حذف هذا العنصر؟`,"hero.hello":`مرحبًا، أنا`,"hero.available":`متاح لفرص جديدة`,"hero.contact":`وظّفني`,"hero.cv":`تحميل السيرة الذاتية`,"hero.chat":`اسأل مساعدي الذكي`,"hero.years":`سنوات خبرة`,"hero.projects":`مشروع منجز`,"hero.companies":`شركات`,"about.title":`نبذة عني`,"about.subtitle":`من أنا وماذا أفعل`,"about.location":`الموقع`,"about.email":`البريد الإلكتروني`,"about.phone":`الهاتف`,"about.languages":`اللغات`,"about.softSkills":`المهارات الشخصية`,"experience.title":`الخبرات العملية`,"experience.subtitle":`أماكن عملي`,"projects.title":`أبرز المشاريع`,"projects.subtitle":`أعمال مختارة أفخر بها`,"projects.all":`الكل`,"projects.professional":`احترافية`,"projects.personal":`شخصية`,"projects.featured":`مميز`,"projects.visit":`زيارة`,"projects.demo":`مشاهدة العرض`,"certificates.verify":`التحقق من الشهادة`,"skills.title":`المهارات التقنية`,"skills.subtitle":`الأدوات والتقنيات التي أستخدمها`,"education.title":`التعليم`,"education.subtitle":`الخلفية الأكاديمية`,"certificates.title":`الدورات والشهادات`,"certificates.subtitle":`التعلم المستمر`,"blog.title":`المدونة`,"blog.subtitle":`ملاحظات عن هندسة الواجهات الأمامية و React والمنتجات ثنائية اللغة`,"blog.readMore":`اقرأ المقال`,"blog.viewAll":`عرض كل المقالات`,"blog.minRead":`دقائق قراءة`,"blog.back":`العودة إلى المدونة`,"blog.search":`ابحث في المقالات…`,"blog.allTags":`الكل`,"blog.empty":`لا توجد مقالات.`,"blog.notFound":`المقال غير موجود`,"blog.prev":`المقال السابق`,"blog.next":`المقال التالي`,"faq.title":`الأسئلة الشائعة`,"faq.subtitle":`إجابات سريعة على الأسئلة المتكررة`,"faq.askAi":`لديك سؤال آخر؟ اسأل المساعد الذكي`,"contact.title":`تواصل معي`,"contact.subtitle":`لديك مشروع أو فرصة عمل؟ لنتحدث.`,"contact.name":`الاسم`,"contact.email":`البريد الإلكتروني`,"contact.subject":`الموضوع`,"contact.message":`الرسالة`,"contact.send":`إرسال الرسالة`,"contact.sending":`جارٍ الإرسال…`,"contact.success":`شكرًا لك! تم إرسال رسالتك وسأرد عليك قريبًا.`,"contact.errorRequired":`يرجى تعبئة جميع الحقول.`,"contact.errorEmail":`يرجى إدخال بريد إلكتروني صحيح.`,"footer.rights":`جميع الحقوق محفوظة.`,"footer.built":`تم البناء باستخدام React 19 و Redux Persist و Tailwind و Less.`,"chat.open":`افتح المساعد الذكي`,"chat.close":`إغلاق المساعد`,"chat.placeholder":`اسألني أي شيء عن محمد…`,"chat.send":`إرسال`,"chat.clear":`مسح المحادثة`,"chat.typing":`يكتب…`,"chat.online":`متصل`,"chat.llm":`نموذج ذكاء اصطناعي`,"chat.local":`مساعد ذكي`,"chat.disclaimer":`الإجابات مبنية على ملف محمد وقد لا تكون دقيقة دائمًا.`,"admin.title":`لوحة التحكم`,"admin.login":`تسجيل الدخول`,"admin.loginTitle":`دخول المسؤول`,"admin.loginSubtitle":`إدارة محتوى معرض الأعمال`,"admin.username":`اسم المستخدم`,"admin.password":`كلمة المرور`,"admin.signingIn":`جارٍ تسجيل الدخول…`,"admin.invalid":`اسم المستخدم أو كلمة المرور غير صحيحة.`,"admin.defaultHint":`بيانات الدخول الافتراضية: admin / admin123 — غيّرها من الإعدادات.`,"admin.logout":`تسجيل الخروج`,"admin.viewSite":`عرض الموقع`,"admin.dashboard":`الرئيسية`,"admin.profile":`الملف الشخصي`,"admin.experience":`الخبرات`,"admin.projects":`المشاريع`,"admin.skills":`المهارات`,"admin.education":`التعليم`,"admin.certificates":`الشهادات`,"admin.languages":`اللغات`,"admin.blog":`المدونة`,"admin.faq":`الأسئلة الشائعة`,"admin.sections":`الأقسام`,"admin.agent":`المساعد الذكي`,"admin.messages":`الرسائل`,"admin.settings":`الإعدادات`,"admin.welcome":`مرحبًا بعودتك`,"admin.welcomeSub":`إليك نظرة عامة على معرض أعمالك.`,"admin.unread":`رسائل غير مقروءة`,"admin.chatMessages":`رسائل الزوار للمساعد`,"admin.recentMessages":`أحدث الرسائل`,"admin.quickActions":`إجراءات سريعة`,"admin.sectionsHint":`اختر الأقسام الظاهرة في الموقع العام.`,"admin.contactMessages":`رسائل التواصل`,"admin.chatLog":`سجل محادثات المساعد (هذا المتصفح)`,"admin.markRead":`تحديد كمقروءة`,"admin.markUnread":`تحديد كغير مقروءة`,"admin.clearChat":`مسح سجل المحادثة`,"admin.changeCredentials":`تغيير بيانات الدخول`,"admin.newPassword":`كلمة المرور الجديدة`,"admin.confirmPassword":`تأكيد كلمة المرور`,"admin.passwordMismatch":`كلمتا المرور غير متطابقتين أو أقصر من 6 أحرف.`,"admin.data":`البيانات`,"admin.export":`تصدير JSON`,"admin.import":`استيراد JSON`,"admin.importError":`ملف غير صالح.`,"admin.reset":`استعادة بيانات السيرة الذاتية`,"admin.resetConfirm":`هل تريد استعادة كل المحتوى إلى بيانات السيرة الذاتية الأصلية؟`,"admin.agentEnabled":`تفعيل المساعد الذكي في الموقع`,"admin.agentName":`اسم المساعد`,"admin.agentGreeting":`رسالة الترحيب`,"admin.agentMode":`محرك الإجابة`,"admin.agentModeAuto":`تلقائي — نموذج الذكاء الاصطناعي عند توفره وإلا المحرك المحلي`,"admin.agentModeLocal":`محلي — محرك المعرفة المدمج فقط`,"admin.agentModeRemote":`نموذج الذكاء الاصطناعي فقط (يتطلب مفتاح API على الخادم)`,"admin.agentInstructions":`تعليمات إضافية لنموذج الذكاء الاصطناعي`,"admin.agentSuggestions":`أسئلة مقترحة (سطر لكل سؤال، English | عربي)`,"admin.agentStatus":`حالة نموذج الذكاء الاصطناعي على الخادم`,"admin.agentConnected":`متصل`,"admin.agentNotConfigured":`غير مُعد — أضف OPENAI_API_KEY على الخادم. يتم استخدام المحرك المحلي.`,"admin.agentUnreachable":`تعذر الوصول إلى الخادم — يتم استخدام المحرك المحلي.`,"admin.sanityStatus":`Sanity CMS`,"admin.sanityConnected":`متصل — إعدادات المساعد ومعلوماته في Sanity تتجاوز القيم أدناه.`,"admin.sanityLogging":`يتم حفظ محادثات الزوار في Sanity.`,"admin.sanityNotConfigured":`غير مُعد — اضبط SANITY_PROJECT_ID على الخادم لإدارة المساعد من Sanity.`,"admin.available":`متاح للعمل`}},fe=ue(),pe=`ms-lang`,me=(0,p.createContext)(null),he=()=>{if(typeof window>`u`)return`en`;let e=window.localStorage.getItem(pe);return e===`en`||e===`ar`?e:window.navigator.language?.startsWith(`ar`)?`ar`:`en`};function ge({children:e,defaultLang:t}){let[n,r]=(0,p.useState)(()=>t??he()),i=n===`ar`?`rtl`:`ltr`;(0,p.useEffect)(()=>{document.documentElement.lang=n,document.documentElement.dir=i,window.localStorage.setItem(pe,n)},[n,i]);let a=(0,p.useCallback)(()=>r(e=>e===`en`?`ar`:`en`),[]),o=(0,p.useMemo)(()=>{let e=n===`ar`?`ar-EG`:`en-US`;return{lang:n,dir:i,isRTL:i===`rtl`,setLang:r,toggleLang:a,t:e=>de[n][e]??e,tr:e=>e?e[n]||e.en||e.ar:``,formatDate:t=>{if(!t)return``;if(t===`present`)return de[n][`common.present`];let[r,i]=t.split(`-`).map(Number);return i?new Intl.DateTimeFormat(e,{year:`numeric`,month:`short`}).format(new Date(r,i-1,1)):String(r)}}},[n,i,a]);return(0,fe.jsx)(me,{value:o,children:e})}function _e(){let e=(0,p.use)(me);if(!e)throw Error(`useLanguage must be used inside <LanguageProvider>`);return e}function O(e){return`Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var ve=typeof Symbol==`function`&&Symbol.observable||`@@observable`,ye=()=>Math.random().toString(36).substring(7).split(``).join(`.`),be={INIT:`@@redux/INIT${ye()}`,REPLACE:`@@redux/REPLACE${ye()}`,PROBE_UNKNOWN_ACTION:()=>`@@redux/PROBE_UNKNOWN_ACTION${ye()}`};function xe(e){if(typeof e!=`object`||!e)return!1;let t=e;for(;Object.getPrototypeOf(t)!==null;)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t||Object.getPrototypeOf(e)===null}function Se(e,t,n){if(typeof e!=`function`)throw Error(O(2));if(typeof t==`function`&&typeof n==`function`||typeof n==`function`&&typeof arguments[3]==`function`)throw Error(O(0));if(typeof t==`function`&&n===void 0&&(n=t,t=void 0),n!==void 0){if(typeof n!=`function`)throw Error(O(1));return n(Se)(e,t)}let r=e,i=t,a=new Map,o=a,s=0,c=!1;function l(){o===a&&(o=new Map,a.forEach((e,t)=>{o.set(t,e)}))}function u(){if(c)throw Error(O(3));return i}function d(e){if(typeof e!=`function`)throw Error(O(4));if(c)throw Error(O(5));let t=!0;l();let n=s++;return o.set(n,e),function(){if(t){if(c)throw Error(O(6));t=!1,l(),o.delete(n),a=null}}}function f(e){if(!xe(e))throw Error(O(7));if(e.type===void 0)throw Error(O(8));if(typeof e.type!=`string`)throw Error(O(17));if(c)throw Error(O(9));try{c=!0,i=r(i,e)}finally{c=!1}return(a=o).forEach(e=>{e()}),e}function p(e){if(typeof e!=`function`)throw Error(O(10));r=e,f({type:be.REPLACE})}function m(){let e=d;return{subscribe(t){if(typeof t!=`object`||!t)throw Error(O(11));function n(){let e=t;e.next&&e.next(u())}return n(),{unsubscribe:e(n)}},[ve](){return this}}}return f({type:be.INIT}),{dispatch:f,subscribe:d,getState:u,replaceReducer:p,[ve]:m}}function Ce(e){Object.keys(e).forEach(t=>{let n=e[t];if(n(void 0,{type:be.INIT})===void 0)throw Error(O(12));if(n(void 0,{type:be.PROBE_UNKNOWN_ACTION()})===void 0)throw Error(O(13))})}function we(e){let t=Object.keys(e),n={};for(let r=0;r<t.length;r++){let i=t[r];typeof e[i]==`function`&&(n[i]=e[i])}let r=Object.keys(n),i;try{Ce(n)}catch(e){i=e}return function(e={},t){if(i)throw i;let a=!1,o={};for(let i=0;i<r.length;i++){let s=r[i],c=n[s],l=e[s],u=c(l,t);if(u===void 0)throw t&&t.type,Error(O(14));o[s]=u,a||=u!==l}return a||=r.length!==Object.keys(e).length,a?o:e}}function Te(...e){return e.length===0?e=>e:e.length===1?e[0]:e.reduce((e,t)=>(...n)=>e(t(...n)))}function Ee(...e){return t=>(n,r)=>{let i=t(n,r),a=()=>{throw Error(O(15))},o={getState:i.getState,dispatch:(e,...t)=>a(e,...t)};return a=Te(...e.map(e=>e(o)))(i.dispatch),{...i,dispatch:a}}}function De(e){return xe(e)&&`type`in e&&typeof e.type==`string`}var Oe=Symbol.for(`immer-nothing`),ke=Symbol.for(`immer-draftable`),k=Symbol.for(`immer-state`);function A(e,...t){throw Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`)}var j=Object,M=j.getPrototypeOf,N=`constructor`,P=`prototype`,Ae=`configurable`,F=`enumerable`,I=`writable`,L=`value`,R=e=>!!e&&!!e[k];function z(e){return e?Ne(e)||Le(e)||!!e[ke]||!!e[N]?.[ke]||Re(e)||U(e):!1}var je=j[P][N].toString(),Me=new WeakMap;function Ne(e){if(!e||!ze(e))return!1;let t=M(e);if(t===null||t===j[P])return!0;let n=j.hasOwnProperty.call(t,N)&&t[N];if(n===Object)return!0;if(!W(n))return!1;let r=Me.get(n);return r===void 0&&(r=Function.toString.call(n),Me.set(n,r)),r===je}function B(e,t,n=!0){V(e)===0?(n?Reflect.ownKeys(e):j.keys(e)).forEach(n=>{t(n,e[n],e)}):e.forEach((n,r)=>t(r,n,e))}function V(e){let t=e[k];return t?t.type_:Le(e)?1:Re(e)?2:U(e)?3:0}var Pe=(e,t,n=V(e))=>n===2?e.has(t):j[P].hasOwnProperty.call(e,t),Fe=(e,t,n=V(e))=>n===2?e.get(t):e[t],H=(e,t,n,r=V(e))=>{r===2?e.set(t,n):r===3?e.add(n):e[t]=n};function Ie(e,t){return e===t?e!==0||1/e==1/t:e!==e&&t!==t}var Le=Array.isArray,Re=e=>e instanceof Map,U=e=>e instanceof Set,ze=e=>typeof e==`object`,W=e=>typeof e==`function`,Be=e=>typeof e==`boolean`;function Ve(e){let t=+e;return Number.isInteger(t)&&String(t)===e}var G=e=>e.copy_||e.base_,He=e=>e.modified_?e.copy_:e.base_;function Ue(e,t){if(Re(e))return new Map(e);if(U(e))return new Set(e);if(Le(e))return Array[P].slice.call(e);let n=Ne(e);if(t===!0||t===`class_only`&&!n){let t=j.getOwnPropertyDescriptors(e);delete t[k];let n=Reflect.ownKeys(t);for(let r=0;r<n.length;r++){let i=n[r],a=t[i];a[I]===!1&&(a[I]=!0,a[Ae]=!0),(a.get||a.set)&&(t[i]={[Ae]:!0,[I]:!0,[F]:a[F],[L]:e[i]})}return j.create(M(e),t)}{let t=M(e);if(t!==null&&n)return{...e};let r=j.create(t);return j.assign(r,e)}}function We(e,t=!1){return qe(e)||R(e)||!z(e)||(V(e)>1&&j.defineProperties(e,{set:Ke,add:Ke,clear:Ke,delete:Ke}),j.freeze(e),t&&B(e,(e,t)=>{We(t,!0)},!1)),e}function Ge(){A(2)}var Ke={[L]:Ge};function qe(e){return e===null||!ze(e)||j.isFrozen(e)}var Je=`MapSet`,Ye=`Patches`,Xe=`ArrayMethods`,Ze={};function K(e){let t=Ze[e];return t||A(0,e),t}var Qe=e=>!!Ze[e],q,$e=()=>q,et=(e,t)=>({drafts_:[],parent_:e,immer_:t,canAutoFreeze_:!0,unfinalizedDrafts_:0,handledSet_:new Set,processedForPatches_:new Set,mapSetPlugin_:Qe(Je)?K(Je):void 0,arrayMethodsPlugin_:Qe(Xe)?K(Xe):void 0});function tt(e,t){t&&(e.patchPlugin_=K(Ye),e.patches_=[],e.inversePatches_=[],e.patchListener_=t)}function nt(e){rt(e),e.drafts_.forEach(at),e.drafts_=null}function rt(e){e===q&&(q=e.parent_)}var it=e=>q=et(q,e);function at(e){let t=e[k];t.type_===0||t.type_===1?t.revoke_():t.revoked_=!0}function ot(e,t){t.unfinalizedDrafts_=t.drafts_.length;let n=t.drafts_[0];if(e!==void 0&&e!==n){n[k].modified_&&(nt(t),A(4)),z(e)&&(e=st(t,e));let{patchPlugin_:r}=t;r&&r.generateReplacementPatches_(n[k].base_,e,t)}else e=st(t,n);return ct(t,e,!0),nt(t),t.patches_&&t.patchListener_(t.patches_,t.inversePatches_),e===Oe?void 0:e}function st(e,t){if(qe(t))return t;let n=t[k];if(!n)return gt(t,e.handledSet_,e);if(!ut(n,e))return t;if(!n.modified_)return n.base_;if(!n.finalized_){let{callbacks_:t}=n;if(t)for(;t.length>0;)t.pop()(e);mt(n,e)}return n.copy_}function ct(e,t,n=!1){!e.parent_&&e.immer_.autoFreeze_&&e.canAutoFreeze_&&We(t,n)}function lt(e){e.finalized_=!0,e.scope_.unfinalizedDrafts_--}var ut=(e,t)=>e.scope_===t,dt=[];function ft(e,t,n,r){let i=G(e),a=e.type_;if(r!==void 0&&Fe(i,r,a)===t){H(i,r,n,a);return}if(!e.draftLocations_){let t=e.draftLocations_=new Map;B(i,(e,n)=>{if(R(n)){let r=t.get(n)||[];r.push(e),t.set(n,r)}})}let o=e.draftLocations_.get(t)??dt;for(let e of o)H(i,e,n,a)}function pt(e,t,n){e.callbacks_.push(function(r){let i=t;if(!i||!ut(i,r))return;r.mapSetPlugin_?.fixSetContents(i);let a=He(i);ft(e,i.draft_??i,a,n),mt(i,r)})}function mt(e,t){if(e.modified_&&!e.finalized_&&(e.type_===3||e.type_===1&&e.allIndicesReassigned_||(e.assigned_?.size??0)>0)){let{patchPlugin_:n}=t;if(n){let r=n.getPath(e);r&&n.generatePatches_(e,r,t)}lt(e)}}function ht(e,t,n){let{scope_:r}=e;if(R(n)){let i=n[k];ut(i,r)&&i.callbacks_.push(function(){Y(e),ft(e,n,He(i),t)})}else z(n)&&e.callbacks_.push(function(){let i=G(e);e.type_===3?i.has(n)&&gt(n,r.handledSet_,r):Fe(i,t,e.type_)===n&&r.drafts_.length>1&&(e.assigned_.get(t)??!1)===!0&&e.copy_&&gt(Fe(e.copy_,t,e.type_),r.handledSet_,r)})}function gt(e,t,n){return!n.immer_.autoFreeze_&&n.unfinalizedDrafts_<1||R(e)||t.has(e)||!z(e)||qe(e)||(t.add(e),B(e,(r,i)=>{if(R(i)){let t=i[k];ut(t,n)&&(H(e,r,He(t),e.type_),lt(t))}else z(i)&&gt(i,t,n)})),e}function _t(e,t){let n=Le(e),r={type_:+!!n,scope_:t?t.scope_:$e(),modified_:!1,finalized_:!1,assigned_:void 0,parent_:t,base_:e,draft_:null,copy_:null,revoke_:null,isManual_:!1,callbacks_:void 0},i=r,a=vt;n&&(i=[r],a=J);let{revoke:o,proxy:s}=Proxy.revocable(i,a);return r.draft_=s,r.revoke_=o,[s,r]}var vt={get(e,t){if(t===k)return e;let n=e.scope_.arrayMethodsPlugin_,r=e.type_===1&&typeof t==`string`;if(r&&n?.isArrayOperationMethod(t))return n.createMethodInterceptor(e,t);let i=G(e);if(!Pe(i,t,e.type_))return xt(e,i,t);let a=i[t];if(e.finalized_||!z(a)||r&&e.operationMethod&&n?.isMutatingArrayMethod(e.operationMethod)&&Ve(t))return a;if(a===yt(e.base_,t)||bt(e,t,a)){Y(e);let n=e.type_===1?+t:t,r=Tt(e.scope_,a,e,n);return e.copy_[n]=r}return a},has(e,t){return t in G(e)},ownKeys(e){return Reflect.ownKeys(G(e))},set(e,t,n){let r=St(G(e),t);if(r?.set)return r.set.call(e.draft_,n),!0;if(!e.modified_){let r=yt(G(e),t),i=r?.[k];if(i&&i.base_===n)return e.copy_[t]=n,e.assigned_.delete(t),!0;if(Ie(n,r)&&(n!==void 0||Pe(e.base_,t,e.type_)))return!0;Y(e),Ct(e)}return e.copy_[t]===n&&(n!==void 0||Pe(e.copy_,t,e.type_))||Number.isNaN(n)&&Number.isNaN(e.copy_[t])||(e.copy_[t]=n,e.assigned_.set(t,!0),ht(e,t,n)),!0},deleteProperty(e,t){return Y(e),yt(e.base_,t)!==void 0||t in e.base_?(e.assigned_.set(t,!1),Ct(e)):e.assigned_.delete(t),e.copy_&&delete e.copy_[t],!0},getOwnPropertyDescriptor(e,t){let n=G(e),r=Reflect.getOwnPropertyDescriptor(n,t);return r&&{[I]:!0,[Ae]:e.type_!==1||t!==`length`,[F]:r[F],[L]:n[t]}},defineProperty(){A(11)},getPrototypeOf(e){return M(e.base_)},setPrototypeOf(){A(12)}},J={};for(let e in vt){let t=vt[e];J[e]=function(){let e=arguments;return e[0]=e[0][0],t.apply(this,e)}}J.deleteProperty=function(e,t){return J.set.call(this,e,t,void 0)},J.set=function(e,t,n){return vt.set.call(this,e[0],t,n,e[0])};function yt(e,t){let n=e[k];return(n?G(n):e)[t]}function bt(e,t,n){return e.type_!==1||!e.allIndicesReassigned_||!z(n)||n[k]?!1:e.baseRefs_.has(n)}function xt(e,t,n){let r=St(t,n);return r?L in r?r[L]:r.get?.call(e.draft_):void 0}function St(e,t){if(!(t in e))return;let n=M(e);for(;n;){let e=Object.getOwnPropertyDescriptor(n,t);if(e)return e;n=M(n)}}function Ct(e){e.modified_||(e.modified_=!0,e.parent_&&Ct(e.parent_))}function Y(e){e.copy_||=(e.assigned_=new Map,Ue(e.base_,e.scope_.immer_.useStrictShallowCopy_))}var wt=class{constructor(e){this.autoFreeze_=!0,this.useStrictShallowCopy_=!1,this.useStrictIteration_=!1,this.produce=(e,t,n)=>{if(W(e)&&!W(t)){let n=t;t=e;let r=this;return function(e=n,...i){return r.produce(e,e=>t.call(this,e,...i))}}W(t)||A(6),n!==void 0&&!W(n)&&A(7);let r;if(z(e)){let i=it(this),a=Tt(i,e,void 0),o=!0;try{r=t(a),o=!1}finally{o?nt(i):rt(i)}return tt(i,n),ot(r,i)}if(!e||!ze(e)){if(r=t(e),r===void 0&&(r=e),r===Oe&&(r=void 0),this.autoFreeze_&&We(r,!0),n){let t=[],i=[];K(Ye).generateReplacementPatches_(e,r,{patches_:t,inversePatches_:i}),n(t,i)}return r}A(1,e)},this.produceWithPatches=(e,t)=>{if(W(e))return(t,...n)=>this.produceWithPatches(t,t=>e(t,...n));let n,r;return[this.produce(e,t,(e,t)=>{n=e,r=t}),n,r]},Be(e?.autoFreeze)&&this.setAutoFreeze(e.autoFreeze),Be(e?.useStrictShallowCopy)&&this.setUseStrictShallowCopy(e.useStrictShallowCopy),Be(e?.useStrictIteration)&&this.setUseStrictIteration(e.useStrictIteration)}createDraft(e){z(e)||A(8),R(e)&&(e=Et(e));let t=it(this),n=Tt(t,e,void 0);return n[k].isManual_=!0,rt(t),n}finishDraft(e,t){let n=e&&e[k];n&&n.isManual_||A(9);let{scope_:r}=n;return tt(r,t),ot(void 0,r)}setAutoFreeze(e){this.autoFreeze_=e}setUseStrictShallowCopy(e){this.useStrictShallowCopy_=e}setUseStrictIteration(e){this.useStrictIteration_=e}shouldUseStrictIteration(){return this.useStrictIteration_}applyPatches(e,t){let n;for(n=t.length-1;n>=0;n--){let r=t[n];if(r.path.length===0&&r.op===`replace`){e=r.value;break}}n>-1&&(t=t.slice(n+1));let r=K(Ye).applyPatches_;return R(e)?r(e,t):this.produce(e,e=>r(e,t))}};function Tt(e,t,n,r){let[i,a]=Re(t)?K(Je).proxyMap_(t,n):U(t)?K(Je).proxySet_(t,n):_t(t,n);return(n?.scope_??$e()).drafts_.push(i),a.callbacks_=n?.callbacks_??[],a.key_=r,n&&r!==void 0?pt(n,a,r):a.callbacks_.push(function(e){e.mapSetPlugin_?.fixSetContents(a);let{patchPlugin_:t}=e;a.modified_&&t&&t.generatePatches_(a,[],e)}),i}function Et(e){return R(e)||A(10,e),Dt(e)}function Dt(e){if(!z(e)||qe(e))return e;let t=e[k],n,r=!0;if(t){if(!t.modified_)return t.base_;t.finalized_=!0,n=Ue(e,t.scope_.immer_.useStrictShallowCopy_),r=t.scope_.immer_.shouldUseStrictIteration()}else n=Ue(e,!0);let i=n;return U(n)&&(n=new Set),B(i,(e,t)=>{H(n,e,Dt(t))},r),t&&(t.finalized_=!1),n}globalThis.Iterator?.from;var Ot=new wt().produce;function kt(e){return({dispatch:t,getState:n})=>r=>i=>typeof i==`function`?i(t,n,e):r(i)}var At=kt(),jt=kt,Mt=typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(arguments.length!==0)return typeof arguments[0]==`object`?Te:Te.apply(null,arguments)};typeof window<`u`&&window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__;function Nt(e,t){function n(...n){if(t){let r=t(...n);if(!r)throw Error(Z(0));return{type:e,payload:r.payload,...`meta`in r&&{meta:r.meta},...`error`in r&&{error:r.error}}}return{type:e,payload:n[0]}}return n.toString=()=>`${e}`,n.type=e,n.match=t=>De(t)&&t.type===e,n}var Pt=class e extends Array{constructor(...t){super(...t),Object.setPrototypeOf(this,e.prototype)}static get[Symbol.species](){return e}concat(...e){return super.concat.apply(this,e)}prepend(...t){return t.length===1&&Array.isArray(t[0])?new e(...t[0].concat(this)):new e(...t.concat(this))}};function Ft(e){return z(e)?Ot(e,()=>{}):e}function It(e,t,n){return e.has(t)?e.get(t):e.set(t,n(t)).get(t)}function Lt(e){return typeof e==`boolean`}var Rt=()=>function(e){let{thunk:t=!0,immutableCheck:n=!0,serializableCheck:r=!0,actionCreatorCheck:i=!0}=e??{},a=new Pt;return t&&(Lt(t)?a.push(At):a.push(jt(t.extraArgument))),a},zt=`RTK_autoBatch`,Bt=e=>t=>{setTimeout(t,e)},Vt=(e,t)=>n=>{let r=!1,i,a,o=()=>{r||(r=!0,cancelAnimationFrame(i),clearTimeout(a),n())};i=e(o),a=setTimeout(o,t)},Ht=(e={type:`raf`})=>t=>(...n)=>{let r=t(...n),i=!0,a=!1,o=!1,s=new Set,c=e.type===`tick`?queueMicrotask:e.type===`raf`?typeof window<`u`&&window.requestAnimationFrame?Vt(window.requestAnimationFrame,100):Bt(10):e.type===`callback`?e.queueNotification:Bt(e.timeout),l=()=>{o=!1,a&&(a=!1,s.forEach(e=>e()))};return Object.assign({},r,{subscribe(e){let t=r.subscribe(()=>i&&e());return s.add(e),()=>{t(),s.delete(e)}},dispatch(e){try{return i=!e?.meta?.[zt],a=!i,a&&(o||(o=!0,c(l))),r.dispatch(e)}finally{i=!0}}})},Ut=e=>function(t){let{autoBatch:n=!0}=t??{},r=new Pt(e);return n&&r.push(Ht(typeof n==`object`?n:void 0)),r};function Wt(e){let t=Rt(),{reducer:n=void 0,middleware:r,devTools:i=!0,duplicateMiddlewareCheck:a=!0,preloadedState:o=void 0,enhancers:s=void 0}=e||{},c;if(typeof n==`function`)c=n;else if(xe(n))c=we(n);else throw Error(Z(1));let l;l=typeof r==`function`?r(t):t();let u=Te;i&&(u=Mt({trace:!1,...typeof i==`object`&&i}));let d=Ut(Ee(...l)),f=typeof s==`function`?s(d):d(),p=u(...f);return Se(c,o,p)}function Gt(e){let t={},n=[],r,i={addCase(e,n){let r=typeof e==`string`?e:e.type;if(!r)throw Error(Z(28));if(r in t)throw Error(Z(29));return t[r]=n,i},addAsyncThunk(e,r){return r.pending&&(t[e.pending.type]=r.pending),r.rejected&&(t[e.rejected.type]=r.rejected),r.fulfilled&&(t[e.fulfilled.type]=r.fulfilled),r.settled&&n.push({matcher:e.settled,reducer:r.settled}),i},addMatcher(e,t){return n.push({matcher:e,reducer:t}),i},addDefaultCase(e){return r=e,i}};return e(i),[t,n,r]}function Kt(e){return typeof e==`function`}function qt(e,t){let[n,r,i]=Gt(t),a;if(Kt(e))a=()=>Ft(e());else{let t=Ft(e);a=()=>t}function o(e=a(),t){let o=[n[t.type],...r.filter(({matcher:e})=>e(t)).map(({reducer:e})=>e)];return o.filter(e=>!!e).length===0&&(o=[i]),o.reduce((e,n)=>{if(n){if(R(e)){let r=n(e,t);return r===void 0?e:r}if(z(e))return Ot(e,e=>n(e,t));{let r=n(e,t);if(r===void 0){if(e===null)return e;throw Error(Z(9))}return r}}return e},e)}return o.getInitialState=a,o}var Jt=Symbol.for(`rtk-slice-createasyncthunk`);function Yt(e,t){return`${e}/${t}`}function Xt({creators:e}={}){let t=e?.asyncThunk?.[Jt];return function(e){let{name:n,reducerPath:r=n}=e;if(!n)throw Error(Z(11));let i=(typeof e.reducers==`function`?e.reducers(Qt()):e.reducers)||{},a=Object.keys(i),o={sliceCaseReducersByName:{},sliceCaseReducersByType:{},actionCreators:{},sliceMatchers:[]},s={addCase(e,t){let n=typeof e==`string`?e:e.type;if(!n)throw Error(Z(12));if(n in o.sliceCaseReducersByType)throw Error(Z(13));return o.sliceCaseReducersByType[n]=t,s},addMatcher(e,t){return o.sliceMatchers.push({matcher:e,reducer:t}),s},exposeAction(e,t){return o.actionCreators[e]=t,s},exposeCaseReducer(e,t){return o.sliceCaseReducersByName[e]=t,s}};a.forEach(r=>{let a=i[r],o={reducerName:r,type:Yt(n,r),createNotation:typeof e.reducers==`function`};en(a)?nn(o,a,s,t):$t(o,a,s)});function c(){let[t={},n=[],r=void 0]=typeof e.extraReducers==`function`?Gt(e.extraReducers):[e.extraReducers],i={...t,...o.sliceCaseReducersByType};return qt(e.initialState,e=>{for(let t in i)e.addCase(t,i[t]);for(let t of o.sliceMatchers)e.addMatcher(t.matcher,t.reducer);for(let t of n)e.addMatcher(t.matcher,t.reducer);r&&e.addDefaultCase(r)})}let l=e=>e,u=new Map,d=new WeakMap,f;function p(e,t){return f||=c(),f(e,t)}function m(){return f||=c(),f.getInitialState()}function h(t,n=!1){function r(e){let i=e[t];return i===void 0&&n&&(i=It(d,r,m)),i}function i(t=l){return It(It(u,n,()=>new WeakMap),t,()=>{let r={};for(let[i,a]of Object.entries(e.selectors??{}))r[i]=Zt(a,t,()=>It(d,t,m),n);return r})}return{reducerPath:t,getSelectors:i,get selectors(){return i(r)},selectSlice:r}}let g={name:n,reducer:p,actions:o.actionCreators,caseReducers:o.sliceCaseReducersByName,getInitialState:m,...h(r),injectInto(e,{reducerPath:t,...n}={}){let i=t??r;return e.inject({reducerPath:i,reducer:p},n),{...g,...h(i,!0)}}};return g}}function Zt(e,t,n,r){function i(i,...a){let o=t(i);return o===void 0&&r&&(o=n()),e(o,...a)}return i.unwrapped=e,i}var X=Xt();function Qt(){function e(e,t){return{_reducerDefinitionType:`asyncThunk`,payloadCreator:e,...t}}return e.withTypes=()=>e,{reducer(e){return Object.assign({[e.name](...t){return e(...t)}}[e.name],{_reducerDefinitionType:`reducer`})},preparedReducer(e,t){return{_reducerDefinitionType:`reducerWithPrepare`,prepare:e,reducer:t}},asyncThunk:e}}function $t({type:e,reducerName:t,createNotation:n},r,i){let a,o;if(`reducer`in r){if(n&&!tn(r))throw Error(Z(17));a=r.reducer,o=r.prepare}else a=r;i.addCase(e,a).exposeCaseReducer(t,a).exposeAction(t,o?Nt(e,o):Nt(e))}function en(e){return e._reducerDefinitionType===`asyncThunk`}function tn(e){return e._reducerDefinitionType===`reducerWithPrepare`}function nn({type:e,reducerName:t},n,r,i){if(!i)throw Error(Z(18));let{payloadCreator:a,fulfilled:o,pending:s,rejected:c,settled:l,options:u}=n,d=i(e,a,u);r.exposeAction(t,d),o&&r.addCase(d.fulfilled,o),s&&r.addCase(d.pending,s),c&&r.addCase(d.rejected,c),l&&r.addMatcher(d.settled,l),r.exposeCaseReducer(t,{fulfilled:o||rn,pending:s||rn,rejected:c||rn,settled:l||rn})}function rn(){}var{assign:an}=Object;function Z(e){return`Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `}var on=`persist:`,sn=`persist/FLUSH`,cn=`persist/REHYDRATE`,ln=`persist/PAUSE`,un=`persist/PERSIST`,dn=`persist/PURGE`,fn=`persist/REGISTER`;function pn(e){return pn=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},pn(e)}function mn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function hn(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?mn(n,!0).forEach(function(t){gn(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):mn(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function gn(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _n(e,t,n,r){r.debug;var i=hn({},n);return e&&pn(e)===`object`&&Object.keys(e).forEach(function(r){r!==`_persist`&&t[r]===n[r]&&(i[r]=e[r])}),i}function vn(e){var t=e.blacklist||null,n=e.whitelist||null,r=e.transforms||[],i=e.throttle||0,a=`${e.keyPrefix===void 0?on:e.keyPrefix}${e.key}`,o=e.storage,s=e.serialize===!1?function(e){return e}:typeof e.serialize==`function`?e.serialize:yn,c=e.writeFailHandler||null,l={},u={},d=[],f=null,p=null,m=function(e){Object.keys(e).forEach(function(t){_(t)&&l[t]!==e[t]&&d.indexOf(t)===-1&&d.push(t)}),Object.keys(l).forEach(function(t){e[t]===void 0&&_(t)&&d.indexOf(t)===-1&&l[t]!==void 0&&d.push(t)}),f===null&&(f=setInterval(h,i)),l=e};function h(){if(d.length===0)f&&clearInterval(f),f=null;else{var e=d.shift(),t=r.reduce(function(t,n){return n.in(t,e,l)},l[e]);if(t!==void 0)try{u[e]=s(t)}catch(e){console.error(`redux-persist/createPersistoid: error serializing state`,e)}else delete u[e];d.length===0&&g()}}function g(){Object.keys(u).forEach(function(e){l[e]===void 0&&delete u[e]}),p=o.setItem(a,s(u)).catch(v)}function _(e){return!(n&&n.indexOf(e)===-1&&e!==`_persist`||t&&t.indexOf(e)!==-1)}function v(e){c&&c(e)}return{update:m,flush:function(){for(;d.length!==0;)h();return p||Promise.resolve()}}}function yn(e){return JSON.stringify(e)}function bn(e){var t=e.transforms||[],n=`${e.keyPrefix===void 0?on:e.keyPrefix}${e.key}`,r=e.storage;e.debug;var i=e.deserialize===!1?function(e){return e}:typeof e.deserialize==`function`?e.deserialize:xn;return r.getItem(n).then(function(e){if(e)try{var n={},r=i(e);return Object.keys(r).forEach(function(e){n[e]=t.reduceRight(function(t,n){return n.out(t,e,r)},i(r[e]))}),n}catch(e){throw e}})}function xn(e){return JSON.parse(e)}function Sn(e){var t=e.storage,n=`${e.keyPrefix===void 0?on:e.keyPrefix}${e.key}`;return t.removeItem(n,Cn)}function Cn(e){}function wn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Q(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?wn(n,!0).forEach(function(t){Tn(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):wn(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function Tn(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function En(e,t){if(e==null)return{};var n=Dn(e,t),r,i;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)r=a[i],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}function Dn(e,t){if(e==null)return{};for(var n={},r=Object.keys(e),i,a=0;a<r.length;a++)i=r[a],!(t.indexOf(i)>=0)&&(n[i]=e[i]);return n}var On=5e3;function kn(e,t){var n=e.version===void 0?-1:e.version;e.debug;var r=e.stateReconciler===void 0?_n:e.stateReconciler,i=e.getStoredState||bn,a=e.timeout===void 0?On:e.timeout,o=null,s=!1,c=!0,l=function(e){return e._persist.rehydrated&&o&&!c&&o.update(e),e};return function(u,d){var f=u||{},p=f._persist,m=En(f,[`_persist`]);if(d.type===`persist/PERSIST`){var h=!1,g=function(t,n){h||=(d.rehydrate(e.key,t,n),!0)};if(a&&setTimeout(function(){!h&&g(void 0,Error(`redux-persist: persist timed out for persist key "${e.key}"`))},a),c=!1,o||=vn(e),p)return Q({},t(m,d),{_persist:p});if(typeof d.rehydrate!=`function`||typeof d.register!=`function`)throw Error(`redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.`);return d.register(e.key),i(e).then(function(t){(e.migrate||function(e,t){return Promise.resolve(e)})(t,n).then(function(e){g(e)},function(e){g(void 0,e)})},function(e){g(void 0,e)}),Q({},t(m,d),{_persist:{version:n,rehydrated:!1}})}if(d.type===`persist/PURGE`)return s=!0,d.result(Sn(e)),Q({},t(m,d),{_persist:p});if(d.type===`persist/FLUSH`)return d.result(o&&o.flush()),Q({},t(m,d),{_persist:p});if(d.type===`persist/PAUSE`)c=!0;else if(d.type===`persist/REHYDRATE`){if(s)return Q({},m,{_persist:Q({},p,{rehydrated:!0})});if(d.key===e.key){var _=t(m,d),v=d.payload;return l(Q({},r!==!1&&v!==void 0?r(v,u,_,e):_,{_persist:Q({},p,{rehydrated:!0})}))}}if(!p)return t(u,d);var y=t(m,d);return y===m?u:l(Q({},y,{_persist:p}))}}function An(e){return Nn(e)||Mn(e)||jn()}function jn(){throw TypeError(`Invalid attempt to spread non-iterable instance`)}function Mn(e){if(Symbol.iterator in Object(e)||Object.prototype.toString.call(e)===`[object Arguments]`)return Array.from(e)}function Nn(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function Pn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function Fn(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?Pn(n,!0).forEach(function(t){In(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Pn(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function In(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Ln={registry:[],bootstrapped:!1},Rn=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Ln,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case fn:return Fn({},e,{registry:[].concat(An(e.registry),[t.key])});case cn:var n=e.registry.indexOf(t.key),r=An(e.registry);return r.splice(n,1),Fn({},e,{registry:r,bootstrapped:r.length===0});default:return e}};function zn(e,t,n){var r=n||!1,i=Se(Rn,Ln,t&&t.enhancer?t.enhancer:void 0),a=function(e){i.dispatch({type:fn,key:e})},o=function(t,n,a){var o={type:cn,payload:n,err:a,key:t};e.dispatch(o),i.dispatch(o),r&&s.getState().bootstrapped&&(r(),r=!1)},s=Fn({},i,{purge:function(){var t=[];return e.dispatch({type:dn,result:function(e){t.push(e)}}),Promise.all(t)},flush:function(){var t=[];return e.dispatch({type:sn,result:function(e){t.push(e)}}),Promise.all(t)},pause:function(){e.dispatch({type:ln})},persist:function(){e.dispatch({type:un,register:a,rehydrate:o})}});return t&&t.manualPersist||s.persist(),s}function Bn(e,t){return(t||{}).debug,function(t,n){if(!t)return Promise.resolve(void 0);var r=t._persist&&t._persist.version!==void 0?t._persist.version:-1;if(r===n||r>n)return Promise.resolve(t);var i=Object.keys(e).map(function(e){return parseInt(e)}).filter(function(e){return n>=e&&e>r}).sort(function(e,t){return e-t});try{var a=i.reduce(function(t,n){return e[n](t)},t);return Promise.resolve(a)}catch(e){return Promise.reject(e)}}}function Vn(e){return Vn=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},Vn(e)}function Hn(){}var Un={getItem:Hn,setItem:Hn,removeItem:Hn};function Wn(e){if((typeof self>`u`?`undefined`:Vn(self))!==`object`||!(e in self))return!1;try{var t=self[e],n=`redux-persist ${e} test`;t.setItem(n,`test`),t.getItem(n),t.removeItem(n)}catch{return!1}return!0}function Gn(e){var t=`${e}Storage`;return Wn(t)?self[t]:Un}function Kn(e){var t=Gn(e);return{getItem:function(e){return new Promise(function(n,r){n(t.getItem(e))})},setItem:function(e,n){return new Promise(function(r,i){r(t.setItem(e,n))})},removeItem:function(e){return new Promise(function(n,r){n(t.removeItem(e))})}}}var qn=[{id:`post_js_fundamentals`,slug:`javascript-interview-questions-fundamentals`,title:{en:`JavaScript interview questions, part 1: fundamentals`,ar:`أسئلة مقابلات JavaScript، الجزء 1: الأساسيات`},excerpt:{en:`Ten core JavaScript questions every front-end interview starts with, with short answers and code.`,ar:`عشرة أسئلة أساسية في JavaScript تبدأ بها كل مقابلة واجهات أمامية، مع إجابات مختصرة وأمثلة كود.`},content:{en:"This is the first article in a six-part series that takes you from JavaScript fundamentals to senior-level React questions. Interviewers use these early questions to check that your foundations are solid, so answer them precisely and briefly.\n\n## 1. What is the difference between `var`, `let` and `const`?\n`var` is function-scoped and is hoisted and initialised with `undefined`. `let` and `const` are block-scoped and live in the temporal dead zone (TDZ) until their declaration runs, so reading them early throws a `ReferenceError`. `const` prevents reassignment, not mutation: the object it points to can still change.\n\n```js\nconsole.log(a) // undefined\nvar a = 1\n\nconsole.log(b) // ReferenceError (TDZ)\nlet b = 2\n\nconst user = { name: 'Mo' }\nuser.name = 'Mohamed' // allowed\n// user = {}          // TypeError\n```\n\n## 2. What is the difference between `==` and `===`?\n`===` compares value and type without conversion. `==` applies type coercion first, which leads to surprising results. Use `===` by default. `Object.is` is like `===` but treats `NaN` as equal to itself and distinguishes `+0` from `-0`.\n\n```js\n0 == ''          // true\n0 === ''         // false\nnull == undefined // true\nNaN === NaN      // false\nObject.is(NaN, NaN) // true\n```\n\n## 3. What is the difference between primitive and reference types?\nPrimitives (`string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`) are immutable and copied by value. Objects, arrays and functions are copied by reference, so two variables can point to the same object. Use the spread operator for a shallow copy and `structuredClone` for a deep copy.\n\n```js\nconst a = { tags: ['js'] }\nconst shallow = { ...a }\nshallow.tags.push('react') // also changes a.tags\n\nconst deep = structuredClone(a)\ndeep.tags.push('ts')        // a is untouched\n```\n\n## 4. What is hoisting?\nBefore code runs, the engine registers declarations in their scope. Function declarations are hoisted completely, so you can call them before they appear. `var` is hoisted as `undefined`; `let`, `const` and `class` are hoisted but stay uninitialised (TDZ). Function expressions follow the rules of the variable that holds them.\n\n```js\ngreet() // works\nfunction greet() { console.log('hi') }\n\nsayBye() // TypeError: sayBye is not a function\nvar sayBye = function () {}\n```\n\n## 5. What is the difference between `||`, `??` and `?.`?\n`||` returns the right side for any falsy value (`0`, `''`, `false`, `null`, `undefined`, `NaN`). `??` (nullish coalescing) only falls back for `null` or `undefined`, so it keeps valid values like `0`. `?.` (optional chaining) stops and returns `undefined` if the left side is `null` or `undefined`.\n\n```js\nconst count = 0\ncount || 10 // 10\ncount ?? 10 // 0\n\nconst user = null\nuser?.profile?.name // undefined, no error\n```\n\n## 6. How do arrow functions differ from regular functions?\nArrow functions do not have their own `this`, `arguments`, `super` or `prototype`; they take `this` from the surrounding scope, and they cannot be used with `new`. That makes them great for callbacks, but a poor choice for object methods that rely on `this`.\n\n```js\nconst counter = {\n  count: 0,\n  start() {\n    setInterval(() => this.count++, 1000) // this === counter\n  },\n  broken: () => this.count, // this is NOT counter\n}\n```\n\n## 7. Which array methods mutate the array, and which return a new one?\n`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse` and `fill` mutate the original. `map`, `filter`, `slice`, `concat` and `flat` return new arrays. ES2023 added immutable versions: `toSorted`, `toReversed`, `toSpliced` and `with`, which are useful for state updates in React.\n\n```js\nconst nums = [3, 1, 2]\nconst sorted = nums.toSorted() // [1, 2, 3], nums unchanged\nconst total = nums.reduce((sum, n) => sum + n, 0) // 6\n```\n\n## 8. What are destructuring, spread and rest?\nDestructuring pulls values out of arrays or objects into variables, with optional defaults and renaming. Spread (`...`) expands an iterable or object into another one. Rest uses the same syntax to collect the remaining items into an array or object, for example in function parameters.\n\n```js\nconst { name, role = 'dev', ...rest } = { name: 'Mo', city: 'Cairo' }\nconst [first, ...others] = [1, 2, 3]\nconst merged = { ...defaults, ...options }\nfunction sum(...numbers) { return numbers.reduce((a, b) => a + b, 0) }\n```\n\n## 9. What is the difference between `null` and `undefined`?\n`undefined` means a value was never assigned: missing variables, missing properties, or functions without a `return`. `null` is an intentional empty value set by the developer. `typeof null` returns `'object'`, a historical bug, so check for null with `value === null`.\n\n## 10. What are event bubbling, capturing and delegation?\nA DOM event travels down from `window` to the target (capturing) and then back up (bubbling). Event delegation attaches one listener to a parent and uses `event.target` to handle events from many children, including ones added later. Call `stopPropagation()` to stop the event, and `preventDefault()` to cancel the browser's default action.\n\n```js\ndocument.querySelector('#list').addEventListener('click', (event) => {\n  const item = event.target.closest('li')\n  if (item) console.log('clicked', item.dataset.id)\n})\n```\n\n> Next: closures, `this`, prototypes and the event loop in part 2.",ar:"هذا أول مقال في سلسلة من ستة أجزاء تنتقل بك من أساسيات JavaScript إلى أسئلة React على مستوى المطور الأول (Senior). يستخدم المُقابِلون هذه الأسئلة الأولى للتأكد من متانة أساسياتك، لذا أجب عنها بدقة واختصار.\n\n## 1. ما الفرق بين `var` و `let` و `const`؟\n`var` نطاقه الدالة ويتم رفعه (hoisting) وتهيئته بـ `undefined`. أما `let` و `const` فنطاقهما الكتلة (block) ويبقيان في المنطقة الميتة مؤقتًا (TDZ) حتى يُنفَّذ سطر التعريف، لذا قراءتهما قبل ذلك ترمي `ReferenceError`. و `const` يمنع إعادة الإسناد وليس التعديل: الكائن الذي يشير إليه يمكن أن يتغير.\n\n```js\nconsole.log(a) // undefined\nvar a = 1\n\nconsole.log(b) // ReferenceError (TDZ)\nlet b = 2\n\nconst user = { name: 'Mo' }\nuser.name = 'Mohamed' // allowed\n// user = {}          // TypeError\n```\n\n## 2. ما الفرق بين `==` و `===`؟\n`===` يقارن القيمة والنوع دون تحويل. أما `==` فيحوّل الأنواع أولًا (coercion) مما يؤدي إلى نتائج غير متوقعة. استخدم `===` افتراضيًا. و `Object.is` يشبه `===` لكنه يعتبر `NaN` مساويًا لنفسه ويفرّق بين `+0` و `-0`.\n\n```js\n0 == ''          // true\n0 === ''         // false\nnull == undefined // true\nNaN === NaN      // false\nObject.is(NaN, NaN) // true\n```\n\n## 3. ما الفرق بين الأنواع البدائية والأنواع المرجعية؟\nالأنواع البدائية (`string` و `number` و `bigint` و `boolean` و `undefined` و `null` و `symbol`) غير قابلة للتغيير وتُنسخ بالقيمة. أما الكائنات والمصفوفات والدوال فتُنسخ بالمرجع، فقد يشير متغيران إلى الكائن نفسه. استخدم الـ spread للنسخ السطحي و `structuredClone` للنسخ العميق.\n\n```js\nconst a = { tags: ['js'] }\nconst shallow = { ...a }\nshallow.tags.push('react') // also changes a.tags\n\nconst deep = structuredClone(a)\ndeep.tags.push('ts')        // a is untouched\n```\n\n## 4. ما هو الرفع (Hoisting)؟\nقبل تنفيذ الكود يسجّل المحرك التعريفات في نطاقها. تُرفع تعريفات الدوال (function declarations) بالكامل فيمكن استدعاؤها قبل موضعها. ويُرفع `var` بقيمة `undefined`، بينما تُرفع `let` و `const` و `class` دون تهيئة (TDZ). أما تعابير الدوال فتتبع قواعد المتغير الذي يحملها.\n\n```js\ngreet() // works\nfunction greet() { console.log('hi') }\n\nsayBye() // TypeError: sayBye is not a function\nvar sayBye = function () {}\n```\n\n## 5. ما الفرق بين `||` و `??` و `?.`؟\n`||` يعيد الطرف الأيمن مع أي قيمة falsy (مثل `0` و `''` و `false` و `null` و `undefined` و `NaN`). أما `??` فيستخدم البديل فقط مع `null` أو `undefined`، فيحافظ على قيم صحيحة مثل `0`. و `?.` (التسلسل الاختياري) يتوقف ويعيد `undefined` إذا كان الطرف الأيسر `null` أو `undefined`.\n\n```js\nconst count = 0\ncount || 10 // 10\ncount ?? 10 // 0\n\nconst user = null\nuser?.profile?.name // undefined, no error\n```\n\n## 6. كيف تختلف الدوال السهمية عن الدوال العادية؟\nالدوال السهمية ليس لها `this` أو `arguments` أو `super` أو `prototype` خاص بها؛ فهي تأخذ `this` من النطاق المحيط، ولا يمكن استخدامها مع `new`. لذلك هي ممتازة للـ callbacks لكنها خيار سيئ لدوال الكائنات التي تعتمد على `this`.\n\n```js\nconst counter = {\n  count: 0,\n  start() {\n    setInterval(() => this.count++, 1000) // this === counter\n  },\n  broken: () => this.count, // this is NOT counter\n}\n```\n\n## 7. ما دوال المصفوفات التي تعدّل المصفوفة الأصلية وما التي تعيد مصفوفة جديدة؟\n`push` و `pop` و `shift` و `unshift` و `splice` و `sort` و `reverse` و `fill` تعدّل المصفوفة الأصلية. أما `map` و `filter` و `slice` و `concat` و `flat` فتعيد مصفوفات جديدة. وأضاف ES2023 نسخًا غير معدِّلة: `toSorted` و `toReversed` و `toSpliced` و `with`، وهي مفيدة لتحديث الحالة في React.\n\n```js\nconst nums = [3, 1, 2]\nconst sorted = nums.toSorted() // [1, 2, 3], nums unchanged\nconst total = nums.reduce((sum, n) => sum + n, 0) // 6\n```\n\n## 8. ما هي التفكيك (Destructuring) والـ Spread والـ Rest؟\nالتفكيك يستخرج القيم من المصفوفات أو الكائنات إلى متغيرات، مع قيم افتراضية وإعادة تسمية اختيارية. والـ spread (`...`) ينشر عناصر مصفوفة أو كائن داخل آخر. أما الـ rest فيستخدم الصيغة نفسها لتجميع العناصر المتبقية في مصفوفة أو كائن، مثل معاملات الدوال.\n\n```js\nconst { name, role = 'dev', ...rest } = { name: 'Mo', city: 'Cairo' }\nconst [first, ...others] = [1, 2, 3]\nconst merged = { ...defaults, ...options }\nfunction sum(...numbers) { return numbers.reduce((a, b) => a + b, 0) }\n```\n\n## 9. ما الفرق بين `null` و `undefined`؟\n`undefined` تعني أنه لم تُسند قيمة أبدًا: متغيرات أو خصائص غير موجودة أو دوال بلا `return`. أما `null` فهي قيمة فارغة مقصودة يضعها المطور. و `typeof null` يعيد `'object'` بسبب خطأ تاريخي، لذا تحقّق منها بـ `value === null`.\n\n## 10. ما هي فقاعات الأحداث (Bubbling) والالتقاط (Capturing) والتفويض (Delegation)؟\nينتقل حدث الـ DOM من `window` نزولًا إلى العنصر الهدف (capturing) ثم يصعد مرة أخرى (bubbling). وتفويض الأحداث يعني إضافة مستمع واحد على العنصر الأب واستخدام `event.target` للتعامل مع أحداث عدة أبناء، حتى المضاف منها لاحقًا. استخدم `stopPropagation()` لإيقاف انتشار الحدث و `preventDefault()` لإلغاء السلوك الافتراضي للمتصفح.\n\n```js\ndocument.querySelector('#list').addEventListener('click', (event) => {\n  const item = event.target.closest('li')\n  if (item) console.log('clicked', item.dataset.id)\n})\n```\n\n> التالي: الـ closures و `this` والـ prototypes وحلقة الأحداث في الجزء 2."},tags:[`Interview`,`JavaScript`,`Fundamentals`],date:`2026-10-01`,cover:``,published:!0},{id:`post_js_intermediate`,slug:`javascript-interview-questions-intermediate`,title:{en:`JavaScript interview questions, part 2: intermediate`,ar:`أسئلة مقابلات JavaScript، الجزء 2: المستوى المتوسط`},excerpt:{en:"Closures, `this`, prototypes, the event loop, promises and async patterns, explained with code.",ar:"الـ closures و `this` والـ prototypes وحلقة الأحداث والـ promises وأنماط البرمجة غير المتزامنة، مع أمثلة كود."},content:{en:"Part 2 covers the concepts that separate people who use JavaScript from people who understand it. Expect follow-up questions here: be ready to predict output and write small implementations.\n\n## 1. What is a closure? Give a practical use.\nA closure is a function that keeps access to variables from the scope where it was created, even after that scope has finished. Closures give you private state, factories, memoization, and they are how React hooks remember values between renders.\n\n```js\nfunction createCounter() {\n  let count = 0 // private\n  return { increment: () => ++count, get: () => count }\n}\nconst counter = createCounter()\ncounter.increment() // 1\n```\n\n## 2. How is `this` determined?\nBy how the function is called, in this order of priority: `new` binds a fresh object; `call`, `apply` and `bind` set it explicitly; calling as `obj.method()` binds `obj`; a plain call gives `undefined` in strict mode (or `globalThis` in sloppy mode). Arrow functions ignore all of these and use the `this` of the enclosing scope.\n\n```js\nconst user = { name: 'Mo', hi() { return this.name } }\nconst hi = user.hi\nhi()               // undefined (strict mode)\nhi.call(user)      // 'Mo'\nconst bound = hi.bind(user)\nbound()            // 'Mo'\n```\n\n## 3. How does prototypal inheritance work? Are classes different?\nEvery object has an internal link (`[[Prototype]]`) to another object. When a property is missing, JavaScript looks it up along this chain. `class` syntax is mostly syntactic sugar over constructor functions and prototypes, with extras such as private fields (`#field`) and stricter rules.\n\n```js\nclass Animal { speak() { return 'sound' } }\nclass Dog extends Animal { speak() { return 'woof' } }\nconst d = new Dog()\nObject.getPrototypeOf(d) === Dog.prototype // true\nd.hasOwnProperty('speak')                  // false (found on the prototype)\n```\n\n## 4. Explain the event loop. What does this code print?\nJavaScript runs one call stack. When it is empty, the event loop first drains the microtask queue (promise callbacks, `queueMicrotask`) and then takes one macrotask (timers, I/O, UI events). So the output is `1, 4, 3, 2`: synchronous code first, then microtasks, then the timer.\n\n```js\nconsole.log(1)\nsetTimeout(() => console.log(2), 0)\nPromise.resolve().then(() => console.log(3))\nconsole.log(4)\n// 1, 4, 3, 2\n```\n\n## 5. What is the difference between `Promise.all`, `allSettled`, `race` and `any`?\n`all` resolves with every result, or rejects on the first failure. `allSettled` always resolves with the status of each promise. `race` settles with the first promise to settle, success or failure. `any` resolves with the first success and rejects only if all of them fail (`AggregateError`).\n\n```js\nconst [user, posts] = await Promise.all([getUser(), getPosts()])\nconst results = await Promise.allSettled(requests)\nconst fastest = await Promise.any([mirrorA(), mirrorB()])\n```\n\n## 6. How do you handle errors and parallelism with async/await?\nWrap awaits in `try/catch` (or `.catch` on the promise). A common mistake is awaiting independent requests one after another: start them together and await `Promise.all` instead. Use `for...of` with `await` only when each step depends on the previous one.\n\n```js\n// Slow: about 2 seconds\nconst a = await fetchA()\nconst b = await fetchB()\n\n// Fast: about 1 second\nconst [a2, b2] = await Promise.all([fetchA(), fetchB()])\n```\n\n## 7. What is the difference between debounce and throttle? Implement debounce.\nDebounce waits until calls stop for a given time and then runs once, which suits search inputs. Throttle runs at most once per interval, which suits scroll and resize handlers.\n\n```js\nfunction debounce(fn, delay = 300) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), delay)\n  }\n}\nconst onSearch = debounce((q) => fetchResults(q), 400)\n```\n\n## 8. What is the difference between ES modules and CommonJS?\nES modules (`import`/`export`) are static, so bundlers can analyse them and remove unused code (tree shaking). They support top-level `await` and load asynchronously. CommonJS (`require`/`module.exports`) is dynamic and synchronous, and it is the legacy Node.js format.\n\n## 9. What are pure functions and immutability, and why do they matter?\nA pure function returns the same output for the same input and has no side effects. Immutability means creating new objects instead of changing existing ones. Together they make code predictable and testable, and React and Redux rely on them to detect changes with a cheap reference comparison.\n\n```js\n// Impure: mutates its input\nfunction addTodo(list, todo) { list.push(todo); return list }\n// Pure: returns a new array\nconst addTodoPure = (list, todo) => [...list, todo]\n```\n\n## 10. What is currying?\nCurrying turns a function with several arguments into a chain of functions that each take one argument. It is useful for partial application: creating specialised functions from general ones, such as event handlers or validators.\n\n```js\nconst minLength = (min) => (value) => value.length >= min\nconst isValidPassword = minLength(8)\nisValidPassword('secret') // false\n```\n\n> Next: memory, performance, security and advanced patterns in part 3.",ar:"يغطي الجزء الثاني المفاهيم التي تميّز من يستخدم JavaScript عمّن يفهمها. توقّع أسئلة متابعة هنا: كن مستعدًا لتوقّع ناتج الكود وكتابة تطبيقات صغيرة.\n\n## 1. ما هو الـ Closure؟ أعطِ استخدامًا عمليًا.\nالـ closure هو دالة تحتفظ بإمكانية الوصول إلى متغيرات النطاق الذي أُنشئت فيه حتى بعد انتهاء ذلك النطاق. تتيح لك الـ closures حالة خاصة (private state) والمصانع (factories) والتخزين المؤقت (memoization)، وبها تتذكر hooks في React القيم بين مرات الرسم.\n\n```js\nfunction createCounter() {\n  let count = 0 // private\n  return { increment: () => ++count, get: () => count }\n}\nconst counter = createCounter()\ncounter.increment() // 1\n```\n\n## 2. كيف تُحدَّد قيمة `this`؟\nبطريقة استدعاء الدالة، وفق هذا الترتيب: `new` يربطها بكائن جديد؛ و `call` و `apply` و `bind` تحددها صراحة؛ والاستدعاء بالشكل `obj.method()` يربطها بـ `obj`؛ والاستدعاء العادي يعطي `undefined` في الوضع الصارم (أو `globalThis` في غيره). أما الدوال السهمية فتتجاهل كل ذلك وتستخدم `this` الخاص بالنطاق المحيط.\n\n```js\nconst user = { name: 'Mo', hi() { return this.name } }\nconst hi = user.hi\nhi()               // undefined (strict mode)\nhi.call(user)      // 'Mo'\nconst bound = hi.bind(user)\nbound()            // 'Mo'\n```\n\n## 3. كيف تعمل الوراثة عبر النماذج الأولية (Prototypes)؟ وهل الـ classes مختلفة؟\nكل كائن لديه رابط داخلي (`[[Prototype]]`) إلى كائن آخر. وعندما لا توجد خاصية يبحث عنها JavaScript على طول هذه السلسلة. وصيغة `class` في الغالب تجميل لغوي فوق دوال البناء والـ prototypes، مع إضافات مثل الحقول الخاصة (`#field`) وقواعد أكثر صرامة.\n\n```js\nclass Animal { speak() { return 'sound' } }\nclass Dog extends Animal { speak() { return 'woof' } }\nconst d = new Dog()\nObject.getPrototypeOf(d) === Dog.prototype // true\nd.hasOwnProperty('speak')                  // false (found on the prototype)\n```\n\n## 4. اشرح حلقة الأحداث (Event Loop). ماذا يطبع هذا الكود؟\nيعمل JavaScript بمكدس استدعاءات واحد. وعندما يفرغ، تفرغ حلقة الأحداث أولًا طابور المهام الدقيقة (microtasks مثل callbacks الـ promises و `queueMicrotask`) ثم تأخذ مهمة كبيرة واحدة (macrotask مثل المؤقتات والإدخال/الإخراج وأحداث الواجهة). لذا الناتج هو `1, 4, 3, 2`: الكود المتزامن أولًا ثم الـ microtasks ثم المؤقت.\n\n```js\nconsole.log(1)\nsetTimeout(() => console.log(2), 0)\nPromise.resolve().then(() => console.log(3))\nconsole.log(4)\n// 1, 4, 3, 2\n```\n\n## 5. ما الفرق بين `Promise.all` و `allSettled` و `race` و `any`؟\n`all` يُحل بكل النتائج أو يُرفض عند أول فشل. و `allSettled` يُحل دائمًا بحالة كل promise. و `race` ينتهي مع أول promise ينتهي سواء نجح أو فشل. و `any` يُحل بأول نجاح ولا يُرفض إلا إذا فشلت جميعها (`AggregateError`).\n\n```js\nconst [user, posts] = await Promise.all([getUser(), getPosts()])\nconst results = await Promise.allSettled(requests)\nconst fastest = await Promise.any([mirrorA(), mirrorB()])\n```\n\n## 6. كيف تتعامل مع الأخطاء والتوازي باستخدام async/await؟\nضع الـ await داخل `try/catch` (أو استخدم `.catch` على الـ promise). ومن الأخطاء الشائعة انتظار طلبات مستقلة واحدًا تلو الآخر: ابدأها معًا ثم انتظر `Promise.all`. واستخدم `for...of` مع `await` فقط عندما تعتمد كل خطوة على السابقة.\n\n```js\n// Slow: about 2 seconds\nconst a = await fetchA()\nconst b = await fetchB()\n\n// Fast: about 1 second\nconst [a2, b2] = await Promise.all([fetchA(), fetchB()])\n```\n\n## 7. ما الفرق بين الـ Debounce والـ Throttle؟ اكتب دالة debounce.\nالـ debounce ينتظر حتى تتوقف الاستدعاءات لمدة معينة ثم ينفّذ مرة واحدة، وهو مناسب لحقول البحث. أما الـ throttle فينفّذ مرة واحدة على الأكثر في كل فترة، وهو مناسب لأحداث التمرير وتغيير الحجم.\n\n```js\nfunction debounce(fn, delay = 300) {\n  let timer\n  return (...args) => {\n    clearTimeout(timer)\n    timer = setTimeout(() => fn(...args), delay)\n  }\n}\nconst onSearch = debounce((q) => fetchResults(q), 400)\n```\n\n## 8. ما الفرق بين وحدات ES Modules و CommonJS؟\nوحدات ES (`import`/`export`) ثابتة، لذا تستطيع أدوات التجميع تحليلها وإزالة الكود غير المستخدم (tree shaking). وتدعم `await` على المستوى الأعلى وتُحمَّل بشكل غير متزامن. أما CommonJS (`require`/`module.exports`) فديناميكية ومتزامنة، وهي الصيغة القديمة في Node.js.\n\n## 9. ما هي الدوال النقية (Pure Functions) وعدم القابلية للتغيير (Immutability)، ولماذا هي مهمة؟\nالدالة النقية تعيد الناتج نفسه للمدخلات نفسها وليس لها آثار جانبية. وعدم القابلية للتغيير يعني إنشاء كائنات جديدة بدلًا من تعديل الموجودة. معًا يجعلان الكود متوقعًا وقابلًا للاختبار، ويعتمد عليهما React و Redux لاكتشاف التغييرات بمقارنة مرجعية سريعة.\n\n```js\n// Impure: mutates its input\nfunction addTodo(list, todo) { list.push(todo); return list }\n// Pure: returns a new array\nconst addTodoPure = (list, todo) => [...list, todo]\n```\n\n## 10. ما هو الـ Currying؟\nالـ currying يحوّل دالة متعددة المعاملات إلى سلسلة دوال تأخذ كل منها معاملًا واحدًا. وهو مفيد للتطبيق الجزئي: إنشاء دوال متخصصة من دوال عامة، مثل معالجات الأحداث أو دوال التحقق.\n\n```js\nconst minLength = (min) => (value) => value.length >= min\nconst isValidPassword = minLength(8)\nisValidPassword('secret') // false\n```\n\n> التالي: الذاكرة والأداء والأمان والأنماط المتقدمة في الجزء 3."},tags:[`Interview`,`JavaScript`,`Intermediate`],date:`2026-10-02`,cover:``,published:!0},{id:`post_js_advanced`,slug:`javascript-interview-questions-advanced`,title:{en:`JavaScript interview questions, part 3: advanced`,ar:`أسئلة مقابلات JavaScript، الجزء 3: المستوى المتقدم`},excerpt:{en:`Memory leaks, polyfills, the rendering pipeline, Core Web Vitals, security and design patterns for senior roles.`,ar:`تسرّب الذاكرة والـ polyfills ومسار الرسم في المتصفح ومقاييس Core Web Vitals والأمان وأنماط التصميم لوظائف المطور الأول.`},content:{en:`Senior interviews move from "what is" to "why" and "how would you". These questions test whether you can reason about the browser, performance and security, not just the language.

## 1. What causes memory leaks in front-end apps, and how do you find them?
Common causes: event listeners, intervals and subscriptions that are never removed, detached DOM nodes still referenced in JavaScript, growing caches, and closures that hold large objects. Find them with Chrome DevTools heap snapshots (compare before and after an action) and the Performance monitor. Use \`WeakMap\` for caches keyed by objects so entries can be garbage collected.

\`\`\`js
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize) // no leak
}, [])
\`\`\`

## 2. Implement \`Promise.all\`.
Keep results in order, count settled promises, resolve when all of them are done and reject on the first error. Wrapping each item in \`Promise.resolve\` handles plain values too.

\`\`\`js
function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const results = []
    let done = 0
    if (items.length === 0) return resolve(results)
    items.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value
        if (++done === items.length) resolve(results)
      }, reject)
    })
  })
}
\`\`\`

## 3. What are generators and iterators used for?
An iterator is an object with a \`next()\` method; anything with \`[Symbol.iterator]\` works with \`for...of\` and spread. Generators (\`function*\`) create iterators that pause at \`yield\`, which is good for lazy sequences, pagination and custom data structures. Async generators with \`for await...of\` are ideal for streams and paginated APIs.

\`\`\`js
async function* fetchPages(url) {
  let next = url
  while (next) {
    const res = await fetch(next).then((r) => r.json())
    yield res.items
    next = res.nextPage
  }
}
for await (const items of fetchPages('/api/posts')) render(items)
\`\`\`

## 4. What are \`Proxy\` and \`Reflect\`?
\`Proxy\` wraps an object and intercepts operations such as get, set and delete through traps. It powers reactivity in libraries like Vue and MobX, validation and logging. \`Reflect\` offers the default behaviour of those operations, so traps can call it to forward the operation correctly.

\`\`\`js
const state = new Proxy({}, {
  set(target, key, value) {
    console.log('changed', key)
    return Reflect.set(target, key, value)
  },
})
state.theme = 'dark' // logs: changed theme
\`\`\`

## 5. What is the critical rendering path? What are reflow and repaint?
The browser parses HTML into the DOM and CSS into the CSSOM, combines them into a render tree, calculates layout (reflow), paints pixels and composites layers. Changing geometry triggers reflow, which is expensive; changing colours only repaints; \`transform\` and \`opacity\` can be handled by the compositor alone. Avoid layout thrashing: batch DOM reads before writes.

\`\`\`js
// Thrashing: read/write/read/write
items.forEach((el) => { el.style.width = el.offsetWidth + 10 + 'px' })
// Better: read everything, then write
const widths = items.map((el) => el.offsetWidth)
items.forEach((el, i) => { el.style.width = widths[i] + 10 + 'px' })
\`\`\`

## 6. What are Core Web Vitals, and how do you improve them?
LCP (Largest Contentful Paint, under 2.5 s): optimise the hero image, preload key resources, use SSR or caching. INP (Interaction to Next Paint, under 200 ms): keep the main thread free, split long tasks, defer non-critical JavaScript. CLS (Cumulative Layout Shift, under 0.1): reserve space for images, ads and fonts. Measure real users with the \`web-vitals\` library, not only Lighthouse.

## 7. How do you protect a front-end app against XSS and CSRF?
XSS: never inject untrusted HTML (\`innerHTML\`, \`dangerouslySetInnerHTML\`) without sanitising it (for example with DOMPurify), and add a Content Security Policy. React escapes text by default, but \`href="javascript:..."\` and raw HTML are still risky. CSRF: use \`SameSite\` cookies, CSRF tokens for cookie-based auth, and check \`Origin\`. Keep tokens out of \`localStorage\` when possible and never put secrets in client code.

## 8. How do you keep heavy work from freezing the UI?
Move CPU-heavy work (parsing, image processing, large sorts) to a Web Worker. Split long tasks into chunks and yield to the browser between them (\`scheduler.yield()\` where supported, or \`setTimeout\`). In React, use \`useTransition\` or \`useDeferredValue\` for expensive re-renders, and virtualise long lists.

\`\`\`js
// worker.js
self.onmessage = (e) => self.postMessage(heavySort(e.data))

// main.js
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
worker.onmessage = (e) => render(e.data)
worker.postMessage(bigArray)
\`\`\`

## 9. How do you cancel requests and avoid race conditions?
Use \`AbortController\`: pass its \`signal\` to \`fetch\` and call \`abort()\` when the input changes or the component unmounts. That way an older, slower response can never overwrite a newer one. Libraries such as React Query do this for you.

\`\`\`js
useEffect(() => {
  const controller = new AbortController()
  fetch('/api/search?q=' + query, { signal: controller.signal })
    .then((r) => r.json())
    .then(setResults)
    .catch((err) => { if (err.name !== 'AbortError') setError(err) })
  return () => controller.abort()
}, [query])
\`\`\`

## 10. Implement a small event emitter (observer pattern).
The observer (pub/sub) pattern decouples the parts of an app: publishers emit events without knowing who listens. Returning an unsubscribe function from \`on\` makes cleanup easy, the same idea as an effect cleanup in React.

\`\`\`js
class Emitter {
  #listeners = new Map()
  on(event, fn) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set())
    this.#listeners.get(event).add(fn)
    return () => this.#listeners.get(event).delete(fn)
  }
  emit(event, payload) {
    this.#listeners.get(event)?.forEach((fn) => fn(payload))
  }
}
\`\`\`

> Next: React, starting with the fundamentals in part 4.`,ar:`تنتقل مقابلات المطور الأول من سؤال "ما هو" إلى "لماذا" و"كيف ستفعل". تختبر هذه الأسئلة قدرتك على التفكير في المتصفح والأداء والأمان، لا اللغة فقط.

## 1. ما أسباب تسرّب الذاكرة في تطبيقات الواجهات الأمامية، وكيف تكتشفه؟
الأسباب الشائعة: مستمعو أحداث ومؤقتات واشتراكات لا تُزال، وعناصر DOM منفصلة ما زال JavaScript يشير إليها، وذاكرات تخزين مؤقت تكبر باستمرار، و closures تحتفظ بكائنات كبيرة. اكتشفها بلقطات الذاكرة (heap snapshots) في Chrome DevTools (قارن قبل الإجراء وبعده) وبأداة Performance monitor. واستخدم \`WeakMap\` للتخزين المؤقت المرتبط بكائنات حتى يمكن جمع عناصره.

\`\`\`js
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth)
  window.addEventListener('resize', onResize)
  return () => window.removeEventListener('resize', onResize) // no leak
}, [])
\`\`\`

## 2. اكتب تطبيقًا لـ \`Promise.all\`.
احفظ النتائج بالترتيب، وعُدّ الـ promises المنتهية، وحُلّ عند انتهاء الجميع، وارفض عند أول خطأ. تغليف كل عنصر بـ \`Promise.resolve\` يتعامل مع القيم العادية أيضًا.

\`\`\`js
function promiseAll(items) {
  return new Promise((resolve, reject) => {
    const results = []
    let done = 0
    if (items.length === 0) return resolve(results)
    items.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value
        if (++done === items.length) resolve(results)
      }, reject)
    })
  })
}
\`\`\`

## 3. فيمَ تُستخدم الـ Generators والـ Iterators؟
الـ iterator كائن لديه دالة \`next()\`؛ وأي كائن يملك \`[Symbol.iterator]\` يعمل مع \`for...of\` والـ spread. والـ generators (\`function*\`) تنشئ iterators تتوقف عند \`yield\`، وهي مناسبة للتسلسلات الكسولة وتقسيم الصفحات وهياكل البيانات المخصصة. والـ generators غير المتزامنة مع \`for await...of\` مثالية للتدفقات والواجهات المقسمة إلى صفحات.

\`\`\`js
async function* fetchPages(url) {
  let next = url
  while (next) {
    const res = await fetch(next).then((r) => r.json())
    yield res.items
    next = res.nextPage
  }
}
for await (const items of fetchPages('/api/posts')) render(items)
\`\`\`

## 4. ما هما \`Proxy\` و \`Reflect\`؟
\`Proxy\` يغلّف كائنًا ويعترض العمليات مثل القراءة والكتابة والحذف عبر ما يسمى traps. وعليه تقوم التفاعلية في مكتبات مثل Vue و MobX، وكذلك التحقق والتسجيل. أما \`Reflect\` فيوفّر السلوك الافتراضي لهذه العمليات، فتستدعيه الـ traps لتمرير العملية بشكل صحيح.

\`\`\`js
const state = new Proxy({}, {
  set(target, key, value) {
    console.log('changed', key)
    return Reflect.set(target, key, value)
  },
})
state.theme = 'dark' // logs: changed theme
\`\`\`

## 5. ما هو مسار الرسم الحرج (Critical Rendering Path)؟ وما الـ Reflow والـ Repaint؟
يحلل المتصفح HTML إلى DOM و CSS إلى CSSOM، ثم يدمجهما في شجرة رسم، ويحسب التخطيط (reflow)، ويرسم البكسلات (paint)، ثم يركّب الطبقات (composite). تغيير الأبعاد يسبب reflow وهو مكلف؛ وتغيير الألوان يسبب repaint فقط؛ أما \`transform\` و \`opacity\` فيمكن أن يعالجهما المركِّب وحده. وتجنّب تذبذب التخطيط (layout thrashing) بتجميع قراءات الـ DOM قبل الكتابة.

\`\`\`js
// Thrashing: read/write/read/write
items.forEach((el) => { el.style.width = el.offsetWidth + 10 + 'px' })
// Better: read everything, then write
const widths = items.map((el) => el.offsetWidth)
items.forEach((el, i) => { el.style.width = widths[i] + 10 + 'px' })
\`\`\`

## 6. ما هي مقاييس Core Web Vitals، وكيف تحسّنها؟
LCP (أكبر رسم للمحتوى، أقل من 2.5 ثانية): حسّن الصورة الرئيسية، وحمّل الموارد المهمة مسبقًا، واستخدم SSR أو التخزين المؤقت. و INP (زمن الاستجابة للتفاعل، أقل من 200 مللي ثانية): أبقِ الخيط الرئيسي متاحًا، وقسّم المهام الطويلة، وأجّل JavaScript غير الضروري. و CLS (إزاحة التخطيط التراكمية، أقل من 0.1): احجز مساحة للصور والإعلانات والخطوط. وقِس تجربة المستخدمين الحقيقيين بمكتبة \`web-vitals\` وليس Lighthouse فقط.

## 7. كيف تحمي تطبيق الواجهة الأمامية من هجمات XSS و CSRF؟
XSS: لا تحقن HTML غير موثوق (\`innerHTML\` و \`dangerouslySetInnerHTML\`) دون تنقيته (مثلًا بمكتبة DOMPurify)، وأضف سياسة أمان المحتوى (CSP). يقوم React بتهريب النصوص افتراضيًا، لكن \`href="javascript:..."\` و HTML الخام ما زالا خطرين. CSRF: استخدم ملفات تعريف الارتباط بخاصية \`SameSite\`، ورموز CSRF عند المصادقة بالكوكيز، وتحقق من \`Origin\`. وتجنّب حفظ الرموز في \`localStorage\` قدر الإمكان، ولا تضع أسرارًا في كود العميل أبدًا.

## 8. كيف تمنع الأعمال الثقيلة من تجميد الواجهة؟
انقل الأعمال التي تستهلك المعالج (التحليل ومعالجة الصور والفرز الكبير) إلى Web Worker. وقسّم المهام الطويلة إلى أجزاء وأعطِ المتصفح فرصة بينها (\`scheduler.yield()\` حيث يُدعم، أو \`setTimeout\`). وفي React استخدم \`useTransition\` أو \`useDeferredValue\` لعمليات الرسم المكلفة، واعرض القوائم الطويلة بأسلوب الـ virtualization.

\`\`\`js
// worker.js
self.onmessage = (e) => self.postMessage(heavySort(e.data))

// main.js
const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
worker.onmessage = (e) => render(e.data)
worker.postMessage(bigArray)
\`\`\`

## 9. كيف تلغي الطلبات وتتجنّب حالات التسابق (Race Conditions)؟
استخدم \`AbortController\`: مرّر \`signal\` الخاص به إلى \`fetch\` واستدعِ \`abort()\` عند تغيّر المدخلات أو إزالة المكوّن. بذلك لا يمكن لاستجابة أقدم وأبطأ أن تستبدل استجابة أحدث. ومكتبات مثل React Query تقوم بذلك نيابة عنك.

\`\`\`js
useEffect(() => {
  const controller = new AbortController()
  fetch('/api/search?q=' + query, { signal: controller.signal })
    .then((r) => r.json())
    .then(setResults)
    .catch((err) => { if (err.name !== 'AbortError') setError(err) })
  return () => controller.abort()
}, [query])
\`\`\`

## 10. اكتب باعث أحداث بسيطًا (نمط المراقب Observer).
نمط المراقب (pub/sub) يفصل أجزاء التطبيق: الناشر يرسل الأحداث دون أن يعرف من يستمع. وإعادة دالة لإلغاء الاشتراك من \`on\` تسهّل التنظيف، وهي الفكرة نفسها في دالة تنظيف الـ effect في React.

\`\`\`js
class Emitter {
  #listeners = new Map()
  on(event, fn) {
    if (!this.#listeners.has(event)) this.#listeners.set(event, new Set())
    this.#listeners.get(event).add(fn)
    return () => this.#listeners.get(event).delete(fn)
  }
  emit(event, payload) {
    this.#listeners.get(event)?.forEach((fn) => fn(payload))
  }
}
\`\`\`

> التالي: React، بدءًا من الأساسيات في الجزء 4.`},tags:[`Interview`,`JavaScript`,`Advanced`],date:`2026-10-03`,cover:``,published:!0},{id:`post_react_fundamentals`,slug:`react-interview-questions-fundamentals`,title:{en:`React interview questions, part 4: fundamentals`,ar:`أسئلة مقابلات React، الجزء 4: الأساسيات`},excerpt:{en:`Rendering, JSX, props and state, keys, effects and forms: the React basics interviewers always check.`,ar:`الرسم و JSX والـ props والحالة والمفاتيح والـ effects والنماذج: أساسيات React التي يتحقق منها المُقابِلون دائمًا.`},content:{en:'Part 4 starts the React half of the series. Even for senior roles, interviews open with these questions, and precise answers set the tone for the rest of the conversation.\n\n## 1. How does React update the UI?\nComponents are functions of props and state that return a description of the UI. When state changes, React re-renders the component, compares the new element tree with the previous one (reconciliation) and applies the minimal set of DOM changes in the commit phase. The "virtual DOM" is that in-memory tree.\n\n## 2. What does JSX compile to?\nJSX is syntax sugar for function calls that create React elements: plain objects describing type, props and children. With the modern JSX transform it compiles to `jsx()` calls from `react/jsx-runtime`, so you no longer need to import React in every file. Expressions go inside `{}`, and attributes use camelCase (`className`, `onClick`).\n\n```jsx\n<Button variant="primary">Save</Button>\n// becomes\njsx(Button, { variant: \'primary\', children: \'Save\' })\n```\n\n## 3. What is the difference between props and state?\nProps are inputs passed from the parent; they are read-only inside the component. State is data the component owns and changes over time with `useState` or `useReducer`; updating it schedules a re-render. If a value can be computed from props or other state, derive it during render instead of storing it in state.\n\n## 4. Why do lists need keys? Is the index a good key?\nKeys tell React which item is which between renders, so it can keep the right state and DOM nodes when items are added, removed or reordered. The array index only works for static lists: when the order changes, state (for example input values) ends up attached to the wrong item. Use a stable, unique id from your data.\n\n```jsx\n{todos.map((todo) => (\n  <TodoItem key={todo.id} todo={todo} />\n))}\n```\n\n## 5. What are controlled and uncontrolled inputs?\nA controlled input gets its value from React state and updates it in `onChange`, which makes validation and formatting easy. An uncontrolled input keeps its own value in the DOM; you read it with a ref or from `FormData` on submit. React 19 form actions make uncontrolled forms with `FormData` a clean default for simple forms.\n\n```jsx\nconst [email, setEmail] = useState(\'\')\n<input value={email} onChange={(e) => setEmail(e.target.value)} />  // controlled\n<input name="email" defaultValue="" />                           // uncontrolled\n```\n\n## 6. Why use a functional update with `setState`?\nState updates are batched and applied on the next render, so `count` inside a handler is a snapshot. Calling `setCount(count + 1)` three times adds 1. Passing a function, `setCount((c) => c + 1)`, uses the latest queued value and adds 3. Use it whenever the new state depends on the previous one.\n\n```js\nfunction handleClick() {\n  setCount((c) => c + 1)\n  setCount((c) => c + 1)\n  setCount((c) => c + 1) // +3\n}\n```\n\n## 7. How does `useEffect` work, and when should you avoid it?\n`useEffect` synchronises a component with an external system (network, subscriptions, the DOM, timers) after render. It re-runs when a dependency changes and calls the cleanup function before the next run and on unmount. Don\'t use it to derive data from props or state, or to respond to events: compute during render, and put event logic in the event handler.\n\n```js\n// Avoid: extra render and state that can drift out of sync\nuseEffect(() => setFullName(first + \' \' + last), [first, last])\n// Better: derive it\nconst fullName = first + \' \' + last\n```\n\n## 8. What is lifting state up? What is composition?\nWhen two components need the same data, move the state to their closest common parent and pass it down with callbacks to change it. Composition means building components from other components via `children` and props instead of inheritance; it also avoids prop drilling by passing ready-made elements down.\n\n```jsx\nfunction Card({ title, children }) {\n  return <section className="card"><h2>{title}</h2>{children}</section>\n}\n<Card title="Profile"><Avatar user={user} /></Card>\n```\n\n## 9. What is the bug in `{count && <Badge />}`?\nIf `count` is `0`, the expression evaluates to `0` and React renders the number 0. Use a boolean condition (`count > 0 && ...`) or a ternary. Also remember that a component returning `null` renders nothing but still runs its hooks.\n\n```jsx\n{count > 0 && <Badge count={count} />}\n{isLoading ? <Spinner /> : <List items={items} />}\n```\n\n## 10. Why does `StrictMode` run my effects twice?\nIn development, `StrictMode` renders components twice and mounts, unmounts and remounts them to reveal impure renders and effects without proper cleanup. It does not happen in production. If something breaks, the fix is usually a missing cleanup function, not removing `StrictMode`.\n\n> Next: hooks in depth, context, state management and React 19 forms in part 5.',ar:'يبدأ الجزء الرابع نصف السلسلة الخاص بـ React. حتى في وظائف المطور الأول تبدأ المقابلات بهذه الأسئلة، والإجابات الدقيقة تحدد نبرة بقية الحوار.\n\n## 1. كيف يحدّث React واجهة المستخدم؟\nالمكوّنات دوال تأخذ الـ props والحالة وتعيد وصفًا للواجهة. وعندما تتغير الحالة يعيد React رسم المكوّن، ويقارن شجرة العناصر الجديدة بالسابقة (reconciliation)، ثم يطبّق أقل مجموعة من تغييرات الـ DOM في مرحلة الـ commit. و"الـ DOM الافتراضي" هو تلك الشجرة في الذاكرة.\n\n## 2. إلامَ يتحول JSX عند الترجمة؟\nJSX تجميل لغوي لاستدعاءات دوال تنشئ عناصر React: كائنات عادية تصف النوع والـ props والأبناء. ومع محوّل JSX الحديث يُترجم إلى استدعاءات `jsx()` من `react/jsx-runtime`، فلم تعد بحاجة لاستيراد React في كل ملف. التعابير توضع داخل `{}` والخصائص تُكتب بصيغة camelCase (`className` و `onClick`).\n\n```jsx\n<Button variant="primary">Save</Button>\n// becomes\njsx(Button, { variant: \'primary\', children: \'Save\' })\n```\n\n## 3. ما الفرق بين الـ props والحالة (state)؟\nالـ props مدخلات يمررها المكوّن الأب، وهي للقراءة فقط داخل المكوّن. أما الحالة فبيانات يملكها المكوّن ويغيّرها بمرور الوقت عبر `useState` أو `useReducer`، وتحديثها يجدول إعادة رسم. وإذا أمكن حساب قيمة من الـ props أو حالة أخرى فاحسبها أثناء الرسم بدلًا من تخزينها في الحالة.\n\n## 4. لماذا تحتاج القوائم إلى مفاتيح (keys)؟ وهل الفهرس مفتاح جيد؟\nالمفاتيح تخبر React أي عنصر هو أي عنصر بين مرات الرسم، ليحافظ على الحالة وعناصر الـ DOM الصحيحة عند الإضافة أو الحذف أو إعادة الترتيب. والفهرس يصلح للقوائم الثابتة فقط: عند تغيّر الترتيب ترتبط الحالة (مثل قيم الحقول) بالعنصر الخطأ. استخدم معرّفًا ثابتًا وفريدًا من بياناتك.\n\n```jsx\n{todos.map((todo) => (\n  <TodoItem key={todo.id} todo={todo} />\n))}\n```\n\n## 5. ما الفرق بين الحقول المتحكَّم بها وغير المتحكَّم بها؟\nالحقل المتحكَّم به يأخذ قيمته من حالة React ويحدّثها في `onChange`، مما يسهّل التحقق والتنسيق. أما غير المتحكَّم به فيحتفظ بقيمته في الـ DOM وتقرؤها عبر ref أو من `FormData` عند الإرسال. وتجعل إجراءات النماذج في React 19 النماذج غير المتحكَّم بها مع `FormData` خيارًا افتراضيًا نظيفًا للنماذج البسيطة.\n\n```jsx\nconst [email, setEmail] = useState(\'\')\n<input value={email} onChange={(e) => setEmail(e.target.value)} />  // controlled\n<input name="email" defaultValue="" />                           // uncontrolled\n```\n\n## 6. لماذا تستخدم التحديث الدالّي مع `setState`؟\nتحديثات الحالة تُجمَّع وتُطبَّق في الرسم التالي، لذا فإن `count` داخل المعالج لقطة ثابتة. استدعاء `setCount(count + 1)` ثلاث مرات يضيف 1 فقط. أما تمرير دالة `setCount((c) => c + 1)` فيستخدم أحدث قيمة في الطابور ويضيف 3. استخدمه كلما اعتمدت الحالة الجديدة على السابقة.\n\n```js\nfunction handleClick() {\n  setCount((c) => c + 1)\n  setCount((c) => c + 1)\n  setCount((c) => c + 1) // +3\n}\n```\n\n## 7. كيف يعمل `useEffect`، ومتى يجب تجنّبه؟\n`useEffect` يزامن المكوّن مع نظام خارجي (الشبكة والاشتراكات والـ DOM والمؤقتات) بعد الرسم. ويُعاد تنفيذه عند تغيّر أحد الاعتماديات، ويستدعي دالة التنظيف قبل التنفيذ التالي وعند إزالة المكوّن. لا تستخدمه لاشتقاق بيانات من الـ props أو الحالة أو للاستجابة للأحداث: احسب أثناء الرسم، وضع منطق الأحداث في معالج الحدث.\n\n```js\n// Avoid: extra render and state that can drift out of sync\nuseEffect(() => setFullName(first + \' \' + last), [first, last])\n// Better: derive it\nconst fullName = first + \' \' + last\n```\n\n## 8. ما معنى رفع الحالة (Lifting State Up)؟ وما التركيب (Composition)؟\nعندما يحتاج مكوّنان إلى البيانات نفسها انقل الحالة إلى أقرب أب مشترك ومرّرها للأسفل مع دوال لتغييرها. أما التركيب فيعني بناء المكوّنات من مكوّنات أخرى عبر `children` والـ props بدلًا من الوراثة، كما يقلل من تمرير الـ props عبر مستويات كثيرة (prop drilling) بتمرير عناصر جاهزة.\n\n```jsx\nfunction Card({ title, children }) {\n  return <section className="card"><h2>{title}</h2>{children}</section>\n}\n<Card title="Profile"><Avatar user={user} /></Card>\n```\n\n## 9. ما المشكلة في `{count && <Badge />}`؟\nإذا كانت `count` تساوي `0` فإن التعبير يعيد `0` ويعرض React الرقم 0. استخدم شرطًا منطقيًا (`count > 0 && ...`) أو عاملًا ثلاثيًا. وتذكّر أن المكوّن الذي يعيد `null` لا يعرض شيئًا لكنه ما زال ينفّذ الـ hooks الخاصة به.\n\n```jsx\n{count > 0 && <Badge count={count} />}\n{isLoading ? <Spinner /> : <List items={items} />}\n```\n\n## 10. لماذا يشغّل `StrictMode` الـ effects مرتين؟\nفي وضع التطوير يرسم `StrictMode` المكوّنات مرتين ويركّبها ثم يزيلها ثم يعيد تركيبها، ليكشف الرسم غير النقي والـ effects التي تفتقر إلى تنظيف صحيح. ولا يحدث ذلك في الإنتاج. وإذا تعطّل شيء فالحل غالبًا إضافة دالة تنظيف مفقودة، وليس إزالة `StrictMode`.\n\n> التالي: الـ hooks بعمق والـ Context وإدارة الحالة ونماذج React 19 في الجزء 5.'},tags:[`Interview`,`React`,`Fundamentals`],date:`2026-10-04`,cover:``,published:!0},{id:`post_react_intermediate`,slug:`react-interview-questions-intermediate`,title:{en:`React interview questions, part 5: intermediate`,ar:`أسئلة مقابلات React، الجزء 5: المستوى المتوسط`},excerpt:{en:`Rules of hooks, memoization, refs, context, custom hooks, state management, error boundaries and React 19 actions.`,ar:`قواعد الـ hooks والـ memoization والـ refs والـ Context والـ hooks المخصصة وإدارة الحالة وحدود الأخطاء وإجراءات React 19.`},content:{en:`Part 5 covers the questions that show whether you can build and maintain real React applications, not just tutorials.

## 1. What are the rules of hooks, and why do they exist?
Call hooks only at the top level of components or custom hooks, never inside conditions, loops or nested functions. React identifies each hook by its call order, so the order must be the same on every render. The new \`use\` API is the exception: it can be called conditionally.

## 2. When should you use \`useMemo\`, \`useCallback\` and \`React.memo\`?
\`useMemo\` caches an expensive computation, \`useCallback\` caches a function identity, and \`React.memo\` skips re-rendering a component when its props are unchanged. They only help when a re-render is actually expensive or when stable identities are needed (memoized children, effect dependencies). Measure with the Profiler first. The React Compiler can now add this memoization automatically.

\`\`\`js
const visible = useMemo(() => filterTodos(todos, tab), [todos, tab])
const onSelect = useCallback((id) => setSelected(id), [])
const Row = memo(function Row({ item, onSelect }) { /* ... */ })
\`\`\`

## 3. What is \`useRef\` for?
\`useRef\` returns a mutable object whose \`.current\` survives re-renders without causing them. Use it for DOM nodes (focus, measuring, scrolling) and for values that aren't shown in the UI: timer ids, previous values, or the latest callback. Don't read or write \`ref.current\` during render. In React 19, \`ref\` is a normal prop, so \`forwardRef\` is no longer needed.

\`\`\`jsx
function SearchInput({ ref, ...props }) {
  return <input ref={ref} {...props} />
}
const inputRef = useRef(null)
<SearchInput ref={inputRef} />
inputRef.current.focus()
\`\`\`

## 4. When is Context a good choice, and what are its performance pitfalls?
Context is good for data many components need that changes rarely: theme, language, the current user. Every consumer re-renders when the value changes, so memoize the value object, split unrelated values into separate contexts, and keep fast-changing state elsewhere (local state or a store with selectors). In React 19 you render \`<ThemeContext value={...}>\` directly and read it with \`use(ThemeContext)\`.

\`\`\`jsx
const ThemeContext = createContext('light')
function App() {
  const [theme, setTheme] = useState('light')
  return <ThemeContext value={theme}><Page /></ThemeContext>
}
const theme = use(ThemeContext)
\`\`\`

## 5. Write a custom hook.
A custom hook is a function starting with \`use\` that combines other hooks to reuse stateful logic. It shares logic, not state: each component that calls it gets its own state.

\`\`\`js
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}
\`\`\`

## 6. How do you choose a state management approach?
Separate server state from client state. Server data (lists, details, caching, refetching) belongs in React Query, SWR or RTK Query. For client state: start with local state; lift it or use context for shared, rarely changing values; use Redux Toolkit or Zustand when many distant components read and update complex state, or when you need devtools, middleware or persistence (for example Redux Persist). Keep URL state (filters, pagination) in the URL.

## 7. When is \`useReducer\` better than \`useState\`?
Use \`useReducer\` when several values change together, when the next state depends on the previous one in non-trivial ways, or when you want the update logic in a pure, testable function. The \`dispatch\` function is stable, so it is easy to pass down.

\`\`\`js
function reducer(state, action) {
  switch (action.type) {
    case 'added': return [...state, action.todo]
    case 'removed': return state.filter((t) => t.id !== action.id)
    default: return state
  }
}
const [todos, dispatch] = useReducer(reducer, [])
\`\`\`

## 8. What are error boundaries?
An error boundary catches errors thrown while rendering its children and shows a fallback UI instead of unmounting the whole app. It does not catch errors in event handlers or async code; handle those with \`try/catch\`. Boundaries are still class components (\`getDerivedStateFromError\`), or you can use the \`react-error-boundary\` package. Place them around routes and risky widgets.

## 9. How do you split code in React?
Use \`lazy(() => import(...))\` with \`Suspense\` to load components only when they render, typically per route or for heavy widgets like editors and charts. The bundler creates a separate chunk. Preload likely next routes on hover or idle time to hide the delay.

\`\`\`jsx
const AdminPanel = lazy(() => import('./admin/AdminPanel'))
<Suspense fallback={<Spinner />}>
  <AdminPanel />
</Suspense>
\`\`\`

## 10. How do forms work in React 19?
You can pass a function to \`<form action>\`. React runs it in a transition with the \`FormData\`. \`useActionState\` returns the latest result and a pending flag, \`useFormStatus\` lets a child button read the parent form's status, and \`useOptimistic\` shows the expected result immediately. Uncontrolled inputs are reset after a successful action.

\`\`\`jsx
const [state, formAction, isPending] = useActionState(async (prev, formData) => {
  const error = await updateName(formData.get('name'))
  return error ? { error } : { ok: true }
}, {})

<form action={formAction}>
  <input name="name" />
  <button disabled={isPending}>Save</button>
  {state.error && <p role="alert">{state.error}</p>}
</form>
\`\`\`

> Next: React internals, concurrency, Server Components, performance and architecture in part 6.`,ar:`يغطي الجزء الخامس الأسئلة التي تكشف قدرتك على بناء تطبيقات React حقيقية وصيانتها، لا مجرد أمثلة تعليمية.

## 1. ما قواعد الـ hooks، ولماذا وُجدت؟
استدعِ الـ hooks فقط في المستوى الأعلى من المكوّنات أو الـ hooks المخصصة، وليس داخل الشروط أو الحلقات أو الدوال المتداخلة. يتعرف React على كل hook بترتيب استدعائه، لذا يجب أن يبقى الترتيب نفسه في كل رسم. والاستثناء هو واجهة \`use\` الجديدة: يمكن استدعاؤها بشكل شرطي.

## 2. متى تستخدم \`useMemo\` و \`useCallback\` و \`React.memo\`؟
\`useMemo\` يخزّن نتيجة حساب مكلف، و \`useCallback\` يخزّن هوية دالة، و \`React.memo\` يتخطى إعادة رسم المكوّن إذا لم تتغير الـ props. وهي مفيدة فقط عندما تكون إعادة الرسم مكلفة فعلًا أو عند الحاجة إلى هويات ثابتة (أبناء مُخزَّنين أو اعتماديات effect). قِس بالـ Profiler أولًا. ويستطيع React Compiler الآن إضافة هذا التخزين تلقائيًا.

\`\`\`js
const visible = useMemo(() => filterTodos(todos, tab), [todos, tab])
const onSelect = useCallback((id) => setSelected(id), [])
const Row = memo(function Row({ item, onSelect }) { /* ... */ })
\`\`\`

## 3. فيمَ يُستخدم \`useRef\`؟
\`useRef\` يعيد كائنًا قابلًا للتغيير تبقى قيمة \`.current\` فيه بين مرات الرسم دون أن تسبب رسمًا جديدًا. استخدمه لعناصر الـ DOM (التركيز والقياس والتمرير) وللقيم التي لا تظهر في الواجهة: معرّفات المؤقتات أو القيم السابقة أو آخر callback. لا تقرأ \`ref.current\` ولا تكتبه أثناء الرسم. وفي React 19 أصبح \`ref\` خاصية عادية فلم تعد بحاجة إلى \`forwardRef\`.

\`\`\`jsx
function SearchInput({ ref, ...props }) {
  return <input ref={ref} {...props} />
}
const inputRef = useRef(null)
<SearchInput ref={inputRef} />
inputRef.current.focus()
\`\`\`

## 4. متى يكون الـ Context خيارًا جيدًا، وما مشكلاته في الأداء؟
الـ Context مناسب للبيانات التي تحتاجها مكوّنات كثيرة ونادرًا ما تتغير: السمة واللغة والمستخدم الحالي. كل مستهلك يُعاد رسمه عند تغيّر القيمة، لذا خزّن كائن القيمة بـ memo، وقسّم القيم غير المترابطة إلى contexts منفصلة، واحفظ الحالة سريعة التغير في مكان آخر (حالة محلية أو store مع selectors). وفي React 19 تكتب \`<ThemeContext value={...}>\` مباشرة وتقرؤه بـ \`use(ThemeContext)\`.

\`\`\`jsx
const ThemeContext = createContext('light')
function App() {
  const [theme, setTheme] = useState('light')
  return <ThemeContext value={theme}><Page /></ThemeContext>
}
const theme = use(ThemeContext)
\`\`\`

## 5. اكتب hook مخصصًا.
الـ hook المخصص دالة يبدأ اسمها بـ \`use\` وتجمع hooks أخرى لإعادة استخدام منطق له حالة. وهو يشارك المنطق لا الحالة: كل مكوّن يستدعيه يحصل على حالته الخاصة.

\`\`\`js
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}
\`\`\`

## 6. كيف تختار أسلوب إدارة الحالة؟
افصل حالة الخادم عن حالة العميل. بيانات الخادم (القوائم والتفاصيل والتخزين المؤقت وإعادة الجلب) مكانها React Query أو SWR أو RTK Query. أما حالة العميل: ابدأ بالحالة المحلية؛ ثم ارفعها أو استخدم الـ Context للقيم المشتركة نادرة التغير؛ واستخدم Redux Toolkit أو Zustand عندما تقرأ مكوّنات متباعدة كثيرة حالة معقدة وتحدّثها، أو عند الحاجة إلى أدوات التطوير أو الـ middleware أو الحفظ (مثل Redux Persist). واحفظ حالة الرابط (الفلاتر وأرقام الصفحات) في الرابط نفسه.

## 7. متى يكون \`useReducer\` أفضل من \`useState\`؟
استخدم \`useReducer\` عندما تتغير عدة قيم معًا، أو عندما تعتمد الحالة التالية على السابقة بطرق غير بسيطة، أو عندما تريد منطق التحديث في دالة نقية قابلة للاختبار. ودالة \`dispatch\` ثابتة فيسهل تمريرها للأبناء.

\`\`\`js
function reducer(state, action) {
  switch (action.type) {
    case 'added': return [...state, action.todo]
    case 'removed': return state.filter((t) => t.id !== action.id)
    default: return state
  }
}
const [todos, dispatch] = useReducer(reducer, [])
\`\`\`

## 8. ما هي حدود الأخطاء (Error Boundaries)؟
حدّ الأخطاء يلتقط الأخطاء التي تحدث أثناء رسم أبنائه ويعرض واجهة بديلة بدلًا من إزالة التطبيق كله. ولا يلتقط أخطاء معالجات الأحداث أو الكود غير المتزامن؛ تعامل معها بـ \`try/catch\`. وما زالت الحدود مكوّنات class (\`getDerivedStateFromError\`)، أو يمكنك استخدام حزمة \`react-error-boundary\`. ضعها حول المسارات والأجزاء المعرّضة للأخطاء.

## 9. كيف تقسّم الكود (Code Splitting) في React؟
استخدم \`lazy(() => import(...))\` مع \`Suspense\` لتحميل المكوّنات فقط عند رسمها، عادة لكل مسار أو للأجزاء الثقيلة مثل المحررات والرسوم البيانية. وتنشئ أداة التجميع جزءًا (chunk) منفصلًا. وحمّل المسارات المتوقعة مسبقًا عند تمرير المؤشر أو أوقات الخمول لإخفاء التأخير.

\`\`\`jsx
const AdminPanel = lazy(() => import('./admin/AdminPanel'))
<Suspense fallback={<Spinner />}>
  <AdminPanel />
</Suspense>
\`\`\`

## 10. كيف تعمل النماذج في React 19؟
يمكنك تمرير دالة إلى \`<form action>\` فينفّذها React داخل transition مع الـ \`FormData\`. و \`useActionState\` يعيد آخر نتيجة ومؤشر انتظار، و \`useFormStatus\` يتيح لزر داخلي قراءة حالة النموذج الأب، و \`useOptimistic\` يعرض النتيجة المتوقعة فورًا. وتُعاد الحقول غير المتحكَّم بها إلى قيمها الأولى بعد نجاح الإجراء.

\`\`\`jsx
const [state, formAction, isPending] = useActionState(async (prev, formData) => {
  const error = await updateName(formData.get('name'))
  return error ? { error } : { ok: true }
}, {})

<form action={formAction}>
  <input name="name" />
  <button disabled={isPending}>Save</button>
  {state.error && <p role="alert">{state.error}</p>}
</form>
\`\`\`

> التالي: آلية عمل React الداخلية والتزامن و Server Components والأداء والمعمارية في الجزء 6.`},tags:[`Interview`,`React`,`Intermediate`],date:`2026-10-05`,cover:``,published:!0},{id:`post_react_advanced`,slug:`react-interview-questions-advanced-senior`,title:{en:`React interview questions, part 6: advanced and senior`,ar:`أسئلة مقابلات React، الجزء 6: المستوى المتقدم والمطور الأول`},excerpt:{en:`Fiber, concurrent rendering, Server Components, SSR and hydration, performance, architecture, testing and front-end system design.`,ar:`Fiber والرسم المتزامن و Server Components و SSR والـ hydration والأداء والمعمارية والاختبارات وتصميم أنظمة الواجهات الأمامية.`},content:{en:`The final part covers what senior front-end interviews focus on: how React works internally, how to make apps fast at scale, and how you make architecture decisions. Explain trade-offs, not just definitions.

## 1. What is React Fiber? What are the render and commit phases?
Fiber is React's reconciliation engine: each element becomes a unit of work that React can pause, resume, prioritise or throw away. In the render phase React calls components and computes changes; it must be pure because it can be interrupted or repeated. In the commit phase React applies DOM changes synchronously, then runs layout effects and, later, passive effects.

## 2. What do \`useTransition\` and \`useDeferredValue\` solve?
Concurrent rendering lets urgent updates (typing, clicking) interrupt non-urgent ones. \`startTransition\` marks a state update as non-urgent, so the UI stays responsive and \`isPending\` can show progress. \`useDeferredValue\` gives you a lagging copy of a value for expensive children, which is useful when you don't control the state update.

\`\`\`jsx
const [isPending, startTransition] = useTransition()
function selectTab(tab) {
  startTransition(() => setTab(tab)) // keeps clicks responsive
}
const deferredQuery = useDeferredValue(query)
<Results query={deferredQuery} />
\`\`\`

## 3. What are React Server Components?
Server Components run only on the server (or at build time). They can read data directly, send zero JavaScript to the client, and keep secrets on the server. Client Components (\`'use client'\`) handle state, effects and browser APIs. Server Functions (\`'use server'\`) let the client call server code, for example from form actions. A good default is server components for data and layout, with small client islands for interactivity.

\`\`\`tsx
// app/posts/page.tsx (Server Component)
export default async function Posts() {
  const posts = await db.post.findMany()
  return <PostList posts={posts} />
}

// LikeButton.tsx
'use client'
export function LikeButton() { const [liked, setLiked] = useState(false) /* ... */ }
\`\`\`

## 4. Compare CSR, SSR, SSG and ISR. What is hydration?
CSR renders in the browser: simple hosting, slower first paint and weaker SEO. SSR renders HTML per request: fresh data and fast first paint, but it costs server time. SSG renders at build time: fastest, but data can be stale. ISR regenerates static pages in the background. Hydration attaches React to server HTML; mismatches happen when server and client render different output (dates, \`Math.random\`, \`window\` checks). Streaming SSR with Suspense sends HTML in chunks so slow data doesn't block the whole page.

## 5. A page is slow. How do you find and fix the problem?
Measure first: the React DevTools Profiler (what re-rendered and why), the Chrome Performance panel (long tasks), and Lighthouse or real-user Web Vitals. Typical fixes: keep state close to where it is used, split contexts, memoize expensive subtrees, virtualise long lists (\`react-window\`, TanStack Virtual), debounce input, code-split heavy routes, optimise images, and move data fetching to the server or a cache. Verify every change with the same measurement.

## 6. What are \`useOptimistic\` and \`use\`?
\`useOptimistic\` shows a temporary state while an async action runs, for example a message marked as sending, and React swaps it for the real state when the action finishes or fails. \`use\` reads a promise (suspending until it resolves) or a context; unlike other hooks it can be called conditionally. Promises passed to \`use\` should be created outside render or cached, otherwise each render creates a new one.

\`\`\`jsx
const [optimisticMessages, addOptimistic] = useOptimistic(messages, (state, msg) => [...state, { ...msg, sending: true }])

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise) // suspends until resolved
  return comments.map((c) => <Comment key={c.id} {...c} />)
}
\`\`\`

## 7. How do you structure a large React codebase and design system?
Organise by feature (each feature owns its components, hooks, API and tests) with a shared \`ui\` layer for design-system primitives. Build primitives as accessible, unstyled or token-based components, and use patterns like compound components (\`<Tabs><Tabs.List/></Tabs>\`) and headless hooks for flexibility. Enforce boundaries with TypeScript, lint rules and clear public exports, and document components in Storybook.

## 8. What is your testing strategy for a React app?
Follow the testing trophy: static checks (TypeScript, ESLint) at the base, a few unit tests for pure logic, many integration tests with React Testing Library that render components and interact like a user (queries by role and label, no implementation details), and a small set of end-to-end tests in Playwright for critical flows. Mock the network at the boundary with MSW, and run everything in CI.

\`\`\`js
test('submits the contact form', async () => {
  render(<Contact />)
  await userEvent.type(screen.getByLabelText('Email'), 'hr@example.com')
  await userEvent.click(screen.getByRole('button', { name: 'Send' }))
  expect(await screen.findByText(/message was sent/i)).toBeInTheDocument()
})
\`\`\`

## 9. How do you handle accessibility, internationalisation and RTL?
Accessibility: semantic HTML first, labels for every input, visible focus, keyboard support, ARIA only when native elements aren't enough, and testing with axe and a screen reader. i18n: keep strings in translation files (with i18next or a context), format dates and numbers with \`Intl\`, and set \`lang\` and \`dir\` on \`<html>\`. For RTL use CSS logical properties (\`margin-inline-start\`, Tailwind \`ms-*\`), mirror directional icons, and keep code and numbers LTR.

## 10. Design the front end of a real-time analytics dashboard.
Clarify requirements first (users, data volume, update frequency, offline needs). Then cover:
- **Data:** REST or GraphQL for the initial load, WebSocket or SSE for live updates merged into a normalised cache (React Query or RTK Query), with throttled UI updates.
- **Rendering:** virtualised tables, charts updated with \`useTransition\`, and web workers for aggregation.
- **Resilience:** reconnect with backoff, optimistic updates with rollback, error boundaries per widget, skeleton states.
- **Scale:** code splitting per widget, permissions in the API, feature flags.
- **Quality:** Web Vitals monitoring, error tracking (Sentry) and end-to-end tests.

Then explain the trade-offs you chose.

> That completes the series. Practise by explaining each answer out loud and writing the code without looking.`,ar:`يغطي الجزء الأخير ما تركز عليه مقابلات المطور الأول: كيف يعمل React من الداخل، وكيف تجعل التطبيقات سريعة على نطاق واسع، وكيف تتخذ قرارات المعمارية. اشرح الموازنات (trade-offs) وليس التعريفات فقط.

## 1. ما هو React Fiber؟ وما مرحلتا الرسم (render) والتثبيت (commit)؟
Fiber هو محرك المطابقة في React: كل عنصر يصبح وحدة عمل يستطيع React إيقافها واستئنافها وترتيب أولويتها أو التخلص منها. في مرحلة الرسم يستدعي React المكوّنات ويحسب التغييرات، ويجب أن تكون نقية لأنها قد تُقاطَع أو تُكرَّر. وفي مرحلة التثبيت يطبّق React تغييرات الـ DOM بشكل متزامن، ثم ينفّذ layout effects، وبعدها الـ effects العادية.

## 2. ما المشكلة التي يحلها \`useTransition\` و \`useDeferredValue\`؟
الرسم المتزامن يسمح للتحديثات العاجلة (الكتابة والنقر) بمقاطعة التحديثات غير العاجلة. و \`startTransition\` يعلّم تحديث الحالة كغير عاجل فتبقى الواجهة سريعة الاستجابة ويمكن عرض التقدم عبر \`isPending\`. أما \`useDeferredValue\` فيعطيك نسخة متأخرة من القيمة للأبناء المكلفين، وهو مفيد عندما لا تتحكم في تحديث الحالة.

\`\`\`jsx
const [isPending, startTransition] = useTransition()
function selectTab(tab) {
  startTransition(() => setTab(tab)) // keeps clicks responsive
}
const deferredQuery = useDeferredValue(query)
<Results query={deferredQuery} />
\`\`\`

## 3. ما هي React Server Components؟
تعمل Server Components على الخادم فقط (أو وقت البناء). تستطيع قراءة البيانات مباشرة ولا ترسل أي JavaScript إلى العميل وتحتفظ بالأسرار على الخادم. أما Client Components (\`'use client'\`) فتتعامل مع الحالة والـ effects وواجهات المتصفح. وتتيح Server Functions (\`'use server'\`) للعميل استدعاء كود الخادم، مثلًا من إجراءات النماذج. والخيار الافتراضي الجيد: مكوّنات خادم للبيانات والتخطيط، مع جزر صغيرة من مكوّنات العميل للتفاعل.

\`\`\`tsx
// app/posts/page.tsx (Server Component)
export default async function Posts() {
  const posts = await db.post.findMany()
  return <PostList posts={posts} />
}

// LikeButton.tsx
'use client'
export function LikeButton() { const [liked, setLiked] = useState(false) /* ... */ }
\`\`\`

## 4. قارن بين CSR و SSR و SSG و ISR. وما هو الـ Hydration؟
CSR يرسم في المتصفح: استضافة بسيطة لكن ظهور أول محتوى أبطأ و SEO أضعف. و SSR يرسم HTML مع كل طلب: بيانات حديثة وظهور سريع لكنه يستهلك وقت الخادم. و SSG يرسم وقت البناء: الأسرع لكن البيانات قد تكون قديمة. و ISR يعيد توليد الصفحات الثابتة في الخلفية. والـ hydration هو ربط React بـ HTML القادم من الخادم؛ ويحدث عدم التطابق عندما يختلف ناتج الخادم عن العميل (التواريخ و \`Math.random\` وفحوصات \`window\`). ويرسل SSR المتدفق مع Suspense الـ HTML على دفعات حتى لا تعطل البيانات البطيئة الصفحة كلها.

## 5. صفحة بطيئة. كيف تكتشف المشكلة وتصلحها؟
قِس أولًا: Profiler في React DevTools (ما الذي أُعيد رسمه ولماذا)، ولوحة Performance في Chrome (المهام الطويلة)، و Lighthouse أو مقاييس Web Vitals من المستخدمين الحقيقيين. والإصلاحات المعتادة: إبقاء الحالة قريبة من مكان استخدامها، وتقسيم الـ contexts، وتخزين الأشجار الفرعية المكلفة، وعرض القوائم الطويلة بأسلوب virtualization (\`react-window\` و TanStack Virtual)، وتأخير معالجة المدخلات، وتقسيم المسارات الثقيلة، وتحسين الصور، ونقل جلب البيانات إلى الخادم أو ذاكرة مؤقتة. وتحقق من كل تغيير بالقياس نفسه.

## 6. ما هما \`useOptimistic\` و \`use\`؟
\`useOptimistic\` يعرض حالة مؤقتة أثناء تنفيذ إجراء غير متزامن، مثل رسالة معلَّمة "قيد الإرسال"، ثم يستبدلها React بالحالة الحقيقية عند انتهاء الإجراء أو فشله. و \`use\` يقرأ promise (ويعلّق الرسم حتى تُحل) أو context؛ وعلى خلاف بقية الـ hooks يمكن استدعاؤه بشكل شرطي. ويجب إنشاء الـ promises الممررة إلى \`use\` خارج الرسم أو تخزينها، وإلا أُنشئت واحدة جديدة مع كل رسم.

\`\`\`jsx
const [optimisticMessages, addOptimistic] = useOptimistic(messages, (state, msg) => [...state, { ...msg, sending: true }])

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise) // suspends until resolved
  return comments.map((c) => <Comment key={c.id} {...c} />)
}
\`\`\`

## 7. كيف تنظّم مشروع React كبيرًا ونظام تصميم؟
نظّم حسب الميزة (كل ميزة تملك مكوّناتها والـ hooks والواجهة البرمجية والاختبارات) مع طبقة \`ui\` مشتركة لعناصر نظام التصميم الأساسية. وابنِ هذه العناصر كمكوّنات سهلة الوصول وغير منسّقة أو قائمة على design tokens، واستخدم أنماطًا مثل المكوّنات المركّبة (\`<Tabs><Tabs.List/></Tabs>\`) والـ headless hooks للمرونة. وافرض الحدود بـ TypeScript وقواعد الـ lint وصادرات عامة واضحة، ووثّق المكوّنات في Storybook.

## 8. ما استراتيجيتك لاختبار تطبيق React؟
اتبع "كأس الاختبارات": الفحوصات الثابتة (TypeScript و ESLint) في القاعدة، وقليل من اختبارات الوحدة للمنطق النقي، وكثير من اختبارات التكامل بـ React Testing Library ترسم المكوّنات وتتفاعل كما يفعل المستخدم (البحث بالدور والتسمية دون تفاصيل التطبيق الداخلية)، ومجموعة صغيرة من اختبارات end-to-end في Playwright للمسارات الحرجة. ومحاكاة الشبكة عند الحدود بـ MSW، وتشغيل كل ذلك في CI.

\`\`\`js
test('submits the contact form', async () => {
  render(<Contact />)
  await userEvent.type(screen.getByLabelText('Email'), 'hr@example.com')
  await userEvent.click(screen.getByRole('button', { name: 'Send' }))
  expect(await screen.findByText(/message was sent/i)).toBeInTheDocument()
})
\`\`\`

## 9. كيف تتعامل مع سهولة الوصول (a11y) وتعدد اللغات و RTL؟
سهولة الوصول: HTML دلالي أولًا، وتسمية لكل حقل، وتركيز مرئي، ودعم لوحة المفاتيح، واستخدام ARIA فقط عندما لا تكفي العناصر الأصلية، والاختبار بأداة axe وقارئ شاشة. وتعدد اللغات: احفظ النصوص في ملفات ترجمة (عبر i18next أو context)، ونسّق التواريخ والأرقام بـ \`Intl\`، واضبط \`lang\` و \`dir\` على \`<html>\`. ولـ RTL استخدم خصائص CSS المنطقية (\`margin-inline-start\` و \`ms-*\` في Tailwind)، واعكس الأيقونات الاتجاهية، وأبقِ الكود والأرقام بالاتجاه LTR.

## 10. صمّم الواجهة الأمامية للوحة تحليلات تعمل في الوقت الفعلي.
وضّح المتطلبات أولًا (المستخدمون وحجم البيانات وتكرار التحديث والحاجة للعمل دون اتصال). ثم غطِّ:
- **البيانات:** REST أو GraphQL للتحميل الأول، و WebSocket أو SSE للتحديثات الحية تُدمج في ذاكرة مؤقتة منظّمة (React Query أو RTK Query)، مع تحديثات واجهة مخففة (throttled).
- **الرسم:** جداول بأسلوب virtualization، ورسوم بيانية تُحدَّث عبر \`useTransition\`، و web workers للتجميع.
- **المرونة:** إعادة الاتصال مع تأخير متزايد، وتحديثات تفاؤلية مع تراجع، وحدود أخطاء لكل جزء، وحالات تحميل هيكلية.
- **التوسع:** تقسيم الكود لكل جزء، والصلاحيات في الواجهة البرمجية، و feature flags.
- **الجودة:** مراقبة Web Vitals وتتبع الأخطاء (Sentry) واختبارات end-to-end.

ثم اشرح الموازنات التي اخترتها.

> بهذا تكتمل السلسلة. تدرّب بشرح كل إجابة بصوت عالٍ وكتابة الكود دون النظر إليه.`},tags:[`Interview`,`React`,`Advanced`],date:`2026-10-06`,cover:``,published:!0},{id:`post_js_internals`,slug:`javascript-interview-questions-internals-deep-dive`,title:{en:`JavaScript interview questions, part 7: internals deep dive`,ar:`أسئلة مقابلات JavaScript، الجزء 7: نظرة عميقة على الآلية الداخلية`},excerpt:{en:`Execution context, async/await under the hood, freeze vs seal, call/apply/bind and a custom bind, deep clone, Map/Set/WeakMap/WeakSet and garbage collection.`,ar:`سياق التنفيذ، وما يحدث داخل async/await، والفرق بين freeze و seal، و call/apply/bind وكتابة bind، والنسخ العميق، و Map/Set/WeakMap/WeakSet، وجمع القمامة.`},content:{en:"This bonus part fills the gaps in the series with the internals questions senior interviewers love. They want to see that you understand what the engine does, not only what the syntax looks like.\n\n## 1. How does JavaScript execute code with the call stack and execution contexts?\nThe engine first creates a global execution context. Every function call creates a new execution context and pushes it onto the call stack; when the function returns, it is popped. Each context is built in two phases: the creation phase sets up its lexical environment (registers `var`, function declarations, `let`/`const` in the TDZ, and `this`), and the execution phase runs the code line by line. Lexical scope means variable lookup follows where functions are written in the code, not where they are called, walking outward through parent environments. Too many nested calls overflow the stack (`RangeError: Maximum call stack size exceeded`).\n\n```js\nconst name = 'global'\nfunction outer() {\n  const name = 'outer'\n  function inner() { return name } // lexical scope: 'outer'\n  return inner()\n}\nouter() // stack: global -> outer -> inner\n```\n\n## 2. What happens internally when you use async/await?\nAn `async` function always returns a promise. Each `await` evaluates its expression, wraps it in a promise, and suspends the function: its execution context is saved and removed from the call stack, so other code keeps running. When the awaited promise settles, the rest of the function is scheduled as a microtask and resumes with the saved state, like a generator resumed by a promise runner. A rejected promise is thrown at the `await` line, which is why `try/catch` works. Code after `await` never runs synchronously, even if the value is already available.\n\n```js\nasync function run() {\n  console.log('A')\n  await null          // suspends; the rest becomes a microtask\n  console.log('C')\n}\nrun()\nconsole.log('B')\n// A, B, C\n```\n\n## 3. What is the difference between `Object.freeze`, `Object.seal` and `Object.preventExtensions`?\n`preventExtensions` blocks adding new properties; existing ones can still be changed or deleted. `seal` also blocks deleting and reconfiguring, but values can still change. `freeze` additionally makes every property read-only. All three are shallow: nested objects stay mutable unless you freeze them recursively. In strict mode a blocked write throws a `TypeError`; otherwise it fails silently. Check the state with `Object.isExtensible`, `isSealed` and `isFrozen`.\n\n```js\nconst config = Object.freeze({ api: '/v1', nested: { retries: 3 } })\nconfig.api = '/v2'          // ignored (TypeError in strict mode)\nconfig.nested.retries = 5   // works: freeze is shallow\n\nconst user = Object.seal({ name: 'Mo' })\nuser.name = 'Mohamed'       // allowed\ndelete user.name            // not allowed\n```\n\n## 4. How do `call`, `apply` and `bind` work?\nAll three set `this` explicitly. `call(thisArg, a, b)` invokes the function immediately with arguments listed one by one; `apply(thisArg, [a, b])` invokes it immediately with an array of arguments; `bind(thisArg, a)` returns a new function with `this` (and optionally some leading arguments) fixed, to be called later. A bound function cannot be re-bound, but `new` still overrides its `this`. Arrow functions ignore all three.\n\n```js\nfunction greet(greeting, mark) { return greeting + ', ' + this.name + mark }\nconst user = { name: 'Mo' }\ngreet.call(user, 'Hi', '!')      // 'Hi, Mo!'\ngreet.apply(user, ['Hello', '?']) // 'Hello, Mo?'\nconst hi = greet.bind(user, 'Hey')\nhi('.')                           // 'Hey, Mo.'\n```\n\n## 5. Implement a custom `bind()`.\nReturn a function that combines the bound arguments with the call-time arguments and calls the original with the saved `this`. A complete answer also handles `new`: when the bound function is used as a constructor, `this` must be the new instance, and the prototype should be preserved.\n\n```js\nFunction.prototype.myBind = function (thisArg, ...boundArgs) {\n  const fn = this\n  function bound(...args) {\n    const isNew = this instanceof bound\n    return fn.apply(isNew ? this : thisArg, [...boundArgs, ...args])\n  }\n  bound.prototype = Object.create(fn.prototype)\n  return bound\n}\n```\n\n## 6. Implement a deep clone function.\nIn real code use `structuredClone`: it handles nested objects, arrays, `Map`, `Set`, `Date`, typed arrays and circular references, but not functions, DOM nodes or class prototypes. `JSON.parse(JSON.stringify(x))` loses dates, `undefined`, `Map`/`Set` and fails on cycles. In an interview, write a recursive version and use a `WeakMap` to track already-copied objects so circular references don't cause infinite recursion.\n\n```js\nfunction deepClone(value, seen = new WeakMap()) {\n  if (value === null || typeof value !== 'object') return value\n  if (seen.has(value)) return seen.get(value)\n  if (value instanceof Date) return new Date(value)\n  if (value instanceof Map) {\n    const copy = new Map()\n    seen.set(value, copy)\n    value.forEach((v, k) => copy.set(deepClone(k, seen), deepClone(v, seen)))\n    return copy\n  }\n  if (value instanceof Set) {\n    const copy = new Set()\n    seen.set(value, copy)\n    value.forEach((v) => copy.add(deepClone(v, seen)))\n    return copy\n  }\n  const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value))\n  seen.set(value, copy)\n  for (const key of Reflect.ownKeys(value)) copy[key] = deepClone(value[key], seen)\n  return copy\n}\n```\n\n## 7. What is the difference between Map, Set, WeakMap and WeakSet?\n`Map` stores key/value pairs with keys of any type, keeps insertion order, has `size`, and is iterable; it is better than a plain object for dynamic keys and frequent additions and removals. `Set` stores unique values. `WeakMap` and `WeakSet` only accept objects (or non-registered symbols) and hold them weakly: if nothing else references the key, it can be garbage collected along with its entry. Because of that they are not iterable and have no `size`. Use them for private data or caches attached to objects (such as DOM nodes) without causing memory leaks.\n\n```js\nconst visits = new Map([['home', 3]])\nconst tags = new Set(['js', 'js', 'react']) // { 'js', 'react' }\n\nconst metadata = new WeakMap()\nlet el = document.querySelector('#card')\nmetadata.set(el, { clicks: 0 })\nel = null // the element and its metadata can now be collected\n```\n\n## 8. How does garbage collection work, and what causes memory leaks?\nJavaScript engines free memory automatically using reachability: starting from roots (globals, the current call stack, active closures), the collector marks everything reachable and sweeps the rest (mark-and-sweep). V8 is generational: new objects live in a young generation that is collected often and cheaply, and survivors are promoted to an old generation collected less often, mostly incrementally and concurrently to avoid long pauses. Reference counting alone is not used because it cannot free circular references. A leak is memory that stays reachable by mistake: forgotten timers and listeners, global variables, detached DOM nodes, closures holding large data, and caches that only grow. Fix them with cleanup functions, `WeakMap`/`WeakRef`, and bounded caches, and confirm with heap snapshots.\n\n```js\n// Leak: the interval keeps `bigData` reachable forever\nfunction start() {\n  const bigData = new Array(1e6).fill('x')\n  setInterval(() => console.log(bigData.length), 1000)\n}\n// Fix: keep the id and clear it when done\nconst id = setInterval(tick, 1000)\nclearInterval(id)\n```\n\n> That completes the bonus part. Combine it with parts 1 to 3 for a full JavaScript interview preparation.",ar:"يكمل هذا الجزء الإضافي السلسلة بأسئلة الآلية الداخلية التي يحبها مُقابِلو المطور الأول. هم يريدون أن يروا أنك تفهم ما يفعله المحرك، لا شكل الصيغة فقط.\n\n## 1. كيف ينفّذ JavaScript الكود باستخدام مكدس الاستدعاءات وسياقات التنفيذ؟\nينشئ المحرك أولًا سياق التنفيذ العام. وكل استدعاء دالة ينشئ سياق تنفيذ جديدًا ويضعه في مكدس الاستدعاءات، وعند انتهاء الدالة يُزال منه. ويُبنى كل سياق على مرحلتين: مرحلة الإنشاء تجهّز البيئة المعجمية (تسجّل `var` وتعريفات الدوال و `let`/`const` في الـ TDZ وقيمة `this`)، ومرحلة التنفيذ تشغّل الكود سطرًا بسطر. والنطاق المعجمي (lexical scope) يعني أن البحث عن المتغيرات يتبع مكان كتابة الدوال في الكود لا مكان استدعائها، صعودًا عبر البيئات الأب. والاستدعاءات المتداخلة الكثيرة تملأ المكدس (`RangeError: Maximum call stack size exceeded`).\n\n```js\nconst name = 'global'\nfunction outer() {\n  const name = 'outer'\n  function inner() { return name } // lexical scope: 'outer'\n  return inner()\n}\nouter() // stack: global -> outer -> inner\n```\n\n## 2. ماذا يحدث داخليًا عند استخدام async/await؟\nالدالة `async` تعيد دائمًا promise. وكل `await` يقيّم تعبيره ويغلّفه في promise ثم يعلّق الدالة: يُحفظ سياق تنفيذها ويُزال من المكدس، فيستمر تنفيذ بقية الكود. وعندما يُحل الـ promise المنتظر تُجدوَل بقية الدالة كمهمة دقيقة (microtask) وتُستأنف بالحالة المحفوظة، مثل generator يستأنفه مشغّل promises. والـ promise المرفوض يُرمى كخطأ في سطر الـ `await`، ولهذا يعمل `try/catch`. والكود بعد `await` لا يُنفَّذ بشكل متزامن أبدًا حتى لو كانت القيمة جاهزة.\n\n```js\nasync function run() {\n  console.log('A')\n  await null          // suspends; the rest becomes a microtask\n  console.log('C')\n}\nrun()\nconsole.log('B')\n// A, B, C\n```\n\n## 3. ما الفرق بين `Object.freeze` و `Object.seal` و `Object.preventExtensions`؟\n`preventExtensions` يمنع إضافة خصائص جديدة، مع إمكانية تعديل الموجودة أو حذفها. و `seal` يمنع أيضًا الحذف وإعادة التهيئة، لكن القيم ما زالت قابلة للتعديل. و `freeze` يجعل كل الخصائص للقراءة فقط إضافة إلى ذلك. والثلاثة سطحية: الكائنات المتداخلة تبقى قابلة للتعديل ما لم تجمّدها بشكل متكرر. وفي الوضع الصارم ترمي الكتابة الممنوعة `TypeError`، وإلا تفشل بصمت. وتحقق من الحالة بـ `Object.isExtensible` و `isSealed` و `isFrozen`.\n\n```js\nconst config = Object.freeze({ api: '/v1', nested: { retries: 3 } })\nconfig.api = '/v2'          // ignored (TypeError in strict mode)\nconfig.nested.retries = 5   // works: freeze is shallow\n\nconst user = Object.seal({ name: 'Mo' })\nuser.name = 'Mohamed'       // allowed\ndelete user.name            // not allowed\n```\n\n## 4. كيف تعمل `call` و `apply` و `bind`؟\nالثلاثة تحدد `this` صراحة. `call(thisArg, a, b)` تستدعي الدالة فورًا مع معاملات مفردة؛ و `apply(thisArg, [a, b])` تستدعيها فورًا مع مصفوفة معاملات؛ و `bind(thisArg, a)` تعيد دالة جديدة بقيمة `this` ثابتة (وبعض المعاملات الأولى اختياريًا) لتُستدعى لاحقًا. والدالة المربوطة لا يمكن ربطها مرة أخرى، لكن `new` ما زال يتجاوز قيمة `this` فيها. والدوال السهمية تتجاهل الثلاثة.\n\n```js\nfunction greet(greeting, mark) { return greeting + ', ' + this.name + mark }\nconst user = { name: 'Mo' }\ngreet.call(user, 'Hi', '!')      // 'Hi, Mo!'\ngreet.apply(user, ['Hello', '?']) // 'Hello, Mo?'\nconst hi = greet.bind(user, 'Hey')\nhi('.')                           // 'Hey, Mo.'\n```\n\n## 5. اكتب تطبيقًا مخصصًا لـ `bind()`.\nأعد دالة تدمج المعاملات المربوطة مع معاملات وقت الاستدعاء وتستدعي الدالة الأصلية بقيمة `this` المحفوظة. والإجابة الكاملة تتعامل أيضًا مع `new`: عند استخدام الدالة المربوطة كدالة بناء يجب أن تكون `this` هي الكائن الجديد، مع الحفاظ على الـ prototype.\n\n```js\nFunction.prototype.myBind = function (thisArg, ...boundArgs) {\n  const fn = this\n  function bound(...args) {\n    const isNew = this instanceof bound\n    return fn.apply(isNew ? this : thisArg, [...boundArgs, ...args])\n  }\n  bound.prototype = Object.create(fn.prototype)\n  return bound\n}\n```\n\n## 6. اكتب دالة للنسخ العميق (Deep Clone).\nفي الكود الحقيقي استخدم `structuredClone`: فهو يتعامل مع الكائنات المتداخلة والمصفوفات و `Map` و `Set` و `Date` والمصفوفات المحددة النوع والمراجع الدائرية، لكنه لا يدعم الدوال وعناصر الـ DOM والـ prototypes الخاصة بالـ classes. أما `JSON.parse(JSON.stringify(x))` فيفقد التواريخ و `undefined` و `Map`/`Set` ويفشل مع المراجع الدائرية. وفي المقابلة اكتب نسخة متكررة واستخدم `WeakMap` لتتبع الكائنات المنسوخة حتى لا تسبب المراجع الدائرية تكرارًا لا نهائيًا.\n\n```js\nfunction deepClone(value, seen = new WeakMap()) {\n  if (value === null || typeof value !== 'object') return value\n  if (seen.has(value)) return seen.get(value)\n  if (value instanceof Date) return new Date(value)\n  if (value instanceof Map) {\n    const copy = new Map()\n    seen.set(value, copy)\n    value.forEach((v, k) => copy.set(deepClone(k, seen), deepClone(v, seen)))\n    return copy\n  }\n  if (value instanceof Set) {\n    const copy = new Set()\n    seen.set(value, copy)\n    value.forEach((v) => copy.add(deepClone(v, seen)))\n    return copy\n  }\n  const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value))\n  seen.set(value, copy)\n  for (const key of Reflect.ownKeys(value)) copy[key] = deepClone(value[key], seen)\n  return copy\n}\n```\n\n## 7. ما الفرق بين Map و Set و WeakMap و WeakSet؟\n`Map` يخزن أزواج مفتاح/قيمة بمفاتيح من أي نوع، ويحافظ على ترتيب الإضافة، ولديه `size` وقابل للتكرار، وهو أفضل من الكائن العادي للمفاتيح الديناميكية والإضافة والحذف المتكرر. و `Set` يخزن قيمًا فريدة. أما `WeakMap` و `WeakSet` فيقبلان الكائنات فقط (أو الرموز غير المسجلة) ويحتفظان بها بشكل ضعيف: إذا لم يعد هناك مرجع آخر للمفتاح فيمكن جمعه مع عنصره. ولذلك لا يمكن التكرار عليهما وليس لهما `size`. استخدمهما للبيانات الخاصة أو للتخزين المؤقت المرتبط بكائنات (مثل عناصر الـ DOM) دون التسبب في تسرّب الذاكرة.\n\n```js\nconst visits = new Map([['home', 3]])\nconst tags = new Set(['js', 'js', 'react']) // { 'js', 'react' }\n\nconst metadata = new WeakMap()\nlet el = document.querySelector('#card')\nmetadata.set(el, { clicks: 0 })\nel = null // the element and its metadata can now be collected\n```\n\n## 8. كيف يعمل جمع القمامة (Garbage Collection)، وما أسباب تسرّب الذاكرة؟\nتحرر محركات JavaScript الذاكرة تلقائيًا اعتمادًا على إمكانية الوصول: بدءًا من الجذور (المتغيرات العامة ومكدس الاستدعاءات الحالي والـ closures النشطة) يعلّم الجامع كل ما يمكن الوصول إليه ويمسح الباقي (mark-and-sweep). ومحرك V8 يعتمد الأجيال: الكائنات الجديدة تعيش في جيل صغير يُجمع كثيرًا وبتكلفة قليلة، والناجية منها تُنقل إلى جيل قديم يُجمع بشكل أقل، غالبًا على مراحل وبالتوازي لتجنّب التوقفات الطويلة. ولا يُعتمد عدّ المراجع وحده لأنه لا يستطيع تحرير المراجع الدائرية. والتسرّب هو ذاكرة تبقى قابلة للوصول بالخطأ: مؤقتات ومستمعون منسيّون، ومتغيرات عامة، وعناصر DOM منفصلة، و closures تحتفظ ببيانات كبيرة، وذاكرات مؤقتة تكبر فقط. أصلحه بدوال التنظيف و `WeakMap`/`WeakRef` والذاكرات المؤقتة المحدودة، وتأكد بلقطات الذاكرة (heap snapshots).\n\n```js\n// Leak: the interval keeps `bigData` reachable forever\nfunction start() {\n  const bigData = new Array(1e6).fill('x')\n  setInterval(() => console.log(bigData.length), 1000)\n}\n// Fix: keep the id and clear it when done\nconst id = setInterval(tick, 1000)\nclearInterval(id)\n```\n\n> بهذا يكتمل الجزء الإضافي. اجمعه مع الأجزاء من 1 إلى 3 لاستعداد كامل لمقابلات JavaScript."},tags:[`Interview`,`JavaScript`,`Advanced`,`Internals`],date:`2026-10-07`,cover:``,published:!0},{id:`post_ts_next_rest`,slug:`typescript-nextjs-rest-api-interview-questions`,title:{en:`Interview questions, part 8: TypeScript, Next.js and REST APIs`,ar:`أسئلة المقابلات، الجزء 8: TypeScript و Next.js و REST API`},excerpt:{en:`Types vs interfaces, generics, narrowing, the Next.js App Router and caching, and how to build a solid API layer with React Query.`,ar:`الفرق بين type و interface، والـ generics، وتضييق الأنواع، و App Router في Next.js والتخزين المؤقت، وكيف تبني طبقة API متينة مع React Query.`},content:{en:"Front-end roles rarely stop at React. This part covers the TypeScript, Next.js and API questions that usually follow the React round.\n\n## 1. What is the difference between `type` and `interface`?\nBoth describe object shapes. `interface` can be extended with `extends` and merged by redeclaring it (useful for augmenting libraries). `type` can also express unions, intersections, tuples, mapped and conditional types. A common convention: `interface` for public object shapes and props, `type` for unions and computed types. Pick one style per codebase and be consistent.\n\n```ts\ninterface User { id: string; name: string }\ninterface Admin extends User { permissions: string[] }\n\ntype Status = 'idle' | 'loading' | 'error'\ntype WithTimestamps<T> = T & { createdAt: Date }\n```\n\n## 2. How do you use generics? Type a reusable fetch helper.\nGenerics let a function, hook or component work with many types while keeping type safety. The caller supplies the type, or TypeScript infers it, so the result is typed without `any`. Add constraints with `extends` when you need certain properties.\n\n```ts\nasync function getJson<T>(url: string, init?: RequestInit): Promise<T> {\n  const res = await fetch(url, init)\n  if (!res.ok) throw new Error('HTTP ' + res.status)\n  return res.json() as Promise<T>\n}\n\nconst users = await getJson<User[]>('/api/users')\n\nfunction byId<T extends { id: string }>(items: T[], id: string) {\n  return items.find((item) => item.id === id)\n}\n```\n\n## 3. Which utility types do you use most, and how do you type React props?\n`Partial`, `Required`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`, `Parameters` and `Awaited` cover most needs. For props, type them directly on the function, use `ReactNode` for children, and reuse native element props with `ComponentProps<'button'>` so a wrapper accepts everything the element does. Type event handlers with the React event types.\n\n```tsx\ntype ButtonProps = ComponentProps<'button'> & { variant?: 'primary' | 'ghost' }\n\nfunction Button({ variant = 'primary', ...props }: ButtonProps) {\n  return <button data-variant={variant} {...props} />\n}\n\ntype UserPreview = Pick<User, 'id' | 'name'>\nconst onChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)\n```\n\n## 4. What are `any`, `unknown` and `never`? How do you narrow types?\n`any` turns type checking off. `unknown` accepts anything but forces you to check before using it, so it is the safe choice for API responses and `catch` errors. `never` means a value that cannot exist, useful for exhaustive checks. Narrow with `typeof`, `instanceof`, `in`, custom type guards (`value is User`) and discriminated unions with a shared literal field.\n\n```ts\ntype RequestState<T> =\n  | { status: 'loading' }\n  | { status: 'success'; data: T }\n  | { status: 'error'; error: string }\n\nfunction render(state: RequestState<User>) {\n  switch (state.status) {\n    case 'loading': return 'Loading…'\n    case 'success': return state.data.name\n    case 'error': return state.error\n    default: { const unreachable: never = state; return unreachable }\n  }\n}\n```\n\n## 5. How does the Next.js App Router work?\nRoutes are folders under `app/`; `page.tsx` renders the route, `layout.tsx` wraps child routes and keeps its state between navigations, and `loading.tsx`, `error.tsx` and `not-found.tsx` add Suspense and error boundaries automatically. Components are Server Components by default; add `'use client'` only for interactive parts. Dynamic segments use folders like `[slug]`, and route handlers (`route.ts`) create API endpoints.\n\n```tsx\n// app/blog/[slug]/page.tsx\nexport default async function Post({ params }: { params: Promise<{ slug: string }> }) {\n  const { slug } = await params\n  const post = await getPost(slug)\n  if (!post) notFound()\n  return <Article post={post} />\n}\n```\n\n## 6. How do data fetching and caching work in Next.js?\nFetch data directly in Server Components with `async/await`. You choose freshness per request: static (cached at build), time-based revalidation (`next: { revalidate: 60 }`, which is ISR), or dynamic per request (`cache: 'no-store'`, or reading cookies and headers). After a mutation, refresh data with `revalidatePath` or `revalidateTag`. Server Actions (`'use server'`) handle form submissions and mutations without writing an API route. Caching defaults have changed between versions, so state which version you used.\n\n```ts\nconst posts = await fetch('https://api.example.com/posts', { next: { revalidate: 60, tags: ['posts'] } }).then((r) => r.json())\n\n// app/actions.ts\n'use server'\nexport async function createPost(formData: FormData) {\n  await db.post.create({ data: { title: String(formData.get('title')) } })\n  revalidateTag('posts')\n}\n```\n\n## 7. How do you design the API layer of a React app?\nKeep all HTTP code in one module instead of calling `fetch` inside components:\n- a client with the base URL, JSON handling and auth headers\n- one error type with status, message and field errors, so the UI handles errors the same way everywhere\n- timeouts and cancellation with `AbortController`\n- retries with backoff only for safe, idempotent requests\n- typed functions per resource (`getUsers`, `updateUser`) that components or hooks call\n\nValidate responses at the boundary (for example with Zod) when the backend is not fully trusted.\n\n```ts\nexport class ApiError extends Error {\n  constructor(public status: number, message: string, public details?: unknown) { super(message) }\n}\n\nexport async function api<T>(path: string, init: RequestInit = {}): Promise<T> {\n  const res = await fetch(import.meta.env.VITE_API_URL + path, {\n    ...init,\n    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + getToken(), ...init.headers },\n  })\n  const body = res.status === 204 ? null : await res.json().catch(() => null)\n  if (!res.ok) throw new ApiError(res.status, body?.message ?? res.statusText, body)\n  return body as T\n}\n```\n\n## 8. Why use React Query for server state?\nReact Query (TanStack Query) caches responses by query key and handles loading and error states, deduplicating requests, background refetching, retries, pagination and cancellation. `staleTime` controls how long data counts as fresh. Mutations use `useMutation`, then invalidate related queries or update the cache optimistically and roll back on error. It removes most hand-written `useEffect` + `useState` fetching code.\n\n```tsx\nconst { data: users, isPending, error } = useQuery({\n  queryKey: ['users', page],\n  queryFn: ({ signal }) => api<User[]>('/users?page=' + page, { signal }),\n  staleTime: 60_000,\n})\n\nconst queryClient = useQueryClient()\nconst updateUser = useMutation({\n  mutationFn: (user: User) => api<User>('/users/' + user.id, { method: 'PUT', body: JSON.stringify(user) }),\n  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),\n})\n```\n\n## 9. How do you handle authentication tokens and 401 errors?\nPrefer short-lived access tokens with a refresh token in an `httpOnly`, `Secure`, `SameSite` cookie, so JavaScript (and XSS) cannot read it. When a request returns 401, call the refresh endpoint once, queue other requests while it runs, retry them with the new token, and log the user out if the refresh fails. Never put API secrets in front-end code, and guard routes in the UI while the server enforces permissions.\n\n```ts\nlet refreshing: Promise<void> | null = null\n\nasync function withAuthRetry<T>(request: () => Promise<T>): Promise<T> {\n  try {\n    return await request()\n  } catch (error) {\n    if (!(error instanceof ApiError) || error.status !== 401) throw error\n    refreshing ??= refreshSession().finally(() => { refreshing = null })\n    await refreshing\n    return request()\n  }\n}\n```\n\n> That completes part 8. Together with parts 1 to 7, it covers a full senior front-end interview loop.",ar:"نادرًا ما تتوقف وظائف الواجهات الأمامية عند React. يغطي هذا الجزء أسئلة TypeScript و Next.js والواجهات البرمجية التي تأتي عادة بعد جولة React.\n\n## 1. ما الفرق بين `type` و `interface`؟\nكلاهما يصف شكل الكائنات. يمكن توسيع `interface` بـ `extends` ودمجه بإعادة تعريفه (مفيد لتوسيع المكتبات). أما `type` فيعبّر أيضًا عن الاتحادات والتقاطعات والـ tuples والأنواع المعيّنة (mapped) والشرطية. والعرف الشائع: `interface` لأشكال الكائنات العامة والـ props، و `type` للاتحادات والأنواع المحسوبة. اختر أسلوبًا واحدًا في المشروع والتزم به.\n\n```ts\ninterface User { id: string; name: string }\ninterface Admin extends User { permissions: string[] }\n\ntype Status = 'idle' | 'loading' | 'error'\ntype WithTimestamps<T> = T & { createdAt: Date }\n```\n\n## 2. كيف تستخدم الـ Generics؟ اكتب دالة fetch عامة بأنواع.\nالـ generics تتيح لدالة أو hook أو مكوّن العمل مع أنواع كثيرة مع الحفاظ على أمان الأنواع. يحدد المستدعي النوع أو يستنتجه TypeScript، فتكون النتيجة محددة النوع دون `any`. وأضف قيودًا بـ `extends` عندما تحتاج خصائص معينة.\n\n```ts\nasync function getJson<T>(url: string, init?: RequestInit): Promise<T> {\n  const res = await fetch(url, init)\n  if (!res.ok) throw new Error('HTTP ' + res.status)\n  return res.json() as Promise<T>\n}\n\nconst users = await getJson<User[]>('/api/users')\n\nfunction byId<T extends { id: string }>(items: T[], id: string) {\n  return items.find((item) => item.id === id)\n}\n```\n\n## 3. ما الأنواع المساعدة (Utility Types) التي تستخدمها أكثر، وكيف تكتب أنواع props في React؟\n`Partial` و `Required` و `Pick` و `Omit` و `Record` و `Readonly` و `ReturnType` و `Parameters` و `Awaited` تغطي معظم الاحتياجات. وللـ props اكتب نوعها مباشرة على الدالة، واستخدم `ReactNode` للأبناء، وأعد استخدام خصائص العناصر الأصلية بـ `ComponentProps<'button'>` حتى يقبل المكوّن المغلِّف كل ما يقبله العنصر. واكتب أنواع معالجات الأحداث بأنواع أحداث React.\n\n```tsx\ntype ButtonProps = ComponentProps<'button'> & { variant?: 'primary' | 'ghost' }\n\nfunction Button({ variant = 'primary', ...props }: ButtonProps) {\n  return <button data-variant={variant} {...props} />\n}\n\ntype UserPreview = Pick<User, 'id' | 'name'>\nconst onChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)\n```\n\n## 4. ما هي `any` و `unknown` و `never`؟ وكيف تضيّق الأنواع؟\n`any` يعطّل فحص الأنواع. و `unknown` يقبل أي قيمة لكنه يجبرك على التحقق قبل الاستخدام، لذا هو الخيار الآمن لاستجابات الواجهات البرمجية وأخطاء `catch`. و `never` تعني قيمة لا يمكن أن توجد، وهي مفيدة للفحص الشامل. وضيّق الأنواع بـ `typeof` و `instanceof` و `in` ودوال الحماية المخصصة (`value is User`) والاتحادات المميَّزة بحقل حرفي مشترك.\n\n```ts\ntype RequestState<T> =\n  | { status: 'loading' }\n  | { status: 'success'; data: T }\n  | { status: 'error'; error: string }\n\nfunction render(state: RequestState<User>) {\n  switch (state.status) {\n    case 'loading': return 'Loading…'\n    case 'success': return state.data.name\n    case 'error': return state.error\n    default: { const unreachable: never = state; return unreachable }\n  }\n}\n```\n\n## 5. كيف يعمل App Router في Next.js؟\nالمسارات مجلدات داخل `app/`؛ و `page.tsx` يرسم المسار، و `layout.tsx` يغلّف المسارات الفرعية ويحافظ على حالته بين التنقلات، و `loading.tsx` و `error.tsx` و `not-found.tsx` تضيف حدود Suspense والأخطاء تلقائيًا. والمكوّنات Server Components افتراضيًا؛ أضف `'use client'` للأجزاء التفاعلية فقط. والمقاطع الديناميكية تستخدم مجلدات مثل `[slug]`، وملفات `route.ts` تنشئ نقاط API.\n\n```tsx\n// app/blog/[slug]/page.tsx\nexport default async function Post({ params }: { params: Promise<{ slug: string }> }) {\n  const { slug } = await params\n  const post = await getPost(slug)\n  if (!post) notFound()\n  return <Article post={post} />\n}\n```\n\n## 6. كيف يعمل جلب البيانات والتخزين المؤقت في Next.js؟\nاجلب البيانات مباشرة في Server Components باستخدام `async/await`. وتختار مدى حداثة البيانات لكل طلب: ثابتة (مخزنة وقت البناء)، أو إعادة تحقق زمنية (`next: { revalidate: 60 }` وهي ISR)، أو ديناميكية لكل طلب (`cache: 'no-store'` أو قراءة الكوكيز والترويسات). وبعد أي تعديل حدّث البيانات بـ `revalidatePath` أو `revalidateTag`. وتتعامل Server Actions (`'use server'`) مع إرسال النماذج والتعديلات دون كتابة مسار API. وقد تغيرت إعدادات التخزين الافتراضية بين الإصدارات، فاذكر الإصدار الذي استخدمته.\n\n```ts\nconst posts = await fetch('https://api.example.com/posts', { next: { revalidate: 60, tags: ['posts'] } }).then((r) => r.json())\n\n// app/actions.ts\n'use server'\nexport async function createPost(formData: FormData) {\n  await db.post.create({ data: { title: String(formData.get('title')) } })\n  revalidateTag('posts')\n}\n```\n\n## 7. كيف تصمم طبقة الواجهة البرمجية (API) في تطبيق React؟\nاجمع كل كود HTTP في وحدة واحدة بدلًا من استدعاء `fetch` داخل المكوّنات:\n- عميل يحتوي الرابط الأساسي ومعالجة JSON وترويسات المصادقة\n- نوع خطأ موحّد فيه الحالة والرسالة وأخطاء الحقول، حتى تتعامل الواجهة مع الأخطاء بالطريقة نفسها في كل مكان\n- مهلة زمنية وإلغاء عبر `AbortController`\n- إعادة المحاولة مع تأخير متزايد للطلبات الآمنة غير المتغيرة فقط\n- دوال محددة الأنواع لكل مورد (`getUsers` و `updateUser`) تستدعيها المكوّنات أو الـ hooks\n\nوتحقق من الاستجابات عند الحدود (مثلًا بـ Zod) عندما لا تكون الواجهة الخلفية موثوقة بالكامل.\n\n```ts\nexport class ApiError extends Error {\n  constructor(public status: number, message: string, public details?: unknown) { super(message) }\n}\n\nexport async function api<T>(path: string, init: RequestInit = {}): Promise<T> {\n  const res = await fetch(import.meta.env.VITE_API_URL + path, {\n    ...init,\n    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + getToken(), ...init.headers },\n  })\n  const body = res.status === 204 ? null : await res.json().catch(() => null)\n  if (!res.ok) throw new ApiError(res.status, body?.message ?? res.statusText, body)\n  return body as T\n}\n```\n\n## 8. لماذا تستخدم React Query لحالة الخادم؟\nتخزّن React Query (TanStack Query) الاستجابات حسب مفتاح الاستعلام، وتتعامل مع حالات التحميل والخطأ وإزالة الطلبات المكررة وإعادة الجلب في الخلفية وإعادة المحاولة وتقسيم الصفحات والإلغاء. ويتحكم `staleTime` في المدة التي تُعتبر فيها البيانات حديثة. وتستخدم التعديلات `useMutation` ثم تُبطل الاستعلامات المرتبطة أو تحدّث الذاكرة المؤقتة تفاؤليًا مع التراجع عند الخطأ. وهي تغني عن معظم كود الجلب اليدوي بـ `useEffect` و `useState`.\n\n```tsx\nconst { data: users, isPending, error } = useQuery({\n  queryKey: ['users', page],\n  queryFn: ({ signal }) => api<User[]>('/users?page=' + page, { signal }),\n  staleTime: 60_000,\n})\n\nconst queryClient = useQueryClient()\nconst updateUser = useMutation({\n  mutationFn: (user: User) => api<User>('/users/' + user.id, { method: 'PUT', body: JSON.stringify(user) }),\n  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),\n})\n```\n\n## 9. كيف تتعامل مع رموز المصادقة وأخطاء 401؟\nفضّل رموز وصول قصيرة العمر مع رمز تحديث (refresh token) في كوكي بخصائص `httpOnly` و `Secure` و `SameSite`، حتى لا يستطيع JavaScript (ولا هجمات XSS) قراءته. وعندما يعيد طلب 401 استدعِ نقطة التحديث مرة واحدة، وضع الطلبات الأخرى في طابور أثناء ذلك، وأعد محاولتها بالرمز الجديد، وسجّل خروج المستخدم إذا فشل التحديث. ولا تضع أسرار الواجهات البرمجية في كود الواجهة الأمامية أبدًا، واحمِ المسارات في الواجهة بينما يفرض الخادم الصلاحيات.\n\n```ts\nlet refreshing: Promise<void> | null = null\n\nasync function withAuthRetry<T>(request: () => Promise<T>): Promise<T> {\n  try {\n    return await request()\n  } catch (error) {\n    if (!(error instanceof ApiError) || error.status !== 401) throw error\n    refreshing ??= refreshSession().finally(() => { refreshing = null })\n    await refreshing\n    return request()\n  }\n}\n```\n\n> بهذا يكتمل الجزء الثامن. ومع الأجزاء من 1 إلى 7 تغطي السلسلة جولة مقابلات كاملة لمطور واجهات أمامية أول."},tags:[`Interview`,`TypeScript`,`Next.js`,`REST API`],date:`2026-10-08`,cover:``,published:!0},{id:`post_react_coding`,slug:`react-coding-interview-tasks`,title:{en:`React interview questions, part 9: coding tasks with solutions`,ar:`أسئلة مقابلات React، الجزء 9: مهام برمجية مع الحلول`},excerpt:{en:`Debounced search, a useFetch hook, a todo list with filters, the useEffect infinite loop, a 10k-row virtualized list, automatic batching and error boundary limits.`,ar:`بحث مع debounce، و hook باسم useFetch، وقائمة مهام مع فلاتر، وحلقة useEffect اللانهائية، وقائمة من 10 آلاف صف، والتجميع التلقائي، وحدود error boundaries.`},content:{en:`Live coding rounds often ask you to build a small component in 20–30 minutes. These are the most common tasks, with solutions you can explain line by line.

## 1. Build a debounced search input.
Keep the input value in state so typing stays instant, debounce the value with a custom hook, and fetch only when the debounced value changes. Abort the previous request so an old, slow response can never replace a newer one.

\`\`\`jsx
function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debouncedQuery = useDebouncedValue(query)

  useEffect(() => {
    if (!debouncedQuery.trim()) return setResults([])
    const controller = new AbortController()
    fetch('/api/search?q=' + encodeURIComponent(debouncedQuery), { signal: controller.signal })
      .then((res) => res.json())
      .then(setResults)
      .catch((err) => { if (err.name !== 'AbortError') console.error(err) })
    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
      <ul>{results.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
    </>
  )
}
\`\`\`

## 2. Write a \`useFetch\` hook with loading and error states.
Keep \`data\`, \`error\` and \`loading\` together, reset them when the URL changes, check \`res.ok\` (fetch does not reject on HTTP errors), and abort on cleanup. Mention that in production you would use React Query, which adds caching, retries and deduplication.

\`\`\`jsx
function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true })

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, error: null, loading: true })
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, error, loading: false })
      })
    return () => controller.abort()
  }, [url])

  return state
}

const { data: users, loading, error } = useFetch('/api/users')
\`\`\`

## 3. Build a todo list with filters.
Store only the todos and the active filter; derive the visible list during render instead of keeping it in state. Update immutably, use stable ids as keys, and use a \`<form>\` so Enter submits.

\`\`\`jsx
const FILTERS = { all: () => true, active: (t) => !t.done, done: (t) => t.done }

function Todos() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const visible = todos.filter(FILTERS[filter]) // derived, not stored

  function add(formData) {
    const title = String(formData.get('title')).trim()
    if (title) setTodos((list) => [...list, { id: crypto.randomUUID(), title, done: false }])
  }
  const toggle = (id) => setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos((list) => list.filter((t) => t.id !== id))

  return (
    <>
      <form action={add}><input name="title" aria-label="New todo" /><button>Add</button></form>
      {Object.keys(FILTERS).map((name) => (
        <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>
      ))}
      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            <label><input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.title}</label>
            <button onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}
\`\`\`

## 4. Why does this \`useEffect\` create an infinite loop?
The effect sets state, which re-renders the component, which runs the effect again. Typical causes:
- no dependency array at all
- an object, array or function created during render used as a dependency, because it is a new reference on every render
- the effect updates a value it also depends on

Fixes: add the correct dependencies, move objects inside the effect or memoize them, depend on primitive values, use a functional update, or remove the effect when the value can be derived during render.

\`\`\`jsx
// Bug: \`options\` is a new object every render -> effect -> setState -> render -> ...
const options = { page, size: 20 }
useEffect(() => { fetchUsers(options).then(setUsers) }, [options])

// Fix: depend on primitives (or create the object inside the effect)
useEffect(() => { fetchUsers({ page, size: 20 }).then(setUsers) }, [page])

// Bug: reads and writes the same state
useEffect(() => setCount(count + 1), [count])
// Fix: don't use an effect for this; update count in the event that causes it
\`\`\`

## 5. How do you render a list with 10,000+ rows?
Rendering every row creates thousands of DOM nodes and makes scrolling and typing slow. Virtualization renders only the rows in (and slightly around) the viewport and uses padding to keep the scrollbar size correct. Use TanStack Virtual or react-window, give rows a known or measured height, memoize row components, and combine it with pagination or infinite loading for very large data.

\`\`\`jsx
import { useVirtualizer } from '@tanstack/react-virtual'

function BigList({ rows }) {
  const parentRef = useRef(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  })
  return (
    <div ref={parentRef} style={{ height: 500, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((item) => (
          <div key={item.key} style={{ position: 'absolute', top: 0, width: '100%', height: item.size, transform: 'translateY(' + item.start + 'px)' }}>
            {rows[item.index].name}
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

## 6. What is automatic batching?
Batching groups several state updates into one re-render. Before React 18 this only happened inside React event handlers; updates in promises, \`setTimeout\` or native listeners each caused a separate render. With \`createRoot\` (React 18+) all updates are batched automatically, wherever they happen. In the rare case you need the DOM updated immediately, wrap the update in \`flushSync\` from \`react-dom\`.

\`\`\`jsx
setTimeout(() => {
  setCount((c) => c + 1)
  setFlag((f) => !f)
  // React 17: two renders. React 18+: one render.
}, 1000)

flushSync(() => setOpen(true)) // DOM is updated before the next line
dialogRef.current.focus()
\`\`\`

## 7. What can error boundaries not catch?
Error boundaries catch errors thrown while rendering, in lifecycle methods and in constructors of components below them. They do not catch:
- errors in event handlers (use \`try/catch\`)
- asynchronous code such as \`setTimeout\`, promises or \`fetch\` callbacks, unless you rethrow the error into render (for example by storing it in state)
- errors during server-side rendering
- errors thrown in the error boundary itself

Place boundaries around routes and independent widgets so one failure does not break the whole page, and report errors to a tool like Sentry.

\`\`\`jsx
function SaveButton() {
  const [error, setError] = useState(null)
  if (error) throw error // now the nearest error boundary catches it
  async function save() {
    try { await api.save() } catch (err) { setError(err) }
  }
  return <button onClick={save}>Save</button>
}
\`\`\`

> That completes the coding part. Practise each task with a timer and explain your choices out loud as you type.`,ar:`كثيرًا ما تطلب جولات البرمجة المباشرة بناء مكوّن صغير في 20 إلى 30 دقيقة. هذه أكثر المهام شيوعًا مع حلول يمكنك شرحها سطرًا بسطر.

## 1. ابنِ حقل بحث مع debounce.
احفظ قيمة الحقل في الحالة حتى تبقى الكتابة فورية، وأخّر القيمة بـ hook مخصص، واجلب البيانات فقط عند تغيّر القيمة المؤخَّرة. وألغِ الطلب السابق حتى لا تستبدل استجابة قديمة بطيئة استجابة أحدث.

\`\`\`jsx
function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const debouncedQuery = useDebouncedValue(query)

  useEffect(() => {
    if (!debouncedQuery.trim()) return setResults([])
    const controller = new AbortController()
    fetch('/api/search?q=' + encodeURIComponent(debouncedQuery), { signal: controller.signal })
      .then((res) => res.json())
      .then(setResults)
      .catch((err) => { if (err.name !== 'AbortError') console.error(err) })
    return () => controller.abort()
  }, [debouncedQuery])

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search" />
      <ul>{results.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
    </>
  )
}
\`\`\`

## 2. اكتب hook باسم \`useFetch\` مع حالات التحميل والخطأ.
احفظ \`data\` و \`error\` و \`loading\` معًا، وأعد ضبطها عند تغيّر الرابط، وتحقق من \`res.ok\` (فـ fetch لا يرفض عند أخطاء HTTP)، وألغِ الطلب عند التنظيف. واذكر أنك في الإنتاج ستستخدم React Query التي تضيف التخزين المؤقت وإعادة المحاولة وإزالة التكرار.

\`\`\`jsx
function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true })

  useEffect(() => {
    const controller = new AbortController()
    setState({ data: null, error: null, loading: true })
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('HTTP ' + res.status)
        return res.json()
      })
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, error, loading: false })
      })
    return () => controller.abort()
  }, [url])

  return state
}

const { data: users, loading, error } = useFetch('/api/users')
\`\`\`

## 3. ابنِ قائمة مهام مع فلاتر.
احفظ المهام والفلتر الحالي فقط، واشتق القائمة المعروضة أثناء الرسم بدلًا من حفظها في الحالة. وحدّث البيانات دون تعديل مباشر، واستخدم معرّفات ثابتة كمفاتيح، واستخدم \`<form>\` حتى يرسل زر Enter النموذج.

\`\`\`jsx
const FILTERS = { all: () => true, active: (t) => !t.done, done: (t) => t.done }

function Todos() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')
  const visible = todos.filter(FILTERS[filter]) // derived, not stored

  function add(formData) {
    const title = String(formData.get('title')).trim()
    if (title) setTodos((list) => [...list, { id: crypto.randomUUID(), title, done: false }])
  }
  const toggle = (id) => setTodos((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos((list) => list.filter((t) => t.id !== id))

  return (
    <>
      <form action={add}><input name="title" aria-label="New todo" /><button>Add</button></form>
      {Object.keys(FILTERS).map((name) => (
        <button key={name} aria-pressed={filter === name} onClick={() => setFilter(name)}>{name}</button>
      ))}
      <ul>
        {visible.map((t) => (
          <li key={t.id}>
            <label><input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.title}</label>
            <button onClick={() => remove(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}
\`\`\`

## 4. لماذا يسبب هذا \`useEffect\` حلقة لا نهائية؟
الـ effect يحدّث الحالة، فيُعاد رسم المكوّن، فيُنفَّذ الـ effect مرة أخرى. الأسباب المعتادة:
- عدم وجود مصفوفة اعتماديات أصلًا
- كائن أو مصفوفة أو دالة تُنشأ أثناء الرسم وتُستخدم كاعتمادية، لأنها مرجع جديد في كل رسم
- الـ effect يحدّث قيمة يعتمد عليها هو نفسه

الحلول: أضف الاعتماديات الصحيحة، أو انقل الكائنات داخل الـ effect أو خزّنها بـ memo، أو اعتمد على قيم بدائية، أو استخدم التحديث الدالّي، أو احذف الـ effect إذا أمكن اشتقاق القيمة أثناء الرسم.

\`\`\`jsx
// Bug: \`options\` is a new object every render -> effect -> setState -> render -> ...
const options = { page, size: 20 }
useEffect(() => { fetchUsers(options).then(setUsers) }, [options])

// Fix: depend on primitives (or create the object inside the effect)
useEffect(() => { fetchUsers({ page, size: 20 }).then(setUsers) }, [page])

// Bug: reads and writes the same state
useEffect(() => setCount(count + 1), [count])
// Fix: don't use an effect for this; update count in the event that causes it
\`\`\`

## 5. كيف تعرض قائمة فيها أكثر من 10,000 صف؟
رسم كل الصفوف ينشئ آلاف عناصر الـ DOM ويجعل التمرير والكتابة بطيئين. والـ virtualization يرسم فقط الصفوف الظاهرة (وقليلًا حولها) ويستخدم مسافات للحفاظ على حجم شريط التمرير الصحيح. استخدم TanStack Virtual أو react-window، واجعل ارتفاع الصفوف معروفًا أو مقاسًا، وخزّن مكوّنات الصفوف بـ memo، وادمج ذلك مع تقسيم الصفحات أو التحميل اللانهائي للبيانات الضخمة جدًا.

\`\`\`jsx
import { useVirtualizer } from '@tanstack/react-virtual'

function BigList({ rows }) {
  const parentRef = useRef(null)
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 10,
  })
  return (
    <div ref={parentRef} style={{ height: 500, overflow: 'auto' }}>
      <div style={{ height: virtualizer.getTotalSize(), position: 'relative' }}>
        {virtualizer.getVirtualItems().map((item) => (
          <div key={item.key} style={{ position: 'absolute', top: 0, width: '100%', height: item.size, transform: 'translateY(' + item.start + 'px)' }}>
            {rows[item.index].name}
          </div>
        ))}
      </div>
    </div>
  )
}
\`\`\`

## 6. ما هو التجميع التلقائي (Automatic Batching)؟
التجميع يدمج عدة تحديثات للحالة في إعادة رسم واحدة. قبل React 18 كان ذلك يحدث فقط داخل معالجات أحداث React؛ أما التحديثات داخل الـ promises و \`setTimeout\` والمستمعين الأصليين فكان كل منها يسبب رسمًا منفصلًا. ومع \`createRoot\` (React 18 وما بعده) تُجمَّع كل التحديثات تلقائيًا أينما حدثت. وفي الحالات النادرة التي تحتاج فيها تحديث الـ DOM فورًا غلّف التحديث بـ \`flushSync\` من \`react-dom\`.

\`\`\`jsx
setTimeout(() => {
  setCount((c) => c + 1)
  setFlag((f) => !f)
  // React 17: two renders. React 18+: one render.
}, 1000)

flushSync(() => setOpen(true)) // DOM is updated before the next line
dialogRef.current.focus()
\`\`\`

## 7. ما الذي لا تستطيع error boundaries التقاطه؟
تلتقط error boundaries الأخطاء التي تحدث أثناء الرسم وفي دوال دورة الحياة وفي دوال البناء للمكوّنات التي تحتها. ولا تلتقط:
- أخطاء معالجات الأحداث (استخدم \`try/catch\`)
- الكود غير المتزامن مثل \`setTimeout\` والـ promises و callbacks الـ \`fetch\`، إلا إذا أعدت رمي الخطأ أثناء الرسم (مثلًا بحفظه في الحالة)
- الأخطاء أثناء الرسم على الخادم (SSR)
- الأخطاء التي تحدث داخل الـ error boundary نفسه

ضع الحدود حول المسارات والأجزاء المستقلة حتى لا يكسر خطأ واحد الصفحة كلها، وأرسل الأخطاء إلى أداة مثل Sentry.

\`\`\`jsx
function SaveButton() {
  const [error, setError] = useState(null)
  if (error) throw error // now the nearest error boundary catches it
  async function save() {
    try { await api.save() } catch (err) { setError(err) }
  }
  return <button onClick={save}>Save</button>
}
\`\`\`

> بهذا يكتمل الجزء البرمجي. تدرّب على كل مهمة مع مؤقت واشرح اختياراتك بصوت عالٍ أثناء الكتابة.`},tags:[`Interview`,`React`,`Coding`],date:`2026-10-09`,cover:``,published:!0}],Jn="Most products I build at Naseej ship in Arabic and English. Supporting both is a layout problem, not a translation problem. Here is what works for me.\n\n## 1. Let the document own the direction\nSet `dir` and `lang` on the `<html>` element from a language context, and don't hard-code direction in components. Every flex row, grid and text block then flips automatically.\n\n## 2. Use logical properties\nReplace `margin-left` and `padding-right` with logical properties. In Tailwind that means `ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*` and `end-*`:\n- `ms-4` instead of `ml-4`\n- `text-start` instead of `text-left`\n- `start-0` instead of `left-0`\n\n## 3. Mirror icons that show direction\nArrows and chevrons must flip in RTL, while logos and media controls must not. A `rtl:rotate-180` class on directional icons is usually enough.\n\n## 4. Keep code, numbers and URLs LTR\nWrap tech stacks, phone numbers, e-mails and code samples in `dir=\"ltr\"` so they don't get scrambled inside Arabic text.\n\n## 5. Pick fonts for both scripts\nUse a font stack with a good Arabic face (I like Cairo) so line heights and weights match between the two languages.\n\n> Test every screen in both directions before you call it done. RTL bugs are cheap to fix early and expensive to fix late.",Yn='معظم المنتجات التي أبنيها في نسيج تُطلق باللغتين العربية والإنجليزية. دعم اللغتين مشكلة تخطيط قبل أن يكون مشكلة ترجمة. إليك ما ينجح معي.\n\n## 1. اجعل المستند يتحكم في الاتجاه\nاضبط `dir` و `lang` على عنصر `<html>` من خلال Context للغة، ولا تكتب الاتجاه داخل المكونات. بعدها تنعكس الصفوف والشبكات والنصوص تلقائيًا.\n\n## 2. استخدم الخصائص المنطقية\nاستبدل `margin-left` و `padding-right` بالخصائص المنطقية. في Tailwind يعني ذلك `ms-*` و `me-*` و `ps-*` و `pe-*` و `start-*` و `end-*`:\n- `ms-4` بدلًا من `ml-4`\n- `text-start` بدلًا من `text-left`\n- `start-0` بدلًا من `left-0`\n\n## 3. اعكس الأيقونات التي تدل على اتجاه\nالأسهم يجب أن تنعكس في RTL، أما الشعارات وأزرار الوسائط فلا. غالبًا يكفي إضافة `rtl:rotate-180` للأيقونات الاتجاهية.\n\n## 4. أبقِ الأكواد والأرقام والروابط LTR\nضع التقنيات وأرقام الهواتف والبريد الإلكتروني وأمثلة الكود داخل `dir="ltr"` حتى لا تختلط داخل النص العربي.\n\n## 5. اختر خطوطًا تناسب اللغتين\nاستخدم مجموعة خطوط تحتوي على خط عربي جيد (أفضّل Cairo) حتى تتطابق المسافات والأوزان بين اللغتين.\n\n> اختبر كل شاشة في الاتجاهين قبل اعتبارها منتهية؛ إصلاح أخطاء RTL مبكرًا رخيص، ومتأخرًا مكلف.',Xn=["```tsx",`const [state, formAction, isPending] = useActionState(async (prev, formData) => {`,`  await save(formData)`,`  return { ok: true }`,`}, { ok: false })`,``,`return <form action={formAction}>…</form>`,"```"],Zn=["```tsx",`function SubmitButton() {`,`  const { pending } = useFormStatus()`,`  return <button disabled={pending}>{pending ? 'Sending…' : 'Send'}</button>`,`}`,"```"],Qn=[`React 19 makes forms much simpler. This portfolio's contact form, admin editors and chat widget all use the new APIs.`,``,`## useActionState`,`Pass an async action and an initial state. React gives you the latest state, a form action and a pending flag:`,``,...Xn,``,`## useFormStatus`,`A submit button can read the status of its parent form, with no prop drilling:`,``,...Zn,``,`## useOptimistic`,`Show the result straight away, before the server answers. The chat widget adds the visitor's message to the list as soon as it's sent, and React swaps in the real state when the request finishes.`,``,`## Takeaways`,"- Fewer `useState` + `useEffect` pairs for loading and error state","- Forms work with plain `FormData`",`- Pending UI is built in`].join(`
`),$n=[`يجعل React 19 النماذج أبسط بكثير. نموذج التواصل ومحررات لوحة التحكم والمساعد الذكي في هذا الموقع تستخدم كلها الواجهات الجديدة.`,``,`## useActionState`,`مرّر دالة async وحالة ابتدائية، وسيعطيك React آخر حالة ودالة للنموذج ومؤشر انتظار:`,``,...Xn,``,`## useFormStatus`,`يستطيع زر الإرسال قراءة حالة النموذج الأب مباشرة دون تمرير props:`,``,...Zn,``,`## useOptimistic`,`اعرض النتيجة فورًا قبل رد الخادم. يضيف المساعد الذكي رسالة الزائر إلى القائمة لحظة إرسالها، ثم يستبدلها React بالحالة الحقيقية عند انتهاء الطلب.`,``,`## الخلاصة`,"- عدد أقل من أزواج `useState` و `useEffect` لحالات التحميل والأخطاء","- النماذج تعمل مع `FormData` مباشرة",`- واجهة الانتظار مدمجة`].join(`
`),er=`For the Medad platform we delivered white-labelled iOS and Android apps from the same React code base as the web app, using Capacitor.

## Why Capacitor
- One React + TypeScript code base for web, iOS and Android
- Native plugins (camera, push notifications, file system) behind a JavaScript API
- The web team can ship mobile releases without learning a new framework

## Things to plan for
1. **Safe areas and the keyboard.** Use \`env(safe-area-inset-*)\` and test forms with the on-screen keyboard open.
2. **Deep links and routing.** Use the same routes on web and mobile so links from notifications open the right screen.
3. **White-labelling.** Keep each client's brand colours, icons and app IDs in configuration, not in code.
4. **Performance.** Lazy-load routes and keep the first bundle small, because low-end Android devices are less forgiving than desktops.

## When to choose React Native instead
If the app relies on heavy animations, complex gestures or deep native integrations, React Native is often the better fit. For content and form-heavy products, Capacitor gets you to the stores faster.`,tr=`في منصة مداد قدّمنا تطبيقات iOS و Android بعلامات تجارية مخصصة من نفس كود React الخاص بتطبيق الويب باستخدام Capacitor.

## لماذا Capacitor
- كود واحد بـ React و TypeScript للويب و iOS و Android
- إضافات أصلية (الكاميرا، الإشعارات، نظام الملفات) عبر واجهة JavaScript
- يستطيع فريق الويب إصدار تطبيقات الجوال دون تعلم إطار عمل جديد

## أمور يجب التخطيط لها
1. **المناطق الآمنة ولوحة المفاتيح.** استخدم \`env(safe-area-inset-*)\` واختبر النماذج مع ظهور لوحة المفاتيح.
2. **الروابط العميقة والتوجيه.** استخدم نفس المسارات في الويب والجوال حتى تفتح روابط الإشعارات الشاشة الصحيحة.
3. **العلامات التجارية المخصصة.** احفظ ألوان كل عميل وأيقوناته ومعرّفات تطبيقه في الإعدادات وليس في الكود.
4. **الأداء.** حمّل المسارات عند الحاجة وأبقِ الحزمة الأولى صغيرة، فأجهزة Android الضعيفة أقل تسامحًا من الحواسيب.

## متى تختار React Native بدلًا منه
إذا كان التطبيق يعتمد على رسوم متحركة كثيفة أو إيماءات معقدة أو تكامل أصلي عميق فغالبًا React Native هو الأنسب. أما المنتجات القائمة على المحتوى والنماذج فيوصلك Capacitor إلى المتاجر أسرع.`,$={profile:{name:{en:`Mohamed Sabry`,ar:`محمد صبري`},title:{en:`Software Engineer (Front-End)`,ar:`مهندس برمجيات (واجهات أمامية)`},tagline:{en:`I turn UI/UX designs into fast, accessible and bilingual web & mobile experiences.`,ar:`أحوّل تصاميم واجهات المستخدم إلى تجارب ويب وجوال سريعة وسهلة الوصول وثنائية اللغة.`},summary:{en:`Front-end software engineer with 7 years of web development experience, including 3+ years at Naseej building the Medad platform products (TMP, CMP and SEP) for web and mobile. I turn UI/UX designs into fast, accessible and responsive interfaces in React.js and TypeScript, deliver bilingual Arabic (RTL) and English products, and work across the stack with Node.js and REST APIs.`,ar:`مهندس برمجيات واجهات أمامية بخبرة 7 سنوات في تطوير الويب، منها أكثر من 3 سنوات في نسيج لبناء منتجات منصة مداد (TMP و CMP و SEP) للويب والجوال. أحوّل تصاميم UI/UX إلى واجهات سريعة ومتجاوبة وسهلة الوصول باستخدام React.js و TypeScript، وأقدّم منتجات ثنائية اللغة بالعربية (RTL) والإنجليزية، وأعمل عبر كامل الحزمة باستخدام Node.js وواجهات REST.`},location:{en:`Cairo, Egypt`,ar:`القاهرة، مصر`},email:`mohamed.sabry.ahmed000@gmail.com`,phones:[`+20 109 183 7581`,`+20 102 368 7024`],linkedin:`https://linkedin.com/in/mohamedsabry123`,github:`https://bit.ly/3yKLRP8`,website:`https://bit.ly/mo-sabry`,avatarUrl:``,cvUrl:`/Mohamed_Sabry_Software_Engineer_CV.pdf`,yearsExperience:7,projectsCount:15,available:!0},experiences:[{id:`exp_naseej`,company:{en:`Naseej`,ar:`نسيج`},role:{en:`Software Engineer (Front-End)`,ar:`مهندس برمجيات (واجهات أمامية)`},start:`2023-04`,end:`present`,description:{en:`Building the Medad platform products — TMP (Training Management Platform), CMP and SEP — for web and mobile: training-needs assessment, learner and instructor portals, and white-labelled iOS and Android apps in Arabic (RTL) and English.`,ar:`بناء منتجات منصة مداد — TMP (منصة إدارة التدريب) و CMP و SEP — للويب والجوال: تقييم الاحتياجات التدريبية، بوابات المتدربين والمدربين، وتطبيقات iOS و Android بعلامات تجارية مخصصة بالعربية (RTL) والإنجليزية.`},link:`https://naseej.com/`,tech:[`React.js`,`TypeScript`,`Ant Design`,`React Query`,`Capacitor`,`React Native`]},{id:`exp_tafweela`,company:{en:`Tafweela`,ar:`تفويلة`},role:{en:`Software Engineer (Front-End)`,ar:`مهندس برمجيات (واجهات أمامية)`},start:`2023-04`,end:`2023-05`,description:{en:`Built the web platform and admin dashboard for companies partnering with petrol stations.`,ar:`بناء منصة الويب ولوحة التحكم للشركات المتعاقدة مع محطات الوقود.`},link:`https://tafweela.com/`,tech:[`React.js`,`REST API`]},{id:`exp_dimofinf`,company:{en:`Dimofinf`,ar:`ديموفنف`},role:{en:`Software Engineer`,ar:`مهندس برمجيات`},start:`2022-09`,end:`2023-04`,description:{en:`Developed web products and front-end features for client platforms.`,ar:`تطوير منتجات ويب وميزات واجهات أمامية لمنصات العملاء.`},tech:[`React.js`,`Next.js`,`JavaScript`]},{id:`exp_freelance`,company:{en:`Freelance`,ar:`عمل حر`},role:{en:`Freelance Web Developer`,ar:`مطور ويب مستقل`},start:`2019-09`,end:`2022-06`,description:{en:`Delivered full-stack web apps and dashboards for clients across Egypt, Saudi Arabia and Kuwait.`,ar:`تسليم تطبيقات ويب ولوحات تحكم متكاملة لعملاء في مصر والسعودية والكويت.`},tech:[`React.js`,`Node.js`,`Express.js`,`MongoDB`,`MySQL`,`PHP`]},{id:`exp_udacity`,company:{en:`Udacity, Inc.`,ar:`يوداسيتي`},role:{en:`Mentor and Project Reviewer, Front-End Nanodegrees`,ar:`مرشد ومراجع مشاريع، برامج النانو ديجري للواجهات الأمامية`},start:`2018-05`,end:`2021-05`,description:{en:`Mentored students and reviewed front-end projects, giving detailed code-quality feedback.`,ar:`إرشاد الطلاب ومراجعة مشاريع الواجهات الأمامية وتقديم ملاحظات تفصيلية حول جودة الكود.`},link:`https://youtu.be/igak2zJPv60`,tech:[`JavaScript`,`HTML5`,`CSS3`,`React.js`]}],projects:[{id:`prj_medad`,title:{en:`Medad Platform (Naseej)`,ar:`منصة مداد (نسيج)`},role:{en:`Front-End Developer`,ar:`مطور واجهات أمامية`},description:{en:`Learning and training management platform serving multiple colleges. TMP covers training-needs assessment, learner and instructor portals, and white-labelled iOS/Android apps in Arabic (RTL) and English. Also built modules for CMP and SEP.`,ar:`منصة لإدارة التعلم والتدريب تخدم عدة كليات. تشمل TMP تقييم الاحتياجات التدريبية وبوابات المتدربين والمدربين وتطبيقات iOS/Android بعلامات مخصصة بالعربية (RTL) والإنجليزية، بالإضافة إلى وحدات CMP و SEP.`},tech:[`React.js`,`TypeScript`,`Ant Design`,`React Query`,`Capacitor`,`React Native`],link:`https://naseej.com/`,category:`professional`,featured:!0},{id:`prj_tafweela`,title:{en:`Tafweela App`,ar:`تطبيق تفويلة`},role:{en:`Front-End Developer`,ar:`مطور واجهات أمامية`},description:{en:`Web platform and admin dashboard for companies partnering with petrol stations.`,ar:`منصة ويب ولوحة تحكم للشركات المتعاقدة مع محطات الوقود.`},tech:[`React.js`,`REST API`],link:`https://tafweela.com/`,category:`professional`,featured:!0},{id:`prj_dvdyatii`,title:{en:`DVDYatii`,ar:`دي في دي ياتي`},role:{en:`Front-End Developer`,ar:`مطور واجهات أمامية`},description:{en:`Movie application for the Kuwaiti market.`,ar:`تطبيق أفلام موجّه للسوق الكويتي.`},tech:[`Next.js`,`TMDB API`],link:``,category:`professional`,featured:!0},{id:`prj_lawyer`,title:{en:`Lawyer System`,ar:`نظام المحاماة`},role:{en:`Front-End Developer`,ar:`مطور واجهات أمامية`},description:{en:`Case management system for bankrupt companies in Saudi Arabia.`,ar:`نظام لإدارة قضايا الشركات المفلسة في المملكة العربية السعودية.`},tech:[`React.js`,`REST API`],link:``,category:`professional`,featured:!1},{id:`prj_skitab`,title:{en:`Skitab`,ar:`سكتاب`},role:{en:`Front-End Developer`,ar:`مطور واجهات أمامية`},description:{en:`Front-end development for the Skitab web platform.`,ar:`تطوير الواجهات الأمامية لمنصة سكتاب.`},tech:[`React.js`],link:``,category:`professional`,featured:!1},{id:`prj_fixfac`,title:{en:`Fix Fac`,ar:`فيكس فاك`},role:{en:`MERN Stack Developer and Team Lead`,ar:`مطور MERN وقائد فريق`},description:{en:`Led the team that built the product and its admin dashboard.`,ar:`قيادة الفريق الذي بنى المنتج ولوحة التحكم الخاصة به.`},tech:[`React.js`,`Node.js`,`Odoo`,`MySQL`,`Bootstrap`],link:``,category:`professional`,featured:!0},{id:`prj_coffee`,title:{en:`Coffee Shop Management System`,ar:`نظام إدارة المقاهي`},role:{en:`Full-Stack Developer`,ar:`مطور متكامل`},description:{en:`Management system for coffee shops with authentication, orders and inventory.`,ar:`نظام لإدارة المقاهي يشمل المصادقة والطلبات والمخزون.`},tech:[`React.js`,`PHP`,`MySQL`,`JWT`,`Bootstrap`],link:`https://youtu.be/fkoibUGJQ5g`,category:`personal`,featured:!1},{id:`prj_supermarket`,title:{en:`Supermarket App and Memory Store`,ar:`تطبيق السوبرماركت ومتجر الذكريات`},role:{en:`MERN Stack Developer`,ar:`مطور MERN`},description:{en:`Two MERN applications: a supermarket shopping app and a memory-sharing store.`,ar:`تطبيقان بتقنية MERN: تطبيق تسوق لسوبرماركت ومتجر لمشاركة الذكريات.`},tech:[`MongoDB`,`Express.js`,`React.js`,`Node.js`,`Bootstrap`],link:``,category:`personal`,featured:!1},{id:`prj_qas`,title:{en:`Quality Assessment System, Benha University`,ar:`نظام تقييم الجودة، جامعة بنها`},role:{en:`.NET Developer and DBA`,ar:`مطور .NET ومدير قواعد بيانات`},description:{en:`Graduation project for the Faculty of Computers and Artificial Intelligence.`,ar:`مشروع التخرج لكلية الحاسبات والذكاء الاصطناعي.`},tech:[`ASP.NET MVC`,`Entity Framework`,`SQL Server`,`jQuery`,`AJAX`],link:``,category:`personal`,featured:!1},{id:`prj_restaurant`,title:{en:`Restaurant Reviews App (Udacity)`,ar:`تطبيق تقييم المطاعم (يوداسيتي)`},role:{en:`Web Developer`,ar:`مطور ويب`},description:{en:`Restaurant reviews on interactive vector-tile maps.`,ar:`تقييمات المطاعم على خرائط تفاعلية.`},tech:[`jQuery`,`Leaflet.js`,`Mapbox (WebGL)`,`Python`,`MongoDB`],link:`https://youtu.be/igak2zJPv60`,category:`personal`,featured:!1},{id:`prj_reactapis`,title:{en:`React API Apps`,ar:`تطبيقات React مع واجهات API`},role:{en:`React.js Developer`,ar:`مطور React.js`},description:{en:`Watch Me Map (Google Maps API), Movie Yo (TMDB API), YouTube Videos Simulation (YouTube API) and Pics App (Unsplash API).`,ar:`Watch Me Map (خرائط جوجل)، Movie Yo (TMDB)، محاكاة يوتيوب (YouTube API)، وتطبيق الصور (Unsplash API).`},tech:[`React.js`,`Google Maps API`,`TMDB API`,`YouTube API`,`Unsplash API`],link:``,links:[{label:`Watch Me Map`,url:`https://condescending-fermat-aba37c.netlify.app/`},{label:`Movie Yo`,url:`https://movie-yo.vercel.app/`},{label:`YouTube Videos Simulation`,url:`https://youtube-videos-seven.vercel.app/`},{label:`Pics App`,url:`https://pics-app-gilt.vercel.app/`}],category:`personal`,featured:!1}],skillGroups:[{id:`sk_lang`,name:{en:`Languages`,ar:`لغات البرمجة`},items:[`JavaScript (ES6+)`,`TypeScript`,`HTML5`,`CSS3`]},{id:`sk_fe`,name:{en:`Front-end`,ar:`الواجهات الأمامية`},items:[`React.js`,`Next.js`,`Redux`,`React Query`,`React Router`,`jQuery`]},{id:`sk_ui`,name:{en:`UI & Styling`,ar:`الواجهات والتنسيق`},items:[`Ant Design`,`MUI`,`Bootstrap`,`Tailwind CSS`,`Less`,`Sass`,`RTL layouts`]},{id:`sk_mobile`,name:{en:`Mobile`,ar:`تطبيقات الجوال`},items:[`React Native`,`Capacitor (iOS & Android)`]},{id:`sk_be`,name:{en:`Back-end & APIs`,ar:`الخوادم وواجهات API`},items:[`Node.js`,`Express.js`,`Passport.js`,`REST`,`SOAP`]},{id:`sk_db`,name:{en:`Databases`,ar:`قواعد البيانات`},items:[`MySQL`,`MongoDB`,`SQL Server`]},{id:`sk_tools`,name:{en:`Testing & Tools`,ar:`الاختبار والأدوات`},items:[`Playwright`,`Vitest`,`Vite`,`Git`]},{id:`sk_practices`,name:{en:`Practices`,ar:`الممارسات`},items:[`OOP`,`Clean code`,`Design patterns`,`Agile`]}],education:[{id:`edu_iti`,title:{en:`9-Month Professional Diploma — Open Source Application Development`,ar:`دبلومة مهنية 9 أشهر — تطوير تطبيقات المصادر المفتوحة`},institution:{en:`Information Technology Institute (ITI)`,ar:`معهد تكنولوجيا المعلومات (ITI)`},start:`2021-10`,end:`2022-06`,details:{en:`Full-stack web development with Node.js, React.js, Angular and Vue.js; JavaScript, Python, Java, C/C++ and PHP; OOP, software engineering and Agile.`,ar:`تطوير ويب متكامل باستخدام Node.js و React.js و Angular و Vue.js؛ وبرمجة JavaScript و Python و Java و C/C++ و PHP؛ والبرمجة الكائنية وهندسة البرمجيات و Agile.`}},{id:`edu_benha`,title:{en:`BSc in Information Systems`,ar:`بكالوريوس نظم المعلومات`},institution:{en:`Faculty of Computers and Artificial Intelligence, Benha University`,ar:`كلية الحاسبات والذكاء الاصطناعي، جامعة بنها`},start:`2015-05`,end:`2019-07`,details:{en:`Graduation project: Quality Assessment System (ASP.NET MVC, SQL Server).`,ar:`مشروع التخرج: نظام تقييم الجودة (ASP.NET MVC و SQL Server).`}}],certificates:[{id:`cert_advfe`,title:{en:`Advanced Front-End Web Development Nanodegree`,ar:`نانو ديجري تطوير الواجهات الأمامية المتقدم`},issuer:{en:`Udacity`,ar:`يوداسيتي`},date:`2021-07`,link:`https://confirm.udacity.com/HHNPMULX`,description:{en:`Predictable application state with React and Redux; front-end build tools.`,ar:`إدارة حالة التطبيق باستخدام React و Redux؛ وأدوات بناء الواجهات الأمامية.`}},{id:`cert_sololearn`,title:{en:`React + Redux`,ar:`React + Redux`},issuer:{en:`SoloLearn`,ar:`سولو ليرن`},date:`2021-05`,link:`https://www.sololearn.com/Certificate/1097-21861198/jpg`,description:{en:`Single-page applications in React.js with Redux state management.`,ar:`تطبيقات الصفحة الواحدة باستخدام React.js وإدارة الحالة بـ Redux.`}},{id:`cert_webdev`,title:{en:`Web Development Professional Nanodegree`,ar:`نانو ديجري تطوير الويب الاحترافي`},issuer:{en:`Udacity`,ar:`يوداسيتي`},date:`2020-07`,link:`https://confirm.udacity.com/ZVCSEPT7`,description:{en:`DOM manipulation and dynamic, event-driven user experiences.`,ar:`التعامل مع DOM وبناء تجارب مستخدم ديناميكية قائمة على الأحداث.`}},{id:`cert_fend`,title:{en:`Front-End Web Developer Nanodegree`,ar:`نانو ديجري مطور الواجهات الأمامية`},issuer:{en:`Udacity`,ar:`يوداسيتي`},date:`2018-07`,link:`https://confirm.udacity.com/HPRH2NDK`,description:{en:`JavaScript (ES6), object-oriented patterns, closures, accessibility, Git and single-page applications with React.`,ar:`JavaScript (ES6) والأنماط الكائنية و closures وسهولة الوصول و Git وتطبيقات الصفحة الواحدة بـ React.`}},{id:`cert_dotnet`,title:{en:`.NET Web Development`,ar:`تطوير الويب بـ .NET`},issuer:{en:`ITI`,ar:`معهد تكنولوجيا المعلومات`},date:`2018-12`,description:{en:`SQL Server, C# (.NET Framework 4.5), ASP.NET and ASP.NET MVC.`,ar:`SQL Server و C# (.NET Framework 4.5) و ASP.NET و ASP.NET MVC.`}}],languages:[{id:`lng_ar`,name:{en:`Arabic`,ar:`العربية`},level:{en:`Native`,ar:`اللغة الأم`}},{id:`lng_en`,name:{en:`English`,ar:`الإنجليزية`},level:{en:`Very good`,ar:`جيد جدًا`}}],softSkills:[{en:`Team leadership`,ar:`قيادة الفريق`},{en:`Teamwork`,ar:`العمل الجماعي`},{en:`Time management and planning`,ar:`إدارة الوقت والتخطيط`},{en:`Fast learner`,ar:`سريع التعلم`},{en:`Problem solving`,ar:`حل المشكلات`},{en:`Communication`,ar:`التواصل`}],blog:[...qn,{id:`post_rtl`,slug:`building-bilingual-rtl-interfaces-react`,title:{en:`Building bilingual Arabic/English (RTL) interfaces in React`,ar:`بناء واجهات ثنائية اللغة عربي/إنجليزي (RTL) في React`},excerpt:{en:`Five practical rules I follow to ship React apps that look right in both Arabic (RTL) and English.`,ar:`خمس قواعد عملية أتبعها لإطلاق تطبيقات React تبدو صحيحة بالعربية (RTL) والإنجليزية.`},content:{en:Jn,ar:Yn},tags:[`React`,`RTL`,`CSS`],date:`2026-09-15`,cover:``,published:!0},{id:`post_forms`,slug:`react-19-forms`,title:{en:`React 19 forms: useActionState, useFormStatus and useOptimistic`,ar:`النماذج في React 19: useActionState و useFormStatus و useOptimistic`},excerpt:{en:`How the new React 19 hooks remove most of the boilerplate around forms, pending states and optimistic UI.`,ar:`كيف تزيل واجهات React 19 الجديدة معظم الكود المتكرر في النماذج وحالات الانتظار والواجهة التفاؤلية.`},content:{en:Qn,ar:$n},tags:[`React`,`React 19`],date:`2026-08-20`,cover:``,published:!0},{id:`post_capacitor`,slug:`web-to-mobile-with-capacitor`,title:{en:`From web app to iOS & Android with Capacitor`,ar:`من تطبيق ويب إلى iOS و Android باستخدام Capacitor`},excerpt:{en:`Lessons from shipping white-labelled mobile apps from a single React code base.`,ar:`دروس من إطلاق تطبيقات جوال بعلامات تجارية مخصصة من كود React واحد.`},content:{en:er,ar:tr},tags:[`Capacitor`,`Mobile`,`React`],date:`2026-07-10`,cover:``,published:!0}],faqs:[{id:`faq_work`,question:{en:`What kind of work does Mohamed do?`,ar:`ما نوع العمل الذي يقوم به محمد؟`},answer:{en:`Front-end engineering: React.js and Next.js web apps, admin dashboards, bilingual Arabic (RTL) / English interfaces and mobile apps with React Native and Capacitor. He also builds REST APIs with Node.js and Express.js.`,ar:`هندسة الواجهات الأمامية: تطبيقات ويب بـ React.js و Next.js، ولوحات تحكم، وواجهات ثنائية اللغة عربي (RTL) / إنجليزي، وتطبيقات جوال بـ React Native و Capacitor. كما يبني واجهات REST API باستخدام Node.js و Express.js.`}},{id:`faq_available`,question:{en:`Is Mohamed available for new opportunities or freelance projects?`,ar:`هل محمد متاح لفرص جديدة أو مشاريع عمل حر؟`},answer:{en:`Yes, he is open to new opportunities. Send a message through the contact form or e-mail mohamed.sabry.ahmed000@gmail.com with a short description of the role or project.`,ar:`نعم، هو منفتح على الفرص الجديدة. أرسل رسالة عبر نموذج التواصل أو على mohamed.sabry.ahmed000@gmail.com مع وصف مختصر للوظيفة أو المشروع.`}},{id:`faq_rtl`,question:{en:`Does Mohamed build Arabic (RTL) websites?`,ar:`هل يبني محمد مواقع باللغة العربية (RTL)؟`},answer:{en:`Yes. Most of his products ship in Arabic and English, with full right-to-left (RTL) layouts, mirrored components and Arabic typography. This website is an example.`,ar:`نعم. معظم منتجاته تُطلق بالعربية والإنجليزية مع تخطيط كامل من اليمين إلى اليسار (RTL) ومكونات معكوسة وخطوط عربية مناسبة، وهذا الموقع مثال على ذلك.`}},{id:`faq_stack`,question:{en:`Which technologies does Mohamed use most?`,ar:`ما التقنيات التي يستخدمها محمد أكثر؟`},answer:{en:`React.js, TypeScript, Next.js, Redux and React Query, styled with Tailwind CSS, Less or Sass. On the back end he uses Node.js and Express.js with MySQL, MongoDB or SQL Server.`,ar:`React.js و TypeScript و Next.js و Redux و React Query، مع Tailwind CSS أو Less أو Sass للتنسيق. وفي الخلفية يستخدم Node.js و Express.js مع MySQL أو MongoDB أو SQL Server.`}},{id:`faq_mobile`,question:{en:`Can Mohamed build mobile apps?`,ar:`هل يستطيع محمد بناء تطبيقات الجوال؟`},answer:{en:`Yes. He built white-labelled iOS and Android apps for the Medad platform with Capacitor, and he also works with React Native.`,ar:`نعم. بنى تطبيقات iOS و Android بعلامات تجارية مخصصة لمنصة مداد باستخدام Capacitor، كما يعمل بـ React Native.`}},{id:`faq_location`,question:{en:`Where is Mohamed based?`,ar:`أين يقيم محمد؟`},answer:{en:`He is based in Cairo, Egypt, and has worked with teams and clients in Saudi Arabia, Kuwait and Egypt.`,ar:`يقيم في القاهرة، مصر، وعمل مع فرق وعملاء في السعودية والكويت ومصر.`}}],sections:{about:!0,experience:!0,projects:!0,skills:!0,education:!0,certificates:!0,blog:!0,faq:!0,contact:!0}},nr={enabled:!0,name:{en:`Sabry AI`,ar:`صبري AI`},greeting:{en:`Hi! I'm Sabry AI, Mohamed's virtual assistant. Ask me about his experience, skills, projects, or how to hire him.`,ar:`أهلًا! أنا صبري AI، المساعد الافتراضي لمحمد. اسألني عن خبراته أو مهاراته أو مشاريعه أو كيفية التواصل معه.`},instructions:`Be friendly, concise and professional. Encourage visitors with job opportunities to use the contact form.`,mode:`auto`,suggestions:[{en:`What is his current role?`,ar:`ما هو دوره الحالي؟`},{en:`What are his main skills?`,ar:`ما هي أهم مهاراته؟`},{en:`Show me his projects`,ar:`اعرض مشاريعه`},{en:`How can I contact him?`,ar:`كيف أتواصل معه؟`}]};function rr(e,t){return e?.map(e=>{let n=t.find(t=>t.id===e.id);return n?{...e,link:e.link||n.link||``,...n.links&&!e.links?.length?{links:n.links}:{}}:e})}function ir(e){return{...e,projects:rr(e.projects,$.projects)??$.projects,experiences:rr(e.experiences,$.experiences)??$.experiences,certificates:rr(e.certificates,$.certificates)??$.certificates}}function ar(e){return{...e,blog:e.blog??$.blog,faqs:e.faqs??$.faqs,sections:{...e.sections,blog:e.sections?.blog??!0,faq:e.sections?.faq??!0}}}function or(e){let t=e.blog??[],n=new Set(t.map(e=>e.id)),r=new Set(t.map(e=>e.slug)),i=$.blog.filter(e=>!n.has(e.id)&&!r.has(e.slug));return i.length?{...e,blog:[...i,...t]}:e}var sr={2:e=>{let t=e;return t?.portfolio?{...t,portfolio:ir(t.portfolio)}:t},3:e=>{let t=e;return t?.portfolio?{...t,portfolio:ar(t.portfolio)}:t},4:e=>{let t=e;return t?.portfolio?{...t,portfolio:or(t.portfolio)}:t},5:e=>{let t=e;return t?.portfolio?{...t,portfolio:or(t.portfolio)}:t},6:e=>{let t=e;return t?.portfolio?{...t,portfolio:or(t.portfolio)}:t},7:e=>{let t=e;return t?.portfolio?{...t,portfolio:or(t.portfolio)}:t}},cr=X({name:`agent`,initialState:nr,reducers:{updateAgent(e,t){return{...e,...t.payload}},resetAgent(){return nr}}}),{updateAgent:lr,resetAgent:ur}=cr.actions,dr=cr.reducer,fr=X({name:`chat`,initialState:{messages:[],totalVisitorMessages:0},reducers:{appendChatMessage(e,t){e.messages.push(t.payload),t.payload.role===`user`&&(e.totalVisitorMessages+=1),e.messages.length>100&&e.messages.splice(0,e.messages.length-100)},clearChat(e){e.messages=[]}}}),{appendChatMessage:pr,clearChat:mr}=fr.actions,hr=fr.reducer,gr=X({name:`messages`,initialState:{items:[]},reducers:{addMessage(e,t){e.items.unshift(t.payload)},setMessageRead(e,t){let n=e.items.find(e=>e.id===t.payload.id);n&&(n.read=t.payload.read)},deleteMessage(e,t){e.items=e.items.filter(e=>e.id!==t.payload)},clearMessages(e){e.items=[]}}}),{addMessage:_r,setMessageRead:vr,deleteMessage:yr,clearMessages:br}=gr.actions,xr=gr.reducer,Sr=X({name:`portfolio`,initialState:$,reducers:{updateProfile(e,t){e.profile={...e.profile,...t.payload}},upsertItem(e,t){let{collection:n,item:r}=t.payload,i=e[n],a=i.findIndex(e=>e.id===r.id);a===-1?i.push(r):i[a]=r},removeItem(e,t){let{collection:n,id:r}=t.payload,i=e[n],a=i.findIndex(e=>e.id===r);a!==-1&&i.splice(a,1)},moveItem(e,t){let{collection:n,id:r,direction:i}=t.payload,a=e[n],o=a.findIndex(e=>e.id===r),s=o+i;if(o===-1||s<0||s>=a.length)return;let[c]=a.splice(o,1);a.splice(s,0,c)},setSoftSkills(e,t){e.softSkills=t.payload},toggleSection(e,t){e.sections[t.payload]=!e.sections[t.payload]},importPortfolio(e,t){return{...$,...t.payload,sections:{...$.sections,...t.payload.sections}}},resetPortfolio(){return $}}}),{updateProfile:Cr,upsertItem:wr,removeItem:Tr,moveItem:Er,setSoftSkills:Dr,toggleSection:Or,importPortfolio:kr,resetPortfolio:Ar}=Sr.actions,jr=Sr.reducer,Mr=`240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9`,Nr=X({name:`settings`,initialState:{adminUsername:`admin`,passwordHash:Mr},reducers:{setCredentials(e,t){e.adminUsername=t.payload.username,e.passwordHash=t.payload.passwordHash}}}),{setCredentials:Pr}=Nr.actions,Fr=Nr.reducer,Ir=we({portfolio:jr,messages:xr,chat:hr,agent:dr,settings:Fr}),Lr={key:`mohamed-sabry-portfolio`,version:7,storage:Kn(`local`),whitelist:[`portfolio`,`messages`,`chat`,`agent`,`settings`],migrate:Bn(sr,{debug:!1})},Rr=(e=>Wt({reducer:kn(Lr,Ir),preloadedState:e,middleware:e=>e({serializableCheck:{ignoredActions:[sn,cn,ln,un,dn,fn]}})}))(),zr=zn(Rr),Br=se.withTypes(),Vr=ce.withTypes();export{_e as C,o as D,u as E,c as O,ge as S,S as T,vr as _,Mr as a,ur as b,Er as c,Dr as d,Or as f,yr as g,_r as h,Vr as i,Tr as l,wr as m,Rr as n,Pr as o,Cr as p,Br as r,kr as s,zr as t,Ar as u,pr as v,ue as w,lr as x,mr as y};