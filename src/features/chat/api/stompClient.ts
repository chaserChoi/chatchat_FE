import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

// const STOMP_BROKER_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:8080/ws';

export const getStompClient = () => {
  const token = localStorage.getItem('token');

  const client = new Client({
    // SockJS를 사용하는 경우 (보통 Spring Boot 기본 설정 시 필요)
    webSocketFactory: () => new SockJS('http://localhost:8080/ws-stomp'),
    // 순수 WebSocket을 사용하는 경우
    // brokerURL: STOMP_BROKER_URL,
    connectHeaders: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    debug: (str) => {
      console.log('STOMP: ', str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });

  return client;
};

// 싱글톤 패턴으로 관리 (필요에 따라 Zustand에서 관리할 수도 있음)
export const stompClient = getStompClient();
