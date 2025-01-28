import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/themeContext';
import { Moon, Sun } from 'lucide-react';


export default function ThemeBtn() {

    const { themeMode, darkTheme, lightTheme } = useTheme()
    const themeBtnChange = (e) => {
        const darkStatus = e.currentTarget.checked;
        if (darkStatus) {
            darkTheme();
        }
        else {
            lightTheme();
        }
    }

    return (
        <div className="w-50% max-w-xs bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow p-4">
            <label className="relative inline-flex items-center justify-between cursor-pointer">
                <span className="text-sm font-medium text-gray-900 dark:text-white mr-3">
                    <Sun className="w-5 h-5" />
                </span>
                <div className="relative">
                    <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={themeMode === "dark"}
                        onChange={themeBtnChange}
                    />
                    <div className="w-11 h-6 bg-gray-100 peer-focus:outline-none  dark:peer-focus:ring-white rounded-full peer dark:bg-white peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gray-800 after:border-gray-800 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-"></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white ml-3">
                    <Moon className="w-5 h-5" />
                </span>
            </label>
        </div>
    );
}



