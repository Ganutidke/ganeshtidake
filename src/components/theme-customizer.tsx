"use client"

import * as React from "react"
import { RotateCcw, Paintbrush, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, hslToHex, hexToHsl } from "@/lib/utils"
import { presets } from "@/components/admin/theme-page-client"

const STORAGE_KEY = "theme-customizer"

type ThemeColors = {
    background: string
    foreground: string
    card: string
    primary: string
    secondary: string
    accent: string
    border: string
}

export function ThemeCustomizer() {
    const [mounted, setMounted] = React.useState(false)
    const [open, setOpen] = React.useState(false)
    const [config, setConfig] = React.useState<ThemeColors | null>(null)

    // Initial load
    React.useEffect(() => {
        setMounted(true)
        const savedConfig = localStorage.getItem(STORAGE_KEY)
        if (savedConfig) {
            try {
                const parsed = JSON.parse(savedConfig)
                setConfig(parsed)
                applyTheme(parsed)
            } catch (e) {
                console.error("Failed to parse saved theme", e)
            }
        }
    }, [])

    const applyTheme = (colors: ThemeColors) => {
        const root = document.documentElement
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value)
        })
    }

    const updateConfig = (key: keyof ThemeColors, value: string) => {
        if (!config) return

        const newConfig = { ...config, [key]: value }
        setConfig(newConfig)
        applyTheme(newConfig)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig))
    }

    const handleColorChange = (key: keyof ThemeColors, hex: string) => {
        const hsl = hexToHsl(hex)
        updateConfig(key, hsl)
    }

    const handlePresetSelect = (colors: ThemeColors) => {
        setConfig(colors)
        applyTheme(colors)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(colors))
    }

    const handleReset = () => {
        setConfig(null)
        localStorage.removeItem(STORAGE_KEY)
        const root = document.documentElement
        // Remove inline styles to revert to CSS/Server defaults
        const keys: (keyof ThemeColors)[] = ['background', 'foreground', 'card', 'primary', 'secondary', 'accent', 'border']
        keys.forEach(key => root.style.removeProperty(`--${key}`))
    }

    if (!mounted) return null

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full w-9 h-9 border-border">
                    <Paintbrush className="h-4 w-4" />
                    <span className="sr-only">Customize Theme</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Theme Customizer</SheetTitle>
                    <SheetDescription>
                        Customize your view. Changes are saved locally to your browser.
                    </SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                    <Tabs defaultValue="presets" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="presets">Presets</TabsTrigger>
                            <TabsTrigger value="manual">Manual</TabsTrigger>
                        </TabsList>
                        <TabsContent value="presets" className="mt-4">
                            <ScrollArea className="h-[500px] pr-4">
                                <div className="grid grid-cols-2 gap-4">
                                    {presets.map((preset) => (
                                        <Button
                                            key={preset.name}
                                            variant="outline"
                                            className={cn(
                                                "justify-start h-auto py-4 px-4",
                                                JSON.stringify(config) === JSON.stringify(preset.colors) && "border-primary ring-1 ring-primary"
                                            )}
                                            onClick={() => handlePresetSelect(preset.colors)}
                                        >
                                            <span
                                                className="h-6 w-6 rounded-full mr-3 border shadow-sm shrink-0"
                                                style={{ backgroundColor: `hsl(${preset.colors.primary})` }}
                                            />
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="font-semibold">{preset.name}</span>
                                                <div className="flex gap-1">
                                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(${preset.colors.background})` }} />
                                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(${preset.colors.foreground})` }} />
                                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: `hsl(${preset.colors.accent})` }} />
                                                </div>
                                            </div>
                                            {JSON.stringify(config) === JSON.stringify(preset.colors) && (
                                                <Check className="ml-auto h-4 w-4 text-primary" />
                                            )}
                                        </Button>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="manual" className="mt-4">
                            <ScrollArea className="h-[500px] pr-4">
                                <div className="space-y-4">
                                    <div className="grid gap-4">
                                        {config ? (
                                            Object.entries(config).map(([key, value]) => (
                                                <div key={key} className="grid gap-2">
                                                    <Label htmlFor={key} className="capitalize">{key}</Label>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="w-10 h-10 rounded-sm border-[1px] border-gray-500 overflow-hidden">
                                                            <input
                                                                type="color"
                                                                value={hslToHex(value)}
                                                                onChange={(e) =>
                                                                    handleColorChange(key as keyof ThemeColors, e.target.value)
                                                                }
                                                                className="w-full h-full  appearance-none cursor-pointer border-none p-0"
                                                                style={{
                                                                    WebkitAppearance: "none",
                                                                    padding: 0,
                                                                    border: "none"
                                                                }}
                                                            />
                                                        </div>
                                                        <Input
                                                            id={key}
                                                            value={value}
                                                            onChange={(e) => updateConfig(key as keyof ThemeColors, e.target.value)}
                                                            className="font-mono flex-1"
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground">
                                                <p>Select a preset first to start editing manually.</p>
                                                <Button variant="link" onClick={() => handlePresetSelect(presets[0].colors)}>
                                                    Load Default Preset
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>

                <SheetFooter>
                    <Button variant="ghost" onClick={handleReset} className="w-full sm:w-auto">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset to Default
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
