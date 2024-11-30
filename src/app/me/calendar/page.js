'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import styles from './styles.module.css';

export default function CalendarPage() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [windowWidth, setWindowWidth] = useState(
        typeof window !== 'undefined' ? window.innerWidth : 1024
    );
    const calendarRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/calendar');
                const data = await response.json();
                setEvents(data.events);
            } catch (error) {
                console.error('Failed to fetch calendar events:', error);
            }
        };

        fetchEvents();
    }, []);

    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event);
        setShowModal(true);
        setIsClosing(false);
    };

    const closeModal = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsClosing(false);
        }, 200);
    }, []);

    const handleModalClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }, [closeModal]);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };

        if (showModal) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [showModal, closeModal]);

    const isAllDayEvent = (start, end) => {
        if (!start || !end) return false;
        
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        // 检查是否跨越整天
        const duration = endDate - startDate;
        const days = duration / (1000 * 60 * 60 * 24);
        
        // 如果事件持续时间超过23小时，且开始时间是凌晨，结束时间是午夜，则认为是全天事件
        return (
            days >= 0.95 && // 允许一些误差
            startDate.getHours() === 0 &&
            startDate.getMinutes() === 0 &&
            (endDate.getHours() === 0 || endDate.getHours() === 23) &&
            (endDate.getMinutes() === 0 || endDate.getMinutes() === 59)
        );
    };

    const getCalendarConfig = () => {
        const baseConfig = {
            plugins: [dayGridPlugin, timeGridPlugin],
            events: events.map(event => ({
                ...event,
                allDay: isAllDayEvent(event.start, event.end),
            })),
            height: '100%',
            buttonIcons: false,
            buttonText: {
                today: '今天',
                month: '月',
                week: '周',
                day: '日',
                prev: '上一页',
                next: '下一页'
            },
            slotMinTime: "08:00:00",
            slotMaxTime: "20:00:00",
            allDaySlot: true,
            allDayText: '全天',
            allDayMaintainDuration: true,
            locale: "zh-cn",
            firstDay: 1,
            dayHeaderFormat: { weekday: 'short' },
            eventColor: "#3b82f6",
            eventTextColor: "#ffffff",
            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            },
            eventClick: handleEventClick,
            nowIndicator: true,
            slotEventOverlap: false,
            expandRows: true,
            dayMaxEvents: true,
            titleFormat: { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric'
            },
            views: {
                timeGridWeek: {
                    titleFormat: { 
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    },
                    dayMaxEventRows: 2,
                    allDaySlot: true,
                },
                timeGridDay: {
                    titleFormat: { 
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                        weekday: 'long'
                    },
                    dayMaxEventRows: 3,
                    allDaySlot: true,
                },
                dayGridMonth: {
                    titleFormat: { 
                        year: 'numeric',
                        month: 'long'
                    },
                    dayMaxEventRows: true,
                }
            }
        };

        // 移动端配置 (< 640px)
        if (windowWidth < 640) {
            return {
                ...baseConfig,
                initialView: 'timeGridDay', // 移动端默认日视图
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'today timeGridDay,dayGridMonth'
                }
            };
        }

        // 平板小屏配置 (640px - 768px)
        if (windowWidth < 768) {
            return {
                ...baseConfig,
                initialView: 'timeGridDay', // 平板小屏默认日视图
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,timeGridWeek'
                }
            };
        }

        // 平板配置 (768px - 1024px)
        if (windowWidth < 1024) {
            return {
                ...baseConfig,
                initialView: 'timeGridWeek', // 平板默认周视图
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'timeGridDay,timeGridWeek,dayGridMonth'
                }
            };
        }

        // 桌面端配置
        return {
            ...baseConfig,
            initialView: 'timeGridWeek', // 桌面端默认周视图
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridDay,timeGridWeek,dayGridMonth'
            }
        };
    };

    return (
        <div className="w-full h-[calc(100vh-8rem)] flex flex-col">
            <div className={styles.calendarTitle}>
                <FullCalendar
                    {...getCalendarConfig()}
                    headerToolbar={{
                        left: '',
                        center: 'title',
                        right: ''
                    }}
                />
            </div>
            <div className={styles.calendarMain}>
                <FullCalendar
                    {...getCalendarConfig()}
                    headerToolbar={false}
                    ref={calendarRef}
                />
            </div>
            <div className={styles.calendarFooter}>
                <div className="flex justify-between items-center w-full px-4 py-3">
                    <div className="flex gap-2">
                        <button className="fc-button fc-button-primary" onClick={() => calendarRef.current?.getApi().prev()}>
                            上一页
                        </button>
                        <button className="fc-button fc-button-primary" onClick={() => calendarRef.current?.getApi().next()}>
                            下一页
                        </button>
                        <button className="fc-button fc-button-primary" onClick={() => calendarRef.current?.getApi().today()}>
                            今天
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            className="fc-button fc-button-primary" 
                            onClick={() => calendarRef.current?.getApi().changeView('timeGridDay')}
                        >
                            日
                        </button>
                        <button 
                            className="fc-button fc-button-primary"
                            onClick={() => calendarRef.current?.getApi().changeView('timeGridWeek')}
                        >
                            周
                        </button>
                        <button 
                            className="fc-button fc-button-primary"
                            onClick={() => calendarRef.current?.getApi().changeView('dayGridMonth')}
                        >
                            月
                        </button>
                    </div>
                </div>
            </div>
            {showModal && selectedEvent && (
                <div 
                    className={`fixed inset-0 bg-black transition-opacity duration-200 flex items-center justify-center p-4 z-50 ${
                        isClosing ? 'bg-opacity-0' : 'bg-opacity-50'
                    }`}
                    onClick={handleModalClick}
                >
                    <div 
                        className={`bg-white rounded-lg p-6 max-w-lg w-full shadow-xl transition-all duration-200 ${
                            isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                        }`}
                        onClick={e => e.stopPropagation()}
                    >
                        <h2 className="text-xl font-semibold mb-4">{selectedEvent.title}</h2>
                        <div className="space-y-3">
                            <p className="text-gray-600">
                                <span className="font-medium">开始时间：</span>
                                {new Date(selectedEvent.start).toLocaleString('zh-CN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">结束时间：</span>
                                {selectedEvent.end && new Date(selectedEvent.end).toLocaleString('zh-CN', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false
                                })}
                            </p>
                            {selectedEvent.extendedProps?.location && (
                                <p className="text-gray-600">
                                    <span className="font-medium">地点：</span>
                                    {selectedEvent.extendedProps.location}
                                </p>
                            )}
                            {selectedEvent.extendedProps?.description && (
                                <p className="text-gray-600">
                                    <span className="font-medium">详情：</span>
                                    <span dangerouslySetInnerHTML={{ 
                                        __html: selectedEvent.extendedProps.description.replace(/\n/g, '<br/>') 
                                    }} />
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}