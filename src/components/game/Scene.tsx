'use client';

import React, { useState, useCallback } from 'react';
import { useGameStore } from '@/store/useGameStore';
import { PresidentialOffice } from './palace/PresidentialOffice';
import { CabinetRoom } from './palace/CabinetRoom';
import { PressRoom } from './palace/PressRoom';
import { Courtyard } from './palace/Courtyard';
import { Player } from './Player';
import { CameraController } from './CameraController';
import { InteractiveSpot } from './InteractiveSpot';

export function Scene() {
  const currentRoom = useGameStore((state) => state.currentRoom);
  const cameraMode = useGameStore((state) => state.cameraMode);
  const toggleDashboard = useGameStore((state) => state.toggleDashboard);

  const [playerPos, setPlayerPos] = useState<[number, number, number]>([0, 0, 2]);

  const handlePositionUpdate = useCallback((pos: [number, number, number]) => {
    setPlayerPos(pos);
  }, []);

  const handleInteractClosest = useCallback(() => {
    // When pressing E, check the active room and trigger primary contextual action
    if (currentRoom === 'office') {
      toggleDashboard(true, 'overview');
    } else if (currentRoom === 'cabinet') {
      toggleDashboard(true, 'cabinet');
    } else if (currentRoom === 'press') {
      toggleDashboard(true, 'public_opinion');
    } else if (currentRoom === 'courtyard') {
      toggleDashboard(true, 'development');
    }
  }, [currentRoom, toggleDashboard]);

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={currentRoom === 'courtyard' ? 0.9 : 0.65} color="#ffffff" />
      <directionalLight
        position={currentRoom === 'courtyard' ? [15, 25, 12] : [8, 16, 6]}
        intensity={currentRoom === 'courtyard' ? 1.6 : 1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={45}
        shadow-camera-left={-18}
        shadow-camera-right={18}
        shadow-camera-top={18}
        shadow-camera-bottom={-18}
      />
      {/* Warm Fill Light */}
      <pointLight position={[0, 5, 0]} intensity={0.4} color="#fef3c7" distance={20} />

      {/* Render Current Room */}
      {currentRoom === 'office' && <PresidentialOffice />}
      {currentRoom === 'cabinet' && <CabinetRoom />}
      {currentRoom === 'press' && <PressRoom />}
      {currentRoom === 'courtyard' && <Courtyard />}

      {/* Interactive Spots tailored per room */}
      {currentRoom === 'office' && (
        <>
          <InteractiveSpot
            position={[0, 0, -2.6]}
            label="Meja Kerja Presiden"
            sublabel="Buka Ikhtisar & Dokumen Negara"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'overview')}
          />
          <InteractiveSpot
            position={[-8.5, 0, 0]}
            label="Peta Nusantara"
            sublabel="Pembangunan & Infrastruktur Wilayah"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'development')}
          />
          <InteractiveSpot
            position={[8.5, 0, 0]}
            label="Arsip Kebijakan Fiskal"
            sublabel="Alokasi APBN & Indikator Ekonomi"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'budget')}
          />
        </>
      )}

      {currentRoom === 'cabinet' && (
        <>
          <InteractiveSpot
            position={[0, 0, 3.8]}
            label="Meja Sidang Kabinet"
            sublabel="Manajemen Menteri & Reshuffle"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'cabinet')}
          />
          <InteractiveSpot
            position={[0, 0, -9.5]}
            label="Layar Intelijen Politik"
            sublabel="Peta Koalisi DPR & RUU"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'politics')}
          />
        </>
      )}

      {currentRoom === 'press' && (
        <>
          <InteractiveSpot
            position={[0, 0.6, -3.8]}
            label="Podium Konferensi Pers"
            sublabel="Survei Opini Publik & Rakyat"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'public_opinion')}
          />
        </>
      )}

      {currentRoom === 'courtyard' && (
        <>
          <InteractiveSpot
            position={[0, 0, 5.5]}
            label="Pusat Pembangunan Nasional"
            sublabel="Pantau Proyek Strategis"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'development')}
          />
          <InteractiveSpot
            position={[0, 0, 11]}
            label="Pos Pengamanan Istana"
            sublabel="Krisis & Peristiwa Darurat"
            playerPos={playerPos}
            onInteract={() => toggleDashboard(true, 'events')}
          />
        </>
      )}

      {/* 3D President Character */}
      <Player
        currentRoom={currentRoom}
        onPositionUpdate={handlePositionUpdate}
        onInteractClosest={handleInteractClosest}
      />

      {/* Orbit Follow Camera Controller */}
      <CameraController playerPos={playerPos} mode={cameraMode} />
    </>
  );
}

